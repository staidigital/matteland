import React from 'react';
import { Op, Poly, X, minus, par } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { NIVAER, erPrimtall, lagFelles, lagForenkle, lagGangInn, lagParentes, lagTall, lagToParenteser, type Niva } from '../oppgaver';

/** (kx + p) med riktig fortegn */
const Par: React.FC<{ k?: number; p: number }> = ({ k = 1, p }) => (
  <span className="nw">
    ({k === 1 ? '' : k}
    <X />
    <Op>{p < 0 ? '−' : '+'}</Op>
    {Math.abs(p)})
  </span>
);

/** Ledd med fortegn foran, for eksempel «− 3x» eller «+ 5» */
const Ledd: React.FC<{ k: number; x?: boolean }> = ({ k, x }) => (
  <>
    {' '}{k < 0 ? '−' : '+'} {x && Math.abs(k) === 1 ? '' : Math.abs(k)}
    {x && <X />}
  </>
);

const SIDE_NEG = <p className="muted small">Skriv negative tall med minustegn, for eksempel −3. Skriv 1 hvis det ikke står noe tall foran x, og 0 hvis et ledd forsvinner.</p>;
const LIN_FELT = [
  { navn: 'Tallet foran x', bak: <><X /> +</> },
  { navn: 'Konstantleddet' },
];

