// Lager kartet til Math of Clans: områdeformer og naboer (kart.json) og tilsvarende databaserader (spill-kart.sql).
// Kjøres med: node scripts/lag-kart.mjs
// Områdene er Voronoi-celler rundt faste punkter, klippet mot en øy, med ujevne grenser.
import { writeFileSync } from 'node:fs'

const BREDDE = 1000
const HOYDE = 700

const OMRADER = [
  // id, navn, tema, x, y, terrengbonus, nøytrale forsvarere
  ['global-maximum', 'Global Maximum', 'funksjon', 190, 130, 1.5, 40],
  ['mount-vertex', 'Mount Vertex', 'funksjon', 330, 105, 1.5, 28],
  ['slope-pass', 'Slope Pass', 'funksjon', 165, 245, 1.25, 16],
  ['domain-ridge', 'Domain Ridge', 'funksjon', 330, 225, 1.25, 20],
  ['trig-valley', 'Trig Valley', null, 500, 125, 1, 25],
  ['exponent-heights', 'Exponent Heights', 'potens', 670, 105, 1.25, 26],
  ['base-camp', 'Base Camp', 'potens', 805, 130, 1, 12],
  ['square-root-forest', 'Square Root Forest', 'potens', 660, 225, 1.25, 18],
  ['zero-power-point', 'Zero Power Point', 'potens', 825, 245, 1, 14],
  ['discriminant-reef', 'Discriminant Reef', 'andregrad', 750, 345, 1.25, 20],
  ['abc-harbor', 'abc Harbor', 'andregrad', 885, 345, 1, 12],
  ['asymptote-coast', 'Asymptote Coast', 'andregrad', 725, 450, 1.25, 22],
  ['perfect-square-cove', 'Perfect Square Cove', 'andregrad', 860, 455, 1, 14],
  ['dunes-of-x', 'Dunes of X', 'algebra', 700, 575, 1, 12],
  ['like-terms-oasis', 'Like Terms Oasis', 'algebra', 575, 470, 1, 20],
  ['parenthesis-canyon', 'Parenthesis Canyon', 'algebra', 565, 600, 1.25, 18],
  ['factor-sands', 'Factor Sands', 'algebra', 430, 605, 1, 14],
  ['common-denominator-bog', 'Denominator Bog', 'brok', 440, 475, 1.25, 20],
  ['numerator-marsh', 'Numerator Marsh', 'brok', 295, 590, 1, 12],
  ['improper-mire', 'Improper Mire', 'brok', 175, 525, 1.25, 16],
  ['reduction-reeds', 'Reduction Reeds', 'brok', 310, 465, 1, 14],
  ['balance-fields', 'Balance Fields', 'likning', 105, 350, 1, 12],
  ['both-sides-bridge', 'Both-Sides Bridge', 'likning', 245, 350, 1, 14],
  ['isolated-x', 'Isolated X', 'likning', 375, 345, 1, 18],
  ['division-by-zero', 'Division by Zero', null, 510, 345, 1, 0],
]
const STENGT = new Set(['division-by-zero'])

/** Deterministisk «tilfeldig» tall i [-1, 1] ut fra en tekst, så kartet blir likt hver gang. */
function stoy(tekst) {
  let h = 2166136261
  for (const tegn of tekst) h = Math.imul(h ^ tegn.charCodeAt(0), 16777619)
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return (((h ^ (h >>> 16)) >>> 0) / 4294967295) * 2 - 1
}

const rund = (p) => [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10]

function oyOmriss() {
  const punkter = []
  const antall = 72
  for (let i = 0; i < antall; i++) {
    const v = (i / antall) * Math.PI * 2
    const bolge = 1 + 0.055 * Math.sin(v * 3 + 1) + 0.04 * Math.sin(v * 7 + 2) + 0.025 * stoy(`oy${i}`)
    punkter.push([500 + Math.cos(v) * 455 * bolge, 345 + Math.sin(v) * 305 * bolge])
  }
  return punkter
}

