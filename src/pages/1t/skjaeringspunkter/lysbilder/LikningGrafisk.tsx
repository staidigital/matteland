import React from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { KurveNavn } from '../felles';

const f = (x: number) => x + 2;
const g = (x: number) => x * x;

export const LIKNING_STEG = 3;

export const LikningGrafisk: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Løse likninger grafisk</div>
    <h2>
      Løs{' '}
      <span className="math">
        <X /> + 2 = <X />
        <sup>2</sup>
      </span>{' '}
      grafisk
    </h2>
    <div className="cols">
      <div className="stack">
        <p>
          Vi lar venstresiden være én funksjon og høyresiden en annen. Løsningen er <X />
          -koordinaten til skjæringspunktet.
        </p>
        {frag >= 1 && (
          <div className="panel math reveal">
            <span className="mline">
              <Fx /> = <span className="c1">
                <X /> + 2
              </span>
            </span>
            <span className="mline">
              <Fx f="g" /> = <span className="c2">
                <X />
                <sup>2</sup>
              </span>
            </span>
          </div>
        )}
        {frag >= 2 && (
          <p className="reveal">
            Vi tegner begge grafene og finner skjæringspunktene: <b className="pen nw">(−1 , 1)</b> og{' '}
            <b className="pen nw">(2 , 4)</b>.
          </p>
        )}
        {frag >= 3 && (
          <div className="stack reveal">
            <div className="boxed math">
              <X /> = −1 &nbsp;eller&nbsp; <X /> = 2
            </div>
            <div className="panel stack" style={{ gap: 6 }}>
              <h3>Kontroll med CAS</h3>
              <pre className="kode" style={{ margin: 0 }}>
                x+2=x^2{'\n'}
                <span className="k">Løs:</span> {'{'}x = -1, x = 2{'}'}
              </pre>
              <p className="small muted">
                Sjekk: −1 + 2 = 1 = (−1)<sup>2</sup> og 2 + 2 = 4 = 2<sup>2</sup>.
              </p>
            </div>
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={LIKNING_STEG} />
      </div>
      <FunkGraf
        kurver={
          frag >= 1
            ? [
                { f, farge: 'c1' },
                { f: g, farge: 'c2' },
              ]
            : []
        }
        punkter={
          frag >= 2
            ? [
                { x: -1, y: 1, farge: 'pen', navn: '(−1 , 1)', plass: 'venstre' },
                { x: 2, y: 4, farge: 'pen', navn: '(2 , 4)', plass: 'hoyre' },
              ]
            : []
        }
        ekstra={(s) =>
          frag >= 1 && (
            <>
              <KurveNavn s={s} x={3.6} y={6.4} farge="c1">
                f
              </KurveNavn>
              <KurveNavn s={s} x={-2.8} y={6.4} farge="c2">
                g
              </KurveNavn>
              {frag >= 2 && (
                <>
                  <Hjelpelinje s={s} x1={-1} y1={1} x2={-1} y2={0} farge="pen" />
                  <Hjelpelinje s={s} x1={2} y1={4} x2={2} y2={0} farge="pen" />
                </>
              )}
            </>
          )
        }
        xmin={-4}
        xmax={5}
        ymin={-1.5}
        ymax={8}
        h={420}
        title="Grafene til f(x) = x + 2 og g(x) = x², som skjærer hverandre i (−1, 1) og (2, 4)"
      />
    </div>
  </div>
);
