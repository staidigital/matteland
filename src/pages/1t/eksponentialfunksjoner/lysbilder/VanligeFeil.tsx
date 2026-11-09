import React from 'react';
import { FeilListe, type Feil } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { X } from '../../../../presentasjon/matte';

const FEIL: Feil[] = [
  {
    t: 'Nedgang på 14 %',
    oppsett: <>Vekstfaktoren er …</>,
    feil: <>0,14</>,
    riktig: <>100 % − 14 % = 86 % = 0,86</>,
    hvorfor: 'Vekstfaktoren er det som er igjen etter nedgangen, ikke det som forsvinner.',
  },
  {
    t: 'Økning på 2,6 %',
    oppsett: <>Vekstfaktoren er …</>,
    feil: <>1,26</>,
    riktig: <>100 % + 2,6 % = 102,6 % = 1,026</>,
    hvorfor: '2,6 % = 0,026. Vekstfaktoren 1,26 ville vært en økning på 26 %.',
  },
  {
    t: 'Potens før ganging',
    oppsett: (
      <>
        3 · 2<sup><X /></sup> når <X /> = 2
      </>
    ),
    feil: (
      <>
        (3 · 2)<sup>2</sup> = 36
      </>
    ),
    riktig: (
      <>
        3 · 2<sup>2</sup> = 3 · 4 = 12
      </>
    ),
    hvorfor: 'Eksponenten hører bare til grunntallet b. Regn ut potensen først, og gang så med a.',
  },
];

export const FEIL_STEG = FEIL.length;

export const VanligeFeil: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Vanlige feil</div>
    <h2>Pass på vekstfaktoren</h2>
    <FeilListe {...p} feil={FEIL} />
  </div>
);
