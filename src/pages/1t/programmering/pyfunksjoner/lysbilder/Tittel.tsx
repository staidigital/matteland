import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Programmering</div>
    <h1>Funksjoner</h1>
    <p className="lede">Vi lager våre egne kommandoer. En funksjon i Python kan være akkurat som en funksjon i matematikken.</p>
    <div className="cols wide-left">
      <Kodeboks kode={'def f(x):\n    return x**2 - 2*x - 3\n\nprint(f(5))\nprint(f(-1))'} variabler linjeForLinje />
      <div className="stack">
        <p>
          De to første linjene lager funksjonen <span className="math nw">f(x) = x² − 2x − 3</span>. Etterpå kan vi regne ut{' '}
          <span className="math nw">f(5)</span> og <span className="math nw">f(−1)</span> akkurat som i matematikken.
        </p>
        <p>Kjør programmet, og regn ut f(5) for hånd for å sjekke.</p>
        <p className="hintline">
          Bruk <b>Linje for linje</b>. Legg merke til at programmet hopper tilbake opp til funksjonen hver gang den brukes.
        </p>
      </div>
    </div>
  </div>
);
