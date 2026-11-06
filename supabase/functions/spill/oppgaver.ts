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

type Variant = () => Oppgave

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

const BROK_HINT = 'Svar med brøk (3/4) eller helt tall.'
const TALL_HINT = 'Svar med et tall.'
const X_HINT = 'Svar med verdien til x.'
const TO_HINT = 'Skriv begge løsningene, for eksempel 2 og −3.'
const ENHET_HINT = 'Svar med et tall, uten enhet.'

const fellesFaktor = (a: number, b: number) => sfd(a, b) !== 1
const parentes = (r: number) => `(${lineaer(1, r)})`
const koordinat = (x: number, y: number) => `(${tall(x)}, ${tall(y)})`
const komma = (n: number) => String(n).replace('.', ',').replace('-', '−')
const xPotens = (e: number) => (e === 1 ? 'x' : `x^${e}`)
const rot = (k: number, s: number) => (k === 1 ? `√${s}` : `${k}√${s}`)
const brokSvar = (sporsmal: string, t: number, n: number) => tallsvar(sporsmal, [t / n], brokTekst(t, n), BROK_HINT)
const losninger = (a: number, b: number) => `x = ${tall(a)} og x = ${tall(b)}`
const xSvar = (sporsmal: string, x: number, hint = X_HINT) => tallsvar(sporsmal, [x], `x = ${tall(x)}`, hint)

/** Teller som ikke kan forkortes med n. */
function teller(n: number, maks = n - 1) {
  let t = heltall(1, maks)
  while (fellesFaktor(t, n)) t = heltall(1, maks)
  return t
}

/** To ulike tall uten 0. */
function toUlike(fra: number, til: number): [number, number] {
  const r = uten0(fra, til)
  let s = uten0(fra, til)
  while (s === r) s = uten0(fra, til)
  return [r, s]
}

/** Som toUlike, men summen er aldri 0. Da blir uttrykket et konjugat, og de gale faktoriseringene ville også vært riktige. */
function toUlikeMedSum(fra: number, til: number): [number, number] {
  let [r, s] = toUlike(fra, til)
  while (r + s === 0) [r, s] = toUlike(fra, til)
  return [r, s]
}

