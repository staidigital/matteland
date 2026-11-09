import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { dec, near } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { ri } from '../../bokstavuttrykk/oppgaver';
import { Fx } from '../../funksjoner/felles';
import { tusen } from '../../skjaeringspunkter/felles';
import { Eksp, eksp, tall } from '../felles';

type Niva = 'vekstfaktor' | 'uttrykk' | 'regn' | 'graf';

const NIVAER: [Niva, string][] = [
  ['vekstfaktor', 'Vekstfaktor'],
  ['uttrykk', 'Funksjonsuttrykk'],
  ['regn', 'Regn ut'],
  ['graf', 'Fra graf'],
];

const velg = <T,>(arr: T[]) => arr[ri(0, arr.length - 1)];
/** p prosent med komma: 2,5 */
const pst = (p: number) => dec(p, 1);
const PROSENT = [2, 3, 4, 5, 6, 8, 10, 12, 14, 15, 20, 25, 30, 2.5, 3.5, 1.8];

/** 1 + p/100 eller 1 − p/100 */
const faktor = (p: number, opp: boolean) => +(1 + (opp ? p : -p) / 100).toFixed(4);

function lagVekstfaktor(): Ovelse {
  const p = velg(PROSENT);
  const opp = ri(0, 1) === 1;
  const b = faktor(p, opp);
  if (ri(0, 1) === 0)
    return {
      oppgave: (
        <>
          {opp ? 'Økning' : 'Nedgang'} på {pst(p)} %
        </>
      ),
      instruks: 'Hva er vekstfaktoren?',
      felt: [{ navn: 'Vekstfaktoren', foran: 'b =' }],
      vurder: ({ tall: [v] }) => {
        if (near(v, b)) return null;
        if (near(v, p / 100)) return `Det er bare endringen. Hva er igjen av 100 %?`;
        if (near(v, faktor(p, !opp))) return opp ? 'Ved økning skal vekstfaktoren være større enn 1.' : 'Ved nedgang skal vekstfaktoren være mindre enn 1.';
        if (near(v, 1 + (opp ? p : -p) / 10)) return `Sjekk kommaet: ${pst(p)} % = ${dec(p / 100, 4)}.`;
        return `Vekstfaktor = 100 % ${opp ? '+' : '−'} ${pst(p)} %, skrevet som desimaltall.`;
      },
      losning: (
        <>
          100 % {opp ? '+' : '−'} {pst(p)} % = {pst(100 + (opp ? p : -p))} % = <span className="pen">{dec(b, 4)}</span>
        </>
      ),
      side: <p className="muted small">Skriv desimaltall med komma, for eksempel 1,04.</p>,
    };
  return {
    oppgave: <>Vekstfaktor {dec(b, 4)}</>,
    instruks: 'Hvor mange prosent endres verdien hver periode? Skriv minus foran ved nedgang.',
    felt: [{ navn: 'Endring i prosent', foran: 'Endring:', bak: '%' }],
    vurder: ({ tall: [v] }) => {
      const svar = opp ? p : -p;
      if (near(v, svar)) return null;
      if (near(v, -svar)) return opp ? 'Vekstfaktoren er større enn 1, så det er en økning.' : 'Vekstfaktoren er mindre enn 1, så det er en nedgang. Skriv minus foran.';
      if (near(v, b * 100)) return 'Det er hele vekstfaktoren i prosent. Hvor mye er det mer eller mindre enn 100 %?';
      return 'Gjør vekstfaktoren om til prosent og sammenlign med 100 %.';
    },
    losning: (
      <>
        {dec(b, 4)} = {pst(b * 100)} % = 100 % {opp ? '+' : '−'} {pst(p)} %:{' '}
        <span className="pen">
          {opp ? 'økning' : 'nedgang'} på {pst(p)} %
        </span>
      </>
    ),
  };
}

type Situasjon = { tekst: (a: string, p: string, opp: boolean) => string; a: number[]; opp?: boolean };

const SITUASJONER: Situasjon[] = [
  { tekst: (a, p) => `Du setter inn ${a} kr i banken med ${p} % årlig rente.`, a: [10000, 20000, 50000, 100000], opp: true },
  { tekst: (a, p) => `En bil koster ${a} kr som ny og taper ${p} % av verdien hvert år.`, a: [200000, 300000, 450000], opp: false },
  { tekst: (a, p, opp) => `En by har ${a} innbyggere. Folketallet ${opp ? 'øker' : 'synker'} med ${p} % per år.`, a: [12000, 25000, 40000] },
  { tekst: (a, p) => `En kopp kaffe er ${a} grader varmere enn rommet. Forskjellen minker med ${p} % per minutt.`, a: [50, 60], opp: false },
];

