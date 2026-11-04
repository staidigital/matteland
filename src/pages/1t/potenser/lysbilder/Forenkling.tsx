import React from 'react';
import { Frac, V, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

const TRINN: Trinn[] = [
  { m: <><X /><sup>3</sup> · <X /><sup>−5</sup> = <X /><sup>3 + (−5)</sup> = <X /><sup>−2</sup> = <span className="pen"><Frac n="1" d={<><X /><sup>2</sup></>} /></span></> },
  { m: <><Frac n={<>(2<A /><sup>2</sup><B />)<sup>3</sup></>} d={<>4<A /><sup>4</sup><B /></>} /> = <Frac n={<>8<A /><sup>6</sup><B /><sup>3</sup></>} d={<>4<A /><sup>4</sup><B /></>} /> = <span className="pen">2<A /><sup>2</sup><B /><sup>2</sup></span></>, t: 'Ta potensen av hver faktor. Del så tallene for seg og hver bokstav for seg.' },
  { m: <>(<A /><sup>−2</sup><B />)<sup>2</sup> · <A /><sup>5</sup> = <A /><sup>−4</sup><B /><sup>2</sup> · <A /><sup>5</sup> = <span className="pen"><A /><B /><sup>2</sup></span></>, t: <><A /><sup>−4 + 5</sup> = <A /><sup>1</sup> = <A />.</> },
  { m: <><Frac n={<>2<sup>5</sup> · 4<sup>2</sup></>} d={<>8<sup>3</sup></>} /> = <Frac n={<>2<sup>5</sup> · 2<sup>4</sup></>} d={<>2<sup>9</sup></>} /> = 2<sup>0</sup> = <span className="pen">1</span></>, t: <>Skriv alt med samme grunntall: 4 = 2<sup>2</sup> og 8 = 2<sup>3</sup>.</> },
];

export const FORENKLING_STEG = TRINN.length;

export const Forenkling: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel</div>
    <h2>Forenkle med potensreglene</h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={FORENKLING_STEG} />
  </div>
);
