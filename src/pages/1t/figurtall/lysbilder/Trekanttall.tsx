import React, { useState } from 'react';
import { Frac, V } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { F, Prikker } from '../felles';
import type { Punkt } from '../oppgaver';

const N = () => <V c="n" />;

/** To trekanter som fyller et rektangel med n rader og n + 1 kolonner */
const toTrekanter = (n: number): Punkt[] => {
  const p: Punkt[] = [];
  for (let y = 0; y < n; y++)
    for (let x = 0; x <= n; x++) p.push({ x, y, farge: x + y < n ? 'var(--r1)' : 'var(--r2)' });
  return p;
};

export const Trekanttall: React.FC = () => {
  const [n, setN] = useState(4);
  const t = (n * (n + 1)) / 2;
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Trekanttall</div>
      <h2>To like trekanter blir ett rektangel</h2>
      <div className="cols">
        <div className="stack">
          <Slider id="t-n" label={<N />} value={n} min={1} max={9} step={1} onChange={setN} />
          <div className="panel" style={{ display: 'grid', placeItems: 'center', minHeight: 220 }}>
            <Prikker p={toTrekanter(n)} rute={22} merkelapp="To like trekanter av prikker som til sammen fyller et rektangel" />
          </div>
        </div>
        <div className="stack">
          <p>
            Trekanttallene er 1, 3, 6, 10, … Figur {n} har {Array.from({ length: n }, (_, i) => i + 1).join(' + ')} = <b>{t}</b> prikker.
          </p>
          <p>
            Legger vi en <span className="c2">lik trekant</span> opp ned ved siden av den <span className="c1">første</span>, får vi et rektangel med{' '}
            {n} rader og {n + 1} kolonner, altså <b>{n * (n + 1)}</b> prikker. Trekanten er halvparten.
          </p>
          <div className="boxed math big">
            <span className="label">Formel</span>
            <F /> = <Frac n={<><N />(<N /> + 1)</>} d="2" />
          </div>
          <p className="math">
            <F n={n} /> = <Frac n={`${n} · ${n + 1}`} d="2" /> = <span className="pen">{t}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
