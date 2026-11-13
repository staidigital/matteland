-- Rom og lærere: hver lærer får sitt eget rom med egne spillere, klaner og runder, så flere rom kan spille samtidig.
-- Hovedadmin (rollen 'admin') ser alle rom og oppretter lærere (rollen 'laerer').
--
-- Kjøres i SQL Editor på en database som allerede har spill.sql og tilleggene, rett før de nye Edge Functions
-- (administrer-spillere og spill) og frontenden publiseres. Kjør mens ingen runde pågår: start og avslutt
-- av runder feiler i tiden mellom SQL-en og de nye funksjonene.
--
-- Eksisterende admin får et rom, og alle spillere, klaner og runder som finnes fra før, legges i det.

begin;

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  owner_id uuid not null unique references auth.users (id) on delete cascade
);

insert into public.rooms (name, owner_id)
  select split_part(email, '@', 1), id from auth.users where raw_app_meta_data ->> 'role' = 'admin';

alter table public.players add column room_id uuid references public.rooms (id) on delete restrict;
alter table public.clans add column room_id uuid references public.rooms (id) on delete cascade;
alter table public.rounds add column room_id uuid references public.rooms (id) on delete cascade;

-- Finnes det flere admin-brukere, havner alt hos den eldste
do $$
declare
  v_room uuid;
begin
  select r.id into v_room from public.rooms r
    join auth.users u on u.id = r.owner_id
    order by u.created_at limit 1;
  update public.players set room_id = v_room where true;
  update public.clans set room_id = v_room where true;
  update public.rounds set room_id = v_room where true;
end;
$$;

-- Feiler her hvis det finnes spillere, men ingen bruker med rollen 'admin'. Da rulles alt tilbake.
alter table public.players alter column room_id set not null;
alter table public.clans alter column room_id set not null;
alter table public.rounds alter column room_id set not null;
create index on public.players (room_id);

alter table public.rooms enable row level security;

-- Rommet til den innloggede: rommet spilleren er i, eller rommet læreren eier.
-- Security definer, så funksjonen kan brukes i RLS-reglene til tabellene den selv leser.
create function public.moc_my_room()
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    (select room_id from public.players where id = auth.uid()),
    (select id from public.rooms where owner_id = auth.uid())
  )
$$;

revoke execute on function public.moc_my_room() from public, anon;
grant execute on function public.moc_my_room() to authenticated, service_role;

revoke all on public.rooms from anon, authenticated;
grant select on public.rooms to authenticated;
grant all on public.rooms to service_role;

-- Tilgang: før kunne alle innloggede lese alt. Nå ser hver bare sitt eget rom, og hovedadmin ser alle.
drop policy "Innloggede leser" on public.players;
drop policy "Innloggede leser" on public.clans;
drop policy "Innloggede leser" on public.rounds;
drop policy "Innloggede leser" on public.round_regions;
drop policy "Innloggede leser" on public.player_stats;
drop policy "Innloggede leser" on public.round_events;
drop policy "Bare admin ser passord" on public.player_credentials;

create policy "Eget rom, hovedadmin ser alle" on public.rooms for select to authenticated
  using (public.is_admin() or id = (select public.moc_my_room()));
create policy "Eget rom, hovedadmin ser alle" on public.players for select to authenticated
  using (public.is_admin() or room_id = (select public.moc_my_room()));
create policy "Eget rom, hovedadmin ser alle" on public.clans for select to authenticated
  using (public.is_admin() or room_id = (select public.moc_my_room()));
create policy "Eget rom, hovedadmin ser alle" on public.rounds for select to authenticated
  using (public.is_admin() or room_id = (select public.moc_my_room()));

-- Følger tilgangen til runden: underspørringen gir bare treff på runder den innloggede får lese
create policy "Runder i eget rom" on public.round_regions for select to authenticated
  using (exists (select 1 from public.rounds r where r.id = round_id));
create policy "Runder i eget rom" on public.player_stats for select to authenticated
  using (exists (select 1 from public.rounds r where r.id = round_id));
create policy "Runder i eget rom" on public.round_events for select to authenticated
  using (exists (select 1 from public.rounds r where r.id = round_id));

