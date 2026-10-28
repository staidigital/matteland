import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, V, X1, X2, dec, fmt } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Trekant } from '../felles';

const LINJER = [
  { navn: 'A', a: 0.5, b: 2 },
  { navn: 'B', a: 0.25, b: 1 },
  { navn: 'C', a: -0.75, b: 7 },
];

/** Tall i et regnestykke med parentes rundt negative tall */
const pd = (v: number) => (v < 0 ? `(${dec(v)})` : dec(v));

const Y1 = () => (
  <>
    <V c="y" />
    <sub>1</sub>
  </>
);
const Y2 = () => (
  <>
    <V c="y" />
    <sub>2</sub>
  </>
);

export const ToPunkter: React.FC = () => {
  const [n, setN] = useState(0);
  const [x1, setX1] = useState(2);
  const [x2, setX2] = useState(6);
  const { a, b } = LINJER[n];
  const y1 = a * x1 + b;
  const y2 = a * x2 + b;
  const dx = x2 - x1;
  const dy = y2 - y1;

  return (
    <div className="slide">
      <div className="kicker">Stigningstall fra to punkter</div>
      <h2>Endring i y delt på endring i x</h2>
      <div className="cols">
        <div className="stack">
          <div className="seg" role="group" aria-label="Velg linje" style={{ alignSelf: 'start' }}>
            {LINJER.map((l, i) => (
              <button key={l.navn} aria-pressed={n === i} onClick={() => setN(i)}>
                Linje {l.navn}
              </button>
            ))}
          </div>
          <Slider id="tp-p" label={<>P: <X1 /></>} value={x1} min={0} max={8} step={1} onChange={setX1} />
          <Slider id="tp-q" label={<>Q: <X2 /></>} value={x2} min={0} max={8} step={1} onChange={setX2} />
          <div className="boxed math">
            <V c="a" /> ={' '}
            <Frac
              n={
                <span className="c2">
                  Δ<V c="y" />
                </span>
              }
              d={
                <span className="c1">
                  Δ<V c="x" />
                </span>
              }
            />{' '}
            ={' '}
            <Frac
              n={
                <>
                  <Y2 /> − <Y1 />
                </>
              }
              d={
                <>
                  <X2 /> − <X1 />
                </>
              }
            />
            {dx !== 0 && (
              <>
                {' '}
                ={' '}
                <Frac
                  n={
                    <span className="c2">
                      {dec(y2)} − {pd(y1)}
                    </span>
                  }
                  d={
                    <span className="c1">
                      {x2} − {x1}
                    </span>
                  }
                />{' '}
                ={' '}
                <Frac n={<span className="c2">{dec(dy)}</span>} d={<span className="c1">{dx}</span>} /> ={' '}
                <b>{fmt(dy / dx)}</b>
              </>
            )}
          </div>
          {dx === 0 ? (
            <p className="fb bad">Δx = 0. Vi kan ikke dele på null, så velg to forskjellige punkter.</p>
          ) : (
            <p className="small muted">
              Flytt P og Q. Stigningstallet blir det samme uansett hvilke to punkter på linja vi velger. Velg gjerne
              punkter du kan lese av presist.
            </p>
          )}
        </div>
        <FunkGraf
          kurver={[{ f: (x) => a * x + b }]}
          punkter={[
            { x: x1, y: y1, farge: 'pen', navn: 'P', plass: dx >= 0 ? 'venstre' : 'hoyre' },
            { x: x2, y: y2, farge: 'pen', navn: 'Q', plass: dx >= 0 ? 'hoyre' : 'venstre' },
          ]}
          ekstra={(s) => dx !== 0 && <Trekant s={s} x={x1} y={y1} dx={dx} dy={dy} tekstX={`Δx = ${dx}`} tekstY={`Δy = ${dec(dy)}`} />}
          xmin={-1}
          xmax={10}
          ymin={-1}
          ymax={9}
          h={420}
          title={`Linje ${LINJER[n].navn} med punktene P og Q og stigningstrekanten mellom dem`}
        />
      </div>
    </div>
  );
};
