// Oppretter, endrer og sletter spillere, fordeler klaner og styrer runder. Trenger secret-nøkkelen, så det kan ikke gjøres fra nettleseren.
// Alt gjelder ett rom: en lærer styrer bare sitt eget, mens hovedadmin kan velge rom og dessuten opprette og slette lærere.
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

/** Lager en innlogging og lagrer passordet i oversikten. Gir enten id-en eller et ferdig feilsvar. */
async function lagBruker(brukernavn: unknown, passord: unknown, rolle?: 'laerer'): Promise<{ id: string } | { feil: Response }> {
  if (typeof brukernavn !== 'string' || typeof passord !== 'string') {
    return { feil: svar(400, { feil: 'Brukernavn og passord må fylles ut.' }) }
  }
  const navn = brukernavn.trim().toLowerCase()
  if (!GYLDIG_BRUKERNAVN.test(navn)) {
    return { feil: svar(400, { feil: 'Brukernavnet må ha 2–30 tegn: a–z, 0–9, - eller _.' }) }
  }

  const { data, error } = await admin.auth.admin.createUser({
    email: `${navn}@${EPOST_DOMENE}`,
    password: passord,
    email_confirm: true,
    ...(rolle ? { app_metadata: { role: rolle } } : {}),
  })
  if (error) {
    if (error.code === 'email_exists') return { feil: svar(409, { feil: 'Brukernavnet er allerede tatt.' }) }
    return { feil: svar(400, { feil: error.message }) }
  }

  const id = data.user.id
  const { error: passordFeil } = await admin.from('player_credentials').insert({ user_id: id, password_plain: passord })
  if (passordFeil) {
    await admin.auth.admin.deleteUser(id)
    return { feil: svar(500, { feil: passordFeil.message }) }
  }
  return { id }
}

async function opprett(rom: string, brukernavn: unknown, passord: unknown) {
  const bruker = await lagBruker(brukernavn, passord)
  if ('feil' in bruker) return bruker.feil

  const navn = (brukernavn as string).trim().toLowerCase()
  const { error } = await admin.from('players').insert({ id: bruker.id, username: navn, room_id: rom })
  if (error) {
    // Passordraden slettes sammen med brukeren (on delete cascade)
    await admin.auth.admin.deleteUser(bruker.id)
    return svar(500, { feil: error.message })
  }
  return svar(200, { id: bruker.id })
}

/** Læreren får et eget rom med samme navn som brukernavnet. */
async function opprettLaerer(brukernavn: unknown, passord: unknown) {
  const bruker = await lagBruker(brukernavn, passord, 'laerer')
  if ('feil' in bruker) return bruker.feil

  const navn = (brukernavn as string).trim().toLowerCase()
  const { error } = await admin.from('rooms').insert({ name: navn, owner_id: bruker.id })
  if (error) {
    await admin.auth.admin.deleteUser(bruker.id)
    return svar(500, { feil: error.message })
  }
  return svar(200, { id: bruker.id })
}

/** Hindrer at funksjonen endrer spillere i andre rom, eller andre brukere enn spillere. */
async function erSpiller(id: unknown, rom: string) {
  if (typeof id !== 'string') return false
  const { data } = await admin.from('players').select('id').eq('id', id).eq('room_id', rom).maybeSingle()
  return data !== null
}

/** Finner læreren som eier rommet. Gir `null` for ukjente rom og for rommet til hovedadmin, som ikke kan endres herfra. */
async function finnLaerer(rom: unknown) {
  if (typeof rom !== 'string') return null
  const { data: rad } = await admin.from('rooms').select('owner_id').eq('id', rom).maybeSingle()
  if (!rad) return null
  const { data, error } = await admin.auth.admin.getUserById(rad.owner_id)
  if (error || data.user?.app_metadata.role !== 'laerer') return null
  return rad.owner_id as string
}

async function settPassord(id: string, passord: string) {
  const { error } = await admin.auth.admin.updateUserById(id, { password: passord })
  if (error) return svar(400, { feil: error.message })

  const { error: lagreFeil } = await admin
    .from('player_credentials')
    .upsert({ user_id: id, password_plain: passord })
  if (lagreFeil) {
    return svar(500, { feil: `Passordet ble byttet, men ikke lagret i oversikten: ${lagreFeil.message}` })
  }
  return svar(200, { ok: true })
}

