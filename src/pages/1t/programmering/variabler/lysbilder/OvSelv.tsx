import React from 'react';
import { near } from '../../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../../presentasjon/ovelser';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { ri } from '../../../bokstavuttrykk/oppgaver';

type Niva = 'verdi' | 'type' | 'ut';

const NIVAER: [Niva, string][] = [
  ['verdi', 'Hva er verdien?'],
  ['type', 'Hvilken type?'],
  ['ut', 'Hva skrives ut?'],
];

const velg = <T,>(arr: T[]) => arr[ri(0, arr.length - 1)];

function stokk(riktig: string, gale: string[]) {
  const alle = [riktig, ...gale].sort(() => Math.random() - 0.5);
  return { alle, fasit: alle.indexOf(riktig) };
}

const Program: React.FC<{ kode: string }> = ({ kode }) => (
  <span style={{ display: 'block', fontSize: '0.8em', minWidth: '14em' }}>
    <Kode>{kode}</Kode>
  </span>
);

function lagVerdi(): Ovelse {
  const a = ri(2, 9);
  const b = ri(2, 9);
  const c = ri(2, 5);
  const maler: [string, string, number, string][] = [
    [
      `x = ${a}\ny = x + ${b}\nx = ${a + 10}`,
      'y',
      a + b,
      `y ble regnet ut mens x var ${a}. At x endres etterpå, påvirker ikke y.`,
    ],
    [`x = ${a}\nx = x + ${b}\nx = x * ${c}`, 'x', (a + b) * c, `x blir ${a}, så ${a + b}, så ${(a + b) * c}.`],
    [`a = ${a}\nb = ${b}\na = b\nb = ${c}`, 'a', b, `a får verdien b har i linje 3, altså ${b}.`],
    [`x = ${a}\ny = 2 * x\nx = y - ${b}`, 'x', 2 * a - b, `y blir ${2 * a}, og x blir ${2 * a} − ${b} = ${2 * a - b}.`],
    [
      `n = ${a}\nn = n - 1\nn = n * n`,
      'n',
      (a - 1) ** 2,
      `n blir ${a - 1}, og så ${a - 1} · ${a - 1} = ${(a - 1) ** 2}.`,
    ],
  ];
  const [kode, navn, svar, hvorfor] = velg(maler);
  return {
    oppgave: <Program kode={kode} />,
    instruks: (
      <>
        Hva er verdien av <code>{navn}</code> når programmet er ferdig?
      </>
    ),
    felt: [{ navn: 'Svar', foran: <code>{navn} =</code> }],
    vurder: ({ tall }) => (near(tall[0], svar) ? null : 'Gå gjennom programmet linje for linje, og skriv opp verdiene.'),
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

const TYPEVALG = ['heltall (int)', 'desimaltall (float)', 'tekst (str)', 'feilmelding'];

function lagType(): Ovelse {
  const a = ri(2, 9);
  const b = ri(2, 9);
  const maler: [string, number, string][] = [
    [`${a} + ${b}`, 0, 'Heltall pluss heltall gir heltall.'],
    [`${a * b} / ${b}`, 1, 'Divisjon med / gir alltid desimaltall, også når svaret er helt.'],
    [`${a}.5 * 2`, 1, 'Når et desimaltall er med, blir svaret et desimaltall.'],
    [`'${a}' + '${b}'`, 2, `Tekst pluss tekst setter tekstene sammen: '${a}${b}'.`],
    [`'${a}' + ${b}`, 3, 'Tekst og tall kan ikke legges sammen. Det gir TypeError.'],
    [`int('${a}') * ${b}`, 0, `int( ) gjør teksten om til heltallet ${a}.`],
    [`float('${a}')`, 1, `float( ) gjør teksten om til desimaltallet ${a}.0.`],
    [`str(${a} + ${b})`, 2, `Først regnes ${a} + ${b} = ${a + b} ut, så blir det gjort om til tekst.`],
    [`input('Tall: ')`, 2, 'input( ) gir alltid tekst, også når brukeren skriver et tall.'],
  ];
  const [uttrykk, fasit, hvorfor] = velg(maler);
  return {
    oppgave: <Kode inline>{`svar = ${uttrykk}`}</Kode>,
    instruks: 'Hvilken type får svar? Eller gir linja feilmelding?',
    valg: TYPEVALG,
    vurder: ({ valg }) => (valg === fasit ? null : 'Se etter anførselstegn, desimaltall og divisjon.'),
    losning: (
      <>
        <b>{TYPEVALG[fasit]}</b>
        <span className="mline small">{hvorfor}</span>
      </>
    ),
  };
}

function lagUt(): Ovelse {
  const x = ri(2, 9);
  const y = ri(2, 9);
  const maler: [string, string, string[], string][] = [
    [`a = '${x}'\nb = '${y}'\nprint(a + b)`, `${x}${y}`, [`${x + y}`, `${x} + ${y}`], 'a og b er tekst, så + setter dem sammen.'],
    [`a = ${x}\nb = ${y}\nprint(a + b)`, `${x + y}`, [`${x}${y}`, 'a + b'], 'a og b er tall, så + legger dem sammen.'],
    [`x = ${x}\nprint('x')`, 'x', [`${x}`, `'x'`], 'Med anførselstegn er det tekst, og ordet x skrives ut.'],
    [`x = ${x}\nprint('x =', x)`, `x = ${x}`, [`${x} = ${x}`, 'x = x'], 'Teksten skrives som den står, og x byttes ut med verdien.'],
    [
      `a = ${x}\nb = ${y}\nprint(f'{a} * {b} = {a*b}')`,
      `${x} * ${y} = ${x * y}`,
      [`a * b = ${x * y}`, `${x} * ${y} = a*b`],
      'I en f-streng byttes alt mellom { } ut med verdien.',
    ],
  ];
  const [kode, riktig, gale, hvorfor] = velg(maler);
  const { alle, fasit } = stokk(riktig, gale);
  return {
    oppgave: <Program kode={kode} />,
    instruks: 'Hva skrives ut i konsollen?',
    valg: alle.map((k) => (
      <code key={k} className="py-inline">
        {k}
      </code>
    )),
    vurder: ({ valg }) => (valg === fasit ? null : 'Er det tekst eller tall? Se etter anførselstegnene.'),
    losning: (
      <>
        <code className="py-inline pen">{riktig}</code>
        <span className="mline small">{hvorfor}</span>
      </>
    ),
  };
}

const lag = (n: Niva) => (n === 'verdi' ? lagVerdi() : n === 'type' ? lagType() : lagUt());

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Variabler" nivaer={NIVAER} lag={lag} />;
