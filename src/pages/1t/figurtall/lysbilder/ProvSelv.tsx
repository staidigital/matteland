import React from 'react';
import { Frac, V } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { F } from '../felles';

const N = () => <V c="n" />;

const OPPGAVER: ProvOppgave[] = [
  {
    sporsmal: <>Et mønster har 5, 9, 13, 17, … prikker. Finn en formel for <span className="math nw"><F /></span>, og regn ut <span className="math nw"><F n="50" /></span>.</>,
    svar: (
      <>
        <span className="mline"><F /> = 4<N /> + 1</span>
        <span className="mline"><F n="50" /> = 201</span>
      </>
    ),
  },
  {
    sporsmal: <>Hvilken figur i mønsteret i a har 101 prikker?</>,
    svar: (
      <>
        <span className="mline">4<N /> + 1 = 101</span>
        <span className="mline"><N /> = 25</span>
      </>
    ),
  },
  {
    sporsmal: <>Rektangeltallene er 2, 6, 12, 20, … Finn en formel og regn ut <span className="math nw"><F n="10" /></span>.</>,
    svar: (
      <>
        <span className="mline"><F /> = <N />(<N /> + 1)</span>
        <span className="mline"><F n="10" /> = 110</span>
      </>
    ),
  },
  {
    sporsmal: <>Regn ut trekanttallet <span className="math nw"><F n="20" /></span>.</>,
    svar: <><Frac n="20 · 21" d="2" /> = 210</>,
  },
  {
    sporsmal: <>Finn en formel for 2, 5, 10, 17, 26, …</>,
    svar: (
      <>
        <span className="mline">Økningen øker med 2, så vi prøver <N /><sup>2</sup>.</span>
        <span className="mline"><F /> = <N /><sup>2</sup> + 1</span>
      </>
    ),
  },
  {
    sporsmal: <>Vis at summen av tre hele tall på rad alltid er delelig med 3.</>,
    svar: <><N /> + (<N /> + 1) + (<N /> + 2) = 3<N /> + 3 = 3(<N /> + 1)</>,
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Figurtall og generalisering</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
