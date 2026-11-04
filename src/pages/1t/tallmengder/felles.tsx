import React from 'react';
import { MENGDER, NAVN, SYMBOL, type Mengde } from './oppgaver';

/** Tallmengdene som bokser inni hverandre. Mengdene tallet hører til, er utfylt. */
export const Mengdediagram: React.FC<{ minste?: Mengde; irrasjonal?: boolean; h?: number }> = ({ minste, irrasjonal, h = 300 }) => {
  const iBruk = (m: Mengde) => minste !== undefined && MENGDER.indexOf(m) >= MENGDER.indexOf(minste);
  // Fra ytterst til innerst: [mengde, x, y, b, h]
  const bokser: [Mengde, number, number, number, number][] = [
    ['R', 4, 4, 512, 292],
    ['Q', 24, 40, 300, 240],
    ['Z', 44, 90, 240, 175],
    ['N', 64, 140, 170, 110],
  ];
  return (
    <div className="graph" style={{ maxWidth: 520 }}>
      <svg viewBox="0 0 520 300" style={{ maxHeight: h }} role="img" aria-label="Tallmengdene ℕ inni ℤ inni ℚ inni ℝ">
        {bokser.map(([m, x, y, b, hoyde]) => (
          <g key={m}>
            <rect
              x={x}
              y={y}
              width={b}
              height={hoyde}
              rx={14}
              style={{
                fill: iBruk(m) ? 'var(--hl)' : 'var(--card)',
                stroke: iBruk(m) ? 'var(--pen)' : 'var(--line)',
                strokeWidth: 2.5,
              }}
            />
            <text x={x + 14} y={y + 30} className="g-txt" style={{ fill: 'var(--ink)' }}>
              {SYMBOL[m]} {NAVN[m]}
            </text>
          </g>
        ))}
        <text x={345} y={150} className="g-txt">irrasjonale tall</text>
        <text x={345} y={178} className="g-name" style={irrasjonal ? { fill: 'var(--pen)' } : undefined}>√2, π, √10 …</text>
      </svg>
    </div>
  );
};

export type Del = { a: number; b: number; aMed?: boolean; bMed?: boolean; farge?: string };

/** Tallinje med ett eller flere markerte intervaller, åpne eller fylte endepunkter og valgfritt markert tall */
export const Tallinje: React.FC<{
  min: number;
  max: number;
  a?: number;
  b?: number;
  aMed?: boolean;
  bMed?: boolean;
  /** Flere intervaller. a = −Infinity eller b = Infinity tegnes helt ut til kanten med pil. */
  deler?: Del[];
  merke?: number;
  tall?: { x: number; navn: string }[];
}> = ({ min, max, a, b, aMed, bMed, deler, merke, tall }) => {
  const W = 560;
  const sx = (x: number) => 24 + ((x - min) / (max - min)) * (W - 48);
  const ticks = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const alle: Del[] = [...(a !== undefined && b !== undefined ? [{ a, b, aMed, bMed }] : []), ...(deler ?? [])];
  const ende = (x: number, med: boolean | undefined, farge: string) => (
    <circle cx={sx(x)} cy={44} r={8} style={med ? { fill: farge } : { fill: 'var(--card)', stroke: farge, strokeWidth: 3 }} />
  );
  return (
    <div className="graph">
      <svg viewBox={`0 0 ${W} ${tall ? 104 : 84}`} role="img" aria-label="Tallinje">
        <line className="g-axis" x1={6} x2={W - 6} y1={44} y2={44} />
        {ticks.map((t) => (
          <g key={t}>
            <line className="g-axis" x1={sx(t)} x2={sx(t)} y1={38} y2={50} />
            <text className="g-lbl" x={sx(t)} y={72} textAnchor="middle">
              {t < 0 ? '−' + Math.abs(t) : t}
            </text>
          </g>
        ))}
        {alle.map((d, i) => {
          const farge = d.farge ?? 'var(--pen)';
          const x1 = isFinite(d.a) ? sx(d.a) : 10;
          const x2 = isFinite(d.b) ? sx(d.b) : W - 10;
          return (
            <g key={i}>
              <line x1={x1} x2={x2} y1={44} y2={44} style={{ stroke: farge, strokeWidth: 6 }} />
              {!isFinite(d.a) && <path d="M18 34 L6 44 L18 54" style={{ fill: 'none', stroke: farge, strokeWidth: 3 }} />}
              {!isFinite(d.b) && <path d={`M${W - 18} 34 L${W - 6} 44 L${W - 18} 54`} style={{ fill: 'none', stroke: farge, strokeWidth: 3 }} />}
              {isFinite(d.a) && ende(d.a, d.aMed, farge)}
              {isFinite(d.b) && ende(d.b, d.bMed, farge)}
            </g>
          );
        })}
        {merke !== undefined && <path d={`M${sx(merke)} 30 l-7 -12 h14 Z`} style={{ fill: 'var(--r1)' }} />}
        {tall?.map((t, i) => (
          <g key={t.navn}>
            <circle cx={sx(t.x)} cy={44} r={6} className="pt" />
            <text className="g-root c1" x={sx(t.x)} y={i % 2 ? 96 : 26} textAnchor="middle">
              {t.navn}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};
