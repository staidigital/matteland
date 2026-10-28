export type Niva = 'les' | 'topunkt' | 'ettpunkt';
/** Linja y = ax + b, med punktene P og Q som oppgaven bruker */
export type Oppgave = { niva: Niva; a: number; b: number; p: [number, number]; q: [number, number] };

export const NIVAER: [Niva, string][] = [
  ['les', 'Les av grafen'],
  ['topunkt', 'To punkter'],
  ['ettpunkt', 'Ettpunktsformelen'],
];

const ri = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const ikkeNull = (lo: number, hi: number) => {
  let n: number;
  do n = ri(lo, hi);
  while (n === 0);
  return n;
};

/** Lager en tilfeldig linje med heltallig stigningstall og konstantledd. Punktene får plass i grafen. */
export function lagOppgave(niva: Niva): Oppgave {
  for (;;) {
    const a = ikkeNull(-3, 3);
    const b = niva === 'les' ? ri(-4, 4) : ri(-6, 6);
    const x1 = ri(-4, 2);
    const x2 = x1 + ri(1, 4);
    const y1 = a * x1 + b;
    const y2 = a * x2 + b;
    if (Math.abs(y1) <= 8 && Math.abs(y2) <= 8) return { niva, a, b, p: [x1, y1], q: [x2, y2] };
  }
}
