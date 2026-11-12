import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">for: et bestemt antall ganger</span>
          <Kode>{'summen = 0\nfor i in range(1, 101):\n    summen = summen + i'}</Kode>
          <ul className="stack small" style={{ gap: 4, paddingLeft: '1.2em', margin: '10px 0 0' }}>
            <li>
              <code>range(start, stopp, steg)</code>. Stopp er aldri med.
            </li>
            <li>Startverdien til en sum settes før løkka.</li>
          </ul>
        </div>
      </div>
      <div className="stack">
        <div className="boxed">
          <span className="label">while: så lenge noe er sant</span>
          <Kode>{'belop = 20000\nwhile belop < 40000:\n    belop = belop * 1.045'}</Kode>
          <ul className="stack small" style={{ gap: 4, paddingLeft: '1.2em', margin: '10px 0 0' }}>
            <li>Vilkåret sjekkes før hver runde.</li>
            <li>Noe i løkka må gjøre vilkåret usant til slutt, ellers stopper den aldri.</li>
          </ul>
        </div>
        <p className="small">
          Kolon og innrykk virker som i if-setninger. Det som står med innrykk, gjentas.
        </p>
      </div>
    </div>
  </div>
);
