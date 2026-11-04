import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const OPPGAVER: ProvOppgave[] = [
  {
    sporsmal: <>Løs likningen <span className="math nw">4<X /> − 7 = 13</span>.</>,
    svar: <><span className="mline">4<X /> = 20</span><span className="mline"><X /> = 5</span></>,
  },
  {
    sporsmal: <>Løs likningen <span className="math nw">7<X /> + 2 = 3<X /> + 18</span>.</>,
    svar: <><span className="mline">4<X /> = 16</span><span className="mline"><X /> = 4</span></>,
  },
  {
    sporsmal: <>Løs likningen <span className="math nw">2(<X /> − 3) = <X /> + 1</span>.</>,
    svar: <><span className="mline">2<X /> − 6 = <X /> + 1</span><span className="mline"><X /> = 7</span></>,
  },
  {
    sporsmal: <>Løs likningen <span className="math nw">5 − (2<X /> − 1) = <X /></span>.</>,
    svar: <><span className="mline">5 − 2<X /> + 1 = <X /></span><span className="mline">6 = 3<X /></span><span className="mline"><X /> = 2</span></>,
  },
  {
    sporsmal: <>Løs likningen <span className="math nw"><Frac n={<><X /> − 1</>} d="3" /> + <Frac n={<X />} d="2" /> = 3</span>.</>,
    svar: <><span className="mline">2(<X /> − 1) + 3<X /> = 18</span><span className="mline">5<X /> = 20</span><span className="mline"><X /> = 4</span></>,
  },
  {
    sporsmal: <>Et rektangel er 3 cm lengre enn det er bredt. Omkretsen er 26 cm. Hvor bredt og hvor langt er det?</>,
    svar: <><span className="mline">2<X /> + 2(<X /> + 3) = 26</span><span className="mline">4<X /> = 20, <X /> = 5</span><span className="mline">Bredde 5 cm, lengde 8 cm</span></>,
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Førstegradslikninger</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
