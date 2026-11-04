import React from 'react';
import { Frac } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><Frac n="1" d="2" /> + <Frac n="1" d="3" /> · <Frac n="3" d="4" /> = <Frac n="1" d="2" /> + <Frac n="1" d="4" /> = <Frac n="2" d="4" /> + <Frac n="1" d="4" /> = <span className="pen"><Frac n="3" d="4" /></span></>, t: 'Gange før pluss.' },
  { m: <>(<Frac n="1" d="2" /> + <Frac n="1" d="3" />) · <Frac n="3" d="4" /> = <Frac n="5" d="6" /> · <Frac n="3" d="4" /> = <Frac n="15" d="24" /> = <span className="pen"><Frac n="5" d="8" /></span></>, t: 'Parentes først. Samme tall, annet svar.' },
  { m: <>−<Frac n="2" d="3" /> − (−<Frac n="1" d="6" />) = −<Frac n="4" d="6" /> + <Frac n="1" d="6" /> = −<Frac n="3" d="6" /> = <span className="pen">−<Frac n="1" d="2" /></span></>, t: 'Minus minus blir pluss.' },
  { m: <><Frac n="−3" d="−4" /> = <span className="pen"><Frac n="3" d="4" /></span> &nbsp;og&nbsp; <Frac n="−3" d="4" /> = <Frac n="3" d="−4" /> = <span className="pen">−<Frac n="3" d="4" /></span></>, t: 'Fortegnsreglene gjelder også for brøker.' },
];

export const REKKEFOLGE_STEG = TRINN.length;

export const Regnerekkefolge: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Sammensatte uttrykk</div>
    <h2>Regnerekkefølge og fortegn</h2>
    <p className="muted">Parenteser først, så potenser, så gange og dele, og til slutt pluss og minus.</p>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={REKKEFOLGE_STEG} />
  </div>
);
