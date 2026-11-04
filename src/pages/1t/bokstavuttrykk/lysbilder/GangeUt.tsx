import React from 'react';
import { V, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;
const C = () => <V c="c" />;
const D = () => <V c="d" />;

const TRINN: Trinn[] = [
  { m: <>(<X /> + 3)(<X /> + 5) = <X /><sup>2</sup> + 5<X /> + 3<X /> + 15 = <span className="pen"><X /><sup>2</sup> + 8<X /> + 15</span></>, t: 'Fire produkter, og to av dem er like ledd.' },
  { m: <>(<X /> + 3)(<X /> − 2) = <X /><sup>2</sup> − 2<X /> + 3<X /> − 6 = <span className="pen"><X /><sup>2</sup> + <X /> − 6</span></>, t: 'Pluss ganger minus blir minus.' },
  { m: <>(2<X /> + 1)(<X /> − 3) = 2<X /><sup>2</sup> − 6<X /> + <X /> − 3 = <span className="pen">2<X /><sup>2</sup> − 5<X /> − 3</span></> },
  { m: <>(<A /> + 2)(<B /> + 3) = <span className="pen"><A /><B /> + 3<A /> + 2<B /> + 6</span></>, t: 'Ingen like ledd her, så uttrykket kan ikke trekkes mer sammen.' },
];

export const GANGE_STEG = TRINN.length;

export const GangeUt: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · To parenteser</div>
    <h2>Hvert ledd ganges med hvert ledd</h2>
    <div className="boxed math">
      <span className="label">Regel</span>
      (<A /> + <B />)(<C /> + <D />) = <A /><C /> + <A /><D /> + <B /><C /> + <B /><D />
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={GANGE_STEG} />
  </div>
);
