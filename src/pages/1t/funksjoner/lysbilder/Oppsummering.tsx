import React from 'react';
import { Op, X } from '../../../../presentasjon/matte';
import { Fx, Intervall, Mengde } from '../felles';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="boxed">
      <span className="label">Funksjon</span>
      Når hver verdi av <X /> gir én og aldri mer enn én funksjonsverdi <Fx />, sier vi at <i className="v">f</i> er en
      funksjon av <X />.
    </div>
    <div className="cols">
      <ol className="steps">
        <li>
          <span className="no">1</span>
          <div>
            Bruke skrivemåten:{' '}
            <span className="math">
              <Fx x="3" />
              <Op>=</Op>230
            </span>{' '}
            betyr at <X /> = 3 gir funksjonsverdien 230.
          </div>
        </li>
        <li>
          <span className="no">2</span>
          <div>
            Gå mellom funksjonsuttrykk, verditabell og graf. Punktene på grafen er{' '}
            <span className="math">
              (<X /> , <Fx />)
            </span>
            .
          </div>
        </li>
        <li>
          <span className="no">3</span>
          <div>
            Lese av <Fx /> for en gitt <X />, og finne <X /> når <Fx /> er gitt.
          </div>
        </li>
        <li>
          <span className="no">4</span>
          <div>Avgjøre om en sammenheng er en funksjon.</div>
        </li>
      </ol>
      <div className="tablewrap">
        <table className="cases">
          <thead>
            <tr>
              <th>Begrep</th>
              <th>Forteller</th>
              <th>Eksempel</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="math c1">
                <Mengde m="D" />
              </td>
              <td>hvilke verdier <X /> kan ha</td>
              <td className="math">
                <Intervall a={0} b={12} aMed={false} />
              </td>
            </tr>
            <tr>
              <td className="math c2">
                <Mengde m="V" />
              </td>
              <td>hvilke verdier <Fx /> kan få</td>
              <td className="math">
                <Intervall a={200} b={320} aMed={false} />
              </td>
            </tr>
            <tr>
              <td className="math">[ ]</td>
              <td>endepunktet er med</td>
              <td className="small">fylt sirkel</td>
            </tr>
            <tr>
              <td className="math">⟨ ⟩</td>
              <td>endepunktet er ikke med</td>
              <td className="small">åpen sirkel</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
