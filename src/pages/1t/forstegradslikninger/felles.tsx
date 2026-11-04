import React from 'react';
import { Poly } from '../../../presentasjon/matte';

/** kx + m med riktige fortegn, uten 1-ere og uten nulledd */
export const Ledd: React.FC<{ k: number; m?: number }> = ({ k, m = 0 }) => <Poly a={0} b={k} c={m} />;

/** «+ 3» eller «− 3» */
export const tegn = (v: number) => (v < 0 ? `− ${Math.abs(v)}` : `+ ${v}`);

type Side = {
  /** Antall x-klosser */
  x: number;
  /** Antall lodd som veier 1 */
  ener: number;
};

const KOLONNER = 6;
const RUTE = 27;
const ARM = 135;
const TOPP = 40;
const HENG = 130;
const PANNE = 85;
const MIDT = 260;

const Skal: React.FC<Side & { cx: number; dy: number }> = ({ x, ener, cx, dy }) => {
  const venstre = cx - (KOLONNER * RUTE) / 2;
  const y0 = TOPP + HENG;
  const ting = [...Array<string>(x).fill('x'), ...Array<string>(ener).fill('1')];
  return (
    <g className="vekt-del" style={{ transform: `translateY(${dy}px)` }}>
      <line x1={cx - PANNE} x2={cx - PANNE} y1={TOPP} y2={y0} style={{ stroke: 'var(--muted)', strokeWidth: 1.5 }} />
      <line x1={cx + PANNE} x2={cx + PANNE} y1={TOPP} y2={y0} style={{ stroke: 'var(--muted)', strokeWidth: 1.5 }} />
      <rect x={cx - PANNE - 4} y={y0} width={2 * PANNE + 8} height={7} rx={3} style={{ fill: 'var(--ink)' }} />
      {ting.map((t, i) => {
        const px = venstre + (i % KOLONNER) * RUTE + RUTE / 2;
        const py = y0 - Math.floor(i / KOLONNER) * RUTE - RUTE / 2;
        return (
          <g key={i}>
            {t === 'x' ? (
              <rect x={px - 12} y={py - 12} width={24} height={24} rx={3} style={{ fill: 'var(--r1)' }} />
            ) : (
              <circle cx={px} cy={py} r={11.5} style={{ fill: 'var(--r2)' }} />
            )}
            <text
              x={px}
              y={py + 5}
              textAnchor="middle"
              style={{ fill: 'var(--card)', fontFamily: 'var(--f-math)', fontStyle: t === 'x' ? 'italic' : 'normal', fontSize: 15, fontWeight: 700 }}
            >
              {t}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** Skålvekt med x-klosser og lodd. `helling` er i grader, og positiv helling betyr at høyre side er tyngst. */
export const Vekt: React.FC<{ venstre: Side; hoyre: Side; helling?: number; beskrivelse: string }> = ({ venstre, hoyre, helling = 0, beskrivelse }) => {
  const dy = ARM * Math.sin((helling * Math.PI) / 180);
  return (
    <div className="graph" style={{ maxWidth: 560 }}>
      <svg viewBox="0 0 520 262" role="img" aria-label={beskrivelse}>
        <line x1={MIDT} x2={MIDT} y1={TOPP} y2={248} style={{ stroke: 'var(--ink)', strokeWidth: 5 }} />
        <rect x={MIDT - 60} y={248} width={120} height={8} rx={3} style={{ fill: 'var(--ink)' }} />
        <Skal {...venstre} cx={MIDT - ARM} dy={-dy} />
        <Skal {...hoyre} cx={MIDT + ARM} dy={dy} />
        <g className="vekt-del" style={{ transform: `rotate(${helling}deg)`, transformOrigin: `${MIDT}px ${TOPP}px` }}>
          <line x1={MIDT - ARM - PANNE} x2={MIDT + ARM + PANNE} y1={TOPP} y2={TOPP} style={{ stroke: 'var(--ink)', strokeWidth: 5, strokeLinecap: 'round' }} />
        </g>
        <circle cx={MIDT} cy={TOPP} r={7} style={{ fill: 'var(--pen)' }} />
      </svg>
    </div>
  );
};
