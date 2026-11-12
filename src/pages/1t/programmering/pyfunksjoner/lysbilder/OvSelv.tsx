import React from 'react';
import { OvSelvRamme, type Ovelse } from '../../../../../presentasjon/ovelser';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { ri, riUtenNull } from '../../../bokstavuttrykk/oppgaver';

type Niva = 'verdi' | 'sammen' | 'return';

const NIVAER: [Niva, string][] = [
  ['verdi', 'Funksjonsverdi'],
  ['sammen', 'Flere kall'],
  ['return', 'return eller print?'],
];

const velg = <T,>(arr: T[]) => arr[ri(0, arr.length - 1)];

const Program: React.FC<{ kode: string }> = ({ kode }) => (
  <span style={{ display: 'block', fontSize: '0.8em', minWidth: '14em' }}>
    <Kode>{kode}</Kode>
  </span>
);

/** Ledd med fortegn, f.eks. «+ 3» eller «- 2» */
const ledd = (k: number, x = '') => (k < 0 ? ` - ${-k}${x}` : ` + ${k}${x}`);

function lagVerdi(): Ovelse {
  const a = riUtenNull(-3, 3);
  const b = ri(-5, 5);
  const c = ri(-6, 6);
  const x = ri(-3, 4);
  const andregrad = ri(0, 1) === 0;
  const uttrykk = andregrad
    ? `${a === 1 ? '' : a === -1 ? '-' : a + '*'}x**2${b ? ledd(b, '*x') : ''}${c ? ledd(c) : ''}`
    : `${a === 1 ? '' : a === -1 ? '-' : a + '*'}x${c ? ledd(c) : ''}`;
  const svar = andregrad ? a * x * x + b * x + c : a * x + c;
  return {
    oppgave: <Program kode={`def f(x):\n    return ${uttrykk}\n\nprint(f(${x}))`} />,
    instruks: 'Hva skriver programmet ut?',
    felt: [{ navn: 'Svar' }],
    vurder: ({ tall }) => (tall[0] === svar ? null : `Sett inn x = ${x} i uttrykket. Husk at potens regnes før ganging.`),
    losning: (
      <>
        <code className="py-inline pen">{svar}</code>
        <span className="mline small">
          x = {x} settes inn: {uttrykk.replaceAll('x', `(${x})`)} = {svar}
        </span>
      </>
    ),
  };
}

function lagSammen(): Ovelse {
  const a = ri(2, 4);
  const b = ri(1, 5);
  const p = ri(0, 3);
  const q = ri(1, 3);
  const g = (x: number) => a * x + b;
  const h = (x: number) => x * x;
  const maler: [string, number, string][] = [
    [`print(g(${p}) + g(${q}))`, g(p) + g(q), `g(${p}) = ${g(p)} og g(${q}) = ${g(q)}.`],
    [`print(g(h(${q})))`, g(h(q)), `Innerst først: h(${q}) = ${h(q)}, så g(${h(q)}) = ${g(h(q))}.`],
    [`print(h(g(${p})))`, h(g(p)), `Innerst først: g(${p}) = ${g(p)}, så h(${g(p)}) = ${h(g(p))}.`],
    [`y = g(${p})\nprint(h(y) - y)`, h(g(p)) - g(p), `y = ${g(p)}, og h(y) − y = ${h(g(p))} − ${g(p)}.`],
  ];
  const [kall, svar, hvorfor] = velg(maler);
  return {
    oppgave: <Program kode={`def g(x):\n    return ${a}*x + ${b}\n\ndef h(x):\n    return x**2\n\n${kall}`} />,
    instruks: 'Hva skriver programmet ut?',
    felt: [{ navn: 'Svar' }],
    vurder: ({ tall }) => (tall[0] === svar ? null : 'Regn ut ett funksjonskall om gangen, innerst først.'),
    losning: (
      <>
        <code className="py-inline pen">{svar}</code>
        <span className="mline small">{hvorfor}</span>
      </>
    ),
  };
}

const VALG = ['bare tallet', 'bare None', 'tallet og så None', 'feilmelding'];

function lagReturn(): Ovelse {
  const k = ri(2, 9);
  const x = ri(2, 6);
  const maler: [string, number, string][] = [
    [`def f(x):\n    return ${k}*x\n\nprint(f(${x}))`, 0, `f gir tilbake ${k * x}, og print skriver det ut.`],
    [
      `def f(x):\n    print(${k}*x)\n\nf(${x})`,
      0,
      `print inne i funksjonen skriver ${k * x}. Svaret fra f blir ikke brukt.`,
    ],
    [
      `def f(x):\n    print(${k}*x)\n\nprint(f(${x}))`,
      2,
      `Først skriver funksjonen ${k * x}. Så skriver den ytre print ut det funksjonen gir tilbake, som er None.`,
    ],
    [`def f(x):\n    ${k}*x\n\nprint(f(${x}))`, 1, 'Funksjonen regner ut, men har verken print eller return. Den gir None.'],
    [
      `def f(x):\n    y = ${k}*x\n    return y\n\nf(${x})\nprint(y)`,
      3,
      'y finnes bare inne i funksjonen. Utenfor gir den NameError.',
    ],
  ];
  const [kode, fasit, hvorfor] = velg(maler);
  return {
    oppgave: <Program kode={kode} />,
    instruks: 'Hva skrives ut?',
    valg: VALG,
    vurder: ({ valg }) => (valg === fasit ? null : 'Skiller du mellom print (vis) og return (send tilbake)?'),
    losning: (
      <>
        <b>{VALG[fasit]}</b>
        <span className="mline small">{hvorfor}</span>
      </>
    ),
  };
}

const lag = (n: Niva) => (n === 'verdi' ? lagVerdi() : n === 'sammen' ? lagSammen() : lagReturn());

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Funksjoner" nivaer={NIVAER} lag={lag} />;
