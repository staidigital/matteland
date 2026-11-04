import React from 'react';
import { near, Poly, X, Xk } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { ri, riUtenNull } from '../../bokstavuttrykk/oppgaver';

type Niva = 'tall' | 'skriv' | 'meda' | 'los';

const NIVAER: [Niva, string][] = [
  ['tall', 'Hva mangler?'],
  ['skriv', 'Skriv om'],
  ['meda', 'Tall foran x²'],
  ['los', 'Løs likningen'],
];

const fortegn = (n: number) => (n < 0 ? '−' : '+');
const FORTEGN_TIPS = <p className="muted small">Skriv negative tall med minus foran, for eksempel −4.</p>;

function lag(niva: Niva): Ovelse {
  const p = riUtenNull(-6, 6);
  const ap = Math.abs(p);
  const t = fortegn(p);
  const b = 2 * p;
  if (niva === 'tall') {
    return {
      oppgave: <><Xk /> {t} {2 * ap}<X /> + □</>,
      instruks: 'Hvilket tall gjør uttrykket til et kvadrat?',
      felt: [
        { navn: 'Tallet som mangler', foran: '□ =' },
        { navn: 'Tallet i parentesen', foran: <>Da er uttrykket (<X /> {t}</>, bak: <>)<sup>2</sup></> },
      ],
      vurder: ({ tall: [k, q] }) => {
        if (!near(k, p * p)) return `Halver ${2 * ap}, og kvadrer svaret.`;
        if (!near(q, ap)) return `Tallet i parentesen er halvparten av ${2 * ap}.`;
        return null;
      },
      losning: <><Xk /> {t} {2 * ap}<X /> + <span className="pen">{p * p}</span> = <span className="pen">(<X /> {t} {ap})<sup>2</sup></span></>,
    };
  }
  if (niva === 'skriv') {
    const c = ri(-9, 9);
    const q = c - p * p;
    return {
      oppgave: <Poly a={1} b={b} c={c} />,
      instruks: 'Skriv som fullstendig kvadrat.',
      felt: [
        { navn: 'Tallet i parentesen', foran: <>= (<X /> {t}</>, bak: <>)<sup>2</sup></> },
        { navn: 'Tallet bak parentesen', foran: '+' },
      ],
      vurder: ({ tall: [u, v] }) => {
        if (!near(u, ap)) return `Tallet i parentesen er halvparten av ${2 * ap}.`;
        if (!near(v, q)) return `Trekk fra ${p * p}, og regn så med konstantleddet ${c}.`;
        return null;
      },
      losning: <>(<X /> {t} {ap})<sup>2</sup> − {p * p} {c === 0 ? '' : `${fortegn(c)} ${Math.abs(c)}`} = <span className="pen">(<X /> {t} {ap})<sup>2</sup> {q === 0 ? '' : `${fortegn(q)} ${Math.abs(q)}`}</span></>,
      side: FORTEGN_TIPS,
    };
  }
  if (niva === 'meda') {
    const a = ri(2, 4);
    const c = ri(-9, 9);
    const q = c - a * p * p;
    return {
      oppgave: <Poly a={a} b={a * b} c={c} />,
      instruks: 'Skriv som fullstendig kvadrat.',
      felt: [
        { navn: 'Tallet i parentesen', foran: <>= {a}(<X /> {t}</>, bak: <>)<sup>2</sup></> },
        { navn: 'Tallet bak parentesen', foran: '+' },
      ],
      vurder: ({ tall: [u, v] }) => {
        if (!near(u, ap)) return `Sett ${a} utenfor parentesen først. Hva blir halvparten av tallet foran x da?`;
        if (!near(v, q)) return `Husk å gange ${a} med −${p * p}, og regn så med ${c}.`;
        return null;
      },
      losning: (
        <>
          <span className="mline">{a}(<Xk /> {t} {2 * ap}<X />) {c === 0 ? '' : `${fortegn(c)} ${Math.abs(c)}`}</span>
          <span className="mline">= {a}((<X /> {t} {ap})<sup>2</sup> − {p * p}) {c === 0 ? '' : `${fortegn(c)} ${Math.abs(c)}`}</span>
          <span className="mline pen">= {a}(<X /> {t} {ap})<sup>2</sup> {q === 0 ? '' : `${fortegn(q)} ${Math.abs(q)}`}</span>
        </>
      ),
      side: FORTEGN_TIPS,
    };
  }
  // los: (x + p)² = m², altså heltallige løsninger
  const m = ri(1, 6);
  const c = p * p - m * m;
  const x1 = -p + m;
  const x2 = -p - m;
  return {
    oppgave: <><Poly a={1} b={b} c={c} /> = 0</>,
    instruks: 'Løs likningen med fullstendig kvadrat.',
    felt: [
      { navn: 'Første løsning', foran: <><X /> =</> },
      { navn: 'Andre løsning', foran: <>eller <X /> =</> },
    ],
    vurder: ({ tall: [u, v] }) =>
      (near(u, x1) && near(v, x2)) || (near(u, x2) && near(v, x1)) ? null : `Skriv venstre side som et fullstendig kvadrat: (x ${t} ${ap})² = ${m * m}.`,
    losning: (
      <>
        <span className="mline">(<X /> {t} {ap})<sup>2</sup> = {m * m}</span>
        <span className="mline"><X /> {t} {ap} = ±{m}</span>
        <span className="mline pen"><X /> = {x1 < 0 ? '−' + -x1 : x1} eller <X /> = {x2 < 0 ? '−' + -x2 : x2}</span>
      </>
    ),
    side: <p className="muted small">Rekkefølgen på løsningene spiller ingen rolle.</p>,
  };
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Fullstendig kvadrat" nivaer={NIVAER} lag={lag} />;
