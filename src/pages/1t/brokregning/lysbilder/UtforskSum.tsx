import React, { useState } from 'react';
import { Frac } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Brokstolpe } from '../felles';
import { forkort, mfm } from '../oppgaver';

export const UtforskSum: React.FC = () => {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [c, setC] = useState(1);
  const [d, setD] = useState(4);
  const fn = mfm(b, d);
  const a2 = (a * fn) / b;
  const c2 = (c * fn) / d;
  const s = forkort({ n: a2 + c2, d: fn });
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Fellesnevner</div>
      <h2>Like store deler kan telles sammen</h2>
      <div className="cols">
        <div className="stack">
          <Slider id="s-a" label={<span className="c1">teller</span>} value={a} min={1} max={b} step={1} onChange={setA} />
          <Slider id="s-b" label={<span className="c1">nevner</span>} value={b} min={2} max={6} step={1} onChange={(v) => { setB(v); setA(Math.min(a, v)); }} />
          <Slider id="s-c" label={<span className="c2">teller</span>} value={c} min={1} max={d} step={1} onChange={setC} />
          <Slider id="s-d" label={<span className="c2">nevner</span>} value={d} min={2} max={6} step={1} onChange={(v) => { setD(v); setC(Math.min(c, v)); }} />
          <div className="boxed math">
            <span className="c1"><Frac n={a} d={b} /></span> + <span className="c2"><Frac n={c} d={d} /></span> ={' '}
            <span className="c1"><Frac n={a2} d={fn} /></span> + <span className="c2"><Frac n={c2} d={fn} /></span> ={' '}
            <Frac n={a2 + c2} d={fn} />
            {s.n !== a2 + c2 && <> = <span className="pen">{s.d === 1 ? s.n : <Frac n={s.n} d={s.d} />}</span></>}
          </div>
        </div>
        <div className="stack">
          <Brokstolpe n={a} d={b} farge="var(--r1)" />
          <Brokstolpe n={c} d={d} farge="var(--r2)" />
          <p className="small muted">Delene er ulikt store. Med fellesnevner {fn} blir alle delene like store:</p>
          <Brokstolpe n={a2} d={fn} farge="var(--r1)" />
          <Brokstolpe n={c2} d={fn} farge="var(--r2)" />
          <p className="small muted">Til sammen:</p>
          <Brokstolpe n={a2 + c2} d={fn} farge="var(--pen)" />
        </div>
      </div>
    </div>
  );
};
