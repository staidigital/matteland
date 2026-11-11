import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';
import { KurveNavn } from '../../skjaeringspunkter/felles';
import { Pot, pot } from '../felles';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Funksjoner</div>
    <h1>Potens- og rotfunksjoner</h1>
    <p className="lede">Nå står variabelen i grunntallet. Eksponenten bestemmer formen på grafen.</p>
    <div className="cols wide-left">
      <FunkGraf
        kurver={[
          { f: pot(1, 2), farge: 'c1' },
          { f: pot(1, 0.5), farge: 'ink' },
          { f: pot(1, -1), farge: 'c2' },
        ]}
        punkter={[{ x: 1, y: 1, farge: 'pen', navn: '(1 , 1)', plass: 'hoyre' }]}
        ekstra={(s) => (
          <>
            <KurveNavn s={s} x={2.2} y={5.6} farge="c1">
              f
            </KurveNavn>
            <text className="g-name" x={s.sx(5.3)} y={s.sy(2.65)}>
              g
            </text>
            <KurveNavn s={s} x={0.32} y={4.6} farge="c2">
              h
            </KurveNavn>
          </>
        )}
        xmin={-0.5}
        xmax={6}
        ymin={-0.5}
        ymax={6}
        xetikett={1}
        yetikett={1}
        h={380}
        title="Grafene til f(x) = x², g(x) = x^(1/2) og h(x) = x^(−1) for x > 0"
      />
      <div className="stack">
        <div className="panel math">
          <span className="mline c1">
            <Fx />
            <Op>=</Op>
            <Pot b={2} />
          </span>
          <span className="mline">
            <Fx f="g" />
            <Op>=</Op>
            <Pot b={[1, 2]} />
          </span>
          <span className="mline c2">
            <Fx f="h" />
            <Op>=</Op>
            <Pot b={-1} />
          </span>
        </div>
        <p>
          Tre potensfunksjoner med ulike eksponenter: én vokser stadig brattere, én vokser stadig slakkere, og én
          avtar. Alle går gjennom <span className="nw">(1 , 1)</span>.
        </p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
