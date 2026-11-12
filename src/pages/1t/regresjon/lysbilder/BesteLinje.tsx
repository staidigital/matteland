import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { dec } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { avvik, tilpass } from '../felles';

const PX = [1, 2.5, 4, 5.5];
const PY = [2, 3.6, 4.6, 4.9];

const LINJER: { navn: string; farge: string; f: (x: number) => number }[] = [
  { navn: 'Grønn linje', farge: 'c2', f: (x) => 0.2 * x + 3.8 },
  { navn: 'Blå linje', farge: 'c1', f: (x) => (2 / 3) * x + 3.6 - (2 / 3) * 2.5 },
  { navn: 'Regresjonslinja', farge: 'pen', f: tilpass('lin', PX, PY)!.f },
];

const SVAR: [React.ReactNode, React.ReactNode][] = [
  [
    'Hvilken av de to linjene passer best for alle punktene sett under ett?',
    'Den blå. Den grønne treffer to punkter nøyaktig, men bommer mye på det første.',
  ],
  [
    'Hvordan kan vi regne ut hvilken linje som passer best?',
    <>
      Vi måler den loddrette avstanden fra hvert punkt til linja, kvadrerer og legger sammen. Linja med minst sum er
      regresjonslinja (<b>minste kvadraters metode</b>).
    </>,
  ],
];

export const BESTE_STEG = SVAR.length;

export const BesteLinje: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [valgt, setValgt] = useState(0);
  const L = LINJER[valgt];

  return (
    <div className="slide">
      <div className="kicker">Reflekter og diskuter</div>
      <h2>Hvilken linje passer best?</h2>
      <div className="cols">
        <div className="stack">
          {SVAR.map(([s, svar], i) => (
            <div className="panel stack" key={i} style={{ gap: 8 }}>
              <p>
                <b className="pen">{i + 1}</b> &nbsp;{s}
              </p>
              {frag > i ? (
                <p className="reveal pen">{svar}</p>
              ) : (
                <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
                  Vis svar
                </button>
              )}
            </div>
          ))}
          <div className="seg" role="group" aria-label="Velg linje" style={{ alignSelf: 'start' }}>
            {LINJER.map((l, i) => (
              <button key={l.navn} aria-pressed={valgt === i} onClick={() => setValgt(i)}>
                {l.navn}
              </button>
            ))}
          </div>
          <p className="math">
            Sum av kvadrerte avvik: <b className="pen">{dec(avvik(L.f, PX, PY), 2)}</b>
          </p>
        </div>
        <FunkGraf
          kurver={LINJER.slice(0, 2).map((l) => ({ f: l.f, farge: l.farge })).concat(valgt === 2 ? [{ f: L.f, farge: 'pen' }] : [])}
          punkter={PX.map((x, i) => ({ x, y: PY[i], farge: 'ink' }))}
          ekstra={(s) =>
            PX.map((x, i) => {
              const y0 = L.f(x);
              const d = Math.abs(s.sy(PY[i]) - s.sy(y0));
              const topp = Math.min(s.sy(PY[i]), s.sy(y0));
              return (
                <g key={i}>
                  <rect x={s.sx(x)} y={topp} width={d} height={d} style={{ fill: 'var(--pen)', opacity: 0.18 }} />
                  <line className="g-guide" x1={s.sx(x)} x2={s.sx(x)} y1={s.sy(PY[i])} y2={s.sy(y0)} style={{ stroke: 'var(--pen)' }} />
                </g>
              );
            })
          }
          xmin={-0.5}
          xmax={7}
          ymin={-0.5}
          ymax={6.5}
          xetikett={1}
          yetikett={1}
          h={440}
          title="Fire punkter, to linjer og kvadratene av avvikene"
        />
      </div>
    </div>
  );
};
