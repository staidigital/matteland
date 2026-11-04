import React from 'react';
import { Frac, X, minus, near, par } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { Ledd, tegn } from '../felles';
import { NIVAER, lagBeggeSider, lagBrokLikning, lagEnkelLikning, lagParentes, type Niva } from '../oppgaver';

const TIPS = <p className="muted small">Sett gjerne prøve før du trykker på Sjekk: stemmer venstre og høyre side med svaret ditt?</p>;
const FELT = [{ navn: 'Verdien av x', foran: <><X /> =</> }];

/** Siste linje: «kx = v» og «x = svar», eller bare «x = v» når k = 1 */
const Slutt: React.FC<{ k: number; v: number; x: number }> = ({ k, v, x }) => (
  <>
    {k !== 1 && <span className="mline"><Ledd k={k} /> = {minus(v)}</span>}
    <span className="mline pen"><X /> = {minus(x)}</span>
  </>
);

function lag(niva: Niva): Ovelse {
  if (niva === 'enkel') {
    const t = lagEnkelLikning();
    return {
      oppgave: <><Ledd k={t.a} m={t.b} /> = {minus(t.c)}</>,
      instruks: 'Løs likningen.',
      felt: FELT,
      vurder: ({ tall: [v] }) => (near(v, t.x) ? null : 'Flytt over tallet og skift fortegn. Del så på tallet foran x.'),
      losning: (
        <>
          <span className="mline"><Ledd k={t.a} /> = {minus(t.c)} − {par(t.b)}</span>
          <Slutt k={t.a} v={t.c - t.b} x={t.x} />
        </>
      ),
      side: TIPS,
    };
  }
  if (niva === 'begge') {
    const t = lagBeggeSider();
    return {
      oppgave: <><Ledd k={t.a} m={t.b} /> = <Ledd k={t.c} m={t.d} /></>,
      instruks: 'Løs likningen.',
      felt: FELT,
      vurder: ({ tall: [v] }) => (near(v, t.x) ? null : 'Samle x-leddene på én side og tallene på den andre.'),
      losning: (
        <>
          <span className="mline"><Ledd k={t.a} /> − <Ledd k={t.c} /> = {minus(t.d)} − {par(t.b)}</span>
          <Slutt k={t.a - t.c} v={t.d - t.b} x={t.x} />
        </>
      ),
      side: TIPS,
    };
  }
  if (niva === 'parentes') {
    const t = lagParentes();
    return {
      oppgave: <>{t.k}(<Ledd k={1} m={t.m} />) − (<Ledd k={1} m={t.n} />) = {minus(t.c)}</>,
      instruks: 'Løs likningen.',
      felt: FELT,
      vurder: ({ tall: [v] }) => (near(v, t.x) ? null : 'Løs opp parentesene først. Minus foran en parentes skifter fortegn på alle leddene inni.'),
      losning: (
        <>
          <span className="mline"><Ledd k={t.k} m={t.k * t.m} /> − <X /> {tegn(-t.n)} = {minus(t.c)}</span>
          <span className="mline"><Ledd k={t.k - 1} m={t.k * t.m - t.n} /> = {minus(t.c)}</span>
          <Slutt k={t.k - 1} v={t.c - t.k * t.m + t.n} x={t.x} />
        </>
      ),
      side: TIPS,
    };
  }
  const t = lagBrokLikning();
  const op = t.pluss ? '+' : '−';
  const h = t.fn * t.r;
  return {
    oppgave: <><Frac n={<Ledd k={1} m={t.m} />} d={t.p} /> {op} <Frac n={<X />} d={t.q} /> = {minus(t.r)}</>,
    instruks: 'Løs likningen.',
    felt: FELT,
    vurder: ({ tall: [v] }) => (near(v, t.x) ? null : `Gang alle leddene med fellesnevneren ${t.fn}. Husk parentes rundt telleren.`),
    losning: (
      <>
        <span className="mline">{t.u}(<Ledd k={1} m={t.m} />) {op} <Ledd k={t.v} /> = {minus(h)}</span>
        <span className="mline"><Ledd k={t.u} m={t.u * t.m} /> {op} <Ledd k={t.v} /> = {minus(h)}</span>
        <Slutt k={t.pluss ? t.u + t.v : t.u - t.v} v={h - t.u * t.m} x={t.x} />
      </>
    ),
    side: <p className="muted small">Fellesnevneren er {t.fn}. Brøkstreken virker som en parentes rundt telleren.</p>,
  };
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Førstegradslikninger" nivaer={NIVAER} lag={lag} />;
