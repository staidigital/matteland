import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Programmering</div>
    <h1>Løkker</h1>
    <p className="lede">Datamaskinen blir aldri lei. Med en løkke gjentar vi de samme linjene så mange ganger vi vil.</p>
    <div className="cols wide-left">
      <Kodeboks kode={"for i in range(1, 6):\n    print(i, 'i andre er', i**2)"} variabler linjeForLinje />
      <div className="stack">
        <p>To linjer kode gir fem linjer utskrift. Kjør programmet.</p>
        <p>
          Endre <code>6</code> til <code>101</code>. Nå får du hundre linjer, men koden er like kort.
        </p>
        <p className="hintline">
          Bruk <b>Linje for linje</b> og følg med på <code>i</code> i tabellen.
        </p>
      </div>
    </div>
  </div>
);
