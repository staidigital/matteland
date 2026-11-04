import React from 'react';
import { V, X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

const TRINN: Trinn[] = [
  { m: <>(<A /> + <B />)(<A /> − <B />) = <A /><sup>2</sup> <span className="cancel">− <A /><B /> + <A /><B /></span> − <B /><sup>2</sup> = <span className="pen"><A /><sup>2</sup> − <B /><sup>2</sup></span></>, t: 'De to midtleddene er motsatte tall, så de forsvinner.' },
  { m: <>(<X /> + 6)(<X /> − 6) = <span className="pen"><Xk /> − 36</span></> },
  { m: <>(3<X /> + 2)(3<X /> − 2) = (3<X />)<sup>2</sup> − 2<sup>2</sup> = <span className="pen">9<Xk /> − 4</span></> },
  { m: <>21 · 19 = (20 + 1)(20 − 1) = 20<sup>2</sup> − 1<sup>2</sup> = <span className="pen">399</span></>, t: 'Setningen gjelder for alle tall, og kan brukes til hoderegning.' },
];

export const KONJUGAT_STEG = TRINN.length;

export const Konjugat: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Konjugatsetningen</div>
    <h2>Sum ganger differanse</h2>
    <div className="boxed math big">
      (<A /> + <B />)(<A /> − <B />) = <A /><sup>2</sup> − <B /><sup>2</sup>
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={KONJUGAT_STEG} />
  </div>
);
