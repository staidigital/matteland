import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, Num, Op, V, X, near } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Asymptoter, Ras, hyperbel } from '../felles';

/** Linjer fra bokas eksempler og oppgaver */
const BOKA: [string, [number, number, number, number]][] = [
  ['1/x', [0, 1, 1, 0]],
  ['(2x − 3)/(4x + 6)', [2, -3, 4, 6]],
  ['(2x − 1)/(x + 3)', [2, -1, 1, 3]],
  ['(3x + 4)/(2x − 4)', [3, 4, 2, -4]],
  ['(−2x + 1)/(3x + 15)', [-2, 1, 3, 15]],
];

export const FinneAsymptotene: React.FC = () => {
  const [[a, b, c, d], setK] = useState<[number, number, number, number]>([2, -1, 1, 3]);
  const sett = (i: number) => (v: number) => setK((k) => k.map((u, j) => (j === i ? v : u)) as [number, number, number, number]);

  const lineaer = c === 0;
  const konstant = !lineaer && near(a * d - b * c, 0);
  const r = lineaer ? undefined : a / c;
  const s = lineaer ? undefined : -d / c;

  return (
    <div className="slide">
      <div className="kicker">Å finne asymptotene</div>
      <h2>Les asymptotene rett av uttrykket</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed">
            <span className="label">Regel</span>
            <span className="math">
              <Fx /> ={' '}
              <Frac
                n={
                  <>
                    <V c="a" />
                    <X /> + <V c="b" />
                  </>
                }
                d={
                  <>
                    <V c="c" />
                    <X /> + <V c="d" />
                  </>
                }
              />
            </span>
            <p>
              Horisontal asymptote:{' '}
              <span className="math nw">
                y = <Frac n={<V c="a" />} d={<V c="c" />} />
              </span>
              <span className="small muted"> &nbsp;(b og d betyr lite når x er stor)</span>
            </p>
            <p>
              Vertikal asymptote:{' '}
              <span className="math nw">
                <X /> = −<Frac n={<V c="d" />} d={<V c="c" />} />
              </span>
              <span className="small muted"> &nbsp;(der nevneren er null)</span>
            </p>
            <p className="small">
              Grafen er en <b>hyperbel</b>: to kurver som er symmetriske om skjæringspunktet mellom asymptotene.
            </p>
          </div>
          <div className="grid2" style={{ gap: 8 }}>
            <Slider id="fa-a" label={<V c="a" />} value={a} min={-5} max={5} step={1} onChange={sett(0)} />
            <Slider id="fa-c" label={<V c="c" />} value={c} min={-5} max={5} step={1} onChange={sett(2)} />
            <Slider id="fa-b" label={<V c="b" />} value={b} min={-6} max={6} step={1} onChange={sett(1)} />
            <Slider id="fa-d" label={<V c="d" />} value={d} min={-6} max={15} step={1} onChange={sett(3)} />
          </div>
          <div className="row" role="group" aria-label="Funksjoner fra boka" style={{ gap: 6 }}>
            {BOKA.map(([navn, k]) => (
              <button key={navn} className="btn" onClick={() => setK(k)}>
                {navn}
              </button>
            ))}
          </div>
        </div>
        <div className="stack">
          <div className="panel math big">
            <Fx />
            <Op>=</Op>
            <Ras a={a} b={b} c={c} d={d} />
          </div>
          <FunkGraf
            kurver={hyperbel(a, b, c, d, 'c1')}
            punkter={
              r !== undefined && s !== undefined && !konstant ? [{ x: s, y: r, farge: 'c2' }] : []
            }
            ekstra={(sk) => (konstant || lineaer ? null : <Asymptoter s={sk} r={r} x={s} />)}
            xmin={-8}
            xmax={8}
            ymin={-6}
            ymax={6}
            h={340}
            title="Grafen til den valgte rasjonale funksjonen med asymptoter"
          />
          {lineaer ? (
            <p className="panel">
              {d === 0 ? (
                <>
                  <b>c = d = 0:</b> nevneren er alltid null, så funksjonen er ikke definert noe sted.
                </>
              ) : (
                <>
                  <b>c = 0:</b> nevneren er et tall, og funksjonen er lineær. Ingen asymptoter.
                </>
              )}
            </p>
          ) : konstant ? (
            <p className="panel">
              <b>Spesialtilfelle:</b> telleren er et multiplum av nevneren, så <Fx /> = <Num v={r!} /> overalt unntatt i{' '}
              <X /> = <Num v={s!} />, der den ikke er definert.
            </p>
          ) : (
            <p className="panel">
              <span className="c2">
                Horisontal: <span className="math nw">y = <Num v={r!} /></span>
              </span>
              &nbsp;&nbsp;·&nbsp;&nbsp;
              <span className="c2">
                Vertikal: <span className="math nw"><X /> = <Num v={s!} /></span>
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