/** Klipper et polygon slik at bare punktene nærmest `a` (sammenliknet med `b`) blir igjen. */
function klipp(polygon, a, b) {
  const nx = b[0] - a[0]
  const ny = b[1] - a[1]
  const grense = (nx * (a[0] + b[0])) / 2 + (ny * (a[1] + b[1])) / 2
  const side = (p) => nx * p[0] + ny * p[1] - grense
  const ut = []
  polygon.forEach((p, i) => {
    const q = polygon[(i + 1) % polygon.length]
    const sp = side(p)
    const sq = side(q)
    if (sp <= 0) ut.push(p)
    if (sp < 0 !== sq < 0) {
      const t = sp / (sp - sq)
      ut.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t])
    }
  })
  return ut
}

/** Gjør en rett grense ujevn. Samme grense får samme form fra begge sider. */
function ujevn(a, b, dybde = 3) {
  const lengde = Math.hypot(b[0] - a[0], b[1] - a[1])
  if (dybde === 0 || lengde < 14) return []
  const [p, q] = String(a) < String(b) ? [a, b] : [b, a]
  const utslag = stoy(`${p}|${q}`) * lengde * 0.09
  const m = rund([(p[0] + q[0]) / 2 - ((q[1] - p[1]) / lengde) * utslag, (p[1] + q[1]) / 2 + ((q[0] - p[0]) / lengde) * utslag])
  return [...ujevn(a, m, dybde - 1), m, ...ujevn(m, b, dybde - 1)]
}

const omriss = oyOmriss()
const punkter = OMRADER.map(([, , , x, y]) => [x, y])
const celler = punkter.map((a, i) =>
  punkter.reduce((celle, b, j) => (i === j ? celle : klipp(celle, a, b)), omriss).map(rund),
)

const naboer = OMRADER.map(() => new Set())
const erKystpunkt = (p) => omriss.some((o) => Math.hypot(o[0] - p[0], o[1] - p[1]) < 0.5)

const data = OMRADER.map(([id, navn, tema, , , terreng, forsvarere], i) => {
  const celle = celler[i]
  const omrisset = []
  celle.forEach((p, k) => {
    const q = celle[(k + 1) % celle.length]
    omrisset.push(p)
    // Felles grense: begge endepunkter er like langt fra denne cellens punkt og et annet punkt
    const felles = punkter.findIndex((b, j) => {
      if (j === i) return false
      const avstand = (r, s) => Math.hypot(r[0] - s[0], r[1] - s[1])
      return (
        Math.abs(avstand(p, punkter[i]) - avstand(p, b)) < 0.3 &&
        Math.abs(avstand(q, punkter[i]) - avstand(q, b)) < 0.3
      )
    })
    if (felles >= 0 && Math.hypot(q[0] - p[0], q[1] - p[1]) > 15) {
      if (!STENGT.has(id) && !STENGT.has(OMRADER[felles][0])) naboer[i].add(OMRADER[felles][0])
      omrisset.push(...ujevn(p, q))
    } else if (!erKystpunkt(p) || !erKystpunkt(q)) {
      omrisset.push(...ujevn(p, q))
    }
  })
  const areal = celle.reduce((s, p, k) => s + p[0] * celle[(k + 1) % celle.length][1] - celle[(k + 1) % celle.length][0] * p[1], 0) / 2
  const cx = celle.reduce((s, p, k) => s + (p[0] + celle[(k + 1) % celle.length][0]) * (p[0] * celle[(k + 1) % celle.length][1] - celle[(k + 1) % celle.length][0] * p[1]), 0) / (6 * areal)
  const cy = celle.reduce((s, p, k) => s + (p[1] + celle[(k + 1) % celle.length][1]) * (p[0] * celle[(k + 1) % celle.length][1] - celle[(k + 1) % celle.length][0] * p[1]), 0) / (6 * areal)
  return {
    id,
    navn,
    tema,
    terreng,
    forsvarere,
    stengt: STENGT.has(id),
    x: Math.round(cx),
    y: Math.round(cy),
    sti: `M${omrisset.map((p) => p.join(' ')).join('L')}Z`,
  }
})

