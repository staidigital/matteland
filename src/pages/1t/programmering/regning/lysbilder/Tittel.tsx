import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Programmering</div>
    <h1>Regning og print</h1>
    <p className="lede">Vi skriver instruksjoner i Python, og datamaskinen regner for oss.</p>
    <div className="cols wide-left">
      <Kodeboks kode={"print('Hei, verden!')\nprint('Regnestykket 3 + 5 er lik')\nprint(3 + 5)"} />
      <div className="stack">
        <p>
          Dette er et <b>program</b>. Trykk <b>Kjør</b> og se hva som kommer i konsollen. Endre noe i koden, og kjør igjen.
        </p>
        <p>Python leser programmet ovenfra og ned, én linje om gangen.</p>
        <p className="hintline">
          Klikk i koden for å skrive. <kbd>Ctrl</kbd> + <kbd>Enter</kbd> kjører. Bla med <kbd>→</kbd> og <kbd>←</kbd> når du
          ikke står i koden, og trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
