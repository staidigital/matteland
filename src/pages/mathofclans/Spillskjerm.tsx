import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import Kart, { OMRADER } from './Kart.tsx'
import Matte from './Matte.tsx'
import type { Effekt, Klan, Spillerstatus, Tilstand } from './useRunde.ts'

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
  { niva: 1, navn: 'Lett', soldater: 4, gull: 2 },
  { niva: 2, navn: 'Middels', soldater: 16, gull: 8 },
  { niva: 3, navn: 'Vanskelig', soldater: 60, gull: 30 },
]

// Prisene bestemmes på serveren (spill-butikk.sql). Her står de bare for å kunne vises.
const SOLDATPAKKE = { soldater: 10, pris: 30 }
const PRIS = { nuke: 150, missil: 100 }

type Vare = keyof typeof PRIS

const INGEN = new Set<string>()

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
  effekter: Effekt[]
  fjernEffekt: (id: string) => void
  oppdaterForsvar: () => Promise<void>
}

export default function Spillskjerm({ tilstand, spillerId, handling, settStatus, effekter, fjernEffekt, oppdaterForsvar }: Props) {
  const naa = useNaa()
  const [valgt, setValgt] = useState<string | null>(null)
  // Ligger her og ikke i områdepanelet, så slideren beholder verdien når spilleren velger et nytt område
  const [andel, setAndel] = useState(50)
  const [sikter, setSikter] = useState<Vare | null>(null)
  const [svar, setSvar] = useState<Tilbakemelding | null>(null)
  const [kjoper, setKjoper] = useState(false)
  const kartflate = useRef<HTMLDivElement>(null)

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

  const mal = useMemo(() => {
    const finnes = OMRADER.filter((o) => tilstand.omrader[o.id])
    return {
      // Nuken rekker over hele kartet, også nøytrale områder
      nuke: new Set(finnes.filter((o) => tilstand.omrader[o.id].clan_id !== klanId).map((o) => o.id)),
      missil: new Set(
        finnes.filter((o) => tilstand.omrader[o.id].clan_id === klanId && !tilstand.missilforsvar.includes(o.id)).map((o) => o.id),
      ),
    }
  }, [tilstand.omrader, tilstand.missilforsvar, klanId])

  const aktivtSikte = kanSpille ? sikter : null

  useEffect(() => {
    if (!aktivtSikte) return
    const vedTast = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSikter(null)
    }
    window.addEventListener('keydown', vedTast)
    return () => window.removeEventListener('keydown', vedTast)
  }, [aktivtSikte])

  function velgVare(vare: Vare) {
    setSvar(null)
    setSikter(sikter === vare ? null : vare)
    // På mobil ligger butikken under kartet, så spilleren må se kartet for å sikte
    kartflate.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  async function kjopSoldater() {
    setKjoper(true)
    setSvar(null)
    const { data, feil } = await handling({ handling: 'kjop-soldater', antall: SOLDATPAKKE.soldater })
    setKjoper(false)
    if (feil || !data) {
      setSvar({ riktig: false, tekst: feil ?? 'Noe gikk galt.' })
      return
    }
    settStatus(data.status as unknown as Spillerstatus)
    setSvar({ riktig: true, tekst: `Du kjøpte ${SOLDATPAKKE.soldater} soldater for ${SOLDATPAKKE.pris} gull.` })
  }

  async function brukVare(vare: Vare, id: string) {
    const navn = OMRADER.find((o) => o.id === id)!.navn
    // Sikte avsluttes med en gang, så et dobbeltklikk ikke kan bruke opp gullet to ganger
    setSikter(null)
    setKjoper(true)
    const { data, feil } = await handling({ handling: vare === 'nuke' ? 'nuke' : 'missilforsvar', omrade: id })
    setKjoper(false)
    if (feil || !data) {
      setSvar({ riktig: false, tekst: feil ?? 'Noe gikk galt.' })
      return
    }
    settStatus(data.status as unknown as Spillerstatus)
    if (vare === 'missil') {
      void oppdaterForsvar()
      setSvar({ riktig: true, tekst: `${navn} har nå missilforsvar. Motstanderne kan ikke se det.` })
    } else if (data.avskutt) {
      setSvar({ riktig: false, tekst: `Nuken ble skutt ned over ${navn}. Området hadde missilforsvar!` })
    } else {
      setSvar({ riktig: true, tekst: `Treff! ${navn} mistet 80 % av troppene.` })
    }
  }

  function vedValgPaKart(id: string) {
    if (!aktivtSikte) {
      setValgt(id)
      setSvar(null)
    }
    else if (mal[aktivtSikte].has(id)) void brukVare(aktivtSikte, id)
  }

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
        <div className="moc-kartflate" ref={kartflate}>
          <Kart
            omrader={tilstand.omrader}
            klaner={tilstand.klaner}
            valgt={valgt}
            angripbare={aktivtSikte ? INGEN : angripbare}
            onVelg={vedValgPaKart}
            missilforsvar={tilstand.missilforsvar}
            mal={aktivtSikte ? mal[aktivtSikte] : null}
            effekter={effekter}
            onEffektFerdig={fjernEffekt}
          />
          {(kanSpille || valgt) && (
            <Kontrollinje
              id={valgt}
              tilstand={tilstand}
              klanId={klanId}
              kanSpille={kanSpille}
              kanAngripe={valgt !== null && angripbare.has(valgt)}
              andel={andel}
              settAndel={setAndel}
              handling={handling}
              settStatus={settStatus}
              svar={svar}
              settSvar={setSvar}
              opptatt={kjoper}
              sikter={aktivtSikte}
              avbrytSikte={() => setSikter(null)}
              kanSikte={{ nuke: mal.nuke.size > 0, missil: mal.missil.size > 0 }}
              velgVare={velgVare}
              kjopSoldater={() => void kjopSoldater()}
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
                  <span className="moc-stilling-lag">
                    {tilstand.spillere.filter((s) => s.clan_id === k.id).map((s) => s.username).join(', ')}
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

function Kontrollinje({
  id,
  tilstand,
  klanId,
  kanSpille,
  kanAngripe,
  andel,
  settAndel,
  handling,
  settStatus,
  svar,
  settSvar,
  opptatt,
  sikter,
  avbrytSikte,
  kanSikte,
  velgVare,
  kjopSoldater,
}: {
  id: string | null
  tilstand: Tilstand
  klanId: string | null
  kanSpille: boolean
  kanAngripe: boolean
  andel: number
  settAndel: (andel: number) => void
  handling: Handling
  settStatus: (status: Spillerstatus) => void
  svar: Tilbakemelding | null
  settSvar: (svar: Tilbakemelding | null) => void
  opptatt: boolean
  sikter: Vare | null
  avbrytSikte: () => void
  kanSikte: Record<Vare, boolean>
  velgVare: (vare: Vare) => void
  kjopSoldater: () => void
}) {
  const omrade = OMRADER.find((o) => o.id === id)
  const status = id ? tilstand.omrader[id] : undefined
  const eier: Klan | undefined = tilstand.klaner.find((k) => k.id === status?.clan_id)
  const erEgen = !!status && status.clan_id === klanId && klanId !== null
  const styrke = status && omrade ? Math.ceil(status.defenders * omrade.terreng) : 0
  const harForsvar = id !== null && tilstand.missilforsvar.includes(id)
  const gull = tilstand.status?.gold ?? 0
  const soldater = tilstand.status?.soldiers ?? 0

  // Rundes opp, så alle prosentverdier gir minst én så lenge spilleren har noe å bruke
  const antall = Math.ceil((soldater * andel) / 100)
  const enhet = antall === 1 ? 'soldat' : 'soldater'

  const [venter, setVenter] = useState(false)

  async function utfor(event: FormEvent) {
    event.preventDefault()
    if (!id || !omrade) return
    setVenter(true)
    settSvar(null)
    const { data, feil } = await handling({
      handling: erEgen ? 'forsterk' : 'angrip',
      omrade: id,
      antall,
    })
    setVenter(false)
    if (feil || !data) {
      settSvar({ riktig: false, tekst: feil ?? 'Noe gikk galt.' })
      return
    }
    settStatus(data.status as unknown as Spillerstatus)
    if (erEgen) settSvar({ riktig: true, tekst: 'Forsvaret er forsterket.' })
    else if (data.erobret) settSvar({ riktig: true, tekst: `Du erobret ${omrade.navn}!` })
    else settSvar({ riktig: false, tekst: 'Forsvaret holdt, men de mistet soldater.' })
  }

  const varer = [
    {
      navn: `${SOLDATPAKKE.soldater} ekstra soldater, ${SOLDATPAKKE.pris} gull. Dyrt, så dette er for nødstilfeller.`,
      ikon: <IkonSoldat />,
      pris: SOLDATPAKKE.pris,
      mulig: true,
      valgt: undefined,
      vedKlikk: kjopSoldater,
    },
    {
      navn: `Nuke, ${PRIS.nuke} gull. Tar 80 % av troppene i et område, hvor som helst på kartet.`,
      ikon: <IkonNuke />,
      pris: PRIS.nuke,
      mulig: kanSikte.nuke,
      valgt: sikter === 'nuke',
      vedKlikk: () => velgVare('nuke'),
    },
    {
      navn: `Missilforsvar, ${PRIS.missil} gull. Skyter ned én nuke mot et av områdene dine. Bare klanen din ser det.`,
      ikon: <IkonSkjold />,
      pris: PRIS.missil,
      mulig: kanSikte.missil,
      valgt: sikter === 'missil',
      vedKlikk: () => velgVare('missil'),
    },
  ]

  return (
    <section className="moc-panel moc-kontroll" aria-label="Handlinger">
      <div className="moc-kontroll-info" role={sikter ? 'status' : undefined}>
        {sikter ? (
          <>
            <strong>
              {sikter === 'nuke'
                ? `Klikk på området du vil nuke (${PRIS.nuke} gull).`
                : `Klikk på et av områdene dine for å legge missilforsvar der (${PRIS.missil} gull).`}
            </strong>
            <button type="button" className="moc-kontroll-avbryt" onClick={avbrytSikte}>
              Avbryt
            </button>
          </>
        ) : omrade && status ? (
          <span>
            <strong>{omrade.navn}</strong> · {eier ? eier.name : 'Nøytralt'} · {status.defenders} forsvarere
            {omrade.terreng > 1 && ` · terreng +${Math.round((omrade.terreng - 1) * 100)} %`}
            {harForsvar && ' · missilforsvar'}
            {kanSpille && kanAngripe && (
              antall > styrke
                ? <strong className="moc-kontroll-nok"> · Nok til å erobre</strong>
                : ` · Du trenger minst ${styrke + 1}`
            )}
            {kanSpille && !kanAngripe && !erEgen && ' · Grenser ikke til klanen din'}
            {erEgen && ' · 1 soldat = 1 forsvarer'}
          </span>
        ) : omrade ? (
          <span>
            <strong>{omrade.navn}</strong>
            {OMTALE[omrade.id] && ` · ${OMTALE[omrade.id]}`}
          </span>
        ) : (
          <span>Velg et område på kartet.</span>
        )}
      </div>

      {kanSpille && (
        <div className="moc-kontroll-rad">
          <form className="moc-kontroll-send" onSubmit={utfor}>
            <output className="moc-kontroll-antall" htmlFor="moc-andel">
              {antall} {enhet}
            </output>
            <input
              id="moc-andel"
              className="moc-slider"
              type="range"
              min={1}
              max={100}
              value={andel}
              disabled={soldater < 1}
              aria-label="Soldater du vil sende"
              aria-valuetext={`${andel} prosent, ${antall} ${enhet}`}
              onChange={(e) => settAndel(Number(e.target.value))}
            />
            <button
              type="submit"
              className="moc-knapp moc-kontroll-knapp"
              disabled={venter || sikter !== null || soldater < 1 || !(kanAngripe || erEgen)}
            >
              {erEgen ? 'Forsterk' : 'Send'}
            </button>
          </form>
          <div className="moc-kontroll-butikk">
            {varer.map((vare) => (
              <button
                key={vare.pris}
                type="button"
                className="moc-knapp-liten moc-ikonknapp"
                title={vare.navn}
                aria-label={vare.navn}
                aria-pressed={vare.valgt}
                disabled={opptatt || !vare.mulig || gull < vare.pris}
                onClick={vare.vedKlikk}
              >
                {vare.ikon}
                <span className="moc-ikonpris">{vare.pris}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {svar && (
        <p className={`${svar.riktig ? 'moc-riktig' : 'moc-feil'} moc-kontroll-svar`} role="status">
          {svar.tekst}
        </p>
      )}
    </section>
  )
}

function IkonSoldat() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10" cy="8" r="4" fill="currentColor" />
      <path d="M2 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" fill="currentColor" />
      <path d="M20 4v6M17 7h6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function IkonNuke() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="7.33 7.33" transform="rotate(-120 12 12)" />
    </svg>
  )
}

function IkonSkjold() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2l9 4v6c0 5-4 9-9 10.5C7 21 3 17 3 12V6Z" fill="currentColor" />
    </svg>
  )
}

/** Viser hvilket tema serveren trakk, og om klanen får områdebonus for det. */
function OppgaveTema({ tema, bonus }: { tema: string; bonus: boolean }) {
  const info = TEMAER.find((t) => t.id === tema)
  if (!info) return null
  return (
    <p className="moc-oppgavetema">
      {info.navn} · {info.sted}
      {bonus && <span title="Klanen din holder et område med dette temaet: 50 % ekstra"> ★ 50 % ekstra</span>}
    </p>
  )
}

type AktivOppgave = { id: string; tema: string; sporsmal: string; valg: string[] | null; hint: string | null }
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

  async function hentOppgave() {
    setVenter(true)
    setFeil('')
    setSvar('')
    const { data, feil: feilmelding } = await handling({ handling: 'ny-oppgave', niva })
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
          {tilbakemelding.riktig ? tilbakemelding.tekst : <Matte tekst={tilbakemelding.tekst} />}
        </p>
      )}

      {oppgave ? (
        <div className="moc-oppgave">
          <OppgaveTema tema={oppgave.tema} bonus={bonusTemaer.has(oppgave.tema)} />
          <p className="moc-sporsmal">
            <Matte tekst={oppgave.sporsmal} />
          </p>
          {oppgave.valg ? (
            <div className="moc-svarvalg">
              {oppgave.valg.map((valg) => (
                <button key={valg} type="button" className="moc-knapp-liten" disabled={venter} onClick={() => void sendSvar(valg)}>
                  <Matte tekst={valg} />
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
