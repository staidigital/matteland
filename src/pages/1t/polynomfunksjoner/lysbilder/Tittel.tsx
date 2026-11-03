import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';
import { KurveNavn } from '../../skjaeringspunkter/felles';
import { Pol, polynom } from '../felles';

const F = [1, -2, -3];
const G = [1, -1, -2, 0];

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Funksjoner</div>
    <h1>Polynomfunksjoner</h1>
    <p className="lede">Parabler og kurver som snur. Vi finner symmetrilinjer, topp- og bunnpunkter og nullpunkter.</p>
    <div className="cols wide-left">
      <FunkGraf
        kurver={[
          { f: polynom(F), farge: 'c1' },
          { f: polynom(G), farge: 'c2' },
        ]}
        ekstra={(s) => (
          <>
            <KurveNavn s={s} x={3.3} y={4.6} farge="c1">
              f
            </KurveNavn>
            <KurveNavn s={s} x={2.25} y={5} farge="c2">
              g
            </KurveNavn>
          </>
        )}
        xmin={-3}
        xmax={4}
        ymin={-5}
        ymax={6}
        h={380}
        title="Grafene til andregradsfunksjonen f og tredjegradsfunksjonen g"
      />
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
        <p>
          <span className="c1">Parabelen</span> har ett bunnpunkt og er symmetrisk. Grafen til{' '}
          <span className="c2">tredjegradsfunksjonen</span> snur to ganger og skjærer x-aksen tre steder.
        </p>
        <p className="muted small">Taket på akvariet L'Oceanogràfic i Valencia er bygd av slike buede flater.</p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
