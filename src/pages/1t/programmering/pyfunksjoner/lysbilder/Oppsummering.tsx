import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">Lage og bruke en funksjon</span>
          <Kode>{'def f(x):\n    return x**2 - 2*x - 3\n\ny = f(5)\nprint(f(-1))'}</Kode>
          <ul className="stack small" style={{ gap: 4, paddingLeft: '1.2em', margin: '10px 0 0' }}>
            <li>
              <code>def</code> lager funksjonen. Den kjøres først når vi kaller den, som <code>f(5)</code>.
            </li>
            <li>Kolon og innrykk, som i if og løkker.</li>
            <li>Flere parametre skilles med komma.</li>
          </ul>
        </div>
      </div>
      <div className="stack">
        <div className="panel stack small" style={{ gap: 8 }}>
          <span>
            <b>return</b> sender svaret tilbake, så det kan brukes videre. Funksjonen slutter ved return.
          </span>
          <span>
            <b>print</b> viser bare noe på skjermen. En funksjon uten return gir <code>None</code>.
          </span>
          <span>
            <b>Lokale variabler</b> laget inne i en funksjon finnes bare der.
          </span>
        </div>
        <p className="small">
          Med funksjoner skriver vi en formel én gang, og bruker den så mange ganger vi vil: i verditabeller, løkker og
          if-setninger.
        </p>
      </div>
    </div>
  </div>
);
