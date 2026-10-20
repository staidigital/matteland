import React from 'react';
import { FactorForm, Gen, Op, V, X, X1, X2 } from '../../../../presentasjon/matte';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="boxed math big">
      <Gen />
      <Op>=</Op>
      <FactorForm farge />
    </div>
    <div className="cols">
      <ol className="steps">
        <li>
          <span className="no">1</span>
          <div>Sett uttrykket lik 0.</div>
        </li>
        <li>
          <span className="no">2</span>
          <div>
            Finn <X1 /> og <X2 /> med abc-formelen eller CAS.
          </div>
        </li>
        <li>
          <span className="no">3</span>
          <div>
            Skriv{' '}
            <span className="math">
              <FactorForm />
            </span>
            . Husk <V c="a" /> og fortegnene.
          </div>
        </li>
        <li>
          <span className="no">4</span>
          <div>Kontroller ved å gange ut.</div>
        </li>
      </ol>
      <div className="tablewrap">
        <table className="cases">
          <thead>
            <tr>
              <th>Diskriminant</th>
              <th>Nullpunkter</th>
              <th>Faktorisering</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="math">
                <V c="D" /> &gt; 0
              </td>
              <td>to</td>
              <td className="math">
                <FactorForm />
              </td>
            </tr>
            <tr>
              <td className="math">
                <V c="D" /> = 0
              </td>
              <td>ett</td>
              <td className="math">
                <V c="a" />(<X /> − <X1 />)<sup>2</sup>
              </td>
            </tr>
            <tr>
              <td className="math">
                <V c="D" /> &lt; 0
              </td>
              <td>ingen</td>
              <td>ikke mulig</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
