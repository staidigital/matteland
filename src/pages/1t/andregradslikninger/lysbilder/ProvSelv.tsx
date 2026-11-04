import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const OPPGAVER: ProvOppgave[] = [
  { sporsmal: <>Løs <span className="math nw"><Xk /> = 49</span>.</>, svar: <><X /> = ±7</> },
  { sporsmal: <>Løs <span className="math nw">3<Xk /> − 12 = 0</span>.</>, svar: <><span className="mline"><Xk /> = 4</span><span className="mline"><X /> = ±2</span></> },
  { sporsmal: <>Løs <span className="math nw">(<X /> + 1)<sup>2</sup> = 9</span>.</>, svar: <><span className="mline"><X /> + 1 = ±3</span><span className="mline"><X /> = 2 eller <X /> = −4</span></> },
  { sporsmal: <>Løs <span className="math nw"><Xk /> − 6<X /> = 0</span>.</>, svar: <><span className="mline"><X />(<X /> − 6) = 0</span><span className="mline"><X /> = 0 eller <X /> = 6</span></> },
  { sporsmal: <>Løs <span className="math nw"><Xk /> + 2<X /> − 15 = 0</span>.</>, svar: <><span className="mline">(<X /> + 5)(<X /> − 3) = 0</span><span className="mline"><X /> = −5 eller <X /> = 3</span></> },
  { sporsmal: <>Løs <span className="math nw">2<Xk /> − 10<X /> + 12 = 0</span>.</>, svar: <><span className="mline"><Xk /> − 5<X /> + 6 = 0</span><span className="mline">(<X /> − 2)(<X /> − 3) = 0</span><span className="mline"><X /> = 2 eller <X /> = 3</span></> },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Velg en metode som passer</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
