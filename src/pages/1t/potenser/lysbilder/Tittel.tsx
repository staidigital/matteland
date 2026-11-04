import React from 'react';
import { Frac, Rot, V } from '../../../../presentasjon/matte';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Basics</div>
    <h1>Potenser og røtter</h1>
    <p className="lede">Gjentatt multiplikasjon, reglene som følger av det, og hvorfor røtter også er potenser.</p>
    <div className="cols">
      <div className="boxed math big">
        <span className="mline">
          <span className="c1">2</span>
          <sup className="c2">5</sup> = 2 · 2 · 2 · 2 · 2 = 32
        </span>
        <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>
          <span className="c1">Grunntallet</span> er 2 og <span className="c2">eksponenten</span> er 5.
        </span>
      </div>
      <div className="stack">
        <div className="panel math">
          <span className="mline">2<sup>−1</sup> = <Frac n="1" d="2" /></span>
          <span className="mline"><V c="a" /><sup>1/2</sup> = <Rot><V c="a" /></Rot></span>
        </div>
        <p>Eksponenten kan også være negativ eller en brøk. Reglene er de samme.</p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