async function byttPassord(rom: string, id: unknown, passord: unknown) {
  if (typeof passord !== 'string') return svar(400, { feil: 'Passord må fylles ut.' })
  if (!(await erSpiller(id, rom))) return svar(404, { feil: 'Fant ikke spilleren.' })
  return settPassord(id as string, passord)
}

async function byttLaererpassord(rom: unknown, passord: unknown) {
  if (typeof passord !== 'string') return svar(400, { feil: 'Passord må fylles ut.' })
  const laerer = await finnLaerer(rom)
  if (!laerer) return svar(404, { feil: 'Fant ikke læreren.' })
  return settPassord(laerer, passord)
}

async function slett(rom: string, id: unknown) {
  if (!(await erSpiller(id, rom))) return svar(404, { feil: 'Fant ikke spilleren.' })
  const { error } = await admin.auth.admin.deleteUser(id as string)
  if (error) return svar(500, { feil: error.message })
  return svar(200, { ok: true })
}

/** Sletter læreren, rommet og alle spillerne i det. Spillerne må bort først, ellers nekter databasen å slette rommet. */
async function slettLaerer(rom: unknown) {
  const laerer = await finnLaerer(rom)
  if (!laerer) return svar(404, { feil: 'Fant ikke læreren.' })

  const { data: spillere, error } = await admin.from('players').select('id').eq('room_id', rom as string)
  if (error) return svar(500, { feil: error.message })
  for (const spiller of spillere) {
    const { error: spillerFeil } = await admin.auth.admin.deleteUser(spiller.id)
    if (spillerFeil) return svar(500, { feil: spillerFeil.message })
  }

  // Rommet, klanene og rundene slettes sammen med brukeren (on delete cascade)
  const { error: laererFeil } = await admin.auth.admin.deleteUser(laerer)
  if (laererFeil) return svar(500, { feil: laererFeil.message })
  return svar(200, { ok: true })
}

const KLANNAVN = [
  'Kvadratklanen', 'De Ukjente', 'Brøkbrigaden', 'Team Pi', 'Parabolene',
  'Rotfolket', 'Fellesnevnerne', 'Faktorflokken', 'Team X', 'Stigningstallene',
]
const KLANFARGER = ['#d9483b', '#2f7fd1', '#e2a11b', '#2ea26f', '#8a56c9', '#e0702a', '#19a3a8', '#d44c9c', '#7f8c2d', '#5d6fd6']

async function rundePagar(rom: string) {
  const { data } = await admin
    .from('rounds')
    .select('id')
    .eq('room_id', rom)
    .gt('ends_at', new Date().toISOString())
    .maybeSingle()
  return data !== null
}

