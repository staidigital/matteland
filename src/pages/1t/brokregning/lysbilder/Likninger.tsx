import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><Frac n={<X />} d="2" /> + <Frac n={<X />} d="3" /> = 5</>, t: 'Fellesnevneren er 6.' },
  { m: <>6 · <Frac n={<X />} d="2" /> + 6 · <Frac n={<X />} d="3" /> = 6 · 5</>, t: 'Gang alle leddene på begge sider med fellesnevneren.' },
  { m: <>3<X /> + 2<X /> = 30</>, t: 'Nå er brøkene borte.' },
  { m: <>5<X /> = 30 &nbsp;⇒&nbsp; <span className="pen"><X /> = 6</span></> },
  { m: <><Frac n="6" d="2" /> + <Frac n="6" d="3" /> = 3 + 2 = 5</>, t: 'Kontroll: venstre side blir 5. Svaret stemmer.' },
];

export const LIKNINGER_STEG = TRINN.length;

export const Likninger: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Likninger med brøk</div>
    <h2>Gang bort brøkene</h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={LIKNINGER_STEG} />
  </div>
);
