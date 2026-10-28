export type Niva = 'yakse' | 'nullpunkt' | 'linjer';
/** y = a·x + b */
export type Linje = { a: number; b: number };
/** f (og g for 'linjer') med svaret (x , y) */
export type Oppgave = { niva: Niva; f: Linje; g: Linje; x: number; y: number };

export const NIVAER: [Niva, string][] = [
  ['yakse', 'Med y-aksen'],
  ['nullpunkt', 'Nullpunkt'],
  ['linjer', 'To linjer'],
];

const ri = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const ikkeNull = (lo: number, hi: number) => {
  let n: number;
  do n = ri(lo, hi);
  while (n === 0);
  return n;
};

export const verdi = (l: Linje, x: number) => l.a * x + l.b;

/**
 * Lager en tilfeldig oppgave der svaret har heltallskoordinater.
 * - yakse:     finn skjæringspunktet til f med y-aksen
 * - nullpunkt: finn skjæringspunktet til f med x-aksen
 * - linjer:    finn skjæringspunktet mellom f og g
 */
export function lagOppgave(niva: Niva): Oppgave {
  if (niva === 'yakse') {
    const f = { a: ikkeNull(-5, 5), b: ikkeNull(-9, 9) };
    return { niva, f, g: f, x: 0, y: f.b };
  }
  if (niva === 'nullpunkt') {
    const a = ikkeNull(-4, 4);
    const x = ikkeNull(-5, 5);
    const f = { a, b: -a * x };
    return { niva, f, g: f, x, y: 0 };
  }
  const x = ri(-4, 4);
  const y = ri(-5, 5);
  const a1 = ikkeNull(-3, 3);
  let a2: number;
  do a2 = ikkeNull(-3, 3);
  while (a2 === a1);
  return { niva, f: { a: a1, b: y - a1 * x }, g: { a: a2, b: y - a2 * x }, x, y };
}
