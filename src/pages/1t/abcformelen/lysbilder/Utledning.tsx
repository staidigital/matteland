import React from 'react';
import { Frac, Gen, Rot, V, X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;
const C = () => <V c="c" />;
const BA = () => <Frac n={<B />} d={<A />} />;
const CA = () => <Frac n={<C />} d={<A />} />;
const B2A = () => <Frac n={<B />} d={<>2<A /></>} />;
const D = () => <><B /><sup>2</sup> − 4<A /><C /></>;

const TRINN: Trinn[] = [
  { m: <><Xk /> + <BA /> · <X /> = −<CA /></>, t: 'Del på a, og flytt konstantleddet over.' },
  { m: <><Xk /> + <BA /> · <X /> + (<B2A />)<sup>2</sup> = (<B2A />)<sup>2</sup> − <CA /></>, t: 'Halver tallet foran x, kvadrer det, og legg det til på begge sider.' },
  { m: <>(<X /> + <B2A />)<sup>2</sup> = <Frac n={<D />} d={<>4<A /><sup>2</sup></>} /></>, t: 'Venstre side er et fullstendig kvadrat. Sett høyre side på felles brøkstrek.' },
  { m: <><X /> + <B2A /> = ±<Frac n={<Rot><D /></Rot>} d={<>2<A /></>} /></>, t: 'Ta kvadratroten, og husk begge fortegnene.' },
  { m: <span className="pen"><X /> = <Frac n={<>−<B /> ± <Rot><D /></Rot></>} d={<>2<A /></>} /></span>, t: 'Flytt over, og sett på felles brøkstrek. Der er formelen.' },
];

export const UTLEDNING_STEG = TRINN.length;

export const Utledning: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Utledning</div>
    <h2>Fullstendig kvadrat med bokstaver</h2>
    <div className="boxed math"><Gen /> = 0</div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={UTLEDNING_STEG} />
  </div>
);
