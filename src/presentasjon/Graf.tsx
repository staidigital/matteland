import React, { useId } from 'react';
import { fmt, minus } from './matte';

export type Rot = { x: number; cls: string; name: string };

type Props = {
  a: number;
  b: number;
  c: number;
  roots?: Rot[];
  xmin?: number;
  xmax?: number;
  ymin?: number;
  ymax?: number;
  h?: number;
  /** Et punkt på grafen som markeres (brukes på nullproduktregelen) */
  point?: { x: number; y: number };
  title?: string;
};

/** Grafen til y = ax² + bx + c i et koordinatsystem med rutenett. */
export const Graf: React.FC<Props> = ({
  a,
  b,
  c,
  roots = [],
  xmin = -6,
  xmax = 6,
  ymin = -10,
  ymax = 10,
  h = 380,
  point,
  title,
}) => {
  const clip = 'clip' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const W = 640;
  const H = h;
  const sx = (x: number) => ((x - xmin) / (xmax - xmin)) * W;
  const sy = (y: number) => H - ((y - ymin) / (ymax - ymin)) * H;
  const span = ymax - ymin;
  const ystep = span > 30 ? 5 : span > 16 ? 2 : 1;

  const xs: number[] = [];
  for (let x = Math.ceil(xmin); x <= xmax; x++) xs.push(x);
  const ys: number[] = [];
  for (let y = Math.ceil(ymin / ystep) * ystep; y <= ymax; y += ystep) ys.push(y);

  let d = '';
  const N = 260;
  for (let i = 0; i <= N; i++) {
    const x = xmin + ((xmax - xmin) * i) / N;
    const y = Math.max(Math.min(a * x * x + b * x + c, ymax + 40), ymin - 40);
    d += (i ? 'L' : 'M') + sx(x).toFixed(1) + ' ' + sy(y).toFixed(1);
  }

  const ax = sx(0);
  const ay = sy(0);
  const lblY = Math.min(Math.max(ay + 20, 16), H - 6);
  const vis = roots.filter((r) => r.x > xmin + 0.2 && r.x < xmax - 0.2);

  return (
    <div className="graph">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={title ?? 'Graf til andregradsuttrykket'}>
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
        {ymin < 0 && ymax > 0 && <line className="g-axis" x1="0" x2={W} y1={ay} y2={ay} />}
        <line className="g-axis" y1="0" y2={H} x1={ax} x2={ax} />
        {xs
          .filter((x) => x !== 0 && x % 2 === 0 && x > xmin && x < xmax && !vis.some((r) => Math.abs(r.x - x) < 0.8))
          .map((x) => (
            <text key={'lx' + x} className="g-lbl" x={sx(x)} y={lblY} textAnchor="middle">
              {minus(x)}
            </text>
          ))}
        {ys
          .filter((y) => y !== 0 && (y / ystep) % 2 === 0 && y > ymin && y < ymax)
          .map((y) => (
            <text key={'ly' + y} className="g-lbl" x={ax - 7} y={sy(y) + 5} textAnchor="end">
              {minus(y)}
            </text>
          ))}
        <text className="g-lbl" x={W - 8} y={ay - 8} textAnchor="end" fontStyle="italic">
          x
        </text>
        <path className="g-curve" d={d} clipPath={`url(#${clip})`} />
        {vis.map((r, i) => (
          <g key={i}>
            <circle className={r.cls} cx={sx(r.x)} cy={ay} r="7" />
            <text className={'g-root ' + r.cls} x={sx(r.x)} y={i === 0 ? ay - 16 : ay + 34} textAnchor="middle">
              {r.name} = {fmt(r.x)}
            </text>
          </g>
        ))}
        {point && point.y > ymin && point.y < ymax && <circle className="pt" cx={sx(point.x)} cy={sy(point.y)} r="7" />}
      </svg>
    </div>
  );
};
