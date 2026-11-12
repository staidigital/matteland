import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

export const FlereParametre: React.FC = () => (
  <div className="slide">
    <div className="kicker">Parametre</div>
    <h2>Funksjoner med flere parametre</h2>
    <div className="cols">
      <div className="stack">
        <p>En funksjon kan ta inn flere verdier. De skilles med komma, og kommer i samme rekkefølge som i definisjonen.</p>
        <Kode>{'def areal_trekant(g, h):\n    return g * h / 2\n\nprint(areal_trekant(6, 4))'}</Kode>
        <p>
          Sparing med rente blir en funksjon av tre variabler: startbeløp, rente og antall år. Nå slipper vi å skrive formelen
          på nytt hver gang.
        </p>
        <p className="hintline">
          Funksjonsnavn følger de samme reglene som variabelnavn. Bruk understrek mellom ordene.
        </p>
      </div>
      <div className="stack">
        <Kodeboks
          kode={"def sluttbelop(start, rente, ar):\n    vekstfaktor = 1 + rente / 100\n    return start * vekstfaktor**ar\n\nprint(round(sluttbelop(20000, 4.5, 10)))\nprint(round(sluttbelop(20000, 3, 10)))\nprint(round(sluttbelop(50000, 4.5, 5)))"}
          variabler
          linjeForLinje
        />
        <p className="hintline">
          <code>vekstfaktor</code> finnes bare inne i funksjonen. Se etter «(i sluttbelop)» i tabellen når du går linje for
          linje.
        </p>
      </div>
    </div>
  </div>
);
