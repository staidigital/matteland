// Lager matteoppgaver med tilfeldige tall. Kjører på serveren, så fasiten aldri når nettleseren før svaret er sendt.

export const TEMAER = ['brok', 'algebra', 'potens', 'likning', 'andregrad', 'funksjon'] as const
export type Tema = (typeof TEMAER)[number]

export type Fasit =
  | { type: 'tall'; verdier: number[]; tekst: string }
  | { type: 'valg'; riktig: string; tekst: string }

export type Oppgave = {
  sporsmal: string
  valg?: string[]
  hint?: string
  fasit: Fasit
}

const heltall = (fra: number, til: number) => fra + Math.floor(Math.random() * (til - fra + 1))
const uten0 = (fra: number, til: number) => {
  const n = heltall(fra, til - 1)
  return n >= 0 ? n + 1 : n
}
const velg = <T,>(liste: T[]) => liste[heltall(0, liste.length - 1)]
const stokk = <T,>(liste: T[]) => {
  const kopi = [...liste]
  for (let i = kopi.length - 1; i > 0; i--) {
    const j = heltall(0, i)
    ;[kopi[i], kopi[j]] = [kopi[j], kopi[i]]
  }
  return kopi
}
const sfd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : sfd(b, a % b))

const tall = (n: number) => (n < 0 ? `−${-n}` : String(n))

/** Skriver for eksempel a = 2, b = −3, c = 1 som «2x² − 3x + 1». */
function uttrykk(ledd: [number, string][]) {
  let ut = ''
  for (const [koeff, navn] of ledd) {
    if (koeff === 0) continue
    const abs = Math.abs(koeff)
    const tekst = navn && abs === 1 ? navn : `${abs}${navn}`
    if (!ut) ut = koeff < 0 ? `−${tekst}` : tekst
    else ut += koeff < 0 ? ` − ${tekst}` : ` + ${tekst}`
  }
  return ut || '0'
}
const lineaer = (a: number, b: number) => uttrykk([[a, 'x'], [b, '']])
const kvadratisk = (a: number, b: number, c: number) => uttrykk([[a, 'x²'], [b, 'x'], [c, '']])

function brokTekst(t: number, n: number) {
  const g = sfd(t, n) || 1
  const [ta, ne] = n < 0 ? [-t / g, -n / g] : [t / g, n / g]
  return ne === 1 ? tall(ta) : `${tall(ta)}/${ne}`
}

function tallsvar(sporsmal: string, verdier: number[], tekst?: string, hint?: string): Oppgave {
  return {
    sporsmal,
    hint,
    fasit: { type: 'tall', verdier, tekst: tekst ?? verdier.map(tall).join(' og ') },
  }
}

/** Flervalg der de gale svarene er ulike det riktige. */
function flervalg(sporsmal: string, riktig: string, feil: string[]): Oppgave {
  const unike = [...new Set(feil)].filter((f) => f !== riktig).slice(0, 3)
  return { sporsmal, valg: stokk([riktig, ...unike]), fasit: { type: 'valg', riktig, tekst: riktig } }
}

function brok(niva: number): Oppgave {
  const hint = 'Svar med brøk (3/4) eller helt tall.'
  if (niva === 1) {
    const n = velg([3, 4, 5, 6, 7, 8, 9, 10])
    const a = heltall(1, n)
    const b = heltall(1, n)
    return tallsvar(`Regn ut: ${a}/${n} + ${b}/${n}`, [(a + b) / n], brokTekst(a + b, n), hint)
  }
  if (niva === 2) {
    const [a, b] = [heltall(1, 5), velg([2, 3, 4, 5, 6])]
    const [c, d] = [heltall(1, 5), velg([3, 4, 5, 7, 8])]
    if (heltall(0, 1)) return tallsvar(`Regn ut: ${a}/${b} + ${c}/${d}`, [a / b + c / d], brokTekst(a * d + c * b, b * d), hint)
    return tallsvar(`Regn ut: ${a}/${b} − ${c}/${d}`, [a / b - c / d], brokTekst(a * d - c * b, b * d), hint)
  }
  const [a, b, c, d, e, f] = [heltall(1, 5), velg([2, 3, 4, 5]), heltall(1, 5), velg([2, 3, 4, 6]), heltall(1, 5), velg([2, 3, 5])]
  if (heltall(0, 1)) return tallsvar(`Regn ut: (${a}/${b}) : (${c}/${d})`, [(a * d) / (b * c)], brokTekst(a * d, b * c), hint)
  return tallsvar(`Regn ut: ${a}/${b} + ${c}/${d} · ${e}/${f}`, [a / b + (c * e) / (d * f)], brokTekst(a * d * f + c * e * b, b * d * f), hint)
}

