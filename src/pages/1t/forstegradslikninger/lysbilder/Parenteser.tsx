import React from 'react';
import { X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>3(<X /> − 2) − (<X /> − 4) = 8</>, t: 'Løs opp parentesene først.' },
  { m: <>3<X /> − 6 − <X /> + 4 = 8</>, t: 'Minus foran en parentes skifter fortegn på alle leddene inni.' },
  { m: <>2<X /> − 2 = 8</>, t: 'Trekk sammen på venstre side.' },
  { m: <>2<X /> = 10</>, t: 'Flytt over tallet og skift fortegn.' },
  { m: <span className="pen"><X /> = 5</span>, t: 'Del på 2.' },
  { m: <>3(5 − 2) − (5 − 4) = 9 − 1 = 8</>, t: 'Sett prøve: venstre side blir 8. Svaret stemmer.' },
];

export const PARENTES_STEG = TRINN.length;

export const Parenteser: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Parenteser</div>
    <h2>Løs opp parentesene først</h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={PARENTES_STEG} />
  </div>
);
