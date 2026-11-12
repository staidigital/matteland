import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, X, dec } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { TV_X, TV_Y, avvik, tilpass } from '../felles';

const reg = tilpass('lin', TV_X, TV_Y)!;
const hand = (x: number) => -5.25 * x + 110;

export const EKS24_STEG = 3;

export const Eksempel24: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [a, setA] = useState(-2);
  const [b, setB] = useState(100);
  const din = (x: number) => a * x + b;

  return (
    <div className="slide">
      <div className="kicker">Eksempel 24 · Lineær modell</div>
      <h2>Legg linjalen der den passer best</h2>
      <div className="cols">
        <div className="stack">
          <p>
            Finn en lineær modell <span className="math nw"><Fx f="g" /></span> for seertiden. Prøv først selv:
          </p>
          <Slider id="e24-a" label={<span className="c2">a</span>} value={a} min={-10} max={2} step={0.1} onChange={(v) => setA(+v.toFixed(1))} />
          <Slider id="e24-b" label={<span className="c2">b</span>} value={b} min={80} max={130} step={1} onChange={setB} />
          <p className="math">
            <span className="c2">
              y = {dec(a, 1)}<X /> + {b}
            </span>
            <span className="small muted" style={{ fontFamily: 'var(--f-body)' }}>
              {' '}
              &nbsp;avvik²: {Math.round(avvik(din, TV_X, TV_Y))}
            </span>
          </p>
          {frag >= 1 && (
            <div className="panel reveal">
              <b>For hånd</b> &nbsp;Vi tegner linja vi synes passer best, og leser av konstantleddet <span className="math nw">b = 110</span>.
            </div>
          )}
          {frag >= 2 && (
            <div className="panel reveal">
              To punkter på linja gir stigningstallet:
              <span className="mline math">
                a = <Frac n="endring i y" d="endring i x" /> = <Frac n="−42" d="8" /> ≈ −5,25
              </span>
              <span className="math nw">
                <Fx f="g" /> ≈ −5,3<X /> + 110
              </span>{' '}
              <span className="small muted">&nbsp;avvik²: {Math.round(avvik(hand, TV_X, TV_Y))}</span>
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={EKS24_STEG} />
        </div>
        <div className="stack">
          <FunkGraf
            kurver={[
              { f: din, fra: -1, til: 12, farge: 'c2' },
              ...(frag >= 1 ? [{ f: hand, fra: -1, til: 12, farge: 'c1' }] : []),
              ...(frag >= 3 ? [{ f: reg.f, fra: -1, til: 12, farge: 'pen' }] : []),
            ]}
            punkter={TV_X.map((x, i) => ({ x, y: TV_Y[i], farge: 'ink' }))}
            ekstra={(s) =>
              frag >= 1 && frag < 3 ? (
                <>
                  <Hjelpelinje s={s} x1={0} y1={110} x2={8} y2={110} farge="muted" />
                  <Hjelpelinje s={s} x1={8} y1={110} x2={8} y2={68} farge="muted" />
                  <text className="g-txt" x={s.sx(4)} y={s.sy(110) - 8} textAnchor="middle">
                    8
                  </text>
                  <text className="g-txt" x={s.sx(8.2)} y={s.sy(89)}>
                    −42
                  </text>
                </>
              ) : null
            }
            xmin={-0.8}
            xmax={11}
            ymin={0}
            ymax={130}
            ysteg={10}
            yetikett={20}
            xetikett={1}
            h={380}
            xnavn="år etter 2015"
            ynavn="min/dag"
            title="Seertid med din linje, linja for hånd og regresjonslinja"
          />
          {frag >= 3 && (
            <div className="panel reveal">
              <b>GeoGebra</b> &nbsp;Regneark → Regresjonsanalyse → Lineær:
              <span className="mline math pen">
                <Fx f="g" />
                <Op>=</Op>−5,2<X /> + 109,3
              </span>
              <span className="small muted">avvik²: {Math.round(avvik(reg.f, TV_X, TV_Y))}, det minste som er mulig</span>
            </div>
          )}
          <p className="hintline">
            Avvik² er summen av de kvadrerte avstandene fra punktene til linja. Jo mindre, jo bedre passer linja. Oppgave 3.63.
          </p>
        </div>
      </div>
    </div>
  );
};
