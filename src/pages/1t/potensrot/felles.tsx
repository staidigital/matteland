import React from 'react';
import { Op, V, dec } from '../../../presentasjon/matte';
import { tall } from '../eksponentialfunksjoner/felles';

/** Eksponent: et tall eller en brøk [teller, nevner] */
export type Eksponent = number | [number, number];

export const verdi = (b: Eksponent) => (Array.isArray(b) ? b[0] / b[1] : b);

/** f(x) = a · xᵇ, bare definert for x > 0 */
export const pot = (a: number, b: Eksponent) => (x: number) => (x > 0 ? a * x ** verdi(b) : NaN);

/** n-te rot som også virker for negative tall når n er odde */
export const nrot = (x: number, n: number) =>
  x < 0 ? (n % 2 ? -((-x) ** (1 / n)) : NaN) : x ** (1 / n);

/** Eksponenten skrevet med komma og ekte minustegn, brøk som 1/2 */
export const eksponent = (b: Eksponent) =>
  Array.isArray(b) ? `${b[0] < 0 ? '−' : ''}${Math.abs(b[0])}/${b[1]}` : dec(b, 3);

/** a · xᵇ med tall. a = 1 skrives ikke, a = −1 blir −x. */
export const Pot: React.FC<{ a?: number; b: Eksponent; v?: string }> = ({ a = 1, b, v = 'x' }) => (
  <span className="nw">
    {a === -1 ? '−' : a !== 1 && (
      <>
        {tall(a)}
        <Op>·</Op>
      </>
    )}
    <V c={v} />
    <sup>{eksponent(b)}</sup>
  </span>
);

/** a · xᵇ med bokstaver */
export const PotGen: React.FC<{ farge?: boolean }> = ({ farge }) => (
  <span className="nw">
    <span className={farge ? 'c2' : undefined}>
      <V c="a" />
    </span>
    <Op>·</Op>
    <V c="x" />
    <sup className={farge ? 'c1' : undefined}>
      <V c="b" />
    </sup>
  </span>
);
