import React from 'react';
import { Frac, Rot, X, Xk } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const OPPGAVER: ProvOppgave[] = [
  { sporsmal: <>Løs <span className="math nw"><Xk /> − 5<X /> + 6 = 0</span>.</>, svar: <><span className="mline"><X /> = <Frac n="5 ± 1" d="2" /></span><span className="mline"><X /> = 3 eller <X /> = 2</span></> },
  { sporsmal: <>Løs <span className="math nw">2<Xk /> + <X /> − 3 = 0</span>.</>, svar: <><span className="mline"><X /> = <Frac n="−1 ± 5" d="4" /></span><span className="mline"><X /> = 1 eller <X /> = −<Frac n="3" d="2" /></span></> },
  { sporsmal: <>Løs <span className="math nw">3<Xk /> − 2<X /> − 1 = 0</span>.</>, svar: <><span className="mline"><X /> = <Frac n="2 ± 4" d="6" /></span><span className="mline"><X /> = 1 eller <X /> = −<Frac n="1" d="3" /></span></> },
  { sporsmal: <>Løs <span className="math nw"><Xk /> + 4<X /> + 4 = 0</span>.</>, svar: <><span className="mline"><i className="v">D</i> = 16 − 16 = 0</span><span className="mline"><X /> = −2</span></> },
  { sporsmal: <>Løs <span className="math nw"><Xk /> + <X /> + 1 = 0</span>.</>, svar: <><span className="mline"><i className="v">D</i> = 1 − 4 = −3</span><span className="mline">Ingen løsning</span></> },
  { sporsmal: <>Løs <span className="math nw"><Xk /> − 2<X /> − 1 = 0</span>.</>, svar: <><span className="mline"><X /> = <Frac n={<>2 ± <Rot>8</Rot></>} d="2" /></span><span className="mline"><X /> = 1 ± <Rot>2</Rot></span></> },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>abc-formelen</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
