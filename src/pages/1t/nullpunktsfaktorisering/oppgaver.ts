import { gcd } from '../../../presentasjon/matte';

export type Niva = 'enkel' | 'a' | 'brok';
export type Oppgave = { a: number; r1: number; r2: number; niva: Niva };

export const NIVAER: [Niva, string][] = [
  ['enkel', 'a = 1'],
  ['a', 'a ≠ 1'],
  ['brok', 'Brøk-nullpunkt'],
];

const ri = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/**
 * Lager en tilfeldig oppgave a(x − r1)(x − r2) med heltallige koeffisienter.
 * - enkel: a = 1, to ulike heltallige nullpunkter
 * - a:     a ≠ 1, to ulike heltallige nullpunkter
 * - brok:  a = 2, 3 eller 4 og ett nullpunkt p/a (gir fortsatt heltallige b og c)
 */
export function lagOppgave(niva: Niva): Oppgave {
  if (niva === 'enkel') {
    const r1 = ri(-6, 6);
    let r2: number;
    do r2 = ri(-6, 6);
    while (r2 === r1);
    return { a: 1, r1, r2, niva };
  }
  if (niva === 'a') {
    const a = pick([2, 3, -1, -2, 4, -3]);
    const r1 = ri(-5, 5);
    let r2: number;
    do r2 = ri(-5, 5);
    while (r2 === r1);
    return { a, r1, r2, niva };
  }
  const a = pick([2, 3, 4]);
  const r1 = ri(-4, 4);
  let p: number;
  do p = ri(-7, 7);
  while (p === 0 || gcd(p, a) !== 1);
  return { a, r1, r2: p / a, niva };
}

/** Leser 3, −2, 1,5 og 3/2. Gir NaN for tomt eller ugyldig. */
export function lesTall(s: string): number {
  s = s.replace(/\s/g, '').replace(/−/g, '-').replace(',', '.');
  if (!s) return NaN;
  if (s.includes('/')) {
    const [p, q] = s.split('/');
    const n = Number(p);
    const d = Number(q);
    return d && isFinite(n) ? n / d : NaN;
  }
  return Number(s);
}
