import React from 'react';
import { Op, X, dec } from '../../../presentasjon/matte';

/** poly4 brukes bare for å vise en modell som treffer alle punktene */
export type Modell = 'lin' | 'eksp' | 'poly2' | 'poly3' | 'poly4' | 'pot';

export const MODELLER: [Modell, string][] = [
  ['lin', 'Lineær'],
  ['eksp', 'Eksponentiell'],
  ['poly2', 'Andregrad'],
  ['poly3', 'Tredjegrad'],
  ['pot', 'Potens'],
];

export type Tilpasning = {
  modell: Modell;
  /** Lineær: [a, b]. Eksp og potens: [a, b]. Polynom: høyeste grad først. */
  k: number[];
  f: (x: number) => number;
};

/** Løser A·c = v med Gauss-eliminasjon (små systemer) */
function los(A: number[][], v: number[]): number[] {
  const n = v.length;
  const M = A.map((r, i) => [...r, v[i]]);
  for (let i = 0; i < n; i++) {
    let p = i;
    for (let r = i + 1; r < n; r++) if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r;
    [M[i], M[p]] = [M[p], M[i]];
    for (let r = 0; r < n; r++) {
      if (r === i || M[i][i] === 0) continue;
      const q = M[r][i] / M[i][i];
      for (let c = i; c <= n; c++) M[r][c] -= q * M[i][c];
    }
  }
  return M.map((r, i) => r[n] / r[i]);
}

/** Minste kvadraters polynom av grad g. Koeffisientene kommer med høyeste grad først. */
function poly(xs: number[], ys: number[], g: number): number[] {
  const m = g + 1;
  const A = Array.from({ length: m }, (_, i) =>
    Array.from({ length: m }, (_, j) => xs.reduce((s, x) => s + x ** (i + j), 0)),
  );
  const v = Array.from({ length: m }, (_, i) => xs.reduce((s, x, k) => s + ys[k] * x ** i, 0));
  return los(A, v).reverse();
}

const evalPoly = (k: number[]) => (x: number) => k.reduce((s, c) => s * x + c, 0);

/** Samme metoder som GeoGebra: minste kvadrater, og logaritmer for eksponentiell og potens. */
export function tilpass(modell: Modell, xs: number[], ys: number[]): Tilpasning | null {
  if (modell === 'lin' || modell === 'poly2' || modell === 'poly3' || modell === 'poly4') {
    const g = modell === 'lin' ? 1 : modell === 'poly2' ? 2 : modell === 'poly3' ? 3 : 4;
    if (xs.length < g + 1) return null;
    const k = poly(xs, ys, g);
    if (k.some((c) => !isFinite(c))) return null;
    return { modell, k, f: evalPoly(k) };
  }
  if (modell === 'eksp') {
    if (xs.length < 2 || ys.some((y) => y <= 0)) return null;
    const [a1, b1] = poly(xs, ys.map(Math.log), 1);
    const a = Math.exp(b1);
    const b = Math.exp(a1);
    return { modell, k: [a, b], f: (x) => a * b ** x };
  }
  if (xs.length < 2 || ys.some((y) => y <= 0) || xs.some((x) => x <= 0)) return null;
  const [p, q] = poly(xs.map(Math.log), ys.map(Math.log), 1);
  const a = Math.exp(q);
  return { modell, k: [a, p], f: (x) => (x >= 0 ? a * x ** p : NaN) };
}

/** Summen av kvadrerte avvik mellom punktene og modellen */
export const avvik = (f: (x: number) => number, xs: number[], ys: number[]) =>
  xs.reduce((s, x, i) => s + (ys[i] - f(x)) ** 2, 0);

/** Ett ledd i et polynom med fortegn: «− 5,24x» */
const Ledd: React.FC<{ c: number; p: number; forst: boolean; d: number }> = ({ c, p, forst, d }) => {
  const abs = Math.abs(c);
  return (
    <>
      {forst ? c < 0 && '−' : <Op>{c < 0 ? '−' : '+'}</Op>}
      {(p === 0 || dec(abs, d) !== '1') && dec(abs, d)}
      {p > 0 && <X />}
      {p > 1 && <sup>{p}</sup>}
    </>
  );
};

/** Funksjonsuttrykket til en tilpasning, med d desimaler */
export const Uttrykk: React.FC<{ t: Tilpasning; d?: number }> = ({ t, d = 2 }) => {
  const { modell, k } = t;
  if (modell === 'eksp')
    return (
      <span className="nw">
        {dec(k[0], d)}
        <Op>·</Op>
        {dec(k[1], d + 1)}
        <sup>
          <i className="v">x</i>
        </sup>
      </span>
    );
  if (modell === 'pot')
    return (
      <span className="nw">
        {dec(k[0], d + 1)}
        <Op>·</Op>
        <X />
        <sup>{dec(k[1], d)}</sup>
      </span>
    );
  const g = k.length - 1;
  const ledd = k.map((c, i) => ({ c, p: g - i })).filter((l) => Math.abs(l.c) >= 0.5 * 10 ** -d);
  return (
    <span className="nw">
      {ledd.map((l, i) => (
        <Ledd key={l.p} c={l.c} p={l.p} forst={i === 0} d={d} />
      ))}
    </span>
  );
};

/** Liten tabell med to rader (x og y) som kan ha mange kolonner */
export const Datatabell: React.FC<{ x: React.ReactNode; y: React.ReactNode; xs: React.ReactNode[]; ys: React.ReactNode[] }> = ({
  x,
  y,
  xs,
  ys,
}) => (
  <div className="tablewrap">
    <table className="vt">
      <tbody>
        <tr>
          <th>{x}</th>
          {xs.map((v, i) => (
            <td key={i}>{v}</td>
          ))}
        </tr>
        <tr>
          <th>{y}</th>
          {ys.map((v, i) => (
            <td key={i}>{v}</td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>
);

/* ---------- data fra boka ---------- */

/** Seertid for TV, år etter 2015 */
export const TV_X = [0, 1, 2, 3, 4, 6, 8, 9];
export const TV_Y = [107, 112, 104, 98, 78, 57, 74, 71];

/** Nye solcelleinstallasjoner i GW, år etter 2020 */
export const SOL_X = [0, 1, 2, 3, 4];
export const SOL_Y = [127, 133, 191.5, 346, 452];

/** Vannstrålen fra Utforsk, lest av bildet i boka */
export const VANN_X = [0, 0.45, 0.95, 1.45, 1.85, 2.2, 2.65, 3.1, 3.8, 4.45, 4.9, 5.35, 5.75, 6.05, 6.35];
export const VANN_Y = [0, 1.1, 2.3, 3.6, 4.7, 5.6, 6.25, 7, 7.4, 7, 6.2, 4.75, 3.6, 2.3, 1.1];
