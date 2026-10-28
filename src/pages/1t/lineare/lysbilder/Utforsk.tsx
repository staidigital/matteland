import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op, Poly, X, dec } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Trekant } from '../felles';

export const Utforsk: React.FC = () => {
  const [a, setA] = useState(2);
  const [b, setB] = useState(-3);
  const [spor, setSpor] = useState(false);

  return (
    <div className="slide">
      <div className="kicker">Utforsk</div>
      <h2>Hva gjør a og b med linja?</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed math big">
            <Fx />
            <Op>=</Op>
            <Poly a={0} b={a} c={b} />
          </div>
          <Slider id="ut-a" label={<span className="c2">a</span>} value={a} min={-3} max={3} step={0.5} onChange={setA} />
          <Slider id="ut-b" label={<span className="pen">b</span>} value={b} min={-5} max={5} step={1} onChange={setB} />
          <div className="panel stack" style={{ gap: 8 }}>
            <p>
              <b className="c2">a = {dec(a)}:</b>{' '}
              {a > 0
                ? 'linja stiger mot høyre.'
                : a < 0
                  ? 'linja synker mot høyre.'
                  : 'linja er parallell med x-aksen.'}{' '}
              {a !== 0 && (
                <>
                  Når <X /> øker med 1, {a > 0 ? 'øker' : 'minker'} funksjonsverdien med {dec(Math.abs(a))}.
                </>
              )}
            </p>
            <p>
              <b className="pen">b = {dec(b)}:</b> linja skjærer y-aksen i <span className="nw">(0 , {dec(b)})</span>
              {b === 0 && ', altså i origo'}.
            </p>
          </div>
          <label className="check">
            <input type="checkbox" checked={spor} onChange={(e) => setSpor(e.target.checked)} />
            Vis linjer med samme <span className="c2">a</span> (parallelle)
          </label>
        </div>
        <FunkGraf
          kurver={[
            ...(spor ? [-4, -2, 2, 4].map((d) => ({ f: (x: number) => a * x + b + d, farge: 'muted' })) : []),
            { f: (x: number) => a * x + b },
          ]}
          punkter={[{ x: 0, y: b, farge: 'pen' }]}
          ekstra={(s) => a !== 0 && <Trekant s={s} x={0} y={b} dx={1} dy={a} tekstY={dec(a)} />}
          xmin={-6}
          xmax={6}
          ymin={-7}
          ymax={7}
          h={420}
          title={`Grafen til f(x) = ${dec(a)}x + ${dec(b)}`}
        />
      </div>
    </div>
  );
};
