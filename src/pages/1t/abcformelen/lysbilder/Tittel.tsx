import React from 'react';
import { ABC, Gen } from '../../../../presentasjon/matte';
import { Graf } from '../../../../presentasjon/Graf';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Andregradsuttrykk og -likninger</div>
    <h1>abc-formelen</h1>
    <p className="lede">Én formel som løser alle andregradslikninger, og et tall som forteller hvor mange løsninger de har.</p>
    <div className="cols wide-left">
      <div className="stack">
        <p className="math big"><Gen /> = 0</p>
        <div className="boxed math big"><ABC /></div>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
      <Graf a={2} b={-3} c={-2} ymin={-5} ymax={8} h={320} roots={[{ x: 2, cls: 'c1', name: 'x₁' }, { x: -0.5, cls: 'c2', name: 'x₂' }]} title="Grafen til 2x² − 3x − 2 med nullpunktene 2 og −1/2" />
    </div>
  </div>
);
