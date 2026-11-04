import { gcd } from '../../../presentasjon/matte';

export type Niva = 'forenkle' | 'parentes' | 'gangin' | 'toparenteser' | 'tall' | 'felles';

export const NIVAER: [Niva, string][] = [
  ['forenkle', 'Like ledd'],
  ['parentes', 'Løse opp parenteser'],
  ['gangin', 'Gange med parentes'],
  ['toparenteser', 'To parenteser'],
  ['tall', 'Faktorisere tall'],
  ['felles', 'Trekke ut felles'],
];

export const ri = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
/** Heltall i [lo, hi] som ikke er 0 */
export const riUtenNull = (lo: number, hi: number) => {
  for (;;) {
    const n = ri(lo, hi);
    if (n !== 0) return n;
  }
};
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/** Primtallsfaktorene til n, minst først */
export function primfaktorer(n: number): number[] {
  const f: number[] = [];
  for (let p = 2; p * p <= n; p++)
    while (n % p === 0) {
      f.push(p);
      n /= p;
    }
  if (n > 1) f.push(n);
  return f;
}

export const erPrimtall = (n: number) => Number.isInteger(n) && n >= 2 && primfaktorer(n).length === 1;

/** ax + b + cx + d = Ax + B */
export type Forenkle = { a: number; b: number; c: number; d: number; A: number; B: number };
export const lagForenkle = (): Forenkle => {
  for (;;) {
    const a = ri(2, 9);
    const b = riUtenNull(-9, 9);
    const c = riUtenNull(-9, 9);
    const d = riUtenNull(-9, 9);
    if (a + c === 0) continue;
    return { a, b, c, d, A: a + c, B: b + d };
  }
};

/** ax + b ± (cx + d) = Ax + B */
export type Parentes = { a: number; b: number; c: number; d: number; pluss: boolean; A: number; B: number };
export const lagParentes = (): Parentes => {
  for (;;) {
    const a = ri(2, 9);
    const b = riUtenNull(-9, 9);
    const c = ri(1, 7);
    const d = riUtenNull(-9, 9);
    const pluss = Math.random() < 0.35;
    const s = pluss ? 1 : -1;
    if (a + s * c === 0) continue;
    return { a, b, c, d, pluss, A: a + s * c, B: b + s * d };
  }
};

/** k(ux + m) = Ax + B, eller kx(x + m) = Ax² + Bx */
export type GangInn = { medX: boolean; k: number; u: number; m: number; A: number; B: number };
export const lagGangInn = (): GangInn => {
  const medX = Math.random() < 0.35;
  const k = medX ? ri(1, 6) : pick([2, 3, 4, 5, 6, -2, -3, -4]);
  const u = medX ? 1 : ri(1, 4);
  const m = riUtenNull(-8, 8);
  return { medX, k, u, m, A: k * u, B: k * m };
};

/** (ux + p)(x + q) = Ax² + Bx + C. Unngår kvadrater og konjugater, som kommer i et eget kapittel. */
export type ToParenteser = { u: number; p: number; q: number; A: number; B: number; C: number };
export const lagToParenteser = (): ToParenteser => {
  for (;;) {
    const u = pick([1, 1, 1, 2, 3]);
    const p = riUtenNull(-7, 7);
    const q = riUtenNull(-7, 7);
    const B = u * q + p;
    if (B === 0 || (u === 1 && p === q)) continue;
    return { u, p, q, A: u, B, C: p * q };
  }
};

/** Tallet n, som skal skrives som et produkt av primtallene i `faktorer` */
export type Tall = { n: number; faktorer: number[] };
export const lagTall = (): Tall => {
  for (;;) {
    const antall = ri(2, 4);
    const f = Array.from({ length: antall }, () => pick([2, 2, 2, 3, 3, 5, 7]));
    const n = f.reduce((s, t) => s * t, 1);
    if (n < 10 || n > 300) continue;
    return { n, faktorer: f.sort((x, y) => x - y) };
  }
};

/** kx² + mx eller kx + m, skrevet som g·x(ux + v) eller g(ux + v) */
export type Felles = { medX: boolean; k: number; m: number; g: number; u: number; v: number };
export const lagFelles = (): Felles => {
  for (;;) {
    const g = ri(2, 6);
    const u = ri(1, 5);
    const v = riUtenNull(-7, 7);
    if (gcd(u, v) !== 1) continue;
    return { medX: Math.random() < 0.6, k: g * u, m: g * v, g, u, v };
  }
};
