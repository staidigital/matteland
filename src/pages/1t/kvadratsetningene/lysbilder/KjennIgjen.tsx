import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const OPPGAVER: ProvOppgave[] = [
  { sporsmal: <span className="math nw"><Xk /> + 8<X /> + 16</span>, svar: <>1. kvadratsetning: (<X /> + 4)<sup>2</sup></> },
  { sporsmal: <span className="math nw"><Xk /> − 14<X /> + 49</span>, svar: <>2. kvadratsetning: (<X /> − 7)<sup>2</sup></> },
  { sporsmal: <span className="math nw">9<Xk /> − 25</span>, svar: <>Konjugatsetningen: (3<X /> + 5)(3<X /> − 5)</> },
  { sporsmal: <span className="math nw"><Xk /> + 9</span>, svar: <>Ingen. Konjugatsetningen krever minus mellom kvadratene.</> },
  { sporsmal: <span className="math nw"><Xk /> + 6<X /> + 4</span>, svar: <>Ingen. 2 · <X /> · 2 = 4<X />, ikke 6<X />.</> },
  { sporsmal: <span className="math nw">16 − <Xk /></span>, svar: <>Konjugatsetningen: (4 + <X />)(4 − <X />)</> },
];

export const KJENN_STEG = OPPGAVER.length;

export const KjennIgjen: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Kjenn igjen</div>
    <h2>Hvilken setning passer?</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
