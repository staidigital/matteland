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

/** Styrer bare hva som vises. Den egentlige sjekken ligger i RLS og Edge Function. */
export function erAdmin(session: Session) {
  return session.user.app_metadata.role === 'admin'
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
