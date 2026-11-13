import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FunctionsHttpError } from '@supabase/supabase-js'
import { erHovedadmin, kanAdministrere, supabase, useSesjon } from './supabase.ts'
import './mathofclans.css'

type Spiller = { id: string; brukernavn: string; passord: string; klan: string | null; med: boolean }
type Klan = { id: string; name: string }
type Runde = { ends_at: string }
type Rom = { id: string; navn: string; eier: string }

const ADJEKTIV = ['rask', 'modig', 'klok', 'sterk', 'stille', 'vill', 'lur', 'glad', 'stolt', 'kjapp', 'tapper', 'sprek']
const DYR = ['drage', 'ulv', 'ravn', 'bjorn', 'rev', 'orn', 'elg', 'gaupe', 'hauk', 'oter', 'hjort', 'tiger']

function tilfeldig(antall: number) {
  return crypto.getRandomValues(new Uint32Array(1))[0] % antall
}

/** Lager passord som er enkle å dele ut, for eksempel «modig-ulv-482». Uten æøå, så de er lette å skrive. */
function lagPassord() {
  return `${ADJEKTIV[tilfeldig(ADJEKTIV.length)]}-${DYR[tilfeldig(DYR.length)]}-${100 + tilfeldig(900)}`
}

/** Sender en handling til Edge Function, og gir tilbake feilmeldingen hvis den feiler. */
async function kall(innhold: Record<string, unknown>) {
  const { error } = await supabase.functions.invoke('administrer-spillere', { body: innhold })
  if (!error) return null
  if (error instanceof FunctionsHttpError) {
    const svar = await error.context.json().catch(() => null)
    if (svar?.feil) return svar.feil as string
  }
  return 'Fikk ikke kontakt med serveren.'
}

function klokkeslett(tid: string) {
  return new Date(tid).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })
}

export default function Admin() {
  const sesjon = useSesjon()

  if (sesjon === undefined) return null
  if (!sesjon || !kanAdministrere(sesjon)) return <Navigate to="/math-of-clans" replace />
  return <Administrasjon brukerId={sesjon.user.id} hovedadmin={erHovedadmin(sesjon)} />
}

/** En lærer ser bare sitt eget rom. Hovedadmin ser alle, og velger hvilket som skal administreres. */
function Administrasjon({ brukerId, hovedadmin }: { brukerId: string; hovedadmin: boolean }) {
  const [rom, setRom] = useState<Rom[] | null>(null)
  const [valgt, setValgt] = useState<string | null>(null)
  const [feil, setFeil] = useState('')
  // Økes når spillerne i et rom endres, så romoversikten henter tallene på nytt
  const [versjon, setVersjon] = useState(0)

  const hentRom = useCallback(async () => {
    const { data, error } = await supabase.from('rooms').select('id, name, owner_id').order('name')
    if (error) {
      setFeil('Kunne ikke hente rommene.')
      return
    }
    setFeil('')
    setRom(data.map((rad) => ({ id: rad.id, navn: rad.name, eier: rad.owner_id })))
  }, [])

  useEffect(() => {
    void hentRom()
  }, [hentRom])

  const meldEndring = useCallback(() => setVersjon((v) => v + 1), [])

  const aktivt = rom?.find((r) => r.id === valgt) ?? rom?.find((r) => r.eier === brukerId) ?? rom?.[0]

  return (
    <section className="moc-admin">
      <div className="kicker">Math of Clans</div>
      <h1>Administrer</h1>
      <Link className="moc-lenke" to="/math-of-clans">
        Tilbake til spillet
      </Link>

      {feil && (
        <p className="moc-feil" role="alert">
          {feil}
        </p>
      )}

      {hovedadmin && rom && (
        <Romoversikt
          rom={rom}
          brukerId={brukerId}
          aktivt={aktivt?.id ?? null}
          velg={setValgt}
          hentRom={hentRom}
          versjon={versjon}
        />
      )}

      {rom && !aktivt && <p className="moc-beskjed">Brukeren din har ikke noe rom ennå.</p>}

      {aktivt && (
        <Spilleradministrasjon
          key={aktivt.id}
          rom={aktivt.id}
          romnavn={hovedadmin ? aktivt.navn : null}
          meldEndring={meldEndring}
        />
      )}
    </section>
  )
}

type RomoversiktProps = {
  rom: Rom[]
  brukerId: string
  aktivt: string | null
  velg: (id: string) => void
  hentRom: () => Promise<void>
  versjon: number
}

