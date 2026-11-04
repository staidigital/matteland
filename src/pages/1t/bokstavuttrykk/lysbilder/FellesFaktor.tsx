import React from 'react';
import { V, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

const TRINN: Trinn[] = [
  { m: <>6<X /> + 9 = 3 · 2<X /> + 3 · 3 = <span className="pen">3(2<X /> + 3)</span></>, t: '6 = 2 · 3 og 9 = 3 · 3, så 3 er felles.' },
  { m: <>12<A /> − 18<B /> = 6 · 2<A /> − 6 · 3<B /> = <span className="pen">6(2<A /> − 3<B />)</span></>, t: '12 = 2 · 2 · 3 og 18 = 2 · 3 · 3, så 2 · 3 = 6 er felles.' },
  { m: <><X /><sup>2</sup> − 3<X /> = <X /> · <X /> − 3 · <X /> = <span className="pen"><X />(<X /> − 3)</span></>, t: 'Det som er felles, kan også være en bokstav.' },
  { m: <>6<X /><sup>2</sup> + 9<X /> = 3<X /> · 2<X /> + 3<X /> · 3 = <span className="pen">3<X />(2<X /> + 3)</span></>, t: <>Både 3 og <X /> er felles.</> },
  { m: <>4<X /><sup>3</sup> − 6<X /><sup>2</sup> = 2<X /><sup>2</sup> · 2<X /> − 2<X /><sup>2</sup> · 3 = <span className="pen">2<X /><sup>2</sup>(2<X /> − 3)</span></>, t: 'Trekk ut så mye som mulig.' },
  { m: <><A /><B /> + <A /> = <A /> · <B /> + <A /> · 1 = <span className="pen"><A />(<B /> + 1)</span></>, t: 'Når hele leddet trekkes ut, står det igjen 1 i parentesen.' },
];

export const FELLES_STEG = TRINN.length;

export const FellesFaktor: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Faktorisere uttrykk</div>
    <h2>Trekk ut det som er felles</h2>
    <div className="boxed">
      <span className="label">Felles faktor</span>
      Det motsatte av å gange inn i en parentes: <span className="math nw"><A /><B /> + <A /><V c="c" /> = <A />(<B /> + <V c="c" />)</span>. Du kan alltid kontrollere svaret ved å gange ut igjen.
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={FELLES_STEG} />
  </div>
);
