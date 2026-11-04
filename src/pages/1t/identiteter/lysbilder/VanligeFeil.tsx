import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { FeilListe, type Feil } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const FEIL: Feil[] = [
  {
    t: 'Bruker eksempler som bevis',
    oppsett: <>Vis at (<X /> + 1)<sup>2</sup> − 1 = <X />(<X /> + 2)</>,
    feil: <><X /> = 2 gir 8 = 8, altså riktig</>,
    riktig: <><Xk /> + 2<X /> + 1 − 1 = <Xk /> + 2<X /> = <X />(<X /> + 2)</>,
    hvorfor: 'Et eksempel viser bare at likheten stemmer for det ene tallet.',
  },
  {
    t: 'Regner over likhetstegnet',
    oppsett: <>Vis at (<X /> + 2)<sup>2</sup> − 4 = <X />(<X /> + 4)</>,
    feil: <>Flytter alt til venstre og får 0 = 0</>,
    riktig: <><Xk /> + 4<X /> + 4 − 4 = <Xk /> + 4<X /> = <X />(<X /> + 4)</>,
    hvorfor: 'Da bruker vi likheten før den er vist. Regn på hver side for seg, til sidene blir like.',
  },
  {
    t: 'Minus foran kvadrat',
    oppsett: <>(<X /> + 1)<sup>2</sup> − (<X /> − 1)<sup>2</sup></>,
    feil: <><Xk /> + 2<X /> + 1 − <Xk /> − 2<X /> + 1 = 2</>,
    riktig: <><Xk /> + 2<X /> + 1 − <Xk /> + 2<X /> − 1 = 4<X /></>,
    hvorfor: 'Skriv kvadratet i parentes først. Minus foran snur fortegnet på alle leddene.',
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
