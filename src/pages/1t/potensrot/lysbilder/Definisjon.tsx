import React from 'react';
import { V } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Eksp, EkspGen } from '../../eksponentialfunksjoner/felles';
import { Pot, PotGen } from '../felles';

const UTTRYKK: [React.ReactNode, string][] = [
  [
    <>
      <Fx /> = <Pot b={4} />
    </>,
    'Potensfunksjon (og polynom av fjerde grad)',
  ],
  [
    <>
      <Fx f="g" x={<i className="v">t</i>} /> = <Pot a={23} b={1.7} v="t" />
    </>,
    'Potensfunksjon: variabelen er grunntallet',
  ],
  [
    <>
      <Fx f="h" /> = <Eksp b={1.7} />
    </>,
    'Eksponentialfunksjon: variabelen er eksponenten',
  ],
  [
    <>
      <Fx f="i" x={<i className="v">s</i>} /> = <Eksp a={1200} b={0.7} v="s" />
    </>,
    'Eksponentialfunksjon med vekstfaktor 0,7',
  ],
  [
    <>
      <Fx f="k" /> = <Pot a={3} b={2} />
    </>,
    'Potensfunksjon og andregradsfunksjon',
  ],
  [
    <>
      <Fx f="m" /> = <Pot a={10} b={[-1, 3]} />
    </>,
    'Potensfunksjon med negativ eksponent',
  ],
];

export const DEF_STEG = UTTRYKK.length;

export const Definisjon: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Potensfunksjoner</div>
    <h2>Variabelen står i grunntallet</h2>
    <div className="cols">
      <div className="boxed">
        <span className="label">Potensfunksjon</span>
        <span className="math">
          <Fx /> = <PotGen farge />, &nbsp;der <V c="x" /> &gt; 0
        </span>
        <p className="small" style={{ marginTop: 6 }}>
          Er <V c="b" /> et positivt heltall, er funksjonen også en polynomfunksjon.
        </p>
      </div>
      <div className="panel math">
        <span className="mline">
          Eksponentialfunksjon: <Fx /> = <EkspGen />
        </span>
        <span className="mline">
          Potensfunksjon: <Fx /> = <PotGen />
        </span>
      </div>
    </div>
    <h3>Potensfunksjon eller eksponentialfunksjon?</h3>
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
