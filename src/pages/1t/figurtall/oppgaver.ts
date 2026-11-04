export type Punkt = { x: number; y: number; farge?: string };

export type Monster = 'l' | 'ramme' | 'kvadrat' | 'rektangel' | 'trekant';

export const MONSTER: { id: Monster; navn: string; formel: string; f: (n: number) => number }[] = [
  { id: 'l', navn: 'L-figur', formel: '2n + 1', f: (n) => 2 * n + 1 },
  { id: 'ramme', navn: 'Ramme', formel: '4n', f: (n) => 4 * n },
  { id: 'kvadrat', navn: 'Kvadrattall', formel: 'n²', f: (n) => n * n },
  { id: 'rektangel', navn: 'Rektangeltall', formel: 'n(n + 1)', f: (n) => n * (n + 1) },
  { id: 'trekant', navn: 'Trekanttall', formel: 'n(n + 1)/2', f: (n) => (n * (n + 1)) / 2 },
];

/** Prikkene i figur n av et mønster. Antallet er alltid lik formelen i MONSTER. */
export function prikker(m: Monster, n: number): Punkt[] {
  const p: Punkt[] = [];
  if (m === 'l') {
    p.push({ x: 0, y: 0, farge: 'var(--pen)' });
    for (let i = 1; i <= n; i++) {
      p.push({ x: i, y: 0, farge: 'var(--r1)' });
      p.push({ x: 0, y: i, farge: 'var(--r2)' });
    }
  } else if (m === 'ramme') {
    for (let x = 0; x <= n; x++)
      for (let y = 0; y <= n; y++) if (x === 0 || y === 0 || x === n || y === n) p.push({ x, y, farge: 'var(--r1)' });
  } else if (m === 'kvadrat') {
    for (let x = 0; x < n; x++) for (let y = 0; y < n; y++) p.push({ x, y, farge: x === n - 1 || y === n - 1 ? 'var(--pen)' : 'var(--r1)' });
  } else if (m === 'rektangel') {
    for (let x = 0; x <= n; x++) for (let y = 0; y < n; y++) p.push({ x, y, farge: 'var(--r2)' });
  } else {
    for (let x = 0; x < n; x++) for (let y = 0; y <= x; y++) p.push({ x, y, farge: x === n - 1 ? 'var(--pen)' : 'var(--r1)' });
  }
  return p;
}

/** Differansene mellom naboverdier */
export const diff = (v: number[]) => v.slice(1).map((t, i) => t - v[i]);

export type Niva = 'formel' | 'regnut' | 'nummer' | 'andregrad';

export const NIVAER: [Niva, string][] = [
  ['formel', 'Finn formelen'],
  ['regnut', 'Bruk formelen'],
  ['nummer', 'Figurnummer'],
  ['andregrad', 'Andregrad'],
];

const ri = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/** Fₙ = an + b, med positive verdier */
export type Lineart = { a: number; b: number; verdier: number[] };
export const lagLineart = (): Lineart => {
  for (;;) {
    const a = ri(2, 7);
    const b = ri(-3, 6);
    if (a + b < 1) continue;
    return { a, b, verdier: [1, 2, 3, 4, 5].map((n) => a * n + b) };
  }
};

/** Formelen som tekst og verdien for figur k */
export type RegnUt = { type: 'lin' | 'kv' | 'rekt' | 'trek'; a: number; b: number; k: number; svar: number };
export const lagRegnUt = (): RegnUt => {
  const type = pick(['lin', 'kv', 'rekt', 'trek'] as const);
  const k = ri(5, 30);
  if (type === 'lin') {
    const { a, b } = lagLineart();
    return { type, a, b, k, svar: a * k + b };
  }
  if (type === 'kv') {
    const b = ri(-4, 9);
    return { type, a: 1, b, k, svar: k * k + b };
  }
  return { type, a: 1, b: 0, k, svar: type === 'rekt' ? k * (k + 1) : (k * (k + 1)) / 2 };
};

/** Finn n slik at Fₙ = verdi */
export type Nummer = { type: 'lin' | 'rekt' | 'trek'; a: number; b: number; n: number; verdi: number };
export const lagNummer = (): Nummer => {
  const type = pick(['lin', 'lin', 'rekt', 'trek'] as const);
  if (type === 'lin') {
    const { a, b } = lagLineart();
    const n = ri(8, 60);
    return { type, a, b, n, verdi: a * n + b };
  }
  const n = ri(4, 20);
  return { type, a: 1, b: 0, n, verdi: type === 'rekt' ? n * (n + 1) : (n * (n + 1)) / 2 };
};

/** Fₙ = n² + pn + q */
export type Andregrad = { p: number; q: number; verdier: number[] };
export const lagAndregrad = (): Andregrad => {
  for (;;) {
    const p = ri(-1, 5);
    const q = ri(-3, 6);
    const verdier = [1, 2, 3, 4, 5].map((n) => n * n + p * n + q);
    if (verdier[0] < 1 || p === 0) continue;
    return { p, q, verdier };
  }
};
