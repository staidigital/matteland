// Sjekker alle oppgavetypene i Math of Clans: at teksten er pen, at fasiten godtas og at matematikken stemmer.
// Kjør med: node scripts/sjekk-oppgaver.mjs (legg til --vis for å se eksempler på hver oppgavetype)
import { erRiktig, lagOppgave, OPPGAVER, TEMAER } from '../supabase/functions/spill/oppgaver.ts'

const ANTALL = 3000
const vis = process.argv.includes('--vis')
const feil = new Set()
const klage = (hvor, melding, oppgave) => feil.add(`${hvor}: ${melding} — ${oppgave.sporsmal} [${oppgave.fasit.tekst}]`)

/** Liten regner for uttrykkene i oppgavene, med underforstått gange som i 2x og (x + 1)(x − 1). */
function regn(tekst, verdier = {}) {
  const tegn = tekst
    .replaceAll('−', '-').replaceAll('·', '*').replaceAll(':', '/')
    .replaceAll('²', '^2').replaceAll('³', '^3').replaceAll('⁴', '^4')
    .match(/\d+(?:,\d+)?|[a-zæøå]|[-+*/^()√]|\S/gi) ?? []
  let i = 0
  const faktor = () => {
    const t = tegn[i]
    if (t === '(') {
      i++
      const v = sum()
      if (tegn[i++] !== ')') throw new Error('mangler )')
      return v
    }
    if (t === '√') { i++; return Math.sqrt(faktor()) }
    if (t && /^\d/.test(t)) { i++; return Number(t.replace(',', '.')) }
    if (t && t in verdier) { i++; return verdier[t] }
    throw new Error(`ukjent ${t}`)
  }
  const potens = () => {
    const g = faktor()
    if (tegn[i] !== '^') return g
    i++
    return g ** fortegn()
  }
  const fortegn = () => {
    if (tegn[i] === '-') { i++; return -fortegn() }
    return potens()
  }
  const ledd = () => {
    let v = fortegn()
    for (;;) {
      const t = tegn[i]
      if (t === '*') { i++; v *= fortegn() }
      else if (t === '/') { i++; v /= fortegn() }
      else if (t === '(' || t === '√' || (t && (t in verdier || /^\d/.test(t)))) v *= potens()
      else return v
    }
  }
  const sum = () => {
    let v = ledd()
    while (tegn[i] === '+' || tegn[i] === '-') v = tegn[i++] === '+' ? v + ledd() : v - ledd()
    return v
  }
  const ut = sum()
  if (i !== tegn.length) throw new Error('rester igjen')
  return ut
}

const PROVER = [{ x: 1.7, a: 2.3, b: -1.9, n: 3, t: 0.6 }, { x: -2.3, a: 0.7, b: 3.1, n: 5, t: 1.4 }, { x: 4.1, a: -3.3, b: 1.3, n: 7, t: 2.2 }]
const nesten = (a, b) => Math.abs(a - b) < 1e-6 * Math.max(1, Math.abs(a), Math.abs(b))
const likeUttrykk = (a, b) => PROVER.every((v) => nesten(regn(a, v), regn(b, v)))

