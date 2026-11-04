import React from 'react';
import { Frac, Rot, V, X, Xk } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const EKS: { t: string; start: React.ReactNode; linjer: React.ReactNode[]; merk: string }[] = [
  {
    t: 'Skriv om først',
    start: <><Xk /> + 3 = 4<X /></>,
    linjer: [
      <><Xk /> − 4<X /> + 3 = 0</>,
      <><X /> = <Frac n={<>4 ± <Rot>16 − 12</Rot></>} d="2" /> = <Frac n="4 ± 2" d="2" /></>,
      <span className="pen"><X /> = 3 eller <X /> = 1</span>,
    ],
    merk: 'Standardform: alle ledd på venstre side, og 0 på høyre side.',
  },
  {
    t: 'Negativ a',
    start: <>−<Xk /> + 4<X /> + 5 = 0</>,
    linjer: [
      <><V c="a" /> = −1, <V c="b" /> = 4, <V c="c" /> = 5</>,
      <><X /> = <Frac n={<>−4 ± <Rot>16 + 20</Rot></>} d="−2" /> = <Frac n="−4 ± 6" d="−2" /></>,
      <span className="pen"><X /> = −1 eller <X /> = 5</span>,
    ],
    merk: 'Nevneren blir negativ. Regn nøye med fortegnene.',
  },
  {
    t: 'Roten går ikke opp',
    start: <><Xk /> + 2<X /> − 1 = 0</>,
    linjer: [
      <><X /> = <Frac n={<>−2 ± <Rot>4 + 4</Rot></>} d="2" /> = <Frac n={<>−2 ± <Rot>8</Rot></>} d="2" /></>,
      <>= <Frac n={<>−2 ± 2<Rot>2</Rot></>} d="2" /></>,
      <span className="pen"><X /> = −1 ± <Rot>2</Rot></span>,
    ],
    merk: '√8 = 2√2. Svaret er eksakt. Som desimaltall er det omtrent 0,41 og −2,41.',
  },
];

export const FLERE_STEG = EKS.length;

export const FlereEksempler: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Flere eksempler</div>
    <h2>Tre situasjoner du møter</h2>
    <div className="grid3">
      {EKS.map((e, i) => (
        <div className="panel stack" key={e.t} style={{ gap: 8 }}>
          <h3>{e.t}</h3>
          <p className="math">{e.start}</p>
          {frag > i && (
            <div className="reveal stack" style={{ gap: 6 }}>
              {e.linjer.map((l, j) => (
                <span className="math mline" key={j}>{l}</span>
              ))}
              <p className="small muted">{e.merk}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    <StepButtons frag={frag} setFrag={setFrag} steps={FLERE_STEG} />
  </div>
);
