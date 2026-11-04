import React from 'react';
import { V, X, Xk } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;
const N = () => <V c="n" />;

const OPPGAVER: ProvOppgave[] = [
  { sporsmal: <>Vis at <span className="math nw">(<X /> + 4)<sup>2</sup> − 8<X /> = <Xk /> + 16</span>.</>, svar: <><Xk /> + 8<X /> + 16 − 8<X /> = <Xk /> + 16 <span className="right">✓</span></> },
  { sporsmal: <>Vis at <span className="math nw">(<X /> − 1)(<X /> + 1) + 1 = <Xk /></span>.</>, svar: <><Xk /> − 1 + 1 = <Xk /> <span className="right">✓</span></> },
  { sporsmal: <>Vis at <span className="math nw">(<A /> + <B />)<sup>2</sup> − 2<A /><B /> = <A /><sup>2</sup> + <B /><sup>2</sup></span>.</>, svar: <><A /><sup>2</sup> + 2<A /><B /> + <B /><sup>2</sup> − 2<A /><B /> = <A /><sup>2</sup> + <B /><sup>2</sup> <span className="right">✓</span></> },
  { sporsmal: <>Er <span className="math nw">(<X /> − 2)<sup>2</sup> = <Xk /> − 4</span> en identitet?</>, svar: <>Nei. <X /> = 1 gir 1 på venstre side og −3 på høyre side.</> },
  { sporsmal: <>Vis at summen av fire hele tall på rad alltid er et partall.</>, svar: <><span className="mline"><N /> + (<N /> + 1) + (<N /> + 2) + (<N /> + 3)</span><span className="mline">= 4<N /> + 6 = 2(2<N /> + 3) <span className="right">✓</span></span></> },
  { sporsmal: <>Utfordring: Vis at kvadratet av et oddetall minus 1 alltid er delelig med 8.</>, svar: <><span className="mline">(2<N /> + 1)<sup>2</sup> − 1 = 4<N /><sup>2</sup> + 4<N /> = 4<N />(<N /> + 1)</span><span className="mline">Ett av tallene <N /> og <N /> + 1 er et partall, så faktoren 8 er med.</span></> },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Vis, eller motbevis</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
