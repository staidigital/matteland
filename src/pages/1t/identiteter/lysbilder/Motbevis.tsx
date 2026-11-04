import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>Påstand: (<X /> + 1)<sup>2</sup> = <Xk /> + 1</>, t: 'Er dette en identitet?' },
  { m: <><X /> = 0 gir 1 = 1</>, t: 'Stemmer, men ett eksempel som stemmer beviser ingenting.' },
  { m: <><X /> = 1 gir 4 og 2, og <span className="wrong">4 ≠ 2</span></>, t: 'Ett eksempel som ikke stemmer er nok. Det kalles et moteksempel. Påstanden er ikke en identitet.' },
  { m: <>Påstand: <Xk /> − <X /> = <X />(<X /> − 1)</>, t: 'Prøver vi noen tall, stemmer det hver gang. Men det er ikke et bevis.' },
  { m: <><X />(<X /> − 1) = <Xk /> − <X /> <span className="right">✓</span></>, t: 'Regningen med x gjelder for alle tall. Det er et bevis.' },
];

export const MOTBEVIS_STEG = TRINN.length;

export const Motbevis: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Bevis og motbevis</div>
    <h2>Ett eksempel kan motbevise, men ikke bevise</h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={MOTBEVIS_STEG} />
  </div>
);
