import React from 'react';
import type { Skala } from '../../../presentasjon/FunkGraf';
import { dec } from '../../../presentasjon/matte';

/** Navnet på en kurve, skrevet inne i grafen i samme farge som kurven */
export const KurveNavn: React.FC<{ s: Skala; x: number; y: number; farge: 'c1' | 'c2'; children: React.ReactNode }> = ({
  s,
  x,
  y,
  farge,
  children,
}) => (
  <text className="g-name" x={s.sx(x)} y={s.sy(y)} style={{ fill: farge === 'c1' ? 'var(--r1)' : 'var(--r2)' }}>
    {children}
  </text>
);

/** Punkt med norsk skrivemåte: (−17,8 , 0) */
export const pkt = (x: number, y: number, k = 1) => `(${dec(x, k)} , ${dec(y, k)})`;

/** Tall med mellomrom som tusenskille: 6 798 */
export const tusen = (v: number) => Math.round(v).toLocaleString('nb-NO');

/** x i [a, b] der f(x) = g(x), funnet ved halvering. Forutsetter at f − g skifter fortegn i intervallet. */
export const skjaering = (f: (x: number) => number, g: (x: number) => number, a: number, b: number) => {
  const h = (x: number) => f(x) - g(x);
  for (let i = 0; i < 60; i++) {
    const m = (a + b) / 2;
    if (h(a) * h(m) <= 0) b = m;
    else a = m;
  }
  return (a + b) / 2;
};
