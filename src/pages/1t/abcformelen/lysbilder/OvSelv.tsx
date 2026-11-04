import React from 'react';
import { Frac, fmt, minus, near, par, Poly, Rot, V, X, Xk } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { ri, riUtenNull } from '../../bokstavuttrykk/oppgaver';
import { LOSNINGSFELT, toLosninger } from '../../andregradslikninger/oppgaver';
import { lagOppgave } from '../../nullpunktsfaktorisering/oppgaver';

type Niva = 'koef' | 'diskriminant' | 'los' | 'brok';

const NIVAER: [Niva, string][] = [
  ['koef', 'Finn a, b og c'],
  ['diskriminant', 'Diskriminanten'],
  ['los', 'Løs likningen'],
  ['brok', 'Brøksvar'],
];

function lag(niva: Niva): Ovelse {
  if (niva === 'koef') {
    const a = ri(1, 5);
    const b = ri(2, 7) * (ri(0, 1) ? 1 : -1);
    const c = riUtenNull(-7, 7);
    return {
      oppgave: <>{a === 1 ? '' : a}<Xk /> {c < 0 ? '−' : '+'} {Math.abs(c)} = {minus(-b)}<X /></>,
      instruks: 'Skriv på standardform, og finn a, b og c.',
      felt: [
        { navn: 'a', foran: <V c="a" /> },
        { navn: 'b', foran: <V c="b" /> },
        { navn: 'c', foran: <V c="c" /> },
      ],
      vurder: ({ tall: [u, v, w] }) => {
        if (near(u, a) && near(v, b) && near(w, c)) return null;
        return 'Flytt alt til venstre side. Husk å skifte fortegn på det du flytter.';
      },
      losning: <><Poly a={a} b={b} c={c} /> = 0, så <V c="a" /> = {a}, <V c="b" /> = {minus(b)} og <V c="c" /> = {minus(c)}</>,
    };
  }
  if (niva === 'diskriminant') {
    const a = riUtenNull(-3, 4);
    const b = ri(-7, 7);
    const c = ri(-6, 6);
    const D = b * b - 4 * a * c;
    return {
      oppgave: <><Poly a={a} b={b} c={c} /> = 0</>,
      instruks: 'Regn ut diskriminanten. Hvor mange løsninger har likningen?',
      felt: [
        { navn: 'D', foran: <><V c="D" /> =</> },
        { navn: 'Antall løsninger', foran: 'Antall løsninger:' },
      ],
      vurder: ({ tall: [d, n] }) => {
        if (!near(d, D)) return 'D = b² − 4ac. Bruk parentes rundt negative tall.';
        const riktig = D > 0 ? 2 : D === 0 ? 1 : 0;
        return near(n, riktig) ? null : 'D > 0 gir to løsninger, D = 0 gir én, og D < 0 gir ingen.';
      },
      losning: <><V c="D" /> = {par(b)}<sup>2</sup> − 4 · {par(a)} · {par(c)} = <span className="pen">{minus(D)}</span>, altså {D > 0 ? 'to løsninger' : D === 0 ? 'én løsning' : 'ingen løsninger'}</>,
    };
  }
  const t = lagOppgave(niva === 'los' ? 'a' : 'brok');
  const b = -t.a * (t.r1 + t.r2);
  const c = t.a * t.r1 * t.r2;
  const D = Math.round(b * b - 4 * t.a * c);
  return {
    oppgave: <><Poly a={t.a} b={b} c={c} /> = 0</>,
    instruks: 'Løs likningen med abc-formelen.',
    felt: LOSNINGSFELT,
    vurder: ({ tall: [u, v] }) => (toLosninger(u, v, t.r1, t.r2) ? null : `Sjekk utregningen. Diskriminanten er ${minus(D)}.`),
    losning: (
      <>
        <span className="mline"><X /> = <Frac n={<>{minus(-b)} ± <Rot>{D}</Rot></>} d={minus(2 * t.a)} /></span>
        <span className="mline pen"><X /> = {fmt(t.r1)} eller <X /> = {fmt(t.r2)}</span>
      </>
    ),
    side: <p className="muted small">Rekkefølgen på løsningene spiller ingen rolle. Brøk skrives som 3/2.</p>,
  };
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="abc-formelen" nivaer={NIVAER} lag={lag} />;
