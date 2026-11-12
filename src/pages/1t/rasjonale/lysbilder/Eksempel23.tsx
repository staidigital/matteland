import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx, Mengde, Verditabell } from '../../funksjoner/felles';
import { Asymptoter, Ras, ras } from '../felles';

const f = ras(2, -1, 1, 3);
const XS = [-2, -1, 0, 1, 2, 3, 4];
const YS = ['−5', '−3/2', '−1/3', '1/4', '3/5', '5/6', '1'];

export const EKS23_STEG = 5;

export const Eksempel23: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel 23 · Asymptoter og skisse</div>
    <h2>Fra uttrykk til graf</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed math">
          <Fx />
          <Op>=</Op>
          <Ras a={2} b={-1} c={1} d={3} />
        </div>
        {frag >= 1 && (
          <div className="panel reveal">
            <b>a</b> &nbsp;Horisontal asymptote:{' '}
            <span className="math nw">
              y = <Frac n="2" d="1" /> = 2
            </span>
            <br />
            Vertikal asymptote:{' '}
            <span className="math nw">
              <X /> + 3 = 0 &nbsp;⇒&nbsp; <X /> = −3
            </span>
          </div>
        )}
        {frag >= 2 && (
          <div className="panel reveal">
            <b>b</b> &nbsp;
            <span className="math nw">
              <Mengde m="D" /> = ℝ \ {'{'}−3{'}'}
            </span>{' '}
            &nbsp;og&nbsp;{' '}
            <span className="math nw">
              <Mengde m="V" /> = ℝ \ {'{'}2{'}'}
            </span>
            <p className="small muted">
              <X /> kan ikke være −3 (nevneren blir null), og <Fx /> blir aldri nøyaktig 2 (grafen treffer aldri den
              horisontale asymptoten).
            </p>
          </div>
        )}
        {frag >= 5 && (
          <p className="reveal">
            Grafen er symmetrisk om <b className="c2 nw">(−3 , 2)</b>, så vi speiler den andre delen om dette punktet.
          </p>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={EKS23_STEG} />
      </div>
      <div className="stack">
        <FunkGraf
          kurver={[
            ...(frag >= 4 ? [{ f, fra: -2.85, farge: 'c1' }] : []),
            ...(frag >= 5 ? [{ f, til: -3.15, farge: 'c1' }] : []),
          ]}
          punkter={[
            ...(frag >= 3 ? XS.map((x) => ({ x, y: f(x), farge: 'pen' })) : []),
            ...(frag >= 5 ? XS.map((x) => ({ x: -6 - x, y: 4 - f(x), apen: true, farge: 'muted' })) : []),
            ...(frag >= 5 ? [{ x: -3, y: 2, farge: 'c2' }] : []),
          ]}
          ekstra={(s) => (frag >= 1 ? <Asymptoter s={s} r={2} x={-3} /> : null)}
          xmin={-12}
          xmax={8}
          ymin={-10}
          ymax={12}
          xsteg={1}
          ysteg={1}
          xetikett={2}
          yetikett={2}
          h={400}
          title="Grafen til f(x) = (2x − 1)/(x + 3) med asymptotene y = 2 og x = −3"
        />
        {frag >= 3 && (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <span>
              <b>c</b> &nbsp;Verditabell på den ene siden av <X /> = −3:
            </span>
            <Verditabell x={<X />} y={<i className="v">y</i>} xs={XS} ys={YS} />
          </div>
        )}
        <p className="hintline">Oppgaver: 3.57–3.62</p>
      </div>
    </div>
  </div>
);
