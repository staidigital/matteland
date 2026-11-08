// Viser oppgavetekst fra serveren som mattesats, i samme stil som presentasjonene:
// kursive variabler, stablede brøker, hevede eksponenter og rottegn med strek over.
// Serveren sender ren tekst som «Løs likningen: (x − 1)/3 + x/2 = 3» og «Regn ut: 8^(2/3)».
import { Fragment, type ReactNode } from 'react'

type Tegn =
  | { type: 'gruppe'; innhold: Tegn[] }
  | { type: 'tall'; tekst: string }
  | { type: 'variabel'; tekst: string }
  | { type: 'ord'; tekst: string }
  | { type: 'opphoyd'; tekst: string }
  | { type: 'mellomrom' }
  | { type: 'annet'; tekst: string }

const BOKSTAV = /\p{L}/u
/** Enkeltbokstaver som er vanlige norske ord, og derfor ikke variabler. */
const IKKE_VARIABEL = new Set(['i', 'å'])

function lesTegn(tekst: string, start = 0, slutt = ')'): [Tegn[], number] {
  const ut: Tegn[] = []
  let i = start
  while (i < tekst.length) {
    const c = tekst[i]
    if (c === slutt && slutt) return [ut, i + 1]
    if (c === '(') {
      const [innhold, neste] = lesTegn(tekst, i + 1, ')')
      // En parentes som aldri lukkes, vises som den er
      if (neste > tekst.length || tekst[neste - 1] !== ')') {
        ut.push({ type: 'annet', tekst: c })
        i++
        continue
      }
      ut.push({ type: 'gruppe', innhold })
      i = neste
      continue
    }
    if (c === ' ') {
      ut.push({ type: 'mellomrom' })
      i++
      continue
    }
    const tall = tekst.slice(i).match(/^\d+(?:,\d+)?/)
    if (tall) {
      ut.push({ type: 'tall', tekst: tall[0] })
      i += tall[0].length
      continue
    }
    if (BOKSTAV.test(c)) {
      let j = i
      while (j < tekst.length && BOKSTAV.test(tekst[j])) j++
      const ord = tekst.slice(i, j)
      const forrige = ut[ut.length - 1]
      const etterTall = forrige?.type === 'tall' || forrige?.type === 'gruppe'
      const enkel = ord.length === 1 && ord === ord.toLowerCase() && !IKKE_VARIABEL.has(ord)
      // «5x» og «10ab» er variabler, det samme er en løs «x» eller «f» i «f(x)»
      if ((etterTall && ord === ord.toLowerCase() && ord.length <= 2) || enkel) {
        for (const b of ord) ut.push({ type: 'variabel', tekst: b })
      } else {
        ut.push({ type: 'ord', tekst: ord })
      }
      i = j
      continue
    }
    if ('²³⁴'.includes(c)) {
      ut.push({ type: 'opphoyd', tekst: c })
      i++
      continue
    }
    ut.push({ type: 'annet', tekst: c })
    i++
  }
  return [ut, slutt ? tekst.length + 1 : i]
}

/** Ledd som kan stå i en stablet brøk: tall, variabler, grupper, potenser og røtter. */
type Ledd = { node: ReactNode; kanBroke: boolean; gruppe?: Tegn[] }

/**
 * Behandler en bit uten mellomrom på øverste nivå, for eksempel «(x − 1)/3» eller «8^(2/3).».
 * I eksponenter er `stable` av, så 8^(2/3) får skråstrek i eksponenten slik som i LaTeX.
 */
