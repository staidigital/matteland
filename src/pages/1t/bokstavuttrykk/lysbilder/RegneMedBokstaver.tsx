import React from 'react';
import { V, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

const TRINN: Trinn[] = [
  { m: <>3<X /> + 5 − <X /> + 2 = <span className="pen">2<X /> + 7</span></>, t: <>3<X /> og −<X /> er like ledd. Det er 5 og 2 også.</> },
  { m: <>2<A /> + 3<B /> − <A /> + <B /> = <span className="pen"><A /> + 4<B /></span></>, t: 'Ledd med ulike bokstaver kan ikke slås sammen.' },
  { m: <><X /><sup>2</sup> + 2<X /> + 3<X /><sup>2</sup> − <X /> = <span className="pen">4<X /><sup>2</sup> + <X /></span></>, t: <><X /><sup>2</sup> og <X /> er ikke like ledd.</> },
  { m: <>3 · 2<X /> = <span className="pen">6<X /></span> &nbsp;og&nbsp; <A /> · <B /> = <span className="pen"><A /><B /></span></>, t: 'Når vi ganger, ganger vi tallene for seg. Gangetegnet foran en bokstav skrives vanligvis ikke.' },
  { m: <><X /> · <X /> = <span className="pen"><X /><sup>2</sup></span> &nbsp;og&nbsp; 2<X /> · 3<X /> = 6 · <X /> · <X /> = <span className="pen">6<X /><sup>2</sup></span></>, t: 'Når vi ganger, trenger ikke leddene å være like.' },
];

export const REGNE_STEG = TRINN.length;

export const RegneMedBokstaver: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Regne med bokstaver</div>
    <h2>Pluss og minus krever like ledd</h2>
    <div className="boxed">
      <span className="label">Like ledd</span>
      Ledd med nøyaktig samme bokstaver og eksponenter kan legges sammen, som «3 epler + 2 epler».
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={REGNE_STEG} />
  </div>
);