function sjekkMatte(hvor, o) {
  const s = o.sporsmal
  const f = o.fasit
  const tallfasit = f.type === 'tall'
  let m

  if ((m = s.match(/^Løs likningen: (.*) = (.*)$/))) {
    const [v, h] = [m[1], m[2]]
    const losninger = tallfasit
      ? f.verdier
      : (() => {
          const d = f.riktig.match(/^x = (.*) ± √(\d+)$/)
          return d ? [regn(d[1]) + Math.sqrt(+d[2]), regn(d[1]) - Math.sqrt(+d[2])] : null
        })()
    if (!losninger) return klage(hvor, 'kan ikke lese løsningene', o)
    if (!losninger.length) {
      // Ingen løsning: andregradsuttrykket venstre − høyre må ha negativ diskriminant
      const f = (x) => regn(v, { x }) - regn(h, { x })
      const [c, pluss, minus] = [f(0), f(1), f(-1)]
      const [a, b] = [(pluss + minus - 2 * c) / 2, (pluss - minus) / 2]
      if (!(b * b - 4 * a * c < 0)) klage(hvor, 'likningen har løsninger likevel', o)
      return
    }
    for (const x of losninger) if (!nesten(regn(v, { x }), regn(h, { x }))) klage(hvor, `x = ${x} stemmer ikke`, o)
    return
  }
  if ((m = s.match(/^f\(x\) = (.*)\. Finn f\((.*)\)\.$/))) {
    if (!nesten(regn(m[1], { x: regn(m[2]) }), f.verdier[0])) klage(hvor, 'feil funksjonsverdi', o)
    return
  }
  if ((m = s.match(/^Finn nullpunkt\w* til f\(x\) = (.*)\.$/))) {
    for (const x of f.verdier) if (!nesten(regn(m[1], { x }), 0)) klage(hvor, 'ikke et nullpunkt', o)
    return
  }
  if ((m = s.match(/^f\(x\) = (.*)\. For hvilken x er f\(x\) = (.*)\?$/))) {
    if (!nesten(regn(m[1], { x: f.verdier[0] }), regn(m[2]))) klage(hvor, 'feil x', o)
    return
  }
  if ((m = s.match(/^Grafene til f\(x\) = (.*) og g\(x\) = (.*) skjærer/)) || (m = s.match(/^Finn x-verdiene der grafene til f\(x\) = (.*) og g\(x\) = (.*) skjærer/))) {
    for (const x of f.verdier) if (!nesten(regn(m[1], { x }), regn(m[2], { x }))) klage(hvor, 'grafene møtes ikke der', o)
    return
  }
  if ((m = s.match(/^Finn skjæringspunktet mellom f\(x\) = (.*) og g\(x\) = (.*)\.$/))) {
    const p = f.riktig.match(/^\((.*), (.*)\)$/)
    const [x, y] = [regn(p[1]), regn(p[2])]
    if (!nesten(regn(m[1], { x }), y) || !nesten(regn(m[2], { x }), y)) klage(hvor, 'feil skjæringspunkt', o)
    return
  }
  if ((m = s.match(/^Finn (?:x-verdien til )?toppunktet eller bunnpunktet til f\(x\) = (.*)\.$/)) || (m = s.match(/^Finn symmetrilinja til f\(x\) = (.*)\.$/))) {
    const t = tallfasit ? f.verdier[0] : regn(f.riktig.match(/^\((.*), /)[1])
    if (!nesten(regn(m[1], { x: t + 1 }), regn(m[1], { x: t - 1 }))) klage(hvor, 'ikke symmetrisk om svaret', o)
    if (!tallfasit && !nesten(regn(m[1], { x: t }), regn(f.riktig.match(/, (.*)\)$/)[1]))) klage(hvor, 'feil y-verdi', o)
    return
  }
  if ((m = s.match(/^Skriv som én potens av (\d+): (.*)\. Hva blir eksponenten\?$/))) {
    if (!nesten(regn(`${m[1]}^(${tallTekst(f.verdier[0])})`), regn(m[2]))) klage(hvor, 'feil eksponent', o)
    return
  }
  if ((m = s.match(/^Regn ut diskriminanten til (.*) = 0\.$/))) {
    const a = regn(m[1], { x: 0 })
    const verdi = (x) => regn(m[1], { x })
    const A = (verdi(1) + verdi(-1) - 2 * a) / 2
    const B = (verdi(1) - verdi(-1)) / 2
    if (!nesten(B * B - 4 * A * a, f.verdier[0])) klage(hvor, 'feil diskriminant', o)
    return
  }
  if ((m = s.match(/^Skriv (\d+) som et produkt av primtall\.$/))) {
    if (regn(f.riktig) !== +m[1]) klage(hvor, 'feil produkt', o)
    return
  }
  if ((m = s.match(/^Et mønster har (.*), … prikker\. Hvilken formel/))) {
    m[1].split(', ').forEach((v, k) => {
      if (!nesten(regn(f.riktig, { n: k + 1 }), +v)) klage(hvor, 'formelen passer ikke', o)
    })
    return
  }
  if ((m = s.match(/^Et mønster har (.*), … prikker\. Hvor mange prikker er det i figur (\d+)\?$/))) {
    const ledd = m[1].split(', ').map(Number)
    const d1 = ledd.slice(1).map((v, k) => v - ledd[k])
    const d2 = d1.slice(1).map((v, k) => v - d1[k])
    // Tallmønstrene her er andregrads eller lineære, så tre differanser avgjør dem
    let [verdi, steg] = [ledd[3], d1[2]]
    for (let k = 5; k <= +m[2]; k++) { steg += d2[1]; verdi += steg }
    if (verdi !== f.verdier[0]) klage(hvor, 'feil figurtall', o)
    return
  }
  if ((m = s.match(/^(Regn ut|Skriv som vanlig tall|Regn ut og skriv på standardform|Skriv på standardform|Skriv så enkelt som mulig|Trekk sammen|Gang ut|Gang ut og trekk sammen|Faktoriser|Forkort|Forkort så langt som mulig|Forenkle|Løs opp parentesen og trekk sammen|Løs opp parentesene og trekk sammen|Trekk ut det som er felles|Skriv som fullstendig kvadrat): (.*)$/))) {
    const uttrykk = m[2]
    if (tallfasit) {
      if (!nesten(regn(uttrykk), f.verdier[0])) klage(hvor, 'feil verdi', o)
      return
    }
    if (!likeUttrykk(uttrykk, f.riktig)) klage(hvor, 'riktig svar er ikke likt oppgaven', o)
    const samme = /standardform/.test(m[1])
    for (const valg of o.valg) {
      if (valg !== f.riktig && !samme && likeUttrykk(uttrykk, valg)) klage(hvor, `galt valg «${valg}» er egentlig riktig`, o)
    }
    return
  }
  return 'manuelt'
}

