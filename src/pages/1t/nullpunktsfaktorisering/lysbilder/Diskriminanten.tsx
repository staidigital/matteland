import React, { useState } from 'react';
import { Graf, type Rot } from '../../../../presentasjon/Graf';
import { Factored, Frac, Op, Poly, V, X, minus, par } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

export const Diskriminanten: React.FC = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);
  const D = b * b - 4 * a * c;

  let r1 = 0;
  let r2 = 0;
  if (D >= 0) {
    const s = Math.sqrt(D);
    const u = (-b - s) / (2 * a);
    const w = (-b + s) / (2 * a);
    r1 = Math.min(u, w);
    r2 = Math.max(u, w);
  }
  const kvadrattall = D > 0 && Number.isInteger(Math.sqrt(D));
  const roots: Rot[] =
    D === 0
      ? [{ x: r1, cls: 'c1', name: 'x₁ = x₂' }]
      : D > 0
        ? [
            { x: r1, cls: 'c1', name: 'x₁' },
            { x: r2, cls: 'c2', name: 'x₂' },
          ]
        : [];

  const tilfelle =
    D > 0
      ? { tekst: 'D > 0 · to nullpunkter', farge: 'var(--r1)' }
      : D === 0
        ? { tekst: 'D = 0 · ett nullpunkt', farge: 'var(--pen)' }
        : { tekst: 'D < 0 · ingen nullpunkter', farge: 'var(--muted)' };

  return (
    <div className="slide">
      <div className="kicker">Diskriminanten</div>
      <h2>Går det alltid an å faktorisere?</h2>
      <div className="cols">
        <div className="stack">
          <p>
            Tallet under rottegnet,{' '}
            <span className="math">
              <V c="D" /> = <V c="b" />
              <sup>2</sup> − 4<V c="a" />
              <V c="c" />
            </span>
            , avgjør hvor mange nullpunkter vi får.
          </p>
          <Slider
            id="d-a"
            label={<V c="a" />}
            value={a}
            min={-3}
            max={3}
            step={1}
            onChange={(v) => setA(v === 0 ? (a > 0 ? -1 : 1) : v)}
          />
          <Slider id="d-b" label={<V c="b" />} value={b} min={-8} max={8} step={1} onChange={setB} />
          <Slider id="d-c" label={<V c="c" />} value={c} min={-10} max={10} step={1} onChange={setC} />
          <div className="panel stack" style={{ gap: 10 }}>
            <div className="math">
              <Poly a={a} b={b} c={c} />
            </div>
            <div className="row">
              <span className="math">
                <V c="D" /> = {par(b)}
                <sup>2</sup> − 4·{par(a)}·{par(c)} = {minus(D)}
              </span>
              <span className="pill" style={{ color: tilfelle.farge }}>
                {tilfelle.tekst}
              </span>
            </div>
            <div className="math">
              {D < 0 ? (
                <span className="muted" style={{ fontFamily: 'var(--f-body)', fontSize: '0.75em' }}>
                  Grafen treffer aldri <X />
                  -aksen, så uttrykket kan ikke nullpunktsfaktoriseres.
                </span>
              ) : (
                <>
                  <Poly a={a} b={b} c={c} />
                  <Op>=</Op>
                  <Factored a={a} r1={r1} r2={r2} />
                </>
              )}
            </div>
            {D > 0 && !kvadrattall && (
              <p className="small muted">
                {D} er ikke et kvadrattall, så nullpunktene blir irrasjonale:{' '}
                <span className="math">
                  <X /> ={' '}
                  <Frac
                    n={
                      <>
                        {minus(-b)} ± √{D}
                      </>
                    }
                    d={minus(2 * a)}
                  />
                </span>
                . Faktoriseringen gjelder fortsatt med disse eksakte tallene.
              </p>
            )}
          </div>
        </div>
        <Graf a={a} b={b} c={c} roots={roots} title="Grafen til uttrykket valgt med glidebryterne" />
      </div>
    </div>
  );
};
