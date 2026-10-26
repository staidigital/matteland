import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { X, minus } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Fx, Intervall, Mengde } from '../felles';

const f = (x: number) => 10 * x + 200;

export const DefVerdi: React.FC = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(12);
  const [aMed, setAMed] = useState(false);
  const [bMed, setBMed] = useState(true);

  const endepunkt = (x: number, med: boolean) => (
    <>
      Punktet ({minus(x)} , {minus(f(x))}) er {med ? 'med (fylt sirkel)' : 'ikke med (åpen sirkel)'}.
    </>
  );

  return (
    <div className="slide">
      <div className="kicker">Definisjonsmengde og verdimengde</div>
      <h2>Hvilke x kan vi bruke, og hvilke f(x) får vi?</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed stack" style={{ gap: 6 }}>
            <p>
              <b className="c1">
                Definisjonsmengden <Mengde m="D" />
              </b>{' '}
              viser hvilke verdier <X /> kan ha.
            </p>
            <p>
              <b className="c2">
                Verdimengden <Mengde m="V" />
              </b>{' '}
              viser hvilke verdier <Fx /> kan få.
            </p>
          </div>
          <p className="math">
            <Fx /> = 10<X /> + 200
          </p>
          <Slider id="dv-a" label="Fra" value={a} min={-3} max={11} step={1} onChange={(v) => setA(Math.min(v, b - 1))} />
          <Slider id="dv-b" label="Til" value={b} min={-2} max={12} step={1} onChange={(v) => setB(Math.max(v, a + 1))} />
          <div className="row" style={{ gap: 20 }}>
            <label className="check">
              <input type="checkbox" checked={aMed} onChange={(e) => setAMed(e.target.checked)} />
              {minus(a)} er med
            </label>
            <label className="check">
              <input type="checkbox" checked={bMed} onChange={(e) => setBMed(e.target.checked)} />
              {minus(b)} er med
            </label>
          </div>
          <div className="panel math">
            <span className="mline c1">
              <Mengde m="D" /> = <Intervall a={a} b={b} aMed={aMed} bMed={bMed} />
            </span>
            <span className="mline c2">
              <Mengde m="V" /> = <Intervall a={f(a)} b={f(b)} aMed={aMed} bMed={bMed} />
            </span>
          </div>
          <p className="small muted">
            {endepunkt(a, aMed)} {endepunkt(b, bMed)}
          </p>
        </div>
        <FunkGraf
          kurver={[{ f, fra: a, til: b }]}
          punkter={[
            { x: a, y: f(a), apen: !aMed },
            { x: b, y: f(b), apen: !bMed },
          ]}
          ekstra={(s) => (
            <>
              <line className="g-band" x1={s.sx(a)} x2={s.sx(b)} y1={s.sy(0)} y2={s.sy(0)} style={{ stroke: 'var(--r1)' }} />
              <line className="g-band" x1={s.sx(0)} x2={s.sx(0)} y1={s.sy(f(a))} y2={s.sy(f(b))} style={{ stroke: 'var(--r2)' }} />
              <Hjelpelinje s={s} x1={a} y1={f(a)} x2={0} y2={f(a)} farge="c2" />
              <Hjelpelinje s={s} x1={b} y1={f(b)} x2={0} y2={f(b)} farge="c2" />
              <Hjelpelinje s={s} x1={a} y1={f(a)} x2={a} y2={0} farge="c1" />
              <Hjelpelinje s={s} x1={b} y1={f(b)} x2={b} y2={0} farge="c1" />
            </>
          )}
          xmin={-4}
          xmax={13}
          ymin={-60}
          ymax={360}
          ysteg={20}
          yetikett={100}
          ynavn="f(x)"
          title="Grafen til f(x) = 10x + 200 med definisjonsmengden markert på x-aksen og verdimengden på y-aksen"
        />
      </div>
    </div>
  );
};
