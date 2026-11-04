import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><Xk /> + 6<X /> + 9 = <span className="pen">(<X /> + 3)<sup>2</sup></span></>, t: 'Kvadratene er x² og 3². Midtleddet stemmer: 2 · x · 3 = 6x.' },
  { m: <><Xk /> − 10<X /> + 25 = <span className="pen">(<X /> − 5)<sup>2</sup></span></>, t: 'Minus i midtleddet gir 2. kvadratsetning.' },
  { m: <><Xk /> − 16 = <Xk /> − 4<sup>2</sup> = <span className="pen">(<X /> + 4)(<X /> − 4)</span></>, t: 'To kvadrater med minus mellom gir konjugatsetningen.' },
  { m: <>4<Xk /> + 12<X /> + 9 = (2<X />)<sup>2</sup> + 2 · 2<X /> · 3 + 3<sup>2</sup> = <span className="pen">(2<X /> + 3)<sup>2</sup></span></> },
  { m: <>3<Xk /> − 12 = 3(<Xk /> − 4) = <span className="pen">3(<X /> + 2)(<X /> − 2)</span></>, t: 'Sett felles faktor utenfor først, og se etter kvadratsetninger etterpå.' },
];

export const BAKLENGS_STEG = TRINN.length;

export const Baklengs: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Faktorisering</div>
    <h2>Bruk setningene baklengs</h2>
    <div className="boxed">
      <span className="label">Se etter</span>
      To ledd som er kvadrater. Er det et tredje ledd, må det være det dobbelte produktet av det som ble kvadrert.
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={BAKLENGS_STEG} />
  </div>
);
