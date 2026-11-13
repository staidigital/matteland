// Handlingene spillerne gjør i en runde. All spillogikk skjer på serveren, så nettleseren kan ikke jukse.
// Publiseres med --no-verify-jwt, fordi innloggingen sjekkes her i koden.
import { createClient } from 'npm:@supabase/supabase-js@2'
import { erRiktig, lagOppgave, TEMAER, type Fasit, type Tema } from './oppgaver.ts'

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
const db = createClient(Deno.env.get('SUPABASE_URL')!, Object.values(hemmeligeNokler)[0] as string, {
  auth: { persistSession: false, autoRefreshToken: false },
})

/** Egne feilmeldinger fra databasen (P0001) vises til spilleren. Andre feil skjules. */
function rpcSvar(data: unknown, error: { code?: string; message: string } | null) {
  if (!error) return svar(200, data as Record<string, unknown>)
  if (error.code === 'P0001') return svar(400, { feil: error.message })
  console.error(error)
  return svar(500, { feil: 'Noe gikk galt på serveren.' })
}

async function nyOppgave(spiller: string, rom: string, niva: unknown) {
  if (![1, 2, 3].includes(niva as number)) return svar(400, { feil: 'Ukjent nivå.' })

  // Hvert rom har sin egen runde
  const { data: runde } = await db
    .from('rounds')
    .select('id')
    .eq('room_id', rom)
    .gt('ends_at', new Date().toISOString())
    .maybeSingle()
  if (!runde) return svar(400, { feil: 'Ingen runde er i gang.' })

  const { data: status } = await db
    .from('player_stats')
    .select('cooldown_until')
    .eq('round_id', runde.id)
    .eq('player_id', spiller)
    .maybeSingle()
  if (status?.cooldown_until && new Date(status.cooldown_until) > new Date()) {
    return svar(429, { feil: 'Du må vente litt etter et feil svar.', ventTil: status.cooldown_until })
  }

  // Spørsmålet lagres sammen med fasiten, så spilleren ikke får de samme oppgavene om igjen
  const { data: tidligere } = await db
    .from('tasks')
    .select('topic, sporsmal:answer->>sporsmal')
    .eq('player_id', spiller)
    .eq('level', niva)
    .order('created_at', { ascending: false })
    .limit(2000)
  const rader = (tidligere ?? []) as { topic: string; sporsmal: string | null }[]

  // Spilleren velger bare nivå. Temaet trekkes, men aldri det samme to ganger på rad.
  const mulige = TEMAER.filter((t) => t !== rader[0]?.topic)
  const tema: Tema = mulige[Math.floor(Math.random() * mulige.length)]
  const brukte = rader.filter((rad) => rad.topic === tema && rad.sporsmal).map((rad) => rad.sporsmal as string)
  const oppgave = lagOppgave(tema, niva as number, brukte)

  // En spiller har bare én åpen oppgave om gangen
  await db.from('tasks').delete().eq('player_id', spiller).is('answered_at', null)
  const { data, error } = await db
    .from('tasks')
    .insert({ round_id: runde.id, player_id: spiller, topic: tema, level: niva, answer: { ...oppgave.fasit, sporsmal: oppgave.sporsmal } })
    .select('id')
    .single()
  if (error) return rpcSvar(null, error)

  return svar(200, { id: data.id, tema, sporsmal: oppgave.sporsmal, valg: oppgave.valg ?? null, hint: oppgave.hint ?? null, felt: oppgave.felt ?? null })
}

async function svarPaOppgave(spiller: string, id: unknown, svarTekst: unknown) {
  if (typeof id !== 'string' || typeof svarTekst !== 'string') return svar(400, { feil: 'Ugyldig svar.' })

  const { data: oppgave } = await db
    .from('tasks')
    .select('answer')
    .eq('id', id)
    .eq('player_id', spiller)
    .is('answered_at', null)
    .maybeSingle()
  if (!oppgave) return svar(400, { feil: 'Oppgaven er ikke lenger aktiv.' })

  const fasit = oppgave.answer as Fasit
  const riktig = erRiktig(fasit, svarTekst)
  const { data, error } = await db.rpc('moc_answer', { p_player: spiller, p_task: id, p_correct: riktig })
  if (error) return rpcSvar(null, error)
  return svar(200, { ...data, riktig, fasit: fasit.tekst })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return svar(405, { feil: 'Bare POST er tillatt.' })

  const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '') ?? ''
  const { data: bruker, error: brukerFeil } = await db.auth.getUser(token)
  if (brukerFeil || !bruker.user) return svar(401, { feil: 'Du må være innlogget.' })

  const spiller = bruker.user.id
  const { data: rad } = await db.from('players').select('clan_id, room_id').eq('id', spiller).maybeSingle()
  if (!rad?.clan_id) return svar(403, { feil: 'Du er ikke med i en klan.' })

  let innhold: Record<string, unknown>
  try {
    innhold = await req.json()
  } catch {
    return svar(400, { feil: 'Ugyldig forespørsel.' })
  }

  switch (innhold.handling) {
    case 'ny-oppgave':
      return nyOppgave(spiller, rad.room_id, innhold.niva)
    case 'svar':
      return svarPaOppgave(spiller, innhold.id, innhold.svar)
    case 'angrip': {
      const { data, error } = await db.rpc('moc_attack', {
        p_player: spiller,
        p_region: innhold.omrade,
        p_soldiers: innhold.antall,
      })
      return rpcSvar(data, error)
    }
    case 'forsterk': {
      const { data, error } = await db.rpc('moc_fortify', {
        p_player: spiller,
        p_region: innhold.omrade,
        p_soldiers: innhold.antall,
      })
      return rpcSvar(data, error)
    }
    case 'kjop-soldater': {
      const { data, error } = await db.rpc('moc_buy_soldiers', { p_player: spiller, p_soldiers: innhold.antall })
      return rpcSvar(data, error)
    }
    case 'nuke': {
      const { data, error } = await db.rpc('moc_nuke', { p_player: spiller, p_region: innhold.omrade })
      return rpcSvar(data, error)
    }
    case 'missilforsvar': {
      const { data, error } = await db.rpc('moc_missile_defense', { p_player: spiller, p_region: innhold.omrade })
      return rpcSvar(data, error)
    }
    default:
      return svar(400, { feil: 'Ukjent handling.' })
  }
})
