import React from 'react';
import { Frac, V } from '../../../../presentasjon/matte';
import { F } from '../felles';

const N = () => <V c="n" />;

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="tablewrap">
      <table className="cases">
        <thead>
          <tr>
            <th>Mønster</th>
            <th>Tall</th>
            <th>Formel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><b className="pen">Lineært</b>, fast økning <V c="a" /></td>
            <td className="math">4, 7, 10, 13, …</td>
            <td className="math"><F /> = <V c="a" /><N /> + <V c="b" /></td>
          </tr>
          <tr>
            <td><b className="pen">Kvadrattall</b></td>
            <td className="math">1, 4, 9, 16, …</td>
            <td className="math"><F /> = <N /><sup>2</sup></td>
          </tr>
          <tr>
            <td><b className="pen">Rektangeltall</b></td>
            <td className="math">2, 6, 12, 20, …</td>
            <td className="math"><F /> = <N />(<N /> + 1)</td>
          </tr>
          <tr>
            <td><b className="pen">Trekanttall</b></td>
            <td className="math">1, 3, 6, 10, …</td>
            <td className="math"><F /> = <Frac n={<><N />(<N /> + 1)</>} d="2" /></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="boxed">
      <span className="label">Slik finner du formelen</span>
      Se på figurene og på økningen. Fast økning gir en lineær formel, og fast økning i økningen gir en andregradsformel. Kontroller alltid
      formelen med en figur du kjenner.
    </div>
    <p className="muted">
      <N /> er et figurnummer og et naturlig tall. Eksempler kan vise at en påstand er gal, men et bevis må gjelde for alle tall.
    </p>
  </div>
);
