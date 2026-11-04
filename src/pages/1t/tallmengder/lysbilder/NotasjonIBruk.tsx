import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx, Mengde } from '../../funksjoner/felles';

const TRINN: Trinn[] = [
  { m: <><Fx /> = <Frac n="1" d={<X />} /> &nbsp; gir &nbsp; <Mengde m="D" /> = <span className="pen">ℝ \ {'{'}0{'}'}</span></>, t: 'Vi kan ikke dele med 0. Alle andre reelle tall er med.' },
  { m: <><Fx f="g" /> = <Frac n="3" d={<><X /> − 2</>} /> &nbsp; gir &nbsp; <Mengde m="D" f="g" /> = <span className="pen">ℝ \ {'{'}2{'}'}</span></>, t: <>Nevneren blir 0 når <X /> = 2.</> },
  { m: <>ℝ \ {'{'}0{'}'} = <span className="pen">⟨← , 0⟩ ∪ ⟨0 , →⟩</span></>, t: 'Samme mengde, skrevet med union: alle tall under 0 og alle tall over 0.' },
  { m: <><X /> ≤ −1 eller <X /> &gt; 2 &nbsp; gir &nbsp; <span className="pen">⟨← , −1] ∪ ⟨2 , →⟩</span></>, t: '«Eller» mellom to ulikheter blir til union.' },
  { m: <>[0 , 4] ∪ [2 , 6] = <span className="pen">[0 , 6]</span></>, t: 'Intervallene overlapper, så unionen er ett intervall.' },
  { m: <>ℝ \ ℚ = <span className="pen">de irrasjonale tallene</span></>, t: <>Vi kan også ta bort en hel mengde. Da står det ikke krøllparentes rundt ℚ.</> },
];

export const NOTASJON_STEG = TRINN.length;

export const NotasjonIBruk: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel</div>
    <h2>Notasjonen i bruk</h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={NOTASJON_STEG} />
  </div>
);