const BROK: Variant[][] = [
  [
    () => {
      const n = heltall(3, 12)
      const [a, b] = [heltall(1, n), heltall(1, n)]
      return brokSvar(`Regn ut: ${a}/${n} + ${b}/${n}`, a + b, n)
    },
    () => {
      const n = heltall(3, 12)
      const a = heltall(2, n + 3)
      const b = heltall(1, a - 1)
      return brokSvar(`Regn ut: ${a}/${n} − ${b}/${n}`, a - b, n)
    },
    () => {
      // Flervalg, fordi en som svarer med selve brøken ellers ville fått rett
      const [n, k] = [heltall(3, 12), heltall(2, 9)]
      const t = teller(n)
      return flervalg(`Forkort så langt som mulig: ${t * k}/${n * k}`, brokTekst(t, n), [
        `${n}/${t}`,
        brokTekst(t + 1, n),
        brokTekst(t, n + 1),
        brokTekst(t + k, n + k),
      ])
    },
    () => {
      const n = velg([2, 3, 4, 5, 6, 8, 10])
      const t = teller(n)
      const k = heltall(2, 12)
      return tallsvar(`Hva er ${t}/${n} av ${n * k}?`, [t * k], undefined, TALL_HINT)
    },
    () => {
      const n = heltall(2, 12)
      const t = teller(n)
      const c = heltall(2, 9)
      return brokSvar(`Regn ut: ${t}/${n} · ${c}`, t * c, n)
    },
    () => {
      const [a, b, c, d] = [heltall(1, 5), heltall(2, 6), heltall(1, 5), heltall(2, 6)]
      return brokSvar(`Regn ut: ${a}/${b} · ${c}/${d}`, a * c, b * d)
    },
  ],
  [
    () => {
      const [a, b, c, d] = [heltall(1, 7), heltall(2, 9), heltall(1, 7), heltall(2, 9)]
      return brokSvar(`Regn ut: ${a}/${b} + ${c}/${d}`, a * d + c * b, b * d)
    },
    () => {
      const [a, b, c, d] = [heltall(1, 7), heltall(2, 9), heltall(1, 7), heltall(2, 9)]
      return brokSvar(`Regn ut: ${a}/${b} − ${c}/${d}`, a * d - c * b, b * d)
    },
    () => {
      const [a, b, c, d] = [heltall(2, 9), heltall(3, 15), heltall(2, 9), heltall(3, 15)]
      return brokSvar(`Regn ut: ${a}/${b} · ${c}/${d}`, a * c, b * d)
    },
    () => {
      const [a, b, c, d] = [heltall(1, 7), heltall(2, 9), heltall(1, 7), heltall(2, 9)]
      return brokSvar(`Regn ut: (${a}/${b}) : (${c}/${d})`, a * d, b * c)
    },
    () => {
      const n = heltall(2, 9)
      const [t, k] = [teller(n), heltall(1, 9)]
      if (heltall(0, 1)) return brokSvar(`Regn ut: ${k} + ${t}/${n}`, k * n + t, n)
      return brokSvar(`Regn ut: ${k} − ${t}/${n}`, k * n - t, n)
    },
    () => {
      const a = heltall(2, 6)
      let b = heltall(2, 7)
      while (fellesFaktor(a, b)) b = heltall(2, 7)
      return flervalg(`Trekk sammen: x/${a} + x/${b}`, `${a + b}x/${a * b}`, [`2x/${a + b}`, `${a + b}x/${2 * a * b}`, `x/${a * b}`])
    },
    () => {
      const a = heltall(2, 6)
      const n = heltall(2, 9)
      const t = teller(n)
      return tallsvar(`Løs likningen: x/${a} = ${t}/${n}`, [(a * t) / n], `x = ${brokTekst(a * t, n)}`, BROK_HINT)
    },
  ],
  [
    () => {
      const [a, b, c, d, e, f] = [heltall(1, 5), heltall(2, 5), heltall(1, 5), heltall(2, 6), heltall(1, 5), heltall(2, 6)]
      return brokSvar(`Regn ut: (${a}/${b}) : (${c}/${d}) − ${e}/${f}`, a * d * f - e * b * c, b * c * f)
    },
    () => {
      const [a, b, c, d, e, f] = [heltall(1, 5), heltall(2, 5), heltall(1, 5), heltall(2, 6), heltall(1, 5), heltall(2, 5)]
      return brokSvar(`Regn ut: ${a}/${b} + ${c}/${d} · ${e}/${f}`, a * d * f + c * e * b, b * d * f)
    },
    () => {
      const [a, b, c, d, e, f] = [heltall(1, 5), heltall(2, 6), heltall(1, 5), heltall(2, 6), heltall(1, 5), heltall(2, 6)]
      return brokSvar(`Regn ut: (${a}/${b} + ${c}/${d}) · ${e}/${f}`, (a * d + c * b) * e, b * d * f)
    },
    () => {
      const [a, b, c, d, e, f] = [heltall(1, 5), heltall(2, 6), heltall(1, 5), heltall(2, 6), heltall(1, 5), heltall(2, 6)]
      return brokSvar(`Regn ut: (${a}/${b} − ${c}/${d}) : (${e}/${f})`, (a * d - c * b) * f, b * d * e)
    },
    () => {
      const a = heltall(2, 12)
      const feil = [lineaer(1, a * a), lineaer(1, a + a), `x² − ${a}`]
      if (heltall(0, 1)) return flervalg(`Forkort: (x² − ${a * a})/(x + ${a})`, lineaer(1, -a), [lineaer(1, a), ...feil])
      return flervalg(`Forkort: (x² − ${a * a})/(x − ${a})`, lineaer(1, a), [lineaer(1, -a), ...feil])
    },
    () => {
      const [a, k] = [uten0(-9, 9), heltall(2, 6)]
      return flervalg(`Forkort: (${kvadratisk(k, k * a, 0)})/(${k}x)`, lineaer(1, a), [lineaer(1, k * a), lineaer(k, a), lineaer(1, -a), `x + ${k}`])
    },
    () => {
      const a = uten0(-9, 9)
      return flervalg(`Forkort: (${kvadratisk(1, 2 * a, a * a)})/${parentes(a)}`, lineaer(1, a), [lineaer(1, -a), lineaer(1, 2 * a), lineaer(2, a * a)])
    },
    () => {
      const [a, b] = velg([[3, 2], [4, 3], [5, 2], [5, 3], [3, 4], [5, 4]])
      const [m, j] = [uten0(-5, 5), uten0(-5, 5)]
      const x = b * m
      let p = x - a * j
      if (p === 0) p = a
      const k = (x - p) / a
      return xSvar(`Løs likningen: (${lineaer(1, -p)})/${a} + x/${b} = ${tall(k + m)}`, x)
    },
    () => {
      const [a, b] = velg([[2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [2, 7]])
      const m = uten0(-4, 4)
      return xSvar(`Løs likningen: x/${a} + x/${b} = ${tall(m * (a + b))}`, a * b * m)
    },
  ],
]

function primtallsoppgave() {
  const faktorer = stokk([2, 2, 2, 3, 3, 5, 7]).slice(0, heltall(3, 4)).sort((a, b) => a - b)
  const produkt = faktorer.reduce((sum, f) => sum * f, 1)
  const skriv = (liste: number[]) => liste.join(' · ')
  const neste: Record<number, number> = { 2: 3, 3: 5, 5: 7, 7: 11 }
  return flervalg(`Skriv ${produkt} som et produkt av primtall.`, skriv(faktorer), [
    skriv([faktorer[0] * faktorer[1], ...faktorer.slice(2)]),
    skriv([...faktorer.slice(0, -1), neste[faktorer[faktorer.length - 1]]]),
    skriv([...faktorer.slice(0, -2), faktorer[faktorer.length - 2] * faktorer[faktorer.length - 1]]),
  ])
}

const ALGEBRA: Variant[][] = [
  [
    () => {
      const [a, b, c, d] = [heltall(2, 7), uten0(-6, 6), heltall(2, 7), uten0(-6, 6)]
      return flervalg(`Trekk sammen: ${lineaer(a, b)} + ${lineaer(c, d)}`, lineaer(a + c, b + d), [
        lineaer(a + c + 1, b + d),
        lineaer(a + c, b - d),
        lineaer(a - c || 1, b + d),
        lineaer(a * c, b + d),
      ])
    },
    () => {
      const [p, q, r, s] = [heltall(2, 9), heltall(2, 9), uten0(-6, 6), uten0(-6, 6)]
      const ledd = (a: number, b: number) => uttrykk([[a, 'a'], [b, 'b']])
      return flervalg(`Trekk sammen: ${uttrykk([[p, 'a'], [q, 'b'], [r, 'a'], [s, 'b']])}`, ledd(p + r, q + s), [
        ledd(p + r + 1, q + s),
        ledd(p - r, q + s),
        ledd(p + r, q - s),
        ledd(p + q, r + s),
      ])
    },
    () => {
      const [a, b] = [heltall(2, 9), uten0(-9, 9)]
      return flervalg(`Gang ut: ${a}${parentes(b)}`, lineaer(a, a * b), [lineaer(a, b), lineaer(1, a * b), lineaer(a, -a * b), lineaer(a, a + b)])
    },
    () => {
      const p = heltall(3, 9)
      const q = heltall(1, p - 1)
      const r = uten0(-6, 6)
      return flervalg(`Løs opp parentesen og trekk sammen: ${p}x − (${lineaer(q, r)})`, lineaer(p - q, -r), [
        lineaer(p - q, r),
        lineaer(p + q, -r),
        lineaer(p + q, r),
      ])
    },
    () => {
      const [p, q, k] = [heltall(2, 9), uten0(-9, 9), uten0(-6, 6)]
      return tallsvar(`Hva er verdien av ${lineaer(p, q)} når x = ${tall(k)}?`, [p * k + q], undefined, TALL_HINT)
    },
    () => {
      const [c, k] = [uten0(-9, 9), uten0(-6, 6)]
      return tallsvar(`Hva er verdien av ${kvadratisk(1, 0, c)} når x = ${tall(k)}?`, [k * k + c], undefined, TALL_HINT)
    },
    () => {
      const [p, q] = [heltall(2, 9), heltall(2, 9)]
      return flervalg(`Regn ut: ${p}x · ${q}x`, `${p * q}x²`, [`${p + q}x²`, `${p * q}x`, `${p + q}x`, `${p * q + 1}x²`])
    },
    () => {
      const [p, q] = [heltall(2, 9), heltall(2, 9)]
      return flervalg(`Regn ut: ${p}a · ${q}b`, `${p * q}ab`, [`${p + q}ab`, `${p * q}a`, `${p}a + ${q}b`])
    },
  ],
  [
    () => {
      const [a, b, c, d] = [heltall(2, 6), uten0(-5, 5), heltall(2, 5), uten0(-5, 5)]
      return flervalg(`Gang ut og trekk sammen: ${a}${parentes(b)} − ${c}${parentes(d)}`, lineaer(a - c, a * b - c * d), [
        lineaer(a - c, a * b + c * d),
        lineaer(a + c, a * b - c * d),
        lineaer(a - c, b - d),
        lineaer(a - c, a * b - d),
      ])
    },
    () => {
      const a = uten0(-7, 7)
      let b = uten0(-7, 7)
      if (a + b === 0) b += b > 0 ? 1 : -1
      return flervalg(`Gang ut og trekk sammen: ${parentes(a)}${parentes(b)}`, kvadratisk(1, a + b, a * b), [
        kvadratisk(1, 0, a * b),
        kvadratisk(1, a + b, a + b),
        kvadratisk(1, -(a + b), a * b),
        kvadratisk(1, a * b, a + b),
      ])
    },
    () => {
      const [k, p] = [heltall(2, 6), heltall(1, 5)]
      let q = uten0(-7, 7)
      while (fellesFaktor(p, q)) q = uten0(-7, 7)
      return flervalg(`Trekk ut det som er felles: ${kvadratisk(k * p, k * q, 0)}`, `${k}x(${lineaer(p, q)})`, [
        `${k}x(${lineaer(p, -q)})`,
        `x(${lineaer(p, q)})`,
        `${k}x(${lineaer(p + 1, q)})`,
      ])
    },
    primtallsoppgave,
    () => {
      const [p, q, r, s, t] = [heltall(5, 9), heltall(2, 4), heltall(1, 5), heltall(2, 4), heltall(1, 4)]
      const ledd = (a: number, b: number) => uttrykk([[a, 'a'], [b, 'b']])
      return flervalg(`Løs opp parentesene og trekk sammen: ${p}a − (${ledd(q, -r)}) + (${ledd(s, t)})`, ledd(p - q + s, r + t), [
        ledd(p - q + s, t - r),
        ledd(p + q + s, r + t),
        ledd(p - q - s, r + t),
        ledd(p - q + s + 1, r + t),
      ])
    },
    () => {
      const [a, d, n] = [heltall(1, 9), heltall(2, 7), heltall(10, 40)]
      return tallsvar(
        `Et mønster har ${a}, ${a + d}, ${a + 2 * d}, ${a + 3 * d}, … prikker. Hvor mange prikker er det i figur ${n}?`,
        [a + d * (n - 1)],
        undefined,
        TALL_HINT,
      )
    },
    () => {
      const [a, d] = [heltall(1, 9), heltall(2, 7)]
      const formel = (k: number, m: number) => uttrykk([[k, 'n'], [m, '']])
      return flervalg(`Et mønster har ${a}, ${a + d}, ${a + 2 * d}, ${a + 3 * d}, … prikker. Hvilken formel gir antallet i figur n?`, formel(d, a - d), [
        formel(d, a),
        formel(a, d),
        formel(d + 1, a - d),
        formel(d, a + d),
      ])
    },
  ],
  [
    () => {
      const a = heltall(2, 12)
      return flervalg(`Gang ut: (x + ${a})²`, kvadratisk(1, 2 * a, a * a), [kvadratisk(1, 0, a * a), kvadratisk(1, a, a * a), kvadratisk(1, 2 * a, 2 * a)])
    },
    () => {
      const a = heltall(2, 12)
      return flervalg(`Gang ut: (x − ${a})²`, kvadratisk(1, -2 * a, a * a), [kvadratisk(1, 0, -a * a), kvadratisk(1, -a, a * a), kvadratisk(1, 2 * a, a * a)])
    },
    () => {
      const a = heltall(2, 15)
      return flervalg(`Faktoriser: x² − ${a * a}`, `(x + ${a})(x − ${a})`, [`(x − ${a})²`, `(x + ${a})²`, `x(x − ${a * a})`])
    },
    () => {
      const [p, a] = [heltall(2, 5), uten0(-7, 7)]
      return flervalg(`Gang ut: (${lineaer(p, a)})²`, kvadratisk(p * p, 2 * p * a, a * a), [
        kvadratisk(p * p, 0, a * a),
        kvadratisk(p, 2 * p * a, a * a),
        kvadratisk(p * p, p * a, a * a),
      ])
    },
    () => {
      const [p, a] = [heltall(2, 6), heltall(1, 9)]
      return flervalg(`Gang ut: (${lineaer(p, a)})(${lineaer(p, -a)})`, kvadratisk(p * p, 0, -a * a), [
        kvadratisk(p * p, 0, a * a),
        kvadratisk(p, 0, -a * a),
        kvadratisk(p * p, 2 * p * a, -a * a),
      ])
    },
    () => {
      const a = uten0(-12, 12)
      return flervalg(`Faktoriser: ${kvadratisk(1, 2 * a, a * a)}`, `${parentes(a)}²`, [`${parentes(-a)}²`, `${parentes(a)}${parentes(-a)}`, `x${parentes(2 * a)}`])
    },
    () => {
      const p = heltall(2, 6)
      const a = teller(p, 9)
      return flervalg(`Faktoriser: ${kvadratisk(p * p, 0, -a * a)}`, `(${lineaer(p, a)})(${lineaer(p, -a)})`, [
        `(${lineaer(p, -a)})²`,
        `(${lineaer(p, a)})²`,
        `(${lineaer(p * p, a)})(${lineaer(1, -a)})`,
      ])
    },
    () => {
      const a = heltall(1, 9)
      return flervalg(`Trekk sammen: ${parentes(a)}² − ${parentes(-a)}²`, `${4 * a}x`, [`${2 * a}x`, `${2 * a * a}`, lineaer(4 * a, 2 * a * a)])
    },
    () => {
      const a = heltall(1, 9)
      let b = uten0(-9, 9)
      if (b === 2 * a) b = -b
      return flervalg(`Trekk sammen: ${parentes(a)}² − x${parentes(b)}`, lineaer(2 * a - b, a * a), [
        lineaer(2 * a + b, a * a),
        lineaer(2 * a - b, -a * a),
        kvadratisk(2, 2 * a - b, a * a),
      ])
    },
    () => {
      const a = uten0(-9, 9)
      let c = uten0(-15, 15)
      if (c === a * a) c += 1
      const skriv = (t: number, rest: number) => `${parentes(t)}² ${rest < 0 ? '−' : '+'} ${Math.abs(rest)}`
      return flervalg(`Skriv som fullstendig kvadrat: ${kvadratisk(1, 2 * a, c)}`, skriv(a, c - a * a), [
        skriv(a, c + a * a),
        skriv(-a, c - a * a),
        skriv(2 * a, c - a * a),
      ])
    },
    () => {
      const n = heltall(12, 30)
      const [navn, f] = velg<[string, (k: number) => number]>([
        ['1, 4, 9, 16', (k) => k * k],
        ['2, 5, 10, 17', (k) => k * k + 1],
        ['3, 6, 11, 18', (k) => k * k + 2],
        ['2, 6, 12, 20', (k) => k * (k + 1)],
        ['1, 3, 6, 10', (k) => (k * (k + 1)) / 2],
        ['3, 8, 15, 24', (k) => k * (k + 2)],
      ])
      return tallsvar(`Et mønster har ${navn}, … prikker. Hvor mange prikker er det i figur ${n}?`, [f(n)], undefined, TALL_HINT)
    },
  ],
]

const POTENS: Variant[][] = [
  [
    () => {
      const k = heltall(2, 20)
      return tallsvar(`Regn ut: √${k * k}`, [k], undefined, TALL_HINT)
    },
    () => {
      const [g, e] = velg([[2, 3], [2, 4], [2, 5], [2, 6], [2, 7], [3, 2], [3, 3], [3, 4], [4, 2], [4, 3], [5, 2], [5, 3], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [10, 3], [10, 4], [11, 2], [12, 2]])
      return tallsvar(`Regn ut: ${g}^${e}`, [g ** e], undefined, TALL_HINT)
    },
    () => {
      const [g, e] = [heltall(2, 9), velg([2, 3])]
      return tallsvar(`Regn ut: (−${g})^${e}`, [(-g) ** e], undefined, TALL_HINT)
    },
    () => {
      const g = heltall(2, 12)
      return tallsvar(`Regn ut: −${g}²`, [-g * g], undefined, TALL_HINT)
    },
    () => {
      const g = heltall(2, 50)
      return tallsvar(`Regn ut: ${g}^0`, [1], undefined, TALL_HINT)
    },
    () => {
      const [g, a, b] = [velg([2, 3, 5, 7, 10]), heltall(2, 9), heltall(2, 9)]
      return tallsvar(`Skriv som én potens av ${g}: ${g}^${a} · ${g}^${b}. Hva blir eksponenten?`, [a + b], undefined, TALL_HINT)
    },
    () => {
      const [g, b] = [velg([2, 3, 5, 7, 10]), heltall(1, 6)]
      const a = b + heltall(1, 6)
      return tallsvar(`Skriv som én potens av ${g}: ${g}^${a} / ${g}^${b}. Hva blir eksponenten?`, [a - b], undefined, TALL_HINT)
    },
    () => {
      const d = velg([12, 15, 18, 21, 25, 32, 34, 36, 41, 45, 52, 58, 63, 67, 72, 75, 84, 89, 91, 96])
      const e = heltall(2, 6)
      return tallsvar(`Skriv som vanlig tall: ${komma(d / 10)} · 10^${e}`, [d * 10 ** (e - 1)], undefined, 'Svar med et tall uten mellomrom.')
    },
  ],
  [
    () => {
      const [g, a, b, c] = [velg([2, 3, 5, 7]), heltall(2, 8), heltall(2, 8), heltall(1, 5)]
      return tallsvar(`Skriv som én potens av ${g}: ${g}^${a} · ${g}^${b} / ${g}^${c}. Hva blir eksponenten?`, [a + b - c], undefined, TALL_HINT)
    },
    () => {
      const [g, e] = velg([[2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [3, 1], [3, 2], [3, 3], [4, 1], [4, 2], [5, 1], [5, 2], [6, 2], [10, 1], [10, 2]])
      return brokSvar(`Regn ut: ${g}^−${e}`, 1, g ** e)
    },
    () => {
      const [g, a] = [velg([2, 3, 5]), heltall(1, 5)]
      const b = a + heltall(1, 3)
      return tallsvar(`Regn ut: ${g}^−${a} · ${g}^${b}`, [g ** (b - a)], undefined, TALL_HINT)
    },
    () => {
      const [g, m, n] = [velg([2, 3, 5, 7]), heltall(2, 6), heltall(2, 5)]
      return tallsvar(`Skriv som én potens av ${g}: (${g}^${m})^${n}. Hva blir eksponenten?`, [m * n], undefined, TALL_HINT)
    },
    () => {
      const [s, k] = [velg([2, 3, 5, 6, 7]), heltall(2, 5)]
      return tallsvar(`Regn ut: √${s} · √${s * k * k}`, [s * k], undefined, TALL_HINT)
    },
    () => {
      const [s, a] = [velg([2, 3, 5, 6, 7]), heltall(2, 6)]
      return flervalg(`Skriv så enkelt som mulig: √${s * a * a}`, rot(a, s), [rot(a * a, s), rot(s, a), rot(a + 1, s), rot(a, s + 1)])
    },
    () => {
      const [a, b, c] = [heltall(2, 7), heltall(2, 7), heltall(1, 3)]
      return flervalg(`Forenkle: x^${a} · x^${b} / x^${c}`, xPotens(a + b - c), [xPotens(a * b - c), xPotens(a + b + c), xPotens(a + b)])
    },
    () => {
      const [p, m, n] = [heltall(2, 4), heltall(2, 4), heltall(2, 3)]
      return flervalg(`Forenkle: (${p}${xPotens(m)})^${n}`, `${p ** n}${xPotens(m * n)}`, [`${p * n}${xPotens(m * n)}`, `${p ** n}${xPotens(m + n)}`, `${p}${xPotens(m * n)}`, `${p ** n}${xPotens(m * n + 1)}`])
    },
    () => {
      const d = velg([12, 15, 18, 25, 32, 36, 45, 52, 63, 72, 75, 84, 91, 96])
      const e = heltall(3, 6)
      return flervalg(`Skriv på standardform: ${d * 10 ** (e - 1)}`, `${komma(d / 10)} · 10^${e}`, [
        `${d} · 10^${e - 1}`,
        `${komma(d / 10)} · 10^${e - 1}`,
        `${komma(d / 10)} · 10^${e + 1}`,
      ])
    },
    () => {
      const d = velg([12, 15, 18, 25, 32, 36, 45, 52, 63, 72, 75, 84, 91, 96])
      const nuller = heltall(1, 3)
      const e = -(nuller + 1)
      return flervalg(`Skriv på standardform: 0,${'0'.repeat(nuller)}${d}`, `${komma(d / 10)} · 10^${tall(e)}`, [
        `${d} · 10^${tall(e - 1)}`,
        `${komma(d / 10)} · 10^${tall(e + 1)}`,
        `${komma(d / 10)} · 10^${-e}`,
      ])
    },
  ],
  [
    () => {
      const [g, a, b, svar] = velg([[8, 2, 3, 4], [27, 2, 3, 9], [16, 3, 4, 8], [32, 2, 5, 4], [32, 3, 5, 8], [125, 2, 3, 25], [81, 3, 4, 27], [64, 2, 3, 16], [64, 5, 6, 32], [216, 2, 3, 36], [243, 2, 5, 9], [1000, 2, 3, 100]])
      return tallsvar(`Regn ut: ${g}^(${a}/${b})`, [svar], undefined, TALL_HINT)
    },
    () => {
      const [g, a, b, n] = velg([[8, 1, 3, 2], [8, 2, 3, 4], [27, 1, 3, 3], [27, 2, 3, 9], [16, 1, 2, 4], [16, 3, 4, 8], [25, 1, 2, 5], [32, 2, 5, 4], [4, 3, 2, 8], [9, 3, 2, 27]])
      return brokSvar(`Regn ut: ${g}^(−${a}/${b})`, 1, n)
    },
    () => {
      const [g, m, n, k] = [velg([2, 3, 5, 7]), heltall(2, 5), heltall(2, 4), heltall(1, 6)]
      return tallsvar(`Skriv som én potens av ${g}: (${g}^${m})^${n} / ${g}^${k}. Hva blir eksponenten?`, [m * n - k], undefined, TALL_HINT)
    },
    () => {
      const [g, a, b, c, d] = [velg([2, 3, 5, 7]), heltall(2, 7), heltall(2, 7), heltall(2, 4), heltall(2, 3)]
      return tallsvar(`Skriv som én potens av ${g}: ${g}^${a} · ${g}^${b} / (${g}^${c})^${d}. Hva blir eksponenten?`, [a + b - c * d], undefined, TALL_HINT)
    },
    () => {
      const [s, b] = [velg([2, 3, 5, 6, 7]), heltall(1, 4)]
      const a = b + heltall(1, 4)
      const uten = (k: number) => s * k * k
      const radikal = (k: number) => (k === 1 ? `√${s}` : `√${uten(k)}`)
      if (heltall(0, 1)) {
        return flervalg(`Skriv så enkelt som mulig: ${radikal(a)} − ${radikal(b)}`, rot(a - b, s), [`√${uten(a) - uten(b)}`, rot(a + b, s), rot(a - b, s + 1)])
      }
      return flervalg(`Skriv så enkelt som mulig: ${radikal(a)} + ${radikal(b)}`, rot(a + b, s), [`√${uten(a) + uten(b)}`, rot(a - b, s), rot(a + b, 2 * s)])
    },
    () => {
      const [p, q, a, b] = [heltall(2, 9), heltall(2, 9), uten0(-5, 8), uten0(-5, 8)]
      const produkt = p * q
      const stor = produkt >= 10
      const m = stor ? komma(produkt / 10) : String(produkt)
      const e = a + b + (stor ? 1 : 0)
      return flervalg(`Regn ut og skriv på standardform: (${p} · 10^${tall(a)}) · (${q} · 10^${tall(b)})`, `${m} · 10^${tall(e)}`, [
        `${m} · 10^${tall(e + 1)}`,
        `${m} · 10^${tall(e - 1)}`,
        `${p + q} · 10^${tall(a + b)}`,
      ])
    },
    () => {
      const [b, c] = [heltall(2, 5), heltall(2, 5)]
      const a = b + c + heltall(1, 5)
      return flervalg(`Forenkle: x^${a} / (x^${b} · x^${c})`, xPotens(a - b - c), [xPotens(a - b + c), xPotens(a), xPotens(a + b + c)])
    },
    () => {
      const [p, m, n, k] = [heltall(2, 4), heltall(2, 4), heltall(2, 3), heltall(1, 5)]
      return flervalg(`Forenkle: (${p}${xPotens(m)})^${n} · ${xPotens(k)}`, `${p ** n}${xPotens(m * n + k)}`, [
        `${p * n}${xPotens(m * n + k)}`,
        `${p ** n}${xPotens(m + n + k)}`,
        `${p}${xPotens(m * n + k)}`,
        `${p ** n}${xPotens(m * n + k + 1)}`,
      ])
    },
  ],
]

const LIKNING: Variant[][] = [
  [
    () => {
      const [x, a, b] = [uten0(-9, 9), heltall(2, 9), uten0(-12, 12)]
      return xSvar(`Løs likningen: ${lineaer(a, b)} = ${tall(a * x + b)}`, x)
    },
    () => {
      const [x, a] = [uten0(-12, 12), heltall(2, 12)]
      return xSvar(`Løs likningen: ${a}x = ${tall(a * x)}`, x)
    },
    () => {
      const [x, b] = [uten0(-20, 20), uten0(-20, 20)]
      return xSvar(`Løs likningen: ${lineaer(1, b)} = ${tall(x + b)}`, x)
    },
    () => {
      const [k, a] = [uten0(-9, 9), heltall(2, 9)]
      return xSvar(`Løs likningen: x/${a} = ${tall(k)}`, a * k)
    },
    () => {
      const [x, c] = [uten0(-15, 15), heltall(1, 20)]
      return xSvar(`Løs likningen: ${c} − x = ${tall(c - x)}`, x)
    },
    () => {
      const [x, a, b] = [uten0(-9, 9), heltall(2, 9), heltall(1, 20)]
      return xSvar(`Løs likningen: ${b} + ${a}x = ${tall(b + a * x)}`, x)
    },
  ],
  [
    () => {
      const x = uten0(-9, 9)
      const a = heltall(3, 9)
      const c = heltall(1, a - 1)
      const b = uten0(-12, 12)
      return xSvar(`Løs likningen: ${lineaer(a, b)} = ${lineaer(c, (a - c) * x + b)}`, x)
    },
    () => {
      const [x, a, b] = [uten0(-9, 9), heltall(2, 9), uten0(-9, 9)]
      return xSvar(`Løs likningen: ${a}${parentes(b)} = ${tall(a * (x + b))}`, x)
    },
    () => {
      const [x, k, m] = [uten0(-9, 9), heltall(2, 15), uten0(-9, 9)]
      return xSvar(`Løs likningen: ${k} − ${parentes(-m)} = ${tall(k + m - x)}`, x)
    },
    () => {
      const [x, p, q, r] = [uten0(-9, 9), heltall(4, 9), heltall(1, 3), uten0(-9, 9)]
      return xSvar(`Løs likningen: ${p}x − (${lineaer(q, -r)}) = ${tall((p - q) * x + r)}`, x)
    },
    () => {
      const [a, k, b] = [heltall(2, 6), uten0(-5, 5), uten0(-9, 9)]
      return xSvar(`Løs likningen: x/${a} ${b < 0 ? '−' : '+'} ${Math.abs(b)} = ${tall(k + b)}`, a * k)
    },
    () => {
      const [x, a, b] = [uten0(-20, 20), heltall(2, 9), heltall(1, 30)]
      return tallsvar(`Jeg tenker på et tall. Når jeg ganger det med ${a} og legger til ${b}, får jeg ${tall(a * x + b)}. Hvilket tall tenker jeg på?`, [x], undefined, TALL_HINT)
    },
    () => {
      const [b, p] = [heltall(2, 25), heltall(1, 12)]
      return tallsvar(`Et rektangel er ${p} cm lengre enn det er bredt. Omkretsen er ${2 * (2 * b + p)} cm. Hvor bredt er rektangelet?`, [b], `${b} cm`, ENHET_HINT)
    },
    () => {
      const [b, k] = [heltall(2, 20), heltall(2, 5)]
      return tallsvar(`Et rektangel er ${k} ganger så langt som det er bredt. Omkretsen er ${2 * (k + 1) * b} cm. Hvor bredt er rektangelet?`, [b], `${b} cm`, ENHET_HINT)
    },
    () => {
      const n = heltall(2, 60)
      return tallsvar(`Tre hele tall på rad har summen ${3 * n + 3}. Hva er det minste av tallene?`, [n], undefined, TALL_HINT)
    },
    () => {
      const [fast, pris, antall] = [velg([50, 100, 150, 200, 250, 300]), velg([20, 25, 30, 40, 50, 60, 75]), heltall(2, 25)]
      return tallsvar(`Et treningssenter tar ${fast} kr i startavgift og ${pris} kr per time. Du har betalt ${fast + pris * antall} kr til sammen. Hvor mange timer har du trent?`, [antall], undefined, ENHET_HINT)
    },
  ],
  [
    () => {
      const x = uten0(-9, 9)
      const [a, b, c, d] = [heltall(3, 7), uten0(-5, 5), heltall(1, 2), uten0(-5, 5)]
      const e = a * (x + b) - c * (x + d)
      const rest = e === 0 ? '' : ` ${e < 0 ? '−' : '+'} ${Math.abs(e)}`
      return xSvar(`Løs likningen: ${a}${parentes(b)} = ${c === 1 ? '' : c}${parentes(d)}${rest}`, x)
    },
    () => {
      const q = heltall(2, 7)
      const p = uten0(-15, 15)
      const c = heltall(1, 5)
      const b = uten0(-9, 9)
      const d = b + (p % q === 0 ? p + 1 : p)
      return tallsvar(`Løs likningen: ${lineaer(c + q, b)} = ${lineaer(c, d)}`, [(d - b) / q], `x = ${brokTekst(d - b, q)}`, BROK_HINT)
    },
    () => {
      const [a, b] = toUlike(2, 6)
      const m = uten0(-6, 6)
      const p0 = uten0(-9, 9)
      let [p, q] = [p0, (b - a) * m - p0]
      if (q === 0) [p, q] = [p0 + 1 || 1, (b - a) * m - (p0 + 1 || 1)]
      return xSvar(`Løs likningen: (${lineaer(1, -p)})/${a} = (${lineaer(1, q)})/${b}`, a * m + p)
    },
    () => {
      const [a, b] = velg([[2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [2, 7]])
      const m = uten0(-5, 5)
      return xSvar(`Løs likningen: x/${a} − x/${b} = ${tall(m * (b - a))}`, a * b * m)
    },
    () => {
      const [a, b] = velg([[2, 3], [3, 2], [3, 4], [4, 3], [2, 5], [5, 2], [5, 3]])
      const [m, j] = [uten0(-5, 5), uten0(-5, 5)]
      let p = b * j - a * m
      if (p === 0) p = b
      const k = (a * m + p) / b
      return xSvar(`Løs likningen: x/${a} + (${lineaer(1, p)})/${b} = ${tall(m + k)}`, a * m)
    },
    () => {
      const [x, p, q, s, r] = [uten0(-9, 9), heltall(6, 9), heltall(1, 3), heltall(1, 2), uten0(-9, 9)]
      return xSvar(`Løs likningen: ${p}x − (${lineaer(q, -r)}) = ${lineaer(s, (p - q - s) * x + r)}`, x)
    },
    () => {
      const [g, pa, forskjell] = [heltall(2, 24), velg([50, 100, 150, 200]), velg([10, 20, 25, 30, 50])]
      const fastB = velg([50, 100, 150])
      const fastA = fastB + forskjell * g
      return tallsvar(
        `Abonnement A koster ${fastA} kr i oppstart og ${pa} kr per måned. Abonnement B koster ${fastB} kr i oppstart og ${pa + forskjell} kr per måned. Etter hvor mange måneder har de kostet like mye?`,
        [g],
        undefined,
        ENHET_HINT,
      )
    },
  ],
]

const ANDREGRAD: Variant[][] = [
  [
    () => {
      const k = heltall(2, 15)
      return tallsvar(`Løs likningen: x² = ${k * k}`, [k, -k], losninger(k, -k), TO_HINT)
    },
    () => {
      const a = uten0(-12, 12)
      return tallsvar(`Løs likningen: x${parentes(-a)} = 0`, [0, a], losninger(0, a), TO_HINT)
    },
    () => {
      const [r, s] = toUlike(-9, 9)
      return tallsvar(`Løs likningen: ${parentes(-r)}${parentes(-s)} = 0`, [r, s], losninger(r, s), TO_HINT)
    },
    () => {
      const [a, k] = [heltall(2, 6), heltall(1, 7)]
      return tallsvar(`Løs likningen: ${a}x² = ${a * k * k}`, [k, -k], losninger(k, -k), TO_HINT)
    },
    () => {
      const k = heltall(2, 15)
      return tallsvar(`Løs likningen: x² − ${k * k} = 0`, [k, -k], losninger(k, -k), TO_HINT)
    },
    () => {
      const [k, c] = [heltall(2, 10), heltall(1, 20)]
      return tallsvar(`Løs likningen: x² + ${c} = ${k * k + c}`, [k, -k], losninger(k, -k), TO_HINT)
    },
  ],
  [
    () => {
      const [r, s] = [uten0(-9, 9), uten0(-9, 9)]
      if (r === s) return xSvar(`Løs likningen: ${kvadratisk(1, -2 * r, r * r)} = 0`, r, 'Likningen har én løsning.')
      return tallsvar(`Løs likningen: ${kvadratisk(1, -(r + s), r * s)} = 0`, [r, s], losninger(r, s), TO_HINT)
    },
    () => {
      const [p, k] = [uten0(-9, 9), heltall(1, 9)]
      return tallsvar(`Løs likningen: ${parentes(p)}² = ${k * k}`, [k - p, -k - p], losninger(k - p, -k - p), TO_HINT)
    },
    () => {
      const [a, r] = [heltall(2, 6), uten0(-9, 9)]
      return tallsvar(`Løs likningen: ${kvadratisk(a, -a * r, 0)} = 0`, [0, r], losninger(0, r), TO_HINT)
    },
    () => {
      const [a, k] = [heltall(2, 6), heltall(1, 7)]
      return tallsvar(`Løs likningen: ${kvadratisk(a, 0, -a * k * k)} = 0`, [k, -k], losninger(k, -k), TO_HINT)
    },
    () => {
      const [a, b, c] = [heltall(1, 5), uten0(-9, 9), uten0(-9, 9)]
      return tallsvar(`Regn ut diskriminanten til ${kvadratisk(a, b, c)} = 0.`, [b * b - 4 * a * c], undefined, TALL_HINT)
    },
    () => {
      const [r, s] = toUlikeMedSum(-9, 9)
      return flervalg(`Faktoriser: ${kvadratisk(1, -(r + s), r * s)}`, `${parentes(-r)}${parentes(-s)}`, [
        `${parentes(r)}${parentes(s)}`,
        `${parentes(-r)}${parentes(s)}`,
        `${parentes(r)}${parentes(-s)}`,
      ])
    },
    () => {
      const p = heltall(1, 9)
      const k = p + heltall(1, 12)
      return tallsvar(`Når siden i et kvadrat øker med ${p} cm, blir arealet ${k * k} cm². Hvor lang var siden?`, [k - p], `${k - p} cm`, ENHET_HINT)
    },
    () => {
      const [r, s] = toUlikeMedSum(-9, 9)
      return tallsvar(`Løs likningen: ${kvadratisk(1, -(r + s), 0)} = ${tall(-r * s)}`, [r, s], losninger(r, s), TO_HINT)
    },
  ],
  [
    () => {
      const a = heltall(2, 5)
      const [r, s] = toUlike(-7, 7)
      return tallsvar(`Løs likningen: ${kvadratisk(a, -a * (r + s), a * r * s)} = 0`, [r, s], losninger(r, s), TO_HINT)
    },
    () => {
      const [a, b, c] = [heltall(1, 5), uten0(-9, 9), uten0(-9, 9)]
      const d = b * b - 4 * a * c
      const antall = d > 0 ? 2 : d === 0 ? 1 : 0
      return tallsvar(`Hvor mange løsninger har ${kvadratisk(a, b, c)} = 0?`, [antall], `${antall} (D = ${tall(d)})`, 'Svar 0, 1 eller 2.')
    },
    () => {
      const p = heltall(2, 5)
      const r = uten0(-6, 6)
      let q = uten0(-7, 7)
      while (q % p === 0) q = uten0(-7, 7)
      return tallsvar(`Løs likningen: ${kvadratisk(p, -(p * r + q), q * r)} = 0`, [q / p, r], `x = ${brokTekst(q, p)} og x = ${tall(r)}`, 'Skriv begge løsningene, for eksempel 2 og −3/2.')
    },
    () => {
      const [b, p] = [heltall(2, 20), heltall(1, 12)]
      return tallsvar(`Et rektangel er ${p} cm lengre enn det er bredt, og arealet er ${b * (b + p)} cm². Hvor bredt er rektangelet?`, [b], `${b} cm`, ENHET_HINT)
    },
    () => {
      const r = heltall(2, 8)
      const s = heltall(1, r - 1)
      const hoyde = uttrykk([[-5, 't²'], [5 * (r - s), 't'], [5 * r * s, '']])
      return tallsvar(`En ball har høyden ${hoyde} meter etter t sekunder. Når lander ballen?`, [r], `Etter ${r} sekunder`, ENHET_HINT)
    },
    () => {
      const [a, b, c] = velg([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [20, 21, 29], [7, 24, 25], [12, 16, 20], [15, 20, 25], [10, 24, 26]])
      return tallsvar(`I en rettvinklet trekant er katetene x og ${lineaer(1, b - a)}, og hypotenusen er ${c}. Finn x.`, [a], `x = ${a}`, X_HINT)
    },
    () => {
      const n = heltall(3, 30)
      return tallsvar(`To positive hele tall på rad har produktet ${n * (n + 1)}. Hva er det minste av tallene?`, [n], undefined, TALL_HINT)
    },
    () => {
      const n = heltall(2, 15)
      return tallsvar(`Summen av et tall og kvadratet av tallet er ${n * n + n}. Hvilke to tall kan det være?`, [n, -n - 1], `${n} og ${tall(-n - 1)}`, TO_HINT)
    },
    () => {
      const r = 5 * heltall(1, 6)
      const s = r + 5 * heltall(1, 6)
      return tallsvar(
        `Overskuddet er ${uttrykk([[-1, 'x²'], [r + s, 'x'], [-r * s, '']])} kroner ved x enheter. Ved hvilke to produksjonsmengder er overskuddet null?`,
        [r, s],
        `${r} og ${s} enheter`,
        'Skriv begge tallene, for eksempel 10 og 30.',
      )
    },
    () => {
      const [p, s] = [uten0(-6, 6), velg([2, 3, 5, 6, 7])]
      return flervalg(`Løs likningen: ${kvadratisk(1, -2 * p, p * p - s)} = 0`, `x = ${tall(p)} ± √${s}`, [`x = ${tall(-p)} ± √${s}`, `x = ${tall(p)} ± ${s}`, `x = ${tall(p)} ± √${s + 5}`])
    },
    () => {
      const a = heltall(2, 5)
      const [r, s] = toUlikeMedSum(-7, 7)
      return flervalg(`Faktoriser: ${kvadratisk(a, -a * (r + s), a * r * s)}`, `${a}${parentes(-r)}${parentes(-s)}`, [
        `${parentes(-r)}${parentes(-s)}`,
        `${a}${parentes(r)}${parentes(s)}`,
        `${a}${parentes(-r)}${parentes(s)}`,
      ])
    },
  ],
]

const FUNKSJON: Variant[][] = [
  [
    () => {
      const [a, b, k] = [uten0(-6, 6), uten0(-9, 9), uten0(-6, 6)]
      return tallsvar(`f(x) = ${lineaer(a, b)}. Finn f(${tall(k)}).`, [a * k + b], undefined, TALL_HINT)
    },
    () => {
      const [c, k] = [uten0(-9, 9), uten0(-6, 6)]
      return tallsvar(`f(x) = ${kvadratisk(1, 0, c)}. Finn f(${tall(k)}).`, [k * k + c], undefined, TALL_HINT)
    },
    () => {
      const [a, b] = [uten0(-9, 9), uten0(-9, 9)]
      return tallsvar(`Hva er stigningstallet til f(x) = ${lineaer(a, b)}?`, [a], undefined, TALL_HINT)
    },
    () => {
      const [a, b] = [uten0(-9, 9), uten0(-9, 9)]
      return tallsvar(`Hvor skjærer grafen til f(x) = ${lineaer(a, b)} y-aksen? Svar med y-verdien.`, [b], undefined, TALL_HINT)
    },
    () => {
      const [a, b, c] = [uten0(-6, 6), uten0(-9, 9), uten0(-9, 9)]
      return tallsvar(`Hvor skjærer grafen til f(x) = ${kvadratisk(a, b, c)} y-aksen? Svar med y-verdien.`, [c], undefined, TALL_HINT)
    },
    () => {
      const [a, b, c] = [uten0(-6, 6), uten0(-6, 6), uten0(-9, 9)]
      const [uttrykket, grad] = velg<[string, number]>([
        [uttrykk([[a, 'x³'], [b, 'x'], [c, '']]), 3],
        [uttrykk([[c, ''], [b, 'x'], [a, 'x²']]), 2],
        [uttrykk([[b, 'x²'], [a, 'x⁴'], [c, '']]), 4],
        [uttrykk([[a, 'x'], [c, '']]), 1],
        [uttrykk([[b, 'x²'], [c, 'x'], [a, 'x³']]), 3],
      ])
      return tallsvar(`Hvilken grad har polynomet f(x) = ${uttrykket}?`, [grad], undefined, TALL_HINT)
    },
    () => {
      const [a, b, p] = [uten0(-6, 6), uten0(-9, 9), uten0(-6, 6)]
      const paGrafen = heltall(0, 1) === 1
      const q = a * p + b + (paGrafen ? 0 : uten0(-3, 3))
      return flervalg(`Ligger punktet ${koordinat(p, q)} på grafen til f(x) = ${lineaer(a, b)}?`, paGrafen ? 'Ja' : 'Nei', [paGrafen ? 'Nei' : 'Ja'])
    },
    () => {
      const [a, b, k] = [velg([10, 12, 15, 18, 20, 25]), velg([30, 40, 50, 60, 80]), heltall(2, 30)]
      return tallsvar(`En taxitur på x km koster f(x) = ${lineaer(a, b)} kroner. Hva koster en tur på ${k} km?`, [a * k + b], `${a * k + b} kroner`, ENHET_HINT)
    },
  ],
  [
    () => {
      const [a, b, x1] = [uten0(-5, 5), uten0(-6, 6), heltall(-5, 2)]
      const x2 = x1 + heltall(1, 4)
      return tallsvar(`En rett linje går gjennom ${koordinat(x1, a * x1 + b)} og ${koordinat(x2, a * x2 + b)}. Finn stigningstallet.`, [a], undefined, TALL_HINT)
    },
    () => {
      const [a, x] = [uten0(-6, 6), uten0(-9, 9)]
      return xSvar(`Finn nullpunktet til f(x) = ${lineaer(a, -a * x)}.`, x, 'Svar med x-verdien.')
    },
    () => {
      const [a, b, c, k] = [uten0(-4, 4), uten0(-6, 6), uten0(-9, 9), uten0(-5, 5)]
      return tallsvar(`f(x) = ${kvadratisk(a, b, c)}. Finn f(${tall(k)}).`, [a * k * k + b * k + c], undefined, TALL_HINT)
    },
    () => {
      const [a, b, x] = [uten0(-6, 6), uten0(-9, 9), uten0(-9, 9)]
      return xSvar(`f(x) = ${lineaer(a, b)}. For hvilken x er f(x) = ${tall(a * x + b)}?`, x, 'Svar med x-verdien.')
    },
    () => {
      const [a, p, q] = [uten0(-6, 6), uten0(-6, 6), uten0(-9, 9)]
      return tallsvar(`Linja y = ${lineaer(a, 0)} + b går gjennom ${koordinat(p, q)}. Finn b.`, [q - a * p], `b = ${tall(q - a * p)}`, TALL_HINT)
    },
    () => {
      const [a, b, x1] = [uten0(-5, 5), uten0(-6, 6), heltall(-4, 2)]
      const x2 = x1 + heltall(1, 4)
      return flervalg(`Finn likningen for linja gjennom ${koordinat(x1, a * x1 + b)} og ${koordinat(x2, a * x2 + b)}.`, `y = ${lineaer(a, b)}`, [
        `y = ${lineaer(-a, b)}`,
        `y = ${lineaer(a, -b)}`,
        `y = ${lineaer(b, a)}`,
        `y = ${lineaer(-a, -b)}`,
      ])
    },
    () => {
      const [t, c] = [uten0(-9, 9), uten0(-9, 9)]
      return xSvar(`Finn symmetrilinja til f(x) = ${kvadratisk(1, -2 * t, c)}.`, t, 'Svar med x-verdien.')
    },
    () => {
      const [fast, pris, mnd] = [velg([100, 150, 200, 250, 300]), velg([25, 40, 50, 75, 100]), heltall(2, 24)]
      return tallsvar(`Etter x måneder har et abonnement kostet f(x) = ${lineaer(pris, fast)} kroner. Etter hvor mange måneder har det kostet ${pris * mnd + fast} kroner?`, [mnd], undefined, ENHET_HINT)
    },
  ],
  [
    () => {
      const [a, t, c] = [uten0(-3, 3), uten0(-5, 5), uten0(-9, 9)]
      return xSvar(`Finn x-verdien til toppunktet eller bunnpunktet til f(x) = ${kvadratisk(a, -2 * a * t, c)}.`, t)
    },
    () => {
      const [a, t, c] = [uten0(-3, 3), uten0(-5, 5), uten0(-9, 9)]
      const v = c - a * t * t
      return flervalg(`Finn toppunktet eller bunnpunktet til f(x) = ${kvadratisk(a, -2 * a * t, c)}.`, koordinat(t, v), [koordinat(-t, v), koordinat(t, -v - 1), koordinat(t, c)])
    },
    () => {
      const a = heltall(2, 6)
      const c = a - heltall(1, a - 1)
      const [x, b] = [uten0(-6, 6), uten0(-9, 9)]
      return xSvar(`Grafene til f(x) = ${lineaer(a, b)} og g(x) = ${lineaer(c, (a - c) * x + b)} skjærer hverandre. Finn x-verdien i skjæringspunktet.`, x)
    },
    () => {
      const a = heltall(2, 6)
      const c = a - heltall(1, a - 1)
      const [x, b] = [uten0(-6, 6), uten0(-9, 9)]
      const y = a * x + b
      return flervalg(`Finn skjæringspunktet mellom f(x) = ${lineaer(a, b)} og g(x) = ${lineaer(c, (a - c) * x + b)}.`, koordinat(x, y), [koordinat(y, x), koordinat(-x, y), koordinat(x, -y - 1)])
    },
    () => {
      const [r, s] = toUlike(-6, 6)
      const [m, n] = [uten0(-5, 5), uten0(-9, 9)]
      return tallsvar(
        `Finn x-verdiene der grafene til f(x) = ${kvadratisk(1, m - (r + s), n + r * s)} og g(x) = ${lineaer(m, n)} skjærer hverandre.`,
        [r, s],
        losninger(r, s),
        TO_HINT,
      )
    },
    () => {
      const a = heltall(1, 4) * velg([1, -1])
      const [r, s] = toUlike(-8, 8)
      return tallsvar(`Finn nullpunktene til f(x) = ${kvadratisk(a, -a * (r + s), a * r * s)}.`, [r, s], losninger(r, s), TO_HINT)
    },
    () => {
      const [r, s] = toUlike(-5, 5)
      let t = uten0(-5, 5)
      while (t === r || t === s) t = uten0(-5, 5)
      return tallsvar(`Finn nullpunktene til f(x) = ${parentes(-r)}${parentes(-s)}${parentes(-t)}.`, [r, s, t], `x = ${tall(r)}, x = ${tall(s)} og x = ${tall(t)}`, 'Skriv alle nullpunktene, for eksempel 1, −2 og 3.')
    },
    () => {
      const [r, s] = toUlike(-9, 9)
      return tallsvar(`En parabel har nullpunktene x = ${tall(r)} og x = ${tall(s)}. Finn symmetrilinja.`, [(r + s) / 2], `x = ${brokTekst(r + s, 2)}`, 'Svar med x-verdien. Bruk brøk eller desimaltall om du trenger det.')
    },
    () => {
      const [a, p, c] = [uten0(-5, 5), uten0(-4, 4), uten0(-9, 9)]
      return tallsvar(`Grafen til f(x) = ax² ${c < 0 ? '−' : '+'} ${Math.abs(c)} går gjennom ${koordinat(p, a * p * p + c)}. Finn a.`, [a], `a = ${tall(a)}`, TALL_HINT)
    },
    () => {
      const [k, c] = [heltall(1, 5), velg([1, 2, 5, 10, 15, 20])]
      const hoyde = uttrykk([[-5, 't²'], [10 * k, 't'], [c, '']])
      if (heltall(0, 1)) return tallsvar(`En ball har høyden h(t) = ${hoyde} meter etter t sekunder. Når er ballen høyest?`, [k], `Etter ${k} sekunder`, ENHET_HINT)
      return tallsvar(`En ball har høyden h(t) = ${hoyde} meter etter t sekunder. Hvor høyt kommer ballen?`, [5 * k * k + c], `${5 * k * k + c} meter`, ENHET_HINT)
    },
  ],
]

export const OPPGAVER: Record<Tema, Variant[][]> = {
  brok: BROK,
  algebra: ALGEBRA,
  potens: POTENS,
  likning: LIKNING,
  andregrad: ANDREGRAD,
  funksjon: FUNKSJON,
}

/** Samme oppgavetype med andre tall skal også regnes som lik når vi passer på variasjonen. */
const monster = (sporsmal: string) => sporsmal.replace(/[−+-]?\s*\d+/g, '#')

/**
 * Lager en oppgave spilleren ikke har fått før. `tidligere` er spillerens tidligere spørsmål, med de nyeste først.
 * Oppgavetypene fra de siste spørsmålene unngås også, så de samme formene ikke kommer rett etter hverandre.
 */
export function lagOppgave(tema: Tema, niva: number, tidligere: string[] = []): Oppgave {
  const varianter = OPPGAVER[tema][niva - 1]
  const brukte = new Set(tidligere)
  const nylige = new Set(tidligere.slice(0, 3).map(monster))
  let reserve: Oppgave | undefined
  for (let forsok = 0; forsok < 60; forsok++) {
    const oppgave = velg(varianter)()
    if (brukte.has(oppgave.sporsmal)) continue
    if (!nylige.has(monster(oppgave.sporsmal))) return oppgave
    reserve ??= oppgave
  }
  return reserve ?? velg(varianter)()
}

/** Leser «2 og −3», «x = 2, x = −3», «b = 4», «0,5», «3/4» og lignende. Gir null hvis noe ikke er et tall. */
export function lesTall(svar: string): number[] | null {
  const renset = svar
    .toLowerCase()
    .replaceAll('−', '-')
    .replaceAll('–', '-')
    .replace(/,\s+|,(?=\s*x\s*=)/g, ';')
    .replace(/\bog\b/g, ';')
    .replace(/\b[a-z]\s*\d?\s*=/g, '')
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
