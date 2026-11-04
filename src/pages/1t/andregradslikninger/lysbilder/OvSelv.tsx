import React from 'react';
import { Factored, fmt, minus, Poly, X, Xk } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { ri, riUtenNull } from '../../bokstavuttrykk/oppgaver';
import { LOSNINGSFELT, toLosninger } from '../oppgaver';

type Niva = 'rot' | 'produkt' | 'felles' | 'sumprodukt';

const NIVAER: [Niva, string][] = [
  ['rot', 'Kvadratrot og ±'],
  ['produkt', 'Produktregelen'],
  ['felles', 'Felles faktor'],
  ['sumprodukt', 'Sum og produkt'],
];

const TIPS = <p className="muted small">Rekkefølgen på løsningene spiller ingen rolle. Brøk skrives som 3/2.</p>;
const svar = (u: number, v: number) => (
  <span className="mline pen"><X /> = {fmt(u)} eller <X /> = {fmt(v)}</span>
);

/** To ulike heltall i [-m, m], uten 0 */
const toUlike = (m: number): [number, number] => {
  const a = riUtenNull(-m, m);
  let b = riUtenNull(-m, m);
  while (b === a) b = riUtenNull(-m, m);
  return [a, b];
};

function lag(niva: Niva): Ovelse {
  if (niva === 'rot') {
    const m = ri(2, 9);
    const type = ri(0, 2);
    if (type === 0) {
      return {
        oppgave: <><Xk /> = {m * m}</>,
        instruks: 'Løs likningen.',
        felt: LOSNINGSFELT,
        vurder: ({ tall: [u, v] }) => (toLosninger(u, v, m, -m) ? null : `Hvilke tall blir ${m * m} når vi kvadrerer dem? Det er to.`),
        losning: svar(m, -m),
        side: TIPS,
      };
    }
    if (type === 1) {
      const a = ri(2, 5);
      const n = ri(2, 6);
      return {
        oppgave: <>{a}<Xk /> − {a * n * n} = 0</>,
        instruks: 'Løs likningen.',
        felt: LOSNINGSFELT,
        vurder: ({ tall: [u, v] }) => (toLosninger(u, v, n, -n) ? null : `Få x² alene: ${a}x² = ${a * n * n}, og del så på ${a}.`),
        losning: <><span className="mline"><Xk /> = {n * n}</span>{svar(n, -n)}</>,
        side: TIPS,
      };
    }
    const p = riUtenNull(-6, 6);
    const n = ri(1, 6);
    const [x1, x2] = [p + n, p - n];
    return {
      oppgave: <>(<X /> {p < 0 ? '+' : '−'} {Math.abs(p)})<sup>2</sup> = {n * n}</>,
      instruks: 'Løs likningen.',
      felt: LOSNINGSFELT,
      vurder: ({ tall: [u, v] }) => (toLosninger(u, v, x1, x2) ? null : `Parentesen er ±${n}. Lag to likninger.`),
      losning: <><span className="mline"><X /> {p < 0 ? '+' : '−'} {Math.abs(p)} = ±{n}</span>{svar(x1, x2)}</>,
      side: TIPS,
    };
  }
  if (niva === 'produkt') {
    const [x1, x2] = toUlike(7);
    return {
      oppgave: <><Factored a={1} r1={x1} r2={x2} c1="" c2="" /> = 0</>,
      instruks: 'Løs likningen med produktregelen.',
      felt: LOSNINGSFELT,
      vurder: ({ tall: [u, v] }) => (toLosninger(u, v, x1, x2) ? null : 'Sett hver faktor lik 0. Pass på fortegnene.'),
      losning: svar(x1, x2),
      side: TIPS,
    };
  }
  if (niva === 'felles') {
    const a = ri(1, 4);
    const n = riUtenNull(-7, 7);
    const b = a * n;
    return {
      oppgave: <><Poly a={a} b={b} c={0} /> = 0</>,
      instruks: 'Løs likningen ved å sette en felles faktor utenfor.',
      felt: LOSNINGSFELT,
      vurder: ({ tall: [u, v] }) => (toLosninger(u, v, 0, -n) ? null : 'Sett x utenfor. Husk at x = 0 også er en løsning.'),
      losning: <><span className="mline">{a === 1 ? '' : a}<X />(<X /> {n < 0 ? '−' : '+'} {Math.abs(n)}) = 0</span>{svar(0, -n)}</>,
      side: TIPS,
    };
  }
  const [x1, x2] = toUlike(7);
  const b = -(x1 + x2);
  const c = x1 * x2;
  return {
    oppgave: <><Poly a={1} b={b} c={c} /> = 0</>,
    instruks: 'Løs likningen med sum og produkt.',
    felt: LOSNINGSFELT,
    vurder: ({ tall: [u, v] }) => (toLosninger(u, v, x1, x2) ? null : `Finn to tall med sum ${minus(b)} og produkt ${minus(c)}. Husk at løsningene har motsatt fortegn av tallene.`),
    losning: <><span className="mline"><Factored a={1} r1={x1} r2={x2} c1="" c2="" /> = 0</span>{svar(x1, x2)}</>,
    side: <p className="muted small">Finn to tall med sum {minus(b)} og produkt {minus(c)}.</p>,
  };
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Løs likningen" nivaer={NIVAER} lag={lag} />;
