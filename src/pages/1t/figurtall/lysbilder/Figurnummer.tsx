import React from 'react';
import { Frac, V, Rot } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { F } from '../felles';

const N = () => <V c="n" />;

const LIN: Trinn[] = [
  { m: <>2<N /> + 1 = 101</>, t: <>Hvilken figur i L-mønsteret har 101 prikker?</> },
  { m: <>2<N /> = 100 &nbsp;⇒&nbsp; <span className="pen"><N /> = 50</span></>, t: 'Figur 50.' },
];

const KV: Trinn[] = [
  { m: <><Frac n={<><N />(<N /> + 1)</>} d="2" /> = 55</>, t: 'Hvilket trekanttall er 55?' },
  { m: <><N /><sup>2</sup> + <N /> − 110 = 0</>, t: 'Gang med 2, gang ut og samle alt på én side.' },
  { m: <><N /> = <Frac n={<>−1 ± <Rot>1 + 440</Rot></>} d="2" /> = <Frac n="−1 ± 21" d="2" /></>, t: 'abc-formelen.' },
  { m: <><N /> = 10 &nbsp;eller&nbsp; <N /> = −11</>, t: <>Figurnummeret må være et naturlig tall, så vi forkaster −11.</> },
  { m: <span className="pen"><F n="10" /> = 55</span>, t: 'Kontroll: 10 · 11 / 2 = 55.' },
];

export const NUMMER_STEG = LIN.length + KV.length + 1;

export const Figurnummer: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Bruke formelen baklengs</div>
    <h2>Hvilken figur har så mange prikker?</h2>
    <div className="cols">
      <Utregning trinn={LIN} frag={frag} />
      <Utregning trinn={KV} frag={frag} fra={LIN.length} />
    </div>
    {frag >= NUMMER_STEG && (
      <div className="panel reveal">
        Finnes det et trekanttall som er 50? <span className="math nw"><N /><sup>2</sup> + <N /> − 100 = 0</span> gir{' '}
        <span className="math nw"><Rot>401</Rot></span>, som ikke er et helt tall. Så <b>nei</b>: ingen figur har 50 prikker.
      </div>
    )}
    <StepButtons frag={frag} setFrag={setFrag} steps={NUMMER_STEG} />
  </div>
);
