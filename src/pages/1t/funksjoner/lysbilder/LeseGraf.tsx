import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje, type Punkt } from '../../../../presentasjon/FunkGraf';
import { Op, X, fmt, minus } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Fx } from '../felles';

// Grafen eleven leser av. Uttrykket vises ikke på lysbildet.
const f = (x: number) => -1.25 * (x - 8) ** 2 + 100;

/** Alle x i [0, 12] der f(x) = v */
const losninger = (v: number) => {
  const d = (100 - v) / 1.25;
  if (d < 0) return [];
  const s = Math.sqrt(d);
  return [...new Set([8 - s, 8 + s])].filter((x) => x >= -1e-9 && x <= 12 + 1e-9);
};

type Modus = 'fx' | 'x';

export const LeseGraf: React.FC = () => {
  const [modus, setModus] = useState<Modus>('fx');
  const [x, setX] = useState(4);
  const [v, setV] = useState(80);
  const xs = losninger(v);

  const punkter: Punkt[] =
    modus === 'fx'
      ? [{ x, y: f(x), farge: 'pen', navn: `(${minus(x)} , ${fmt(f(x))})`, plass: x > 9 ? 'venstre' : 'hoyre' }]
      : xs.map((z) => ({ x: z, y: v, farge: 'pen' }));

  return (
    <div className="slide">
      <div className="kicker">Lese av grafen</div>
      <h2>Fra graf til funksjonsverdi, og tilbake</h2>
      <div className="seg" role="group" aria-label="Hva skal vi finne" style={{ alignSelf: 'start' }}>
        <button aria-pressed={modus === 'fx'} onClick={() => setModus('fx')}>
          Finn f(x)
        </button>
        <button aria-pressed={modus === 'x'} onClick={() => setModus('x')}>
          Finn x
        </button>
      </div>
      <div className="cols">
        <div className="stack">
          {modus === 'fx' ? (
            <>
              <p>
                Gå loddrett fra <X />
                -verdien opp til grafen, og så vannrett bort til andreaksen.
              </p>
              <Slider id="lg-x" label={<X />} value={x} min={0} max={12} step={1} onChange={setX} />
              <div className="boxed math big">
                <Fx x={<span className="c1">{minus(x)}</span>} />
                <Op>=</Op>
                <span className="c2">{fmt(f(x))}</span>
              </div>
            </>
          ) : (
            <>
              <p>
                Gå vannrett fra verdien på andreaksen bort til grafen, og så loddrett ned til <X />
                -aksen.
              </p>
              <Slider id="lg-v" label={<Fx />} value={v} min={0} max={110} step={5} onChange={setV} />
              <div className="boxed math">
                <Fx /> = <span className="c2">{v}</span>
                {xs.length === 0 ? (
                  <span className="muted" style={{ fontFamily: 'var(--f-body)', fontSize: '0.75em' }}>
                    {' '}
                    &nbsp;Ingen <X />
                    -verdier gir denne funksjonsverdien.
                  </span>
                ) : (
                  <>
                    {' '}
                    gir{' '}
                    {xs.map((z, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && ' eller '}
                        <span className="c1">
                          <X /> = {fmt(z)}
                        </span>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </div>
            </>
          )}
          <p className="small muted">
            Én <X />
            -verdi gir alltid nøyaktig én funksjonsverdi. Men samme funksjonsverdi kan godt komme fra flere <X />
            -verdier.
          </p>
        </div>
        <FunkGraf
          kurver={[{ f, fra: 0, til: 12 }]}
          punkter={[
            { x: 0, y: f(0) },
            { x: 12, y: f(12) },
            ...punkter,
          ]}
          ekstra={(s) =>
            modus === 'fx' ? (
              <>
                <Hjelpelinje s={s} x1={x} y1={0} x2={x} y2={f(x)} farge="c1" />
                <Hjelpelinje s={s} x1={x} y1={f(x)} x2={0} y2={f(x)} farge="c2" />
              </>
            ) : (
              <>
                <Hjelpelinje s={s} x1={0} y1={v} x2={13} y2={v} farge="c2" />
                {xs.map((z, i) => (
                  <Hjelpelinje key={i} s={s} x1={z} y1={v} x2={z} y2={0} farge="c1" />
                ))}
              </>
            )
          }
          xmin={-1}
          xmax={13}
          ymin={-8}
          ymax={115}
          ysteg={10}
          yetikett={20}
          ynavn="f(x)"
          title="Grafen til en funksjon f for x fra 0 til 12"
        />
      </div>
    </div>
  );
};
