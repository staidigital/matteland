import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { dec } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';

/** Modell av hoppet: nullpunkter i 0 og 9,6, toppunkt i (4,8 , 2,88) */
const h = (x: number) => -0.125 * x * (x - 9.6);

const SPORSMAL: [React.ReactNode, React.ReactNode][] = [
  ['Hvor langt er hoppet?', 'Omtrent 9,6 m. Grafen treffer bakken igjen der.'],
  ['Omtrent hvor høyt er impalaen på sitt høyeste?', 'Omtrent 2,9 m.'],
  ['Hvor langt har impalaen beveget seg bortover når den er på sitt høyeste?', 'Omtrent 4,8 m.'],
  [
    'Er det noen sammenheng mellom svarene i 1 og 3?',
    'Toppunktet ligger midt i hoppet: 4,8 er halvparten av 9,6. Grafen er symmetrisk om x = 4,8.',
  ],
];

export const IMPALA_STEG = SPORSMAL.length;

export const Impala: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [x, setX] = useState(2);

  return (
    <div className="slide">
      <div className="kicker">Utforsk · Ekstremalpunkter</div>
      <h2>Impalaens hopp</h2>
      <div className="cols">
        <div className="stack">
          <p>
            Impalaen er en afrikansk antilope som er kjent for lange og luftige hopp. Grafen er en modell av et slikt
            hopp.
          </p>
          <Slider id="imp-x" label={<i className="v">x</i>} value={x} min={0} max={9.6} step={0.2} onChange={setX} />
          <p className="small muted">
            Etter {dec(x, 1)} m bortover er impalaen omtrent {dec(h(x), 1)} m over bakken.
          </p>
          <ol className="steps">
            {SPORSMAL.map(([q, svar], i) => (
              <li key={i}>
                <span className="no">{i + 1}</span>
                <div>
                  {q}
                  {frag > i && <div className="reveal pen">{svar}</div>}
                </div>
              </li>
            ))}
          </ol>
          <StepButtons frag={frag} setFrag={setFrag} steps={IMPALA_STEG} />
        </div>
        <FunkGraf
          kurver={[{ f: h, fra: 0, til: 9.6 }]}
          punkter={[
            { x, y: h(x), farge: 'ink' },
            ...(frag >= 1 ? [{ x: 9.6, y: 0, farge: 'c1', navn: '9,6', plass: 'over' as const }] : []),
            ...(frag >= 2 ? [{ x: 4.8, y: h(4.8), farge: 'pen', navn: 'toppunkt', plass: 'over' as const }] : []),
          ]}
          ekstra={(s) => (
            <>
              <Hjelpelinje s={s} x1={x} y1={0} x2={x} y2={h(x)} farge="muted" />
              {frag >= 2 && <Hjelpelinje s={s} x1={0} y1={h(4.8)} x2={4.8} y2={h(4.8)} farge="pen" />}
              {frag >= 3 && <Hjelpelinje s={s} x1={4.8} y1={0} x2={4.8} y2={h(4.8)} farge="pen" />}
            </>
          )}
          xmin={-0.5}
          xmax={10.5}
          ymin={-0.5}
          ymax={4.5}
          xetikett={1}
          ysteg={0.5}
          yetikett={1}
          h={300}
          xnavn="x, meter"
          ynavn="y, meter"
          title="Modell av hoppet til en impala: høyden over bakken som funksjon av lengden bortover"
        />
      </div>
    </div>
  );
};
