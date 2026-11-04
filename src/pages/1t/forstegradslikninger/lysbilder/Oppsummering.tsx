import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="grid2">
      <div className="panel stack" style={{ gap: 6 }}>
        <h3 className="pen">Grunnregelen</h3>
        <span className="math nw">2<X /> + 3 = 9 &nbsp;⇒&nbsp; 2<X /> = 6 &nbsp;⇒&nbsp; <X /> = 3</span>
        <p className="small muted">Gjør det samme på begge sider. Ledd som bytter side, skifter fortegn.</p>
      </div>
      <div className="panel stack" style={{ gap: 6 }}>
        <h3 className="pen">Rekkefølgen</h3>
        <p className="small">1. Gang bort brøkene.</p>
        <p className="small">2. Løs opp parentesene.</p>
        <p className="small">3. Samle x på én side og tallene på den andre.</p>
        <p className="small">4. Del på tallet foran x.</p>
      </div>
      <div className="panel stack" style={{ gap: 6 }}>
        <h3 className="pen">Brøk og parentes</h3>
        <span className="math nw"><Frac n={<><X /> + 1</>} d="3" /> + <Frac n={<X />} d="2" /> = 7 &nbsp;⇒&nbsp; 2(<X /> + 1) + 3<X /> = 42</span>
        <p className="small muted">Gang alle leddene med fellesnevneren, og ha parentes rundt telleren.</p>
      </div>
      <div className="panel stack" style={{ gap: 6 }}>
        <h3 className="pen">Sett prøve</h3>
        <span className="math nw">2 · 3 + 3 = 9</span>
        <p className="small muted">Sett svaret inn i den opprinnelige likningen. Begge sidene skal bli like.</p>
      </div>
    </div>
    <p className="muted">
      I tekstoppgaver begynner du med å bestemme hva x står for. Forsvinner x, er det ingen løsning hvis påstanden som er igjen er usann, og alle tall er løsninger hvis den er sann.
    </p>
  </div>
);
