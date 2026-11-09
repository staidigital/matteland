import React from 'react';
import { Frac, V } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';
import { EkspGen } from '../felles';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="boxed">
      <span className="label">Eksponentialfunksjon</span>
      <span className="math">
        <Fx /> = <EkspGen farge />
      </span>{' '}
      &nbsp;der <V c="a" /> &gt; 0 og <V c="b" /> &gt; 0. Variabelen står i eksponenten.
    </div>
    <div className="tablewrap">
      <table className="cases">
        <thead>
          <tr>
            <th>Begrep</th>
            <th>Forteller</th>
            <th>Slik finner vi det</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b className="c2">a</b>
            </td>
            <td>startverdien, der grafen skjærer y-aksen</td>
            <td className="math">
              <Fx x="0" /> = <V c="a" />
            </td>
          </tr>
          <tr>
            <td>
              <b className="c1">b</b> (vekstfaktor)
            </td>
            <td>
              hva vi ganger med for hver enhet mot høyre. <V c="b" /> &gt; 1: grafen stiger. <V c="b" /> &lt; 1: grafen
              faller.
            </td>
            <td className="math">
              1 ± <Frac n={<V c="p" />} d="100" />
            </td>
          </tr>
          <tr>
            <td>
              <b className="pen">Prosentendring</b>
            </td>
            <td>hvor mange prosent verdien endres hver periode</td>
            <td>sammenlign vekstfaktoren med 100 %: 0,86 = 86 % gir −14 %</td>
          </tr>
          <tr>
            <td>
              <b>Når blir verdien …?</b>
            </td>
            <td>hvor lang tid det tar å nå en bestemt verdi</td>
            <td>
              tegn grafen og en vannrett linje, og bruk <code>Skjæring</code> i GeoGebra
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="muted">
      Lineære funksjoner legger til det samme tallet hver gang. Eksponentialfunksjoner ganger med det samme tallet hver
      gang. Grafen når aldri x-aksen og går aldri gjennom origo.
    </p>
  </div>
);
