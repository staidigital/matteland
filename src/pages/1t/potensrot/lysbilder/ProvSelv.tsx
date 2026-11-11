import React from 'react';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import { Rot, X, dec } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx, Intervall, Mengde } from '../../funksjoner/felles';
import { Pot } from '../felles';

const OPPGAVER: ProvOppgave[] = [
  {
    sporsmal: (
      <>
        <span className="math nw">
          <Fx /> = <Pot a={3.5} b={1.5} />
        </span>
        . Hvilke verdier har <i className="v">f</i> når <X /> = 0 og <X /> = 9?
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <Fx x="0" /> = 3,5 · 0<sup>1,5</sup> = 0
        </span>
        <span className="mline">
          <Fx x="9" /> = 3,5 · 9<sup>1,5</sup> = 3,5 · 27 = 94,5
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Vekta til en firfisle er{' '}
        <span className="math nw">
          <Fx f="V" /> = <Pot a={0.27} b={1.6} />
        </span>{' '}
        gram, der <X /> er lengden i cm. Hvor mye veier en firfisle som er 8 cm lang?
      </>
    ),
    svar: (
      <>
        <Fx f="V" x="8" /> = 0,27 · 8<sup>1,6</sup> ≈ {dec(0.27 * 8 ** 1.6, 1)} g
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Bestem definisjonsmengden til{' '}
        <span className="math nw">
          <Fx /> = <Rot>3<X /> − 6</Rot>
        </span>
        .
      </>
    ),
    svar: (
      <>
        <span className="mline">
          3<X /> − 6 ≥ 0 &nbsp;⇒&nbsp; <X /> ≥ 2
        </span>
        <span className="mline">
          <Mengde m="D" /> = <Intervall a={2} b={Infinity} />
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Tverrsnittet av en kuppel er halvsirkelen{' '}
        <span className="math nw">
          <Fx f="S" /> = <Rot>16 − <X /><sup>2</sup></Rot>
        </span>
        . Hvor bred og hvor høy er kuppelen?
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <Fx f="S" /> = 0 gir <X /> = ±4, så diameteren er 8
        </span>
        <span className="mline">
          Høyest i midten: <Fx f="S" x="0" /> = √16 = 4
        </span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Potens- og rotfunksjoner</h2>
    <ProvOppgaver {...p} oppgaver={OPPGAVER} />
  </div>
);
