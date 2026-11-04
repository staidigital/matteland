import React from 'react';
import { Frac, Poly, V, minus, par } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { Verditabell } from '../../funksjoner/felles';
import { F } from '../felles';
import { NIVAER, lagAndregrad, lagLineart, lagNummer, lagRegnUt, type Niva } from '../oppgaver';

const N = () => <V c="n" />;
const NR = [1, 2, 3, 4, 5];

/** an + b */
const Lin: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <span className="nw">
    {a}<N />
    {b !== 0 && <> {b < 0 ? '−' : '+'} {Math.abs(b)}</>}
  </span>
);

function lag(niva: Niva): Ovelse {
  if (niva === 'formel') {
    const t = lagLineart();
    return {
      oppgave: <>{t.verdier.slice(0, 4).join(', ')}, …</>,
      instruks: 'Finn en formel for figur n. Skriv 0 hvis det ikke er noe konstantledd.',
      felt: [
        { navn: 'Tallet foran n', foran: <><F /> =</>, bak: <><N /> +</> },
        { navn: 'Konstantleddet' },
      ],
      vurder: ({ tall: [a, b] }) => {
        if (a === t.a && b === t.b) return null;
        if (a !== t.a) return 'Tallet foran n er økningen fra én figur til den neste.';
        return `Sett inn n = 1. Du skal få ${t.verdier[0]}.`;
      },
      losning: (
        <>
          <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>Økningen er {t.a}. Konstantleddet er {t.verdier[0]} − {t.a} = {minus(t.b)}.</span>
          <span className="mline pen"><F /> = <Lin a={t.a} b={t.b} /></span>
        </>
      ),
      side: <Verditabell x={<N />} y={<F />} xs={NR} ys={t.verdier} />,
    };
  }
  if (niva === 'regnut') {
    const t = lagRegnUt();
    const k = t.k;
    const formel =
      t.type === 'lin' ? <Lin a={t.a} b={t.b} /> : t.type === 'kv' ? <><N /><sup>2</sup> {t.b < 0 ? '−' : '+'} {Math.abs(t.b)}</> : t.type === 'rekt' ? <><N />(<N /> + 1)</> : <Frac n={<><N />(<N /> + 1)</>} d="2" />;
    const inn =
      t.type === 'lin' ? <>{t.a} · {k} {t.b < 0 ? '−' : '+'} {Math.abs(t.b)}</> : t.type === 'kv' ? <>{k}<sup>2</sup> {t.b < 0 ? '−' : '+'} {Math.abs(t.b)}</> : t.type === 'rekt' ? <>{k} · {k + 1}</> : <Frac n={`${k} · ${k + 1}`} d="2" />;
    return {
      oppgave: <><F /> = {formel}</>,
      instruks: <>Regn ut antallet prikker i figur {k}.</>,
      felt: [{ navn: 'Svar', foran: <><F n={k} /> =</> }],
      vurder: ({ tall: [v] }) => (v === t.svar ? null : `Sett inn n = ${k} i formelen. Regn ut parenteser og potenser først.`),
      losning: <>{inn} = <span className="pen">{t.svar}</span></>,
    };
  }
  if (niva === 'nummer') {
    const t = lagNummer();
    const formel = t.type === 'lin' ? <Lin a={t.a} b={t.b} /> : t.type === 'rekt' ? <><N />(<N /> + 1)</> : <Frac n={<><N />(<N /> + 1)</>} d="2" />;
    return {
      oppgave: <><F /> = {formel}</>,
      instruks: <>Hvilken figur har {t.verdi} prikker?</>,
      felt: [{ navn: 'Figurnummer', foran: <><N /> =</> }],
      vurder: ({ tall: [v] }) => {
        if (v === t.n) return null;
        if (t.type !== 'lin' && v === -t.n - 1) return 'Likningen har den løsningen også, men figurnummeret må være positivt.';
        return `Løs likningen F = ${t.verdi}. Sett gjerne inn svaret for å sjekke.`;
      },
      losning:
        t.type === 'lin' ? (
          <>
            <span className="mline">{t.a}<N /> = {t.verdi} {t.b < 0 ? '+' : '−'} {Math.abs(t.b)} = {t.verdi - t.b}</span>
            <span className="mline pen"><N /> = {t.n}</span>
          </>
        ) : (
          <>
            <span className="mline">{t.type === 'rekt' ? <><N /><sup>2</sup> + <N /> − {t.verdi} = 0</> : <><N /><sup>2</sup> + <N /> − {2 * t.verdi} = 0</>}</span>
            <span className="mline">abc-formelen gir <N /> = {t.n} eller <N /> = {minus(-t.n - 1)}</span>
            <span className="mline pen"><N /> = {t.n}</span>
          </>
        ),
    };
  }
  const t = lagAndregrad();
  return {
    oppgave: <>{t.verdier.join(', ')}, …</>,
    instruks: <>Økningen øker med 2. Finn en formel på formen <span className="nw">n² + pn + q</span>.</>,
    felt: [
      { navn: 'p', foran: <><F /> = <N /><sup>2</sup> +</>, bak: <><N /> +</> },
      { navn: 'q' },
    ],
    vurder: ({ tall: [p, q] }) => {
      if (p === t.p && q === t.q) return null;
      if (p === t.p) return `Sett inn n = 1. Du skal få ${t.verdier[0]}.`;
      return 'Trekk n² fra hver verdi. Da får du et lineært mønster.';
    },
    losning: (
      <>
        <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>
          Trekker vi n² fra, får vi {t.verdier.map((v, i) => minus(v - (i + 1) ** 2)).join(', ')}.
        </span>
        <span className="mline pen"><F /> = <Poly a={1} b={t.p} c={t.q} /></span>
      </>
    ),
    side: (
      <>
        <Verditabell x={<N />} y={<F />} xs={NR} ys={t.verdier} />
        <p className="muted small">Bruk minustegn for negative tall, og skriv 0 hvis et ledd mangler. Eksempel: {par(-2)} skrives −2.</p>
      </>
    ),
  };
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Figurtall" nivaer={NIVAER} lag={lag} />;