/** Lager nye klaner i rommet og fordeler spillerne som er med i neste runde, tilfeldig. De andre mister klanen sin. */
async function fordelKlaner(rom: string, storrelse: unknown) {
  if (typeof storrelse !== 'number' || storrelse < 1) return svar(400, { feil: 'Ugyldig klanstørrelse.' })
  if (await rundePagar(rom)) return svar(400, { feil: 'Klanene kan ikke fordeles mens en runde pågår.' })

  const { data: spillere, error } = await admin.from('players').select('id').eq('room_id', rom).eq('in_next_round', true)
  if (error) return svar(500, { feil: error.message })
  if (!spillere.length) return svar(400, { feil: 'Ingen spillere er valgt til neste runde.' })

  const antall = Math.ceil(spillere.length / storrelse)
  if (antall > KLANNAVN.length) return svar(400, { feil: `Det kan være høyst ${KLANNAVN.length} klaner. Velg større klaner.` })

  const { error: slettFeil } = await admin.from('clans').delete().eq('room_id', rom)
  if (slettFeil) return svar(500, { feil: slettFeil.message })

  const { data: klaner, error: klanFeil } = await admin
    .from('clans')
    .insert(KLANNAVN.slice(0, antall).map((name, i) => ({ name, color: KLANFARGER[i], room_id: rom })))
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

async function settKlan(rom: string, id: unknown, klan: unknown) {
  if (!(await erSpiller(id, rom))) return svar(404, { feil: 'Fant ikke spilleren.' })
  if (await rundePagar(rom)) return svar(400, { feil: 'Klaner kan ikke endres mens en runde pågår.' })
  if (klan) {
    if (typeof klan !== 'string') return svar(400, { feil: 'Ugyldig klan.' })
    const { data } = await admin.from('clans').select('id').eq('id', klan).eq('room_id', rom).maybeSingle()
    if (!data) return svar(404, { feil: 'Fant ikke klanen.' })
  }
  const { error } = await admin.from('players').update({ clan_id: klan || null }).eq('id', id as string)
  if (error) return svar(500, { feil: error.message })
  return svar(200, { ok: true })
}

/** Gjelder fra neste runde, så det er trygt mens en runde pågår. Klanen ryddes når runden startes. */
async function settMed(rom: string, id: unknown, med: unknown) {
  if (typeof med !== 'boolean') return svar(400, { feil: 'Ugyldig valg.' })
  if (!(await erSpiller(id, rom))) return svar(404, { feil: 'Fant ikke spilleren.' })
  const { error } = await admin.from('players').update({ in_next_round: med }).eq('id', id as string)
  if (error) return svar(500, { feil: error.message })
  return svar(200, { ok: true })
}

async function startRunde(rom: string, minutter: unknown) {
  if (typeof minutter !== 'number' || minutter < 1 || minutter > 180) return svar(400, { feil: 'Ugyldig rundelengde.' })
  const { error } = await admin.rpc('moc_start_round', { p_room: rom, p_minutes: Math.round(minutter) })
  if (error) return svar(error.code === 'P0001' ? 400 : 500, { feil: error.message })
  return svar(200, { ok: true })
}

async function avsluttRunde(rom: string) {
  const { error } = await admin.rpc('moc_end_round', { p_room: rom })
  if (error) return svar(500, { feil: error.message })
  return svar(200, { ok: true })
}

const LAERERHANDLINGER = ['opprett-laerer', 'bytt-laererpassord', 'slett-laerer']

/** En lærer får alltid sitt eget rom. Hovedadmin kan velge et annet, og får ellers sitt eget. */
async function finnRom(bruker: string, hovedadmin: boolean, onsket: unknown) {
  const sporring = admin.from('rooms').select('id')
  const { data } =
    hovedadmin && typeof onsket === 'string'
      ? await sporring.eq('id', onsket).maybeSingle()
      : await sporring.eq('owner_id', bruker).maybeSingle()
  return (data?.id as string | undefined) ?? null
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return svar(405, { feil: 'Bare POST er tillatt.' })

  const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '') ?? ''
  const { data, error } = await admin.auth.getUser(token)
  if (error || !data.user) return svar(401, { feil: 'Du må være innlogget.' })
  const rolle = data.user.app_metadata.role
  if (rolle !== 'admin' && rolle !== 'laerer') return svar(403, { feil: 'Bare admin har tilgang.' })
  const hovedadmin = rolle === 'admin'

  let innhold: Record<string, unknown>
  try {
    innhold = await req.json()
  } catch {
    return svar(400, { feil: 'Ugyldig forespørsel.' })
  }

  // Lærerne styres bare av hovedadmin
  if (LAERERHANDLINGER.includes(innhold.handling as string) && !hovedadmin) {
    return svar(403, { feil: 'Bare hovedadmin har tilgang.' })
  }
  switch (innhold.handling) {
    case 'opprett-laerer':
      return opprettLaerer(innhold.brukernavn, innhold.passord)
    case 'bytt-laererpassord':
      return byttLaererpassord(innhold.rom, innhold.passord)
    case 'slett-laerer':
      return slettLaerer(innhold.rom)
  }

  const rom = await finnRom(data.user.id, hovedadmin, innhold.rom)
  if (!rom) return svar(404, { feil: 'Fant ikke rommet.' })

  switch (innhold.handling) {
    case 'opprett':
      return opprett(rom, innhold.brukernavn, innhold.passord)
    case 'bytt-passord':
      return byttPassord(rom, innhold.id, innhold.passord)
    case 'slett':
      return slett(rom, innhold.id)
    case 'fordel-klaner':
      return fordelKlaner(rom, innhold.storrelse)
    case 'sett-klan':
      return settKlan(rom, innhold.id, innhold.klan)
    case 'sett-med':
      return settMed(rom, innhold.id, innhold.med)
    case 'start-runde':
      return startRunde(rom, innhold.minutter)
    case 'avslutt-runde':
      return avsluttRunde(rom)
    default:
      return svar(400, { feil: 'Ukjent handling.' })
  }
})
