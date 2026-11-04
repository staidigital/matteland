import React from 'react';
import { Link } from 'react-router-dom';
import '../../../presentasjon/fonter.css';
import '../../../presentasjon/presentasjon.css';
import './formler.css';
import { ABC, FactorForm, Frac, Gen, V, X, X1, X2 } from '../../../presentasjon/matte';

const A = () => <V c="a" />;
const B = () => <V c="b" />;
const C = () => <V c="c" />;
const Y = () => <V c="y" />;
const F = () => <V c="f" />;

const Sub: React.FC<{ c: string; n: string }> = ({ c, n }) => (
  <span className="nw">
    <V c={c} />
    <sub>{n}</sub>
  </span>
);
const Fx: React.FC<{ av?: React.ReactNode }> = ({ av = <X /> }) => (
  <span className="nw">
    <F />({av})
  </span>
);
const Fd: React.FC<{ av?: React.ReactNode }> = ({ av = <X /> }) => (
  <span className="nw">
    <F />′({av})
  </span>
);
const Rot: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="nw">
    √<span className="rad">{children}</span>
  </span>
);

type Rad = { navn: React.ReactNode; formel: React.ReactNode };

const RettvinkletFigur = () => (
  <svg className="figur" viewBox="0 0 180 120" role="img" aria-label="Rettvinklet trekant med katetene a og b, hypotenusen c og vinkelen v mellom b og c">
    <path d="M20 100 H150 V25 Z" />
    <path d="M138 100 V88 H150" />
    <path d="M48 100 A28 28 0 0 0 44.2 86" />
    <text x="54" y="96">v</text>
    <text x="80" y="116">b</text>
    <text x="157" y="67">a</text>
    <text x="72" y="54">c</text>
  </svg>
);

const TrekantFigur = () => (
  <svg className="figur" viewBox="0 0 190 130" role="img" aria-label="Vilkårlig trekant med hjørnene A, B og C og sidene a, b og c rett overfor hjørnet med samme bokstav">
    <path d="M20 105 H170 L65 20 Z" />
    <text className="hjorne" x="6" y="112">A</text>
    <text className="hjorne" x="174" y="112">B</text>
    <text className="hjorne" x="60" y="14">C</text>
    <text x="92" y="122">c</text>
    <text x="124" y="58">a</text>
    <text x="30" y="60">b</text>
  </svg>
);

const SinV = () => <span className="nw">sin <V c="v" /></span>;
const CosV = () => <span className="nw">cos <V c="v" /></span>;
const TanV = () => <span className="nw">tan <V c="v" /></span>;

const ALGEBRA: Rad[] = [
  { navn: '1. kvadratsetning', formel: <>(<A /> + <B />)<sup>2</sup> = <A /><sup>2</sup> + 2<A /><B /> + <B /><sup>2</sup></> },
  { navn: '2. kvadratsetning', formel: <>(<A /> − <B />)<sup>2</sup> = <A /><sup>2</sup> − 2<A /><B /> + <B /><sup>2</sup></> },
  { navn: 'Konjugatsetningen', formel: <>(<A /> + <B />)(<A /> − <B />) = <A /><sup>2</sup> − <B /><sup>2</sup></> },
  { navn: 'Nullproduktregelen', formel: <><A /> · <B /> = 0 &nbsp;⇒&nbsp; <A /> = 0 eller <B /> = 0</> },
];

const POTENSER: Rad[] = [
  { navn: 'Gange', formel: <><A /><sup><V c="m" /></sup> · <A /><sup><V c="n" /></sup> = <A /><sup><V c="m" /> + <V c="n" /></sup></> },
  { navn: 'Dele', formel: <><Frac n={<><A /><sup><V c="m" /></sup></>} d={<><A /><sup><V c="n" /></sup></>} /> = <A /><sup><V c="m" /> − <V c="n" /></sup></> },
  { navn: 'Potens av potens', formel: <>(<A /><sup><V c="m" /></sup>)<sup><V c="n" /></sup> = <A /><sup><V c="m" /> · <V c="n" /></sup></> },
  { navn: 'Potens av produkt', formel: <>(<A /><B />)<sup><V c="n" /></sup> = <A /><sup><V c="n" /></sup><B /><sup><V c="n" /></sup></> },
  { navn: 'Potens av brøk', formel: <>(<Frac n={<A />} d={<B />} />)<sup><V c="n" /></sup> = <Frac n={<><A /><sup><V c="n" /></sup></>} d={<><B /><sup><V c="n" /></sup></>} /></> },
  { navn: 'Eksponent 0', formel: <><A /><sup>0</sup> = 1</> },
  { navn: 'Negativ eksponent', formel: <><A /><sup>−<V c="n" /></sup> = <Frac n="1" d={<><A /><sup><V c="n" /></sup></>} /></> },
  { navn: 'Brøk som eksponent', formel: <><A /><sup>1/<V c="n" /></sup> = <sup><V c="n" /></sup><Rot><A /></Rot></> },
  { navn: 'Røtter', formel: <><Rot><A /><B /></Rot> = <Rot><A /></Rot> · <Rot><B /></Rot></> },
];

