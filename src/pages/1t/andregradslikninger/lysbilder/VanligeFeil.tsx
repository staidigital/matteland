import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { FeilListe, type Feil } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const FEIL: Feil[] = [
  {
    t: 'Minusløsningen glemmes',
    oppsett: <><Xk /> = 25</>,
    feil: <><X /> = 5</>,
    riktig: <><X /> = 5 eller <X /> = −5</>,
    hvorfor: 'Også (−5)² = 25, så −5 er en løsning.',
  },
  {
    t: 'Deler på x',
    oppsett: <><Xk /> − 4<X /> = 0</>,
    feil: <><X /> − 4 = 0, altså <X /> = 4</>,
    riktig: <><X />(<X /> − 4) = 0, altså <X /> = 0 eller <X /> = 4</>,
    hvorfor: 'Vi kan ikke dele på x, for x kan være 0. Sett x utenfor i stedet.',
  },
  {
    t: 'Høyre side er ikke 0',
    oppsett: <>(<X /> − 2)(<X /> + 3) = 6</>,
    feil: <><X /> − 2 = 6 eller <X /> + 3 = 6</>,
    riktig: <><Xk /> + <X /> − 12 = 0, altså <X /> = 3 eller <X /> = −4</>,
    hvorfor: 'Produktregelen virker bare mot 0. Gang ut, samle alt på venstre side, og faktoriser på nytt.',
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
