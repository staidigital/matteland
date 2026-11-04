import React from 'react';
import { Frac, Rot, V } from '../../../../presentasjon/matte';

const A = () => <V c="a" />;
const B = () => <V c="b" />;
const M = () => <V c="m" />;
const N = () => <V c="n" />;

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="grid3">
      <div className="boxed math">
        <span className="label">Regne med potenser</span>
        <span className="mline"><A /><sup><M /></sup> · <A /><sup><N /></sup> = <A /><sup><M /> + <N /></sup></span>
        <span className="mline"><Frac n={<><A /><sup><M /></sup></>} d={<><A /><sup><N /></sup></>} /> = <A /><sup><M /> − <N /></sup></span>
        <span className="mline">(<A /><sup><M /></sup>)<sup><N /></sup> = <A /><sup><M /> · <N /></sup></span>
      </div>
      <div className="boxed math">
        <span className="label">Produkt og brøk</span>
        <span className="mline">(<A /><B />)<sup><N /></sup> = <A /><sup><N /></sup><B /><sup><N /></sup></span>
        <span className="mline">(<Frac n={<A />} d={<B />} />)<sup><N /></sup> = <Frac n={<><A /><sup><N /></sup></>} d={<><B /><sup><N /></sup></>} /></span>
      </div>
      <div className="boxed math">
        <span className="label">0, negativ og brøk</span>
        <span className="mline"><A /><sup>0</sup> = 1</span>
        <span className="mline"><A /><sup>−<N /></sup> = <Frac n="1" d={<><A /><sup><N /></sup></>} /></span>
        <span className="mline"><A /><sup>1/<N /></sup> = <Rot n={<N />}><A /></Rot></span>
      </div>
    </div>
    <div className="boxed math">
      <span className="label">Røtter</span>
      <Rot><A /><B /></Rot> = <Rot><A /></Rot> · <Rot><B /></Rot> &nbsp;&nbsp; for eksempel <Rot>12</Rot> = 2<Rot>3</Rot>
    </div>
    <p className="muted">Eksponenten gjelder det som står rett foran: (−2)<sup>4</sup> = 16, men −2<sup>4</sup> = −16. Regelen for røtter gjelder ikke for summer.</p>
  </div>
);
