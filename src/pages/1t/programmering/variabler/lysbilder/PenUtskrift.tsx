import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

const RADER: [string, string, string?][] = [
  ['{totalt}', '89.69999999999999'],
  ['{round(totalt, 2)}', '89.7', 'to desimaler eller færre'],
  ['{totalt:.2f}', '89.70', 'alltid to desimaler'],
];

export const PenUtskrift: React.FC = () => (
  <div className="slide">
    <div className="kicker">print</div>
    <h2>Pen utskrift med f-strenger</h2>
    <div className="cols">
      <div className="stack">
        <p>
          Setter vi <code>f</code> foran anførselstegnet, kan vi skrive variabler og regnestykker inne i teksten mellom{' '}
          <code>{'{ }'}</code>.
        </p>
        <Kode>{"print(f'{antall} stk koster {totalt} kr')"}</Kode>
      </div>
      <div className="tablewrap">
        <table className="cases">
          <thead>
            <tr>
              <th>Kode</th>
              <th>Gir</th>
            </tr>
          </thead>
          <tbody>
            {RADER.map(([kode, gir, merk]) => (
              <tr key={kode}>
                <td>
                  <Kode inline>{kode}</Kode>
                </td>
                <td>
                  <code className="py-inline">{gir}</code>
                  {merk && <span className="small muted"> &nbsp;{merk}</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <Kodeboks
      kode={
        "pris = 29.9\nantall = 3\ntotalt = pris * antall\nprint(f'{antall} stk koster {totalt} kr')\nprint(f'{antall} stk koster {round(totalt, 2)} kr')\nprint(f'{antall} stk koster {totalt:.2f} kr')"
      }
    />
    <p className="hintline">
      <code>round(x, 2)</code> runder av til to desimaler. Det virker også utenfor f-strenger.
    </p>
  </div>
);
