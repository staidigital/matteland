import { gcd } from '../../../presentasjon/matte';

export type Niva = 'forkort' | 'plussminus' | 'gangedele' | 'bokstav';

export const NIVAER: [Niva, string][] = [
  ['forkort', 'Forkorte'],
  ['plussminus', 'Pluss og minus'],
  ['gangedele', 'Gange og dele'],
  ['bokstav', 'Bokstaver'],
];

export type Brok = { n: number; d: number };

/** Minste felles multiplum */
export const mfm = (a: number, b: number) => (a * b) / gcd(a, b);

/** Forkorter så langt som mulig, med eventuelt minus i telleren */
export const forkort = ({ n, d }: Brok): Brok => {
  const g = gcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
};

/** Leser «3/4», «−3/4» eller «2». Desimaltall og annet gir null. */
export function lesBrok(s: string): Brok | null {
  const m = s.replace(/\s/g, '').replace(/−/g, '-').match(/^(-?\d+)(?:\/(-?\d+))?$/);
  if (!m) return null;
  const d = m[2] === undefined ? 1 : Number(m[2]);
  return d === 0 ? null : { n: Number(m[1]), d };
}

/** Returnerer null hvis svaret er lik fasit og fullt forkortet, ellers et hint. */
export function vurderBrok(tekst: string, fasit: Brok, feil: string): string | null {
  const b = lesBrok(tekst);
  if (!b) return 'Skriv svaret som en brøk, for eksempel 3/4.';
  const f = forkort(fasit);
  if (b.n * f.d !== f.n * b.d) return feil;
  const r = forkort(b);
  if (Math.abs(b.n) !== Math.abs(r.n) || Math.abs(b.d) !== Math.abs(r.d)) return 'Riktig verdi, men brøken kan forkortes mer.';
  return null;
}

const ri = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/** Et fullt forkortet (d ≥ 2) brøk der 0 < n */
const lagEnkel = (dmax: number): Brok => {
  for (;;) {
    const d = ri(2, dmax);
    const n = ri(1, dmax);
    if (gcd(n, d) === 1) return { n, d };
  }
};

export type Forkorte = { b: Brok; k: number; svar: Brok };
export const lagForkorte = (): Forkorte => {
  const svar = lagEnkel(9);
  const k = ri(2, 9);
  return { b: { n: svar.n * k, d: svar.d * k }, k, svar };
};

export type PlussMinus = { a: Brok; c: Brok; pluss: boolean; fn: number; svar: Brok };
export const lagPlussMinus = (): PlussMinus => {
  for (;;) {
    const a = lagEnkel(8);
    const c = lagEnkel(8);
    if (a.d === c.d) continue;
    const fn = mfm(a.d, c.d);
    if (fn > 40) continue;
    const pluss = Math.random() < 0.5;
    const t = (a.n * fn) / a.d + ((pluss ? 1 : -1) * (c.n * fn)) / c.d;
    if (t === 0) continue;
    return { a, c, pluss, fn, svar: forkort({ n: t, d: fn }) };
  }
};

export type GangeDele = { a: Brok; c: Brok; gange: boolean; svar: Brok };
export const lagGangeDele = (): GangeDele => {
  const a = lagEnkel(9);
  const c = lagEnkel(9);
  const gange = Math.random() < 0.5;
  const svar = gange ? forkort({ n: a.n * c.n, d: a.d * c.d }) : forkort({ n: a.n * c.d, d: a.d * c.n });
  return { a, c, gange, svar };
};

export type Bokstav =
  | { type: 'sum'; a: number; b: number; svar: Brok }
  | { type: 'konjugat'; a: number }
  | { type: 'kvadrat'; a: number }
  | { type: 'felles'; k: number; m: number };

export const lagBokstav = (): Bokstav => {
  const type = pick(['sum', 'sum', 'konjugat', 'kvadrat', 'felles'] as const);
  if (type === 'sum') {
    for (;;) {
      const a = ri(2, 6);
      const b = ri(2, 8);
      if (a === b) continue;
      return { type, a, b, svar: forkort({ n: a + b, d: a * b }) };
    }
  }
  if (type === 'felles') return { type, k: ri(2, 7), m: ri(1, 8) };
  return { type, a: ri(1, 9) };
};
