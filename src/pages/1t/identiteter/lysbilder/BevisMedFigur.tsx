import React, { useState } from 'react';
import { V } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

export const FIGUR_STEG = 1;

const Felt: React.FC<{ x: number; y: number; w: number; h: number; farge: string; tekst?: string }> = ({ x, y, w, h, farge, tekst }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} style={{ fill: farge, opacity: 0.28 }} />
    <rect x={x} y={y} width={w} height={h} style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.5 }} />
    {tekst && (
      <text className="g-root" x={x + w / 2} y={y + h / 2 + 6} textAnchor="middle" style={{ fill: 'var(--ink)' }}>
        {tekst}
      </text>
    )}
  </g>
);

const Sum: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const u = 260 / (a + b);
  const [p, q] = [a * u, b * u];
  return (
    <div className="graph" style={{ maxWidth: 330 }}>
      <svg viewBox="0 0 300 300" role="img" aria-label="Kvadrat med side a + b delt i a², to rektangler ab og b²">
        <text className="g-name" x={30 + p / 2} y={22} textAnchor="middle">a</text>
        <text className="g-name" x={30 + p + q / 2} y={22} textAnchor="middle">b</text>
        <text className="g-name" x={14} y={30 + p / 2 + 6} textAnchor="middle">a</text>
        <text className="g-name" x={14} y={30 + p + q / 2 + 6} textAnchor="middle">b</text>
        <Felt x={30} y={30} w={p} h={p} farge="var(--r1)" tekst="a²" />
        <Felt x={30 + p} y={30} w={q} h={p} farge="var(--r2)" tekst="ab" />
        <Felt x={30} y={30 + p} w={p} h={q} farge="var(--r2)" tekst="ab" />
        <Felt x={30 + p} y={30 + p} w={q} h={q} farge="var(--pen)" tekst="b²" />
      </svg>
    </div>
  );
};

/** a² − b² med a = 6 og b = 2. Stripen flyttes og gir et rektangel med sider a + b og a − b. */
const Differanse: React.FC<{ flyttet: boolean }> = ({ flyttet }) => {
  const u = 30;
  const [a, b] = [6 * u, 2 * u];
  const [x0, y0] = [48, 28];
  return (
    <div className="graph" style={{ maxWidth: 330 }}>
      <svg viewBox="0 0 300 240" role="img" aria-label={flyttet ? 'Rektangel med sider a + b og a − b' : 'Kvadrat med side a der et kvadrat med side b er tatt bort'}>
        <Felt x={x0} y={y0} w={a} h={a - b} farge="var(--r1)" />
        {flyttet ? (
          <g className="reveal">
            <Felt x={x0 + a} y={y0} w={b} h={a - b} farge="var(--r2)" />
            <text className="g-name" x={x0 + (a + b) / 2} y={y0 - 8} textAnchor="middle">a + b</text>
            <text className="g-name" x={x0 - 6} y={y0 + (a - b) / 2 + 6} textAnchor="end">a − b</text>
          </g>
        ) : (
          <g>
            <Felt x={x0} y={y0 + a - b} w={a - b} h={b} farge="var(--r2)" />
            <rect x={x0 + a - b} y={y0 + a - b} width={b} height={b} style={{ fill: 'none', stroke: 'var(--muted)', strokeWidth: 1.5, strokeDasharray: '6 5' }} />
            <text className="g-name" x={x0 + a - b / 2} y={y0 + a - b / 2 + 6} textAnchor="middle">b²</text>
            <text className="g-name" x={x0 + a / 2} y={y0 - 8} textAnchor="middle">a</text>
          </g>
        )}
      </svg>
    </div>
  );
};

export const BevisMedFigur: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [a, setA] = useState(4);
  const [b, setB] = useState(2);
  return (
    <div className="slide">
      <div className="kicker">Bevis med figur</div>
      <h2>Arealet kan forklare setningene</h2>
      <div className="grid2">
        <div className="panel stack">
          <h3>1. kvadratsetning</h3>
          <p className="math">(<A /> + <B />)<sup>2</sup> = <A /><sup>2</sup> + 2<A /><B /> + <B /><sup>2</sup></p>
          <Sum a={a} b={b} />
          <Slider id="f-a" label={<A />} value={a} min={1} max={6} step={1} onChange={setA} />
          <Slider id="f-b" label={<B />} value={b} min={1} max={6} step={1} onChange={setB} />
          <p className="small">Hele kvadratet har areal {(a + b) ** 2}, og delene gir {a * a} + {a * b} + {a * b} + {b * b} = {(a + b) ** 2}.</p>
        </div>
        <div className="panel stack">
          <h3>Konjugatsetningen</h3>
          <p className="math"><A /><sup>2</sup> − <B /><sup>2</sup> = (<A /> + <B />)(<A /> − <B />)</p>
          <Differanse flyttet={frag >= 1} />
          <StepButtons frag={frag} setFrag={setFrag} steps={FIGUR_STEG} />
          <p className="small">
            {frag >= 1
              ? 'Stripen er flyttet. Arealet er det samme, men nå er figuren et rektangel.'
              : 'Ta bort et kvadrat med side b fra et kvadrat med side a. Flytt så stripen nederst opp til høyre.'}
          </p>
        </div>
      </div>
      <p className="muted">En figur gir god forståelse, men viser bare positive lengder. Regningen med bokstaver gjelder for alle tall.</p>
    </div>
  );
};
