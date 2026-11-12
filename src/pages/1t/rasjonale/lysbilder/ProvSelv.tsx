import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx, Mengde } from '../../funksjoner/felles';
import { Ras } from '../felles';

const OPPGAVER: ProvOppgave[] = [
  {
    sporsmal: (
      <>
        Frokost for 2179 kr deles på <X /> elever. Finn prisen per elev, <Fx />. Hvor mange må delta for at det skal bli
        under 100 kr på hver?
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <Fx /> = <Frac n="2179" d={<X />} />
        </span>
        <span className="mline">
          <Frac n="2179" d={<X />} /> = 100 ⇒ <X /> = 21,79, så minst 22 elever
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        <span className="math nw">
          <Fx f="h" /> = <Ras a={1} b={2} c={1} d={3} />
        </span>
        . Når er telleren null? Når er nevneren null? Finn <Mengde m="D" f="h" />.
      </>
    ),
    svar: (
      <>
        <span className="mline">
          Teller: <X /> = −2. &nbsp;Nevner: <X /> = −3
        </span>
        <span className="mline">
          <Mengde m="D" f="h" /> = ℝ \ {'{'}−3{'}'}
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        <span className="math nw">
          <Fx f="g" /> = <Frac n="1" d={<><X /> + 2</>} />
        </span>
        . Har funksjonen et nullpunkt? Finn asymptotene.
      </>
    ),
    svar: (
      <>
        <span className="mline">Ingen nullpunkt: telleren er alltid 1</span>
        <span className="mline">
          Vertikal: <X /> = −2 &nbsp; Horisontal: y = 0
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        <span className="math nw">
          <Fx /> = <Ras a={3} b={4} c={2} d={-4} />
        </span>
        . Finn nullpunktet og asymptotene.
      </>
    ),
    svar: (
      <>
        <span className="mline">
          Nullpunkt: 3<X /> + 4 = 0 ⇒ <X /> = −<Frac n="4" d="3" />
        </span>
        <span className="mline">
          y = <Frac n="3" d="2" /> og <X /> = 2
        </span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Rasjonale funksjoner</h2>
    <ProvOppgaver {...p} oppgaver={OPPGAVER} />
  </div>
);
