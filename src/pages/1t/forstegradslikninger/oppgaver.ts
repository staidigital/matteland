export type Niva = 'enkel' | 'begge' | 'parentes' | 'brok';

export const NIVAER: [Niva, string][] = [
  ['enkel', 'Ett x-ledd'],
  ['begge', 'x på begge sider'],
  ['parentes', 'Parenteser'],
  ['brok', 'Brøk'],
];

const ri = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/** Et heltall i intervallet som ikke er 0 */
const riUten0 = (lo: number, hi: number) => {
  for (;;) {
    const v = ri(lo, hi);
    if (v !== 0) return v;
  }
};

/** ax + b = c */
export type Enkel = { a: number; b: number; c: number; x: number };
export const lagEnkelLikning = (): Enkel => {
  const x = riUten0(-6, 9);
  const a = ri(2, 9);
  const b = riUten0(-12, 12);
  return { a, b, c: a * x + b, x };
};

/** ax + b = cx + d */
export type Begge = { a: number; b: number; c: number; d: number; x: number };
export const lagBeggeSider = (): Begge => {
  for (;;) {
    const x = riUten0(-6, 9);
    const c = ri(1, 7);
    const a = c + ri(1, 5);
    const b = riUten0(-12, 12);
    const d = (a - c) * x + b;
    if (d !== 0) return { a, b, c, d, x };
  }
};

/** k(x + m) − (x + n) = c */
export type Parentes = { k: number; m: number; n: number; c: number; x: number };
export const lagParentes = (): Parentes => {
  for (;;) {
    const x = riUten0(-6, 9);
    const k = ri(2, 5);
    const m = riUten0(-6, 6);
    const n = riUten0(-6, 6);
    if (k * m === n) continue;
    return { k, m, n, c: (k - 1) * x + k * m - n, x };
  }
};

/** (x + m)/p ± x/q = r, der fn er fellesnevneren, og u = fn/p og v = fn/q */
export type BrokLikning = { p: number; q: number; m: number; pluss: boolean; r: number; fn: number; u: number; v: number; x: number };
export const lagBrokLikning = (): BrokLikning => {
  const [p, q, fn] = pick([[2, 3, 6], [2, 4, 4], [3, 4, 12], [2, 6, 6], [3, 6, 6]]);
  const pluss = Math.random() < 0.5;
  const x = q * riUten0(-3, 5);
  for (;;) {
    const m = riUten0(-9, 9);
    if ((x + m) % p !== 0) continue;
    const r = (x + m) / p + ((pluss ? 1 : -1) * x) / q;
    return { p, q, m, pluss, r, fn, u: fn / p, v: fn / q, x };
  }
};
