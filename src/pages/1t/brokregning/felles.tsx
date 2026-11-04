import React from 'react';

/** Brøken n/d som stolper delt i d like deler, med n deler fargelagt. Over 1 gir flere stolper. */
export const Brokstolpe: React.FC<{ n: number; d: number; farge?: string; merke?: string }> = ({ n, d, farge = 'var(--r1)', merke }) => {
  const W = 400;
  const H = 34;
  const rader = Math.max(1, Math.ceil(n / d));
  return (
    <div className="row" style={{ gap: 10, flexWrap: 'nowrap' }}>
      {merke && <span className="math nw" style={{ minWidth: '2.8em' }}>{merke}</span>}
      <svg viewBox={`0 0 ${W + 2} ${rader * (H + 6)}`} role="img" aria-label={`${n} av ${d} deler`} style={{ width: '100%', maxWidth: 460, display: 'block' }}>
        {Array.from({ length: rader }, (_, r) =>
          Array.from({ length: d }, (_, i) => {
            const fylt = r * d + i < n;
            return (
              <rect
                key={`${r}-${i}`}
                x={1 + (i * W) / d}
                y={1 + r * (H + 6)}
                width={W / d}
                height={H}
                style={{ fill: fylt ? farge : 'var(--card)', stroke: 'var(--ink)', strokeWidth: 1.5 }}
              />
            );
          }),
        )}
      </svg>
    </div>
  );
};

/** Enhetskvadrat delt i d1 kolonner og d2 rader. n1 kolonner og n2 rader er fargelagt, og overlappet er produktet. */
export const Produktmodell: React.FC<{ n1: number; d1: number; n2: number; d2: number }> = ({ n1, d1, n2, d2 }) => {
  const S = 300;
  const b = S / d1;
  const h = S / d2;
  return (
    <div className="graph" style={{ maxWidth: 340 }}>
      <svg viewBox={`0 0 ${S + 8} ${S + 8}`} role="img" aria-label={`${n1}/${d1} av ${n2}/${d2} av et kvadrat`}>
        <g transform="translate(4 4)">
          <rect x={0} y={0} width={(n1 * S) / d1} height={S} style={{ fill: 'var(--r1)', opacity: 0.28 }} />
          <rect x={0} y={0} width={S} height={(n2 * S) / d2} style={{ fill: 'var(--r2)', opacity: 0.28 }} />
          <rect x={0} y={0} width={(n1 * S) / d1} height={(n2 * S) / d2} style={{ fill: 'var(--pen)', opacity: 0.55 }} />
          {Array.from({ length: d1 + 1 }, (_, i) => (
            <line key={`v${i}`} x1={i * b} x2={i * b} y1={0} y2={S} style={{ stroke: 'var(--ink)', strokeWidth: 1.5 }} />
          ))}
          {Array.from({ length: d2 + 1 }, (_, i) => (
            <line key={`h${i}`} x1={0} x2={S} y1={i * h} y2={i * h} style={{ stroke: 'var(--ink)', strokeWidth: 1.5 }} />
          ))}
        </g>
      </svg>
    </div>
  );
};
