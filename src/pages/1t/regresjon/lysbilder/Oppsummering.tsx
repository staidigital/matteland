import React from 'react';
import { V, X } from '../../../../presentasjon/matte';

const RAD: [string, React.ReactNode, string][] = [
  ['Lineær', <><V c="a" /><X /> + <V c="b" /></>, 'rett linje, fast økning'],
  ['Eksponentiell', <><V c="a" /> · <V c="b" /><sup><i className="v">x</i></sup></>, 'fast prosent, ikke gjennom origo'],
  ['Andregrad', <><V c="a" /><X /><sup>2</sup> + <V c="b" /><X /> + <V c="c" /></>, 'ett toppunkt eller bunnpunkt'],
  ['Tredjegrad', <><V c="a" /><X /><sup>3</sup> + … + <V c="d" /></>, 'både toppunkt og bunnpunkt'],
  ['Potens', <><V c="a" /><X /><sup><i className="v">b</i></sup></>, 'gjennom origo'],
];

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">Regresjon steg for steg</span>
          <ol className="stack" style={{ gap: 4, paddingLeft: '1.2em', margin: 0 }}>
            <li>Bestem hva som er x og y (for eksempel år etter 2015).</li>
            <li>Lag spredningsdiagram.</li>
            <li>Velg modelltype ut fra formen og situasjonen.</li>
            <li>Finn funksjonsuttrykket for hånd (linje) eller i GeoGebra.</li>
            <li>Bruk modellen, og vurder hvor langt den gjelder.</li>
          </ol>
        </div>
        <div className="panel">
          <b>Figurtall:</b> lag en tabell over figurnummer og antall, og bruk regresjon for å finne en formel. Sjekk formelen
          på en figur du ikke brukte.
        </div>
      </div>
      <div className="tablewrap">
        <table className="cases">
          <thead>
            <tr>
              <th>Modell</th>
              <th>Form</th>
              <th>Kjennetegn</th>
            </tr>
          </thead>
          <tbody>
            {RAD.map(([n, f, k]) => (
              <tr key={n}>
                <td>{n}</td>
                <td className="math nw">{f}</td>
                <td>{k}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
