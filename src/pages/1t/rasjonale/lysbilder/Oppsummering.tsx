import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, V, X } from '../../../../presentasjon/matte';
import { Fx, Mengde } from '../../funksjoner/felles';
import { Asymptoter, Ras, hyperbel } from '../felles';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="cols wide-left">
      <div className="stack">
        <div className="boxed">
          <span className="label">Rasjonal funksjon</span>
          <span className="math">
            <Fx /> ={' '}
            <Frac
              n={
                <>
                  <V c="a" />
                  <X /> + <V c="b" />
                </>
              }
              d={
                <>
                  <V c="c" />
                  <X /> + <V c="d" />
                </>
              }
            />
          </span>
          <p className="small">Polynom i teller og nevner. Grafen er en hyperbel.</p>
        </div>
        <div className="tablewrap">
          <table className="cases">
            <thead>
              <tr>
                <th>Hva</th>
                <th>Hvordan</th>
                <th>Eksempel</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vertikal asymptote</td>
                <td>nevneren = 0</td>
                <td className="math">
                  <X /> = −3
                </td>
              </tr>
              <tr>
                <td>Horisontal asymptote</td>
                <td>
                  y = <Frac n={<V c="a" />} d={<V c="c" />} />
                </td>
                <td className="math">y = 2</td>
              </tr>
              <tr>
                <td>Nullpunkt</td>
                <td>telleren = 0</td>
                <td className="math">
                  <X /> = <Frac n="1" d="2" />
                </td>
              </tr>
              <tr>
                <td>Definisjonsmengde</td>
                <td>alle tall unntatt den vertikale asymptoten</td>
                <td className="math nw">
                  <Mengde m="D" /> = ℝ \ {'{'}−3{'}'}
                </td>
              </tr>
              <tr>
                <td>Verdimengde</td>
                <td>alle tall unntatt den horisontale asymptoten</td>
                <td className="math nw">
                  <Mengde m="V" /> = ℝ \ {'{'}2{'}'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="stack">
        <FunkGraf
          kurver={hyperbel(2, -1, 1, 3, 'c1')}
          punkter={[{ x: 0.5, y: 0, farge: 'pen' }]}
          ekstra={(s) => <Asymptoter s={s} r={2} x={-3} />}
          xmin={-10}
          xmax={6}
          ymin={-6}
          ymax={10}
          h={380}
          title="Grafen til f(x) = (2x − 1)/(x + 3) med asymptotene y = 2 og x = −3"
        />
        <p className="math" style={{ textAlign: 'center' }}>
          Eksempel: <Fx /> = <Ras a={2} b={-1} c={1} d={3} />
        </p>
      </div>
    </div>
  </div>
);
