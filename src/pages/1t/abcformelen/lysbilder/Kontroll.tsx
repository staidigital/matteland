import React from 'react';
import { Frac, Poly, X } from '../../../../presentasjon/matte';

export const Kontroll: React.FC = () => (
  <div className="slide">
    <div className="kicker">Kontroll</div>
    <h2>Stemmer svaret?</h2>
    <div className="boxed math">
      <span className="label">Svaret vårt</span>
      <Poly a={2} b={-3} c={-2} /> = 0 har løsningene <X /> = 2 og <X /> = −<Frac n="1" d="2" />
    </div>
    <div className="grid2">
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Sett prøve</h3>
        <p className="math"><X /> = 2: &nbsp; 2 · 2<sup>2</sup> − 3 · 2 − 2 = 8 − 6 − 2 = 0 <span className="right">✓</span></p>
        <p className="math"><X /> = −<Frac n="1" d="2" />: &nbsp; 2 · <Frac n="1" d="4" /> + <Frac n="3" d="2" /> − 2 = <Frac n="1" d="2" /> + <Frac n="3" d="2" /> − 2 = 0 <span className="right">✓</span></p>
      </div>
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Bruk CAS i GeoGebra</h3>
        <pre className="kode">Løs(2x^2-3x-2=0)</pre>
        <p className="small muted">Svaret kommer som <code>{'{x = -1/2, x = 2}'}</code>. Du kan også tegne grafen og lese av nullpunktene med <code>Nullpunkt</code>.</p>
      </div>
    </div>
    <p className="muted">Uten hjelpemidler må du kunne regne det for hånd. Med hjelpemidler bruker du CAS, og skriver hva du har gjort.</p>
  </div>
);
