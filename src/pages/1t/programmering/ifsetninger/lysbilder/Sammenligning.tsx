import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Konsoll } from '../../../../../presentasjon/python/Konsoll';

const OPERATORER: [string, string, string, string][] = [
  ['==', 'er lik', '4 == 2 + 2', 'True'],
  ['!=', 'er ikke lik', '4 != 5', 'True'],
  ['<', 'mindre enn', '3 < 2', 'False'],
  ['>', 'større enn', '3 > 2', 'True'],
  ['<=', 'mindre enn eller lik', '3 <= 3', 'True'],
  ['>=', 'større enn eller lik', '2 >= 3', 'False'],
];

export const Sammenligning: React.FC = () => (
  <div className="slide">
    <div className="kicker">Sammenligninger</div>
    <h2>Sant eller usant?</h2>
    <div className="cols">
      <div className="stack">
        <p>
          En sammenligning gir enten <code>True</code> (sant) eller <code>False</code> (usant). Det er en egen type, som heter{' '}
          <code>bool</code>.
        </p>
        <div className="tablewrap">
          <table className="cases">
            <thead>
              <tr>
                <th>Tegn</th>
                <th>Betyr</th>
                <th>Eksempel</th>
                <th>Gir</th>
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
                    <Kode inline>{svar}</Kode>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="boxed">
          <span className="label">Ikke bland</span>
          <p className="small">
            <code>x = 5</code> gir x verdien 5. <code>x == 5</code> spør om x er lik 5.
          </p>
        </div>
      </div>
      <div className="stack">
        <Konsoll forslag={['x = 5', 'x == 5', 'x > 7', 'x != 5', '7 == 7.0', "'7' == 7", 'type(x < 3)']} />
        <p className="hintline">Gjett svaret før du trykker Enter.</p>
      </div>
    </div>
  </div>
);
