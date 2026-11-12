import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Programmering</div>
    <h1>Variabler</h1>
    <p className="lede">Vi gir verdier et navn, så vi kan bruke dem igjen og endre dem senere.</p>
    <div className="cols wide-left">
      <Kodeboks
        kode={"pris = 249\nantall = 3\ntotalt = pris * antall\nprint('Du må betale', totalt, 'kroner')"}
        variabler
        linjeForLinje
      />
      <div className="stack">
        <p>
          <code>pris</code>, <code>antall</code> og <code>totalt</code> er <b>variabler</b>. Hver av dem er et navn på en verdi.
        </p>
        <p>Kjør programmet og se hva som havner i tabellen. Endre prisen og kjør igjen. Bare én linje må endres.</p>
        <p className="hintline">
          <b>Linje for linje</b> viser hva som skjer i hver linje. Klikk i koden for å skrive, og bla med <kbd>→</kbd> når du
          ikke står i koden.
        </p>
      </div>
    </div>
  </div>
);
