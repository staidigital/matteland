import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>Produktet av to hele tall på rad er 156. Hvilke tall er det?</>, t: 'Her er ikke negative tall utelukket.' },
  { m: <><X />(<X /> + 1) = 156 &nbsp;gir&nbsp; <Xk /> + <X /> − 156 = 0 &nbsp;gir&nbsp; <X /> = 12 eller <X /> = −13</> },
  { m: <span className="pen">Tallene er 12 og 13, eller −13 og −12.</span>, t: 'Begge svarene er riktige: (−13) · (−12) = 156.' },
  { m: <>Hvis oppgaven sier «to positive tall», blir bare 12 og 13 med.</>, t: 'Teksten bestemmer hvilke svar vi beholder.' },
];

export const VURDER_STEG = TRINN.length;

export const VurderSvaret: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Vurder svaret</div>
    <h2>Er negative svar alltid feil?</h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={VURDER_STEG} />
    <div className="tablewrap">
      <table className="cases">
        <thead><tr><th>Situasjon</th><th>Svar å forkaste</th></tr></thead>
        <tbody>
          <tr><td>Lengde, areal, antall</td><td>Negative tall. Antall må også være hele tall.</td></tr>
          <tr><td>Tid etter en start</td><td>Tider før starten, og tider etter at noe har sluttet.</td></tr>
          <tr><td>Rene tallgåter, temperatur, overskudd</td><td>Ingen automatisk. Negative tall kan gi mening.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
);
