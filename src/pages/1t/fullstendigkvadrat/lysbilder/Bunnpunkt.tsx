import React, { useState } from 'react';
import { Graf } from '../../../../presentasjon/Graf';
import { Factor, minus, Poly, V } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

export const Bunnpunkt: React.FC = () => {
  const [p, setP] = useState(-3);
  const [q, setQ] = useState(-4);
  const b = -2 * p;
  const c = p * p + q;
  return (
    <div className="slide">
      <div className="kicker">Bruk · Grafen</div>
      <h2>Fullstendig kvadrat viser bunnpunktet</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed math">
            <span className="mline"><Poly a={1} b={b} c={c} /></span>
            <span className="mline">= <Factor r={p} /><sup>2</sup> {q === 0 ? '' : q < 0 ? `− ${-q}` : `+ ${q}`}</span>
          </div>
          <Slider id="b-p" label={<V c="p" />} value={p} min={-5} max={5} step={1} onChange={setP} />
          <Slider id="b-q" label={<V c="q" />} value={q} min={-8} max={5} step={1} onChange={setQ} />
          <p>
            Et kvadrat er aldri negativt. Uttrykket er derfor minst når parentesen er 0, altså når{' '}
            <span className="math nw"><V c="x" /> = {minus(p)}</span>. Da er verdien <span className="math">{minus(q)}</span>.
          </p>
          <p className="pen"><b>Bunnpunkt: ({minus(p)}, {minus(q)})</b></p>
        </div>
        <Graf a={1} b={b} c={c} xmin={-8} xmax={8} ymin={-10} ymax={12} point={{ x: p, y: q }} title="Parabel med markert bunnpunkt" />
      </div>
    </div>
  );
};
