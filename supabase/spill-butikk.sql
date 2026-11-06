-- Butikken: kjøp soldater, nuke et område eller legg missilforsvar på et eget område. Kjøres i SQL Editor
-- på en database som allerede har spill.sql, før den nye Edge Function publiseres. Virker midt i en runde.

-- Effekten forteller klientene hvilken animasjon de skal vise på kartet, og hvor
alter table public.round_events
  add column effect text,
  add column region_id text;

-- Skal være hemmelig for motstanderne, så dette kan ikke være en kolonne i round_regions. Tabellen
-- legges heller ikke i sanntidspublikasjonen, fordi slettinger der sendes til alle uavhengig av RLS.
create table public.round_missile_defenses (
  round_id uuid not null,
  region_id text not null,
  clan_id uuid not null references public.clans (id) on delete cascade,
  primary key (round_id, region_id),
  foreign key (round_id, region_id) references public.round_regions (round_id, region_id) on delete cascade
);

alter table public.round_missile_defenses enable row level security;

create policy "Klanen ser sitt eget forsvar" on public.round_missile_defenses
  for select to authenticated
  using (clan_id = (select p.clan_id from public.players p where p.id = auth.uid()));

revoke all on public.round_missile_defenses from anon, authenticated;
grant select on public.round_missile_defenses to authenticated;
grant all on public.round_missile_defenses to service_role;

-- Missilforsvaret følger ikke med når området bytter eier
create function public.moc_remove_lost_defense()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  delete from public.round_missile_defenses
    where round_id = new.round_id and region_id = new.region_id;
  return null;
end;
$$;

create trigger moc_remove_lost_defense
  after update of clan_id on public.round_regions
  for each row
  when (old.clan_id is distinct from new.clan_id)
  execute function public.moc_remove_lost_defense();

-- Kjøper soldater med gull. Prisen er 3 gull per soldat, så dette lønner seg bare i nødstilfeller.
create function public.moc_buy_soldiers(p_player uuid, p_soldiers integer)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_round uuid;
  v_stats public.player_stats;
begin
  select id into v_round from public.rounds where ends_at > now();
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

-- Nuker et område for 150 gull. Rekker over hele kartet, men et missilforsvar skyter den ned og brukes opp.
create function public.moc_nuke(p_player uuid, p_region text)
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
  v_stats public.player_stats;
  v_intercepted boolean;
begin
  select id into v_round from public.rounds where ends_at > now();
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
    where round_id = v_round and region_id = p_region for update;
  if v_target.region_id is null then
    raise exception 'Dette området kan ikke nukes.' using errcode = 'P0001';
  end if;
  if v_target.clan_id is not distinct from v_clan then
    raise exception 'Du kan ikke nuke din egen klan.' using errcode = 'P0001';
  end if;
  select name into v_region_name from public.regions where id = p_region;

  delete from public.round_missile_defenses where round_id = v_round and region_id = p_region;
  v_intercepted := found;

  if v_intercepted then
    insert into public.round_events (round_id, message, effect, region_id)
      values (v_round, v_clan_name || ' sendte en nuke mot ' || v_region_name || ', men den ble skutt ned!', 'nuke_intercepted', p_region);
  else
    update public.round_regions set defenders = floor(defenders * 0.2)::integer
      where round_id = v_round and region_id = p_region;
    insert into public.round_events (round_id, message, effect, region_id)
      values (v_round, v_clan_name || ' nuket ' || v_region_name || ' (' || v_username || ')', 'nuke_hit', p_region);
  end if;

  return jsonb_build_object('avskutt', v_intercepted, 'status', to_jsonb(v_stats));
end;
$$;

-- Legger missilforsvar på et av klanens områder for 100 gull. Gir ingen hendelse, siden det skal være hemmelig.
create function public.moc_missile_defense(p_player uuid, p_region text)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_round uuid;
  v_clan uuid;
  v_stats public.player_stats;
begin
  select id into v_round from public.rounds where ends_at > now();
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

-- Funksjonene stoler på spiller-id-en de får, så bare Edge Functions får kalle dem
revoke execute on function
  public.moc_buy_soldiers(uuid, integer), public.moc_nuke(uuid, text), public.moc_missile_defense(uuid, text)
from public, anon, authenticated;

grant execute on function
  public.moc_buy_soldiers(uuid, integer), public.moc_nuke(uuid, text), public.moc_missile_defense(uuid, text)
to service_role;
