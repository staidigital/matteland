import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Konsoll } from '../../../../../presentasjon/python/Konsoll';

const TYPER: [string, string, string][] = [
  ['int', 'heltall', '7,  -3,  2024'],
  ['float', 'desimaltall', '2.5,  3.0,  0.1'],
  ['str', 'tekst', "'7',  'Hei',  'x = 3'"],
];

export const Typer: React.FC = () => (
  <div className="slide">
    <div className="kicker">Typer</div>
    <h2>Heltall, desimaltall og tekst</h2>
    <div className="cols">
      <div className="stack">
        <p>Hver verdi har en type. Typen bestemmer hva vi kan gjøre med verdien.</p>
        <div className="tablewrap">
          <table className="cases">
            <thead>
              <tr>
                <th>Type</th>
                <th>Betyr</th>
                <th>Eksempler</th>
              </tr>
            </thead>
            <tbody>
              {TYPER.map(([t, n, e]) => (
                <tr key={t}>
                  <td>
                    <code className="py-inline pen">{t}</code>
                  </td>
                  <td>{n}</td>
                  <td>
                    <Kode inline>{e}</Kode>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel stack small" style={{ gap: 6 }}>
          <span>
            <code>7</code> er et tall, men <code>'7'</code> er tekst. Med tekst betyr <code>+</code> «sett sammen»:{' '}
            <code>'3' + '4'</code> blir <code>'34'</code>.
          </span>
          <span>
            Vi gjør om med <code>int( )</code>, <code>float( )</code> og <code>str( )</code>. Funksjonen <code>type( )</code>{' '}
            forteller hvilken type en verdi har.
          </span>
        </div>
      </div>
      <div className="stack">
        <Konsoll
          forslag={['type(7)', 'type(7 / 7)', "type('7')", "'3' + '4'", "'3' + 4", "int('3') + 4", "'ha' * 3"]}
        />
        <p className="hintline">Gjett svaret før du trykker Enter.</p>
      </div>
    </div>
  </div>
);
