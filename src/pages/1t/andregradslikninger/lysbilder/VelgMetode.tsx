import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';

const RADER: [React.ReactNode, React.ReactNode, React.ReactNode][] = [
  ['Ingen x-ledd', <><Xk /> − 16 = 0</>, 'Kvadratrot og ±'],
  ['Kvadrat av en parentes', <>(<X /> − 1)<sup>2</sup> = 9</>, 'Kvadratrot og ±'],
  ['Allerede et produkt', <>(<X /> − 1)(<X /> + 4) = 0</>, 'Produktregelen'],
  ['Ingen konstantledd', <>2<Xk /> − 6<X /> = 0</>, 'Sett x utenfor, og bruk produktregelen'],
  ['Passer en kvadratsetning', <><Xk /> − 8<X /> + 16 = 0</>, 'Kvadratsetning, og produktregelen'],
  ['Tre ledd med fine tall', <><Xk /> + 2<X /> − 8 = 0</>, 'Sum og produkt'],
  ['Alt annet', <>3<Xk /> − 5<X /> + 1 = 0</>, 'abc-formelen, neste presentasjon'],
];

export const VelgMetode: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oversikt</div>
    <h2>Hvilken metode velger jeg?</h2>
    <div className="tablewrap">
      <table className="cases">
        <thead>
          <tr><th>Likningen</th><th>Eksempel</th><th>Metode</th></tr>
        </thead>
        <tbody>
          {RADER.map(([a, b, c], i) => (
            <tr key={i}><td>{a}</td><td className="math">{b}</td><td>{c}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="muted">Alle metodene gir samme svar. Velg den som er raskest for akkurat denne likningen.</p>
  </div>
);
