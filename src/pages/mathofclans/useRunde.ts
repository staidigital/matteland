import { useCallback, useEffect, useState } from 'react'
import { supabase } from './supabase.ts'

export type Runde = { id: string; started_at: string; ends_at: string }
export type Klan = { id: string; name: string; color: string }
export type Spiller = { id: string; username: string; clan_id: string | null }
export type Omradestatus = { region_id: string; clan_id: string | null; defenders: number }
export type Hendelse = { id: string; message: string; created_at: string }
/** En animasjon som skal vises på kartet. Kommer bare via sanntid, så gamle hendelser spilles ikke av på nytt. */
export type Effekt = { id: string; effect: 'nuke_hit' | 'nuke_intercepted'; region_id: string }
export type Spillerstatus = {
  soldiers: number
  gold: number
  correct: number
  wrong: number
  cooldown_until: string | null
}

export type Tilstand = {
  runde: Runde | null
  klaner: Klan[]
  spillere: Spiller[]
  omrader: Record<string, Omradestatus>
  hendelser: Hendelse[]
  status: Spillerstatus | null
  /** Områdene der klanen din har missilforsvar. RLS skjuler forsvaret til andre klaner. */
  missilforsvar: string[]
}

const TOM: Tilstand = { runde: null, klaner: [], spillere: [], omrader: {}, hendelser: [], status: null, missilforsvar: [] }

/** Holder spilltilstanden oppdatert med sanntidsendringer. Henter alt på nytt av og til i tilfelle noe glipper. */
export function useRunde(spillerId: string) {
  const [tilstand, setTilstand] = useState<Tilstand>(TOM)
  const [lastet, setLastet] = useState(false)
  const [feil, setFeil] = useState('')
  const [effekter, setEffekter] = useState<Effekt[]>([])

  const oppdaterForsvar = useCallback(async () => {
    const { data } = await supabase.from('round_missile_defenses').select('region_id')
    if (data) setTilstand((t) => ({ ...t, missilforsvar: data.map((rad) => rad.region_id) }))
  }, [])

  const hent = useCallback(async () => {
    const [rundeSvar, klanSvar, spillerSvar] = await Promise.all([
      supabase.from('rounds').select('id, started_at, ends_at').order('started_at', { ascending: false }).limit(1).maybeSingle(),
      supabase.from('clans').select('id, name, color').order('name'),
      supabase.from('players').select('id, username, clan_id').order('username'),
    ])
    if (rundeSvar.error || klanSvar.error || spillerSvar.error) {
      setFeil('Kunne ikke hente spillet. Prøver igjen snart.')
      return
    }

    const runde = rundeSvar.data
    const [omradeSvar, hendelseSvar, statusSvar, forsvarSvar] = runde
      ? await Promise.all([
          supabase.from('round_regions').select('region_id, clan_id, defenders').eq('round_id', runde.id),
          supabase.from('round_events').select('id, message, created_at').eq('round_id', runde.id).order('created_at', { ascending: false }).limit(8),
          supabase.from('player_stats').select('soldiers, gold, correct, wrong, cooldown_until').eq('round_id', runde.id).eq('player_id', spillerId).maybeSingle(),
          supabase.from('round_missile_defenses').select('region_id').eq('round_id', runde.id),
        ])
      : [null, null, null, null]

    setFeil('')
    setTilstand({
      runde,
      klaner: klanSvar.data,
      spillere: spillerSvar.data,
      omrader: Object.fromEntries((omradeSvar?.data ?? []).map((o) => [o.region_id, o])),
      hendelser: hendelseSvar?.data ?? [],
      status: statusSvar?.data ?? null,
      missilforsvar: (forsvarSvar?.data ?? []).map((rad) => rad.region_id),
    })
    setLastet(true)
  }, [spillerId])

  useEffect(() => {
    void hent()
    const tidtaker = setInterval(() => void hent(), 30000)

    const kanal = supabase
      .channel('math-of-clans')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'rounds' }, () => void hent())
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'round_regions' }, ({ new: rad }) => {
        const omrade = rad as Omradestatus
        setTilstand((t) => ({ ...t, omrader: { ...t.omrader, [omrade.region_id]: omrade } }))
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'round_events' }, ({ new: rad }) => {
        setTilstand((t) => ({ ...t, hendelser: [rad as Hendelse, ...t.hendelser].slice(0, 8) }))
        const effekt = rad as Effekt
        if (effekt.effect) setEffekter((liste) => [...liste, effekt])
        // Kjøp av missilforsvar gir ingen hendelse, så lagkameratenes kjøp fanges opp her eller av den jevnlige hentingen
        void oppdaterForsvar()
      })
      .subscribe()

    return () => {
      clearInterval(tidtaker)
      void supabase.removeChannel(kanal)
    }
  }, [hent, oppdaterForsvar])

  const settStatus = useCallback((status: Spillerstatus) => {
    setTilstand((t) => ({ ...t, status }))
  }, [])

  const fjernEffekt = useCallback((id: string) => {
    setEffekter((liste) => liste.filter((e) => e.id !== id))
  }, [])

  return { tilstand, lastet, feil, settStatus, hent, effekter, fjernEffekt, oppdaterForsvar }
}
