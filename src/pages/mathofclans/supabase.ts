import { useEffect, useState } from 'react'
import { createClient, type Session } from '@supabase/supabase-js'

// Publishable-nøkkelen er laget for å ligge åpent i frontend. Tilgangen styres av RLS i databasen.
const SUPABASE_URL = 'https://zyebusmnciiiwqszycsg.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_Xdpj3af3XtWNxNw4oWZguQ_fzpBa-yb'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)

/** Spillerne ser bare brukernavn. Supabase Auth krever e-post, så vi lager en intern adresse. */
const EPOST_DOMENE = 'spillere.matteland.no'

export function tilEpost(brukernavn: string) {
  return `${brukernavn.trim().toLowerCase()}@${EPOST_DOMENE}`
}

export function tilBrukernavn(session: Session) {
  return session.user.email?.split('@')[0] ?? ''
}

/** Hovedadmin ser alle rom og oppretter lærere. Styrer bare hva som vises: den egentlige sjekken ligger i RLS og Edge Function. */
export function erHovedadmin(session: Session) {
  return session.user.app_metadata.role === 'admin'
}

/** Både hovedadmin og lærere har et eget rom de administrerer. */
export function kanAdministrere(session: Session) {
  return erHovedadmin(session) || session.user.app_metadata.role === 'laerer'
}

/** Gir `undefined` mens sesjonen lastes, og `null` når ingen er innlogget. */
export function useSesjon() {
  const [sesjon, setSesjon] = useState<Session | null | undefined>(undefined)

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_hendelse, nySesjon) => {
      setSesjon(nySesjon)
    })
    return () => data.subscription.unsubscribe()
  }, [])

  return sesjon
}
