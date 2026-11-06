// Oppretter, endrer og sletter spillere, fordeler klaner og styrer runder. Trenger secret-nøkkelen, så det kan ikke gjøres fra nettleseren.
// Publiseres med --no-verify-jwt, fordi innloggingen sjekkes her i koden.
import { createClient } from 'npm:@supabase/supabase-js@2'

const EPOST_DOMENE = 'spillere.matteland.no'
const GYLDIG_BRUKERNAVN = /^[a-z0-9_-]{2,30}$/

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function svar(status: number, innhold: Record<string, unknown>) {
  return new Response(JSON.stringify(innhold), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

const hemmeligeNokler = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') ?? '{}')
const admin = createClient(Deno.env.get('SUPABASE_URL')!, Object.values(hemmeligeNokler)[0] as string, {
  auth: { persistSession: false, autoRefreshToken: false },
})

async function opprett(brukernavn: unknown, passord: unknown) {
  if (typeof brukernavn !== 'string' || typeof passord !== 'string') {
    return svar(400, { feil: 'Brukernavn og passord må fylles ut.' })
  }
  const navn = brukernavn.trim().toLowerCase()
  if (!GYLDIG_BRUKERNAVN.test(navn)) {
    return svar(400, { feil: 'Brukernavnet må ha 2–30 tegn: a–z, 0–9, - eller _.' })
  }

  const { data, error } = await admin.auth.admin.createUser({
    email: `${navn}@${EPOST_DOMENE}`,
    password: passord,
    email_confirm: true,
  })
  if (error) {
    if (error.code === 'email_exists') return svar(409, { feil: 'Brukernavnet er allerede tatt.' })
    return svar(400, { feil: error.message })
  }

  const id = data.user.id
  const { error: spillerFeil } = await admin.from('players').insert({ id, username: navn })
  const { error: passordFeil } = spillerFeil
    ? { error: null }
    : await admin.from('player_credentials').insert({ user_id: id, password_plain: passord })
  if (spillerFeil || passordFeil) {
    // Radene slettes sammen med brukeren (on delete cascade)
    await admin.auth.admin.deleteUser(id)
    return svar(500, { feil: (spillerFeil ?? passordFeil)!.message })
  }
  return svar(200, { id })
}

/** Hindrer at funksjonen endrer andre brukere enn spillere, for eksempel admin-kontoen. */
async function erSpiller(id: unknown) {
  if (typeof id !== 'string') return false
  const { data } = await admin.from('players').select('id').eq('id', id).maybeSingle()
  return data !== null
}

async function byttPassord(id: unknown, passord: unknown) {
  if (typeof passord !== 'string') return svar(400, { feil: 'Passord må fylles ut.' })
  if (!(await erSpiller(id))) return svar(404, { feil: 'Fant ikke spilleren.' })

  const { error } = await admin.auth.admin.updateUserById(id as string, { password: passord })
  if (error) return svar(400, { feil: error.message })

  const { error: lagreFeil } = await admin
    .from('player_credentials')
    .upsert({ user_id: id, password_plain: passord })
  if (lagreFeil) {
    return svar(500, { feil: `Passordet ble byttet, men ikke lagret i oversikten: ${lagreFeil.message}` })
  }
  return svar(200, { ok: true })
}

async function slett(id: unknown) {
  if (!(await erSpiller(id))) return svar(404, { feil: 'Fant ikke spilleren.' })
  const { error } = await admin.auth.admin.deleteUser(id as string)
  if (error) return svar(500, { feil: error.message })
  return svar(200, { ok: true })
}

const KLANNAVN = [
  'Kvadratklanen', 'De Ukjente', 'Brøkbrigaden', 'Team Pi', 'Parabolene',
  'Rotfolket', 'Fellesnevnerne', 'Faktorflokken', 'Team X', 'Stigningstallene',
]
const KLANFARGER = ['#d9483b', '#2f7fd1', '#e2a11b', '#2ea26f', '#8a56c9', '#e0702a', '#19a3a8', '#d44c9c', '#7f8c2d', '#5d6fd6']

async function rundePagar() {
  const { data } = await admin.from('rounds').select('id').gt('ends_at', new Date().toISOString()).maybeSingle()
  return data !== null
}

/** Lager nye klaner og fordeler alle spillerne tilfeldig. */
async function fordelKlaner(storrelse: unknown) {
  if (typeof storrelse !== 'number' || storrelse < 1) return svar(400, { feil: 'Ugyldig klanstørrelse.' })
  if (await rundePagar()) return svar(400, { feil: 'Klanene kan ikke fordeles mens en runde pågår.' })

  const { data: spillere, error } = await admin.from('players').select('id')
  if (error) return svar(500, { feil: error.message })
  if (!spillere.length) return svar(400, { feil: 'Det finnes ingen spillere.' })

  const antall = Math.ceil(spillere.length / storrelse)
  if (antall > KLANNAVN.length) return svar(400, { feil: `Det kan være høyst ${KLANNAVN.length} klaner. Velg større klaner.` })

  const { error: slettFeil } = await admin.from('clans').delete().not('id', 'is', null)
  if (slettFeil) return svar(500, { feil: slettFeil.message })

  const { data: klaner, error: klanFeil } = await admin
    .from('clans')
    .insert(KLANNAVN.slice(0, antall).map((name, i) => ({ name, color: KLANFARGER[i] })))
    .select('id')
  if (klanFeil) return svar(500, { feil: klanFeil.message })

  const stokket = [...spillere].sort(() => Math.random() - 0.5)
  const resultater = await Promise.all(
    stokket.map((spiller, i) =>
      admin.from('players').update({ clan_id: klaner[i % antall].id }).eq('id', spiller.id),
    ),
  )
  const feil = resultater.find((r) => r.error)?.error
  if (feil) return svar(500, { feil: feil.message })
  return svar(200, { ok: true })
}

async function settKlan(id: unknown, klan: unknown) {
  if (!(await erSpiller(id))) return svar(404, { feil: 'Fant ikke spilleren.' })
  if (await rundePagar()) return svar(400, { feil: 'Klaner kan ikke endres mens en runde pågår.' })
  const { error } = await admin.from('players').update({ clan_id: klan || null }).eq('id', id as string)
  if (error) return svar(500, { feil: error.message })
  return svar(200, { ok: true })
}

async function startRunde(minutter: unknown) {
  if (typeof minutter !== 'number' || minutter < 1 || minutter > 180) return svar(400, { feil: 'Ugyldig rundelengde.' })
  const { error } = await admin.rpc('moc_start_round', { p_minutes: Math.round(minutter) })
  if (error) return svar(error.code === 'P0001' ? 400 : 500, { feil: error.message })
  return svar(200, { ok: true })
}

async function avsluttRunde() {
  const { error } = await admin.rpc('moc_end_round')
  if (error) return svar(500, { feil: error.message })
  return svar(200, { ok: true })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return svar(405, { feil: 'Bare POST er tillatt.' })

  const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '') ?? ''
  const { data, error } = await admin.auth.getUser(token)
  if (error || !data.user) return svar(401, { feil: 'Du må være innlogget.' })
  if (data.user.app_metadata.role !== 'admin') return svar(403, { feil: 'Bare admin har tilgang.' })

  let innhold: Record<string, unknown>
  try {
    innhold = await req.json()
  } catch {
    return svar(400, { feil: 'Ugyldig forespørsel.' })
  }

  switch (innhold.handling) {
    case 'opprett':
      return opprett(innhold.brukernavn, innhold.passord)
    case 'bytt-passord':
      return byttPassord(innhold.id, innhold.passord)
    case 'slett':
      return slett(innhold.id)
    case 'fordel-klaner':
      return fordelKlaner(innhold.storrelse)
    case 'sett-klan':
      return settKlan(innhold.id, innhold.klan)
    case 'start-runde':
      return startRunde(innhold.minutter)
    case 'avslutt-runde':
      return avsluttRunde()
    default:
      return svar(400, { feil: 'Ukjent handling.' })
  }
})
