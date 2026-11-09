import React from 'react';
import { Frac, Op, V, dec } from '../../../presentasjon/matte';
import { tusen } from '../skjaeringspunkter/felles';

/** f(x) = a · bˣ */
export const eksp = (a: number, b: number) => (x: number) => a * b ** x;

/** Tall med komma, og mellomrom som tusenskille fra 10 000 */
export const tall = (v: number, k = 3) => (Math.abs(v) >= 10000 ? tusen(v) : dec(v, k));

/** Grunntallet: et tall, eller en brøk i parentes */
const Grunntall: React.FC<{ b: number | [number, number] }> = ({ b }) =>
  Array.isArray(b) ? (
    <>
      (<Frac n={b[0]} d={b[1]} />)
    </>
  ) : (
    <>{tall(b)}</>
  );

/** a · bˣ med tall. a = 1 skrives ikke. En brøk som grunntall gis som [teller, nevner]. */
export const Eksp: React.FC<{ a?: number; b: number | [number, number]; v?: string }> = ({ a = 1, b, v = 'x' }) => (
  <span className="nw">
    {a !== 1 && (
      <>
        {tall(a)}
        <Op>·</Op>
      </>
    )}
    <Grunntall b={b} />
    <sup>
      <V c={v} />
    </sup>
  </span>
);

/** a · bˣ med bokstaver */
export const EkspGen: React.FC<{ farge?: boolean }> = ({ farge }) => (
  <span className="nw">
    <span className={farge ? 'c2' : undefined}>
      <V c="a" />
    </span>
    <Op>·</Op>
    <span className={farge ? 'c1' : undefined}>
      <V c="b" />
    </span>
    <sup>
      <V c="x" />
    </sup>
  </span>
);
