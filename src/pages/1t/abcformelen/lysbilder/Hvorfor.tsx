import React from 'react';
import { Graf } from '../../../../presentasjon/Graf';
import { Poly, X } from '../../../../presentasjon/matte';

const r = Math.sqrt(13);

export const Hvorfor: React.FC = () => (
  <div className="slide">
    <div className="kicker">Hvorfor en formel?</div>
    <h2>Når de enkle metodene ikke strekker til</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed math big"><Poly a={1} b={3} c={-1} /> = 0</div>
        <ul style={{ margin: 0, paddingLeft: '1.2em' }}>
          <li>Kvadratrot? Nei, likningen har et <X />-ledd.</li>
          <li>Felles faktor? Nei, det er ikke noe felles.</li>
          <li>Sum og produkt? Nei, ingen hele tall har sum 3 og produkt −1.</li>
        </ul>
        <p>Grafen viser likevel at det finnes to løsninger. Vi trenger en metode som virker for <b>alle</b> andregradslikninger.</p>
      </div>
      <Graf
        a={1}
        b={3}
        c={-1}
        ymin={-5}
        ymax={8}
        roots={[
          { x: (-3 + r) / 2, cls: 'c1', name: 'x₁' },
          { x: (-3 - r) / 2, cls: 'c2', name: 'x₂' },
        ]}
        title="Grafen til x² + 3x − 1 krysser x-aksen i omtrent 0,30 og −3,30"
      />
    </div>
  </div>
);
