import React from 'react';
import { Frac, V, X, Xk } from '../../../../presentasjon/matte';
import { FeilListe, type Feil } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const FEIL: Feil[] = [
  {
    t: 'Ikke standardform',
    oppsett: <><Xk /> + 3 = 4<X /></>,
    feil: <><V c="a" /> = 1, <V c="b" /> = 3, <V c="c" /> = 4</>,
    riktig: <><Xk /> − 4<X /> + 3 = 0, så <V c="a" /> = 1, <V c="b" /> = −4, <V c="c" /> = 3</>,
    hvorfor: 'Formelen gjelder bare når alt står på venstre side og det er 0 på høyre side.',
  },
  {
    t: 'Kvadrat av negativt tall',
    oppsett: <>Med <V c="b" /> = −3 blir <V c="b" /><sup>2</sup></>,
    feil: <>−3<sup>2</sup> = −9</>,
    riktig: <>(−3)<sup>2</sup> = 9</>,
    hvorfor: 'Bruk parentes når du setter inn negative tall. Tallet b² er aldri negativt.',
  },
  {
    t: 'Forkorter bare ett ledd',
    oppsett: <><Frac n="−2 ± 2√2" d="2" /></>,
    feil: <>−2 ± √2</>,
    riktig: <>−1 ± √2</>,
    hvorfor: 'Brøkstreken gjelder hele telleren. Begge leddene må deles på 2.',
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
