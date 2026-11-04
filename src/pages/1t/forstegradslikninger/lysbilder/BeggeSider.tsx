import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>5<X /> − 3 = 2<X /> + 9</>, t: 'Det er x på begge sider.' },
  { m: <>5<X /> − 2<X /> = 9 + 3</>, t: 'Samle x-leddene til venstre og tallene til høyre. Ledd som bytter side, skifter fortegn.' },
  { m: <>3<X /> = 12</>, t: 'Trekk sammen.' },
  { m: <span className="pen"><X /> = 4</span>, t: 'Del på 3.' },
  { m: <>5 · 4 − 3 = 17 &nbsp; og &nbsp; 2 · 4 + 9 = 17</>, t: 'Sett prøve: begge sidene blir 17.' },
  { m: <>4<X /> = 6 &nbsp;⇒&nbsp; <X /> = <Frac n="6" d="4" /> = <span className="pen"><Frac n="3" d="2" /></span></>, t: 'Svaret trenger ikke være et helt tall. Da er forkortet brøk det mest nøyaktige svaret.' },
];

export const BEGGE_STEG = TRINN.length;

export const BeggeSider: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · x på begge sider</div>
    <h2>Samle x på én side</h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={BEGGE_STEG} />
  </div>
);
