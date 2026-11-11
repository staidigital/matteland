import React from 'react';
import { Poly, Rot, X, dec, minus, near } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { ri } from '../../bokstavuttrykk/oppgaver';
import { Fx, Intervall, Mengde } from '../../funksjoner/felles';
import { Eksp } from '../../eksponentialfunksjoner/felles';
import { type Eksponent, Pot, eksponent, verdi } from '../felles';

type Niva = 'type' | 'regn' | 'definisjon';

const NIVAER: [Niva, string][] = [
  ['type', 'Potens eller eksponential?'],
  ['regn', 'Regn ut'],
  ['definisjon', 'Definisjonsmengde'],
];

const velg = <T,>(arr: T[]) => arr[ri(0, arr.length - 1)];

function lagType(): Ovelse {
  const navn = velg(['f', 'g', 'h', 'P', 'V']);
  const a = velg([1, 2, 3, 0.5, 12, 250, 1200]);
  const potens = ri(0, 1) === 0;
  const b = potens ? velg<Eksponent>([2, 3, 1.5, 2.7, -1, [1, 2], [2, 3], 0.8]) : velg([2, 3, 1.5, 0.7, 1.04, 0.95]);
  return {
    oppgave: (
      <>
        <Fx f={navn} /> = {potens ? <Pot a={a} b={b} /> : <Eksp a={a} b={b as number} />}
      </>
    ),
    instruks: 'Er dette en potensfunksjon eller en eksponentialfunksjon?',
    valg: ['Potensfunksjon', 'Eksponentialfunksjon'],
    vurder: ({ valg }) =>
      (valg === 0) === potens ? null : 'Se hvor variabelen står: i grunntallet eller i eksponenten?',
    losning: potens ? (
      <>Potensfunksjon: variabelen x er grunntallet, og eksponenten {eksponent(b)} er fast.</>
    ) : (
      <>Eksponentialfunksjon: variabelen x er eksponenten, og grunntallet {dec(b as number)} er fast.</>
    ),
    side: (
      <p className="muted small">
        Potensfunksjon: <Fx /> = a · x<sup>b</sup>. Eksponentialfunksjon: <Fx /> = a · b<sup>x</sup>.
      </p>
    ),
  };
}

/** Eksponenter med x-verdier som gir pene svar */
const PENE: [Eksponent, number[]][] = [
  [[1, 2], [4, 9, 16, 25, 36, 49, 64, 81, 100]],
  [[1, 3], [8, 27, 64, 125]],
  [[3, 2], [4, 9, 16, 25]],
  [[2, 3], [8, 27, 64]],
  [-1, [2, 4, 5, 10]],
  [-2, [2, 4, 5, 10]],
  [[-1, 2], [4, 9, 16, 25, 100]],
  [3, [2, 3, 4, 5]],
];

/** Mellomregningen: x^(p/q) = (q-te rota av x)^p */
const Mellom: React.FC<{ b: Eksponent; x: number }> = ({ b, x }) => {
  if (!Array.isArray(b)) return null;
  const [p, q] = b;
  const r = Math.round(x ** (1 / q));
  return (
    <>
      {' '}
      = ({q === 2 ? <Rot>{x}</Rot> : <Rot n={q}>{x}</Rot>})<sup>{minus(p)}</sup> = {r}
      <sup>{minus(p)}</sup>
    </>
  );
};

