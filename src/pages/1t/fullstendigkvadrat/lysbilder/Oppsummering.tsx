import React from 'react';
import { Frac, V, X, Xk } from '../../../../presentasjon/matte';

const B = () => <V c="b" />;

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="boxed math big">
      <Xk /> + <B /><X /> = (<X /> + <Frac n={<B />} d="2" />)<sup>2</sup> − (<Frac n={<B />} d="2" />)<sup>2</sup>
    </div>
    <div className="cols">
      <ol className="steps">
        <li><span className="no">1</span><div>Sett tallet foran <Xk /> utenfor hvis det ikke er 1.</div></li>
        <li><span className="no">2</span><div>Halver tallet foran <X />, og kvadrer svaret.</div></li>
        <li><span className="no">3</span><div>Legg til og trekk fra dette kvadratet.</div></li>
        <li><span className="no">4</span><div>Skriv som kvadrat, og regn sammen resten.</div></li>
      </ol>
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Dette kan du bruke det til</h3>
        <p>Løse likninger: <span className="math nw">(<X /> + 3)<sup>2</sup> = 4</span> gir <span className="math nw"><X /> + 3 = ±2</span>.</p>
        <p>Finne topp- og bunnpunkt: <span className="math nw">(<X /> + 3)<sup>2</sup> − 4</span> har bunnpunkt (−3, −4).</p>
      </div>
    </div>
  </div>
);
