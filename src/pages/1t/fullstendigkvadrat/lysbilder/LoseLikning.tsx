import React from 'react';
import { Rot, X, Xk } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const EKS: { t: string; linjer: React.ReactNode[]; svar: React.ReactNode }[] = [
  {
    t: 'To fine løsninger',
    linjer: [
      <><Xk /> + 6<X /> + 5 = 0</>,
      <>(<X /> + 3)<sup>2</sup> − 4 = 0</>,
      <>(<X /> + 3)<sup>2</sup> = 4</>,
      <><X /> + 3 = ±2</>,
    ],
    svar: <><X /> = −1 eller <X /> = −5</>,
  },
  {
    t: 'To løsninger med rot',
    linjer: [
      <><Xk /> − 4<X /> − 1 = 0</>,
      <>(<X /> − 2)<sup>2</sup> − 5 = 0</>,
      <>(<X /> − 2)<sup>2</sup> = 5</>,
      <><X /> − 2 = ±<Rot>5</Rot></>,
    ],
    svar: <><X /> = 2 ± <Rot>5</Rot></>,
  },
  {
    t: 'Ingen løsning',
    linjer: [
      <><Xk /> + 2<X /> + 5 = 0</>,
      <>(<X /> + 1)<sup>2</sup> + 4 = 0</>,
      <>(<X /> + 1)<sup>2</sup> = −4</>,
    ],
    svar: <>Et kvadrat kan ikke være negativt.</>,
  },
];

export const LOSE_STEG = EKS.length;

export const LoseLikning: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Bruk · Likninger</div>
    <h2>Fullstendig kvadrat løser likningen</h2>
    <div className="grid3">
      {EKS.map((e, i) => (
        <div className="panel stack" key={e.t} style={{ gap: 6 }}>
          <h3>{e.t}</h3>
          {e.linjer.map((l, j) => (
            <span className="mline math" key={j} style={{ display: j === 0 || frag > i ? 'block' : 'none' }}>
              {l}
            </span>
          ))}
          {frag > i && <p className="math pen reveal">{e.svar}</p>}
        </div>
      ))}
    </div>
    <StepButtons frag={frag} setFrag={setFrag} steps={LOSE_STEG} />
  </div>
);
