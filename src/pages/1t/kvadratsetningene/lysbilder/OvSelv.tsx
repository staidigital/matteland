import React from 'react';
import { near, X, Xk } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { ri } from '../../bokstavuttrykk/oppgaver';

type Niva = 'forste' | 'andre' | 'konjugat' | 'faktor';

const NIVAER: [Niva, string][] = [
  ['forste', '1. kvadratsetning'],
  ['andre', '2. kvadratsetning'],
  ['konjugat', 'Konjugatsetningen'],
  ['faktor', 'Faktorisere'],
];

/** kx, uten 1-tall */
const Kx: React.FC<{ k: number }> = ({ k }) => <>{k === 1 ? '' : k}<X /></>;

const TIPS_MIDT = <p className="muted small">Midtleddet er 2 ganger de to leddene i parentesen.</p>;

function lag(niva: Niva): Ovelse {
  const k = ri(1, 3);
  const m = ri(2, 9);
  if (niva === 'forste' || niva === 'andre') {
    const pluss = niva === 'forste';
    const tegn = pluss ? '+' : '−';
    const midt = 2 * k * m;
    return {
      oppgave: <>(<Kx k={k} /> {tegn} {m})<sup>2</sup></>,
      instruks: 'Gang ut med kvadratsetningen.',
      felt: [
        { navn: 'Tallet foran x', foran: <>= {k * k === 1 ? '' : k * k}<Xk /> {tegn}</>, bak: <X /> },
        { navn: 'Konstantleddet', foran: '+' },
      ],
      vurder: ({ tall: [a, b] }) => {
        if (!near(a, midt)) return `Midtleddet: 2 · ${k === 1 ? 'x' : k + 'x'} · ${m}. Hvor mange x blir det?`;
        if (!near(b, m * m)) return `Siste ledd er ${m}².`;
        return null;
      },
      losning: <span className="pen">{k * k === 1 ? '' : k * k}<Xk /> {tegn} {midt}<X /> + {m * m}</span>,
      side: TIPS_MIDT,
    };
  }
  if (niva === 'konjugat') {
    return {
      oppgave: <>(<Kx k={k} /> + {m})(<Kx k={k} /> − {m})</>,
      instruks: 'Gang ut med konjugatsetningen.',
      felt: [
        { navn: 'Tallet foran x²', foran: '=', bak: <Xk /> },
        { navn: 'Konstantleddet', foran: '−' },
      ],
      vurder: ({ tall: [a, b] }) => {
        if (!near(a, k * k)) return `Tallet foran x² er kvadratet av ${k}.`;
        if (!near(b, m * m)) return `Det siste leddet er ${m}².`;
        return null;
      },
      losning: <span className="pen">{k * k === 1 ? '' : k * k}<Xk /> − {m * m}</span>,
      side: <p className="muted small">Midtleddene forsvinner. Skriv 1 hvis det ikke står noe tall foran x².</p>,
    };
  }
  const type = ri(0, 2);
  if (type === 2) {
    return {
      oppgave: <><Xk /> − {m * m}</>,
      instruks: 'Faktoriser.',
      felt: [
        { navn: 'Tallet i den første parentesen', foran: <>= (<X /> +</>, bak: ')' },
        { navn: 'Tallet i den andre parentesen', foran: <>(<X /> −</>, bak: ')' },
      ],
      vurder: ({ tall: [a, b] }) => (near(a, m) && near(b, m) ? null : `Hvilket tall blir ${m * m} når vi kvadrerer det?`),
      losning: <span className="pen">(<X /> + {m})(<X /> − {m})</span>,
      side: <p className="muted small">To kvadrater med minus mellom gir konjugatsetningen.</p>,
    };
  }
  const tegn = type === 0 ? '+' : '−';
  return {
    oppgave: <><Xk /> {tegn} {2 * m}<X /> + {m * m}</>,
    instruks: 'Faktoriser.',
    felt: [{ navn: 'Tallet i parentesen', foran: <>= (<X /> {tegn}</>, bak: <>)<sup>2</sup></> }],
    vurder: ({ tall: [a] }) => (near(a, m) ? null : `Hvilket tall blir ${m * m} når vi kvadrerer det? Sjekk at midtleddet stemmer.`),
    losning: <span className="pen">(<X /> {tegn} {m})<sup>2</sup></span>,
    side: <p className="muted small">Sjekk: det dobbelte produktet skal bli {2 * m}x.</p>,
  };
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Kvadratsetningene" nivaer={NIVAER} lag={lag} />;
