import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';

const RAD: [string, string, string][] = [
  ['+  -', 'pluss og minus', '3 + 4 - 1'],
  ['*', 'ganging', '1.5*4'],
  ['/', 'deling (gir desimaltall)', '7/2'],
  ['**', 'potens', '2**3'],
  ['( )', 'endrer rekkefølgen', '(3**2 - 1)/(2**3 + 1)'],
];

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">print</span>
          <Kode>{"print('Svaret er', 3 + 5)"}</Kode>
          <ul className="stack small" style={{ gap: 4, paddingLeft: '1.2em', margin: '10px 0 0' }}>
            <li>Tekst står i anførselstegn og skrives ut som den står.</li>
            <li>Uten anførselstegn regner Python ut verdien.</li>
            <li>Komma skiller delene og gir et mellomrom.</li>
          </ul>
        </div>
        <div className="panel small stack" style={{ gap: 6 }}>
          <span>
            <b>Program:</b> kjøres ovenfra og ned. Bruk <code>print</code> for å se svaret.
          </span>
          <span>
            <b>Konsoll:</b> én linje om gangen, svaret kommer med en gang.
          </span>
        </div>
      </div>
      <div className="stack">
        <div className="tablewrap">
          <table className="cases">
            <thead>
              <tr>
                <th>Tegn</th>
                <th>Betyr</th>
                <th>Eksempel</th>
              </tr>
            </thead>
            <tbody>
              {RAD.map(([t, b, e]) => (
                <tr key={t}>
                  <td>
                    <b className="py-inline pen">{t}</b>
                  </td>
                  <td>{b}</td>
                  <td>
                    <Kode inline>{e}</Kode>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small">
          Husk <b>punktum</b> som desimaltegn, og <b>parentes</b> rundt teller og nevner med flere ledd.
        </p>
      </div>
    </div>
  </div>
);
