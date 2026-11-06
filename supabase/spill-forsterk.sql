-- Forsterking koster nå soldater i stedet for gull, så gull bare brukes i butikken. Kjøres i SQL Editor på en
-- database som allerede har spill.sql, rett før den nye Edge Function publiseres. Forsterking feiler i tiden mellom de to.

drop function public.moc_fortify(uuid, text, integer);

-- Flytter egne soldater inn i et av klanens områder, der de blir forsvarere.
create function public.moc_fortify(p_player uuid, p_region text, p_soldiers integer)
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

-- Funksjonen stoler på spiller-id-en den får, så bare Edge Functions får kalle den
revoke execute on function public.moc_fortify(uuid, text, integer) from public, anon, authenticated;
grant execute on function public.moc_fortify(uuid, text, integer) to service_role;
