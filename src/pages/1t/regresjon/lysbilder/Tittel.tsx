import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';
import { TV_X, TV_Y, Uttrykk, tilpass } from '../felles';

const t = tilpass('lin', TV_X, TV_Y)!;

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Funksjoner</div>
    <h1>Modellering og regresjon</h1>
    <p className="lede">Fra målinger til funksjon: vi finner funksjonen som passer best til punktene.</p>
    <div className="cols wide-left">
      <FunkGraf
        kurver={[{ f: t.f, fra: -0.5, til: 11, farge: 'c1' }]}
        punkter={TV_X.map((x, i) => ({ x, y: TV_Y[i], farge: 'pen' }))}
        xmin={-0.8}
        xmax={11}
        ymin={0}
        ymax={130}
        ysteg={10}
        yetikett={20}
        h={380}
        xnavn="år etter 2015"
        ynavn="min/dag"
        title="Seertid for TV etter 2015 med lineær modell"
      />
      <div className="stack">
        <p>Hvor mange minutter ser vi på TV per dag? Punktene er målinger. Linja er en modell.</p>
        <div className="panel math c1">
          <Fx f="g" />
          <Op>≈</Op>
          <Uttrykk t={t} d={1} />
        </div>
        <p>
          Modellen forteller at seertiden har gått ned med omtrent <b>5 minutter per år</b>.
        </p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
