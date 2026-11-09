import React from 'react';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { tusen } from '../../skjaeringspunkter/felles';
import { Eksp } from '../felles';

const KORT: [React.ReactNode, React.ReactNode][] = [
  [
    <>
      Hvor skjærer grafen til{' '}
      <span className="math nw">
        <Fx /> = <Eksp b={0.5} />
      </span>{' '}
      y-aksen?
    </>,
    <>
      I (0 , 1). Det står ingen konstant foran, så <i className="v">a</i> = 1. Og 0,5<sup>0</sup> = 1.
    </>,
  ],
  [
    <>
      Hvor mange prosent øker{' '}
      <span className="math nw">
        <Fx /> = <Eksp b={2} />
      </span>{' '}
      når <i className="v">x</i> øker med 1?
    </>,
    <>Med 100 %. Vekstfaktoren 2 = 200 % = 100 % + 100 %. Verdien dobles.</>,
  ],
  [
    <>
      Innbyggertallet i en by følger modellen{' '}
      <span className="math nw">
        <Fx /> = <Eksp a={34200} b={0.98} />
      </span>
      . Hva kan <span className="math nw"><Fx x="−3" /></span> bety?
    </>,
    <>
      Hvis <i className="v">x</i> = 0 er i dag, er <Fx x="−3" /> innbyggertallet for tre år siden:{' '}
      <span className="nw">34 200 · 0,98<sup>−3</sup> ≈ {tusen(34200 * 0.98 ** -3)}</span>.
    </>,
  ],
];

export const REFLEKTER_STEG = KORT.length;

export const Reflekter: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Reflekter og diskuter</div>
    <h2>Hva forteller a og b?</h2>
    <div className="grid3">
      {KORT.map(([s, svar], i) => (
        <div className="panel stack" key={i} style={{ gap: 10 }}>
          <p>
            <b className="pen">{i + 1}</b> &nbsp;{s}
          </p>
          {frag > i ? (
            <p className="reveal pen">{svar}</p>
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
