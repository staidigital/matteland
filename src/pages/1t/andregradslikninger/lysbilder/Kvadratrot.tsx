import React from 'react';
import { Rot, X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><Xk /> = 25 &nbsp;gir&nbsp; <span className="pen"><X /> = ±5</span></>, t: 'Både 5 og −5 er løsninger.' },
  { m: <>2<Xk /> − 18 = 0 &nbsp;gir&nbsp; 2<Xk /> = 18 &nbsp;gir&nbsp; <Xk /> = 9 &nbsp;gir&nbsp; <span className="pen"><X /> = ±3</span></>, t: 'Få x² alene først.' },
  { m: <><Xk /> − 7 = 0 &nbsp;gir&nbsp; <Xk /> = 7 &nbsp;gir&nbsp; <span className="pen"><X /> = ±<Rot>7</Rot></span></>, t: 'Roten trenger ikke å gå opp. Svaret står fint som ±√7.' },
  { m: <>(<X /> − 3)<sup>2</sup> = 16 &nbsp;gir&nbsp; <X /> − 3 = ±4 &nbsp;gir&nbsp; <span className="pen"><X /> = 7 eller <X /> = −1</span></>, t: 'Det samme virker når hele parentesen er kvadrert.' },
  { m: <><Xk /> + 4 = 0 &nbsp;gir&nbsp; <Xk /> = −4 &nbsp;gir&nbsp; <span className="pen">ingen løsning</span></>, t: 'Et kvadrat kan ikke være negativt.' },
];

export const ROT_STEG = TRINN.length;

export const Kvadratrot: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Metode 1 · Kvadratrot og ±</div>
    <h2>Når det ikke er noe <X />-ledd</h2>
    <div className="boxed math big"><Xk /> = <i className="v">k</i> &nbsp;gir&nbsp; <X /> = ±<Rot><i className="v">k</i></Rot> &nbsp; når <i className="v">k</i> &gt; 0</div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={ROT_STEG} />
  </div>
);