function algebra(niva: number): Oppgave {
  if (niva === 1) {
    const [a, b, c, d] = [heltall(2, 7), uten0(-6, 6), heltall(2, 7), uten0(-6, 6)]
    return flervalg(
      `Trekk sammen: ${lineaer(a, b)} + ${lineaer(c, d)}`,
      lineaer(a + c, b + d),
      [lineaer(a + c + 1, b + d), lineaer(a + c, b - d), lineaer(a - c || 1, b + d), lineaer(a * c, b + d)],
    )
  }
  if (niva === 2) {
    const [a, b, c, d] = [heltall(2, 6), uten0(-5, 5), heltall(2, 5), uten0(-5, 5)]
    return flervalg(
      `Gang ut og trekk sammen: ${a}(${lineaer(1, b)}) − ${c}(${lineaer(1, d)})`,
      lineaer(a - c, a * b - c * d),
      [lineaer(a - c, a * b + c * d), lineaer(a + c, a * b - c * d), lineaer(a - c, b - d), lineaer(a - c, a * b - d)],
    )
  }
  const a = heltall(2, 9)
  const variant = heltall(0, 2)
  if (variant === 0) {
    return flervalg(
      `Gang ut: (x + ${a})²`,
      kvadratisk(1, 2 * a, a * a),
      [kvadratisk(1, 0, a * a), kvadratisk(1, a, a * a), kvadratisk(1, 2 * a, 2 * a), kvadratisk(1, -2 * a, a * a)],
    )
  }
  if (variant === 1) {
    return flervalg(
      `Gang ut: (x − ${a})²`,
      kvadratisk(1, -2 * a, a * a),
      [kvadratisk(1, 0, -a * a), kvadratisk(1, -a, a * a), kvadratisk(1, 2 * a, a * a), kvadratisk(1, -2 * a, -a * a)],
    )
  }
  return flervalg(
    `Faktoriser: x² − ${a * a}`,
    `(x + ${a})(x − ${a})`,
    [`(x − ${a})²`, `(x + ${a})²`, `x(x − ${a * a})`, `(x + ${a * a})(x − 1)`],
  )
}

function potens(niva: number): Oppgave {
  const hint = 'Svar med et tall.'
  if (niva === 1) {
    if (heltall(0, 1)) {
      const k = heltall(2, 15)
      return tallsvar(`Regn ut: √${k * k}`, [k], undefined, hint)
    }
    const [g, e] = velg([[2, 3], [2, 4], [2, 5], [3, 2], [3, 3], [4, 2], [5, 2], [5, 3], [10, 3]])
    return tallsvar(`Regn ut: ${g}^${e}`, [g ** e], undefined, hint)
  }
  if (niva === 2) {
    const [g, a, b, c] = [velg([2, 3, 5, 7]), heltall(2, 6), heltall(2, 6), heltall(1, 4)]
    return tallsvar(`Skriv som én potens av ${g}: ${g}^${a} · ${g}^${b} / ${g}^${c}. Hva blir eksponenten?`, [a + b - c], undefined, hint)
  }
  if (heltall(0, 1)) {
    const [g, a, b] = velg([[8, 2, 3], [27, 2, 3], [16, 3, 4], [32, 2, 5], [125, 2, 3], [81, 3, 4]])
    return tallsvar(`Regn ut: ${g}^(${a}/${b})`, [Math.round(Math.round(g ** (1 / b)) ** a)], undefined, hint)
  }
  const [g, m, n, k] = [velg([2, 3, 5]), heltall(2, 4), heltall(2, 3), heltall(1, 5)]
  return tallsvar(`Skriv som én potens av ${g}: (${g}^${m})^${n} / ${g}^${k}. Hva blir eksponenten?`, [m * n - k], undefined, hint)
}

