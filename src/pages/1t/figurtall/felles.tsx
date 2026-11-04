import React from 'react';
import { V } from '../../../presentasjon/matte';
import type { Punkt } from './oppgaver';

/** Fₙ, eller F₁₀ med et tall */
export const F: React.FC<{ n?: React.ReactNode }> = ({ n = <V c="n" /> }) => (
  <span className="nw">
    <V c="F" />
    <sub>{n}</sub>
  </span>
);

/** Tegner prikker i et rutenett, med y oppover */
export const Prikker: React.FC<{ p: Punkt[]; rute?: number; merkelapp?: string }> = ({ p, rute = 20, merkelapp }) => {
  const xmax = Math.max(...p.map((q) => q.x));
  const ymax = Math.max(...p.map((q) => q.y));
  const W = (xmax + 1) * rute;
  const H = (ymax + 1) * rute;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={W}
      height={H}
      role="img"
      aria-label={merkelapp ?? `Figur med ${p.length} prikker`}
      style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
    >
      {p.map((q, i) => (
        <circle
          key={i}
          cx={(q.x + 0.5) * rute}
          cy={(ymax - q.y + 0.5) * rute}
          r={rute * 0.36}
          style={{ fill: q.farge ?? 'var(--curve)' }}
        />
      ))}
    </svg>
  );
};

/** Figur 1, 2, 3 … ved siden av hverandre, med nederste kant på linje */
export const Figurrekke: React.FC<{ figurer: Punkt[][]; rute?: number }> = ({ figurer, rute = 16 }) => (
  <div className="row" style={{ alignItems: 'flex-end', gap: 20 }}>
    {figurer.map((p, i) => (
      <div key={i} className="stack" style={{ gap: 6, alignItems: 'center' }}>
        <Prikker p={p} rute={rute} />
        <span className="small muted nw">Figur {i + 1}</span>
      </div>
    ))}
  </div>
);
