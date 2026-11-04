import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>3<X /> + 5 = 20</>, t: 'Vi vil ha x alene. Først må 5 bort fra venstre side.' },
  { m: <>3<X /> + 5 − 5 = 20 − 5</>, t: 'Trekk fra 5 på begge sider.' },
  { m: <>3<X /> = 15</>, t: 'Tallet 5 har i praksis flyttet seg over og skiftet fortegn.' },
  { m: <><Frac n={<>3<X /></>} d="3" /> = <Frac n="15" d="3" /></>, t: 'Del begge sider på tallet foran x.' },
  { m: <span className="pen"><X /> = 5</span> },
  { m: <>3 · 5 + 5 = 20</>, t: 'Sett prøve: venstre side blir 20, som på høyre side. Svaret stemmer.' },
];

export const REGLER_STEG = TRINN.length;

export const Regler: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Fremgangsmåte</div>
    <h2>Samme operasjon på begge sider</h2>
    <div className="boxed">
      <span className="label math">Regel</span>
      Vi kan legge til, trekke fra, gange med og dele på det samme tallet på begge sider, så lenge vi ikke ganger eller deler med 0. Da har likningen fortsatt samme løsning.
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={REGLER_STEG} />
  </div>
);
