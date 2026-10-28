import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { V, X } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';
import { KurveNavn } from '../felles';

const f = (x: number) => -x + 5;
const g = (x: number) => x / 3 + 1;

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Funksjoner</div>
    <h1>Skjærings&shy;punkter</h1>
    <p className="lede">Hvor treffer grafen aksene, og hvor møtes to grafer? Svaret finner vi med en likning.</p>
    <div className="cols wide-left">
      <FunkGraf
        kurver={[
          { f, farge: 'c1' },
          { f: g, farge: 'c2' },
        ]}
        punkter={[
          { x: 0, y: 5, navn: '(0 , 5)', plass: 'hoyre' },
          { x: 5, y: 0, navn: '(5 , 0)', plass: 'under' },
          { x: 3, y: 2, farge: 'pen', navn: '(3 , 2)', plass: 'under' },
        ]}
        ekstra={(s) => (
          <>
            <KurveNavn s={s} x={-1.8} y={5.8} farge="c1">
              f
            </KurveNavn>
            <KurveNavn s={s} x={5.5} y={3.4} farge="c2">
              g
            </KurveNavn>
          </>
        )}
        xmin={-2}
        xmax={7}
        ymin={-1.5}
        ymax={7.5}
        h={360}
        title="Grafene til f(x) = −x + 5 og g(x) = x/3 + 1 med skjæringspunktene (0, 5), (5, 0) og (3, 2) markert"
      />
      <div className="stack">
        <ol className="steps">
          <li>
            <span className="no">1</span>
            <div>
              <b>Med y-aksen:</b> sett <X /> = 0 og regn ut{' '}
              <span className="math">
                <Fx x="0" />
              </span>
              .
            </div>
          </li>
          <li>
            <span className="no">2</span>
            <div>
              <b>Med x-aksen (nullpunkter):</b> sett <V c="y" /> = 0 og løs{' '}
              <span className="math">
                <Fx /> = 0
              </span>
              .
            </div>
          </li>
          <li>
            <span className="no">3</span>
            <div>
              <b>Mellom to grafer:</b> løs{' '}
              <span className="math">
                <Fx /> = <Fx f="g" />
              </span>
              .
            </div>
          </li>
        </ol>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
