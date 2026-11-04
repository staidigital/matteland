import React from 'react';
import { V, X } from '../../../../presentasjon/matte';

const A = () => <V c="a" />;
const B = () => <V c="b" />;
const C = () => <V c="c" />;
const D = () => <V c="d" />;

const RADER: { navn: string; regel: React.ReactNode; eks: React.ReactNode }[] = [
  { navn: 'Regne med bokstaver', regel: 'bare like ledd kan legges sammen', eks: <>3<X /> + 5 − <X /> = 2<X /> + 5</> },
  { navn: 'Pluss foran parentes', regel: <><A /> + (<B /> − <C />) = <A /> + <B /> − <C /></>, eks: <>3<X /> + (2<X /> − 4) = 5<X /> − 4</> },
  { navn: 'Minus foran parentes', regel: <><A /> − (<B /> − <C />) = <A /> − <B /> + <C /></>, eks: <>5<X /> − (2<X /> − 3) = 3<X /> + 3</> },
  { navn: 'Gange med parentes', regel: <><A />(<B /> + <C />) = <A /><B /> + <A /><C /></>, eks: <>3(<X /> + 2) = 3<X /> + 6</> },
  { navn: 'To parenteser', regel: <>(<A /> + <B />)(<C /> + <D />) = <A /><C /> + <A /><D /> + <B /><C /> + <B /><D /></>, eks: <>(<X /> + 3)(<X /> − 2) = <X /><sup>2</sup> + <X /> − 6</> },
  { navn: 'Faktorisere tall', regel: 'skriv tallet som et produkt av primtall', eks: <>60 = 2 · 2 · 3 · 5</> },
  { navn: 'Trekke ut felles', regel: <><A /><B /> + <A /><C /> = <A />(<B /> + <C />)</>, eks: <>6<X /><sup>2</sup> + 9<X /> = 3<X />(2<X /> + 3)</> },
];

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="grid2">
      {RADER.map((r) => (
        <div className="panel stack" key={r.navn} style={{ gap: 4 }}>
          <h3 className="pen">{r.navn}</h3>
          <span className={typeof r.regel === 'string' ? undefined : 'math'}>{r.regel}</span>
          <span className="math small muted">{r.eks}</span>
        </div>
      ))}
    </div>
    <p className="muted">Kontroller svaret ved å sette inn et tall, eller ved å gange ut igjen når du har faktorisert.</p>
  </div>
);
