import React from 'react';

const Felt: React.FC<{ x: number; y: number; w: number; h: number; farge: string; tekst: string }> = ({ x, y, w, h, farge, tekst }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} style={{ fill: farge, opacity: 0.28 }} />
    <rect x={x} y={y} width={w} height={h} style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 1.5 }} />
    <text className="g-root" x={x + w / 2} y={y + h / 2 + 6} textAnchor="middle" style={{ fill: 'var(--ink)' }}>
      {tekst}
    </text>
  </g>
);

/** x² + bx tegnet som et kvadrat med to striper. Hjørnet som mangler er (b/2)². */
export const Hjorne: React.FC<{ b: number; fylt?: boolean }> = ({ b, fylt }) => {
  const X = 170;
  const U = 22;
  const h = b / 2;
  const s = h * U;
  const [x0, y0] = [34, 30];
  const tekstH = String(h).replace('.', ',');
  return (
    <div className="graph" style={{ maxWidth: 440 }}>
      <svg viewBox={`0 0 ${x0 + X + 5 * U + 16} ${y0 + X + 5 * U + 16}`} role="img" aria-label={`Kvadrat med side x og to striper med bredde ${tekstH}. Hjørnet har areal ${h * h}.`}>
        <text className="g-name" x={x0 + X / 2} y={22} textAnchor="middle">x</text>
        <text className="g-name" x={x0 + X + s / 2} y={22} textAnchor="middle">{tekstH}</text>
        <text className="g-name" x={16} y={y0 + X / 2 + 6} textAnchor="middle">x</text>
        <text className="g-name" x={16} y={y0 + X + s / 2 + 6} textAnchor="middle">{tekstH}</text>
        <Felt x={x0} y={y0} w={X} h={X} farge="var(--r1)" tekst="x²" />
        <Felt x={x0 + X} y={y0} w={s} h={X} farge="var(--r2)" tekst={`${tekstH}x`} />
        <Felt x={x0} y={y0 + X} w={X} h={s} farge="var(--r2)" tekst={`${tekstH}x`} />
        {fylt ? (
          <Felt x={x0 + X} y={y0 + X} w={s} h={s} farge="var(--pen)" tekst={String(h * h)} />
        ) : (
          <rect x={x0 + X} y={y0 + X} width={s} height={s} style={{ fill: 'none', stroke: 'var(--pen)', strokeWidth: 2, strokeDasharray: '6 5' }} />
        )}
      </svg>
    </div>
  );
};
