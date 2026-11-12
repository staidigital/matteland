import React from 'react';
import { Frac, near } from '../../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../../presentasjon/ovelser';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { ri } from '../../../bokstavuttrykk/oppgaver';

type Niva = 'ut' | 'kode' | 'print';

const NIVAER: [Niva, string][] = [
  ['ut', 'Hva blir svaret?'],
  ['kode', 'Hvilken kode?'],
  ['print', 'Tekst eller tall?'],
];

const velg = <T,>(arr: T[]) => arr[ri(0, arr.length - 1)];

/** Stokker svaralternativene og husker hvor det riktige havnet */
function stokk(riktig: string, gale: string[]) {
  const alle = [riktig, ...gale].sort(() => Math.random() - 0.5);
  return { alle, fasit: alle.indexOf(riktig) };
}

/** Slik Python skriver ut et tall: desimaltall får alltid med .0 */
const somPython = (v: number, desimal: boolean) => (desimal && Number.isInteger(v) ? v.toFixed(1) : String(v));

function lagUt(): Ovelse {
  const a = ri(2, 9);
  const b = ri(2, 6);
  const c = ri(2, 5);
  const maler: [string, number, string, boolean][] = [
    [`${a} + ${b}*${c}`, a + b * c, 'Ganging før pluss.', false],
    [`(${a} + ${b})*${c}`, (a + b) * c, 'Parentesen regnes først.', false],
    [`${a}*${b}**2`, a * b ** 2, 'Potens før ganging.', false],
    [`${a * 10} - ${b}**2`, a * 10 - b ** 2, 'Potens før minus.', false],
    [`(${a + b} - ${b})**2`, a ** 2, 'Parentesen regnes først, deretter potensen.', false],
    [`${a * c}/${c} + ${b}`, a + b, 'Deling før pluss. Divisjon gir desimaltall.', true],
    [`${b}*${a * c}/${c}`, b * a, 'Ganging og deling fra venstre mot høyre. Divisjon gir desimaltall.', true],
  ];
  const [uttrykk, svar, regel, desimal] = velg(maler);
  return {
    oppgave: <Kode inline>{`print(${uttrykk})`}</Kode>,
    instruks: 'Hva skriver programmet ut? Regn i hodet eller på papir.',
    felt: [{ navn: 'Svar' }],
    vurder: ({ tall }) => (near(tall[0], svar) ? null : regel),
    losning: (
      <>
        <span className="mline small">{regel}</span>
        <code className="py-inline pen">{somPython(svar, desimal)}</code>
      </>
    ),
  };
}

function lagKode(): Ovelse {
  const a = ri(2, 9);
  const b = ri(2, 9);
  const c = ri(5, 12);
  const d = ri(1, 4);
  const n = ri(2, 4);
  const maler: [React.ReactNode, string, string[], string][] = [
    [
      <Frac n={`${a} + ${b}`} d={`${c} − ${d}`} />,
      `(${a} + ${b})/(${c} - ${d})`,
      [`${a} + ${b}/${c} - ${d}`, `(${a} + ${b})/${c} - ${d}`],
      'Både telleren og nevneren har to ledd, så begge trenger parentes.',
    ],
    [
      <>
        {a} · {b}
        <sup>{n}</sup>
      </>,
      `${a}*${b}**${n}`,
      [`${a}*${b}^${n}`, `${a}*${b}*${n}`],
      'Potens skrives med **.',
    ],
    [
      <>
        {a},5 · {b}
      </>,
      `${a}.5*${b}`,
      [`${a},5*${b}`, `${a}.5 ${b}`],
      'Desimaltegnet er punktum, og ganging må skrives med *.',
    ],
    [
      <>
        {a}({b} + {c})
      </>,
      `${a}*(${b} + ${c})`,
      [`${a}(${b} + ${c})`, `${a}*${b} + ${c}`],
      'Gangetegnet må alltid skrives, også foran en parentes.',
    ],
    [
      <>
        (−{a})<sup>2</sup>
      </>,
      `(-${a})**2`,
      [`-${a}**2`, `-${a}*2`],
      `Uten parentes betyr -${a}**2 at bare ${a} opphøyes.`,
    ],
  ];
  const [matte, riktig, gale, hvorfor] = velg(maler);
  const { alle, fasit } = stokk(riktig, gale);
  return {
    oppgave: <span className="math">{matte}</span>,
    instruks: 'Hvilken kode regner ut uttrykket riktig?',
    valg: alle.map((k) => <Kode key={k} inline>{k}</Kode>),
    vurder: ({ valg }) => (valg === fasit ? null : 'Se etter gangetegn, potenstegn, punktum og parenteser.'),
    losning: (
      <>
        <Kode inline>{riktig}</Kode>
        <span className="mline small">{hvorfor}</span>
      </>
    ),
  };
}

function lagPrint(): Ovelse {
  const x = ri(2, 9);
  const y = ri(2, 9);
  const maler: [string, string, string[], string][] = [
    [`print('${x} + ${y}')`, `${x} + ${y}`, [`${x + y}`, `'${x} + ${y}'`], 'Med anførselstegn er det tekst, og den skrives ut som den står.'],
    [`print(${x} + ${y})`, `${x + y}`, [`${x} + ${y}`, `${x}${y}`], 'Uten anførselstegn regner Python ut svaret.'],
    [
      `print('${x} + ${y} =', ${x} + ${y})`,
      `${x} + ${y} = ${x + y}`,
      [`${x} + ${y} = ${x} + ${y}`, `${x + y} = ${x + y}`],
      'Første del er tekst, andre del regnes ut. Komma gir et mellomrom.',
    ],
    [
      `print('Svaret er', ${x} * ${y})`,
      `Svaret er ${x * y}`,
      [`Svaret er ${x} * ${y}`, `Svaret er${x * y}`],
      'Komma gir et mellomrom mellom delene, og utregningen uten anførselstegn regnes ut.',
    ],
  ];
  const [kode, riktig, gale, hvorfor] = velg(maler);
  const { alle, fasit } = stokk(riktig, gale);
  return {
    oppgave: <Kode inline>{kode}</Kode>,
    instruks: 'Hva skrives ut i konsollen?',
    valg: alle.map((k) => <code key={k} className="py-inline">{k}</code>),
    vurder: ({ valg }) => (valg === fasit ? null : 'Er det tekst eller en utregning? Se etter anførselstegnene.'),
    losning: (
      <>
        <code className="py-inline pen">{riktig}</code>
        <span className="mline small">{hvorfor}</span>
      </>
    ),
  };
}

const lag = (n: Niva) => (n === 'ut' ? lagUt() : n === 'kode' ? lagKode() : lagPrint());

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Regning og print" nivaer={NIVAER} lag={lag} />;
