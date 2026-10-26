export type Niva = 'lineaer' | 'andregrad' | 'finnx';
/** f(x) = ax² + bx + c. For 'finnx' er v funksjonsverdien og k svaret. */
export type Oppgave = { a: number; b: number; c: number; k: number; niva: Niva };

export const NIVAER: [Niva, string][] = [
  ['lineaer', 'f(k), lineær'],
  ['andregrad', 'f(k), andregrad'],
  ['finnx', 'Finn x'],
];

const ri = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const ikkeNull = (lo: number, hi: number) => {
  let n: number;
  do n = ri(lo, hi);
  while (n === 0);
  return n;
};

/**
 * Lager en tilfeldig oppgave med heltall.
 * - lineaer:   f(x) = bx + c, finn f(k)
 * - andregrad: f(x) = ax² + bx + c, finn f(k)
 * - finnx:     f(x) = bx + c, finn x slik at f(x) = f(k)
 */
export function lagOppgave(niva: Niva): Oppgave {
  if (niva === 'andregrad') return { a: ikkeNull(-2, 2), b: ri(-4, 4), c: ri(-6, 6), k: ri(-3, 3), niva };
  return { a: 0, b: ikkeNull(-5, 5), c: ri(-10, 10), k: ri(-6, 6), niva };
}

export const verdi = (t: Oppgave, x: number) => t.a * x * x + t.b * x + t.c;
