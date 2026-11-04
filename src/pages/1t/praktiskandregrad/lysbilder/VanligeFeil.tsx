import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { FeilListe, type Feil } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const FEIL: Feil[] = [
  {
    t: 'Begge svarene tas med',
    oppsett: <>Bredden: <X /> = 5 eller <X /> = −8</>,
    feil: <>Bredden er 5 cm eller −8 cm</>,
    riktig: <>Bredden er 5 cm</>,
    hvorfor: 'En lengde kan ikke være negativ. Si hvorfor du forkaster svaret.',
  },
  {
    t: 'Høyre side er ikke 0',
    oppsett: <><X />(<X /> + 3) = 40</>,
    feil: <><X /> = 40 eller <X /> + 3 = 40</>,
    riktig: <><Xk /> + 3<X /> − 40 = 0, altså <X /> = 5 eller <X /> = −8</>,
    hvorfor: 'Produktregelen virker bare når høyre side er 0. Gang ut, og samle alt på venstre side.',
  },
  {
    t: 'Svarer på noe annet',
    oppsett: <>Finn sidene i rektangelet.</>,
    feil: <><X /> = 5</>,
    riktig: <>Bredden er 5 cm, og lengden er 8 cm.</>,
    hvorfor: 'x er ikke svaret, men et hjelpemiddel. Les spørsmålet på nytt, og svar med enhet.',
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
