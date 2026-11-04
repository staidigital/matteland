import React from 'react';
import { Frac, Rot, V } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

const TRINN: Trinn[] = [
  { m: <><Rot>12</Rot> = <Rot>4 · 3</Rot> = <Rot>4</Rot> · <Rot>3</Rot> = <span className="pen">2<Rot>3</Rot></span></>, t: 'Finn et kvadrattall som går opp i tallet.' },
  { m: <><Rot>8</Rot> + <Rot>18</Rot> = 2<Rot>2</Rot> + 3<Rot>2</Rot> = <span className="pen">5<Rot>2</Rot></span></>, t: <>Forenkle først. Så kan vi legge sammen, slik vi gjør med 2<i className="v">x</i> + 3<i className="v">x</i>.</> },
  { m: <><Rot>2</Rot> · <Rot>8</Rot> = <Rot>16</Rot> = <span className="pen">4</span></> },
  { m: <><Frac n="1" d={<Rot>2</Rot>} /> = <Frac n={<>1 · <Rot>2</Rot></>} d={<><Rot>2</Rot> · <Rot>2</Rot></>} /> = <span className="pen"><Frac n={<Rot>2</Rot>} d="2" /></span></>, t: 'Utvid for å få bort roten i nevneren. Denne verdien møter du igjen i trigonometrien.' },
  { m: <span className="wrong"><Rot>9 + 16</Rot> = <Rot>25</Rot> = 5, &nbsp;ikke 3 + 4 = 7</span>, t: 'Rotregelen gjelder for produkt, ikke for sum.' },
];

export const ROT_STEG = TRINN.length;

export const Kvadratrot: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Røtter</div>
    <h2>Kvadratrot</h2>
    <div className="grid2">
      <div className="boxed">
        <span className="label">Kvadratrot</span>
        <span className="math nw"><Rot><A /></Rot></span> er det positive tallet som ganget med seg selv gir <A />. Vi krever <span className="nw"><A /> ≥ 0</span>, og <span className="math nw"><Rot>0</Rot> = 0</span>.
      </div>
      <div className="boxed math">
        <span className="label">Regler</span>
        <span className="mline"><Rot><A /><B /></Rot> = <Rot><A /></Rot> · <Rot><B /></Rot></span>
        <span className="mline"><Rot><Frac n={<A />} d={<B />} /></Rot> = <Frac n={<Rot><A /></Rot>} d={<Rot><B /></Rot>} /></span>
      </div>
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={ROT_STEG} />
  </div>
);
