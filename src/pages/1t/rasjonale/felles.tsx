import React from 'react';
import { type Kurve, type Skala, Hjelpelinje } from '../../../presentasjon/FunkGraf';
import { Frac, Poly } from '../../../presentasjon/matte';

/** f(x) = (ax + b) / (cx + d), ikke definert der nevneren er null */
export const ras = (a: number, b: number, c: number, d: number) => (x: number) => {
  const n = c * x + d;
  return Math.abs(n) < 1e-12 ? NaN : (a * x + b) / n;
};

/**
 * Grafen til (ax + b) / (cx + d) som to kurver, én på hver side av den vertikale asymptoten.
 * Ellers trekker FunkGraf en loddrett strek der grafen hopper fra +∞ til −∞.
 */
export const hyperbel = (a: number, b: number, c: number, d: number, farge?: string, fra?: number, til?: number): Kurve[] => {
  const f = ras(a, b, c, d);
  if (c === 0) return [{ f, farge, fra, til }];
  const s = -d / c;
  const eps = 1e-4;
  return [
    { f, farge, fra, til: Math.min(s - eps, til ?? Infinity) },
    { f, farge, fra: Math.max(s + eps, fra ?? -Infinity), til },
  ];
};

/** Stiplede asymptoter: y = r (vannrett) og x = s (loddrett) */
export const Asymptoter: React.FC<{ s: Skala; r?: number; x?: number; farge?: string }> = ({ s, r, x, farge = 'c2' }) => (
  <>
    {r !== undefined && <Hjelpelinje s={s} x1={-1e4} y1={r} x2={1e4} y2={r} farge={farge} />}
    {x !== undefined && <Hjelpelinje s={s} x1={x} y1={-1e4} x2={x} y2={1e4} farge={farge} />}
  </>
);

/** (ax + b) / (cx + d) som stablet brøk */
export const Ras: React.FC<{ a: number; b: number; c: number; d: number }> = ({ a, b, c, d }) => (
  <Frac n={<Poly a={0} b={a} c={b} />} d={<Poly a={0} b={c} c={d} />} />
);
