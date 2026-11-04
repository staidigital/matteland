import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><X /> = bredden på gangveien i meter</>, t: 'Hele figuren er da 10 + 2x lang og 6 + 2x bred: gangveien kommer på begge sider.' },
  { m: <>(10 + 2<X />)(6 + 2<X />) = 96</>, t: 'Hele arealet på to måter.' },
  { m: <>4<Xk /> + 32<X /> + 60 = 96 &nbsp;gir&nbsp; <Xk /> + 8<X /> − 9 = 0</>, t: 'Gang ut, samle alt på venstre side, og del på 4.' },
  { m: <>(<X /> + 9)(<X /> − 1) = 0, &nbsp; altså <X /> = −9 eller <X /> = 1</>, t: 'Sum og produkt.' },
  { m: <span className="pen">Gangveien er 1 m bred.</span>, t: 'Bredden kan ikke være negativ. Kontroll: 12 · 8 = 96.' },
];

export const GANGVEI_STEG = TRINN.length;

const Figur: React.FC = () => (
  <div className="graph" style={{ maxWidth: 320 }}>
    <svg viewBox="0 0 300 210" role="img" aria-label="Hage på 10 ganger 6 meter med en gangvei med bredde x rundt">
      <rect x={20} y={20} width={260} height={170} style={{ fill: 'var(--r2)', opacity: 0.28 }} />
      <rect x={20} y={20} width={260} height={170} style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.5 }} />
      <rect x={50} y={50} width={200} height={110} style={{ fill: 'var(--r1)', opacity: 0.4 }} />
      <rect x={50} y={50} width={200} height={110} style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.5 }} />
      <text className="g-root" x={150} y={102} textAnchor="middle" style={{ fill: 'var(--ink)' }}>Hage</text>
      <text className="g-name" x={150} y={122} textAnchor="middle">10 m · 6 m</text>
      <text className="g-name" x={35} y={110} textAnchor="middle">x</text>
      <text className="g-name" x={265} y={110} textAnchor="middle">x</text>
      <text className="g-name" x={150} y={42} textAnchor="middle">x</text>
      <text className="g-name" x={150} y={180} textAnchor="middle">x</text>
    </svg>
  </div>
);

export const Gangvei: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Tegn en figur</div>
    <h2>Gangvei rundt en hage</h2>
    <div className="cols wide-left">
      <div className="stack">
        <div className="boxed">
          <span className="label">Oppgave</span>
          En hage er 10 m lang og 6 m bred. Rundt hagen legges en gangvei med samme bredde overalt. Hagen og gangveien har til sammen areal 96 m². Hvor bred er gangveien?
        </div>
        <Utregning trinn={TRINN} frag={frag} />
        <StepButtons frag={frag} setFrag={setFrag} steps={GANGVEI_STEG} />
      </div>
      <Figur />
    </div>
  </div>
);
