import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { MODELLER, type Modell, Uttrykk, tilpass } from '../felles';

const KORT: [string, React.ReactNode][] = [
  [
    'Hvordan kan vi se av spredningsdiagrammet om en eksponentiell modell egner seg?',
    'Punktene stiger (eller faller) stadig brattere, og y-verdien endres med omtrent samme prosent for hvert steg.',
  ],
  [
    'I hvilke tilfeller bør vi bruke en polynomfunksjon som modell?',
    'Når punktene har et toppunkt eller bunnpunkt, for eksempel en kastebane eller temperatur gjennom et døgn.',
  ],
  [
    'Er den mest korrekte modellen alltid den som best treffer punktene våre?',
    'Nei. En modell med høy grad kan treffe alle punktene, men gi helt urimelige svar utenfor. Modellen må også gi mening.',
  ],
];

/** Hytter i et fjellområde (oppg. 3.67), år etter 2016 */
const HX = [0, 2, 4, 6, 8];
const HY = [132, 148, 172, 197, 223];

export const REFLEKTER_STEG = KORT.length;

export const Reflekter: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [m, setM] = useState<Modell>('lin');
  const t = tilpass(m, HX, HY)!;

  return (
    <div className="slide">
      <div className="kicker">Reflekter og diskuter</div>
      <h2>Hvilken modell skal vi velge?</h2>
      <div className="cols">
        <div className="stack">
          {KORT.map(([s, svar], i) => (
            <div className="panel stack" key={i} style={{ gap: 6 }}>
              <p>
                <b className="pen">{i + 1}</b> &nbsp;{s}
              </p>
              {frag > i ? (
                <p className="reveal pen small">{svar}</p>
              ) : (
                <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
                  Vis svar
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="stack">
          <p className="small">
            Antall hytter fra 2016 til 2024 (oppg. 3.67). Hvilke modeller gir rimelige svar for 2031 (<i className="v">x</i> = 15)?
          </p>
          <div className="seg" role="group" aria-label="Velg modell" style={{ alignSelf: 'start', flexWrap: 'wrap' }}>
            {[...MODELLER.filter(([k]) => k !== 'pot'), ['poly4', 'Fjerdegrad'] as [Modell, string]].map(([k, navn]) => (
              <button key={k} aria-pressed={m === k} onClick={() => setM(k)}>
                {navn}
              </button>
            ))}
          </div>
          <FunkGraf
            kurver={[{ f: t.f, fra: -1, til: 17, farge: 'c1' }]}
            punkter={[
              ...HX.map((x, i) => ({ x, y: HY[i], farge: 'ink' })),
              { x: 15, y: t.f(15), farge: 'pen', apen: true, navn: String(Math.round(t.f(15))), plass: 'venstre' as const },
            ]}
            xmin={-1}
            xmax={17}
            ymin={0}
            ymax={520}
            ysteg={50}
            yetikett={100}
            h={300}
            xnavn="år etter 2016"
            ynavn="hytter"
            title="Antall hytter med valgt modell, forlenget til 2031"
          />
          <p className="math small">
            y = <Uttrykk t={t} d={m === 'poly3' || m === 'poly4' ? 3 : 2} />
          </p>
        </div>
      </div>
    </div>
  );
};
