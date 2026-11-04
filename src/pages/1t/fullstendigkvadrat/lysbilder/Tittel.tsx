import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { Hjorne } from '../felles';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Andregradsuttrykk og -likninger</div>
    <h1>Fullstendig kvadrat</h1>
    <p className="lede">Legg til det som mangler, så blir uttrykket et kvadrat vi kan lese av og regne videre med.</p>
    <div className="cols wide-left">
      <div className="stack">
        <div className="boxed math big">
          <span className="mline"><Xk /> + 6<X /> + 5</span>
          <span className="mline">= (<X /> + 3)<sup>2</sup> − 4</span>
        </div>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
      <Hjorne b={6} fylt />
    </div>
  </div>
);
