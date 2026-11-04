import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><Xk /> + (<X /> + 7)<sup>2</sup> = 13<sup>2</sup></>, t: 'Pytagoras: summen av kvadratene av katetene er lik kvadratet av hypotenusen.' },
  { m: <><Xk /> + <Xk /> + 14<X /> + 49 = 169</>, t: '1. kvadratsetning.' },
  { m: <>2<Xk /> + 14<X /> − 120 = 0 &nbsp;gir&nbsp; <Xk /> + 7<X /> − 60 = 0</>, t: 'Samle på venstre side, og del på 2.' },
  { m: <>(<X /> + 12)(<X /> − 5) = 0, &nbsp; altså <X /> = −12 eller <X /> = 5</>, t: 'Sum 7 og produkt −60: 12 og −5.' },
  { m: <span className="pen">Katetene er 5 cm og 12 cm.</span>, t: 'Forkast −12. Kontroll: 25 + 144 = 169.' },
];

export const PYT_STEG = TRINN.length;

const Trekant: React.FC = () => (
  <div className="graph" style={{ maxWidth: 320 }}>
    <svg viewBox="0 0 300 180" role="img" aria-label="Rettvinklet trekant med kateter x og x + 7 og hypotenus 13">
      <polygon points="40,150 270,150 40,50" style={{ fill: 'var(--r1)', opacity: 0.25 }} />
      <polygon points="40,150 270,150 40,50" style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 2 }} />
      <polyline points="40,134 56,134 56,150" style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.5 }} />
      <text className="g-name" x={24} y={105} textAnchor="middle">x</text>
      <text className="g-name" x={155} y={172} textAnchor="middle">x + 7</text>
      <text className="g-name" x={168} y={90} textAnchor="middle">13</text>
    </svg>
  </div>
);

export const Pytagoras: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Pytagoras</div>
    <h2>Finn katetene</h2>
    <div className="cols wide-left">
      <div className="stack">
        <div className="boxed">
          <span className="label">Oppgave</span>
          I en rettvinklet trekant er den ene kateten 7 cm lengre enn den andre, og hypotenusen er 13 cm.
        </div>
        <Utregning trinn={TRINN} frag={frag} />
        <StepButtons frag={frag} setFrag={setFrag} steps={PYT_STEG} />
      </div>
      <Trekant />
    </div>
  </div>
);
