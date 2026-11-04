import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Andregradsuttrykk og -likninger</div>
    <h1>Identitet og bevis</h1>
    <p className="lede">Noen likheter stemmer for alle tall. Hvordan kan vi vite det, når vi ikke kan prøve alle tallene?</p>
    <div className="grid2">
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Stemmer for ett tall</h3>
        <p className="math big">2<X /> + 3 = 7</p>
      </div>
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Stemmer for alle tall</h3>
        <p className="math big">(<X /> + 1)<sup>2</sup> = <Xk /> + 2<X /> + 1</p>
      </div>
    </div>
    <p className="hintline">
      Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
    </p>
  </div>
);