const ABC_FORMEL: Rad[] = [
  { navn: <>abc-formelen, for <span className="nw"><Gen /> = 0</span></>, formel: <ABC /> },
];

const ANDREGRAD: Rad[] = [
  { navn: <>Nullpunktsform, med nullpunkter <X1 /> og <X2 /></>, formel: <><Gen /> = <FactorForm /></> },
  { navn: 'Symmetrilinje', formel: <><X /> = −<Frac n={<B />} d={<>2<A /></>} /></> },
  { navn: 'Topp- eller bunnpunkt for andregradspolynomer', formel: <>(<Sub c="x" n="s" /> , <Fx av={<Sub c="x" n="s" />} />)</> },
];

const LINJER: Rad[] = [
  { navn: 'Lineær funksjon', formel: <><Y /> = <A /><X /> + <B /></> },
  { navn: 'Stigningstall', formel: <><A /> = <Frac n={<>Δ<Y /></>} d={<>Δ<X /></>} /> = <Frac n={<><Sub c="y" n="2" /> − <Sub c="y" n="1" /></>} d={<><Sub c="x" n="2" /> − <Sub c="x" n="1" /></>} /></> },
  { navn: 'Ettpunktsformelen', formel: <><Y /> − <Sub c="y" n="0" /> = <A />(<X /> − <Sub c="x" n="0" />)</> },
];

const VEKST: Rad[] = [
  { navn: <>Gjennomsnittlig vekstfart fra <Sub c="x" n="1" /> til <Sub c="x" n="2" /></>, formel: <Frac n={<><Fx av={<Sub c="x" n="2" />} /> − <Fx av={<Sub c="x" n="1" />} /></>} d={<><Sub c="x" n="2" /> − <Sub c="x" n="1" /></>} /> },
  {
    navn: <>Den deriverte <Fd /></>,
    formel: (
      <>
        <Frac n={<><Fx av={<><X /> + Δ<X /></>} /> − <Fx /></>} d={<>Δ<X /></>} />
        <span className="tekst"> når Δ<X /> går mot 0</span>
      </>
    ),
  },
  { navn: 'Konstant', formel: <>(<C />)′ = 0</> },
  { navn: 'Potens', formel: <>(<X /><sup><V c="n" /></sup>)′ = <V c="n" /><X /><sup><V c="n" /> − 1</sup></> },
  { navn: 'Konstant ganger funksjon', formel: <>(<C /> · <Fx />)′ = <C /> · <Fd /></> },
  { navn: 'Sum', formel: <>(<F /> + <V c="g" />)′ = <F />′ + <V c="g" />′</> },
  { navn: <>Tangenten i <X /> = <Sub c="x" n="0" /></>, formel: <><Y /> − <Fx av={<Sub c="x" n="0" />} /> = <Fd av={<Sub c="x" n="0" />} />(<X /> − <Sub c="x" n="0" />)</> },
  { navn: 'Topp- eller bunnpunkt', formel: <><Fd /> = 0 og fortegnsskifte</> },
];

const VEKSTFAKTOR: Rad[] = [
  { navn: 'Eksponentialfunksjon', formel: <><Fx /> = <A /> · <B /><sup><X /></sup></> },
  { navn: <>Vekstfaktor, økning på <V c="p" /> %</>, formel: <>1 + <Frac n={<V c="p" />} d="100" /></> },
  { navn: <>Vekstfaktor, nedgang på <V c="p" /> %</>, formel: <>1 − <Frac n={<V c="p" />} d="100" /></> },
  { navn: 'Potensfunksjon', formel: <><Fx /> = <A /> · <X /><sup><B /></sup></> },
];

const GEOMETRI: Rad[] = [
  { navn: 'Areal av trekant', formel: <><V c="T" /> = <Frac n={<><V c="g" /> · <V c="h" /></>} d="2" /></> },
  { navn: 'Omkrets av sirkel', formel: <><V c="O" /> = 2π<V c="r" /></> },
  { navn: 'Areal av sirkel', formel: <><V c="T" /> = π<V c="r" /><sup>2</sup></> },
];

const RETTVINKLET: Rad[] = [
  { navn: 'Pytagoras', formel: <><A /><sup>2</sup> + <B /><sup>2</sup> = <C /><sup>2</sup></> },
  { navn: 'Sinus', formel: <><SinV /> = <Frac n={<A />} d={<C />} /></> },
  { navn: 'Cosinus', formel: <><CosV /> = <Frac n={<B />} d={<C />} /></> },
  { navn: 'Tangens', formel: <><TanV /> = <Frac n={<A />} d={<B />} /></> },
];