function likning(niva: number): Oppgave {
  const hint = 'Svar med verdien til x.'
  const x = uten0(-9, 9)
  if (niva === 1) {
    const [a, b] = [heltall(2, 9), uten0(-12, 12)]
    return tallsvar(`Løs likningen: ${lineaer(a, b)} = ${tall(a * x + b)}`, [x], `x = ${tall(x)}`, hint)
  }
  if (niva === 2) {
    const a = heltall(3, 9)
    const c = heltall(1, a - 1)
    const b = uten0(-12, 12)
    const d = (a - c) * x + b
    return tallsvar(`Løs likningen: ${lineaer(a, b)} = ${lineaer(c, d)}`, [x], `x = ${tall(x)}`, hint)
  }
  if (heltall(0, 1)) {
    const a = heltall(2, 6)
    const k = uten0(-5, 5)
    const b = uten0(-9, 9)
    return tallsvar(`Løs likningen: x/${a} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${tall(k + b)}`, [a * k], `x = ${tall(a * k)}`, hint)
  }
  const [a, b, c] = [heltall(3, 7), uten0(-5, 5), heltall(1, 2)]
  const d = uten0(-5, 5)
  const e = a * (x + b) - c * (x + d)
  const rest = e === 0 ? '' : ` ${e < 0 ? '−' : '+'} ${Math.abs(e)}`
  return tallsvar(`Løs likningen: ${a}(${lineaer(1, b)}) = ${c === 1 ? '' : c}(${lineaer(1, d)})${rest}`, [x], `x = ${tall(x)}`, hint)
}

function andregrad(niva: number): Oppgave {
  const hint = 'Skriv begge løsningene, for eksempel 2 og −3.'
  const losninger = (a: number, b: number) => `x = ${tall(a)} og x = ${tall(b)}`
  if (niva === 1) {
    const k = heltall(2, 12)
    if (heltall(0, 1)) return tallsvar(`Løs likningen: x² = ${k * k}`, [k, -k], losninger(k, -k), hint)
    const a = uten0(-9, 9)
    return tallsvar(`Løs likningen: x(${lineaer(1, -a)}) = 0`, [0, a], losninger(0, a), hint)
  }
  if (niva === 2) {
    const [r, s] = [uten0(-8, 8), uten0(-8, 8)]
    if (r === s) return tallsvar(`Løs likningen: ${kvadratisk(1, -2 * r, r * r)} = 0`, [r], `x = ${tall(r)}`, 'Likningen har én løsning.')
    return tallsvar(`Løs likningen: ${kvadratisk(1, -(r + s), r * s)} = 0`, [r, s], losninger(r, s), hint)
  }
  if (heltall(0, 2) === 0) {
    const [a, b, c] = [heltall(1, 4), uten0(-7, 7), uten0(-6, 6)]
    const d = b * b - 4 * a * c
    const antall = d > 0 ? 2 : d === 0 ? 1 : 0
    return tallsvar(`Hvor mange løsninger har ${kvadratisk(a, b, c)} = 0?`, [antall], `${antall} (D = ${tall(d)})`, 'Svar 0, 1 eller 2.')
  }
  const a = heltall(2, 4)
  const r = uten0(-6, 6)
  let s = uten0(-6, 6)
  if (s === r) s = r === 6 ? 5 : r + 1
  return tallsvar(`Løs likningen: ${kvadratisk(a, -a * (r + s), a * r * s)} = 0`, [r, s], losninger(r, s), hint)
}

