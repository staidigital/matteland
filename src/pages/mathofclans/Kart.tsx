import { useEffect, type CSSProperties } from 'react'
import kart from './kart.json'
import type { Effekt, Klan, Omradestatus } from './useRunde.ts'

export const OMRADER = kart.omrader
export type Omrade = (typeof OMRADER)[number]

/** Deler et navn i to linjer, så det får plass inne i området. */
function linjer(navn: string) {
  const ord = navn.split(' ')
  if (ord.length === 1) return [navn]
  const midten = Math.ceil(ord.length / 2)
  return [ord.slice(0, midten).join(' '), ord.slice(midten).join(' ')]
}

type Props = {
  omrader: Record<string, Omradestatus>
  klaner: Klan[]
  valgt: string | null
  angripbare: Set<string>
  onVelg: (id: string) => void
  missilforsvar: string[]
  /** Områdene som kan velges mens spilleren sikter med noe fra butikken. Ellers `null`. */
  mal: Set<string> | null
  effekter: Effekt[]
  onEffektFerdig: (id: string) => void
}

/** En nuke som faller ned over et område, og enten treffer eller blir skutt ned på veien. */
function NukeEffekt({ effekt, onFerdig }: { effekt: Effekt; onFerdig: (id: string) => void }) {
  const omrade = OMRADER.find((o) => o.id === effekt.region_id)

  useEffect(() => {
    const tidtaker = setTimeout(() => onFerdig(effekt.id), 2400)
    return () => clearTimeout(tidtaker)
  }, [effekt.id, onFerdig])

  if (!omrade) return null
  const avskutt = effekt.effect === 'nuke_intercepted'
  // Så høyt over området at eksplosjonen synes, men aldri over kanten av kartet
  const hoyde = avskutt ? Math.min(90, omrade.y - 30) : 0
  const bane = { '--start': `${-omrade.y - 60}px`, '--slutt': `${-hoyde}px`, '--hoyde': `${-hoyde}px` } as CSSProperties

  return (
    <g className="moc-nuke" transform={`translate(${omrade.x} ${omrade.y})`} style={bane}>
      <path className="moc-rakett" d="M0 0 L-6 -12 L-6 -32 L-13 -42 L-5 -40 L0 -50 L5 -40 L13 -42 L6 -32 L6 -12 Z" />
      {avskutt ? (
        <>
          <circle className="moc-motrakett" r={5} />
          <g transform={`translate(0 ${-hoyde})`}>
            <circle className="moc-blink moc-blink-liten" r={45} />
            <text className="moc-nuke-tekst" textAnchor="middle" y={5}>Skutt ned!</text>
          </g>
        </>
      ) : (
        <>
          <circle className="moc-blink" r={110} />
          <circle className="moc-sjokkbolge" r={200} />
          <g className="moc-sopp">
            <rect x={-11} y={-55} width={22} height={60} rx={8} />
            <ellipse cy={-66} rx={44} ry={25} />
          </g>
          <text className="moc-nuke-tekst" textAnchor="middle" y={-60}>Utslettet!</text>
          {omrade.naboer.map((id) => {
            const nabo = OMRADER.find((o) => o.id === id)
            if (!nabo || nabo.stengt) return null
            return (
              <text key={id} className="moc-nuke-tekst moc-nuke-nabo" textAnchor="middle" x={nabo.x - omrade.x} y={nabo.y - omrade.y - 6}>
                −50 %
              </text>
            )
          })}
        </>
      )}
    </g>
  )
}

export default function Kart({ omrader, klaner, valgt, angripbare, onVelg, missilforsvar, mal, effekter, onEffektFerdig }: Props) {
  const farge = new Map(klaner.map((k) => [k.id, k.color]))

  return (
    <svg className="moc-kart" viewBox={`0 0 ${kart.bredde} ${kart.hoyde}`} role="group" aria-label="Kart over Math of Clans">
      <path className="moc-kyst" d={kart.kyst} />
      {OMRADER.map((omrade) => {
        const status = omrader[omrade.id]
        const eier = status?.clan_id ? farge.get(status.clan_id) : undefined
        const klasser = ['moc-omrade', omrade.tema ? `moc-tema-${omrade.tema}` : 'moc-tema-ingen']
        if (omrade.stengt) klasser.push('moc-stengt')
        if (angripbare.has(omrade.id)) klasser.push('moc-angripbar')
        if (mal) klasser.push(mal.has(omrade.id) ? 'moc-mal' : 'moc-ikke-mal')
        const harForsvar = missilforsvar.includes(omrade.id)
        const beskrivelse = omrade.stengt
          ? `${omrade.navn}, stengt`
          : `${omrade.navn}, ${status?.defenders ?? omrade.forsvarere} forsvarere${harForsvar ? ', missilforsvar' : ''}`
        return (
          <g
            key={omrade.id}
            className={klasser.join(' ')}
            role="button"
            tabIndex={0}
            aria-label={beskrivelse}
            aria-pressed={valgt === omrade.id}
            onClick={() => onVelg(omrade.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onVelg(omrade.id)
              }
            }}
          >
            <path d={omrade.sti} style={eier ? { fill: eier } : undefined} />
            <text className={`moc-navn${eier ? ' moc-navn-eid' : ''}`} x={omrade.x} y={omrade.y - (omrade.stengt ? 6 : 24)} textAnchor="middle">
              {linjer(omrade.navn).map((linje, i) => (
                <tspan key={linje} x={omrade.x} dy={i === 0 ? 0 : 15}>
                  {linje}
                </tspan>
              ))}
            </text>
            {!omrade.stengt && status && (
              <g className="moc-merke">
                <rect x={omrade.x - 20} y={omrade.y + 6} width={40} height={24} rx={12} />
                <text x={omrade.x} y={omrade.y + 23} textAnchor="middle">
                  {status.defenders}
                </text>
              </g>
            )}
            {harForsvar && (
              <path
                className="moc-skjold"
                transform={`translate(${omrade.x + 38} ${omrade.y + 18})`}
                d="M0 -11 L9 -7 V1 C9 6 5 10 0 12 C-5 10 -9 6 -9 1 V-7 Z"
              />
            )}
          </g>
        )
      })}
      {/* Tegnes til slutt, så nabo-områdene ikke dekker kanten på det valgte området */}
      {valgt && <path className="moc-valgt-kant" d={OMRADER.find((o) => o.id === valgt)?.sti} />}
      {effekter.map((effekt) => (
        <NukeEffekt key={effekt.id} effekt={effekt} onFerdig={onEffektFerdig} />
      ))}
    </svg>
  )
}
