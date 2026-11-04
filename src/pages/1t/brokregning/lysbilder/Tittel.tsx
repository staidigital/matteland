import React from 'react';
import { Brokstolpe } from '../felles';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Basics</div>
    <h1>Brøkregning</h1>
    <p className="lede">Forkorte, finne fellesnevner, gange og dele, og det samme med bokstaver.</p>
    <div className="cols wide-left">
      <div className="stack" style={{ gap: 10 }}>
        <Brokstolpe n={1} d={2} merke="1/2" />
        <Brokstolpe n={2} d={4} merke="2/4" farge="var(--r2)" />
        <Brokstolpe n={4} d={8} merke="4/8" farge="var(--pen)" />
      </div>
      <div className="stack">
        <p>Tre brøker, samme verdi. Delene er ulikt store, men den fargede lengden er den samme.</p>
        <p>Brøkregning går igjen i likninger, funksjoner og derivasjon, så det lønner seg å ha det på plass nå.</p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
