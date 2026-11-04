import React from 'react';
import { V, X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

const TRINN: Trinn[] = [
  { m: <>(<A /> + <B />)<sup>2</sup> = (<A /> + <B />)(<A /> + <B />) = <A /><sup>2</sup> + <A /><B /> + <A /><B /> + <B /><sup>2</sup> = <span className="pen"><A /><sup>2</sup> + 2<A /><B /> + <B /><sup>2</sup></span></>, t: 'Hvorfor setningen stemmer: å kvadrere er å gange med seg selv.' },
  { m: <>(<X /> + 5)<sup>2</sup> = <Xk /> + 2 · <X /> · 5 + 5<sup>2</sup> = <span className="pen"><Xk /> + 10<X /> + 25</span></>, t: 'Her er a = x og b = 5.' },
  { m: <>(2<X /> + 3)<sup>2</sup> = (2<X />)<sup>2</sup> + 2 · 2<X /> · 3 + 3<sup>2</sup> = <span className="pen">4<Xk /> + 12<X /> + 9</span></>, t: 'Hele 2x skal kvadreres, ikke bare x.' },
  { m: <>(3<A /> + 2<B />)<sup>2</sup> = 9<A /><sup>2</sup> + 12<A /><B /> + 4<B /><sup>2</sup></>, t: 'Setningen virker også med to bokstaver.' },
];

export const FORSTE_STEG = TRINN.length;

export const Forste: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">1. kvadratsetning</div>
    <h2>Kvadratet av en sum</h2>
    <div className="boxed math big">
      (<A /> + <B />)<sup>2</sup> = <A /><sup>2</sup> + 2<A /><B /> + <B /><sup>2</sup>
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={FORSTE_STEG} />
  </div>
);
