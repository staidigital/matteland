import React, { useState } from 'react';
import { FunkGraf, type Kurve, type Punkt } from '../../../../presentasjon/FunkGraf';
import { V, X, dec } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

type Graf = 'rot' | 'liggende';

export const EnXEnY: React.FC = () => {
  const [graf, setGraf] = useState<Graf>('rot');
  const [a, setA] = useState(4);

  const kurver: Kurve[] = [{ f: Math.sqrt, fra: 0 }];
  if (graf === 'liggende') kurver.push({ f: (x) => -Math.sqrt(x), fra: 0 });

  const treff: Punkt[] = [];
  if (a >= 0) {
    treff.push({ x: a, y: Math.sqrt(a), farge: 'pen' });
    if (graf === 'liggende' && a > 0) treff.push({ x: a, y: -Math.sqrt(a), farge: 'pen' });
  }

  const dom =
    treff.length === 2
      ? { tekst: 'To y-verdier: ikke en funksjon', farge: 'var(--bad)' }
      : treff.length === 1
        ? { tekst: 'Én y-verdi', farge: 'var(--ok)' }
        : { tekst: 'Ingen y-verdi', farge: 'var(--muted)' };

  return (
    <div className="slide">
      <div className="kicker">Én x gir én y</div>
      <h2>Den loddrette linja avslører det</h2>
      <div className="seg" role="group" aria-label="Velg graf" style={{ alignSelf: 'start' }}>
        <button aria-pressed={graf === 'rot'} onClick={() => setGraf('rot')}>
          g(x) = √x
        </button>
        <button aria-pressed={graf === 'liggende'} onClick={() => setGraf('liggende')}>
          y² = x
        </button>
      </div>
      <div className="cols">
        <div className="stack">
          <p>
            Flytt den loddrette linja{' '}
            <span className="math">
              <X /> = <V c="a" />
            </span>
            . Hvor mange ganger treffer den grafen?
          </p>
          <Slider id="ex-a" label={<V c="a" />} value={a} min={-2} max={9} step={0.5} onChange={setA} />
          <div className="panel stack" style={{ gap: 10 }}>
            <span className="pill" style={{ alignSelf: 'start', color: dom.farge }}>
              {dom.tekst}
            </span>
            <p className="math">
              {treff.length === 0 ? (
                <span className="muted" style={{ fontFamily: 'var(--f-body)', fontSize: '0.75em' }}>
                  Vi kan ikke ta kvadratroten av et negativt tall.
                </span>
              ) : (
                <>
                  <X /> = {dec(a)} &nbsp;gir&nbsp;{' '}
                  {treff.map((p, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && ' og '}
                      <V c="y" /> = {dec(p.y)}
                    </React.Fragment>
                  ))}
                </>
              )}
            </p>
          </div>
          <p className="small muted">
            {graf === 'rot'
              ? 'For √x treffer linja grafen høyst én gang. Da er g en funksjon. Negative x gir ingen verdi: de er ikke med i definisjonsmengden.'
              : 'For y² = x treffer linja to ganger når x > 0. Én innverdi gir to utverdier, så dette er ikke en funksjon.'}
          </p>
        </div>
        <FunkGraf
          kurver={kurver}
          punkter={treff}
          ekstra={(s) => <line className="g-guide" x1={s.sx(a)} x2={s.sx(a)} y1={0} y2={s.H} style={{ stroke: 'var(--pen)' }} />}
          xmin={-3}
          xmax={10}
          ymin={-4}
          ymax={4}
          h={340}
          title="Grafen og en loddrett linje x = a"
        />
      </div>
    </div>
  );
};