create policy "Læreren ser passordene i rommet sitt, hovedadmin ser alle"
  on public.player_credentials for select to authenticated
  using (
    public.is_admin()
    or exists (
      select 1 from public.players p
      join public.rooms r on r.id = p.room_id
      where p.id = user_id and r.owner_id = auth.uid()
    )
  );

-- Rundene styres per rom
drop function public.moc_start_round(integer);
drop function public.moc_end_round();

-- Runden som pågår i rommet til spilleren, eller null
create function public.moc_active_round(p_player uuid)
returns uuid
language sql
stable
set search_path = ''
as $$
  select r.id from public.rounds r
    join public.players p on p.room_id = r.room_id
    where p.id = p_player and r.ends_at > now()
$$;

-- Starter en ny runde i rommet. Forrige runde i rommet slettes. Andre rom berøres ikke.
create function public.moc_start_round(p_room uuid, p_minutes integer)
returns uuid
language plpgsql
set search_path = ''
as $$
declare
  v_round uuid;
  v_clans integer;
begin
  -- Hindrer at to samtidige kall starter hver sin runde i samme rom
  perform 1 from public.rooms where id = p_room for update;
  if not found then
    raise exception 'Fant ikke rommet.' using errcode = 'P0001';
  end if;
  if exists (select 1 from public.rounds where room_id = p_room and ends_at > now()) then
    raise exception 'En runde er allerede i gang.' using errcode = 'P0001';
  end if;

  -- Spillere som er valgt bort, er ikke med. Klaner de etterlater tomme, skal ikke få område på kartet.
  update public.players set clan_id = null
    where room_id = p_room and not in_next_round and clan_id is not null;
  delete from public.clans c
    where c.room_id = p_room and not exists (select 1 from public.players p where p.clan_id = c.id);

  select count(*) into v_clans from public.clans where room_id = p_room;
  if v_clans = 0 then
    raise exception 'Fordel spillerne på klaner først.' using errcode = 'P0001';
  end if;
  if v_clans > (select count(*) from public.regions where start_order is not null) then
    raise exception 'Det er for mange klaner til kartet.' using errcode = 'P0001';
  end if;

  delete from public.rounds where room_id = p_room;
  insert into public.rounds (room_id, ends_at)
    values (p_room, now() + make_interval(mins => p_minutes))
    returning id into v_round;

  insert into public.round_regions (round_id, region_id, defenders)
    select v_round, id, start_defenders from public.regions where not locked;

  update public.round_regions rr
    set clan_id = s.clan_id, defenders = 15
    from (
      select r.id as region_id, c.id as clan_id
      from (select id, row_number() over (order by start_order) as nr from public.regions where start_order is not null) r
      join (select id, row_number() over (order by name) as nr from public.clans where room_id = p_room) c on c.nr = r.nr
    ) s
    where rr.round_id = v_round and rr.region_id = s.region_id;

  insert into public.player_stats (round_id, player_id, soldiers)
    select v_round, id, 20 from public.players where room_id = p_room and clan_id is not null;

  insert into public.round_events (round_id, message) values (v_round, 'Runden har startet!');
  return v_round;
end;
$$;

create function public.moc_end_round(p_room uuid)
returns void
language sql
set search_path = ''
as $$
  update public.rounds set ends_at = now() where room_id = p_room and ends_at > now();
$$;

revoke execute on function
  public.moc_active_round(uuid), public.moc_start_round(uuid, integer), public.moc_end_round(uuid)
from public, anon, authenticated;

grant execute on function
  public.moc_active_round(uuid), public.moc_start_round(uuid, integer), public.moc_end_round(uuid)
to service_role;

-- Spillhandlingene er uendret, bortsett fra at de finner runden i spillerens eget rom

create or replace function public.moc_attack(p_player uuid, p_region text, p_soldiers integer)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_round uuid;
  v_username text;
  v_clan uuid;
  v_clan_name text;
  v_region public.regions;
  v_target public.round_regions;
  v_stats public.player_stats;
  v_strength integer;
  v_captured boolean;
