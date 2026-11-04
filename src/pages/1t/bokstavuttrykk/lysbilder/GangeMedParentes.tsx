import React from 'react';
import { V, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;
const C = () => <V c="c" />;

const TRINN: Trinn[] = [
  { m: <>3(<X /> + 2) = 3 · <X /> + 3 · 2 = <span className="pen">3<X /> + 6</span></>, t: 'Tallet utenfor ganges med hvert ledd inni parentesen.' },
  { m: <>2<X />(<X /> − 4) = 2<X /> · <X /> − 2<X /> · 4 = <span className="pen">2<X /><sup>2</sup> − 8<X /></span></> },
  { m: <>−2(<X /> − 3) = −2 · <X /> + (−2) · (−3) = <span className="pen">−2<X /> + 6</span></>, t: 'Minus ganger minus blir pluss.' },
  { m: <>5 − 2(<X /> − 1) = 5 − 2<X /> + 2 = <span className="pen">7 − 2<X /></span></>, t: 'Gange før minus. Ikke regn 5 − 2 først.' },
  { m: <>4(<X /> + 1) − 3(<X /> − 2) = 4<X /> + 4 − 3<X /> + 6 = <span className="pen"><X /> + 10</span></>, t: 'Gang ut hver parentes, og trekk så sammen like ledd.' },
];

export const GANGE_INN_STEG = TRINN.length;

export const GangeMedParentes: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Multiplisere med parentes</div>
    <h2>Gang med hvert ledd i parentesen</h2>
    <div className="boxed math">
      <span className="label">Regel</span>
      <A />(<B /> + <C />) = <A /><B /> + <A /><C />
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={GANGE_INN_STEG} />
  </div>
);
