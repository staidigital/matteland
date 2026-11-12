import React from 'react';
import { Frac, V, X } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';

const N = () => <V c="n" />;

const OPPGAVER: ProvOppgave[] = [
  {
    sporsmal: (
      <>
        Gjør lineær regresjon på punktene (0 , 2), (1 , 3,5), (4 , 10,25), (5 , 12,5), (8 , 15) og (10 , 20).
      </>
    ),
    svar: (
      <span className="mline">
        y = 1,75<X /> + 2,375
      </span>
    ),
  },
  {
    sporsmal: (
      <>
        Antall hytter: 132, 148, 172, 197 og 223 i 2016, 2018, 2020, 2022 og 2024. Finn en lineær og en eksponentiell modell.
        Hva sier de om 2031?
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <Fx /> = 11,55<X /> + 128,2 &nbsp;⇒&nbsp; <Fx x="15" /> ≈ 301
        </span>
        <span className="mline">
          <Fx f="g" /> = 131,19 · 1,069<sup><i className="v">x</i></sup> &nbsp;⇒&nbsp; <Fx f="g" x="15" /> ≈ 357
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Heksagontallene begynner med 1, 7 og 19. Finn de to neste, en formel for tall nummer <N />, og tall nummer 20.
      </>
    ),
    svar: (
      <>
        <span className="mline">37 og 61 (økningen øker med 6)</span>
        <span className="mline">
          <Fx f="H" x={<N />} /> = 3<N />
          <sup>2</sup> − 3<N /> + 1, &nbsp;<Fx f="H" x="20" /> = 1141
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Finn neste tall og en formel for tall nummer <N />: &nbsp;<b>a</b> 7, 10, 13, 16 &nbsp;<b>b</b> 2, 6, 12, 20 &nbsp;
        <b>c</b> 1, 5, 14, 30
      </>
    ),
    svar: (
      <>
        <span className="mline">
          a 19, 3<N /> + 4 &nbsp; b 30, <N />
          <sup>2</sup> + <N />
        </span>
        <span className="mline">
          c 55,{' '}
          <Frac
            n={
              <>
                2<N />
                <sup>3</sup> + 3<N />
                <sup>2</sup> + <N />
              </>
            }
            d="6"
          />
        </span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Modellering og regresjon</h2>
    <ProvOppgaver {...p} oppgaver={OPPGAVER} />
  </div>
);
