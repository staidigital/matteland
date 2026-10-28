import React from 'react';
import { Frac, V, X } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';

const Sub: React.FC<{ c: string; n: string }> = ({ c, n }) => (
  <span className="nw">
    <V c={c} />
    <sub>{n}</sub>
  </span>
);

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="boxed">
      <span className="label">Lineær funksjon</span>
      <span className="math">
        <Fx /> = <i className="v c2">a</i>
        <X /> + <i className="v pen">b</i>
      </span>{' '}
      &nbsp;Grafen er en rett linje med stigningstall <span className="c2">a</span> og konstantledd{' '}
      <span className="pen">b</span>.
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
              <b className="c2">Stigningstall a</b>
            </td>
            <td>hvor mye funksjonsverdien endrer seg når x øker med 1</td>
            <td className="math">
              <V c="a" /> ={' '}
              <Frac
                n={
                  <>
                    Δ<V c="y" />
                  </>
                }
                d={
                  <>
                    Δ<X />
                  </>
                }
              />{' '}
              ={' '}
              <Frac
                n={
                  <>
                    <Sub c="y" n="2" /> − <Sub c="y" n="1" />
                  </>
                }
                d={
                  <>
                    <Sub c="x" n="2" /> − <Sub c="x" n="1" />
                  </>
                }
              />
            </td>
          </tr>
          <tr>
            <td>
              <b className="pen">Konstantledd b</b>
            </td>
            <td>hvor linja skjærer y-aksen</td>
            <td>
              les av (0 , <V c="b" />), eller sett inn et punkt i <span className="math nw"><V c="y" /> = <V c="a" /><V c="x" /> + <V c="b" /></span>
            </td>
          </tr>
          <tr>
            <td>
              <b>Ettpunktsformelen</b>
            </td>
            <td>likningen når vi kjenner a og ett punkt</td>
            <td className="math">
              <V c="y" /> − <Sub c="y" n="0" /> = <V c="a" />(<X /> − <Sub c="x" n="0" />)
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p className="muted">
      <V c="a" /> &gt; 0: linja stiger. &nbsp;<V c="a" /> &lt; 0: linja synker. &nbsp;<V c="a" /> = 0: linja er
      vannrett. &nbsp;<V c="b" /> = 0: linja går gjennom origo.
    </p>
  </div>
);
