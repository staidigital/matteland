import React from 'react';
import { V, X } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="tablewrap">
      <table className="cases">
        <thead>
          <tr>
            <th>Skjæring</th>
            <th>Vi vet at</th>
            <th>Vi gjør</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b className="c2">med y-aksen</b>
            </td>
            <td className="math">
              <X /> = 0
            </td>
            <td>
              regner ut{' '}
              <span className="math">
                <Fx x="0" />
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <b className="c1">med x-aksen</b> (nullpunkt)
            </td>
            <td className="math">
              <V c="y" /> = 0
            </td>
            <td>
              løser{' '}
              <span className="math">
                <Fx /> = 0
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <b className="pen">mellom grafer</b>
            </td>
            <td className="math">
              <Fx /> = <Fx f="g" />
            </td>
            <td>
              løser likningen, og setter <X /> inn i <i className="v">f</i> eller <i className="v">g</i> for å finne{' '}
              <V c="y" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="cols">
      <div className="boxed">
        <span className="label">Likninger grafisk</span>
        Venstresiden blir <Fx />, høyresiden blir <Fx f="g" />. Løsningen av likningen er <X />
        -koordinaten til skjæringspunktet.
      </div>
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Reflekter og diskuter</h3>
        <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
          <li>
            Hvorfor spiller det ingen rolle om du bruker <i className="v">f</i> eller <i className="v">g</i> for å finne{' '}
            <V c="y" />
            -verdien til skjæringspunktet?
          </li>
          <li>
            Hvordan kan vi bruke skjæringspunkter til å finne når en funksjon har en bestemt <V c="y" />
            -verdi?
          </li>
        </ul>
      </div>
    </div>
  </div>
);
