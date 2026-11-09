import React from 'react';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Frac } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';
import { tusen } from '../../skjaeringspunkter/felles';
import { Eksp } from '../felles';

const OPPGAVER: ProvOppgave[] = [
  {
    sporsmal: (
      <>
        Ole kjøper en moped til 15 000 kr. Verdien minker med 14 % hvert år. Sett opp et funksjonsuttrykk for verdien
        etter <i className="v">x</i> år. Hva er mopeden verdt om tre år?
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <Fx f="V" /> = <Eksp a={15000} b={0.86} />
        </span>
        <span className="mline">
          <Fx f="V" x="3" /> = 15 000 · 0,86<sup>3</sup> ≈ {tusen(15000 * 0.86 ** 3)} kr
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Et firma omsetter for 2 millioner kroner i året og venter en økning på 7 % per år. Hva blir omsetningen etter
        fire år?
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <Fx f="O" /> = <Eksp a={2} b={1.07} />
        </span>
        <span className="mline">
          <Fx f="O" x="4" /> = 2 · 1,07<sup>4</sup> ≈ 2,62 millioner kr
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        I Norge havner ca. 4000 tonn mikroplast i havet årlig. Anta at mengden reduseres med 6 % per år. Hvor mye havner
        i havet om to år?
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <Fx f="M" /> = <Eksp a={4000} b={0.94} />
        </span>
        <span className="mline">
          <Fx f="M" x="2" /> = 4000 · 0,94<sup>2</sup> ≈ 3534 tonn
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        I en bakteriekultur er det 45 000 bakterier. Antallet øker med 50 % hver time. Hvor mange bakterier var det for
        to timer siden?
      </>
    ),
    svar: (
      <>
        <span className="mline">
          45 000 · 1,5<sup>−2</sup> = <Frac n="45 000" d={<>1,5<sup>2</sup></>} /> = 20 000
        </span>
        <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>
          Ikke 45 000 · 0,5<sup>2</sup>: å gå bakover er å dele på 1,5, ikke å gange med 0,5.
        </span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Fra tekst til funksjon</h2>
    <ProvOppgaver {...p} oppgaver={OPPGAVER} />
  </div>
);
