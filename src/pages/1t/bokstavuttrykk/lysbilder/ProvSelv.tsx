import React from 'react';
import { V, X } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

const OPPGAVER: ProvOppgave[] = [
  {
    sporsmal: <>Trekk sammen <span className="math nw">4<A /> + 3<B /> − <A /> + 2<B /> − 5</span>.</>,
    svar: <>3<A /> + 5<B /> − 5</>,
  },
  {
    sporsmal: <>Løs opp parentesene og trekk sammen: <span className="math nw">7<X /> − (3<X /> − 2) + (<X /> + 1)</span>.</>,
    svar: <>7<X /> − 3<X /> + 2 + <X /> + 1 = 5<X /> + 3</>,
  },
  {
    sporsmal: <>Gang ut og trekk sammen: <span className="math nw">3(<X /> − 2) − 2(<X /> + 4)</span>.</>,
    svar: <>3<X /> − 6 − 2<X /> − 8 = <X /> − 14</>,
  },
  {
    sporsmal: <>Gang ut og trekk sammen: <span className="math nw">(<X /> + 5)(<X /> − 2)</span>.</>,
    svar: <><X /><sup>2</sup> − 2<X /> + 5<X /> − 10 = <X /><sup>2</sup> + 3<X /> − 10</>,
  },
  {
    sporsmal: <>Skriv 90 som et produkt av primtall.</>,
    svar: <>90 = 2 · 3 · 3 · 5</>,
  },
  {
    sporsmal: <>Trekk ut det som er felles: <span className="math nw">8<X /><sup>2</sup> + 12<X /></span>.</>,
    svar: <>4<X />(2<X /> + 3)</>,
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Bokstavuttrykk og faktorisering</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
