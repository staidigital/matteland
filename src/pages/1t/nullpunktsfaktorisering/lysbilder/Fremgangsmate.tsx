import React from 'react';
import { ABC, FactorForm, Gen, V } from '../../../../presentasjon/matte';

export const Fremgangsmate: React.FC = () => (
  <div className="slide">
    <div className="kicker">Fremgangsmåte</div>
    <h2>Tre steg</h2>
    <ol className="steps">
      <li>
        <span className="no">1</span>
        <div>
          <h3>Sett uttrykket lik 0</h3>
          <p className="math">
            <Gen /> = 0
          </p>
        </div>
      </li>
      <li>
        <span className="no">2</span>
        <div>
          <h3>Løs likningen</h3>
          <p>
            Bruk abc-formelen, eller CAS: <code>Løs(2x^2-2x-12=0)</code>
          </p>
          <div className="math" style={{ marginTop: 6 }}>
            <ABC />
          </div>
        </div>
      </li>
      <li>
        <span className="no">3</span>
        <div>
          <h3>
            Sett inn i formelen, og husk <V c="a" />
          </h3>
          <p className="math">
            <FactorForm farge />
          </p>
        </div>
      </li>
    </ol>
    <p className="muted">
      Til slutt: gang ut og kontroller at du får uttrykket du startet med. I GeoGebra kan du sjekke med{' '}
      <code>Faktoriser(2x^2-2x-12)</code>.
    </p>
  </div>
);
