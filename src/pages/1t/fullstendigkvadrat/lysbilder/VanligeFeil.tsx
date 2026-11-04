import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { FeilListe, type Feil } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const FEIL: Feil[] = [
  {
    t: 'Trekker ikke fra',
    oppsett: <><Xk /> + 6<X /> + 5</>,
    feil: <>(<X /> + 3)<sup>2</sup> + 5</>,
    riktig: <>(<X /> + 3)<sup>2</sup> − 9 + 5 = (<X /> + 3)<sup>2</sup> − 4</>,
    hvorfor: 'Kvadratet inneholder 9, og den er ikke med i uttrykket. Derfor må vi trekke fra 9 igjen.',
  },
  {
    t: 'Halverer ikke',
    oppsett: <><Xk /> + 8<X /></>,
    feil: <>(<X /> + 8)<sup>2</sup> − 64</>,
    riktig: <>(<X /> + 4)<sup>2</sup> − 16</>,
    hvorfor: 'Midtleddet er 2 ganger tallet i parentesen, så tallet i parentesen er halvparten av 8.',
  },
  {
    t: 'Tallet utenfor glemmes',
    oppsett: <>2<Xk /> + 12<X /> + 5</>,
    feil: <>2(<X /> + 3)<sup>2</sup> − 9 + 5</>,
    riktig: <>2(<X /> + 3)<sup>2</sup> − 18 + 5 = 2(<X /> + 3)<sup>2</sup> − 13</>,
    hvorfor: 'Tallet 2 ganges med hele parentesen, også med −9.',
  },
];

export const FEIL_STEG = FEIL.length;

export const VanligeFeil: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Pass på</div>
    <h2>Tre vanlige feil</h2>
    <FeilListe feil={FEIL} {...p} />
  </div>
);
