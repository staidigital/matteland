import React from 'react';
import { near, V, X, Xk } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { ri } from '../../bokstavuttrykk/oppgaver';

type Niva = 'areal' | 'tall' | 'kast';

const NIVAER: [Niva, string][] = [
  ['areal', 'Areal'],
  ['tall', 'Tall'],
  ['kast', 'Kast'],
];

const T = () => <V c="t" />;

function lag(niva: Niva): Ovelse {
  if (niva === 'areal') {
    const x = ri(3, 12);
    const d = ri(2, 8);
    const A = x * (x + d);
    return {
      oppgave: <>Et rektangel er {d} cm lengre enn det er bredt. Arealet er {A} cm².</>,
      instruks: 'Finn bredden.',
      felt: [{ navn: 'Bredde', foran: 'Bredden er', bak: 'cm' }],
      vurder: ({ tall: [u] }) => {
        if (near(u, x)) return null;
        if (near(u, x + d)) return 'Dette er lengden. Hva er bredden?';
        return `Sett opp x(x + ${d}) = ${A}, og løs likningen.`;
      },
      losning: (
        <>
          <span className="mline"><X />(<X /> + {d}) = {A}</span>
          <span className="mline"><Xk /> + {d}<X /> − {A} = 0</span>
          <span className="mline"><X /> = {x} eller <X /> = −{x + d}</span>
          <span className="mline pen">Bredden er {x} cm.</span>
        </>
      ),
      side: <p className="muted small">En lengde kan ikke være negativ.</p>,
    };
  }
  if (niva === 'tall') {
    const x = ri(5, 20);
    const N = x * (x + 1);
    return {
      oppgave: <>Produktet av to positive hele tall på rad er {N}.</>,
      instruks: 'Finn det minste av tallene.',
      felt: [{ navn: 'Tallet', foran: 'Det minste tallet er' }],
      vurder: ({ tall: [u] }) => {
        if (near(u, x)) return null;
        if (near(u, x + 1)) return 'Dette er det største tallet.';
        return `Sett opp x(x + 1) = ${N}, og løs likningen.`;
      },
      losning: (
        <>
          <span className="mline"><Xk /> + <X /> − {N} = 0</span>
          <span className="mline"><X /> = {x} eller <X /> = −{x + 1}</span>
          <span className="mline pen">Tallene er {x} og {x + 1}.</span>
        </>
      ),
      side: <p className="muted small">Oppgaven sier positive tall, så vi forkaster den negative løsningen.</p>,
    };
  }
  const s = ri(1, 2);
  const L = ri(s + 1, 6);
  const b = 5 * (L - s);
  const c = 5 * L * s;
  return {
    oppgave: <>En ball har høyden <span className="nw">−5<T /><sup>2</sup> + {b}<T /> + {c}</span> meter etter <T /> sekunder.</>,
    instruks: 'Når lander ballen?',
    felt: [{ navn: 'Tid', foran: 'Etter', bak: 'sekunder' }],
    vurder: ({ tall: [u] }) => {
      if (near(u, L)) return null;
      if (near(u, -s)) return 'Tiden kan ikke være negativ i denne situasjonen. Hva er den andre løsningen?';
      return 'Ballen lander når høyden er 0. Del likningen på −5 først.';
    },
    losning: (
      <>
        <span className="mline">−5<T /><sup>2</sup> + {b}<T /> + {c} = 0</span>
        <span className="mline"><T /><sup>2</sup> − {L - s === 1 ? '' : L - s}<T /> − {L * s} = 0</span>
        <span className="mline"><T /> = {L} eller <T /> = −{s}</span>
        <span className="mline pen">Ballen lander etter {L} sekunder.</span>
      </>
    ),
    side: <p className="muted small">Ballen lander når høyden er 0.</p>,
  };
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Praktiske oppgaver" nivaer={NIVAER} lag={lag} />;
