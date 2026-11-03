export type Niva = 'symmetri' | 'ekstremal' | 'nullpunkt';
/**
 * f(x) = ax² + bx + c med toppunkt/bunnpunkt (p , q).
 * På nivået nullpunkt har funksjonen de heltallige nullpunktene r (minst først).
 */
export type Oppgave = { niva: Niva; a: number; b: number; c: number; p: number; q: number; r: number[] };

export const NIVAER: [Niva, string][] = [
  ['symmetri', 'Symmetrilinja'],
  ['ekstremal', 'Ekstremalpunktet'],
  ['nullpunkt', 'Nullpunktene'],
];

const ri = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const pick = <T>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/** Lager en tilfeldig andregradsfunksjon med heltallige koeffisienter og et ekstremalpunkt som får plass i grafen. */
export function lagOppgave(niva: Niva): Oppgave {
  for (;;) {
    if (niva === 'nullpunkt') {
      const a = pick([1, 1, -1, 2, -2]);
      const r1 = ri(-5, 5);
      const r2 = ri(-5, 5);
      if (r1 === r2) continue;
      const b = -a * (r1 + r2);
      const c = a * r1 * r2;
      const p = (r1 + r2) / 2;
      const q = a * (p - r1) * (p - r2);
      if (Math.abs(q) > 18) continue;
      return { niva, a, b, c, p, q, r: [Math.min(r1, r2), Math.max(r1, r2)] };
    }
    const a = pick([1, 1, -1, 2, -2, 3]);
    const p = ri(-4, 4);
    const q = ri(-6, 6);
    const b = -2 * a * p;
    const c = a * p * p + q;
    if (b === 0 || Math.abs(c) > 20) continue;
    return { niva, a, b, c, p, q, r: [] };
  }
}