data.forEach((o, i) => {
  o.naboer = [...naboer[i]].sort()
})

// Startområder: velger gang på gang det området som er lengst unna de andre startene
const spillbare = data.filter((o) => !o.stengt && o.tema)
const avstandFra = (start) => {
  const avstand = new Map([[start, 0]])
  const ko = [start]
  while (ko.length) {
    const her = ko.shift()
    for (const n of data.find((o) => o.id === her).naboer) {
      if (!avstand.has(n)) {
        avstand.set(n, avstand.get(her) + 1)
        ko.push(n)
      }
    }
  }
  return avstand
}
const starter = ['balance-fields']
while (starter.length < 10) {
  const avstander = starter.map(avstandFra)
  const kandidater = spillbare
    .filter((o) => !starter.includes(o.id) && o.terreng === 1)
    .map((o) => ({ id: o.id, minst: Math.min(...avstander.map((a) => a.get(o.id) ?? 0)) }))
    .sort((a, b) => b.minst - a.minst || a.id.localeCompare(b.id))
  if (!kandidater.length) throw new Error('For få startområder')
  starter.push(kandidater[0].id)
}

// Ingen øy i øya: alle spillbare områder må kunne nås fra hverandre
const nadd = avstandFra('balance-fields')
const utenfor = data.filter((o) => !o.stengt && !nadd.has(o.id))
if (utenfor.length) throw new Error(`Kan ikke nås: ${utenfor.map((o) => o.id)}`)

// Imaginary Island ligger for seg selv ute i havet og kan ikke angripes
const oy = []
for (let i = 0; i < 16; i++) {
  const v = (i / 16) * Math.PI * 2
  const r = 1 + 0.18 * stoy(`imag${i}`)
  oy.push(rund([942 + Math.cos(v) * 44 * r, 632 + Math.sin(v) * 34 * r]))
}
data.push({
  id: 'imaginary-island',
  navn: 'Imaginary Island',
  tema: null,
  terreng: 1,
  forsvarere: 0,
  stengt: true,
  x: 942,
  y: 632,
  sti: `M${oy.map((p) => p.join(' ')).join('L')}Z`,
  naboer: [],
})

writeFileSync(
  new URL('../src/pages/mathofclans/kart.json', import.meta.url),
  JSON.stringify({ bredde: BREDDE, hoyde: HOYDE, kyst: `M${omriss.map((p) => rund(p).join(' ')).join('L')}Z`, omrader: data }) + '\n',
)

const tekst = (s) => (s === null ? 'null' : `'${s.replaceAll("'", "''")}'`)
const rader = data.map((o) => {
  const start = starter.indexOf(o.id)
  const naboliste = o.naboer.length ? `array[${o.naboer.map(tekst).join(', ')}]::text[]` : `'{}'::text[]`
  return `  (${tekst(o.id)}, ${tekst(o.navn)}, ${tekst(o.tema)}, ${o.terreng}, ${o.forsvarere}, ${o.stengt}, ${start >= 0 ? start + 1 : 'null'}, ${naboliste})`
})
writeFileSync(
  new URL('../supabase/spill-kart.sql', import.meta.url),
  `-- Generert av scripts/lag-kart.mjs. Kjøres etter spill.sql.\ndelete from public.regions;\ninsert into public.regions (id, name, topic, defense, start_defenders, locked, start_order, neighbors) values\n${rader.join(',\n')};\n`,
)

console.log('Starter:', starter.join(', '))
console.log(data.map((o) => `${o.id}: ${o.naboer.length}`).join('\n'))
