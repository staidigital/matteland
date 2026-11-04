import React from 'react';
import { V, X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

const TRINN: Trinn[] = [
  { m: <>Vis at <X />(<X /> + 4) + 4 = (<X /> + 2)<sup>2</sup></>, t: 'Her må begge sider regnes ut.' },
  { m: <>Venstre side: <X />(<X /> + 4) + 4 = <span className="pen"><Xk /> + 4<X /> + 4</span></> },
  { m: <>Høyre side: (<X /> + 2)<sup>2</sup> = <span className="pen"><Xk /> + 4<X /> + 4</span> <span className="right">✓</span></>, t: 'Begge sider gir samme uttrykk, så de er like for alle x.' },
  { m: <>Vis at (<A /> + <B />)<sup>2</sup> − (<A /> − <B />)<sup>2</sup> = 4<A /><B /></>, t: 'En identitet med to variabler.' },
  { m: <>= <A /><sup>2</sup> + 2<A /><B /> + <B /><sup>2</sup> − (<A /><sup>2</sup> − 2<A /><B /> + <B /><sup>2</sup>)</>, t: 'Behold parentesen: minus foran gjelder hele kvadratet.' },
  { m: <>= <A /><sup>2</sup> + 2<A /><B /> + <B /><sup>2</sup> − <A /><sup>2</sup> + 2<A /><B /> − <B /><sup>2</sup> = <span className="pen">4<A /><B /></span> <span className="right">✓</span></> },
];

export const BEGGE_STEG = TRINN.length;

export const BeggeSider: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempler</div>
    <h2>Regn ut begge sidene hver for seg</h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={BEGGE_STEG} />
  </div>
);
