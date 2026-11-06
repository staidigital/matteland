import kart from './kart.json'
import type { Klan, Omradestatus } from './useRunde.ts'

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
}

export default function Kart({ omrader, klaner, valgt, angripbare, onVelg }: Props) {
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
        const beskrivelse = omrade.stengt
          ? `${omrade.navn}, stengt`
          : `${omrade.navn}, ${status?.defenders ?? omrade.forsvarere} forsvarere`
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
          </g>
        )
      })}
      {/* Tegnes til slutt, så nabo-områdene ikke dekker kanten på det valgte området */}
      {valgt && <path className="moc-valgt-kant" d={OMRADER.find((o) => o.id === valgt)?.sti} />}
    </svg>
  )
}
