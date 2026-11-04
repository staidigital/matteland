import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { FeilListe, type Feil } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const FEIL: Feil[] = [
  {
    t: 'Midtleddet forsvinner',
    oppsett: <>(<X /> + 3)<sup>2</sup></>,
    feil: <><Xk /> + 9</>,
    riktig: <><Xk /> + 6<X /> + 9</>,
    hvorfor: <>Prøv med <X /> = 1: venstre side blir 16, men <Xk /> + 9 blir 10.</>,
  },
  {
    t: 'Minus på siste ledd',
    oppsett: <>(<X /> − 3)<sup>2</sup></>,
    feil: <><Xk /> − 6<X /> − 9</>,
    riktig: <><Xk /> − 6<X /> + 9</>,
    hvorfor: 'Siste ledd er et kvadrat: (−3) · (−3) = 9.',
  },
  {
    t: 'Bare x kvadreres',
    oppsett: <>(2<X /> + 3)<sup>2</sup></>,
    feil: <>2<Xk /> + 12<X /> + 9</>,
    riktig: <>4<Xk /> + 12<X /> + 9</>,
    hvorfor: <>Hele 2<X /> skal kvadreres: (2<X />)<sup>2</sup> = 4<Xk />.</>,
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
