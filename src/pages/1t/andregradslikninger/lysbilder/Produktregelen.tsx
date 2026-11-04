import React from 'react';
import { Frac, V, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

const TRINN: Trinn[] = [
  { m: <>(<X /> − 2)(<X /> + 5) = 0 &nbsp;gir&nbsp; <X /> − 2 = 0 eller <X /> + 5 = 0 &nbsp;gir&nbsp; <span className="pen"><X /> = 2 eller <X /> = −5</span></>, t: 'Hver faktor gir sin egen enkle likning.' },
  { m: <><X />(<X /> − 4) = 0 &nbsp;gir&nbsp; <span className="pen"><X /> = 0 eller <X /> = 4</span></>, t: 'Faktoren x er også en faktor.' },
  { m: <>(2<X /> − 1)(<X /> + 3) = 0 &nbsp;gir&nbsp; <span className="pen"><X /> = <Frac n="1" d="2" /> eller <X /> = −3</span></>, t: '2x − 1 = 0 gir 2x = 1.' },
];

export const PROD_STEG = TRINN.length;

export const Produktregelen: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Metode 2 · Produktregelen</div>
    <h2>Et produkt er 0 bare når en faktor er 0</h2>
    <div className="boxed math big">
      <A /> · <B /> = 0 &nbsp;betyr at&nbsp; <A /> = 0 eller <B /> = 0
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={PROD_STEG} />
    <p className="muted">Høyre side må være 0. Regelen sier ingenting om likninger som <span className="math nw">(<X /> − 2)(<X /> + 5) = 6</span>.</p>
  </div>
);
