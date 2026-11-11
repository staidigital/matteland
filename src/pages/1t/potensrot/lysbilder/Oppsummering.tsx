import React from 'react';
import { Rot, V, X } from '../../../../presentasjon/matte';
import { Fx, Intervall, Mengde } from '../../funksjoner/felles';
import { EkspGen } from '../../eksponentialfunksjoner/felles';
import { PotGen } from '../felles';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="grid2">
      <div className="boxed">
        <span className="label">Potensfunksjon</span>
        <span className="math">
          <Fx /> = <PotGen farge />, &nbsp;<V c="x" /> &gt; 0
        </span>
        <p className="small">Variabelen står i grunntallet. Grafen går gjennom (1 , a).</p>
      </div>
      <div className="panel">
        <span className="label small muted" style={{ fontWeight: 700 }}>
          IKKE Å FORVEKSLE MED
        </span>
        <span className="math mline">
          <Fx /> = <EkspGen />
        </span>
        <p className="small">Eksponentialfunksjon: variabelen står i eksponenten.</p>
      </div>
    </div>
    <div className="tablewrap">
      <table className="cases">
        <thead>
          <tr>
            <th>Eksponent</th>
            <th>Grafen</th>
            <th>Eksempel</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="math">b &gt; 1</td>
            <td>vokser og blir stadig brattere</td>
            <td className="math">
              <X />
              <sup>2</sup>, 2<X />
              <sup>1,5</sup>
            </td>
          </tr>
          <tr>
            <td className="math">0 &lt; b &lt; 1</td>
            <td>vokser og blir stadig slakkere</td>
            <td className="math">
              <X />
              <sup>1/2</sup> = <Rot><X /></Rot>
            </td>
          </tr>
          <tr>
            <td className="math">b &lt; 0</td>
            <td>avtar og nærmer seg aksene</td>
            <td className="math">
              <X />
              <sup>−1</sup> = 1/<X />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      <b>Rotfunksjoner:</b> uttrykket under en kvadratrot må være ≥ 0. <span className="math nw"><Rot><X /> − 3</Rot></span>{' '}
      har <span className="math nw"><Mengde m="D" /> = <Intervall a={3} b={Infinity} /></span>. Tredjerøtter (og andre
      odde røtter) er definert for alle reelle tall.
    </p>
  </div>
);
