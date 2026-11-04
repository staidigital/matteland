import React from 'react';
import { near, Poly, X, Xk } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { ri } from '../../bokstavuttrykk/oppgaver';

type Niva = 'vurder' | 'fyll' | 'motbevis';

const NIVAER: [Niva, string][] = [
  ['vurder', 'Identitet eller ikke?'],
  ['fyll', 'Fullfør identiteten'],
  ['motbevis', 'Finn moteksempelet'],
];

type Pastand = { v: React.ReactNode; h: React.ReactNode; sann: boolean; losning: React.ReactNode };

function lagPastand(): Pastand {
  const m = ri(2, 7);
  const utvalg: Pastand[] = [
    { v: <>(<X /> + {m})<sup>2</sup></>, h: <Poly a={1} b={2 * m} c={m * m} />, sann: true, losning: <>Stemmer: 1. kvadratsetning.</> },
    { v: <>(<X /> + {m})<sup>2</sup></>, h: <Poly a={1} b={0} c={m * m} />, sann: false, losning: <>Nei. Midtleddet {2 * m}<X /> mangler. <X /> = 1 gir {(1 + m) ** 2} og {1 + m * m}.</> },
    { v: <>(<X /> − {m})<sup>2</sup></>, h: <Poly a={1} b={-2 * m} c={-m * m} />, sann: false, losning: <>Nei. Siste ledd skal være +{m * m}. <X /> = 0 gir {m * m} og −{m * m}.</> },
    { v: <>(<X /> + {m})(<X /> − {m})</>, h: <Poly a={1} b={0} c={-m * m} />, sann: true, losning: <>Stemmer: konjugatsetningen.</> },
    { v: <>(<X /> + {m})<sup>2</sup> − {2 * m}<X /></>, h: <Poly a={1} b={0} c={m * m} />, sann: true, losning: <>Stemmer: <Xk /> + {2 * m}<X /> + {m * m} − {2 * m}<X /> = <Xk /> + {m * m}.</> },
    { v: <>{m}(<X /> + 2)</>, h: <>{m}<X /> + 2</>, sann: false, losning: <>Nei. {m} skal ganges med begge leddene: {m}<X /> + {2 * m}.</> },
    { v: <>(<X /> + {m})<sup>2</sup> − (<X /> − {m})<sup>2</sup></>, h: <>{4 * m}<X /></>, sann: true, losning: <>Stemmer: <Xk /> + {2 * m}<X /> + {m * m} − <Xk /> + {2 * m}<X /> − {m * m} = {4 * m}<X />.</> },
    { v: <><X />(<X /> + {m})</>, h: <Poly a={1} b={m} c={m} />, sann: false, losning: <>Nei. <X />(<X /> + {m}) = <Xk /> + {m}<X />, uten konstantledd.</> },
  ];
  return utvalg[ri(0, utvalg.length - 1)];
}

function lag(niva: Niva): Ovelse {
  if (niva === 'vurder') {
    const p = lagPastand();
    const riktig = p.sann ? 0 : 1;
    return {
      oppgave: <>{p.v} = {p.h}</>,
      instruks: 'Stemmer denne likheten for alle verdier av x?',
      valg: ['Identitet', 'Ikke identitet'],
      vurder: ({ valg }) => (valg === riktig ? null : 'Regn ut venstre side, eller prøv noen verdier av x.'),
      losning: p.losning,
      side: <p className="muted small">Prøv for eksempel med x = 0 og x = 1. Ett moteksempel er nok til å si nei.</p>,
    };
  }
  if (niva === 'fyll') {
    const m = ri(2, 7);
    if (ri(0, 1) === 0) {
      const n = 2 * ri(1, 6);
      const svarB = 2 * m - n;
      return {
        oppgave: <>(<X /> + {m})<sup>2</sup> − {n}<X /></>,
        instruks: 'Finn tallene som gjør likheten til en identitet.',
        felt: [
          { navn: 'Tallet foran x', foran: <>= <Xk /> +</>, bak: <X /> },
          { navn: 'Konstantleddet', foran: '+' },
        ],
        vurder: ({ tall: [a, b] }) => {
          if (!near(a, svarB)) return `Gang ut kvadratet først: x² + ${2 * m}x + ${m * m}. Trekk så fra ${n}x.`;
          if (!near(b, m * m)) return `Konstantleddet kommer fra ${m}².`;
          return null;
        },
        losning: <><Xk /> + {2 * m}<X /> + {m * m} − {n}<X /> = <span className="pen"><Poly a={1} b={svarB} c={m * m} /></span></>,
        side: <p className="muted small">Skriv negative tall med minus foran, og 0 hvis leddet forsvinner.</p>,
      };
    }
    return {
      oppgave: <>(<X /> + {m})<sup>2</sup> − (<X /> − {m})<sup>2</sup></>,
      instruks: 'Finn tallet som gjør likheten til en identitet.',
      felt: [{ navn: 'Tallet foran x', foran: '=', bak: <X /> }],
      vurder: ({ tall: [a] }) => (near(a, 4 * m) ? null : 'Regn ut hvert kvadrat, og husk at minus snur fortegnet på alle leddene.'),
      losning: <><Xk /> + {2 * m}<X /> + {m * m} − <Xk /> + {2 * m}<X /> − {m * m} = <span className="pen">{4 * m}<X /></span></>,
    };
  }
  const m = ri(2, 6);
  const x = ri(1, 4);
  const v = (x + m) ** 2;
  const h = x * x + m * m;
  return {
    oppgave: <>(<X /> + {m})<sup>2</sup> = <Xk /> + {m * m}</>,
    instruks: <>Sett inn <X /> = {x} og regn ut hver side.</>,
    felt: [
      { navn: 'Venstre side', foran: 'Venstre side:' },
      { navn: 'Høyre side', foran: 'Høyre side:' },
    ],
    vurder: ({ tall: [a, b] }) => {
      if (!near(a, v)) return `Venstre side: (${x} + ${m})². Regn ut parentesen først.`;
      if (!near(b, h)) return `Høyre side: ${x}² + ${m * m}.`;
      return null;
    },
    losning: <>{v} ≠ {h}, så likheten er ikke en identitet.</>,
    side: <p className="muted small">Sidene blir ulike. Ett slikt moteksempel er nok til å vise at dette ikke er en identitet.</p>,
  };
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Identiteter" nivaer={NIVAER} lag={lag} />;
