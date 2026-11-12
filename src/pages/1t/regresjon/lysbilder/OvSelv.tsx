import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { X, dec } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { ri } from '../../bokstavuttrykk/oppgaver';
import { Fx } from '../../funksjoner/felles';
import { tusen } from '../../skjaeringspunkter/felles';
import { MODELLER, type Modell } from '../felles';

type Niva = 'type' | 'bruk' | 'monster';

const NIVAER: [Niva, string][] = [
  ['type', 'Hvilken modell?'],
  ['bruk', 'Bruk modellen'],
  ['monster', 'Tallmønstre'],
];

const velg = <T,>(arr: T[]) => arr[ri(0, arr.length - 1)];
const tilf = (a: number, b: number) => a + Math.random() * (b - a);

/** Punktene til en tilfeldig funksjon av gitt type på [0, 6] */
function lagPunkter(m: Modell): { xs: number[]; ys: number[] } {
  let f: (x: number) => number;
  if (m === 'lin') {
    const a = velg([-1, -0.7, 0.6, 0.9]);
    f = (x) => a * x + (a < 0 ? 6.5 : 0.8);
  } else if (m === 'eksp') {
    const vekst = ri(0, 1) === 0;
    f = vekst ? (x) => 0.4 * 1.55 ** x : (x) => 6.5 * 0.62 ** x;
  } else if (m === 'poly2') {
    const s = tilf(2.3, 3.7);
    const opp = ri(0, 1) === 0;
    f = opp ? (x) => 0.55 * (x - s) ** 2 + 0.8 : (x) => -0.6 * (x - s) ** 2 + 6;
  } else if (m === 'poly3') {
    f = (x) => 0.2 * (x - 0.6) * (x - 3) * (x - 5.6) + 3.2;
  } else {
    const b = tilf(0.35, 0.6);
    f = (x) => 2.6 * x ** b;
  }
  const xs = [0.3, 1, 1.7, 2.4, 3.1, 3.8, 4.5, 5.2, 5.9].map((x) => +(x + tilf(-0.15, 0.15)).toFixed(2));
  if (m === 'pot') xs[0] = 0.15;
  const ys = xs.map((x) => f(x) + tilf(-0.18, 0.18));
  return { xs, ys };
}

function lagType(): Ovelse {
  const i = ri(0, MODELLER.length - 1);
  const [m, navn] = MODELLER[i];
  const { xs, ys } = lagPunkter(m);
  const TIPS: Record<Modell, string> = {
    lin: 'Punktene ligger langs en rett linje.',
    eksp: 'Punktene blir stadig brattere (eller slakere), og kurven går ikke gjennom origo.',
    poly2: 'Punktene har ett toppunkt eller ett bunnpunkt.',
    poly3: 'Punktene har både et toppunkt og et bunnpunkt.',
    poly4: 'Punktene kan ha flere topp- og bunnpunkter.',
    pot: 'Punktene starter i origo og vokser stadig slakere.',
  };
  return {
    oppgave: (
      <div style={{ width: 'min(420px, 80vw)' }}>
        <FunkGraf
          punkter={xs.map((x, k) => ({ x, y: ys[k], farge: 'c2' }))}
          xmin={-0.3}
          xmax={6.4}
          ymin={-0.3}
          ymax={7.5}
          xetikett={100}
          yetikett={100}
          h={300}
          title="Spredningsdiagram"
        />
      </div>
    ),
    instruks: 'Hvilken modell passer best til punktene?',
    valg: MODELLER.map(([, n]) => n),
    vurder: ({ valg }) => (valg === i ? null : 'Se etter kjennetegn: rett linje, toppunkt/bunnpunkt, origo, fast prosent?'),
    losning: (
      <>
        <b>{navn} modell.</b> {TIPS[m]}
      </>
    ),
    side: (
      <ul className="muted small" style={{ paddingLeft: '1.1em', margin: 0 }}>
        {MODELLER.map(([k, n]) => (
          <li key={k}>
            <b>{n}:</b> {TIPS[k]}
          </li>
        ))}
      </ul>
    ),
  };
}

const TEMA = [
  { hva: 'antall medlemmer i en klubb', enhet: 'medlemmer', start: 2020 },
  { hva: 'antall elbiler i en kommune', enhet: 'elbiler', start: 2018 },
  { hva: 'antall besøkende på et museum', enhet: 'besøkende', start: 2019 },
];

