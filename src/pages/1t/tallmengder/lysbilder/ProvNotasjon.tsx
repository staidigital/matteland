import React from 'react';
import { Frac, Rot, X } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const OPPGAVER: ProvOppgave[] = [
  {
    sporsmal: (
      <>
        Sett inn ∈, ∉ eller ⊂:{' '}
        <span className="math nw"><Rot>2</Rot> ▢ ℚ</span>, &nbsp;<span className="math nw">ℤ ▢ ℝ</span>, &nbsp;<span className="math nw">−1 ▢ ℤ</span>
      </>
    ),
    svar: <><Rot>2</Rot> ∉ ℚ, &nbsp;ℤ ⊂ ℝ, &nbsp;−1 ∈ ℤ</>,
  },
  {
    sporsmal: (
      <>
        Hva er definisjonsmengden til <span className="math nw"><Frac n="5" d={<><X /> + 1</>} /></span>? Skriv den både med \ og med ∪.
      </>
    ),
    svar: (
      <>
        <span className="mline">ℝ \ {'{'}−1{'}'}</span>
        <span className="mline">⟨← , −1⟩ ∪ ⟨−1 , →⟩</span>
      </>
    ),
  },
  {
    sporsmal: <>Skriv <span className="math nw">[0 , 5] \ {'{'}5{'}'}</span> som ett intervall.</>,
    svar: <>[0 , 5⟩</>,
  },
  {
    sporsmal: <>Skriv <span className="math nw">[−1 , 2] ∪ [1 , 4]</span> så enkelt som mulig. Er 3 med?</>,
    svar: (
      <>
        <span className="mline">[−1 , 4]</span>
        <span className="mline">Ja, 3 ∈ [−1 , 4]</span>
      </>
    ),
  },
];

export const PROV_NOTASJON_STEG = OPPGAVER.length;

export const ProvNotasjon: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Mengdenotasjon</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
