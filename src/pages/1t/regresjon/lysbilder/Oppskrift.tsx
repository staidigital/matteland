import React from 'react';

const GEOGEBRA: [string, string][] = [
  ['Lineær', 'FitLine(liste)'],
  ['Eksponentiell', 'FitExp(liste)'],
  ['Andregrad', 'FitPoly(liste, 2)'],
  ['Tredjegrad', 'FitPoly(liste, 3)'],
  ['Potens', 'FitPow(liste)'],
];

export const Oppskrift: React.FC = () => (
  <div className="slide">
    <div className="kicker">Lineær regresjon</div>
    <h2>Slik gjør du det</h2>
    <div className="cols">
      <div className="boxed">
        <span className="label">Lineær regresjon</span>
        <ol className="stack" style={{ gap: 8, paddingLeft: '1.2em', margin: 0 }}>
          <li>Kontroller dataene og avgjør hva som er x og y.</li>
          <li>Lag et spredningsdiagram.</li>
          <li>Tegn den rette linja som passer best til punktene.</li>
          <li>Bestem funksjonsuttrykket for linja.</li>
        </ol>
      </div>
      <div className="panel stack" style={{ gap: 8 }}>
        <b>I GeoGebra</b>
        <ol className="stack small" style={{ gap: 6, paddingLeft: '1.2em', margin: 0 }}>
          <li>Skriv x-verdiene i kolonne A og y-verdiene i kolonne B i regnearket.</li>
          <li>Merk cellene og velg «Regresjonsanalyse» → «Analyser».</li>
          <li>Velg modell nederst til venstre, for eksempel «Lineær».</li>
          <li>Kopier resultatet til grafikkfeltet med knappen øverst til høyre.</li>
        </ol>
      </div>
    </div>
    
    <div className="tablewrap">
      <table className="cases">
        <thead>
          <tr>
            <th>Modell</th>
            <th>Kommando i GeoGebra</th>
          </tr>
        </thead>
        <tbody>
          {GEOGEBRA.map(([m, k]) => (
            <tr key={m}>
              <td>{m}</td>
              <td>
                <code>{k}</code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="hintline">
      Lag først lista: <code>liste = {'{'}(0, 107), (1, 112), …{'}'}</code>. Engelske kommandonavn virker i alle språk.
    </p>
  </div>
);
