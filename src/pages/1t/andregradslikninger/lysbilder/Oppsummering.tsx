import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="grid3">
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Kvadratrot og ±</h3>
        <p>Få <Xk /> eller kvadratet alene. Ta roten, og husk begge fortegnene.</p>
        <p className="math"><Xk /> = 9 &nbsp;gir&nbsp; <X /> = ±3</p>
      </div>
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Produktregelen</h3>
        <p>Samle alt på venstre side, og faktoriser. Hver faktor kan bli 0.</p>
        <p className="math"><X />(<X /> − 2) = 0 &nbsp;gir&nbsp; <X /> = 0 eller <X /> = 2</p>
      </div>
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Sum og produkt</h3>
        <p>Når tallet foran <Xk /> er 1: finn to tall med sum <i className="v">b</i> og produkt <i className="v">c</i>.</p>
        <p className="math"><Xk /> + 5<X /> + 6 = (<X /> + 2)(<X /> + 3)</p>
      </div>
    </div>
    <p className="muted">Kontroller gjerne ved å sette svaret inn i likningen. En andregradslikning har to, én eller ingen løsninger.</p>
  </div>
);
