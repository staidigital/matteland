import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><Frac n={<><X /> + 1</>} d="3" /> + <Frac n={<X />} d="2" /> = 7</>, t: 'Fellesnevneren er 6.' },
  { m: <>6 · <Frac n={<><X /> + 1</>} d="3" /> + 6 · <Frac n={<X />} d="2" /> = 6 · 7</>, t: 'Gang alle leddene på begge sider, også 7.' },
  { m: <>2(<X /> + 1) + 3<X /> = 42</>, t: 'Brøkene er borte. Telleren x + 1 må stå i parentes.' },
  { m: <>2<X /> + 2 + 3<X /> = 42</>, t: 'Løs opp parentesen.' },
  { m: <>5<X /> = 40</>, t: 'Trekk sammen, og flytt over 2.' },
  { m: <span className="pen"><X /> = 8</span>, t: 'Del på 5.' },
  { m: <><Frac n="9" d="3" /> + <Frac n="8" d="2" /> = 3 + 4 = 7</>, t: 'Sett prøve: venstre side blir 7. Svaret stemmer.' },
];

export const BROK_STEG = TRINN.length;

export const MedBrok: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Likninger med brøk</div>
    <h2>Gang bort brøkene</h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={BROK_STEG} />
  </div>
);