/** Bare for hovedadmin: alle rommene med lærer, antall spillere og runde, og skjema for å opprette nye lærere. */
function Romoversikt({ rom, brukerId, aktivt, velg, hentRom, versjon }: RomoversiktProps) {
  const [antall, setAntall] = useState<Map<string, number>>(new Map())
  const [runder, setRunder] = useState<Map<string, string>>(new Map())
  const [passordFor, setPassordFor] = useState<Map<string, string>>(new Map())
  const [brukernavn, setBrukernavn] = useState('')
  const [passord, setPassord] = useState(lagPassord)
  const [feil, setFeil] = useState('')
  const [venter, setVenter] = useState(false)

  const hentOversikt = useCallback(async () => {
    const [spillerSvar, rundeSvar, passordSvar] = await Promise.all([
      supabase.from('players').select('room_id'),
      supabase.from('rounds').select('room_id, ends_at').gt('ends_at', new Date().toISOString()),
      supabase.from('player_credentials').select('user_id, password_plain'),
    ])
    if (spillerSvar.error || rundeSvar.error || passordSvar.error) {
      setFeil('Kunne ikke hente oversikten over rommene.')
      return
    }
    const teller = new Map<string, number>()
    for (const rad of spillerSvar.data) teller.set(rad.room_id, (teller.get(rad.room_id) ?? 0) + 1)
    setAntall(teller)
    setRunder(new Map(rundeSvar.data.map((rad) => [rad.room_id, rad.ends_at])))
    setPassordFor(new Map(passordSvar.data.map((rad) => [rad.user_id, rad.password_plain])))
  }, [])

  useEffect(() => {
    void hentOversikt()
  }, [hentOversikt, versjon, rom])

  async function utfor(innhold: Record<string, unknown>) {
    setVenter(true)
    setFeil('')
    const feilmelding = await kall(innhold)
    if (feilmelding) setFeil(feilmelding)
    // Henter også etter en feil, for sletting av en lærer kan ha stoppet halvveis
    await hentRom()
    await hentOversikt()
    setVenter(false)
    return !feilmelding
  }

  async function opprett(event: FormEvent) {
    event.preventDefault()
    if (await utfor({ handling: 'opprett-laerer', brukernavn, passord })) {
      setBrukernavn('')
      setPassord(lagPassord())
    }
  }

  function byttPassord(r: Rom) {
    if (window.confirm(`Gi ${r.navn} nytt passord? Det gamle slutter å virke.`)) {
      void utfor({ handling: 'bytt-laererpassord', rom: r.id, passord: lagPassord() })
    }
  }

  function slett(r: Rom) {
    const spillere = antall.get(r.id) ?? 0
    const med = spillere > 0 ? ` og de ${spillere} spillerne i rommet` : ''
    if (window.confirm(`Slette læreren ${r.navn}${med}? Dette kan ikke angres.`)) {
      void utfor({ handling: 'slett-laerer', rom: r.id })
    }
  }

  const totalt = [...antall.values()].reduce((sum, n) => sum + n, 0)

  return (
    <>
      <div className="moc-kort">
        <h2>Rom og lærere</h2>
        <p className="moc-beskjed">
          <strong>{totalt}</strong> spillere i <strong>{rom.length}</strong> rom. Velg et rom for å se og styre spillerne der.
        </p>
        <ul className="moc-spillere moc-rom">
          {rom.map((r) => {
            const eget = r.eier === brukerId
            const slutter = runder.get(r.id)
            return (
              <li key={r.id}>
                <span className="moc-spiller-info">
                  <strong>
                    {r.navn}
                    {eget && ' (ditt rom)'}
                  </strong>
                  {!eget && <code>{passordFor.get(r.eier) ?? ''}</code>}
                  <span className="moc-rom-status">
                    {antall.get(r.id) ?? 0} spillere{slutter ? ` · runde pågår til ${klokkeslett(slutter)}` : ''}
                  </span>
                </span>
                <div className="moc-spiller-valg">
                  <button type="button" className="moc-knapp-liten" aria-pressed={r.id === aktivt} onClick={() => velg(r.id)}>
                    {r.id === aktivt ? 'Valgt' : 'Velg'}
                  </button>
                  {!eget && (
                    <>
                      <button type="button" className="moc-knapp-liten" disabled={venter} onClick={() => byttPassord(r)}>
                        Nytt passord
                      </button>
                      <button type="button" className="moc-knapp-liten" disabled={venter} onClick={() => slett(r)}>
                        Slett
                      </button>
                    </>
                  )}
                </div>
              </li>
            )
          })}
        </ul>
        {feil && (
          <p className="moc-feil" role="alert">
            {feil}
          </p>
        )}
      </div>

      <form className="moc-kort" onSubmit={opprett}>
        <h2>Ny lærer</h2>
        <p className="moc-beskjed">Læreren får et eget rom, og ser og styrer bare spillerne sine.</p>
        <label htmlFor="moc-laerer-brukernavn">Brukernavn</label>
        <input
          id="moc-laerer-brukernavn"
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={brukernavn}
          onChange={(e) => setBrukernavn(e.target.value)}
        />

        <label htmlFor="moc-laerer-passord">Passord</label>
        <div className="moc-felt-rad">
          <input
            id="moc-laerer-passord"
            type="text"
            autoComplete="off"
            spellCheck={false}
            required
            minLength={6}
            value={passord}
            onChange={(e) => setPassord(e.target.value)}
          />
          <button type="button" className="moc-knapp-liten" onClick={() => setPassord(lagPassord())}>
            Nytt forslag
          </button>
        </div>

        <button type="submit" className="moc-knapp" disabled={venter}>
          Opprett lærer
        </button>
      </form>
    </>
  )
}

