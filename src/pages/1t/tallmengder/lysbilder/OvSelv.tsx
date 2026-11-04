import React from 'react';
import { minus } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { Tallinje } from '../felles';
import {
  MENGDER,
  NAVN,
  NIVAER,
  PASTANDER,
  SYMBOL,
  TALL,
  alleVarianter,
  iIntervall,
  ivTekst,
  lagIntervall,
  lagSett,
  lagTesttall,
  ulikhetTekst,
  type Niva,
} from '../oppgaver';

const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

function lag(niva: Niva): Ovelse {
  if (niva === 'mengde') {
    const t = pick(TALL);
    return {
      oppgave: t.tekst,
      instruks: 'Hva er den minste tallmengden tallet hører til?',
      valg: MENGDER.map((m) => `${SYMBOL[m]} ${NAVN[m]}`),
      vurder: ({ valg }) =>
        MENGDER[valg!] === t.minste
          ? null
          : MENGDER.indexOf(MENGDER[valg!]) > MENGDER.indexOf(t.minste)
            ? 'Tallet er med der, men det finnes en mindre tallmengde som også passer.'
            : 'Tallet er ikke med i den mengden. Regn ut eller forenkle tallet først.',
      losning: (
        <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.8em' }}>
          <b className="pen">
            {SYMBOL[t.minste]} {NAVN[t.minste]}
          </b>
          . {t.grunn}
        </span>
      ),
      side: <p className="muted small">ℕ ligger inni ℤ, ℤ inni ℚ og ℚ inni ℝ. Irrasjonale tall ligger bare i ℝ.</p>,
    };
  }
  if (niva === 'notasjon') {
    const t = pick(PASTANDER);
    return {
      oppgave: t.tekst,
      instruks: 'Er påstanden sann?',
      valg: ['Sann', 'Usann'],
      vurder: ({ valg }) => ((valg === 0) === t.sann ? null : '∈ står mellom et tall og en mengde. ⊂ står mellom to mengder.'),
      losning: (
        <span style={{ fontFamily: 'var(--f-body)', fontSize: '0.8em' }}>
          <b className="pen">{t.sann ? 'Sann' : 'Usann'}</b>. {t.grunn}
        </span>
      ),
      side: <p className="muted small">∈ ligger i, ∉ ligger ikke i, ⊂ delmengde av, \ utenom.</p>,
    };
  }
  if (niva === 'union') {
    const t = lagSett();
    const min = t.A.a - 2;
    const max = t.type === 'union' ? t.B.b + 2 : t.A.b + 2;
    const deler =
      t.type === 'union'
        ? [t.A, t.B]
        : [
            { a: t.A.a, b: t.c, aMed: true, bMed: false },
            { a: t.c, b: t.A.b, aMed: false, bMed: true },
          ];
    return {
      oppgave: (
        <>
          Er {minus(t.x)} med i {t.type === 'union' ? `${ivTekst(t.A)} ∪ ${ivTekst(t.B)}` : `${ivTekst(t.A)} \\ {${minus(t.c)}}`}?
        </>
      ),
      instruks: t.type === 'union' ? 'Et tall er med i unionen hvis det ligger i minst ett av intervallene.' : 'Tallet etter \\ er tatt bort fra intervallet.',
      valg: ['Ja', 'Nei'],
      vurder: ({ valg }) => ((valg === 0) === t.med ? null : 'Tegn mengden på en tallinje, og se hvor tallet ligger.'),
      losning: (
        <>
          <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>
            <b className="pen">{t.med ? 'Ja' : 'Nei'}</b>, {minus(t.x)} {t.med ? 'er med' : 'er ikke med'}.
          </span>
          <Tallinje min={min} max={max} deler={deler} merke={t.x} />
        </>
      ),
    };
  }
  const iv = lagIntervall();
  const linje = <Tallinje min={iv.a - 2} max={iv.b + 2} a={iv.a} b={iv.b} aMed={iv.aMed} bMed={iv.bMed} />;
  if (niva === 'skrivemate') {
    const varianter = alleVarianter(iv);
    const fasit = varianter.findIndex((v) => v.aMed === iv.aMed && v.bMed === iv.bMed);
    return {
      oppgave: ulikhetTekst(iv),
      instruks: 'Hvilket intervall er dette?',
      valg: varianter.map(ivTekst),
      vurder: ({ valg }) =>
        valg === fasit
          ? null
          : '≤ gir hakeparentes (tallet er med). < gir spissparentes (tallet er ikke med).',
      losning: (
        <>
          <span className="mline pen">{ivTekst(iv)}</span>
          {linje}
        </>
      ),
    };
  }
  const x = lagTesttall(iv);
  const med = iIntervall(x, iv);
  return {
    oppgave: (
      <>
        Er {minus(x)} med i {ivTekst(iv)}?
      </>
    ),
    instruks: 'Tenk på parentesene når tallet er et endepunkt.',
    valg: ['Ja', 'Nei'],
    vurder: ({ valg }) =>
      (valg === 0) === med ? null : x === iv.a || x === iv.b ? 'Se på parentesen ved endepunktet.' : 'Se hvor tallet ligger på tallinja.',
    losning: (
      <>
        <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>
          <b className="pen">{med ? 'Ja' : 'Nei'}</b>, {minus(x)} {med ? 'er med' : 'er ikke med'}.
        </span>
        <Tallinje min={iv.a - 2} max={iv.b + 2} a={iv.a} b={iv.b} aMed={iv.aMed} bMed={iv.bMed} merke={x} />
      </>
    ),
  };
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Tallmengder og intervaller" nivaer={NIVAER} lag={lag} />;
