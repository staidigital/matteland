import React from 'react';
import { Frac, Gen, V, X } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="boxed">
      <span className="label">Andregradsfunksjon</span>
      <span className="math">
        <Fx /> = <Gen />
      </span>{' '}
      &nbsp;Grafen er en parabel. <V c="a" /> &gt; 0 gir hul side opp (∪), <V c="a" /> &lt; 0 gir hul side ned (∩).
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
              <b className="pen">Symmetrilinje</b>
            </td>
            <td>den loddrette linja parabelen er symmetrisk om</td>
            <td className="math">
              <X /> = −
              <Frac
                n={<V c="b" />}
                d={
                  <>
                    2<V c="a" />
                  </>
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <b className="c2">Ekstremalpunkt</b>
            </td>
            <td>toppunkt eller bunnpunkt, høyere eller lavere enn punktene i nærheten</td>
            <td>parabel: sett x-verdien til symmetrilinja inn i f(x)</td>
          </tr>
          <tr>
            <td>
              <b className="c1">Nullpunkt</b>
            </td>
            <td>der grafen skjærer x-aksen</td>
            <td>
              løs{' '}
              <span className="math nw">
                <Fx /> = 0
              </span>
              , for eksempel med abc-formelen
            </td>
          </tr>
          <tr>
            <td>
              <b>Grad</b>
            </td>
            <td>den høyeste potensen av variabelen i polynomet</td>
            <td>
              høyere grad: bruk <code>Nullpunkt(f)</code> og <code>Ekstremalpunkt(f)</code> i GeoGebra
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="muted">
      En parabel har ett ekstremalpunkt og 0, 1 eller 2 nullpunkter. En tredjegradsfunksjon har 0 eller 2
      ekstremalpunkter og 1, 2 eller 3 nullpunkter. En modell gjelder bare i definisjonsmengden.
    </p>
  </div>
);
