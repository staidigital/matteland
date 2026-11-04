import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><Xk /> − <X /> − 12 = 0 &nbsp;gir&nbsp; (<X /> − 4)(<X /> + 3) = 0 &nbsp;gir&nbsp; <span className="pen"><X /> = 4 eller <X /> = −3</span></>, t: 'Negativt produkt gir ulike fortegn: −4 · 3 = −12 og −4 + 3 = −1.' },
  { m: <><Xk /> − 7<X /> + 10 = 0 &nbsp;gir&nbsp; (<X /> − 2)(<X /> − 5) = 0 &nbsp;gir&nbsp; <span className="pen"><X /> = 2 eller <X /> = 5</span></>, t: 'Positivt produkt og negativ sum: begge tallene er negative.' },
  { m: <>2<Xk /> + 2<X /> − 12 = 0 &nbsp;gir&nbsp; <Xk /> + <X /> − 6 = 0 &nbsp;gir&nbsp; (<X /> + 3)(<X /> − 2) = 0 &nbsp;gir&nbsp; <span className="pen"><X /> = −3 eller <X /> = 2</span></>, t: 'Tallet foran x² må være 1. Del hele likningen først.' },
  { m: <><Xk /> + 3<X /> − 1 = 0 &nbsp;gir&nbsp; ingen hele tall</>, t: 'Bare 1 og −1 har produkt −1, og summen blir 0. Likningen har likevel løsninger, og dem finner vi med abc-formelen.' },
];

export const FORTEGN_STEG = TRINN.length;

export const Fortegn: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Sum og produkt · Fortegn</div>
    <h2>Produktet avslører fortegnene</h2>
    <div className="tablewrap">
      <table className="cases">
        <thead>
          <tr><th>Produkt</th><th>Sum</th><th>De to tallene</th></tr>
        </thead>
        <tbody>
          <tr><td>positivt</td><td>positiv</td><td>begge positive</td></tr>
          <tr><td>positivt</td><td>negativ</td><td>begge negative</td></tr>
          <tr><td>negativt</td><td>positiv eller negativ</td><td>ulikt fortegn</td></tr>
        </tbody>
      </table>
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={FORTEGN_STEG} />
  </div>
);
