import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, X, dec } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Fx, Mengde } from '../../funksjoner/felles';
import { Asymptoter as Linjer, Ras, hyperbel, ras } from '../felles';

const f = ras(2, -3, 4, 6);
const TREDJEDELER = <Frac n="3" d="2" />;

export const ASYMPTOTER_STEG = 4;

export const Asymptoter: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [x, setX] = useState(3);
  const y = f(x);

  return (
    <div className="slide">
      <div className="kicker">Asymptoter</div>
      <h2>Hvilke linjer nærmer grafen seg?</h2>
      <div className="cols">
        <div className="stack">
          <div className="row" style={{ gap: 18 }}>
            <span className="boxed math">
              <Fx />
              <Op>=</Op>
              <Ras a={2} b={-3} c={4} d={6} />
            </span>
          </div>
          {frag >= 1 && frag < 4 && (
            <div className="panel reveal">
              <b>Svært store og svært små x</b>
              <span className="mline math">
                <Fx x="1000" /> = <Frac n="1997" d="4006" /> ≈ 0,4985 &nbsp;&nbsp; <Fx x="−1000" /> ={' '}
                <Frac n="−2003" d="−3994" /> ≈ 0,502
              </span>
              <span className="small">
                −3 og 6 betyr lite, og <Frac n={<>2<X /></>} d={<>4<X /></>} /> = <Frac n="1" d="2" />.{' '}
                <b className="c2">Horisontal asymptote</b>{' '}
                <span className="math nw">
                  y = <Frac n="1" d="2" />
                </span>
              </span>
            </div>
          )}
          {frag >= 2 && frag < 4 && (
            <div className="panel reveal">
              <b>Nevneren er null</b> &nbsp;
              <span className="math nw">
                4<X /> + 6 = 0 &nbsp;⇒&nbsp; <X /> = −{TREDJEDELER}
              </span>
            </div>
          )}
          {frag >= 3 && frag < 4 && (
            <div className="panel reveal">
              <b>Rett ved siden av</b>
              <span className="mline math">
                <Fx x="−1,501" /> = <Frac n="−6,002" d="−0,004" /> = 1500,5 &nbsp;&nbsp; <Fx x="−1,499" /> ={' '}
                <Frac n="−5,998" d="0,004" /> = −1499,5
              </span>
              <span className="small">
                <b className="c2">Vertikal asymptote</b>{' '}
                <span className="math nw">
                  <X /> = −{TREDJEDELER}
                </span>
              </span>
            </div>
          )}
          {frag >= 4 && (
            <>
              <div className="panel reveal">
                <span className="c2">
                  Horisontal: <span className="math nw">y = <Frac n="1" d="2" /></span>
                </span>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <span className="c2">
                  Vertikal: <span className="math nw"><X /> = −{TREDJEDELER}</span>
                </span>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                <span className="math nw">
                  <Mengde m="D" /> = ℝ \ {'{'}−{TREDJEDELER}
                  {'}'}
                </span>
              </div>
              <div className="boxed reveal">
                <span className="label">Asymptoter</span>
                <p className="small">
                  <span className="math nw">y = r</span> er en <b>horisontal asymptote</b> hvis <Fx /> nærmer seg{' '}
                  <i className="v">r</i> når <X /> blir svært stor.
                </p>
                <p className="small">
                  <span className="math nw">
                    <X /> = s
                  </span>{' '}
                  er en <b>vertikal asymptote</b> hvis <Fx /> vokser over alle grenser når <X /> nærmer seg{' '}
                  <i className="v">s</i>.
                </p>
              </div>
            </>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={ASYMPTOTER_STEG} />
        </div>
        <div className="stack">
          <FunkGraf
            kurver={hyperbel(2, -3, 4, 6, 'c1')}
            punkter={isFinite(y) ? [{ x, y, farge: 'pen' }] : []}
            ekstra={(s) => <Linjer s={s} r={frag >= 1 ? 0.5 : undefined} x={frag >= 3 ? -1.5 : undefined} />}
            xmin={-6}
            xmax={6}
            ymin={-5}
            ymax={5}
            h={380}
            title="Grafen til f(x) = (2x − 3)/(4x + 6)"
          />
          <Slider id="asy-x" label={<X />} value={x} min={-6} max={6} step={0.01} onChange={(v) => setX(+v.toFixed(3))} />
          <p className="math">
            {isFinite(y) ? (
              <>
                <Fx x={dec(x, 3)} /> = <b className="pen">{dec(y, 3)}</b>
              </>
            ) : (
              <>
                <Fx x={dec(x, 3)} /> er ikke definert
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
