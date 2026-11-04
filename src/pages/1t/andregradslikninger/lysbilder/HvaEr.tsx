import React from 'react';
import { Graf } from '../../../../presentasjon/Graf';
import { Gen, V, X, Xk } from '../../../../presentasjon/matte';

const RADER: [React.ReactNode, number, number, number][] = [
  [<><Xk /> − 5<X /> + 6 = 0</>, 1, -5, 6],
  [<>2<Xk /> − 8 = 0</>, 2, 0, -8],
  [<>3<Xk /> + 6<X /> = 0</>, 3, 6, 0],
  [<><Xk /> = 4<X /> + 5 &nbsp;⟶&nbsp; <Xk /> − 4<X /> − 5 = 0</>, 1, -4, -5],
];

const t = (n: number) => String(n).replace('-', '−');

export const HvaEr: React.FC = () => (
  <div className="slide">
    <div className="kicker">Definisjon</div>
    <h2>Hva er en andregradslikning?</h2>
    <div className="boxed math big">
      <Gen /> = 0, &nbsp; der <V c="a" /> ≠ 0
    </div>
    <div className="cols wide-left">
      <div className="stack">
        <div className="tablewrap">
          <table className="cases">
            <thead>
              <tr><th>Likning</th><th><V c="a" /></th><th><V c="b" /></th><th><V c="c" /></th></tr>
            </thead>
            <tbody>
              {RADER.map(([l, a, b, c], i) => (
                <tr key={i}><td className="math">{l}</td><td>{t(a)}</td><td>{t(b)}</td><td>{t(c)}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>Løsningene er de <X />-verdiene som gjør venstre side lik 0. På grafen er det der parabelen krysser <X />-aksen, og det kan være to, én eller ingen steder.</p>
      </div>
      <Graf a={1} b={-5} c={6} ymin={-3} ymax={8} h={320} roots={[{ x: 2, cls: 'c1', name: 'x₁' }, { x: 3, cls: 'c2', name: 'x₂' }]} title="Grafen til x² − 5x + 6 krysser x-aksen i 2 og 3" />
    </div>
  </div>
);
