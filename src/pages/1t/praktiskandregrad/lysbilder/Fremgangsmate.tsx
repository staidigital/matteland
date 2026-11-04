import React from 'react';
import { X } from '../../../../presentasjon/matte';

export const Fremgangsmate: React.FC = () => (
  <div className="slide">
    <div className="kicker">Fremgangsmåte</div>
    <h2>Fem steg fra tekst til svar</h2>
    <ol className="steps">
      <li><span className="no">1</span><div><h3>Bestem hva <X /> står for</h3><p>Skriv det med ord, gjerne med enhet. Tegn en figur hvis det hjelper.</p></div></li>
      <li><span className="no">2</span><div><h3>Sett opp en likning</h3><p>Finn noe du kan skrive på to måter: med <X />, og med tallet fra oppgaven.</p></div></li>
      <li><span className="no">3</span><div><h3>Løs likningen</h3><p>Skriv på standardform og bruk den metoden som passer, eller CAS.</p></div></li>
      <li><span className="no">4</span><div><h3>Vurder svarene</h3><p>Du får ofte to løsninger. Gir begge mening i denne situasjonen?</p></div></li>
      <li><span className="no">5</span><div><h3>Svar på spørsmålet</h3><p>Skriv en setning med enhet. Har du svart på det oppgaven spør om?</p></div></li>
    </ol>
  </div>
);