function bit(tegn: Tegn[], nokkel: string, stable: boolean): ReactNode {
  const ledd: Ledd[] = []
  for (let i = 0; i < tegn.length; i++) {
    const t = tegn[i]
    const neste = tegn[i + 1]

    if (t.type === 'annet' && t.tekst === '^' && ledd.length && neste) {
      // Eksponenten er en gruppe, et tall eller et negativt tall
      let eksponent: ReactNode
      if (neste.type === 'gruppe') {
        eksponent = linje(neste.innhold, `${nokkel}e${i}`, false)
        i++
      } else if (neste.type === 'annet' && neste.tekst === '−' && tegn[i + 2]?.type === 'tall') {
        eksponent = `−${(tegn[i + 2] as { tekst: string }).tekst}`
        i += 2
      } else {
        eksponent = enkelt(neste, `${nokkel}e${i}`, false)
        i++
      }
      const grunntall = ledd.pop()!
      ledd.push({ node: <span className="moc-nw" key={`${nokkel}p${i}`}>{grunntall.node}<sup>{eksponent}</sup></span>, kanBroke: true })
      continue
    }

    if (t.type === 'annet' && t.tekst === '√' && neste && (neste.type === 'tall' || neste.type === 'gruppe')) {
      const under = neste.type === 'tall' ? neste.tekst : linje(neste.innhold, `${nokkel}r${i}`, stable)
      ledd.push({ node: <span className="moc-nw" key={`${nokkel}r${i}`}>√<span className="moc-rad">{under}</span></span>, kanBroke: true })
      i++
      continue
    }

    if (t.type === 'opphoyd' && ledd.length) {
      const grunntall = ledd.pop()!
      const tall = { '²': '2', '³': '3', '⁴': '4' }[t.tekst]
      ledd.push({ node: <span className="moc-nw" key={`${nokkel}o${i}`}>{grunntall.node}<sup>{tall}</sup></span>, kanBroke: grunntall.kanBroke })
      continue
    }

    const kanBroke = t.type === 'tall' || t.type === 'variabel' || t.type === 'gruppe'
    ledd.push({ node: enkelt(t, `${nokkel}t${i}`, stable), kanBroke, gruppe: t.type === 'gruppe' ? t.innhold : undefined })
  }

  // Stablet brøk der det står a/b uten mellomrom
  const ut: ReactNode[] = []
  let grense = 0 // Ledd før denne er allerede brukt i en brøk
  for (let i = 0; i < ledd.length; i++) {
    const l = ledd[i]
    const erStrek = stable && l.node === '/'
    if (!erStrek) {
      ut.push(l.node)
      continue
    }
    let teller: Ledd[] = []
    while (i - 1 - teller.length >= grense && ledd[i - 1 - teller.length].kanBroke) {
      teller = [ledd[i - 1 - teller.length], ...teller]
      ut.pop()
    }
    const nevner: Ledd[] = []
    while (ledd[i + 1 + nevner.length]?.kanBroke) nevner.push(ledd[i + 1 + nevner.length])
    if (!teller.length || !nevner.length) {
      ut.push(...teller.map((x) => x.node), '/')
      continue
    }
    ut.push(
      <span className="moc-brok" key={`${nokkel}b${i}`}>
        <span>{brokdel(teller, `${nokkel}bt${i}`)}</span>
        <span>{brokdel(nevner, `${nokkel}bn${i}`)}</span>
      </span>,
    )
    i += nevner.length
    grense = i + 1
  }
  return <Fragment key={nokkel}>{ut}</Fragment>
}

/** En teller eller nevner som bare er én parentes, vises uten parentesen, slik som i LaTeX. */
function brokdel(ledd: Ledd[], nokkel: string) {
  if (ledd.length === 1 && ledd[0].gruppe) return linje(ledd[0].gruppe, nokkel)
  return ledd.map((l) => l.node)
}

function enkelt(t: Tegn, nokkel: string, stable: boolean): ReactNode {
  switch (t.type) {
    case 'gruppe':
      return <Fragment key={nokkel}>({linje(t.innhold, nokkel, stable)})</Fragment>
    case 'variabel':
      return <i className="moc-v" key={nokkel}>{t.tekst}</i>
    case 'mellomrom':
      return ' '
    default:
      return t.tekst
  }
}

/** Deler tegnene ved mellomrom og setter sammen bitene igjen. */
function linje(tegn: Tegn[], nokkel: string, stable = true): ReactNode {
  const biter: Tegn[][] = [[]]
  for (const t of tegn) {
    if (t.type === 'mellomrom') biter.push([])
    else biter[biter.length - 1].push(t)
  }
  return biter.map((b, i) => (
    <Fragment key={`${nokkel}-${i}`}>
      {i > 0 && ' '}
      {bit(b, `${nokkel}-${i}`, stable)}
    </Fragment>
  ))
}

export default function Matte({ tekst }: { tekst: string }) {
  const [tegn] = lesTegn(tekst, 0, '')
  return <span className="moc-matte">{linje(tegn, 'm')}</span>
}
