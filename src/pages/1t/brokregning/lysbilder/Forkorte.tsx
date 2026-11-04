import React from 'react';
import { Frac, V, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><Frac n="18" d="24" /> = <Frac n="18 : 6" d="24 : 6" /> = <span className="pen"><Frac n="3" d="4" /></span></>, t: 'Del teller og nevner med samme tall.' },
  { m: <><Frac n="42" d="70" /> = <Frac n="42 : 14" d="70 : 14" /> = <span className="pen"><Frac n="3" d="5" /></span></>, t: 'Du kan også forkorte i flere omganger: først med 2, så med 7.' },
  { m: <><Frac n={<>6<X /></>} d="9" /> = <Frac n={<>6<X /> : 3</>} d="9 : 3" /> = <span className="pen"><Frac n={<>2<X /></>} d="3" /></span></>, t: 'Samme regel med bokstaver.' },
  { m: <><Frac n="2" d="3" /> = <Frac n="2 · 4" d="3 · 4" /> = <span className="pen"><Frac n="8" d="12" /></span></>, t: 'Utvide: gang teller og nevner med samme tall.' },
];

export const FORKORTE_STEG = TRINN.length;

export const Forkorte: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Forkorte og utvide</div>
    <h2>Verdien er den samme</h2>
    <div className="boxed math">
      <span className="label">Regel</span>
      <Frac n={<><V c="a" /> · <V c="k" /></>} d={<><V c="b" /> · <V c="k" /></>} /> = <Frac n={<V c="a" />} d={<V c="b" />} />
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={FORKORTE_STEG} />
  </div>
);
