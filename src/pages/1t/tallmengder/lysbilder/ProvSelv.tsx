import React from 'react';
import { Frac, Rot, X } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const OPPGAVER: ProvOppgave[] = [
  {
    sporsmal: (
      <>
        Hvilke av tallene er rasjonale?{' '}
        <span className="math nw">
          <Rot>16</Rot>, &nbsp;<Rot>7</Rot>, &nbsp;<Frac n="2" d="3" />, &nbsp;π, &nbsp;−1,5
        </span>
      </>
    ),
    svar: (
      <>
        <Rot>16</Rot> = 4, <Frac n="2" d="3" /> og −1,5 = −<Frac n="3" d="2" />
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Skriv <span className="math nw">0,75</span> og <span className="math nw">0,1666…</span> som brøker.
      </>
    ),
    svar: (
      <>
        0,75 = <Frac n="3" d="4" /> &nbsp;og&nbsp; 0,1666… = <Frac n="1" d="6" />
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Skriv <span className="math nw">−1 &lt; <X /> ≤ 4</span> som et intervall. Er tallene −1 og 4 med?
      </>
    ),
    svar: (
      <>
        <span className="mline">⟨−1 , 4]</span>
        <span className="mline">4 er med, −1 er ikke med</span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Hvor mange hele tall er med i <span className="math nw">[−2 , 3⟩</span>?
      </>
    ),
    svar: (
      <>
        <span className="mline">−2, −1, 0, 1 og 2</span>
        <span className="mline">Fem hele tall. 3 er ikke med.</span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Tallmengder og intervaller</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
