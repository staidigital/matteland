import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { NIVAER, forkort, lagBokstav, lagForkorte, lagGangeDele, lagPlussMinus, vurderBrok, type Brok, type Niva } from '../oppgaver';

/** Brøk med minus foran hvis den er negativ, og hele tall uten brøkstrek */
const B: React.FC<{ b: Brok }> = ({ b }) =>
  b.d === 1 ? (
    <>{b.n < 0 ? '−' + Math.abs(b.n) : b.n}</>
  ) : (
    <>
      {b.n < 0 && '−'}
      <Frac n={Math.abs(b.n)} d={b.d} />
    </>
  );

const TIPS = <p className="muted small">Skriv brøk med skråstrek, for eksempel 3/4 eller −3/4. Forkort svaret så langt som mulig.</p>;
const SVAR = [{ navn: 'Svar', foran: '=' }];

function lag(niva: Niva): Ovelse {
  if (niva === 'forkort') {
    const t = lagForkorte();
    return {
      oppgave: <Frac n={t.b.n} d={t.b.d} />,
      instruks: 'Forkort så langt som mulig.',
      felt: SVAR,
      vurder: ({ tekst: [s] }) => vurderBrok(s, t.svar, 'Verdien har endret seg. Del teller og nevner med samme tall.'),
      losning: (
        <>
          <Frac n={`${t.b.n} : ${t.k}`} d={`${t.b.d} : ${t.k}`} /> = <span className="pen"><B b={t.svar} /></span>
        </>
      ),
      side: TIPS,
    };
  }
  if (niva === 'plussminus') {
    const t = lagPlussMinus();
    const op = t.pluss ? '+' : '−';
    const u1 = (t.a.n * t.fn) / t.a.d;
    const u2 = (t.c.n * t.fn) / t.c.d;
    const sum = t.pluss ? u1 + u2 : u1 - u2;
    return {
      oppgave: <><Frac n={t.a.n} d={t.a.d} /> {op} <Frac n={t.c.n} d={t.c.d} /></>,
      instruks: 'Regn ut.',
      felt: SVAR,
      vurder: ({ tekst: [s] }) => vurderBrok(s, t.svar, `Finn en fellesnevner først, for eksempel ${t.fn}.`),
      losning: (
        <>
          <span className="mline"><Frac n={u1} d={t.fn} /> {op} <Frac n={u2} d={t.fn} /> = <B b={{ n: sum, d: t.fn }} /></span>
          {t.svar.d !== t.fn && <span className="mline pen">= <B b={t.svar} /></span>}
        </>
      ),
      side: TIPS,
    };
  }
  if (niva === 'gangedele') {
    const t = lagGangeDele();
    const andre = t.gange ? t.c : { n: t.c.d, d: t.c.n };
    return {
      oppgave: <><Frac n={t.a.n} d={t.a.d} /> {t.gange ? '·' : ':'} <Frac n={t.c.n} d={t.c.d} /></>,
      instruks: 'Regn ut.',
      felt: SVAR,
      vurder: ({ tekst: [s] }) =>
        vurderBrok(s, t.svar, t.gange ? 'Gang teller med teller og nevner med nevner.' : 'Gang med den omvendte av den andre brøken.'),
      losning: (
        <>
          <span className="mline"><Frac n={t.a.n} d={t.a.d} /> · <Frac n={andre.n} d={andre.d} /> = <Frac n={t.a.n * andre.n} d={t.a.d * andre.d} /></span>
          <span className="mline pen">= <B b={forkort(t.svar)} /></span>
        </>
      ),
      side: TIPS,
    };
  }
  const t = lagBokstav();
  if (t.type === 'sum') {
    return {
      oppgave: <><Frac n={<X />} d={t.a} /> + <Frac n={<X />} d={t.b} /></>,
      instruks: <>Skriv som én brøk med <X /> i telleren. Forkort hvis du kan.</>,
      felt: [
        { navn: 'Tallet foran x i telleren', foran: '=', bak: <><X /> /</> },
        { navn: 'Nevneren' },
      ],
      vurder: ({ tall: [n, d] }) => {
        if (n === t.svar.n && d === t.svar.d) return null;
        if (d && n / d === t.svar.n / t.svar.d) return 'Riktig verdi, men du kan forkorte mer.';
        return 'Finn fellesnevner, og legg sammen tellerne.';
      },
      losning: (
        <>
          <span className="mline"><Frac n={<>{t.b}<X /></>} d={t.a * t.b} /> + <Frac n={<>{t.a}<X /></>} d={t.a * t.b} /></span>
          <span className="mline pen">= <Frac n={<>{t.svar.n === 1 ? '' : t.svar.n}<X /></>} d={t.svar.d} /></span>
        </>
      ),
      side: <p className="muted small">Fellesnevneren {t.a * t.b} virker alltid. Trenger du en mindre, forkorter du til slutt.</p>,
    };
  }
  if (t.type === 'felles') {
    const { k, m } = t;
    return {
      oppgave: <Frac n={<>{k}<X /> + {k * m}</>} d={k} />,
      instruks: 'Faktoriser telleren og forkort.',
      felt: [{ navn: 'Konstantleddet', foran: <>= <X /> +</> }],
      vurder: ({ tall: [v] }) => (v === m ? null : `Sett ${k} utenfor parentes i telleren.`),
      losning: (
        <>
          <Frac n={<>{k}(<X /> + {m})</>} d={k} /> = <span className="pen"><X /> + {m}</span>
        </>
      ),
      side: <p className="muted small">Bare faktorer kan strykes, så telleren må faktoriseres først.</p>,
    };
  }
  const { a } = t;
  const nevner = <><X /> + {a}</>;
  if (t.type === 'konjugat') {
    return {
      oppgave: <Frac n={<><X /><sup>2</sup> − {a * a}</>} d={nevner} />,
      instruks: 'Faktoriser telleren og forkort.',
      felt: [{ navn: 'Tallet', foran: <>= <X /> −</> }],
      vurder: ({ tall: [v] }) => (v === a ? null : 'Bruk konjugatsetningen på telleren.'),
      losning: (
        <>
          <Frac n={<>(<X /> + {a})(<X /> − {a})</>} d={nevner} /> = <span className="pen"><X /> − {a}</span>
        </>
      ),
      side: <p className="muted small">Bare faktorer kan strykes, så telleren må faktoriseres først.</p>,
    };
  }
  return {
    oppgave: <Frac n={<><X /><sup>2</sup> + {2 * a}<X /> + {a * a}</>} d={nevner} />,
    instruks: 'Faktoriser telleren og forkort.',
    felt: [{ navn: 'Tallet', foran: <>= <X /> +</> }],
    vurder: ({ tall: [v] }) => (v === a ? null : 'Bruk 1. kvadratsetning på telleren.'),
    losning: (
      <>
        <Frac n={<>(<X /> + {a})<sup>2</sup></>} d={nevner} /> = <span className="pen"><X /> + {a}</span>
      </>
    ),
    side: <p className="muted small">Bare faktorer kan strykes, så telleren må faktoriseres først.</p>,
  };
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Brøkregning" nivaer={NIVAER} lag={lag} />;
