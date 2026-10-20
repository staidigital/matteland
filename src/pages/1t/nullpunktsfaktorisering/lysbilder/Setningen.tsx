import React, { useState } from 'react';
import { Graf, type Rot } from '../../../../presentasjon/Graf';
import { FactorForm, Factored, Gen, Op, Poly, V, X, X1, X2, near } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

export const Setningen: React.FC = () => {
  const [a, setA] = useState(1);
  const [x1, setX1] = useState(-1);
  const [x2, setX2] = useState(3);
  const b = -a * (x1 + x2);
  const c = a * x1 * x2;
  const roots: Rot[] = near(x1, x2)
    ? [{ x: x1, cls: 'c1', name: 'x₁ = x₂' }]
    : [
        { x: x1, cls: 'c1', name: 'x₁' },
        { x: x2, cls: 'c2', name: 'x₂' },
      ];
  return (
    <div className="slide">
      <div className="kicker">Setningen</div>
      <h2>Nullpunktene gir faktorene</h2>
      <div className="boxed math">
        <span className="label">Nullpunktsfaktorisering</span>
        Hvis <Gen /> = 0 har løsningene <X1 /> og <X2 />, er
        <span className="mline">
          <Gen />
          <Op>=</Op>
          <FactorForm farge />
        </span>
      </div>
      <div className="cols">
        <div className="stack">
          <p>
            Velg <V c="a" /> og nullpunktene selv. Begge formene viser samme uttrykk.
          </p>
          <Slider
            id="th-a"
            label={<V c="a" />}
            value={a}
            min={-3}
            max={3}
            step={0.5}
            onChange={(v) => setA(v === 0 ? (a > 0 ? -0.5 : 0.5) : v)}
          />
          <Slider id="th-x1" label={<X1 farge />} value={x1} min={-5} max={5} step={0.5} onChange={setX1} />
          <Slider id="th-x2" label={<X2 farge />} value={x2} min={-5} max={5} step={0.5} onChange={setX2} />
          <div className="panel math">
            <span className="mline">
              <span className="tag muted">Utvidet</span>
              <Poly a={a} b={b} c={c} />
            </span>
            <span className="mline">
              <span className="tag muted">Faktorisert</span>
              <Factored a={a} r1={x1} r2={x2} />
            </span>
          </div>
          <p className="small muted">
            Nullpunktene bestemmer faktorene. Tallet <V c="a" /> står foran fordi begge formene må ha samme <X />
            <sup>2</sup>-ledd.
          </p>
        </div>
        <Graf a={a} b={b} c={c} roots={roots} title="Grafen til uttrykket med valgte nullpunkter" />
      </div>
    </div>
  );
};
