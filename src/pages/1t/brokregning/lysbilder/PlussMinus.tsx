import React from 'react';
import { Frac } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><Frac n="2" d="3" /> + <Frac n="1" d="4" /> = <Frac n="8" d="12" /> + <Frac n="3" d="12" /> = <span className="pen"><Frac n="11" d="12" /></span></>, t: 'Fellesnevner 12, fordi både 3 og 4 går opp i 12.' },
  { m: <><Frac n="5" d="6" /> − <Frac n="3" d="4" /> = <Frac n="10" d="12" /> − <Frac n="9" d="12" /> = <span className="pen"><Frac n="1" d="12" /></span></>, t: '6 · 4 = 24 er også en fellesnevner, men 12 er den minste og gir enklere tall.' },
  { m: <>2 − <Frac n="3" d="5" /> = <Frac n="10" d="5" /> − <Frac n="3" d="5" /> = <span className="pen"><Frac n="7" d="5" /></span></>, t: 'Hele tall kan skrives med hvilken nevner vi vil.' },
];

export const PLUSS_STEG = TRINN.length;

export const PlussMinus: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Addisjon og subtraksjon</div>
    <h2>Først samme nevner</h2>
    <div className="boxed">
      <span className="label">Regel</span>
      Utvid brøkene så de får samme nevner, en <b>fellesnevner</b>. Legg så sammen eller trekk fra <b>tellerne</b>. Nevneren beholdes.
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={PLUSS_STEG} />
  </div>
);
