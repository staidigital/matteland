import React from 'react';
import { Frac, X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const H = () => <Frac n="3" d="2" />;

const TRINN: Trinn[] = [
  { m: <><Xk /> + 6<X /> + 5 = <Xk /> + 6<X /> <span className="pen">+ 9 − 9</span> + 5 = (<X /> + 3)<sup>2</sup> − 9 + 5 = <span className="pen">(<X /> + 3)<sup>2</sup> − 4</span></>, t: 'Halvparten av 6 er 3, og 3² = 9. Konstantleddet 5 regnes med til slutt.' },
  { m: <><Xk /> − 8<X /> + 10 = <Xk /> − 8<X /> <span className="pen">+ 16 − 16</span> + 10 = (<X /> − 4)<sup>2</sup> − 16 + 10 = <span className="pen">(<X /> − 4)<sup>2</sup> − 6</span></>, t: 'Halvparten av −8 er −4, og (−4)² = 16. Minus i uttrykket gir minus i parentesen.' },
  { m: <><Xk /> + 3<X /> + 1 = (<X /> + <H />)<sup>2</sup> − <Frac n="9" d="4" /> + 1 = <span className="pen">(<X /> + <H />)<sup>2</sup> − <Frac n="5" d="4" /></span></>, t: 'Oddetall foran x gir brøk. Metoden er den samme.' },
  { m: <>Kontroll: (<X /> + 3)<sup>2</sup> − 4 = <Xk /> + 6<X /> + 9 − 4 = <Xk /> + 6<X /> + 5 <span className="right">✓</span></>, t: 'Gang ut for å se at du får uttrykket du startet med.' },
];

export const EKSEMPEL_STEG = TRINN.length;

export const Eksempler: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempler</div>
    <h2>Fra uttrykk til fullstendig kvadrat</h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={EKSEMPEL_STEG} />
  </div>
);
