import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Op, X, dec } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { KurveNavn, skjaering, tusen } from '../felles';

const f = (x: number) => 7940 - 270 * x;
const g = (x: number) => 5760 * 1.04 ** x;
const XS = skjaering(f, g, 0, 10);

export const FOLKETALL_STEG = 1;

export const Folketall: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [x, setX] = useState(1);

  return (
    <div className="slide">
      <div className="kicker">Skjæringspunkt i en modell</div>
      <h2>Når har kommunene like mange innbyggere?</h2>
      <div className="cols">
        <div className="stack">
          <div className="panel math">
            <span className="mline">
              <Fx />
              <Op>=</Op>
              <span className="c1">7940 − 270</span>
              <X />
            </span>
            <span className="mline">
              <Fx f="g" />
              <Op>=</Op>
              <span className="c2">
                5760 · 1,04<sup>
                  <X />
                </sup>
              </span>
            </span>
          </div>
          <p className="small muted">
            <X /> er antall år fram i tid. Den store kommunen synker jevnt, nabokommunen vokser med 4 % i året.
          </p>
          <Slider id="ft-x" label={<X />} value={x} min={0} max={10} step={0.5} onChange={setX} />
          <table className="cases">
            <tbody>
              <tr>
                <td className="math c1">
                  <Fx x={dec(x)} />
                </td>
                <td>≈ {tusen(f(x))} innbyggere</td>
              </tr>
              <tr>
                <td className="math c2">
                  <Fx f="g" x={dec(x)} />
                </td>
                <td>≈ {tusen(g(x))} innbyggere</td>
              </tr>
            </tbody>
          </table>
          {frag >= 1 && (
            <div className="boxed reveal">
              <span className="label">Skjæringspunktet</span>
              Grafene skjærer hverandre i omtrent <b className="pen nw">({dec(XS, 1)} , {tusen(g(XS))})</b>. Etter
              litt over 4 år har begge kommunene omtrent {tusen(Math.round(g(XS) / 100) * 100)} innbyggere.
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={FOLKETALL_STEG} />
        </div>
        <FunkGraf
          kurver={[
            { f, farge: 'c1' },
            { f: g, farge: 'c2' },
          ]}
          punkter={[
            { x, y: f(x), farge: 'c1' },
            { x, y: g(x), farge: 'c2' },
            ...(frag >= 1 ? [{ x: XS, y: g(XS), farge: 'pen' }] : []),
          ]}
          ekstra={(s) => (
            <>
              <Hjelpelinje s={s} x1={x} y1={5000} x2={x} y2={Math.max(f(x), g(x))} farge="muted" />
              {frag >= 1 && (
                <>
                  <Hjelpelinje s={s} x1={XS} y1={g(XS)} x2={XS} y2={5000} farge="pen" />
                  <Hjelpelinje s={s} x1={XS} y1={g(XS)} x2={0} y2={g(XS)} farge="pen" />
                </>
              )}
              <KurveNavn s={s} x={8.6} y={5900} farge="c1">
                f
              </KurveNavn>
              <KurveNavn s={s} x={9.3} y={7850} farge="c2">
                g
              </KurveNavn>
            </>
          )}
          xmin={0}
          xmax={10}
          ymin={5000}
          ymax={8500}
          ysteg={250}
          yetikett={500}
          h={420}
          xnavn="år"
          ynavn="innbyggere"
          title="Grafene til f(x) = 7940 − 270x og g(x) = 5760 · 1,04^x for x fra 0 til 10"
        />
      </div>
    </div>
  );
};
