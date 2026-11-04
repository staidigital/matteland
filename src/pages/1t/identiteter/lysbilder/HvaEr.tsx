import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';

export const HvaEr: React.FC = () => (
  <div className="slide">
    <div className="kicker">Definisjon</div>
    <h2>Hva er en identitet?</h2>
    <div className="boxed">
      <span className="label">Identitet</span>
      En likhet mellom to uttrykk som stemmer for <b>alle</b> verdier av variablene, der begge uttrykkene er definert.
    </div>
    <div className="grid3">
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Likning</h3>
        <p className="math">2<X /> + 3 = 7</p>
        <p>Stemmer for noen verdier. Oppgaven er å <b>finne</b> dem.</p>
      </div>
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Identitet</h3>
        <p className="math">(<X /> + 1)<sup>2</sup> = <Xk /> + 2<X /> + 1</p>
        <p>Stemmer for alle verdier. Oppgaven er å <b>vise</b> at det er slik.</p>
      </div>
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Aldri sann</h3>
        <p className="math"><X /> + 1 = <X /> + 3</p>
        <p>Stemmer for ingen verdier. Likningen har ingen løsning.</p>
      </div>
    </div>
    <p className="muted">Kvadratsetningene er identiteter. Det er derfor vi kan sette inn hva vi vil for <i className="v">a</i> og <i className="v">b</i>.</p>
  </div>
);
