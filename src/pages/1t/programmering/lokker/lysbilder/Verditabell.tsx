import React from 'react';
import { FunkGraf } from '../../../../../presentasjon/FunkGraf';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

const f = (x: number) => x ** 2 - 2 * x - 3;

export const Verditabell: React.FC = () => (
  <div className="slide">
    <div className="kicker">Eksempel · Funksjoner</div>
    <h2>Verditabell med en løkke</h2>
    <div className="cols">
      <div className="stack">
        <p>
          Lag en verditabell for <span className="math nw">f(x) = x² − 2x − 3</span> for heltallene fra −3 til 3, og finn
          nullpunktene.
        </p>
        <Kodeboks
          kode={"for x in range(-3, 4):\n    y = x**2 - 2*x - 3\n    print(f'x = {x:2}   f(x) = {y:3}')\n    if y == 0:\n        print('        Nullpunkt!')"}
        />
        <p className="hintline">
          <code>{'{x:2}'}</code> setter av to plasser til x, så kolonnene står rett under hverandre.
        </p>
      </div>
      <div className="stack">
        <FunkGraf
          kurver={[{ f, fra: -3.3, til: 3.3, farge: 'c1' }]}
          punkter={[-3, -2, -1, 0, 1, 2, 3].map((x) => ({ x, y: f(x), farge: f(x) === 0 ? 'pen' : 'ink' }))}
          xmin={-3.5}
          xmax={3.5}
          ymin={-5}
          ymax={13}
          h={320}
          title="Grafen til f med punktene fra verditabellen"
        />
        <p className="small">
          Punktene er de samme som i tabellen. Løkka gjør det samme som vi gjør for hånd, bare raskere. Endre funksjonen og
          intervallet.
        </p>
      </div>
    </div>
  </div>
);
