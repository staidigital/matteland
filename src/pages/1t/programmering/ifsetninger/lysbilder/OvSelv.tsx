import React from 'react';
import { OvSelvRamme, type Ovelse } from '../../../../../presentasjon/ovelser';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { ri } from '../../../bokstavuttrykk/oppgaver';

type Niva = 'rest' | 'sant' | 'ut';

const NIVAER: [Niva, string][] = [
  ['rest', 'Rest og //'],
  ['sant', 'True eller False?'],
  ['ut', 'Hva skrives ut?'],
];

const velg = <T,>(arr: T[]) => arr[ri(0, arr.length - 1)];

const Program: React.FC<{ kode: string }> = ({ kode }) => (
  <span style={{ display: 'block', fontSize: '0.8em', minWidth: '14em' }}>
    <Kode>{kode}</Kode>
  </span>
);

function lagRest(): Ovelse {
  const b = ri(2, 9);
  const a = ri(10, 60);
  const q = Math.floor(a / b);
  const r = a % b;
  const erRest = ri(0, 1) === 0;
  const svar = erRest ? r : q;
  return {
    oppgave: <Kode inline>{`print(${a} ${erRest ? '%' : '//'} ${b})`}</Kode>,
    instruks: erRest ? 'Hva er resten?' : 'Hvor mange hele ganger går det opp?',
    felt: [{ navn: 'Svar' }],
    vurder: ({ tall }) =>
      tall[0] === svar ? null : `Hvor mange ganger går ${b} opp i ${a}, og hvor mye blir til overs?`,
    losning: (
      <>
        <span className="mline">
          {a} = {b} · <span className="c1">{q}</span> + <span className="pen">{r}</span>
        </span>
        <span className="mline small">
          {a} // {b} = {q} &nbsp;og&nbsp; {a} % {b} = {r}
        </span>
      </>
    ),
  };
}

function lagSant(): Ovelse {
  const n = ri(2, 30);
  const d = ri(2, 6);
  const m = ri(2, 30);
  const maler: [string, boolean, string][] = [
    [`n % ${d} == 0`, n % d === 0, `${n} % ${d} = ${n % d}.`],
    [`n % 2 == 1`, n % 2 === 1, `${n} % 2 = ${n % 2}.`],
    [`n > ${m} and n % 2 == 0`, n > m && n % 2 === 0, `${n} > ${m} er ${n > m ? 'sant' : 'usant'}, og ${n} er ${n % 2 === 0 ? 'et partall' : 'et oddetall'}. and krever at begge er sanne.`],
    [`n < ${m} or n % ${d} == 0`, n < m || n % d === 0, `${n} < ${m} er ${n < m ? 'sant' : 'usant'}, og ${n} % ${d} = ${n % d}. or holder med én.`],
    [`not n == ${m}`, n !== m, `${n} == ${m} er ${n === m ? 'sant' : 'usant'}, og not snur det.`],
    [`10 <= n <= 20`, n >= 10 && n <= 20, `Er ${n} mellom 10 og 20, med grensene?`],
    [`n != ${m}`, n !== m, `!= betyr «er ikke lik».`],
  ];
  const [uttrykk, svar, hvorfor] = velg(maler);
  return {
    oppgave: <Program kode={`n = ${n}\nprint(${uttrykk})`} />,
    instruks: 'Hva skriver programmet ut?',
    valg: ['True', 'False'].map((v) => (
      <code key={v} className="py-inline">
        {v}
      </code>
    )),
    vurder: ({ valg }) => (valg === (svar ? 0 : 1) ? null : 'Regn ut hver del for seg, og sett sammen til slutt.'),
    losning: (
      <>
        <code className="py-inline pen">{svar ? 'True' : 'False'}</code>
        <span className="mline small">{hvorfor}</span>
      </>
    ),
  };
}

function lagUt(): Ovelse {
  const n = ri(1, 40);
  const maler: [string, number, string][] = [
    [
      `if n % 2 == 0:\n    print('A')\nelse:\n    print('B')`,
      n % 2 === 0 ? 0 : 1,
      `${n} % 2 = ${n % 2}, så ${n} er ${n % 2 === 0 ? 'et partall' : 'et oddetall'}.`,
    ],
    [
      `if n > 30:\n    print('A')\nelif n > 15:\n    print('B')\nelse:\n    print('C')`,
      n > 30 ? 0 : n > 15 ? 1 : 2,
      'Python kjører bare den første delen som er sann.',
    ],
    [
      `if n % 3 == 0:\n    print('A')\nelif n % 2 == 0:\n    print('B')\nelse:\n    print('C')`,
      n % 3 === 0 ? 0 : n % 2 === 0 ? 1 : 2,
      `${n} % 3 = ${n % 3} og ${n} % 2 = ${n % 2}. Den første sanne delen vinner.`,
    ],
    [
      `if n >= 10 and n % 5 == 0:\n    print('A')\nelif n < 10 or n % 2 == 0:\n    print('B')\nelse:\n    print('C')`,
      n >= 10 && n % 5 === 0 ? 0 : n < 10 || n % 2 === 0 ? 1 : 2,
      'and krever begge vilkårene, or holder med ett.',
    ],
  ];
  const [kode, fasit, hvorfor] = velg(maler);
  const valg = kode.includes('C') ? ['A', 'B', 'C'] : ['A', 'B'];
  return {
    oppgave: <Program kode={`n = ${n}\n${kode}`} />,
    instruks: 'Hva skriver programmet ut?',
    valg: valg.map((v) => (
      <code key={v} className="py-inline">
        {v}
      </code>
    )),
    vurder: ({ valg: v }) => (v === fasit ? null : 'Sjekk vilkårene ovenfra og ned, og stopp ved det første som er sant.'),
    losning: (
      <>
        <code className="py-inline pen">{valg[fasit]}</code>
        <span className="mline small">{hvorfor}</span>
      </>
    ),
  };
}

const lag = (n: Niva) => (n === 'rest' ? lagRest() : n === 'sant' ? lagSant() : lagUt());

export const OvSelv: React.FC = () => <OvSelvRamme tittel="If-setninger og modulo" nivaer={NIVAER} lag={lag} />;
