export type Niva = 'regler' | 'verdi' | 'rot' | 'brok';

export const NIVAER: [Niva, string][] = [
  ['regler', 'Potensregler'],
  ['verdi', 'Regn ut'],
  ['rot', 'Røtter'],
  ['brok', 'Brøkeksponent'],
];

const ri = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/** √n = k√m med det største kvadrattallet k² som går opp i n */
export function forenkleRot(n: number): { k: number; m: number } {
  let k = 1;
  for (let i = 2; i * i <= n; i++) if (n % (i * i) === 0) k = i;
  return { k, m: n / (k * k) };
}

export type Regel = { type: 'gange' | 'dele' | 'potens'; m: number; n: number; svar: number; v: string };
export const lagRegel = (): Regel => {
  const type = pick(['gange', 'dele', 'potens'] as const);
  const v = pick(['a', 'x', 'b']);
  const m = ri(-4, 7);
  const n = type === 'potens' ? ri(2, 4) : ri(1, 6);
  const svar = type === 'gange' ? m + n : type === 'dele' ? m - n : m * n;
  return { type, m, n, svar, v };
};

/** Et tall som skal regnes ut. Svaret er teller/nevner. */
export type Verdi = { type: 'negativ' | 'null' | 'parentes' | 'uten'; a: number; n: number; teller: number; nevner: number };
export const lagVerdi = (): Verdi => {
  const type = pick(['negativ', 'negativ', 'null', 'parentes', 'uten'] as const);
  if (type === 'null') return { type, a: ri(2, 12), n: 0, teller: 1, nevner: 1 };
  if (type === 'negativ') {
    const a = ri(2, 5);
    const n = ri(1, 3);
    return { type, a, n, teller: 1, nevner: a ** n };
  }
  const a = ri(2, 4);
  const n = ri(2, 4);
  const p = a ** n;
  // (−a)ⁿ har fortegn etter partall/oddetall, −aⁿ er alltid negativ
  return { type, a, n, teller: type === 'uten' ? -p : n % 2 === 0 ? p : -p, nevner: 1 };
};

export type Rotoppgave = { n: number; k: number; m: number };
export const lagRot = (): Rotoppgave => {
  const k = ri(2, 7);
  const m = pick([2, 3, 5, 6, 7, 10]);
  return { n: k * k * m, k, m };
};

/** grunntall^(m/n), der grunntallet er r^n */
export type Brokeksponent = { g: number; r: number; m: number; n: number; negativ: boolean; svar: number };
export const lagBrokeksponent = (): Brokeksponent => {
  const n = pick([2, 2, 3, 3, 4]);
  const r = n === 2 ? ri(2, 10) : n === 3 ? ri(2, 5) : ri(2, 3);
  const m = n === 3 ? pick([1, 2]) : pick([1, 3]); // aldri uforkortet eksponent som 2/4
  const negativ = Math.random() < 0.2;
  const v = r ** m;
  return { g: r ** n, r, m, n, negativ, svar: negativ ? 1 / v : v };
};
