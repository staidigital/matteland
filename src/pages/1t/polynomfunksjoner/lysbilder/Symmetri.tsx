import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Op, X, dec } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { KurveNavn } from '../../skjaeringspunkter/felles';
import { Pol, Symmetrilinje, polynom } from '../felles';

const F = [3, -12, 9];
const G = [2, -4, 0];
const f = polynom(F);
const g = polynom(G);
const XS = [-2, -1, 0, 1, 2, 3, 4];

/** Like langt fra symmetrilinja gir samme farge */
const FARGER = ['pen', 'c1', 'c2', 'muted'];

const Tabell: React.FC<{ navn: string; h: (x: number) => number; p: number; farge: boolean }> = ({
  navn,
  h,
  p,
  farge,
}) => (
  <div className="tablewrap">
    <table className="vt">
      <tbody>
        <tr>
          <th>
            <X />
          </th>
          {XS.map((x) => (
            <td key={x}>{dec(x)}</td>
          ))}
        </tr>
        <tr>
          <th>
            <Fx f={navn} />
          </th>
          {XS.map((x) => {
            const d = Math.abs(x - p);
            return (
              <td
                key={x}
                className={farge && d < 4 ? FARGER[d] : undefined}
                style={farge ? { fontWeight: 700 } : undefined}
              >
                {dec(h(x))}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  </div>
);

export const SYMMETRI_STEG = 3;

export const Symmetri: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [r, setR] = useState(1.5);

  return (
    <div className="slide">
      <div className="kicker">Utforsk · Symmetri</div>
      <h2>Går noen tall igjen i verditabellen?</h2>
      <div className="cols">
        <div className="stack">
          <div className="panel math">
            <span className="mline c1">
              <Fx />
              <Op>=</Op>
              <Pol k={F} />
            </span>
            <span className="mline c2">
              <Fx f="g" />
              <Op>=</Op>
              <Pol k={G} />
            </span>
          </div>
          {frag >= 1 ? (
            <div className="stack reveal" style={{ gap: 10 }}>
              <Tabell navn="f" h={f} p={2} farge={frag >= 2} />
              <Tabell navn="g" h={g} p={1} farge={frag >= 2} />
            </div>
          ) : (
            <p className="muted">Lag en verditabell for hver funksjon for x-verdier mellom −2 og 4.</p>
          )}
          {frag >= 3 && (
            <div className="boxed reveal">
              <span className="label">Symmetri</span>
              Grafen til <Fx /> er symmetrisk om linja{' '}
              <span className="math nw">
                <X /> = <i className="v">p</i>
              </span>{' '}
              dersom{' '}
              <span className="math nw">
                <i className="v">f</i>(<i className="v">p</i> + <i className="v">r</i>) = <i className="v">f</i>(
                <i className="v">p</i> − <i className="v">r</i>)
              </span>{' '}
              for alle <i className="v">r</i>.
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={SYMMETRI_STEG} />
        </div>
        <div className="stack">
          <FunkGraf
            kurver={
              frag >= 2
                ? [
                    { f, farge: 'c1' },
                    { f: g, farge: 'c2' },
                  ]
                : []
            }
            punkter={
              frag >= 3
                ? [
                    { x: 1 - r, y: g(1 - r), farge: 'c2' },
                    { x: 1 + r, y: g(1 + r), farge: 'c2' },
                  ]
                : []
            }
            ekstra={(s) =>
              frag >= 2 && (
                <>
                  <Symmetrilinje sx={s.sx} H={s.H} p={2} />
                  <Symmetrilinje sx={s.sx} H={s.H} p={1} />
                  {frag >= 3 && <Hjelpelinje s={s} x1={1 - r} y1={g(1 - r)} x2={1 + r} y2={g(1 + r)} farge="c2" />}
                  <text className="g-txt" x={s.sx(2) + 6} y={18}>
                    x = 2
                  </text>
                  <text className="g-txt" x={s.sx(1) + 6} y={18}>
                    x = 1
                  </text>
                  <KurveNavn s={s} x={3.7} y={4.5} farge="c1">
                    f
                  </KurveNavn>
                  <KurveNavn s={s} x={-1.2} y={7} farge="c2">
                    g
                  </KurveNavn>
                </>
              )
            }
            xmin={-2.5}
            xmax={4.5}
            ymin={-4}
            ymax={10}
            ysteg={1}
            yetikett={2}
            h={380}
            title="Grafene til f(x) = 3x² − 12x + 9 og g(x) = 2x² − 4x med symmetrilinjene x = 2 og x = 1"
          />
          {frag >= 3 && (
            <div className="stack reveal" style={{ gap: 6 }}>
              <Slider
                id="sym-r"
                label={<i className="v">r</i>}
                value={r}
                min={0}
                max={2.5}
                step={0.25}
                onChange={setR}
              />
              <p className="math">
                <Fx f="g" x={dec(1 - r)} /> = {dec(g(1 - r))} &nbsp; og &nbsp; <Fx f="g" x={dec(1 + r)} /> ={' '}
                {dec(g(1 + r))}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
