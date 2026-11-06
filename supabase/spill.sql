-- Spilloppsettet til Math of Clans. Kjøres i SQL Editor etter schema.sql, og deretter spill-kart.sql.

create table public.clans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  color text not null
);

alter table public.players
  add column clan_id uuid references public.clans (id) on delete set null;

create table public.regions (
  id text primary key,
  name text not null,
  topic text,
  defense numeric not null default 1,
  start_defenders integer not null default 0,
  locked boolean not null default false,
  start_order integer unique,
  neighbors text[] not null default '{}'
);

create table public.rounds (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null default now(),
  ends_at timestamptz not null
);

create table public.round_regions (
  round_id uuid not null references public.rounds (id) on delete cascade,
  region_id text not null references public.regions (id) on delete cascade,
  clan_id uuid references public.clans (id) on delete set null,
  defenders integer not null,
  primary key (round_id, region_id)
);

create table public.player_stats (
  round_id uuid not null references public.rounds (id) on delete cascade,
  player_id uuid not null references public.players (id) on delete cascade,
  soldiers integer not null default 0,
  gold integer not null default 0,
  correct integer not null default 0,
  wrong integer not null default 0,
  cooldown_until timestamptz,
  primary key (round_id, player_id)
);

-- Inneholder fasit, så klientene får aldri lese denne
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  round_id uuid not null references public.rounds (id) on delete cascade,
  player_id uuid not null references public.players (id) on delete cascade,
  topic text not null,
  level integer not null,
  answer jsonb not null,
  answered_at timestamptz,
  created_at timestamptz not null default now()
);
create index on public.tasks (player_id, answered_at);

create table public.round_events (
  id uuid primary key default gen_random_uuid(),
  round_id uuid not null references public.rounds (id) on delete cascade,
  message text not null,
  created_at timestamptz not null default now()
);
create index on public.round_events (round_id, created_at desc);

-- Tilgang: innloggede kan lese spilltilstanden. All skriving går via Edge Functions.
alter table public.clans enable row level security;
alter table public.regions enable row level security;
alter table public.rounds enable row level security;
alter table public.round_regions enable row level security;
alter table public.player_stats enable row level security;
alter table public.tasks enable row level security;
alter table public.round_events enable row level security;

create policy "Innloggede leser" on public.clans for select to authenticated using (true);
create policy "Innloggede leser" on public.regions for select to authenticated using (true);
create policy "Innloggede leser" on public.rounds for select to authenticated using (true);
create policy "Innloggede leser" on public.round_regions for select to authenticated using (true);
create policy "Innloggede leser" on public.player_stats for select to authenticated using (true);
create policy "Innloggede leser" on public.round_events for select to authenticated using (true);

-- Klanene skal kunne se hvem som er med på hvilket lag. Passordene ligger i en egen tabell.
drop policy "Spiller ser seg selv, admin ser alle" on public.players;
create policy "Innloggede leser" on public.players for select to authenticated using (true);

revoke all on
  public.clans, public.regions, public.rounds, public.round_regions,
  public.player_stats, public.tasks, public.round_events
from anon, authenticated;

grant select on
  public.clans, public.regions, public.rounds, public.round_regions,
  public.player_stats, public.round_events
to authenticated;

grant all on
  public.clans, public.regions, public.rounds, public.round_regions,
  public.player_stats, public.tasks, public.round_events
to service_role;

alter publication supabase_realtime add table public.rounds, public.round_regions, public.round_events;

-- Starter en ny runde. Forrige runde slettes.
create function public.moc_start_round(p_minutes integer)
returns uuid
language plpgsql
set search_path = ''
as $$
declare
  v_round uuid;
  v_clans integer;
begin
  if exists (select 1 from public.rounds where ends_at > now()) then
    raise exception 'En runde er allerede i gang.' using errcode = 'P0001';
  end if;
  select count(*) into v_clans from public.clans;
  if v_clans = 0 then
    raise exception 'Fordel spillerne på klaner først.' using errcode = 'P0001';
  end if;
  if v_clans > (select count(*) from public.regions where start_order is not null) then
    raise exception 'Det er for mange klaner til kartet.' using errcode = 'P0001';
  end if;

  delete from public.rounds where true;
  insert into public.rounds (ends_at)
    values (now() + make_interval(mins => p_minutes))
    returning id into v_round;

  insert into public.round_regions (round_id, region_id, defenders)
    select v_round, id, start_defenders from public.regions where not locked;

  update public.round_regions rr
    set clan_id = s.clan_id, defenders = 15
    from (
      select r.id as region_id, c.id as clan_id
      from (select id, row_number() over (order by start_order) as nr from public.regions where start_order is not null) r
      join (select id, row_number() over (order by name) as nr from public.clans) c on c.nr = r.nr
    ) s
    where rr.round_id = v_round and rr.region_id = s.region_id;

  insert into public.player_stats (round_id, player_id, soldiers)
    select v_round, id, 20 from public.players where clan_id is not null;

  insert into public.round_events (round_id, message) values (v_round, 'Runden har startet!');
  return v_round;