function lagBruk(): Ovelse {
  const tema = velg(TEMA);
  const type = velg(['lin', 'eksp', 'prosent'] as const);
  if (type === 'prosent') {
    const p = velg([3, 4, 5, 6, 8, 12, -2, -4, -5, -10]);
    const b = 1 + p / 100;
    const a = velg([150, 240, 800, 1200]);
    return {
      oppgave: (
        <>
          <Fx /> = {tusen(a)} · {dec(b, 2)}
          <sup><i className="v">x</i></sup>
        </>
      ),
      instruks: (
        <>
          Modellen viser {tema.hva} <X /> år etter {tema.start}. Med hvor mange prosent endrer antallet seg per år? Skriv
          minus for nedgang.
        </>
      ),
      felt: [{ navn: 'Prosent', foran: 'endring:', bak: '% per år' }],
      vurder: ({ tall: [v] }) =>
        Math.abs(v - p) < 0.01 ? null : Math.abs(v + p) < 0.01 ? 'Sjekk fortegnet: er vekstfaktoren over eller under 1?' : 'Vekstfaktoren b = 1 + p/100.',
      losning: (
        <>
          Vekstfaktoren er {dec(b, 2)}, altså {p > 0 ? 'økning' : 'nedgang'} på <span className="pen">{Math.abs(p)} %</span> per år.
        </>
      ),
    };
  }
  const n = ri(5, 12);
  const ar = tema.start + n;
  if (type === 'lin') {
    const a = velg([12, 15, 24, 35, -8, -14]);
    const b0 = velg([300, 450, 620, 980]);
    const svar = a * n + b0;
    return {
      oppgave: (
        <>
          <Fx /> = {a}<X /> + {b0}
        </>
      ),
      instruks: (
        <>
          Modellen viser {tema.hva} <X /> år etter {tema.start}. Hva sier modellen om {ar}?
        </>
      ),
      felt: [{ navn: 'Antall', foran: `${ar}:`, bak: tema.enhet }],
      vurder: ({ tall: [v] }) =>
        Math.abs(v - svar) < 0.5 ? null : Math.abs(v - (a * ar + b0)) < 1 ? `x er antall år etter ${tema.start}, ikke årstallet.` : `Regn ut f(${n}).`,
      losning: (
        <>
          {ar} er {n} år etter {tema.start}: <Fx x={n} /> = {a} · {n} + {b0} = <span className="pen">{svar}</span>
        </>
      ),
    };
  }
  const a = velg([120, 250, 400, 1500]);
  const b = velg([1.05, 1.08, 1.12, 0.9, 0.95]);
  const svar = a * b ** n;
  return {
    oppgave: (
      <>
        <Fx /> = {tusen(a)} · {dec(b, 2)}
        <sup><i className="v">x</i></sup>
      </>
    ),
    instruks: (
      <>
        Modellen viser {tema.hva} <X /> år etter {tema.start}. Hva sier modellen om {ar}? Rund av til hele tall.
      </>
    ),
    felt: [{ navn: 'Antall', foran: `${ar}:`, bak: tema.enhet }],
    vurder: ({ tall: [v] }) =>
      Math.abs(v - svar) <= 1 ? null : Math.abs(v - a * b * n) < 2 ? 'Vekstfaktoren skal opphøyes i x, ikke ganges med x.' : `Regn ut f(${n}).`,
    losning: (
      <>
        <Fx x={n} /> = {tusen(a)} · {dec(b, 2)}
        <sup>{n}</sup> ≈ <span className="pen">{tusen(svar)}</span>
      </>
    ),
  };
}

function lagMonster(): Ovelse {
  const kvad = ri(0, 1) === 0;
  const a = kvad ? velg([1, 2, 3]) : 0;
  const b = kvad ? velg([-1, 0, 1, 2]) : velg([2, 3, 4, 5, 7]);
  const c = velg([0, 1, 2, 3, 5]);
  const T = (n: number) => a * n * n + b * n + c;
  const tall = [1, 2, 3, 4].map(T);
  return {
    oppgave: <>{tall.join(', ')}, …</>,
    instruks: 'Finn neste tall, og tall nummer 10.',
    felt: [
      { navn: 'Neste', foran: 'nr. 5:' },
      { navn: 'Nummer 10', foran: 'nr. 10:' },
    ],
    vurder: ({ tall: [v5, v10] }) => {
      if (v5 === T(5) && v10 === T(10)) return null;
      if (v5 !== T(5)) return kvad ? 'Se på økningene. Hvordan endrer økningen seg?' : 'Hvor mye øker tallene hver gang?';
      return kvad ? 'Finn en formel, for eksempel med andregradsregresjon på (1, …), (2, …), (3, …), (4, …).' : 'Bruk formelen: startverdi + økning · (n − 1).';
    },
    losning: (
      <>
        <span className="mline">
          Tall nummer <i className="v">n</i> ={' '}
          {kvad ? (
            <>
              {a === 1 ? '' : a}
              <i className="v">n</i>
              <sup>2</sup>
              {b !== 0 && <> {b < 0 ? '−' : '+'} {Math.abs(b) === 1 ? '' : Math.abs(b)}<i className="v">n</i></>}
              {c !== 0 && <> + {c}</>}
            </>
          ) : (
            <>
              {b}
              <i className="v">n</i>
              {c !== 0 && <> + {c}</>}
            </>
          )}
        </span>
        <span className="mline pen">
          nr. 5: {T(5)}, &nbsp;nr. 10: {T(10)}
        </span>
      </>
    ),
    side: <p className="muted small">Lik økning hver gang gir lineær formel. Lik økning i økningen gir andregrad.</p>,
  };
}

function lag(niva: Niva): Ovelse {
  if (niva === 'type') return lagType();
  if (niva === 'bruk') return lagBruk();
  return lagMonster();
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Modellering og regresjon" nivaer={NIVAER} lag={lag} />;