type SpilleradministrasjonProps = {
  rom: string
  /** Vises som overskrift når hovedadmin kan bytte mellom rom. */
  romnavn: string | null
  meldEndring: () => void
}

function Spilleradministrasjon({ rom, romnavn, meldEndring }: SpilleradministrasjonProps) {
  const [spillere, setSpillere] = useState<Spiller[] | null>(null)
  const [klaner, setKlaner] = useState<Klan[]>([])
  const [runde, setRunde] = useState<Runde | null>(null)
  const [minutter, setMinutter] = useState('15')
  const [klanstorrelse, setKlanstorrelse] = useState('4')
  const [brukernavn, setBrukernavn] = useState('')
  const [passord, setPassord] = useState(lagPassord)
  const [feil, setFeil] = useState('')
  const [venter, setVenter] = useState(false)
  const [lagrerValg, setLagrerValg] = useState(0)

  const hentSpillere = useCallback(async () => {
    // Tabellene peker begge på auth.users, så de hentes hver for seg og settes sammen her
    const [spillerSvar, passordSvar, klanSvar, rundeSvar] = await Promise.all([
      supabase.from('players').select('id, username, clan_id, in_next_round').eq('room_id', rom).order('username'),
      supabase.from('player_credentials').select('user_id, password_plain'),
      supabase.from('clans').select('id, name').eq('room_id', rom).order('name'),
      supabase.from('rounds').select('ends_at').eq('room_id', rom).order('started_at', { ascending: false }).limit(1).maybeSingle(),
    ])
    if (spillerSvar.error || passordSvar.error || klanSvar.error || rundeSvar.error) {
      setFeil('Kunne ikke hente spillerne.')
      return
    }
    const passordFor = new Map(passordSvar.data.map((rad) => [rad.user_id, rad.password_plain]))
    setSpillere(
      spillerSvar.data.map((rad) => ({
        id: rad.id,
        brukernavn: rad.username,
        passord: passordFor.get(rad.id) ?? '',
        klan: rad.clan_id,
        med: rad.in_next_round,
      })),
    )
    setKlaner(klanSvar.data)
    setRunde(rundeSvar.data)
  }, [rom])

  useEffect(() => {
    void hentSpillere()
  }, [hentSpillere])

  /** Kjører en handling, viser eventuell feil og oppdaterer lista. Gir `true` hvis det gikk bra. */
  async function utfor(innhold: Record<string, unknown>) {
    setVenter(true)
    setFeil('')
    const feilmelding = await kall({ ...innhold, rom })
    if (feilmelding) setFeil(feilmelding)
    else {
      await hentSpillere()
      meldEndring()
    }
    setVenter(false)
    return !feilmelding
  }

  async function opprett(event: FormEvent) {
    event.preventDefault()
    if (await utfor({ handling: 'opprett', brukernavn, passord })) {
      setBrukernavn('')
      setPassord(lagPassord())
    }
  }

  function byttPassord(spiller: Spiller) {
    if (window.confirm(`Gi ${spiller.brukernavn} nytt passord? Det gamle slutter å virke.`)) {
      void utfor({ handling: 'bytt-passord', id: spiller.id, passord: lagPassord() })
    }
  }

  function slett(spiller: Spiller) {
    if (window.confirm(`Slette ${spiller.brukernavn}? Dette kan ikke angres.`)) {
      void utfor({ handling: 'slett', id: spiller.id })
    }
  }

  /** Oppdaterer lista med en gang, så det går raskt å krysse av flere spillere etter hverandre. */
  async function settMed(spiller: Spiller, med: boolean) {
    setSpillere((liste) => liste && liste.map((s) => (s.id === spiller.id ? { ...s, med } : s)))
    setFeil('')
    setLagrerValg((antall) => antall + 1)
    const feilmelding = await kall({ handling: 'sett-med', id: spiller.id, med, rom })
    if (feilmelding) {
      setFeil(feilmelding)
      await hentSpillere()
    }
    setLagrerValg((antall) => antall - 1)
  }

  const rundePagar = runde !== null && new Date(runde.ends_at) > new Date()
  const deltakere = spillere?.filter((s) => s.med) ?? []
  const utenKlan = deltakere.filter((s) => !s.klan)

  return (
    <>
      {romnavn && <h2 className="moc-admin-romnavn">Rommet {romnavn}</h2>}

      <div className="moc-kort">
        <h2>Runde</h2>
        {rundePagar ? (
          <div className="moc-admin-rad">
            <p className="moc-beskjed">
              Runden slutter klokka {klokkeslett(runde.ends_at)}.
            </p>
            <button
              type="button"
              className="moc-knapp"
              disabled={venter}
              onClick={() => {
                if (window.confirm('Avslutte runden nå?')) void utfor({ handling: 'avslutt-runde' })
              }}
            >
              Avslutt runden
            </button>
          </div>
        ) : (
          <>
            <div className="moc-admin-rad">
              <label>
                Spillere per klan
                <select value={klanstorrelse} onChange={(e) => setKlanstorrelse(e.target.value)}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="moc-knapp"
                disabled={venter || lagrerValg > 0 || deltakere.length === 0}
                onClick={() => {
                  if (klaner.length === 0 || window.confirm('Lage nye klaner? De gamle forsvinner.')) {
                    void utfor({ handling: 'fordel-klaner', storrelse: Number(klanstorrelse) })
                  }
                }}
              >
                Fordel på klaner
              </button>
            </div>
            {klaner.length > 0 && utenKlan.length > 0 && (
              <p className="moc-admin-varsel" role="status">
                Uten klan: {utenKlan.map((s) => s.brukernavn).join(', ')}. De blir ikke med før de får en klan.
              </p>
            )}
            <div className="moc-admin-rad moc-admin-start">
              <label>
                Minutter
                <select value={minutter} onChange={(e) => setMinutter(e.target.value)}>
                  {[10, 15, 20, 30, 45].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </label>
              <button
                type="button"
                className="moc-knapp"
                disabled={venter || lagrerValg > 0 || klaner.length === 0}
                onClick={() => void utfor({ handling: 'start-runde', minutter: Number(minutter) })}
              >
                Start runde
              </button>
            </div>
          </>
        )}
      </div>

      <form className="moc-kort" onSubmit={opprett}>
        <h2>Ny spiller</h2>
        <label htmlFor="moc-nytt-brukernavn">Brukernavn</label>
        <input
          id="moc-nytt-brukernavn"
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          required
          value={brukernavn}
          onChange={(e) => setBrukernavn(e.target.value)}
        />

        <label htmlFor="moc-nytt-passord">Passord</label>
        <div className="moc-felt-rad">
          <input
            id="moc-nytt-passord"
            type="text"
            autoComplete="off"
            spellCheck={false}
            required
            minLength={6}
            value={passord}
            onChange={(e) => setPassord(e.target.value)}
          />
          <button type="button" className="moc-knapp-liten" onClick={() => setPassord(lagPassord())}>
            Nytt forslag
          </button>
        </div>

        <button type="submit" className="moc-knapp" disabled={venter}>
          Opprett spiller
        </button>
      </form>

      {feil && (
        <p className="moc-feil" role="alert">
          {feil}
        </p>
      )}

      {spillere?.length === 0 && <p className="moc-beskjed">Ingen spillere ennå.</p>}

      {spillere && spillere.length > 0 && (
        <p className="moc-admin-antall">
          <strong>{deltakere.length} av {spillere.length}</strong> spillere er med i neste runde.
        </p>
      )}

      {spillere && spillere.length > 0 && (
        <ul className="moc-spillere">
          {spillere.map((spiller) => (
            <li key={spiller.id} className={spiller.med ? undefined : 'moc-spiller-ute'}>
              <label className="moc-spiller-med">
                <input
                  type="checkbox"
                  checked={spiller.med}
                  aria-label={`${spiller.brukernavn} er med i neste runde`}
                  onChange={(e) => void settMed(spiller, e.target.checked)}
                />
                <span className="moc-spiller-info">
                  <strong>{spiller.brukernavn}</strong>
                  <code>{spiller.passord}</code>
                </span>
              </label>
              <div className="moc-spiller-valg">
                {spiller.med && klaner.length > 0 && (
                  <select
                    className="moc-admin-klan"
                    aria-label={`Klan for ${spiller.brukernavn}`}
                    disabled={venter || rundePagar}
                    value={spiller.klan ?? ''}
                    onChange={(e) => void utfor({ handling: 'sett-klan', id: spiller.id, klan: e.target.value })}
                  >
                    <option value="">Ingen klan</option>
                    {klaner.map((klan) => (
                      <option key={klan.id} value={klan.id}>
                        {klan.name}
                      </option>
                    ))}
                  </select>
                )}
                <button type="button" className="moc-knapp-liten" disabled={venter} onClick={() => byttPassord(spiller)}>
                  Nytt passord
                </button>
                <button type="button" className="moc-knapp-liten" disabled={venter} onClick={() => slett(spiller)}>
                  Slett
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}
