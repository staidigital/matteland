import React, { useState } from 'react';
import { Frac, V } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Produktmodell } from '../felles';
import { forkort } from '../oppgaver';

export const Gange: React.FC = () => {
  const [n1, setN1] = useState(2);
  const [d1, setD1] = useState(3);
  const [n2, setN2] = useState(3);
  const [d2, setD2] = useState(4);
  const s = forkort({ n: n1 * n2, d: d1 * d2 });
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Multiplikasjon</div>
      <h2>Teller ganger teller, nevner ganger nevner</h2>
      <div className="boxed math">
        <span className="label">Regel</span>
        <Frac n={<V c="a" />} d={<V c="b" />} /> · <Frac n={<V c="c" />} d={<V c="d" />} /> ={' '}
        <Frac n={<><V c="a" /> · <V c="c" /></>} d={<><V c="b" /> · <V c="d" /></>} />
      </div>
      <div className="cols">
        <Produktmodell n1={n1} d1={d1} n2={n2} d2={d2} />
        <div className="stack">
          <Slider id="g-n1" label={<span className="c1">teller</span>} value={n1} min={1} max={d1} step={1} onChange={setN1} />
          <Slider id="g-d1" label={<span className="c1">nevner</span>} value={d1} min={2} max={6} step={1} onChange={(v) => { setD1(v); setN1(Math.min(n1, v)); }} />
          <Slider id="g-n2" label={<span className="c2">teller</span>} value={n2} min={1} max={d2} step={1} onChange={setN2} />
          <Slider id="g-d2" label={<span className="c2">nevner</span>} value={d2} min={2} max={6} step={1} onChange={(v) => { setD2(v); setN2(Math.min(n2, v)); }} />
          <div className="panel math">
            <Frac n={n1} d={d1} /> · <Frac n={n2} d={d2} /> = <Frac n={n1 * n2} d={d1 * d2} />
            {s.d !== d1 * d2 && <> = <span className="pen">{s.d === 1 ? s.n : <Frac n={s.n} d={s.d} />}</span></>}
          </div>
          <p className="small">
            Kvadratet er delt i {d1 * d2} ruter, og {n1 * n2} av dem er i overlappet. Det er derfor nevnerne og tellerne ganges hver for seg.
          </p>
          <p className="small muted">
            Forkort gjerne før du ganger: <span className="math nw"><Frac n="4" d="9" /> · <Frac n="3" d="8" /> = <Frac n="1" d="3" /> · <Frac n="1" d="2" /> = <Frac n="1" d="6" /></span>
          </p>
        </div>
      </div>
    </div>
  );
};