end;
$$;

create function public.moc_end_round()
returns void
language sql
set search_path = ''
as $$
  update public.rounds set ends_at = now() where ends_at > now();
$$;

-- Registrerer et svar. Bare ubesvarte oppgaver teller, så samme svar kan ikke sendes inn to ganger.
create function public.moc_answer(p_player uuid, p_task uuid, p_correct boolean)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  v_task public.tasks;
  v_clan uuid;
  v_soldiers integer := 0;
  v_gold integer := 0;
  v_bonus boolean := false;
  v_stats public.player_stats;
begin
  update public.tasks t set answered_at = now()
    from public.rounds r
    where t.id = p_task and t.player_id = p_player and t.answered_at is null
      and r.id = t.round_id and r.ends_at > now()
    returning t.* into v_task;
  if not found then
    raise exception 'Oppgaven er ikke lenger aktiv.' using errcode = 'P0001';
  end if;

  if p_correct then
    select clan_id into v_clan from public.players where id = p_player;
    v_soldiers := case v_task.level when 1 then 6 when 2 then 14 else 28 end;
    v_gold := case v_task.level when 1 then 3 when 2 then 7 else 14 end;

    -- Klaner som holder et område med dette temaet, får 50 % ekstra
    select exists (
      select 1 from public.round_regions rr
      join public.regions g on g.id = rr.region_id
      where rr.round_id = v_task.round_id and rr.clan_id = v_clan and g.topic = v_task.topic
    ) into v_bonus;
    if v_bonus then
      v_soldiers := ceil(v_soldiers * 1.5);
      v_gold := ceil(v_gold * 1.5);
    end if;

    insert into public.player_stats (round_id, player_id, soldiers, gold, correct)
      values (v_task.round_id, p_player, v_soldiers, v_gold, 1)
      on conflict (round_id, player_id) do update set
        soldiers = public.player_stats.soldiers + excluded.soldiers,
        gold = public.player_stats.gold + excluded.gold,
        correct = public.player_stats.correct + 1
      returning * into v_stats;
  else
    insert into public.player_stats (round_id, player_id, wrong, cooldown_until)
      values (v_task.round_id, p_player, 1, now() + interval '10 seconds')
      on conflict (round_id, player_id) do update set
        wrong = public.player_stats.wrong + 1,
        cooldown_until = excluded.cooldown_until
      returning * into v_stats;
  end if;

  return jsonb_build_object(
    'soldater', v_soldiers,
    'gull', v_gold,
    'bonus', v_bonus,
    'status', to_jsonb(v_stats)
  );
end;
$$;

-- Angriper et område med egne soldater. Terrengbonusen gjør at forsvarerne teller mer.
create function public.moc_attack(p_player uuid, p_region text, p_soldiers integer)
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

-- Bruker gull på å gi et av klanens områder flere forsvarere.
create function public.moc_fortify(p_player uuid, p_region text, p_gold integer)
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
  if p_gold is null or p_gold < 1 then
    raise exception 'Du må bruke minst ett gull.' using errcode = 'P0001';
  end if;

  update public.player_stats set gold = gold - p_gold
    where round_id = v_round and player_id = p_player and gold >= p_gold
    returning * into v_stats;
  if not found then
    raise exception 'Du har ikke nok gull.' using errcode = 'P0001';
  end if;

  update public.round_regions set defenders = defenders + p_gold
    where round_id = v_round and region_id = p_region and clan_id = v_clan;
  if not found then
    raise exception 'Området tilhører ikke klanen din.' using errcode = 'P0001';
  end if;

  return jsonb_build_object('status', to_jsonb(v_stats));
end;
$$;

-- Funksjonene stoler på spiller-id-en de får, så bare Edge Functions får kalle dem
revoke execute on function
  public.moc_start_round(integer), public.moc_end_round(),
  public.moc_answer(uuid, uuid, boolean), public.moc_attack(uuid, text, integer),
  public.moc_fortify(uuid, text, integer)
from public, anon, authenticated;

grant execute on function
  public.moc_start_round(integer), public.moc_end_round(),
  public.moc_answer(uuid, uuid, boolean), public.moc_attack(uuid, text, integer),
  public.moc_fortify(uuid, text, integer)
to service_role;
