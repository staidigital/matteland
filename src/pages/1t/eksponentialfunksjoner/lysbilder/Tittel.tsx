import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';
import { KurveNavn } from '../../skjaeringspunkter/felles';
import { Eksp, eksp } from '../felles';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Funksjoner</div>
    <h1>Eksponentialfunksjoner</h1>
    <p className="lede">
      Vekst og nedgang med like mange prosent hver gang. Variabelen står i eksponenten.
    </p>
    <div className="cols wide-left">
      <FunkGraf
        kurver={[
          { f: eksp(1, 2), farge: 'c1' },
          { f: eksp(1, 0.5), farge: 'c2' },
        ]}
        punkter={[{ x: 0, y: 1, farge: 'pen', navn: '(0 , 1)', plass: 'hoyre' }]}
        ekstra={(s) => (
          <>
            <KurveNavn s={s} x={2.35} y={6.2} farge="c1">
              f
            </KurveNavn>
            <KurveNavn s={s} x={-2.95} y={6.2} farge="c2">
              g
            </KurveNavn>
          </>
        )}
        xmin={-4}
        xmax={4}
        ymin={-1}
        ymax={8}
        h={380}
        title="Grafene til f(x) = 2^x og g(x) = (1/2)^x"
      />
      <div className="stack">
        <div className="panel math">
          <span className="mline c1">
            <Fx />
            <Op>=</Op>
            <Eksp b={2} />
          </span>
          <span className="mline c2">
            <Fx f="g" />
            <Op>=</Op>
            <Eksp b={[1, 2]} />
          </span>
        </div>
        <p>
          <span className="c1">f</span> dobles hver gang <i className="v">x</i> øker med 1.{' '}
          <span className="c2">g</span> halveres. Begge går gjennom <span className="nw">(0 , 1)</span>, og ingen av
          dem når x-aksen.
        </p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
