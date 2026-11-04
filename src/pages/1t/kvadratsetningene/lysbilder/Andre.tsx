import React from 'react';
import { V, X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

const TRINN: Trinn[] = [
  { m: <>(<A /> − <B />)<sup>2</sup> = (<A /> − <B />)(<A /> − <B />) = <A /><sup>2</sup> − <A /><B /> − <A /><B /> + <B /><sup>2</sup> = <span className="pen"><A /><sup>2</sup> − 2<A /><B /> + <B /><sup>2</sup></span></>, t: 'Minus ganger minus blir pluss, så siste ledd er positivt.' },
  { m: <>(<X /> − 4)<sup>2</sup> = <Xk /> − 2 · <X /> · 4 + 4<sup>2</sup> = <span className="pen"><Xk /> − 8<X /> + 16</span></> },
  { m: <>(3<X /> − 2)<sup>2</sup> = (3<X />)<sup>2</sup> − 2 · 3<X /> · 2 + 2<sup>2</sup> = <span className="pen">9<Xk /> − 12<X /> + 4</span></> },
  { m: <>(5 − 2<X />)<sup>2</sup> = 5<sup>2</sup> − 2 · 5 · 2<X /> + (2<X />)<sup>2</sup> = <span className="pen">25 − 20<X /> + 4<Xk /></span></>, t: 'Rekkefølgen spiller ingen rolle for hvilken setning vi bruker.' },
];

export const ANDRE_STEG = TRINN.length;

export const Andre: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">2. kvadratsetning</div>
    <h2>Kvadratet av en differanse</h2>
    <div className="boxed math big">
      (<A /> − <B />)<sup>2</sup> = <A /><sup>2</sup> − 2<A /><B /> + <B /><sup>2</sup>
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={ANDRE_STEG} />
  </div>
);
