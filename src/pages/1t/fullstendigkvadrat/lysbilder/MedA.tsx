import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>2<Xk /> + 12<X /> + 5 = 2(<Xk /> + 6<X />) + 5</>, t: 'Sett tallet foran x² utenfor en parentes rundt de to første leddene.' },
  { m: <>= 2((<X /> + 3)<sup>2</sup> − 9) + 5</>, t: 'Gjør om innholdet i parentesen til et fullstendig kvadrat.' },
  { m: <>= 2(<X /> + 3)<sup>2</sup> − 18 + 5 = <span className="pen">2(<X /> + 3)<sup>2</sup> − 13</span></>, t: 'Gang 2 inn. Da blir −9 til −18.' },
  { m: <>−<Xk /> + 4<X /> + 1 = −(<Xk /> − 4<X />) + 1 = −((<X /> − 2)<sup>2</sup> − 4) + 1 = <span className="pen">−(<X /> − 2)<sup>2</sup> + 5</span></>, t: 'Minus foran x² virker på samme måte: −1 settes utenfor.' },
];

export const MEDA_STEG = TRINN.length;

export const MedA: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Når tallet foran <X /><sup>2</sup> ikke er 1</div>
    <h2>Sett det utenfor først</h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={MEDA_STEG} />
  </div>
);
