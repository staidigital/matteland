import React from 'react';
import { OvSelvRamme, type Ovelse } from '../../../../../presentasjon/ovelser';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { ri } from '../../../bokstavuttrykk/oppgaver';

type Niva = 'range' | 'sum' | 'while';

const NIVAER: [Niva, string][] = [
  ['range', 'range'],
  ['sum', 'Summer og tell'],
  ['while', 'while'],
];

const velg = <T,>(arr: T[]) => arr[ri(0, arr.length - 1)];

const Program: React.FC<{ kode: string }> = ({ kode }) => (
  <span style={{ display: 'block', fontSize: '0.8em', minWidth: '14em' }}>
    <Kode>{kode}</Kode>
  </span>
);

/** Tallene range(start, stopp, steg) gir, for positivt steg */
const tallene = (start: number, stopp: number, steg: number) => {
  const ut: number[] = [];
  for (let i = start; i < stopp; i += steg) ut.push(i);
  return ut;
};

function lagRange(): Ovelse {
  const start = ri(0, 5);
  const steg = velg([1, 1, 2, 3, 5]);
  const stopp = start + ri(3, 12);
  const t = tallene(start, stopp, steg);
  const kode = steg === 1 ? (start === 0 ? `range(${stopp})` : `range(${start}, ${stopp})`) : `range(${start}, ${stopp}, ${steg})`;
  const sporAntall = ri(0, 1) === 0;
  const svar = sporAntall ? t.length : t[t.length - 1];
  return {
    oppgave: <Program kode={`for i in ${kode}:\n    print(i)`} />,
    instruks: sporAntall ? 'Hvor mange tall skrives ut?' : 'Hva er det siste tallet som skrives ut?',
    felt: [{ navn: 'Svar' }],
    vurder: ({ tall }) => (tall[0] === svar ? null : 'Skriv opp tallene. Husk at stopp-verdien ikke er med.'),
    losning: (
      <>
        <code className="py-inline pen">{t.join(', ')}</code>
        <span className="mline small">
          {t.length} tall. Stopp-verdien {stopp} er ikke med.
        </span>
      </>
    ),
  };
}

function lagSum(): Ovelse {
  const n = ri(3, 6);
  const c = ri(2, 9);
  const d = ri(2, 5);
  const N = ri(10, 25);
  const maler: [string, string, number, string][] = [
    [`s = 0\nfor i in range(1, ${n + 1}):\n    s = s + i`, 's', (n * (n + 1)) / 2, `s = 1 + 2 + … + ${n}.`],
    [`s = 0\nfor i in range(${n}):\n    s = s + ${c}`, 's', n * c, `Løkka går ${n} runder og legger til ${c} hver gang.`],
    [`p = 1\nfor i in range(${n}):\n    p = p * 2`, 'p', 2 ** n, `p dobles ${n} ganger: 2^${n}.`],
    [
      `s = 0\nfor i in range(1, ${2 * n + 1}):\n    if i % 2 == 0:\n        s = s + i`,
      's',
      n * (n + 1),
      `Bare partallene legges til: 2 + 4 + … + ${2 * n}.`,
    ],
    [
      `antall = 0\nfor i in range(1, ${N}):\n    if i % ${d} == 0:\n        antall = antall + 1`,
      'antall',
      Math.floor((N - 1) / d),
      `Teller tallene fra 1 til ${N - 1} som er delelige med ${d}.`,
    ],
  ];
  const [kode, navn, svar, hvorfor] = velg(maler);
  return {
    oppgave: <Program kode={kode} />,
    instruks: (
      <>
        Hva er verdien av <code>{navn}</code> når løkka er ferdig?
      </>
    ),
    felt: [{ navn: 'Svar', foran: <code>{navn} =</code> }],
    vurder: ({ tall }) => (tall[0] === svar ? null : 'Lag en tabell med én rad per runde, og skriv opp verdien.'),
    losning: (
      <>
        <code className="py-inline pen">
          {navn} = {svar}
        </code>
        <span className="mline small">{hvorfor}</span>
      </>
    ),
  };
}

function lagWhile(): Ovelse {
  const dobbel = ri(0, 1) === 0;
  const start = dobbel ? ri(1, 5) : ri(0, 10);
  const steg = dobbel ? 2 : ri(3, 8);
  const grense = start + ri(15, 40);
  let n = start;
  let runder = 0;
  while (n < grense) {
    n = dobbel ? n * steg : n + steg;
    runder++;
  }
  const oppdatering = dobbel ? `n = n * ${steg}` : `n = n + ${steg}`;
  const sporRunder = ri(0, 1) === 0;
  return {
    oppgave: <Program kode={`n = ${start}\nrunder = 0\nwhile n < ${grense}:\n    ${oppdatering}\n    runder = runder + 1`} />,
    instruks: sporRunder ? 'Hvor mange runder går løkka?' : 'Hva er n når løkka er ferdig?',
    felt: [{ navn: 'Svar', foran: <code>{sporRunder ? 'runder' : 'n'} =</code> }],
    vurder: ({ tall }) =>
      tall[0] === (sporRunder ? runder : n) ? null : 'Skriv opp n etter hver runde, og sjekk vilkåret før neste.',
    losning: (
      <>
        <code className="py-inline pen">
          runder = {runder}, n = {n}
        </code>
        <span className="mline small">
          n blir{' '}
          {Array.from({ length: runder + 1 }, (_, k) => (dobbel ? start * steg ** k : start + steg * k)).join(', ')}. Når n er{' '}
          {n}, er <code>n &lt; {grense}</code> usant.
        </span>
      </>
    ),
  };
}

const lag = (n: Niva) => (n === 'range' ? lagRange() : n === 'sum' ? lagSum() : lagWhile());

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Løkker" nivaer={NIVAER} lag={lag} />;
