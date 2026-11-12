import React from 'react';
import { ABC } from '../../../../../presentasjon/matte';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

export const EksempelAbc: React.FC = () => (
  <div className="slide">
    <div className="kicker">Eksempel · Andregradslikninger</div>
    <h2>Hvor mange løsninger?</h2>
    <div className="cols">
      <div className="stack">
        <div className="row">
          <ABC />
        </div>
        <p>
          I forrige presentasjon fikk vi rare svar når tallet under rottegnet var negativt. Nå kan programmet sjekke det først.
        </p>
        <div className="tablewrap">
          <table className="cases">
            <thead>
              <tr>
                <th>
                  <i className="v">b</i>
                  <sup>2</sup> − 4<i className="v">ac</i>
                </th>
                <th>Antall løsninger</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>positiv</td>
                <td>to</td>
              </tr>
              <tr>
                <td>null</td>
                <td>én</td>
              </tr>
              <tr>
                <td>negativ</td>
                <td>ingen</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="hintline">Prøv a = 1, b = 2, c = 5 (ingen løsning) og a = 1, b = −6, c = 9 (én løsning).</p>
      </div>
      <Kodeboks
        kode={
          "a = 2\nb = -4\nc = -6\n\nd = b**2 - 4*a*c\nif d > 0:\n    x1 = (-b + d**0.5) / (2*a)\n    x2 = (-b - d**0.5) / (2*a)\n    print('To løsninger:', x1, 'og', x2)\nelif d == 0:\n    print('Én løsning:', -b / (2*a))\nelse:\n    print('Ingen løsning')"
        }
        variabler
      />
    </div>
  </div>
);
