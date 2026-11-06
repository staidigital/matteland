import { useCallback, useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { FunctionsHttpError } from '@supabase/supabase-js'
import { erAdmin, supabase, useSesjon } from './supabase.ts'
import './mathofclans.css'

type Spiller = { id: string; brukernavn: string; passord: string; klan: string | null; med: boolean }
type Klan = { id: string; name: string }
type Runde = { ends_at: string }

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

export default function Admin() {
  const sesjon = useSesjon()

  if (sesjon === undefined) return null
  if (!sesjon || !erAdmin(sesjon)) return <Navigate to="/math-of-clans" replace />
  return <Spilleradministrasjon />
}

function Spilleradministrasjon() {
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
      supabase.from('players').select('id, username, clan_id, in_next_round').order('username'),
      supabase.from('player_credentials').select('user_id, password_plain'),
      supabase.from('clans').select('id, name').order('name'),
      supabase.from('rounds').select('ends_at').order('started_at', { ascending: false }).limit(1).maybeSingle(),
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
  }, [])

  useEffect(() => {
    void hentSpillere()
  }, [hentSpillere])

  /** Kjører en handling, viser eventuell feil og oppdaterer lista. Gir `true` hvis det gikk bra. */
  async function utfor(innhold: Record<string, unknown>) {
    setVenter(true)
    setFeil('')
    const feilmelding = await kall(innhold)
    if (feilmelding) setFeil(feilmelding)
    else await hentSpillere()
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
    const feilmelding = await kall({ handling: 'sett-med', id: spiller.id, med })
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
    <section className="moc-admin">
      <div className="kicker">Math of Clans</div>
      <h1>Administrer</h1>
      <Link className="moc-lenke" to="/math-of-clans">
        Tilbake til spillet
      </Link>

      <div className="moc-kort">
        <h2>Runde</h2>
        {rundePagar ? (
          <div className="moc-admin-rad">
            <p className="moc-beskjed">
              Runden slutter klokka {new Date(runde.ends_at).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' })}.
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
    </section>
  )
}
