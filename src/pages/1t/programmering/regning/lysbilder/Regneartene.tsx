import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

const OPERATORER: [string, string, string, string][] = [
  ['+', 'addisjon', '3 + 4', '7'],
  ['-', 'subtraksjon', '3 - 4', '-1'],
  ['*', 'multiplikasjon', '1.5 * 4', '6.0'],
  ['/', 'divisjon', '7 / 2', '3.5'],
  ['**', 'potens', '2 ** 3', '8'],
];

export const Regneartene: React.FC = () => (
  <div className="slide">
    <div className="kicker">Tallregning</div>
    <h2>Regneartene i Python</h2>
    <div className="cols">
      <div className="stack">
        <div className="tablewrap">
          <table className="cases">
            <thead>
              <tr>
                <th>Tegn</th>
                <th>Betyr</th>
                <th>Eksempel</th>
                <th>Svar</th>
              </tr>
            </thead>
            <tbody>
              {OPERATORER.map(([op, navn, eks, svar]) => (
                <tr key={op}>
                  <td>
                    <b className="py-inline pen">{op}</b>
                  </td>
                  <td>{navn}</td>
                  <td>
                    <Kode inline>{eks}</Kode>
                  </td>
                  <td>
                    <code className="py-inline">{svar}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel stack" style={{ gap: 6 }}>
          <b>Legg merke til</b>
          <ul className="stack small" style={{ gap: 4, paddingLeft: '1.2em', margin: 0 }}>
            <li>
              Desimaltegnet er <b>punktum</b>. 34,56 skrives <code>34.56</code>.
            </li>
            <li>
              Potens skrives med to gangetegn: 2<sup>3</sup> blir <code>2**3</code>.
            </li>
            <li>
              Divisjon gir alltid desimaltall: <code>6/2</code> blir <code>3.0</code>.
            </li>
          </ul>
        </div>
      </div>
      <div className="stack">
        <Kodeboks kode={'print(3 + 4)\nprint(3 - 4)\nprint(1.5 * 4)\nprint(7 / 2)\nprint(2 ** 3)'} />
        <p className="hintline">
          Prøv selv: Hva er 2<sup>10</sup>? Hva blir <code>6/2</code>? Hva skjer med <code>2^3</code>?
        </p>
      </div>
    </div>
  </div>
);
