import React from 'react';
import { Op, Poly, X } from '../../../../presentasjon/matte';
import { Arealmodell } from '../felles';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Basics</div>
    <h1>Bokstavuttrykk og faktorisering</h1>
    <p className="lede">Å gange ut og å faktorisere er det samme regnestykket, bare i hver sin retning.</p>
    <div className="cols">
      <Arealmodell a={3} b={2} />
      <div className="stack">
        <div className="panel math">
          <span className="mline c1">(<X /> + 3)(<X /> + 2)</span>
          <span className="mline">
            <Op>=</Op>
            <Poly a={1} b={5} c={6} />
          </span>
        </div>
        <p>
          Hele rektangelet har arealet <span className="c1">(x + 3)(x + 2)</span>. De fire delene til sammen har arealet x² + 5x + 6. Det er
          samme areal, så uttrykkene er like.
        </p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
