import React from 'react';
import { Frac, Rot, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Ras } from '../felles';

const UTTRYKK: [React.ReactNode, string][] = [
  [
    <>
      <Fx /> = <Frac n="2" d={<X />} />
    </>,
    'Ja: 2 og x er begge polynomer',
  ],
  [
    <>
      <Fx f="g" /> = <Ras a={1} b={0} c={1} d={-4} />
    </>,
    'Ja: førstegradspolynom i teller og nevner',
  ],
  [
    <>
      <Fx f="h" /> ={' '}
      <Frac
        n={
          <>
            <X />
            <sup>2</sup> + 1
          </>
        }
        d={
          <>
            <X /> − 2
          </>
        }
      />
    </>,
    'Ja: telleren er et andregradspolynom',
  ],
  [
    <>
      <Fx f="k" /> ={' '}
      <Frac
        n={
          <Rot>
            <X />
          </Rot>
        }
        d={
          <>
            <X /> + 1
          </>
        }
      />
    </>,
    'Nei: √x er ikke et polynom',
  ],
  [
    <>
      <Fx f="m" /> ={' '}
      <Frac
        n={
          <>
            2<sup><i className="v">x</i></sup>
          </>
        }
        d={<X />}
      />
    </>,
    'Nei: 2ˣ er en eksponentialfunksjon',
  ],
  [
    <>
      <Fx f="p" /> = <Ras a={3} b={1} c={0} d={5} />
    </>,
    'Ja, men nevneren er et tall. Dette er bare en lineær funksjon.',
  ],
];

export const DEF_STEG = UTTRYKK.length;

export const Definisjon: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Rasjonale funksjoner</div>
    <h2>Polynom delt på polynom</h2>
    <div className="cols">
      <div className="boxed">
        <span className="label">Rasjonal funksjon</span>
        <p>
          En rasjonal funksjon er en brøkfunksjon med polynomfunksjoner i både teller og nevner. De kalles også{' '}
          <b>brøkfunksjoner</b>.
        </p>
      </div>
      <div className="panel">
        <p className="small muted">Fra boka:</p>
        <span className="math">
          <Fx /> = <Frac n="2" d={<X />} />, &nbsp; <Fx f="g" /> = <Ras a={1} b={0} c={1} d={-4} />, &nbsp;{' '}
          <Fx f="h" /> = <Ras a={2} b={-4} c={-4} d={7} />
        </span>
      </div>
    </div>
    <h3>Rasjonal funksjon eller ikke?</h3>
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