function funksjon(niva: number): Oppgave {
  const hint = 'Svar med et tall.'
  if (niva === 1) {
    const [a, b, k] = [uten0(-6, 6), uten0(-9, 9), uten0(-6, 6)]
    return tallsvar(`f(x) = ${lineaer(a, b)}. Finn f(${tall(k)}).`, [a * k + b], undefined, hint)
  }
  if (niva === 2) {
    if (heltall(0, 1)) {
      const a = uten0(-5, 5)
      const x1 = heltall(-5, 2)
      const x2 = x1 + heltall(1, 4)
      const b = uten0(-6, 6)
      return tallsvar(
        `En rett linje går gjennom (${tall(x1)}, ${tall(a * x1 + b)}) og (${tall(x2)}, ${tall(a * x2 + b)}). Finn stigningstallet.`,
        [a],
        undefined,
        hint,
      )
    }
    const a = uten0(-5, 5)
    const x = uten0(-6, 6)
    return tallsvar(`Finn nullpunktet til f(x) = ${lineaer(a, -a * x)}.`, [x], `x = ${tall(x)}`, 'Svar med x-verdien.')
  }
  if (heltall(0, 1)) {
    const a = uten0(-3, 3)
    const t = uten0(-5, 5)
    const c = uten0(-9, 9)
    return tallsvar(`Finn x-verdien til toppunktet eller bunnpunktet til f(x) = ${kvadratisk(a, -2 * a * t, c)}.`, [t], `x = ${tall(t)}`, hint)
  }
  const a = heltall(2, 6)
  const c = a - heltall(1, a - 1)
  const x = uten0(-6, 6)
  const b = uten0(-9, 9)
  const d = (a - c) * x + b
  return tallsvar(`Grafene til f(x) = ${lineaer(a, b)} og g(x) = ${lineaer(c, d)} skjærer hverandre. Finn x-verdien i skjæringspunktet.`, [x], `x = ${tall(x)}`, hint)
}

const GENERATORER: Record<Tema, (niva: number) => Oppgave> = { brok, algebra, potens, likning, andregrad, funksjon }

export function lagOppgave(tema: Tema, niva: number) {
  return GENERATORER[tema](niva)
}

/** Leser «2 og −3», «x = 2, x = −3», «0,5», «3/4» og lignende. Gir null hvis noe ikke er et tall. */
export function lesTall(svar: string): number[] | null {
  const renset = svar
    .toLowerCase()
    .replaceAll('−', '-')
    .replaceAll('–', '-')
    .replace(/,\s+|,(?=\s*x\s*=)/g, ';')
    .replace(/\bog\b/g, ';')
    .replace(/x\s*\d?\s*=/g, '')
  const deler = renset.split(/[;\s]+/).filter(Boolean)
  if (!deler.length) return null
  const verdier = deler.map((del) => {
    const brok = del.match(/^(-?\d+(?:[.,]\d+)?)\/(-?\d+(?:[.,]\d+)?)$/)
    if (brok) return Number(brok[1].replace(',', '.')) / Number(brok[2].replace(',', '.'))
    return /^-?\d+(?:[.,]\d+)?$/.test(del) ? Number(del.replace(',', '.')) : NaN
  })
  return verdier.every(Number.isFinite) ? verdier : null
}

export function erRiktig(fasit: Fasit, svar: string) {
  if (fasit.type === 'valg') return svar === fasit.riktig
  const verdier = lesTall(svar)
  if (!verdier || verdier.length !== fasit.verdier.length) return false
  const sortert = (liste: number[]) => [...liste].sort((a, b) => a - b)
  const forventet = sortert(fasit.verdier)
  // Brøk og avrundet desimaltall skal begge godkjennes
  return sortert(verdier).every((v, i) => Math.abs(v - forventet[i]) < 0.006)
}
