import React from 'react';
import { Frac, V } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>2 : <Frac n="1" d="4" /> = 2 · 4 = <span className="pen">8</span></>, t: 'Det går åtte fjerdedeler på 2. Å dele med en fjerdedel er det samme som å gange med 4.' },
  { m: <><Frac n="3" d="4" /> : <Frac n="2" d="5" /> = <Frac n="3" d="4" /> · <Frac n="5" d="2" /> = <span className="pen"><Frac n="15" d="8" /></span></> },
  { m: <><Frac n="5" d="6" /> : 5 = <Frac n="5" d="6" /> · <Frac n="1" d="5" /> = <span className="pen"><Frac n="1" d="6" /></span></>, t: 'Det omvendte av 5 er 1/5.' },
  { m: <><Frac n={<Frac n="2" d="3" />} d={<Frac n="4" d="5" />} /> = <Frac n="2" d="3" /> · <Frac n="5" d="4" /> = <Frac n="10" d="12" /> = <span className="pen"><Frac n="5" d="6" /></span></>, t: 'Brøkstreken betyr deling, så vi kan skrive om brudne brøker på samme måte.' },
];

export const DELE_STEG = TRINN.length;

export const Dele: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Divisjon</div>
    <h2>Gang med den omvendte brøken</h2>
    <div className="boxed math">
      <span className="label">Regel</span>
      <Frac n={<V c="a" />} d={<V c="b" />} /> : <Frac n={<V c="c" />} d={<V c="d" />} /> = <Frac n={<V c="a" />} d={<V c="b" />} /> ·{' '}
      <Frac n={<V c="d" />} d={<V c="c" />} />
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={DELE_STEG} />
  </div>
);
