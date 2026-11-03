import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx, Intervall, Mengde } from '../../funksjoner/felles';
import { Pol, Symmetrilinje, polynom } from '../felles';

const K = [2, -4, -6];
const f = polynom(K);

export const EKS14_STEG = 5;

export const Eksempel14: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel 14 · Symmetrilinje, ekstremalpunkt og nullpunkter</div>
    <h2>Undersøk andregradsfunksjonen</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed math big">
          <Fx />
          <Op>=</Op>
          <Pol k={K} />
        </div>
        <p className="small muted">Finn symmetrilinja, ekstremalpunktet, verdimengden og nullpunktene. Tegn grafen.</p>
        {frag >= 1 && (
          <div className="math reveal">
            <b className="tag">a</b>
            <X /> = <Frac n="−(−4)" d="2 · 2" /> = <b className="pen">1</b>
          </div>
        )}
        {frag >= 2 && (
          <div className="reveal">
            <b className="tag">b</b>
            Tallet foran <i className="v">x</i>
            <sup>2</sup> er positivt, så grafen har et <b>bunnpunkt</b>.{' '}
            <span className="math nw">
              <Fx x="1" /> = 2 · 1<sup>2</sup> − 4 · 1 − 6 = −8
            </span>
            . Bunnpunktet er <b className="pen nw">(1 , −8)</b>.
          </div>
        )}
        {frag >= 3 && (
          <div className="reveal">
            <b className="tag">c</b>
            −8 er den laveste y-verdien, så{' '}
            <span className="math nw">
              <Mengde m="V" /> = <Intervall a={-8} b={Infinity} />
            </span>
            .
          </div>
        )}
        {frag >= 4 && (
          <div className="math reveal">
            <b className="tag">d</b>
            <X /> ={' '}
            <Frac
              n={
                <>
                  −(−4) ± √
                  <span className="rad">
                    (−4)<sup>2</sup> − 4 · 2 · (−6)
                  </span>
                </>
              }
              d="2 · 2"
            />{' '}
            = <Frac n="4 ± 8" d="4" />
            <span className="mline">
              <X /> = <b className="c1">−1</b> &nbsp;eller&nbsp; <X /> = <b className="c2">3</b>
            </span>
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={EKS14_STEG} />
      </div>
      <FunkGraf
        kurver={frag >= 5 ? [{ f }] : []}
        punkter={[
          ...(frag >= 2 ? [{ x: 1, y: -8, farge: 'pen', navn: '(1 , −8)', plass: 'hoyre' as const }] : []),
          ...(frag >= 4
            ? [
                { x: -1, y: 0, farge: 'c1', navn: '(−1 , 0)', plass: 'venstre' as const },
                { x: 3, y: 0, farge: 'c2', navn: '(3 , 0)', plass: 'hoyre' as const },
              ]
            : []),
        ]}
        ekstra={(s) => (
          <>
            {frag >= 1 && <Symmetrilinje sx={s.sx} H={s.H} p={1} />}
            {frag >= 3 && (
              <line
                className="g-band"
                x1={s.sx(0)}
                y1={s.sy(-8)}
                x2={s.sx(0)}
                y2={0}
                style={{ stroke: 'var(--pen)' }}
              />
            )}
          </>
        )}
        xmin={-3}
        xmax={5}
        ymin={-10}
        ymax={6}
        xetikett={1}
        h={440}
        title="Grafen til f(x) = 2x² − 4x − 6 med symmetrilinje, bunnpunkt og nullpunkter"
      />
    </div>
  </div>
);