begin
  v_round := public.moc_active_round(p_player);
  if v_round is null then
    raise exception 'Ingen runde er i gang.' using errcode = 'P0001';
  end if;
  select p.username, p.clan_id, c.name into v_username, v_clan, v_clan_name
    from public.players p join public.clans c on c.id = p.clan_id
    where p.id = p_player;
  if v_clan is null then
    raise exception 'Du er ikke med i en klan.' using errcode = 'P0001';
  end if;
  if p_soldiers is null or p_soldiers < 1 then
    raise exception 'Du må sende minst én soldat.' using errcode = 'P0001';
  end if;

  update public.player_stats set soldiers = soldiers - p_soldiers
    where round_id = v_round and player_id = p_player and soldiers >= p_soldiers
    returning * into v_stats;
  if not found then
    raise exception 'Du har ikke nok soldater.' using errcode = 'P0001';
  end if;

  select * into v_region from public.regions where id = p_region;
  select * into v_target from public.round_regions
    where round_id = v_round and region_id = p_region for update;
  if v_target.region_id is null or v_region.locked then
    raise exception 'Dette området kan ikke angripes.' using errcode = 'P0001';
  end if;
  if v_target.clan_id is not distinct from v_clan then
    raise exception 'Området tilhører allerede klanen din.' using errcode = 'P0001';
  end if;

  -- Må grense til et område klanen holder. En klan uten områder kan angripe hvor som helst.
  if exists (select 1 from public.round_regions where round_id = v_round and clan_id = v_clan)
     and not exists (
       select 1 from public.round_regions
       where round_id = v_round and clan_id = v_clan and region_id = any (v_region.neighbors)
     ) then
    raise exception 'Området grenser ikke til klanen din.' using errcode = 'P0001';
  end if;

  v_strength := ceil(v_target.defenders * v_region.defense);
  v_captured := p_soldiers > v_strength;
  if v_captured then
    update public.round_regions set clan_id = v_clan, defenders = p_soldiers - v_strength
      where round_id = v_round and region_id = p_region;
    insert into public.round_events (round_id, message)
      values (v_round, v_clan_name || ' erobret ' || v_region.name || ' (' || v_username || ')');
  else
    update public.round_regions
      set defenders = greatest(defenders - floor(p_soldiers / v_region.defense)::integer, 0)
      where round_id = v_round and region_id = p_region;
    insert into public.round_events (round_id, message)
      values (v_round, v_clan_name || ' angrep ' || v_region.name || ', men forsvaret holdt');
  end if;

  return jsonb_build_object('erobret', v_captured, 'status', to_jsonb(v_stats));
end;
$$;

create or replace function public.moc_fortify(p_player uuid, p_region text, p_soldiers integer)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_round uuid;
  v_clan uuid;
  v_stats public.player_stats;
begin
  v_round := public.moc_active_round(p_player);
  if v_round is null then
    raise exception 'Ingen runde er i gang.' using errcode = 'P0001';
  end if;
  select clan_id into v_clan from public.players where id = p_player;
  if p_soldiers is null or p_soldiers < 1 then
    raise exception 'Du må sende minst én soldat.' using errcode = 'P0001';
  end if;

  update public.player_stats set soldiers = soldiers - p_soldiers
    where round_id = v_round and player_id = p_player and soldiers >= p_soldiers
    returning * into v_stats;
  if not found then
    raise exception 'Du har ikke nok soldater.' using errcode = 'P0001';
  end if;

  update public.round_regions set defenders = defenders + p_soldiers
    where round_id = v_round and region_id = p_region and clan_id = v_clan;
  if not found then
    raise exception 'Området tilhører ikke klanen din.' using errcode = 'P0001';
  end if;

  return jsonb_build_object('status', to_jsonb(v_stats));
end;
$$;

create or replace function public.moc_buy_soldiers(p_player uuid, p_soldiers integer)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_round uuid;
  v_stats public.player_stats;
begin
  v_round := public.moc_active_round(p_player);
  if v_round is null then
    raise exception 'Ingen runde er i gang.' using errcode = 'P0001';
  end if;
  if p_soldiers is null or p_soldiers < 1 or p_soldiers > 1000 then
    raise exception 'Ugyldig antall soldater.' using errcode = 'P0001';
  end if;

  update public.player_stats set gold = gold - p_soldiers * 3, soldiers = soldiers + p_soldiers
    where round_id = v_round and player_id = p_player and gold >= p_soldiers * 3
    returning * into v_stats;
  if not found then
    raise exception 'Du har ikke nok gull.' using errcode = 'P0001';
  end if;

  return jsonb_build_object('status', to_jsonb(v_stats));
