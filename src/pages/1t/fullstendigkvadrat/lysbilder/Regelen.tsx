import React from 'react';
import { Frac, V, X, Xk } from '../../../../presentasjon/matte';

const B = () => <V c="b" />;
const Halv = () => <Frac n={<B />} d="2" />;

export const Regelen: React.FC = () => (
  <div className="slide">
    <div className="kicker">Regelen</div>
    <h2>Legg til, og trekk fra det samme</h2>
    <div className="boxed math big">
      <Xk /> + <B /><X /> = (<X /> + <Halv />)<sup>2</sup> − (<Halv />)<sup>2</sup>
    </div>
    <ol className="steps">
      <li>
        <span className="no">1</span>
        <div>
          <h3>Halver tallet foran <X /></h3>
          <p className="math"><Xk /> + 6<X /> &nbsp; gir &nbsp; <Frac n="6" d="2" /> = 3</p>
        </div>
      </li>
      <li>
        <span className="no">2</span>
        <div>
          <h3>Legg til og trekk fra kvadratet av tallet</h3>
          <p className="math"><Xk /> + 6<X /> <span className="pen">+ 3<sup>2</sup> − 3<sup>2</sup></span></p>
          <p className="small muted">Vi legger til 0, så uttrykket har ikke endret verdi.</p>
        </div>
      </li>
      <li>
        <span className="no">3</span>
        <div>
          <h3>Skriv de tre første leddene som et kvadrat</h3>
          <p className="math">(<X /> + 3)<sup>2</sup> − 9</p>
        </div>
      </li>
    </ol>
  </div>
);
