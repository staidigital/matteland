import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import { type LysbildeProps, StepButtons } from '../../../../../presentasjon/ui';

export const SPARING_STEG = 3;

export const EksempelSparing: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Vekst</div>
    <h2>Sparing med rente</h2>
    <p>
      Du setter 20 000 kr i banken med 4,5 % rente per år. Hvor mye har du etter 10 år? Lag et program der det er lett å endre
      beløp, rente og antall år.
    </p>
    <div className="cols">
      <div className="stack">
        {frag >= 1 && (
          <div className="panel reveal">
            <b>Variabler for det vi vil kunne endre:</b> startbeløp, rente og antall år. Da står tallene ett sted, med navn som
            forteller hva de er.
          </div>
        )}
        {frag >= 2 && (
          <div className="panel reveal">
            <b>Vekstfaktoren</b> er 1 + 4,5/100 = 1,045. Etter <i className="v">n</i> år er beløpet startbeløp · 1,045
            <sup>
              <i className="v">n</i>
            </sup>
            , som i eksponentialfunksjonene.
          </div>
        )}
        {frag >= 3 && (
          <div className="panel reveal">
            Etter 10 år har du omtrent <b className="pen">31 059 kr</b>. Hvor mange år tar det før beløpet er doblet? Prøv deg
            fram ved å endre <code>ar</code>.
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={SPARING_STEG} />
      </div>
      <Kodeboks
        kode={
          "start = 20000\nrente = 4.5\nar = 10\n\nvekstfaktor = 1 + rente/100\nslutt = start * vekstfaktor**ar\nprint(f'Etter {ar} år har du {round(slutt)} kr')"
        }
        variabler
      />
    </div>
  </div>
);
