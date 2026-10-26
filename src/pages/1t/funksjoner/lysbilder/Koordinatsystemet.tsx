import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { V, X, minus } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

const KVADRANTER: [number, number, string][] = [
  [3.8, 4.6, '1. kvadrant'],
  [-3.8, 4.6, '2. kvadrant'],
  [-3.8, -4.4, '3. kvadrant'],
  [3.8, -4.4, '4. kvadrant'],
];

const plassering = (x: number, y: number) => {
  if (x === 0 && y === 0) return 'i origo';
  if (x === 0) return 'på y-aksen';
  if (y === 0) return 'på x-aksen';
  if (x > 0) return y > 0 ? 'i 1. kvadrant' : 'i 4. kvadrant';
  return y > 0 ? 'i 2. kvadrant' : 'i 3. kvadrant';
};

export const Koordinatsystemet: React.FC = () => {
  const [x, setX] = useState(-2);
  const [y, setY] = useState(3);
  return (
    <div className="slide">
      <div className="kicker">Repetisjon</div>
      <h2>Koordinatsystemet</h2>
      <div className="cols">
        <div className="stack">
          <p>
            Et punkt beskrives med to tall: hvor langt det er bortover og hvor langt det er opp. Den vannrette aksen er{' '}
            <b>førsteaksen</b> (<X />
            -aksen), den loddrette er <b>andreaksen</b> (<V c="y" />
            -aksen). De møtes i <b>origo</b>, (0 , 0).
          </p>
          <Slider id="k-x" label={<X />} value={x} min={-6} max={6} step={1} onChange={setX} />
          <Slider id="k-y" label={<V c="y" />} value={y} min={-5} max={5} step={1} onChange={setY} />
          <div className="panel math">
            <span className="mline">
              <V c="P" />(<span className="c1">{minus(x)}</span> , <span className="c2">{minus(y)}</span>)
            </span>
            <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>
              Førstekoordinat <b className="c1">{minus(x)}</b>, andrekoordinat <b className="c2">{minus(y)}</b>. Punktet
              ligger {plassering(x, y)}.
            </span>
          </div>
          <p className="small muted">
            Hvor ligger alle punkter som har 0 som førstekoordinat? Og alle som har −5 som andrekoordinat?
          </p>
        </div>
        <FunkGraf
          xmin={-7}
          xmax={7}
          ymin={-5.6}
          ymax={5.6}
          xetikett={1}
          yetikett={1}
          h={510}
          punkter={[{ x, y, farge: 'pen', navn: `P(${minus(x)} , ${minus(y)})`, plass: y >= 0 ? 'over' : 'under' }]}
          ekstra={(s) => (
            <>
              {KVADRANTER.map(([kx, ky, t]) => (
                <text key={t} className="g-txt" x={s.sx(kx)} y={s.sy(ky)} textAnchor="middle">
                  {t}
                </text>
              ))}
              {y !== 0 && <Hjelpelinje s={s} x1={x} y1={y} x2={x} y2={0} farge="c1" />}
              {x !== 0 && <Hjelpelinje s={s} x1={x} y1={y} x2={0} y2={y} farge="c2" />}
            </>
          )}
          title="Koordinatsystem med de fire kvadrantene og punktet P"
        />
      </div>
    </div>
  );
};
