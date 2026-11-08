-- Kraftigere nuke: treffet utsletter området, og naboene mister halvparten av troppene. Kjøres i SQL Editor på en
-- database som allerede har spill-butikk.sql. Virker med en gang, også midt i en runde. Edge Function er uendret.

-- Nuker et område for 150 gull. Rekker over hele kartet, men et missilforsvar skyter den ned og brukes opp.
-- Et treff gjør området nøytralt uten tropper, og naboområdene mister halvparten av troppene.
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
