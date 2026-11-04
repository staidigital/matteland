import React from 'react';
import { Frac, V } from '../../../../presentasjon/matte';

const A = () => <V c="a" />;
const B = () => <V c="b" />;
const C = () => <V c="c" />;
const D = () => <V c="d" />;

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="grid2">
      <div className="panel stack" style={{ gap: 6 }}>
        <h3 className="pen">Forkorte</h3>
        <span className="math nw"><Frac n={<><A /> · <V c="k" /></>} d={<><B /> · <V c="k" /></>} /> = <Frac n={<A />} d={<B />} /></span>
        <p className="small muted">Bare faktorer kan strykes, ikke ledd.</p>
      </div>
      <div className="panel stack" style={{ gap: 6 }}>
        <h3 className="pen">Pluss og minus</h3>
        <span className="math nw"><Frac n={<A />} d={<C />} /> + <Frac n={<B />} d={<C />} /> = <Frac n={<><A /> + <B /></>} d={<C />} /></span>
        <p className="small muted">Finn fellesnevner først.</p>
      </div>
      <div className="panel stack" style={{ gap: 6 }}>
        <h3 className="pen">Gange</h3>
        <span className="math nw"><Frac n={<A />} d={<B />} /> · <Frac n={<C />} d={<D />} /> = <Frac n={<><A /><C /></>} d={<><B /><D /></>} /></span>
        <p className="small muted">Forkort gjerne før du ganger.</p>
      </div>
      <div className="panel stack" style={{ gap: 6 }}>
        <h3 className="pen">Dele</h3>
        <span className="math nw"><Frac n={<A />} d={<B />} /> : <Frac n={<C />} d={<D />} /> = <Frac n={<A />} d={<B />} /> · <Frac n={<D />} d={<C />} /></span>
        <p className="small muted">Gang med den omvendte.</p>
      </div>
    </div>
    <p className="muted">
      Nevneren kan aldri være 0. I likninger med brøk ganger vi alle leddene med fellesnevneren, og så er brøkene borte.
    </p>
  </div>
);
