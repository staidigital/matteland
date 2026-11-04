import React from 'react';
import { Frac, Rot, V, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const M = () => <V c="m" />;
const N = () => <V c="n" />;

const TRINN: Trinn[] = [
  { m: <>9<sup>1/2</sup> = <Rot>9</Rot> = <span className="pen">3</span></>, t: <>Fordi 9<sup>1/2</sup> · 9<sup>1/2</sup> = 9<sup>1</sup> = 9.</> },
  { m: <>27<sup>1/3</sup> = <Rot n="3">27</Rot> = <span className="pen">3</span></>, t: <>Tredjeroten av 27, fordi 3<sup>3</sup> = 27.</> },
  { m: <>8<sup>2/3</sup> = (<Rot n="3">8</Rot>)<sup>2</sup> = 2<sup>2</sup> = <span className="pen">4</span></>, t: 'Ta roten først, så blir tallene små.' },
  { m: <>16<sup>3/4</sup> = (<Rot n="4">16</Rot>)<sup>3</sup> = 2<sup>3</sup> = <span className="pen">8</span></> },
  { m: <>4<sup>−1/2</sup> = <Frac n="1" d={<>4<sup>1/2</sup></>} /> = <span className="pen"><Frac n="1" d="2" /></span></> },
  { m: <><X /> · <Rot><X /></Rot> = <X /><sup>1</sup> · <X /><sup>1/2</sup> = <span className="pen"><X /><sup>3/2</sup></span></>, t: <>Potensreglene gjelder også her. Vi antar at <X /> &gt; 0.</> },
];

export const BROK_STEG = TRINN.length;

export const BrokEksponent: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Potenser og røtter</div>
    <h2>Brøk som eksponent</h2>
    <div className="boxed math">
      <span className="label">Regler</span>
      <A /><sup>1/<N /></sup> = <Rot n={<N />}><A /></Rot> &nbsp;&nbsp;&nbsp; <A /><sup><M />/<N /></sup> = (<Rot n={<N />}><A /></Rot>)<sup><M /></sup>
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={BROK_STEG} />
  </div>
);
