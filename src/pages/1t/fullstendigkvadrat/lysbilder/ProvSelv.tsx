import React from 'react';
import { Frac, Rot, X, Xk } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const OPPGAVER: ProvOppgave[] = [
  { sporsmal: <>Skriv som fullstendig kvadrat: <span className="math nw"><Xk /> + 10<X /> + 7</span>.</>, svar: <>(<X /> + 5)<sup>2</sup> − 18</> },
  { sporsmal: <>Skriv som fullstendig kvadrat: <span className="math nw"><Xk /> − 6<X /> + 2</span>.</>, svar: <>(<X /> − 3)<sup>2</sup> − 7</> },
  { sporsmal: <>Skriv som fullstendig kvadrat: <span className="math nw"><Xk /> + 5<X /> + 4</span>.</>, svar: <>(<X /> + <Frac n="5" d="2" />)<sup>2</sup> − <Frac n="9" d="4" /></> },
  { sporsmal: <>Skriv som fullstendig kvadrat: <span className="math nw">3<Xk /> − 12<X /> + 1</span>.</>, svar: <><span className="mline">3((<X /> − 2)<sup>2</sup> − 4) + 1</span><span className="mline">= 3(<X /> − 2)<sup>2</sup> − 11</span></> },
  { sporsmal: <>Løs <span className="math nw"><Xk /> + 8<X /> + 7 = 0</span>.</>, svar: <><span className="mline">(<X /> + 4)<sup>2</sup> = 9</span><span className="mline"><X /> = −1 eller <X /> = −7</span></> },
  { sporsmal: <>Løs <span className="math nw"><Xk /> − 2<X /> − 2 = 0</span>.</>, svar: <><span className="mline">(<X /> − 1)<sup>2</sup> = 3</span><span className="mline"><X /> = 1 ± <Rot>3</Rot></span></> },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Fullstendig kvadrat</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
