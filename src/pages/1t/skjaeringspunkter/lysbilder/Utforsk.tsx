import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Op, X, dec, near } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { KurveNavn, pkt } from '../felles';

const f = (x: number) => x + 2;
const g = (x: number) => -x + 4;

/** Tall i et regnestykke, med parentes rundt negative tall: (−1,5) */
const p = (x: number) => (x < 0 ? `(${dec(x)})` : dec(x));

export const Utforsk: React.FC = () => {
  const [x, setX] = useState(-1);
  const lik = near(f(x), g(x));

  return (
    <div className="slide">
      <div className="kicker">Utforsk · Skjæring mellom grafer</div>
      <h2>
        Når er{' '}
        <span className="math">
          <Fx /> = <Fx f="g" />
        </span>
        ?
      </h2>
      <div className="cols">
        <div className="stack">
          <p>
            Flytt <X /> og se på funksjonsverdiene. Finn <X />
            -verdien der de to funksjonene gir samme svar.
          </p>
          <Slider id="ut-x" label={<X />} value={x} min={-2} max={4} step={0.5} onChange={setX} />
          <div className="panel math">
            <span className="mline">
              <Fx x={<span>{dec(x)}</span>} />
              <Op>=</Op>
              {p(x)} + 2<Op>=</Op>
              <span className="c1">{dec(f(x))}</span>
            </span>
            <span className="mline">
              <Fx f="g" x={<span>{dec(x)}</span>} />
              <Op>=</Op>−{p(x)} + 4<Op>=</Op>
              <span className="c2">{dec(g(x))}</span>
            </span>
          </div>
          {lik ? (
            <div className="boxed reveal">
              <span className="label">Samme verdi</span>
              <span className="math">
                <Fx x="1" /> = <Fx f="g" x="1" /> = 3
              </span>
              <p style={{ marginTop: 6 }}>
                Grafene skjærer hverandre i <b className="pen">(1 , 3)</b>. Og <X /> = 1 er løsningen av likningen{' '}
                <span className="math nw">
                  <X /> + 2 = −<X /> + 4
                </span>
                .
              </p>
            </div>
          ) : (
            <p className="muted">
              Nå er <Fx /> {f(x) < g(x) ? 'mindre' : 'større'} enn <Fx f="g" />. Avstanden er{' '}
              {dec(Math.abs(f(x) - g(x)))}.
            </p>
          )}
        </div>
        <FunkGraf
          kurver={[
            { f, farge: 'c1' },
            { f: g, farge: 'c2' },
          ]}
          punkter={
            lik
              ? [{ x, y: f(x), farge: 'pen', navn: pkt(x, f(x), 0), plass: 'over' }]
              : [
                  { x, y: f(x), farge: 'c1' },
                  { x, y: g(x), farge: 'c2' },
                ]
          }
          ekstra={(s) => (
            <>
              <Hjelpelinje s={s} x1={x} y1={0} x2={x} y2={Math.max(f(x), g(x))} farge="muted" />
              <KurveNavn s={s} x={4.3} y={5.4} farge="c1">
                f
              </KurveNavn>
              <KurveNavn s={s} x={-2.6} y={5.6} farge="c2">
                g
              </KurveNavn>
            </>
          )}
          xmin={-3}
          xmax={5}
          ymin={-1}
          ymax={7}
          h={400}
          title="Grafene til f(x) = x + 2 og g(x) = −x + 4 med en loddrett linje ved valgt x"
        />
      </div>
    </div>
  );
};
