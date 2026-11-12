import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, X } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';
import { Asymptoter, Ras, hyperbel } from '../felles';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Funksjoner</div>
    <h1>Rasjonale funksjoner</h1>
    <p className="lede">Brøker med variabelen i nevneren. Grafen er delt i to, og nærmer seg linjer den aldri treffer.</p>
    <div className="cols wide-left">
      <FunkGraf
        kurver={hyperbel(2, -3, 4, 6, 'c1')}
        ekstra={(s) => <Asymptoter s={s} r={0.5} x={-1.5} />}
        xmin={-6}
        xmax={6}
        ymin={-5}
        ymax={5}
        h={380}
        title="Grafen til f(x) = (2x − 3)/(4x + 6) med asymptotene y = 1/2 og x = −3/2"
      />
      <div className="stack">
        <div className="panel math big c1">
          <Fx />
          <Op>=</Op>
          <Ras a={2} b={-3} c={4} d={6} />
        </div>
        <p>
          Grafen kalles en <b>hyperbel</b>. Den nærmer seg de stiplede linjene{' '}
          <span className="math nw">
            y = <Frac n="1" d="2" />
          </span>{' '}
          og{' '}
          <span className="math nw">
            <X /> = −<Frac n="3" d="2" />
          </span>
          , men treffer dem aldri. Linjene kalles <b className="c2">asymptoter</b>.
        </p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
