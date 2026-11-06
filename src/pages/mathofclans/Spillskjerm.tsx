import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import Kart, { OMRADER } from './Kart.tsx'
import type { Klan, Spillerstatus, Tilstand } from './useRunde.ts'

export type Handling = (innhold: Record<string, unknown>) => Promise<{ data?: Record<string, never> & Record<string, unknown>; feil?: string }>

const TEMAER = [
  { id: 'brok', navn: 'Brøk', sted: 'Fraction Swamp' },
  { id: 'algebra', navn: 'Algebra', sted: 'Algebra Desert' },
  { id: 'potens', navn: 'Potenser', sted: 'Power Peaks' },
  { id: 'likning', navn: 'Likninger', sted: 'Equation Plains' },
  { id: 'andregrad', navn: 'Andregrad', sted: 'Parabola Bay' },
  { id: 'funksjon', navn: 'Funksjoner', sted: 'Function Mountains' },
]

const NIVAER = [
  { niva: 1, navn: 'Lett', soldater: 6, gull: 3 },
  { niva: 2, navn: 'Middels', soldater: 14, gull: 7 },
  { niva: 3, navn: 'Vanskelig', soldater: 28, gull: 14 },
]

const OMTALE: Record<string, string> = {
  'division-by-zero': 'Udefinert. Ingen som har gått inn her, har kommet ut igjen.',
  'imaginary-island': 'Finnes bare hvis du godtar at i² = −1. Står ikke i 1T.',
  'trig-valley': 'Her er det ingen oppgaver ennå, men området teller like mye som alle andre.',
}

function useNaa() {
  const [naa, setNaa] = useState(() => Date.now())
  useEffect(() => {
    const tidtaker = setInterval(() => setNaa(Date.now()), 1000)
    return () => clearInterval(tidtaker)
  }, [])
  return naa
}

