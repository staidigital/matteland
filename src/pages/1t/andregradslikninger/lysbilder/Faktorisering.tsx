import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><Xk /> − 4<X /> = 0 &nbsp;gir&nbsp; <X />(<X /> − 4) = 0 &nbsp;gir&nbsp; <span className="pen"><X /> = 0 eller <X /> = 4</span></>, t: 'Når konstantleddet mangler, kan vi sette x utenfor.' },
  { m: <>3<Xk /> + 6<X /> = 0 &nbsp;gir&nbsp; 3<X />(<X /> + 2) = 0 &nbsp;gir&nbsp; <span className="pen"><X /> = 0 eller <X /> = −2</span></>, t: 'Sett alt som er felles utenfor. Faktoren 3 kan aldri bli 0, så den gir ingen løsning.' },
  { m: <><Xk /> − 9 = 0 &nbsp;gir&nbsp; (<X /> + 3)(<X /> − 3) = 0 &nbsp;gir&nbsp; <span className="pen"><X /> = −3 eller <X /> = 3</span></>, t: 'Konjugatsetningen. Her kunne vi også brukt kvadratrot.' },
  { m: <><Xk /> + 6<X /> + 9 = 0 &nbsp;gir&nbsp; (<X /> + 3)<sup>2</sup> = 0 &nbsp;gir&nbsp; <span className="pen"><X /> = −3</span></>, t: '1. kvadratsetning. Begge faktorene er like, så likningen har bare én løsning.' },
];

export const FAKTOR_STEG = TRINN.length;

export const Faktorisering: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Metode 2 · Faktorisering</div>
    <h2>Gjør venstre side til et produkt</h2>
    <div className="boxed">
      <span className="label">Fremgangsmåte</span>
      Samle alt på venstre side, faktoriser, og bruk produktregelen.
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={FAKTOR_STEG} />
  </div>
);
