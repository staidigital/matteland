import React from 'react';
import { EPS, Op, V, dec } from '../../../presentasjon/matte';

/** Funksjonen til polynomet med koeffisientene k, fra høyeste grad: [1, −1, −2] gir x² − x − 2. */
export const polynom = (k: number[]) => (x: number) => k.reduce((s, c) => s * x + c, 0);

/** Polynomet med koeffisientene k, fra høyeste grad. Desimaltall med komma, uten 1-ere og uten nulledd. */
export const Pol: React.FC<{ k: number[]; v?: string }> = ({ k, v = 'x' }) => {
  const n = k.length - 1;
  const ledd = k.map((c, i) => [c, n - i] as const).filter(([c]) => Math.abs(c) > EPS);
  if (!ledd.length) return <span>0</span>;
  return (
    <span className="nw">
      {ledd.map(([c, p], i) => {
        const abs = Math.abs(c);
        const sign = i === 0 ? (c < 0 ? '−' : null) : <Op>{c < 0 ? '−' : '+'}</Op>;
        return (
          <React.Fragment key={p}>
            {sign}
            {abs === 1 && p > 0 ? null : dec(abs, 3)}
            {p > 0 && <V c={v} />}
            {p > 1 && <sup>{p}</sup>}
          </React.Fragment>
        );
      })}
    </span>
  );
};

export type Ekstremalpunkt = { x: number; y: number; topp: boolean };

const rutenett = (a: number, b: number, n: number) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n);

/** Topp- og bunnpunkter i ⟨a , b⟩: der grafen snur på et fint rutenett, finjustert med tredeling. */
export function ekstremalpunkter(f: (x: number) => number, a: number, b: number, n = 2000): Ekstremalpunkt[] {
  const xs = rutenett(a, b, n);
  const ys = xs.map(f);
  const res: Ekstremalpunkt[] = [];
  for (let i = 1; i < n; i++) {
    const inn = ys[i] - ys[i - 1];
    const ut = ys[i + 1] - ys[i];
    if (!(inn * ut < 0)) continue;
    const topp = inn > 0;
    let lo = xs[i - 1];
    let hi = xs[i + 1];
    for (let k = 0; k < 80; k++) {
      const m1 = lo + (hi - lo) / 3;
      const m2 = hi - (hi - lo) / 3;
      if (topp ? f(m1) < f(m2) : f(m1) > f(m2)) lo = m1;
      else hi = m2;
    }
    const x = (lo + hi) / 2;
    if (!res.some((p) => Math.abs(p.x - x) < 1e-4)) res.push({ x, y: f(x), topp });
  }
  return res;
}

/** Nullpunkter i [a , b]: fortegnsskifte (halvering) og punkter der grafen så vidt berører x-aksen. */
export function nullpunkter(f: (x: number) => number, a: number, b: number, n = 2000): number[] {
  const xs = rutenett(a, b, n);
  const ys = xs.map(f);
  const res: number[] = [];
  const legg = (x: number) => {
    if (!res.some((r) => Math.abs(r - x) < 1e-4)) res.push(x);
  };
  for (let i = 0; i <= n; i++) {
    if (Math.abs(ys[i]) < 1e-12) legg(xs[i]);
    else if (i < n && ys[i] * ys[i + 1] < 0) {
      let lo = xs[i];
      let hi = xs[i + 1];
      for (let k = 0; k < 60; k++) {
        const m = (lo + hi) / 2;
        if (f(lo) * f(m) <= 0) hi = m;
        else lo = m;
      }
      legg((lo + hi) / 2);
    }
  }
  for (const p of ekstremalpunkter(f, a, b, n)) if (Math.abs(p.y) < 1e-6) legg(p.x);
  return res.sort((p, q) => p - q);
}

/** Loddrett stiplet symmetrilinje x = p, over hele grafen */
export const Symmetrilinje: React.FC<{ sx: (x: number) => number; H: number; p: number }> = ({ sx, H, p }) => (
  <line className="g-guide" x1={sx(p)} y1={0} x2={sx(p)} y2={H} style={{ stroke: 'var(--pen)' }} />
);
