-- Ny balansering av belønningene: større forskjell mellom nivåene. Kjøres i SQL Editor på en database
-- som allerede har spill.sql. Virker med en gang, også midt i en runde.

create or replace function public.moc_answer(p_player uuid, p_task uuid, p_correct boolean)
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
    v_soldiers := case v_task.level when 1 then 4 when 2 then 16 else 60 end;
    v_gold := case v_task.level when 1 then 2 when 2 then 8 else 30 end;

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
