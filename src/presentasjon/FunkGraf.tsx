import React, { useId } from 'react';
import { dec } from './matte';

export type Kurve = {
  f: (x: number) => number;
  /** Tegnes bare for x i [fra, til] */
  fra?: number;
  til?: number;
  farge?: string;
};
export type Punkt = {
  x: number;
  y: number;
  farge?: string;
  /** Åpen sirkel: punktet er ikke med (spissparentes i intervallet) */
  apen?: boolean;
  navn?: string;
  plass?: 'over' | 'under' | 'hoyre' | 'venstre';
};
export type Skala = { sx: (x: number) => number; sy: (y: number) => number; W: number; H: number };

type Props = {
  kurver?: Kurve[];
  punkter?: Punkt[];
  xmin?: number;
  xmax?: number;
  ymin?: number;
  ymax?: number;
  /** Avstand mellom rutenettlinjene */
  xsteg?: number;
  ysteg?: number;
  /** Hvor ofte aksene får tall, standard annenhver rute */
  xetikett?: number;
  yetikett?: number;
  h?: number;
  xnavn?: string;
  ynavn?: string;
  /** Hjelpelinjer, bånd og tekst, tegnes over kurvene og under punktene */
  ekstra?: (s: Skala) => React.ReactNode;
  title: string;
};

/** Samme fargenavn som klassene .c1, .c2 og --pen i resten av presentasjonen */
const farge = (k?: string) =>
  k === 'c1' ? 'var(--r1)' : k === 'c2' ? 'var(--r2)' : k === 'pen' ? 'var(--pen)' : k === 'muted' ? 'var(--muted)' : 'var(--ink)';

const verdier = (min: number, max: number, steg: number) => {
  const v: number[] = [];
  for (let k = Math.ceil(min / steg - 1e-9); k * steg <= max + 1e-9; k++) v.push(+(k * steg).toFixed(6));
  return v;
};
const delelig = (v: number, steg: number) => Math.abs(v / steg - Math.round(v / steg)) < 1e-6;

const PLASS = {
  over: { dx: 0, dy: -16, anchor: 'middle' },
  under: { dx: 0, dy: 30, anchor: 'middle' },
  hoyre: { dx: 14, dy: 6, anchor: 'start' },
  venstre: { dx: -14, dy: 6, anchor: 'end' },
} as const;

/** Koordinatsystem med rutenett for vilkårlige funksjoner, åpne/lukkede endepunkter og hjelpelinjer. */
export const FunkGraf: React.FC<Props> = ({
  kurver = [],
  punkter = [],
  xmin = -6,
  xmax = 6,
  ymin = -6,
  ymax = 6,
  xsteg = 1,
  ysteg = 1,
  xetikett = 2 * xsteg,
  yetikett = 2 * ysteg,
  h = 380,
  xnavn = 'x',
  ynavn = 'y',
  ekstra,
  title,
}) => {
  const clip = 'clip' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const W = 640;
  const H = h;
  const sx = (x: number) => ((x - xmin) / (xmax - xmin)) * W;
  const sy = (y: number) => H - ((y - ymin) / (ymax - ymin)) * H;

  // Aksene går gjennom origo, eller langs kanten hvis origo er utenfor
  const ax = sx(Math.min(Math.max(0, xmin), xmax));
  const ay = sy(Math.min(Math.max(0, ymin), ymax));
  const lblY = Math.min(Math.max(ay + 20, 16), H - 6);
  const yLblVenstre = ax > 40;

  const xs = verdier(xmin, xmax, xsteg);
  const ys = verdier(ymin, ymax, ysteg);

  const sti = (k: Kurve) => {
    const fra = Math.max(k.fra ?? -Infinity, xmin);
    const til = Math.min(k.til ?? Infinity, xmax);
    if (!(til > fra)) return '';
    const N = 300;
    let d = '';
    let ny = true;
    for (let i = 0; i <= N; i++) {
      const x = fra + ((til - fra) * i) / N;
      const y = k.f(x);
      if (!isFinite(y)) {
        ny = true;
        continue;
      }
      const py = Math.max(-H, Math.min(2 * H, sy(y)));
      d += (ny ? 'M' : 'L') + sx(x).toFixed(1) + ' ' + py.toFixed(1);
      ny = false;
    }
    return d;
  };

  return (
    <div className="graph">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title}>
        <defs>
          <clipPath id={clip}>
            <rect x="0" y="0" width={W} height={H} />
          </clipPath>
        </defs>
        {xs.map((x) => (
          <line key={'gx' + x} className="g-grid" x1={sx(x)} x2={sx(x)} y1="0" y2={H} />
        ))}
        {ys.map((y) => (
          <line key={'gy' + y} className="g-grid" y1={sy(y)} y2={sy(y)} x1="0" x2={W} />
        ))}
        <line className="g-axis" x1="0" x2={W} y1={ay} y2={ay} />
        <line className="g-axis" y1="0" y2={H} x1={ax} x2={ax} />
        {xs
          .filter((x) => x !== 0 && delelig(x, xetikett) && x > xmin && x < xmax)
          .map((x) => (
            <text key={'lx' + x} className="g-lbl" x={sx(x)} y={lblY} textAnchor="middle">
              {dec(x)}
            </text>
          ))}
        {ys
          .filter((y) => y !== 0 && delelig(y, yetikett) && y > ymin && y < ymax)
          .map((y) => (
            <text
              key={'ly' + y}
              className="g-lbl"
              x={yLblVenstre ? ax - 7 : ax + 7}
              y={sy(y) + 5}
              textAnchor={yLblVenstre ? 'end' : 'start'}
            >
              {dec(y)}
            </text>
          ))}
        <text className="g-name" x={W - 8} y={ay - 8} textAnchor="end">
          {xnavn}
        </text>
        <text className="g-name" x={ax + 10} y={18}>
          {ynavn}
        </text>
        <g clipPath={`url(#${clip})`}>
          {kurver.map((k, i) => (
            <path key={i} className="g-curve" d={sti(k)} style={k.farge ? { stroke: farge(k.farge) } : undefined} />
          ))}
          {ekstra?.({ sx, sy, W, H })}
        </g>
        {punkter
          .filter((p) => p.x >= xmin && p.x <= xmax && p.y >= ymin && p.y <= ymax)
          .map((p, i) => {
            const c = farge(p.farge);
            const pl = PLASS[p.plass ?? 'over'];
            return (
              <g key={i}>
                <circle
                  cx={sx(p.x)}
                  cy={sy(p.y)}
                  r="7"
                  style={p.apen ? { fill: 'var(--card)', stroke: c, strokeWidth: 3 } : { fill: c }}
                />
                {p.navn && (
                  <text className="g-root" x={sx(p.x) + pl.dx} y={sy(p.y) + pl.dy} textAnchor={pl.anchor} style={{ fill: c }}>
                    {p.navn}
                  </text>
                )}
              </g>
            );
          })}
      </svg>
    </div>
  );
};

/** Stiplet hjelpelinje mellom to punkter i koordinatsystemet */
export const Hjelpelinje: React.FC<{ s: Skala; x1: number; y1: number; x2: number; y2: number; farge?: string }> = ({
  s,
  x1,
  y1,
  x2,
  y2,
  farge: f,
}) => <line className="g-guide" x1={s.sx(x1)} y1={s.sy(y1)} x2={s.sx(x2)} y2={s.sy(y2)} style={{ stroke: farge(f) }} />;
