import React from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { KurveNavn } from '../felles';

const f = (x: number) => -x + 5;
const g = (x: number) => x / 3 + 1;
const TREDJEDEL = <Frac n="1" d="3" />;

export const TO_LINJER_STEG = 4;

export const ToLinjer: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Skjæring mellom grafer</div>
    <h2>Finn skjæringspunktet mellom grafene</h2>
    <p className="math">
      <span className="c1 nw">
        <Fx /> = −<X /> + 5
      </span>
      &nbsp;&nbsp;<span style={{ fontFamily: 'var(--f-body)', fontSize: '0.75em' }}>og</span>&nbsp;&nbsp;
      <span className="c2 nw">
        <Fx f="g" /> = {TREDJEDEL}
        <X /> + 1
      </span>
    </p>
    <div className="cols">
      <div className="stack">
        <FunkGraf
          kurver={[
            { f, farge: 'c1' },
            { f: g, farge: 'c2' },
          ]}
          punkter={frag >= 1 ? [{ x: 3, y: 2, farge: 'pen', navn: '(3 , 2)', plass: 'over' }] : []}
          ekstra={(s) => (
            <>
              {frag >= 1 && (
                <>
                  <Hjelpelinje s={s} x1={3} y1={2} x2={3} y2={0} farge="pen" />
                  <Hjelpelinje s={s} x1={3} y1={2} x2={0} y2={2} farge="pen" />
                </>
              )}
              <KurveNavn s={s} x={-1.7} y={5.6} farge="c1">
                f
              </KurveNavn>
              <KurveNavn s={s} x={-1.7} y={0.1} farge="c2">
                g
              </KurveNavn>
            </>
          )}
          xmin={-2}
          xmax={6}
          ymin={-1}
          ymax={7}
          h={340}
          title="Grafene til f(x) = −x + 5 og g(x) = x/3 + 1, som skjærer hverandre i (3, 2)"
        />
        {frag >= 1 && (
          <p className="reveal">
            <b>Grafisk:</b> I punktet der grafene møtes, leser vi av <X /> = 3 og <i className="v">y</i> = 2.
          </p>
        )}
      </div>
      <div className="stack">
        <p>
          <b>Ved regning:</b> Vi løser likningen{' '}
          <span className="math">
            <Fx /> = <Fx f="g" />
          </span>
          .
        </p>
        <ol className="steps">
          {frag >= 2 && (
            <li className="reveal">
              <span className="no">1</span>
              <div className="math">
                <span className="mline">
                  −<X /> + 5 = {TREDJEDEL}
                  <X /> + 1 &nbsp;<span className="small muted">| · 3</span>
                </span>
                <span className="mline">
                  −3<X /> + 15 = <X /> + 3
                </span>
              </div>
            </li>
          )}
          {frag >= 3 && (
            <li className="reveal">
              <span className="no">2</span>
              <div className="math">
                <span className="mline">
                  −4<X /> = −12 &nbsp;<span className="small muted">| : (−4)</span>
                </span>
                <span className="mline">
                  <X /> = <span className="c1">3</span>
                </span>
              </div>
            </li>
          )}
          {frag >= 4 && (
            <li className="reveal">
              <span className="no">3</span>
              <div className="stack" style={{ gap: 8 }}>
                <p>
                  Vi finner <i className="v">y</i> ved å sette <X /> = 3 inn i en av funksjonene:
                </p>
                <p className="math">
                  <Fx x="3" />
                  <Op>=</Op>−3 + 5<Op>=</Op>
                  <span className="c2">2</span>
                </p>
                <div className="boxed">
                  Skjæringspunktet er <b className="pen">(3 , 2)</b>.
                </div>
              </div>
            </li>
          )}
        </ol>
        <StepButtons frag={frag} setFrag={setFrag} steps={TO_LINJER_STEG} />
      </div>
    </div>
  </div>
);
