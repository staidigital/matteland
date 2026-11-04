import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { V } from '../../../../presentasjon/matte';

const T = () => <V c="t" />;

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Andregradsuttrykk og -likninger</div>
    <h1>Praktisk bruk av andregradslikninger</h1>
    <p className="lede">Fra tekst til likning: areal, kast og overskudd. Og hvilke svar gir egentlig mening?</p>
    <div className="cols wide-left">
      <FunkGraf
        kurver={[{ f: (t) => -5 * t * t + 10 * t + 15, fra: 0, til: 3, farge: 'pen' }]}
        punkter={[
          { x: 0, y: 15, navn: 'Start', plass: 'hoyre' },
          { x: 3, y: 0, navn: 'Lander', plass: 'over', farge: 'c1' },
        ]}
        xmin={-0.5}
        xmax={4}
        ymin={-3}
        ymax={25}
        ysteg={5}
        xetikett={1}
        xnavn="t"
        ynavn="h"
        h={340}
        title="Høyden til en ball som kastes opp, og lander etter tre sekunder"
      />
      <div className="stack">
        <div className="boxed math">
          <span className="label">Ballen lander når høyden er 0</span>
          −5<T /><sup>2</sup> + 10<T /> + 15 = 0
        </div>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
