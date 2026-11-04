import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { V, minus } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { F } from '../felles';
import { diff } from '../oppgaver';

const N = () => <V c="n" />;
const NR = [1, 2, 3, 4, 5, 6];

export const Lineart: React.FC = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(1);
  const v = NR.map((n) => a * n + b);
  const d = diff(v);
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Lineære mønstre</div>
      <h2>Fast økning gir en lineær formel</h2>
      <div className="cols">
        <div className="stack">
          <Slider id="l-a" label={<V c="a" />} value={a} min={1} max={6} step={1} onChange={(v) => { setA(v); setB(Math.max(b, 1 - v)); }} />
          <Slider id="l-b" label={<V c="b" />} value={b} min={1 - a} max={6} step={1} onChange={setB} />
          <div className="boxed math">
            <F /> = {a === 1 ? '' : a}<N /> {b !== 0 && <>{b < 0 ? '−' : '+'} {Math.abs(b)}</>}
          </div>
          <div className="tablewrap">
            <table className="vt">
              <tbody>
                <tr>
                  <th><N /></th>
                  {NR.map((n) => <td key={n}>{n}</td>)}
                </tr>
                <tr>
                  <th><F /></th>
                  {v.map((t, i) => <td key={i}>{minus(t)}</td>)}
                </tr>
                <tr>
                  <th className="small">Økning</th>
                  <td />
                  {d.map((t, i) => <td key={i} className="on">{t}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Økningen er tallet <V c="a" /> foran <N />. Tallet <V c="b" /> finner vi fra første figur: <span className="math nw"><V c="b" /> = <F n="1" /> − <V c="a" /></span>.
          </p>
        </div>
        <div className="stack">
          <FunkGraf
            punkter={NR.map((n, i) => ({ x: n, y: v[i], farge: 'pen' }))}
            xmin={-1}
            xmax={7}
            ymin={-5}
            ymax={45}
            ysteg={5}
            yetikett={10}
            xetikett={1}
            xnavn="n"
            ynavn="F"
            h={320}
            title="Verdiene i mønsteret tegnet som punkter. De ligger på en rett linje."
          />
          <p className="small muted">
            Punktene ligger på en rett linje, men vi tegner bare punkter: <N /> er et figurnummer, så definisjonsmengden er ℕ.
          </p>
        </div>
      </div>
    </div>
  );
};