const VILKARLIG: Rad[] = [
  { navn: 'Sinussetningen', formel: <><Frac n={<>sin <V c="A" /></>} d={<A />} /> = <Frac n={<>sin <V c="B" /></>} d={<B />} /> = <Frac n={<>sin <V c="C" /></>} d={<C />} /></> },
  { navn: 'Cosinussetningen', formel: <><A /><sup>2</sup> = <B /><sup>2</sup> + <C /><sup>2</sup> − 2<B /><C /> · cos <V c="A" /></> },
  { navn: 'Arealsetningen', formel: <><V c="T" /> = <Frac n="1" d="2" /><B /><C /> · sin <V c="A" /></> },
  { navn: 'Stumpe vinkler', formel: <>sin(180° − <V c="v" />) = <SinV /></> },
  { navn: '', formel: <>cos(180° − <V c="v" />) = −<CosV /></> },
];

const Rader: React.FC<{ rader: Rad[] }> = ({ rader }) => (
  <dl className="rader">
    {rader.map((rad, i) => (
      <div key={i} className="rad-linje">
        <dt>{rad.navn}</dt>
        <dd className="math">{rad.formel}</dd>
      </div>
    ))}
  </dl>
);

const Blokk: React.FC<{ tittel: string; children: React.ReactNode }> = ({ tittel, children }) => (
  <section className="blokk">
    <h2>{tittel}</h2>
    {children}
  </section>
);

export default function Formler() {
  return (
    <div className="presentasjon formler">
      <div className="ark">
        <header className="topp">
          <div>
            <div className="kicker">Matematikk 1T</div>
            <h1>Puggeliste</h1>
            <p className="muted">Formlene du skal kunne utenat.</p>
          </div>
          <div className="row skjul-utskrift">
            <Link className="btn" to="/1t">
              ← Tilbake
            </Link>
            <button className="btn" onClick={() => window.print()}>
              Skriv ut
            </button>
          </div>
        </header>

        <div className="blokker">
          <Blokk tittel="Algebra">
            <Rader rader={ALGEBRA} />
          </Blokk>
          <Blokk tittel="Potenser og røtter">
            <Rader rader={POTENSER} />
          </Blokk>
          <Blokk tittel="Andregradsuttrykk og parabler">
            <Rader rader={ABC_FORMEL} />
            <div className="underboks">
              <div className="rad-linje">
                <span className="navn">Diskriminanten</span>
                <span className="math">
                  <V c="D" /> = <B /><sup>2</sup> − 4<A /><C />
                </span>
              </div>
              <div className="rad-linje">
                <span className="navn">Antall løsninger</span>
                <span className="math small-math">
                  <V c="D" /> &gt; 0: to &nbsp; <V c="D" /> = 0: én &nbsp; <V c="D" /> &lt; 0: ingen
                </span>
              </div>
            </div>
            <Rader rader={ANDREGRAD} />
            <p className="merk">
              <Sub c="x" n="s" /> er <X />-verdien til symmetrilinja.
            </p>
          </Blokk>
          <Blokk tittel="Rette linjer">
            <Rader rader={LINJER} />
          </Blokk>
          <Blokk tittel="Vekstfart og derivasjon">
            <Rader rader={VEKST} />
          </Blokk>
          <Blokk tittel="Eksponential- og potensfunksjoner">
            <Rader rader={VEKSTFAKTOR} />
          </Blokk>
          <Blokk tittel="Geometri">
            <Rader rader={GEOMETRI} />
          </Blokk>
          <Blokk tittel="Rettvinklet trekant">
            <RettvinkletFigur />
            <Rader rader={RETTVINKLET} />
          </Blokk>
          <Blokk tittel="Vilkårlig trekant">
            <TrekantFigur />
            <Rader rader={VILKARLIG} />
          </Blokk>
          <Blokk tittel="Eksakte verdier">
            <table className="vt eksakte">
              <thead>
                <tr>
                  <th><V c="v" /></th>
                  <th>30°</th>
                  <th>45°</th>
                  <th>60°</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th><SinV /></th>
                  <td><Frac n="1" d="2" /></td>
                  <td><Frac n={<Rot>2</Rot>} d="2" /></td>
                  <td><Frac n={<Rot>3</Rot>} d="2" /></td>
                </tr>
                <tr>
                  <th><CosV /></th>
                  <td><Frac n={<Rot>3</Rot>} d="2" /></td>
                  <td><Frac n={<Rot>2</Rot>} d="2" /></td>
                  <td><Frac n="1" d="2" /></td>
                </tr>
                <tr>
                  <th><TanV /></th>
                  <td><Frac n={<Rot>3</Rot>} d="3" /></td>
                  <td>1</td>
                  <td><Rot>3</Rot></td>
                </tr>
              </tbody>
            </table>
            <p className="merk">Disse må du ikke huske, men det er lurt.</p>
          </Blokk>
        </div>
      </div>
    </div>
  );
}
