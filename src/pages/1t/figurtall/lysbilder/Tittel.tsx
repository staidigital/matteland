import React from 'react';
import { Figurrekke } from '../felles';
import { prikker } from '../oppgaver';

const NR = [1, 2, 3, 4];

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Basics</div>
    <h1>Figurtall og generalisering</h1>
    <p className="lede">Fra noen få figurer til en formel som gjelder for alle.</p>
    <div className="cols wide-left">
      <div className="stack">
        <div className="panel"><Figurrekke figurer={NR.map((n) => prikker('kvadrat', n))} /></div>
        <div className="panel"><Figurrekke figurer={NR.map((n) => prikker('trekant', n))} /></div>
      </div>
      <div className="stack">
        <p>Hvor mange prikker er det i figur 4? Det kan du telle. Men hva med figur 100?</p>
        <p>
          Å <b>generalisere</b> er å finne en regel som gjelder for alle tilfellene, ikke bare de vi har sett.
        </p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
