import React, { useState } from 'react';
import { Graf } from '../../../../presentasjon/Graf';
import { Factored, V, X, dec, near } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

export const Nullproduktregelen: React.FC = () => {
  const [x, setX] = useState(0.5);
  const A = x - 2;
  const B = x - 3;
  const P = A * B;
  return (
    <div className="slide">
      <div className="kicker">Grunnidé</div>
      <h2>Nullproduktregelen</h2>
      <div className="boxed math">
        Hvis <V c="A" /> · <V c="B" /> = 0, så er <V c="A" /> = 0 eller <V c="B" /> = 0.
      </div>
      <div className="cols">
        <div className="stack">
          <p>
            Et produkt kan bare bli null hvis minst én av faktorene er null. Flytt <X /> og se når{' '}
            <span className="math">
              <Factored a={1} r1={2} r2={3} />
            </span>{' '}
            blir 0.
          </p>
          <Slider id="zp-x" label={<><X /> =</>} value={x} min={-1} max={6} step={0.5} onChange={setX} />
          <table className="zt">
            <tbody>
              <tr className={near(A, 0) ? 'zero' : ''}>
                <td className="c1">
                  (<X /> − 2)
                </td>
                <td>{dec(A)}</td>
              </tr>
              <tr className={near(B, 0) ? 'zero' : ''}>
                <td className="c2">
                  (<X /> − 3)
                </td>
                <td>{dec(B)}</td>
              </tr>
              <tr className={near(P, 0) ? 'zero' : ''}>
                <td>
                  (<X /> − 2)(<X /> − 3)
                </td>
                <td>{dec(P)}</td>
              </tr>
            </tbody>
          </table>
          <p>
            Altså gir{' '}
            <span className="math">
              <Factored a={1} r1={2} r2={3} /> = 0
            </span>{' '}
            at{' '}
            <span className="math">
              <X /> = <span className="c1">2</span>
            </span>{' '}
            eller{' '}
            <span className="math">
              <X /> = <span className="c2">3</span>
            </span>
            . Faktorene forteller hvor nullpunktene er, og nullpunktene forteller hva faktorene er.
          </p>
        </div>
        <Graf
          a={1}
          b={-5}
          c={6}
          xmin={-2}
          xmax={7}
          ymin={-3}
          ymax={9}
          point={{ x, y: P }}
          roots={[
            { x: 2, cls: 'c1', name: 'x₁' },
            { x: 3, cls: 'c2', name: 'x₂' },
          ]}
          title="Grafen til (x − 2)(x − 3) med et punkt som følger glidebryteren"
        />
      </div>
    </div>
  );
};