function lagRegn(): Ovelse {
  const [b, xs] = velg(PENE);
  const x = velg(xs);
  const a = velg([1, 1, 2, 3, 5, 10]);
  const potens = x ** verdi(b);
  const svar = a * potens;
  return {
    oppgave: (
      <>
        <Fx /> = <Pot a={a} b={b} />
      </>
    ),
    instruks: (
      <>
        Regn ut <Fx x={x} /> uten kalkulator. Skriv brøk som 1/4.
      </>
    ),
    felt: [{ navn: `f(${x})`, foran: <><Fx x={x} /> =</> }],
    vurder: ({ tall: [v] }) => {
      if (near(v, svar)) return null;
      if (near(v, potens) && a !== 1) return `Riktig potens, men husk å gange med ${a}.`;
      if (near(v, a * x * verdi(b))) return 'Eksponenten betyr ikke at du skal gange med den.';
      if (verdi(b) < 0 && near(v, -svar)) return 'Negativ eksponent gir ikke et negativt svar, men 1 delt på potensen.';
      return Array.isArray(b)
        ? `Brøk i eksponenten betyr rot: x^(${eksponent(b)}) = (${b[1]}. rota av x)^${minus(b[0])}.`
        : 'Regn ut potensen først, og gang så med a.';
    },
    losning: (
      <>
        <Fx x={x} /> = {a !== 1 && <>{a} · </>}
        {x}
        <sup>{eksponent(b)}</sup>
        {a === 1 && <Mellom b={b} x={x} />} = <span className="pen">{dec(svar, 4)}</span>
      </>
    ),
    side: (
      <p className="muted small">
        Husk: <X />
        <sup>1/n</sup> er n-te rota av <X />, og <X />
        <sup>−n</sup> = 1 / <X />
        <sup>n</sup>.
      </p>
    ),
  };
}

function lagDefinisjon(): Ovelse {
  const k = ri(-5, 5);
  const type = velg(['opp', 'opp', 'ned', 'tredje'] as const);
  if (type === 'tredje') {
    const p = velg([1, 2, 3]);
    return {
      oppgave: (
        <>
          <Fx /> ={' '}
          <Rot n={3}>
            <Poly a={0} b={p} c={-p * k} />
          </Rot>
        </>
      ),
      instruks: 'Hva er definisjonsmengden?',
      valg: [<>alle reelle tall</>, <><X /> ≥ {minus(k)}</>, <><X /> ≤ {minus(k)}</>],
      vurder: ({ valg }) => (valg === 0 ? null : 'Kan vi ta tredjerota av et negativt tall? Prøv ∛(−8).'),
      losning: (
        <>
          Tredjerota finnes for alle tall, så <Mengde m="D" /> = ℝ.
        </>
      ),
    };
  }
  const p = type === 'opp' ? velg([1, 2, 3]) : -velg([1, 2]);
  return {
    oppgave: (
      <>
        <Fx /> ={' '}
        <Rot>
          <Poly a={0} b={p} c={-p * k} />
        </Rot>
      </>
    ),
    instruks: 'Hvilke x-verdier er funksjonen definert for? Velg tegn og skriv grensen.',
    valg: [<><X /> ≥</>, <><X /> ≤</>, <>alle reelle tall</>],
    felt: [{ navn: 'Grense', foran: 'grense:' }],
    vurder: ({ valg, tall: [v] }) => {
      if (valg === 2) return 'Kvadratrota av et negativt tall finnes ikke. Uttrykket under rottegnet må være ≥ 0.';
      if (!near(v, k)) return 'Løs ulikheten: uttrykket under rottegnet ≥ 0.';
      if ((valg === 0) !== p > 0) return 'Grensen er riktig. Prøv en x-verdi på hver side og se hvor uttrykket blir negativt.';
      return null;
    },
    losning: (
      <>
        <span className="mline">
          <Poly a={0} b={p} c={-p * k} /> ≥ 0 &nbsp;⇒&nbsp; <X /> {p > 0 ? '≥' : '≤'} {minus(k)}
        </span>
        <span className="mline pen">
          <Mengde m="D" /> ={' '}
          {p > 0 ? <Intervall a={k} b={Infinity} /> : <span className="nw">⟨← , {minus(k)}]</span>}
        </span>
      </>
    ),
  };
}

function lag(niva: Niva): Ovelse {
  if (niva === 'type') return lagType();
  if (niva === 'regn') return lagRegn();
  return lagDefinisjon();
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Potens- og rotfunksjoner" nivaer={NIVAER} lag={lag} />;
