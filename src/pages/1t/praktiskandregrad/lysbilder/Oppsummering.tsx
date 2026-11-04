import React from 'react';
import { X } from '../../../../presentasjon/matte';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <ol className="steps">
      <li><span className="no">1</span><div>Bestem hva <X /> står for, og tegn gjerne en figur.</div></li>
      <li><span className="no">2</span><div>Sett opp en likning, og skriv den på standardform.</div></li>
      <li><span className="no">3</span><div>Løs likningen med den metoden som passer, eller med CAS.</div></li>
      <li><span className="no">4</span><div>Vurder hvert svar: gir det mening i denne situasjonen? Si hvorfor du forkaster et svar.</div></li>
      <li><span className="no">5</span><div>Svar på spørsmålet i en setning, med enhet.</div></li>
    </ol>
    <div className="boxed">
      <span className="label">Husk</span>
      «Lander» betyr høyde 0, «går i null» betyr overskudd 0, og areal er lengde ganger bredde. Sett ord på hva likningen spør om.
    </div>
  </div>
);
