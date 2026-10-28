import React from 'react';
import type { Skala } from '../../../presentasjon/FunkGraf';
import { fmt } from '../../../presentasjon/matte';

/**
 * Stigningstrekant fra punktet (x , y): dx bortover (c1) og dy opp eller ned (c2).
 * Etikettene viser endringene, eller egne tekster.
 */
export const Trekant: React.FC<{
  s: Skala;
  x: number;
  y: number;
  dx: number;
  dy: number;
  tekstX?: string;
  tekstY?: string;
}> = ({ s, x, y, dx, dy, tekstX = fmt(dx), tekstY = fmt(dy) }) => {
  const x2 = s.sx(x + dx);
  const y1 = s.sy(y);
  const y2 = s.sy(y + dy);
  return (
    <g>
      <line x1={s.sx(x)} y1={y1} x2={x2} y2={y1} style={{ stroke: 'var(--r1)', strokeWidth: 3 }} />
      <line x1={x2} y1={y1} x2={x2} y2={y2} style={{ stroke: 'var(--r2)', strokeWidth: 3 }} />
      <text
        className="g-root"
        x={(s.sx(x) + x2) / 2}
        y={dy >= 0 ? y1 + 22 : y1 - 10}
        textAnchor="middle"
        style={{ fill: 'var(--r1)' }}
      >
        {tekstX}
      </text>
      <text className="g-root" x={x2 + 8} y={(y1 + y2) / 2 + 6} style={{ fill: 'var(--r2)' }}>
        {tekstY}
      </text>
    </g>
  );
};
