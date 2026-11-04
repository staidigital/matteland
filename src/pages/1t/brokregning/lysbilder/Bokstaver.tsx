import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const FaktorPluss = () => <span className="cancel">(<X /> + 2)</span>;

const TRINN: Trinn[] = [
  { m: <><Frac n="2" d={<X />} /> + <Frac n="3" d={<X />} /> = <span className="pen"><Frac n="5" d={<X />} /></span></>, t: 'Samme nevner: bare legg sammen tellerne.' },
  { m: <><Frac n={<X />} d="2" /> + <Frac n={<X />} d="3" /> = <Frac n={<>3<X /></>} d="6" /> + <Frac n={<>2<X /></>} d="6" /> = <span className="pen"><Frac n={<>5<X /></>} d="6" /></span></> },
  { m: <><Frac n="1" d={<X />} /> + <Frac n="1" d="2" /> = <Frac n="2" d={<>2<X /></>} /> + <Frac n={<X />} d={<>2<X /></>} /> = <span className="pen"><Frac n={<>2 + <X /></>} d={<>2<X /></>} /></span></>, t: <>Fellesnevner 2<X />. Her må <X /> ≠ 0, for vi kan ikke dele med 0.</> },
  { m: <><Frac n={<><X /><sup>2</sup> − 4</>} d={<><X /> + 2</>} /> = <Frac n={<><FaktorPluss />(<X /> − 2)</>} d={<FaktorPluss />} /> = <span className="pen"><X /> − 2</span></>, t: <>Faktoriser først, og stryk så like faktorer. Her må <X /> ≠ −2.</> },
];

export const BOKSTAVER_STEG = TRINN.length;

export const Bokstaver: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Brøker med bokstaver</div>
    <h2>Samme regler som for tall</h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={BOKSTAVER_STEG} />
  </div>
);
