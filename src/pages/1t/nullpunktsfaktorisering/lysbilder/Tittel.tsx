import React from 'react';
import { Graf } from '../../../../presentasjon/Graf';
import { Factored, Op, Poly, X } from '../../../../presentasjon/matte';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Andregradsuttrykk</div>
    <h1>Nullpunkts&shy;faktorisering</h1>
    <p className="lede">
      Når vi vet hvor grafen krysser <X />
      -aksen, kan vi skrive andregradsuttrykket som et produkt av faktorer.
    </p>
    <div className="cols wide-left">
      <Graf
        a={2}
        b={-2}
        c={-12}
        ymin={-14}
        ymax={10}
        roots={[
          { x: 3, cls: 'c1', name: 'x₁' },
          { x: -2, cls: 'c2', name: 'x₂' },
        ]}
        title="Grafen til 2x² − 2x − 12 med nullpunktene 3 og −2"
      />
      <div className="stack">
        <div className="boxed math big">
          <Poly a={2} b={-2} c={-12} />
          <Op>=</Op>
          <Factored a={2} r1={3} r2={-2} />
        </div>
        <p>
          Grafen skjærer <X />
          -aksen i <span className="c1">3</span> og <span className="c2">−2</span>. Det er nok til å finne faktorene.
        </p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
