import React from 'react';
import { X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>3 ∈ ℕ</>, t: '3 ligger i de naturlige tallene.' },
  { m: <>−3 ∉ ℕ &nbsp;men&nbsp; −3 ∈ ℤ</>, t: '−3 ligger ikke i de naturlige tallene, men i de hele tallene.' },
  { m: <><X /> ∈ [0 , 12]</>, t: <><X /> ligger i intervallet, altså 0 ≤ <X /> ≤ 12.</> },
  { m: <>ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ</>, t: 'Hver tallmengde er en delmengde av den neste.' },
  { m: <>{'{'}1, 2, 3{'}'} ⊂ ℕ &nbsp;og&nbsp; [1 , 3] ⊂ [0 , 5]</>, t: 'Krøllparentes lister opp tallene i en mengde. Et intervall er også en mengde.' },
  { m: <>3 ∈ ℕ &nbsp;men&nbsp; {'{'}3{'}'} ⊂ ℕ</>, t: '3 er et tall, mens {3} er en mengde med ett tall i. Derfor er tegnene ulike.' },
];

export const LIGGER_STEG = TRINN.length;

export const LiggerI: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Mengdenotasjon</div>
    <h2>Ligger i og delmengde</h2>
    <div className="grid2">
      <div className="boxed">
        <span className="label">Ligger i</span>
        <span className="math nw">∈</span> står mellom et <b>tall</b> og en mengde: tallet ligger i mengden.{' '}
        <span className="math nw">∉</span> betyr at det ikke gjør det.
      </div>
      <div className="boxed">
        <span className="label">Delmengde av</span>
        <span className="math nw">⊂</span> står mellom to <b>mengder</b>: alle tallene i den første ligger også i den andre.
      </div>
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={LIGGER_STEG} />
  </div>
);
