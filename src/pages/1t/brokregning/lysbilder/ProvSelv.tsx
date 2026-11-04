import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const OPPGAVER: ProvOppgave[] = [
  {
    sporsmal: <>Regn ut <span className="math nw"><Frac n="3" d="8" /> + <Frac n="5" d="12" /></span>.</>,
    svar: <><Frac n="9" d="24" /> + <Frac n="10" d="24" /> = <Frac n="19" d="24" /></>,
  },
  {
    sporsmal: <>Regn ut <span className="math nw"><Frac n="4" d="15" /> · <Frac n="5" d="8" /></span>.</>,
    svar: <><Frac n="1" d="3" /> · <Frac n="1" d="2" /> = <Frac n="1" d="6" /></>,
  },
  {
    sporsmal: <>Regn ut <span className="math nw"><Frac n="2" d="3" /> : <Frac n="4" d="9" /></span>.</>,
    svar: <><Frac n="2" d="3" /> · <Frac n="9" d="4" /> = <Frac n="18" d="12" /> = <Frac n="3" d="2" /></>,
  },
  {
    sporsmal: <>Trekk sammen <span className="math nw"><Frac n="1" d={<X />} /> + <Frac n="2" d={<>3<X /></>} /></span>.</>,
    svar: <><Frac n="3" d={<>3<X /></>} /> + <Frac n="2" d={<>3<X /></>} /> = <Frac n="5" d={<>3<X /></>} /></>,
  },
  {
    sporsmal: <>Forkort <span className="math nw"><Frac n={<><X /><sup>2</sup> − 9</>} d={<>2<X /> + 6</>} /></span>.</>,
    svar: <><Frac n={<>(<X /> + 3)(<X /> − 3)</>} d={<>2(<X /> + 3)</>} /> = <Frac n={<><X /> − 3</>} d="2" /></>,
  },
  {
    sporsmal: <>Løs likningen <span className="math nw"><Frac n={<X />} d="3" /> + <Frac n={<X />} d="6" /> = 2</span>.</>,
    svar: (
      <>
        <span className="mline">2<X /> + <X /> = 12</span>
        <span className="mline"><X /> = 4</span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Brøkregning</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
