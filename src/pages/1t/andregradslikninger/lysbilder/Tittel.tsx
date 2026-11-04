import React from 'react';
import { Graf } from '../../../../presentasjon/Graf';
import { X, Xk } from '../../../../presentasjon/matte';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Andregradsuttrykk og -likninger</div>
    <h1>Andregrads&shy;likninger</h1>
    <p className="lede">Tre måter å løse likninger med <X /><sup>2</sup> på, uten formel.</p>
    <div className="cols wide-left">
      <div className="stack">
        <div className="panel stack" style={{ gap: 6 }}>
          <h3>Kvadratrot og ±</h3>
          <p className="math"><Xk /> = 25 &nbsp; gir &nbsp; <X /> = ±5</p>
        </div>
        <div className="panel stack" style={{ gap: 6 }}>
          <h3>Produktregelen og faktorisering</h3>
          <p className="math"><X />(<X /> − 4) = 0 &nbsp; gir &nbsp; <X /> = 0 eller <X /> = 4</p>
        </div>
        <div className="panel stack" style={{ gap: 6 }}>
          <h3>Sum og produkt</h3>
          <p className="math"><Xk /> + 5<X /> + 6 = 0 &nbsp; gir &nbsp; (<X /> + 2)(<X /> + 3) = 0</p>
        </div>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
      <Graf
        a={1}
        b={5}
        c={6}
        ymin={-4}
        ymax={10}
        roots={[
          { x: -2, cls: 'c1', name: 'x₁' },
          { x: -3, cls: 'c2', name: 'x₂' },
        ]}
        title="Grafen til x² + 5x + 6 krysser x-aksen i −3 og −2"
      />
    </div>
  </div>
);
