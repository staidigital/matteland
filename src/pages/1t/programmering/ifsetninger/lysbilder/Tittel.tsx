import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Programmering</div>
    <h1>If-setninger</h1>
    <p className="lede">Programmet tar valg: det gjør én ting hvis noe er sant, og noe annet ellers.</p>
    <div className="cols wide-left">
      <Kodeboks
        kode={
          "alder = int(input('Hvor gammel er du? '))\n\nif alder >= 18:\n    print('Du kan stemme ved valget.')\nelse:\n    print(f'Du kan stemme om {18 - alder} år.')"
        }
        linjeForLinje
      />
      <div className="stack">
        <p>Kjør programmet to ganger: én gang med en alder under 18 og én gang over.</p>
        <p>
          Bare én av de to <code>print</code>-linjene blir kjørt. Hvilken, bestemmes av om <code>alder &gt;= 18</code> er sant.
        </p>
        <p className="hintline">
          Bruk <b>Linje for linje</b> og se hvilke linjer programmet hopper over.
        </p>
      </div>
    </div>
  </div>
);