function klokke(sekunder: number) {
  const s = Math.max(0, Math.ceil(sekunder))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/** Klaner rangert etter antall områder, deretter forsvarere. */
function rangering(tilstand: Tilstand) {
  return tilstand.klaner
    .map((klan) => {
      const egne = Object.values(tilstand.omrader).filter((o) => o.clan_id === klan.id)
      return { klan, omrader: egne.length, forsvarere: egne.reduce((sum, o) => sum + o.defenders, 0) }
    })
    .sort((a, b) => b.omrader - a.omrader || b.forsvarere - a.forsvarere)
}

type Props = {
  tilstand: Tilstand
  spillerId: string
  handling: Handling
  settStatus: (status: Spillerstatus) => void
}

export default function Spillskjerm({ tilstand, spillerId, handling, settStatus }: Props) {
  const naa = useNaa()
  const [valgt, setValgt] = useState<string | null>(null)

  const klanId = tilstand.spillere.find((s) => s.id === spillerId)?.clan_id ?? null
  const klan = tilstand.klaner.find((k) => k.id === klanId) ?? null
  const igjen = tilstand.runde ? (new Date(tilstand.runde.ends_at).getTime() - naa) / 1000 : 0
  const aktiv = igjen > 0
  const kanSpille = aktiv && klan !== null && tilstand.status !== null

  const angripbare = useMemo(() => {
    if (!kanSpille) return new Set<string>()
    const egne = OMRADER.filter((o) => tilstand.omrader[o.id]?.clan_id === klanId)
    const kandidater = egne.length ? egne.flatMap((o) => o.naboer) : OMRADER.filter((o) => !o.stengt).map((o) => o.id)
    return new Set(kandidater.filter((id) => tilstand.omrader[id] && tilstand.omrader[id].clan_id !== klanId))
  }, [kanSpille, tilstand.omrader, klanId])

  const liste = rangering(tilstand)
  const lagmedlemmer = klan ? tilstand.spillere.filter((s) => s.clan_id === klan.id).map((s) => s.username) : []

  return (
    <div className="moc-spill">
      <div className="moc-toppstripe">
        <div className="moc-klokke" role="timer">
          {aktiv ? klokke(igjen) : 'Runden er over'}
        </div>
        {klan && (
          <div className="moc-min-klan">
            <span className="moc-prikk" style={{ background: klan.color }} />
            <div>
              <strong>{klan.name}</strong>
              <small>{lagmedlemmer.join(', ')}</small>
            </div>
          </div>
        )}
        {tilstand.status && (
          <div className="moc-ressurser">
            <span>
              <strong>{tilstand.status.soldiers}</strong> soldater
            </span>
            <span>
              <strong>{tilstand.status.gold}</strong> gull
            </span>
          </div>
        )}
      </div>

      {!aktiv && liste[0] && (
        <p className="moc-vinner">
          <span className="moc-prikk" style={{ background: liste[0].klan.color }} />
          {liste[0].klan.name} vant med {liste[0].omrader} områder!
        </p>
      )}

      <div className="moc-spillflate">
        <div className="moc-kartflate">
          <Kart omrader={tilstand.omrader} klaner={tilstand.klaner} valgt={valgt} angripbare={angripbare} onVelg={setValgt} />
          {valgt && (
            <Omradepanel
              key={valgt}
              id={valgt}
              tilstand={tilstand}
              klanId={klanId}
              kanSpille={kanSpille}
              kanAngripe={angripbare.has(valgt)}
              handling={handling}
              settStatus={settStatus}
            />
          )}
        </div>

        <aside className="moc-sidepanel">
          {kanSpille && (
            <Oppgavepanel
              tilstand={tilstand}
              klanId={klanId}
              naa={naa}
              handling={handling}
              settStatus={settStatus}
            />
          )}

          <section className="moc-panel">
            <h2>Stillingen</h2>
            <ol className="moc-stilling">
              {liste.map(({ klan: k, omrader, forsvarere }) => (
                <li key={k.id}>
                  <span className="moc-prikk" style={{ background: k.color }} />
                  <span className="moc-stilling-navn">{k.name}</span>
                  <span>
                    <strong>{omrader}</strong> områder · {forsvarere} forsvarere
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="moc-panel">
            <h2>Siste nytt</h2>
            <ul className="moc-nytt" aria-live="polite">
              {tilstand.hendelser.map((h) => (
                <li key={h.id}>{h.message}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  )
}

function Omradepanel({
  id,
  tilstand,
  klanId,
  kanSpille,
  kanAngripe,
  handling,
  settStatus,
}: {
  id: string
  tilstand: Tilstand
  klanId: string | null
  kanSpille: boolean
  kanAngripe: boolean
  handling: Handling
  settStatus: (status: Spillerstatus) => void
}) {
  const omrade = OMRADER.find((o) => o.id === id)!
  const status = tilstand.omrader[id]
  const eier: Klan | undefined = tilstand.klaner.find((k) => k.id === status?.clan_id)
  const erEgen = !!status && status.clan_id === klanId && klanId !== null
  const styrke = status ? Math.ceil(status.defenders * omrade.terreng) : 0
  const ressurs = erEgen ? (tilstand.status?.gold ?? 0) : (tilstand.status?.soldiers ?? 0)

  const [antall, setAntall] = useState('')
  const [melding, setMelding] = useState('')
  const [venter, setVenter] = useState(false)

  async function utfor(event: FormEvent) {
    event.preventDefault()
    setVenter(true)
    setMelding('')
    const { data, feil } = await handling({
      handling: erEgen ? 'forsterk' : 'angrip',
      omrade: id,
      antall: Number(antall),
    })
    setVenter(false)
    if (feil || !data) {
      setMelding(feil ?? 'Noe gikk galt.')
      return
    }
    settStatus(data.status as unknown as Spillerstatus)
    setAntall('')
    if (erEgen) setMelding('Forsvaret er forsterket.')
    else setMelding(data.erobret ? `Du erobret ${omrade.navn}!` : 'Forsvaret holdt, men de mistet soldater.')
  }

  return (
    <section className="moc-panel moc-omradepanel">
      <h2>{omrade.navn}</h2>
      {OMTALE[id] && <p className="moc-beskjed">{OMTALE[id]}</p>}
      {status && (
        <p className="moc-fakta">
          {eier ? `Eies av ${eier.name}` : 'Nøytralt'} · {status.defenders} forsvarere
          {omrade.terreng > 1 && ` · terreng +${Math.round((omrade.terreng - 1) * 100)} %`}
        </p>
      )}

      {kanSpille && (kanAngripe || erEgen) && (
        <form className="moc-handling" onSubmit={utfor}>
          <label htmlFor="moc-antall">
            {erEgen ? 'Gull du vil bruke (1 gull = 1 forsvarer)' : `Soldater du sender. Du trenger minst ${styrke + 1} for å erobre.`}
          </label>
          <div className="moc-felt-rad">
            <input
              id="moc-antall"
              type="number"
              inputMode="numeric"
              min={1}
              max={ressurs}
              required
              value={antall}
              onChange={(e) => setAntall(e.target.value)}
            />
            <button type="button" className="moc-knapp-liten" onClick={() => setAntall(String(ressurs))}>
              Alle ({ressurs})
            </button>
            <button type="submit" className="moc-knapp moc-knapp-rad" disabled={venter || ressurs < 1}>
              {erEgen ? 'Forsterk' : 'Angrip'}
            </button>
          </div>
        </form>
      )}

      {kanSpille && status && !kanAngripe && !erEgen && (
        <p className="moc-beskjed">Området grenser ikke til klanen din ennå.</p>
      )}
      {melding && <p className="moc-beskjed" role="status">{melding}</p>}
    </section>
  )
}

type AktivOppgave = { id: string; sporsmal: string; valg: string[] | null; hint: string | null }
type Tilbakemelding = { riktig: boolean; tekst: string }

function Oppgavepanel({
  tilstand,
  klanId,
  naa,
  handling,
  settStatus,
}: {
  tilstand: Tilstand
  klanId: string | null
  naa: number
  handling: Handling
  settStatus: (status: Spillerstatus) => void
}) {
  const [tema, setTema] = useState('likning')
  const [niva, setNiva] = useState(1)
  const [oppgave, setOppgave] = useState<AktivOppgave | null>(null)
  const [svar, setSvar] = useState('')
  const [tilbakemelding, setTilbakemelding] = useState<Tilbakemelding | null>(null)
  const [feil, setFeil] = useState('')
  const [venter, setVenter] = useState(false)
  const svarfelt = useRef<HTMLInputElement>(null)

  const bonusTemaer = new Set(
    OMRADER.filter((o) => o.tema && tilstand.omrader[o.id]?.clan_id === klanId).map((o) => o.tema),
  )
  const ventetid = tilstand.status?.cooldown_until
    ? (new Date(tilstand.status.cooldown_until).getTime() - naa) / 1000
    : 0

  async function hentOppgave(nyttTema = tema, nyttNiva = niva) {
    setVenter(true)
    setFeil('')
    setSvar('')
    const { data, feil: feilmelding } = await handling({ handling: 'ny-oppgave', tema: nyttTema, niva: nyttNiva })
    setVenter(false)
    if (feilmelding || !data) {
      setOppgave(null)
      setFeil(feilmelding ?? 'Noe gikk galt.')
      return
    }
    setOppgave(data as unknown as AktivOppgave)
    requestAnimationFrame(() => svarfelt.current?.focus())
  }

  async function sendSvar(tekst: string) {
    if (!oppgave) return
    setVenter(true)
    setFeil('')
    const { data, feil: feilmelding } = await handling({ handling: 'svar', id: oppgave.id, svar: tekst })
    setVenter(false)
    if (feilmelding || !data) {
      setOppgave(null)
      setFeil(feilmelding ?? 'Noe gikk galt.')
      return
    }
    settStatus(data.status as unknown as Spillerstatus)
    if (data.riktig) {
      setTilbakemelding({
        riktig: true,
        tekst: `Riktig! +${data.soldater} soldater og +${data.gull} gull${data.bonus ? ' (områdebonus)' : ''}.`,
      })
      await hentOppgave()
    } else {
      setTilbakemelding({ riktig: false, tekst: `Ikke helt. Riktig svar var ${data.fasit}.` })
      setOppgave(null)
    }
  }

  return (
    <section className="moc-panel">
      <h2>Tjen soldater og gull</h2>

      <fieldset className="moc-valg">
        <legend>Tema</legend>
        <div className="moc-knapper">
          {TEMAER.map((t) => (
            <button
              key={t.id}
              type="button"
              className="moc-knapp-liten"
              aria-pressed={tema === t.id}
              title={t.sted}
              onClick={() => {
                setTema(t.id)
                setOppgave(null)
              }}
            >
              {t.navn}
              {bonusTemaer.has(t.id) && <span title="Klanen din holder et område med dette temaet: 50 % ekstra"> ★</span>}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="moc-valg">
        <legend>Nivå</legend>
        <div className="moc-knapper">
          {NIVAER.map((n) => (
            <button
              key={n.niva}
              type="button"
              className="moc-knapp-liten"
              aria-pressed={niva === n.niva}
              onClick={() => {
                setNiva(n.niva)
                setOppgave(null)
              }}
            >
              {n.navn} ({n.soldater}/{n.gull})
            </button>
          ))}
        </div>
      </fieldset>

      {tilbakemelding && (
        <p className={tilbakemelding.riktig ? 'moc-riktig' : 'moc-feil'} role="status">
          {tilbakemelding.tekst}
        </p>
      )}

      {oppgave ? (
        <div className="moc-oppgave">
          <p className="moc-sporsmal">{oppgave.sporsmal}</p>
          {oppgave.valg ? (
            <div className="moc-svarvalg">
              {oppgave.valg.map((valg) => (
                <button key={valg} type="button" className="moc-knapp-liten" disabled={venter} onClick={() => void sendSvar(valg)}>
                  {valg}
                </button>
              ))}
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                void sendSvar(svar)
              }}
            >
              {oppgave.hint && <label htmlFor="moc-svar">{oppgave.hint}</label>}
              <div className="moc-felt-rad">
                <input
                  id="moc-svar"
                  ref={svarfelt}
                  type="text"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  value={svar}
                  onChange={(e) => setSvar(e.target.value)}
                />
                <button type="submit" className="moc-knapp moc-knapp-rad" disabled={venter}>
                  Svar
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <button type="button" className="moc-knapp moc-ny-oppgave" disabled={venter || ventetid > 0} onClick={() => void hentOppgave()}>
          {ventetid > 0 ? `Vent ${Math.ceil(ventetid)} sekunder` : 'Gi meg en oppgave'}
        </button>
      )}

      {feil && (
        <p className="moc-feil" role="alert">
          {feil}
        </p>
      )}
    </section>
  )
}
