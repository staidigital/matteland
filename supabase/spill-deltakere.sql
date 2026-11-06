-- Lar læreren velge hvilke spillere som er med i neste runde. Kjøres i SQL Editor på en database
-- som allerede har spill.sql, før den nye Edge Function og frontenden publiseres.

alter table public.players
  add column in_next_round boolean not null default true;

create or replace function public.moc_start_round(p_minutes integer)
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

  -- Spillere som er valgt bort, er ikke med. Klaner de etterlater tomme, skal ikke få område på kartet.
  update public.players set clan_id = null where not in_next_round and clan_id is not null;
  delete from public.clans c where not exists (select 1 from public.players p where p.clan_id = c.id);

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
