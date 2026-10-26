import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Op, X, minus, par } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Fx, Verditabell } from '../felles';

const f = (x: number) => 10 * x + 200;
const TABELL = [-2, 0, 3, 5, 10];

export const TreFormer: React.FC = () => {
  const [x, setX] = useState(3);
  const y = f(x);
  return (
    <div className="slide">
      <div className="kicker">Representasjoner</div>
      <h2>Uttrykk, tabell og graf</h2>
      <div className="cols">
        <div className="stack">
          <div className="panel stack" style={{ gap: 6 }}>
            <h3>Funksjonsuttrykk</h3>
            <div className="math">
              <Fx x={<span className="c1">{minus(x)}</span>} />
              <Op>=</Op>
              10 · {par(x)} + 200
              <Op>=</Op>
              <span className="c2">{minus(y)}</span>
            </div>
          </div>
          <div className="panel stack" style={{ gap: 6 }}>
            <h3>Verditabell</h3>
            <Verditabell x={<X />} y={<Fx />} xs={TABELL} ys={TABELL.map(f)} pa={TABELL.indexOf(x)} />
          </div>
          <Slider id="tf-x" label={<X />} value={x} min={-3} max={12} step={1} onChange={setX} />
          <div className="boxed">
            En funksjon kan være gitt ved et <b>funksjonsuttrykk</b>, en <b>tabell</b> eller en <b>graf</b>. Alle
            punktene på grafen har koordinater{' '}
            <span className="math">
              (<X /> , <Fx />)
            </span>
            .
          </div>
        </div>
        <div className="stack">
          <h3>Graf</h3>
          <FunkGraf
            kurver={[{ f }]}
            punkter={[
              ...TABELL.map((t) => ({ x: t, y: f(t), farge: 'muted' })),
              { x, y, farge: 'pen', navn: `(${minus(x)} , ${minus(y)})`, plass: x > 8 ? ('venstre' as const) : ('hoyre' as const) },
            ]}
            ekstra={(s) => (
              <>
                <Hjelpelinje s={s} x1={x} y1={0} x2={x} y2={y} farge="c1" />
                <Hjelpelinje s={s} x1={x} y1={y} x2={0} y2={y} farge="c2" />
              </>
            )}
            xmin={-4}
            xmax={13}
            ymin={-60}
            ymax={360}
            ysteg={20}
            yetikett={100}
            ynavn="f(x)"
            title="Grafen til f(x) = 10x + 200 med punktene fra verditabellen"
          />
          <p className="small muted">
            Vi setter punktene fra tabellen inn i koordinatsystemet og trekker en sammenhengende kurve gjennom dem.
          </p>
        </div>
      </div>
    </div>
  );
};
