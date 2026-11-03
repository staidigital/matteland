import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Pol } from '../felles';

const UTTRYKK: [React.ReactNode, React.ReactNode][] = [
  [
    <>
      <Fx /> = <Pol k={[3, 700]} />
    </>,
    'Første grad',
  ],
  [
    <>
      <Fx f="g" /> = <Pol k={[2, -2, 3, 0]} />
    </>,
    'Tredje grad',
  ],
  [
    <>
      <Fx f="h" x={<i className="v">t</i>} /> = <Pol k={[1, 0, 0, -1, 10]} v="t" />
    </>,
    'Fjerde grad',
  ],
  [
    <>
      <Fx f="k" /> = 5 − <X />
      <sup>2</sup>
    </>,
    'Andre grad. Det er høyeste potens som teller, ikke det første leddet.',
  ],
  [
    <>
      <Fx f="p" /> = 2
      <sup>
        <X />
      </sup>
    </>,
    'Ikke et polynom: variabelen står i eksponenten.',
  ],
  [
    <>
      <Fx f="q" /> = <Frac n="3" d={<X />} /> + 1
    </>,
    <>
      Ikke et polynom: <Frac n="3" d={<X />} /> = 3<X />
      <sup>−1</sup>, og −1 er ikke et naturlig tall.
    </>,
  ],
];

export const GRAD_STEG = UTTRYKK.length;

export const Grad: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Flere polynomfunksjoner</div>
    <h2>Hvilken grad har polynomet?</h2>
    <div className="boxed">
      <span className="label">Polynom</span>
      Et polynom er et flerleddet uttrykk der eksponentene er naturlige tall. Den høyeste potensen av variabelen er{' '}
      <b>graden</b> til polynomet. En andregradsfunksjon er altså en polynomfunksjon av andre grad.
    </div>
    <div className="grid3">
      {UTTRYKK.map(([u, svar], i) => (
        <div className="panel stack" key={i} style={{ gap: 8 }}>
          <span className="math">{u}</span>
          {frag > i ? (
            <span className="reveal pen">{svar}</span>
          ) : (
            <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
              Vis svar
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);