const tallTekst = (n) => String(n)
const REN = /undefined|NaN|Infinity|\[object|--|\+ −|− −|\+ \+|(^|[^\d,.·^/])[01](x|a|b|n|t)\b|·\s*$/

let totalt = 0
for (const tema of TEMAER) {
  OPPGAVER[tema].forEach((varianter, n) => {
    const unike = new Set()
    varianter.forEach((variant, v) => {
      const hvor = `${tema} nivå ${n + 1} variant ${v + 1}`
      const egne = new Set()
      let manuelt = false
      for (let i = 0; i < ANTALL; i++) {
        const o = variant()
        egne.add(o.sporsmal)
        unike.add(o.sporsmal)
        const tekster = [o.sporsmal, o.fasit.tekst, ...(o.valg ?? [])]
        for (const t of tekster) if (REN.test(t)) klage(hvor, `stygg tekst «${t}»`, o)
        if (o.valg) {
          if (!o.valg.includes(o.fasit.riktig)) klage(hvor, 'riktig svar mangler i valgene', o)
          if (new Set(o.valg).size !== o.valg.length) klage(hvor, 'like valg', o)
          const jaNei = o.fasit.riktig === 'Ja' || o.fasit.riktig === 'Nei'
          if (o.valg.length < (jaNei ? 2 : 3)) klage(hvor, 'for få valg', o)
          if (!erRiktig(o.fasit, o.fasit.riktig)) klage(hvor, 'fasit godtas ikke', o)
          if (o.valg.some((x) => x !== o.fasit.riktig && erRiktig(o.fasit, x))) klage(hvor, 'galt valg godtas', o)
        } else {
          if (o.felt) {
            if (!o.hint) klage(hvor, 'svarbokser uten forklaring', o)
            if (o.fasit.verdier.length > o.felt) klage(hvor, 'flere løsninger enn bokser', o)
            // Slik klienten sender boksene: utfylte bokser med «og», ellers «ingen løsning»
            const bokser = o.fasit.verdier.map(String)
            if (!erRiktig(o.fasit, bokser.length ? bokser.join(' og ') : 'ingen løsning')) klage(hvor, 'riktige bokser godtas ikke', o)
            if (o.fasit.verdier.length === 1 && !erRiktig(o.fasit, `${bokser[0]} og ${bokser[0]}`)) klage(hvor, 'samme løsning i begge boksene godtas ikke', o)
            if (o.fasit.verdier.length && erRiktig(o.fasit, 'ingen løsning')) klage(hvor, '«ingen løsning» godtas', o)
            if (!o.fasit.verdier.length && erRiktig(o.fasit, '0')) klage(hvor, 'tall godtas når det ikke er løsning', o)
            if (o.fasit.verdier.length === 2 && erRiktig(o.fasit, bokser[0])) klage(hvor, 'bare én av to løsninger godtas', o)
          }
          const svar = o.fasit.verdier.map((x) => String(Math.round(x * 1000) / 1000).replace('.', ',')).join(' og ')
          if (o.fasit.verdier.some((x) => !Number.isFinite(x))) klage(hvor, 'ugyldig fasit', o)
          if (!erRiktig(o.fasit, svar)) klage(hvor, `svaret «${svar}» godtas ikke`, o)
          if (!o.felt && o.fasit.verdier.length > 1) klage(hvor, 'flere løsninger uten svarbokser', o)
          if (!erRiktig(o.fasit, o.fasit.tekst.replace(/ (cm|kroner|meter|enheter|sekunder)$/, '').replace(/^Etter /, '').replace(/ \(D = .*\)$/, ''))) klage(hvor, 'fasitteksten godtas ikke', o)
          if (o.fasit.verdier.length && erRiktig(o.fasit, o.fasit.verdier.map((x) => x + 1).join(' og '))) klage(hvor, 'galt svar godtas', o)
        }
        try {
          if (sjekkMatte(hvor, o) === 'manuelt') manuelt = true
        } catch (e) {
          klage(hvor, `kunne ikke regne: ${e.message}`, o)
        }
      }
      if (vis) {
        const o = variant()
        console.log(`${hvor}${manuelt ? ' (manuell)' : ''} [${egne.size} ulike]\n   ${o.sporsmal}${o.valg ? `\n   ${o.valg.join('  |  ')}` : ''}\n   → ${o.fasit.tekst}`)
      }
    })
    totalt += unike.size
    console.log(`${tema} nivå ${n + 1}: ${varianter.length} oppgavetyper, minst ${unike.size} ulike oppgaver`)
  })
}

// Ingen gjentakelser så lenge en spiller svarer på de fleste oppgavene i et tema
for (const tema of TEMAER) {
  for (const niva of [1, 2, 3]) {
    const tidligere = []
    for (let i = 0; i < 100; i++) {
      const o = lagOppgave(tema, niva, tidligere)
      if (tidligere.includes(o.sporsmal)) klage(`${tema} nivå ${niva}`, `gjentakelse etter ${i} oppgaver`, o)
      tidligere.unshift(o.sporsmal)
    }
  }
}

console.log(`\nTil sammen minst ${totalt} ulike oppgaver.`)
if (feil.size) {
  const liste = [...feil]
  console.error(`\n${liste.length} feil:\n${liste.slice(0, 400).join('\n')}`)
  process.exit(1)
}
console.log('Ingen feil.')
