import React from 'react';

const Felt: React.FC<{ x: number; y: number; w: number; h: number; farge: string; tekst: React.ReactNode }> = ({
  x,
  y,
  w,
  h,
  farge,
  tekst,
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} style={{ fill: farge, opacity: 0.28, stroke: 'none' }} />
    <rect x={x} y={y} width={w} height={h} style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.5 }} />
    <text className="g-root" x={x + w / 2} y={y + h / 2 + 6} textAnchor="middle" style={{ fill: 'var(--ink)' }}>
      {tekst}
    </text>
  </g>
);

/** Rektangelet (x + a)(x + b) delt i fire områder. Lengden x tegnes som en fast lengde. */
export const Arealmodell: React.FC<{ a: number; b: number; v?: string; hoyde?: string; merke?: boolean }> = ({
  a,
  b,
  v = 'x',
  hoyde = v,
  merke,
}) => {
  const U = 24;
  const X = 150;
  const x0 = 34;
  const y0 = 30;
  const W = X + a * U;
  const H = X + b * U;
  return (
    <div className="graph" style={{ maxWidth: 440 }}>
      <svg viewBox={`0 0 ${x0 + 150 + 6 * U + 16} ${y0 + 150 + 6 * U + 16}`} role="img" aria-label={`Arealmodell av (${v} + ${a})(${hoyde} + ${b})`}>
        <text className="g-name" x={x0 + X / 2} y={22} textAnchor="middle">{v}</text>
        <text className="g-name" x={x0 + X + (a * U) / 2} y={22} textAnchor="middle">{a}</text>
        <text className="g-name" x={18} y={y0 + X / 2 + 6} textAnchor="middle">{hoyde}</text>
        <text className="g-name" x={18} y={y0 + X + (b * U) / 2 + 6} textAnchor="middle">{b}</text>
        <Felt x={x0} y={y0} w={X} h={X} farge="var(--r1)" tekst={<>{v}²</>} />
        <Felt x={x0 + X} y={y0} w={a * U} h={X} farge="var(--r2)" tekst={<>{a}{v}</>} />
        <Felt x={x0} y={y0 + X} w={X} h={b * U} farge="var(--r2)" tekst={<>{b}{v}</>} />
        <Felt x={x0 + X} y={y0 + X} w={a * U} h={b * U} farge="var(--pen)" tekst={a * b} />
        {merke && <rect x={x0} y={y0} width={W} height={H} style={{ fill: 'none', stroke: 'var(--pen)', strokeWidth: 3 }} />}
      </svg>
    </div>
  );
};