function lagUttrykk(): Ovelse {
  const s = velg(SITUASJONER);
  const a = velg(s.a);
  const opp = s.opp ?? ri(0, 1) === 1;
  const p = opp ? velg([2, 3, 4, 5, 2.5, 3.5]) : velg([5, 8, 10, 12, 15, 20]);
  const b = faktor(p, opp);
  return {
    oppgave: s.tekst(tall(a), pst(p), opp),
    instruks: (
      <>
        Skriv funksjonen på formen <Fx /> = <i className="v">a</i> · <i className="v">b</i>
        <sup>
          <i className="v">x</i>
        </sup>
        .
      </>
    ),
    felt: [
      { navn: 'a', foran: <><Fx /> =</> },
      { navn: 'b', foran: '·', bak: <sup><i className="v">x</i></sup> },
    ],
    vurder: ({ tall: [va, vb] }) => {
      if (near(vb, a) && near(va, b)) return 'Startverdien står foran, vekstfaktoren er grunntallet.';
      if (!near(va, a)) return 'a er startverdien, altså verdien når x = 0.';
      if (near(vb, p / 100)) return 'b skal være vekstfaktoren, ikke bare endringen.';
      if (!near(vb, b)) return `b er vekstfaktoren: 100 % ${opp ? '+' : '−'} ${pst(p)} %.`;
      return null;
    },
    losning: (
      <>
        <span className="mline">
          Startverdi {tall(a)}, vekstfaktor 100 % {opp ? '+' : '−'} {pst(p)} % = {dec(b, 4)}
        </span>
        <span className="mline pen">
          <Fx /> = <Eksp a={a} b={b} />
        </span>
      </>
    ),
  };
}

function lagRegn(): Ovelse {
  const a = velg([100, 200, 500, 800, 1000, 2000, 5000]);
  const b = velg([1.1, 1.2, 1.5, 0.9, 0.8, 0.5, 1.05, 0.95]);
  const n = ri(2, 5);
  const svar = a * b ** n;
  return {
    oppgave: (
      <>
        <Fx /> = <Eksp a={a} b={b} />
      </>
    ),
    instruks: <>Regn ut <Fx x={n} />. Rund av til nærmeste hele tall.</>,
    felt: [{ navn: `f(${n})`, foran: <><Fx x={n} /> ≈</> }],
    vurder: ({ tall: [v] }) => {
      if (Math.abs(v - svar) <= 0.5 + 1e-9) return null;
      if (Math.abs(v - (a * b) ** n) < 1) return 'Regn ut potensen først, og gang så med a.';
      if (Math.abs(v - a * b * n) < 1) return `Eksponenten betyr at du ganger med ${dec(b)} ${n} ganger, ikke at du ganger med ${n}.`;
      return `Sett inn x = ${n}: ${tall(a)} · ${dec(b)}^${n}.`;
    },
    losning: (
      <>
        <Fx x={n} /> = {tall(a)} · {dec(b)}
        <sup>{n}</sup> ≈ <span className="pen">{tusen(svar)}</span>
      </>
    ),
  };
}

function lagGraf(): Ovelse {
  const [a, b] = velg<[number, number]>([
    [1, 2],
    [1, 3],
    [2, 2],
    [2, 1.5],
    [3, 2],
    [4, 0.5],
    [6, 0.5],
    [8, 0.5],
    [9, 1 / 3],
    [4, 1.5],
    [5, 0.4],
    [2, 0.5],
  ]);
  const ymax = Math.max(a, a * b) > 6 ? 10 : 7;
  return {
    oppgave: <>Grafen til en eksponentialfunksjon</>,
    instruks: (
      <>
        Finn <i className="v">a</i> og <i className="v">b</i> i <Fx /> = <i className="v">a</i> · <i className="v">b</i>
        <sup>
          <i className="v">x</i>
        </sup>
        . Skriv brøk som 1/3.
      </>
    ),
    felt: [
      { navn: 'a', foran: 'a =' },
      { navn: 'b', foran: 'b =' },
    ],
    vurder: ({ tall: [va, vb] }) => {
      if (!near(va, a)) return 'a er der grafen skjærer y-aksen.';
      if (near(vb, a * b)) return 'b er det du ganger med, ikke verdien i x = 1. Del f(1) på f(0).';
      if (near(vb, a * b - a)) return 'b er det du ganger med, ikke hvor mye grafen stiger.';
      if (!near(vb, b)) return 'Se hva f(0) må ganges med for å bli f(1).';
      return null;
    },
    losning: (
      <>
        <span className="mline">
          <Fx x="0" /> = {dec(a)}, så a = {dec(a)}
        </span>
        <span className="mline">
          <Fx x="1" /> = {dec(a * b)}, så b = {dec(a * b)} : {dec(a)} = {b === 1 / 3 ? '1/3' : dec(b)}
        </span>
      </>
    ),
    side: (
      <FunkGraf
        kurver={[{ f: eksp(a, b) }]}
        punkter={[
          { x: 0, y: a, farge: 'pen' },
          { x: 1, y: a * b, farge: 'pen' },
        ]}
        xmin={-3}
        xmax={4}
        ymin={-1}
        ymax={ymax}
        xetikett={1}
        yetikett={1}
        h={360}
        title="Grafen til eksponentialfunksjonen i oppgaven"
      />
    ),
  };
}

function lag(niva: Niva): Ovelse {
  if (niva === 'vekstfaktor') return lagVekstfaktor();
  if (niva === 'uttrykk') return lagUttrykk();
  if (niva === 'regn') return lagRegn();
  return lagGraf();
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Eksponentialfunksjoner" nivaer={NIVAER} lag={lag} />;
