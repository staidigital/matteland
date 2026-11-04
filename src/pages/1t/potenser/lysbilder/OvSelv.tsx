import React from 'react';
import { Frac, Rot, V, minus, near, par } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { NIVAER, forenkleRot, lagBrokeksponent, lagRegel, lagRot, lagVerdi, type Niva } from '../oppgaver';

function lag(niva: Niva): Ovelse {
  if (niva === 'regler') {
    const t = lagRegel();
    const g = <V c={t.v} />;
    return {
      oppgave:
        t.type === 'gange' ? (
          <>{g}<sup>{minus(t.m)}</sup> · {g}<sup>{t.n}</sup></>
        ) : t.type === 'dele' ? (
          <Frac n={<>{g}<sup>{minus(t.m)}</sup></>} d={<>{g}<sup>{t.n}</sup></>} />
        ) : (
          <>({g}<sup>{minus(t.m)}</sup>)<sup>{t.n}</sup></>
        ),
      instruks: 'Skriv som én potens. Hva er eksponenten?',
      felt: [{ navn: 'Eksponenten', foran: <>= {g} opphøyd i</> }],
      vurder: ({ tall: [e] }) =>
        e === t.svar
          ? null
          : t.type === 'gange'
            ? 'Legg sammen eksponentene.'
            : t.type === 'dele'
              ? 'Trekk eksponenten i nevneren fra eksponenten i telleren.'
              : 'Gang eksponentene.',
      losning: (
        <>
          {g}
          <sup>
            {t.type === 'gange' ? `${minus(t.m)} + ${t.n}` : t.type === 'dele' ? `${minus(t.m)} − ${t.n}` : `${minus(t.m)} · ${t.n}`}
          </sup>{' '}
          = <span className="pen">{g}<sup>{minus(t.svar)}</sup></span>
        </>
      ),
    };
  }
  if (niva === 'verdi') {
    const t = lagVerdi();
    const oppg =
      t.type === 'negativ' ? (
        <>{t.a}<sup>−{t.n}</sup></>
      ) : t.type === 'null' ? (
        <>{t.a}<sup>0</sup></>
      ) : t.type === 'parentes' ? (
        <>(−{t.a})<sup>{t.n}</sup></>
      ) : (
        <>−{t.a}<sup>{t.n}</sup></>
      );
    return {
      oppgave: oppg,
      instruks: 'Regn ut uten kalkulator. Svar med heltall eller brøk.',
      felt: [{ navn: 'Svar', foran: '=' }],
      vurder: ({ tall: [v] }) => {
        if (near(v, t.teller / t.nevner)) return null;
        if (t.type === 'negativ') return near(v, -t.nevner) ? 'En negativ eksponent gir en brøk, ikke et negativt tall.' : `Skriv brøken 1/${t.a}^${t.n}.`;
        if (t.type === 'null') return 'Alle tall (unntatt 0) opphøyd i 0 er 1.';
        if (near(v, -t.teller)) return t.type === 'uten' ? 'Eksponenten gjelder bare tallet, ikke minustegnet.' : 'Sjekk fortegnet: tell minustegnene.';
        return 'Skriv potensen som et produkt og regn ut.';
      },
      losning:
        t.type === 'negativ' ? (
          <><Frac n="1" d={<>{t.a}<sup>{t.n}</sup></>} /> = <span className="pen"><Frac n="1" d={t.nevner} /></span></>
        ) : t.type === 'null' ? (
          <span className="pen">1</span>
        ) : t.type === 'parentes' ? (
          <>{Array.from({ length: t.n }, () => par(-t.a)).join(' · ')} = <span className="pen">{minus(t.teller)}</span></>
        ) : (
          <>−({Array.from({ length: t.n }, () => t.a).join(' · ')}) = <span className="pen">{minus(t.teller)}</span></>
        ),
    };
  }
  if (niva === 'rot') {
    const t = lagRot();
    return {
      oppgave: <Rot>{t.n}</Rot>,
      instruks: 'Skriv så enkelt som mulig.',
      felt: [
        { navn: 'Tallet foran roten', foran: '=', bak: '·' },
        { navn: 'Tallet under roten', foran: '√' },
      ],
      vurder: ({ tall: [k, m] }) => {
        if (k === t.k && m === t.m) return null;
        if (k * k * m !== t.n) return `Finn et kvadrattall som går opp i ${t.n}.`;
        const f = forenkleRot(m);
        return f.k > 1 ? `Det stemmer, men √${m} kan forenkles videre.` : 'Sjekk regnestykket ditt.';
      },
      losning: (
        <>
          <Rot>{t.k * t.k} · {t.m}</Rot> = <Rot>{t.k * t.k}</Rot> · <Rot>{t.m}</Rot> = <span className="pen">{t.k}<Rot>{t.m}</Rot></span>
        </>
      ),
      side: <p className="muted small">Kvadrattall: 4, 9, 16, 25, 36, 49, 64, 81, 100 …</p>,
    };
  }
  const t = lagBrokeksponent();
  const eks = `${t.negativ ? '−' : ''}${t.m}/${t.n}`;
  return {
    oppgave: <>{t.g}<sup>{eks}</sup></>,
    instruks: 'Regn ut uten kalkulator. Svar med heltall eller brøk.',
    felt: [{ navn: 'Svar', foran: '=' }],
    vurder: ({ tall: [v] }) => {
      if (near(v, t.svar)) return null;
      if (near(v, t.r)) return `Det er roten. Nå må du opphøye i ${t.m}.`;
      if (t.negativ && near(v, 1 / t.svar)) return 'Husk at negativ eksponent gir den omvendte verdien.';
      return `Finn roten først: ${t.n === 2 ? 'kvadratroten' : t.n === 3 ? 'tredjeroten' : 'fjerderoten'} av ${t.g}.`;
    },
    losning: (
      <>
        <span className="mline">
          {t.negativ && <>1 / </>}
          (<Rot n={t.n === 2 ? undefined : t.n}>{t.g}</Rot>)<sup>{t.m}</sup> {t.negativ && <>= 1 / </>}
          {t.negativ ? '' : '= '}{t.r}<sup>{t.m}</sup>
        </span>
        <span className="mline pen">
          = {t.negativ ? <Frac n="1" d={t.r ** t.m} /> : t.r ** t.m}
        </span>
      </>
    ),
    side: (
      <p className="muted small">
        Tips: <Rot n="3">8</Rot> = 2, <Rot n="3">27</Rot> = 3, <Rot n="4">16</Rot> = 2, <Rot n="4">81</Rot> = 3.
      </p>
    ),
  };
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Potenser og røtter" nivaer={NIVAER} lag={lag} />;