end;
$$;

create or replace function public.moc_nuke(p_player uuid, p_region text)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_round uuid;
  v_username text;
  v_clan uuid;
  v_clan_name text;
  v_region_name text;
  v_target public.round_regions;
  v_neighbors text[];
  v_stats public.player_stats;
  v_intercepted boolean;
begin
  v_round := public.moc_active_round(p_player);
  if v_round is null then
    raise exception 'Ingen runde er i gang.' using errcode = 'P0001';
  end if;
  select p.username, p.clan_id, c.name into v_username, v_clan, v_clan_name
    from public.players p join public.clans c on c.id = p.clan_id
    where p.id = p_player;
  if v_clan is null then
    raise exception 'Du er ikke med i en klan.' using errcode = 'P0001';
  end if;

  update public.player_stats set gold = gold - 150
    where round_id = v_round and player_id = p_player and gold >= 150
    returning * into v_stats;
  if not found then
    raise exception 'Du har ikke nok gull.' using errcode = 'P0001';
  end if;

  select * into v_target from public.round_regions
    where round_id = v_round and region_id = p_region;
  if v_target.region_id is null then
    raise exception 'Dette området kan ikke nukes.' using errcode = 'P0001';
  end if;
  select name, neighbors into v_region_name, v_neighbors from public.regions where id = p_region;

  -- Låser området og naboene i fast rekkefølge, så to nuker samtidig ikke venter på hverandre for alltid
  perform 1 from public.round_regions
    where round_id = v_round and (region_id = p_region or region_id = any (v_neighbors))
    order by region_id
    for update;
  select * into v_target from public.round_regions
    where round_id = v_round and region_id = p_region;
  if v_target.clan_id is not distinct from v_clan then
    raise exception 'Du kan ikke nuke din egen klan.' using errcode = 'P0001';
  end if;

  delete from public.round_missile_defenses where round_id = v_round and region_id = p_region;
  v_intercepted := found;

  if v_intercepted then
    insert into public.round_events (round_id, message, effect, region_id)
      values (v_round, v_clan_name || ' sendte en nuke mot ' || v_region_name || ', men den ble skutt ned!', 'nuke_intercepted', p_region);
  else
    update public.round_regions set clan_id = null, defenders = 0
      where round_id = v_round and region_id = p_region;
    -- Gjelder alle naboene, også dem klanen som sendte nuken selv eier
    update public.round_regions set defenders = floor(defenders * 0.5)::integer
      where round_id = v_round and region_id = any (v_neighbors);
    insert into public.round_events (round_id, message, effect, region_id)
      values (v_round, v_clan_name || ' nuket ' || v_region_name || ' (' || v_username || '). Naboene mistet halvparten av troppene.', 'nuke_hit', p_region);
  end if;

  return jsonb_build_object('avskutt', v_intercepted, 'status', to_jsonb(v_stats));
end;
$$;

create or replace function public.moc_missile_defense(p_player uuid, p_region text)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_round uuid;
  v_clan uuid;
  v_stats public.player_stats;
begin
  v_round := public.moc_active_round(p_player);
  if v_round is null then
    raise exception 'Ingen runde er i gang.' using errcode = 'P0001';
  end if;
  select clan_id into v_clan from public.players where id = p_player;
  if v_clan is null then
    raise exception 'Du er ikke med i en klan.' using errcode = 'P0001';
  end if;

  update public.player_stats set gold = gold - 100
    where round_id = v_round and player_id = p_player and gold >= 100
    returning * into v_stats;
  if not found then
    raise exception 'Du har ikke nok gull.' using errcode = 'P0001';
  end if;

  perform 1 from public.round_regions
    where round_id = v_round and region_id = p_region and clan_id = v_clan for update;
  if not found then
    raise exception 'Området tilhører ikke klanen din.' using errcode = 'P0001';
  end if;

  insert into public.round_missile_defenses (round_id, region_id, clan_id)
    values (v_round, p_region, v_clan)
    on conflict (round_id, region_id) do nothing;
  if not found then
    raise exception 'Området har allerede missilforsvar.' using errcode = 'P0001';
  end if;

  return jsonb_build_object('status', to_jsonb(v_stats));
end;
$$;

commit;