function lag(niva: Niva): Ovelse {
  if (niva === 'forenkle') {
    const t = lagForenkle();
    return {
      oppgave: <>{t.a}<X /><Ledd k={t.b} /><Ledd k={t.c} x /><Ledd k={t.d} /></>,
      instruks: 'Trekk sammen like ledd.',
      felt: LIN_FELT,
      vurder: ({ tall: [A, B] }) => {
        if (A === t.A && B === t.B) return null;
        if (A !== t.A) return `Legg sammen x-leddene: ${t.a} og ${par(t.c)}.`;
        return `Legg sammen tallene: ${par(t.b)} og ${par(t.d)}.`;
      },
      losning: <span className="pen"><Poly a={0} b={t.A} c={t.B} /></span>,
      side: SIDE_NEG,
    };
  }
  if (niva === 'parentes') {
    const t = lagParentes();
    const s = t.pluss ? 1 : -1;
    return {
      oppgave: <>{t.a}<X /><Ledd k={t.b} /> {t.pluss ? '+' : '−'} <Par k={t.c} p={t.d} /></>,
      instruks: 'Løs opp parentesen og trekk sammen.',
      felt: LIN_FELT,
      vurder: ({ tall: [A, B] }) => {
        if (A === t.A && B === t.B) return null;
        if (t.pluss) return 'Pluss foran parentesen: bare fjern den, og trekk sammen.';
        if (A === t.a + t.c || B === t.b + t.d) return 'Minus foran parentesen: alle leddene inni skifter fortegn.';
        return 'Skriv uttrykket uten parentes først, og trekk så sammen like ledd.';
      },
      losning: (
        <>
          <span className="mline">{t.a}<X /><Ledd k={t.b} /><Ledd k={s * t.c} x /><Ledd k={s * t.d} /></span>
          <span className="mline pen">= <Poly a={0} b={t.A} c={t.B} /></span>
        </>
      ),
      side: SIDE_NEG,
    };
  }
  if (niva === 'gangin') {
    const t = lagGangInn();
    return {
      oppgave: t.medX ? <>{t.k === 1 ? '' : t.k}<X /><Par p={t.m} /></> : <>{minus(t.k)}<Par k={t.u} p={t.m} /></>,
      instruks: 'Gang inn i parentesen.',
      felt: t.medX
        ? [{ navn: 'Tallet foran x²', bak: <><X /><sup>2</sup> +</> }, { navn: 'Tallet foran x', bak: <X /> }]
        : LIN_FELT,
      vurder: ({ tall: [A, B] }) => {
        if (A === t.A && B === t.B) return null;
        if (A === t.A && B === t.m) return 'Du må gange med begge leddene i parentesen.';
        return B === -t.B && A === t.A ? 'Sjekk fortegnet på det siste leddet.' : 'Gang det som står utenfor med hvert ledd i parentesen.';
      },
      losning: <span className="pen">{t.medX ? <Poly a={t.A} b={t.B} c={0} /> : <Poly a={0} b={t.A} c={t.B} />}</span>,
      side: SIDE_NEG,
    };
  }
  if (niva === 'toparenteser') {
    const t = lagToParenteser();
    return {
      oppgave: <><Par k={t.u} p={t.p} /><Par p={t.q} /></>,
      instruks: 'Gang ut og trekk sammen.',
      felt: [
        { navn: 'Tallet foran x²', bak: <><X /><sup>2</sup> +</> },
        { navn: 'Tallet foran x', bak: <><X /> +</> },
        { navn: 'Konstantleddet' },
      ],
      vurder: ({ tall: [A, B, C] }) => {
        if (A === t.A && B === t.B && C === t.C) return null;
        if (A !== t.A) return `Tallet foran x² kommer fra ${t.u === 1 ? 'x' : `${t.u}x`} · x.`;
        if (C !== t.C) return `Konstantleddet er ${par(t.p)} · ${par(t.q)}.`;
        return 'To av de fire produktene er x-ledd. Legg dem sammen.';
      },
      losning: (
        <>
          <span className="mline">
            {t.u === 1 ? '' : t.u}<X /><sup>2</sup><Ledd k={t.u * t.q} x /><Ledd k={t.p} x /><Ledd k={t.C} />
          </span>
          <span className="mline pen">= <Poly a={t.A} b={t.B} c={t.C} /></span>
        </>
      ),
      side: SIDE_NEG,
    };
  }
  if (niva === 'tall') {
    const t = lagTall();
    return {
      oppgave: <>{t.n}</>,
      instruks: `Skriv tallet som et produkt av ${t.faktorer.length} primtall.`,
      felt: t.faktorer.map((_, i) => ({ navn: `Faktor ${i + 1}`, foran: i === 0 ? '=' : '·' })),
      vurder: ({ tall }) => {
        const produkt = tall.reduce((s, v) => s * v, 1);
        if (produkt !== t.n) return `Produktet av tallene skal bli ${t.n}.`;
        if (!tall.every(erPrimtall)) return 'Produktet stemmer, men alle faktorene skal være primtall.';
        return null;
      },
      losning: <span className="pen">{t.faktorer.join(' · ')}</span>,
      side: <p className="muted small">Primtall: 2, 3, 5, 7, 11, 13, … Rekkefølgen spiller ingen rolle.</p>,
    };
  }
  const t = lagFelles();
  return {
    oppgave: t.medX ? <Poly a={t.k} b={t.m} c={0} /> : <Poly a={0} b={t.k} c={t.m} />,
    instruks: 'Trekk ut så mye som mulig.',
    felt: [
      { navn: 'Faktoren utenfor', bak: <>{t.medX && <X />}(</> },
      { navn: 'Tallet foran x', bak: <><X /> +</> },
      { navn: 'Konstantleddet', bak: ')' },
    ],
    vurder: ({ tall: [g, u, v] }) => {
      if (g === t.g && u === t.u && v === t.v) return null;
      if (g * u === t.k && g * v === t.m) return 'Det stemmer, men du kan trekke ut mer.';
      if (g === -t.g && u === -t.u && v === -t.v) return 'Det stemmer, men bruk den positive faktoren utenfor.';
      return 'Gang ut svaret ditt. Du skal få det opprinnelige uttrykket.';
    },
    losning: (
      <>
        <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>Kontroll: gang ut igjen, og du får {minus(t.k)}{t.medX ? 'x²' : 'x'} {t.m < 0 ? '−' : '+'} {Math.abs(t.m)}{t.medX ? 'x' : ''}.</span>
        <span className="mline pen">{t.g}{t.medX && <X />}<Par k={t.u} p={t.v} /></span>
      </>
    ),
    side: <p className="muted small">Skriv 1 når det ikke står noe tall foran x, og bruk minustegn for negative tall.</p>,
  };
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Bokstavuttrykk" nivaer={NIVAER} lag={lag} />;
