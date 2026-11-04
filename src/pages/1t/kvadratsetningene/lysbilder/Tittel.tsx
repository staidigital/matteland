import React from 'react';
import { V } from '../../../../presentasjon/matte';
import { Arealmodell } from '../../bokstavuttrykk/felles';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Andregradsuttrykk og -likninger</div>
    <h1>Kvadrat&shy;setningene</h1>
    <p className="lede">Tre snarveier for å gange ut parenteser, og for å faktorisere den andre veien.</p>
    <div className="cols wide-left">
      <div className="stack">
        <div className="boxed math">
          <span className="mline">(<A /> + <B />)<sup>2</sup> = <A /><sup>2</sup> + 2<A /><B /> + <B /><sup>2</sup></span>
          <span className="mline">(<A /> − <B />)<sup>2</sup> = <A /><sup>2</sup> − 2<A /><B /> + <B /><sup>2</sup></span>
          <span className="mline">(<A /> + <B />)(<A /> − <B />) = <A /><sup>2</sup> − <B /><sup>2</sup></span>
        </div>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
      <Arealmodell a={3} b={3} merke />
    </div>
  </div>
);
