import React from 'react';
import { Frac, Rot, X } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const OPPGAVER: ProvOppgave[] = [
  {
    sporsmal: <>Regn ut <span className="math nw">2<sup>−3</sup> · 2<sup>5</sup></span>.</>,
    svar: <>2<sup>2</sup> = 4</>,
  },
  {
    sporsmal: <>Forenkle <span className="math nw">(3<X /><sup>2</sup>)<sup>2</sup> · <X /></span>.</>,
    svar: <>9<X /><sup>4</sup> · <X /> = 9<X /><sup>5</sup></>,
  },
  {
    sporsmal: <>Forenkle <span className="math nw"><Frac n={<><X /><sup>7</sup></>} d={<><X /><sup>2</sup> · <X /><sup>3</sup></>} /></span>.</>,
    svar: <><Frac n={<><X /><sup>7</sup></>} d={<><X /><sup>5</sup></>} /> = <X /><sup>2</sup></>,
  },
  {
    sporsmal: <>Skriv så enkelt som mulig: <span className="math nw"><Rot>75</Rot> − <Rot>12</Rot></span>.</>,
    svar: <>5<Rot>3</Rot> − 2<Rot>3</Rot> = 3<Rot>3</Rot></>,
  },
  {
    sporsmal: <>Regn ut <span className="math nw">32<sup>3/5</sup></span> uten kalkulator.</>,
    svar: <>(<Rot n="5">32</Rot>)<sup>3</sup> = 2<sup>3</sup> = 8</>,
  },
  {
    sporsmal: <>Regn ut og skriv på standardform: <span className="math nw">(2 · 10<sup>5</sup>) · (3 · 10<sup>−2</sup>)</span>.</>,
    svar: <>6 · 10<sup>3</sup></>,
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Potenser og røtter</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
