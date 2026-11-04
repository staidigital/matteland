import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const OPPGAVER: ProvOppgave[] = [
  { sporsmal: <>Regn ut <span className="math nw">(<X /> + 7)<sup>2</sup></span>.</>, svar: <><Xk /> + 14<X /> + 49</> },
  { sporsmal: <>Regn ut <span className="math nw">(3<X /> − 4)<sup>2</sup></span>.</>, svar: <>9<Xk /> − 24<X /> + 16</> },
  { sporsmal: <>Regn ut <span className="math nw">(2<X /> + 5)(2<X /> − 5)</span>.</>, svar: <>4<Xk /> − 25</> },
  { sporsmal: <>Faktoriser <span className="math nw"><Xk /> − 12<X /> + 36</span>.</>, svar: <>(<X /> − 6)<sup>2</sup></> },
  { sporsmal: <>Faktoriser <span className="math nw">25<Xk /> − 1</span>.</>, svar: <>(5<X /> + 1)(5<X /> − 1)</> },
  {
    sporsmal: <>Trekk sammen <span className="math nw">(<X /> + 2)<sup>2</sup> − (<X /> − 2)<sup>2</sup></span>.</>,
    svar: <><span className="mline"><Xk /> + 4<X /> + 4 − (<Xk /> − 4<X /> + 4)</span><span className="mline">= <Xk /> + 4<X /> + 4 − <Xk /> + 4<X /> − 4 = 8<X /></span></>,
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Kvadratsetningene</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
