import React, { useState } from 'react';
import { V } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { F, Prikker } from '../felles';
import type { Punkt } from '../oppgaver';

const N = () => <V c="n" />;

type Maate = 'sider' | 'topp' | 'kvadrat';

const P1 = 'var(--r1)';
const P2 = 'var(--r2)';
const P3 = 'var(--pen)';
const SVAK = 'var(--line)';

/** Rammen i figur n har side n + 1. Fargene viser telleskjemaet. */
function farget(m: Maate, n: number): Punkt[] {
  const p: Punkt[] = [];
  for (let x = 0; x <= n; x++)
    for (let y = 0; y <= n; y++) {
      const kant = x === 0 || y === 0 || x === n || y === n;
      if (!kant) {
        if (m === 'kvadrat') p.push({ x, y, farge: SVAK });
        continue;
      }
      let farge = P1;
      if (m === 'sider') {
        if (y === 0 && x < n) farge = P1;
        else if (x === n && y < n) farge = P2;
        else if (y === n && x > 0) farge = P3;
        else farge = 'var(--curve)';
      } else if (m === 'topp') {
        farge = y === 0 || y === n ? P1 : P2;
      }
      p.push({ x, y, farge });
    }
  return p;
}

export const Ramme: React.FC = () => {
  const [n, setN] = useState(3);
  const [m, setM] = useState<Maate>('sider');
  const s = 4 * n;
  return (
    <div className="slide">
      <div className="kicker">Eksempel · Samme figur, ulike formler</div>
      <h2>Tre måter å telle på</h2>
      <div className="seg" role="group" aria-label="Tellemåte" style={{ alignSelf: 'start' }}>
        {(
          [
            ['sider', 'Fire sider'],
            ['topp', 'Topp og sider'],
            ['kvadrat', 'Stort minus lite'],
          ] as [Maate, string][]
        ).map(([k, l]) => (
          <button key={k} aria-pressed={m === k} onClick={() => setM(k)}>
            {l}
          </button>
        ))}
      </div>
      <div className="cols">
        <div className="stack">
          <Slider id="r-n" label={<N />} value={n} min={1} max={8} step={1} onChange={setN} />
          <div className="panel" style={{ display: 'grid', placeItems: 'center', minHeight: 220 }}>
            <Prikker p={farget(m, n)} rute={24} merkelapp={`Ramme med side ${n + 1} og ${s} prikker`} />
          </div>
        </div>
        <div className="stack">
          <p>
            Figur {n} er en ramme med {n + 1} prikker langs hver side. Den har <b className="pen">{s}</b> prikker.
          </p>
          <div className="boxed math">
            {m === 'sider' && (
              <>
                <span className="mline"><F /> = 4 · <N /> = 4<N /></span>
                <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>Fire sider med {n} prikker hver: {s}.</span>
              </>
            )}
            {m === 'topp' && (
              <>
                <span className="mline"><F /> = 2(<N /> + 1) + 2(<N /> − 1)</span>
                <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>
                  To rader med {n + 1} prikker og to kolonner med {n - 1}: {2 * (n + 1)} + {2 * (n - 1)} = {s}.
                </span>
              </>
            )}
            {m === 'kvadrat' && (
              <>
                <span className="mline"><F /> = (<N /> + 1)<sup>2</sup> − (<N /> − 1)<sup>2</sup></span>
                <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>
                  Hele kvadratet minus det indre: {(n + 1) ** 2} − {(n - 1) ** 2} = {s}.
                </span>
              </>
            )}
          </div>
          <div className="panel math">
            <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>Algebraen viser at formlene er like:</span>
            <span className="mline">2(<N /> + 1) + 2(<N /> − 1) = 2<N /> + 2 + 2<N /> − 2 = 4<N /></span>
            <span className="mline">(<N /> + 1)<sup>2</sup> − (<N /> − 1)<sup>2</sup> = <N /><sup>2</sup> + 2<N /> + 1 − <N /><sup>2</sup> + 2<N /> − 1 = 4<N /></span>
          </div>
        </div>
      </div>
    </div>
  );
};
