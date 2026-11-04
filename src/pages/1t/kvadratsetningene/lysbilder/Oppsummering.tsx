import React from 'react';
import { V, X, Xk } from '../../../../presentasjon/matte';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="boxed math">
      <span className="mline">(<A /> + <B />)<sup>2</sup> = <A /><sup>2</sup> + 2<A /><B /> + <B /><sup>2</sup></span>
      <span className="mline">(<A /> − <B />)<sup>2</sup> = <A /><sup>2</sup> − 2<A /><B /> + <B /><sup>2</sup></span>
      <span className="mline">(<A /> + <B />)(<A /> − <B />) = <A /><sup>2</sup> − <B /><sup>2</sup></span>
    </div>
    <div className="cols">
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Gange ut</h3>
        <p>Ikke glem midtleddet, og kvadrer hele leddet.</p>
        <p className="math">(2<X /> − 3)<sup>2</sup> = 4<Xk /> − 12<X /> + 9</p>
      </div>
      <div className="panel stack" style={{ gap: 8 }}>
        <h3>Faktorisere</h3>
        <p>Sett felles faktor utenfor. Se så etter to kvadrater, og sjekk midtleddet.</p>
        <p className="math">2<Xk /> − 8 = 2(<X /> + 2)(<X /> − 2)</p>
      </div>
    </div>
  </div>
);
