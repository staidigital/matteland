import React, { useState } from 'react';
import { Frac, dec } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Brokstolpe } from '../felles';

export const Utforsk: React.FC = () => {
  const [n, setN] = useState(2);
  const [d, setD] = useState(3);
  const [k, setK] = useState(2);
  return (
    <div className="slide">
      <div className="kicker">Utforsk</div>
      <h2>Samme verdi, ulik skrivemåte</h2>
      <div className="cols">
        <div className="stack">
          <Slider id="u-n" label="teller" value={n} min={1} max={d} step={1} onChange={setN} />
          <Slider id="u-d" label="nevner" value={d} min={2} max={8} step={1} onChange={(v) => { setD(v); setN(Math.min(n, v)); }} />
          <Slider id="u-k" label="ganger" value={k} min={2} max={5} step={1} onChange={setK} />
          <div className="boxed math big">
            <Frac n={n} d={d} /> = <Frac n={`${n} · ${k}`} d={`${d} · ${k}`} /> = <span className="pen"><Frac n={n * k} d={d * k} /></span>
          </div>
        </div>
        <div className="stack">
          <Brokstolpe n={n} d={d} />
          <Brokstolpe n={n * k} d={d * k} farge="var(--pen)" />
          <p>
            Vi deler hver del i {k}, så det blir {k} ganger så mange deler, men de er tilsvarende mindre. Verdien er{' '}
            <b>{dec(n / d, 3)}</b> hele tiden.
          </p>
          <ol className="small" style={{ margin: 0, paddingLeft: '1.3em' }}>
            <li>Hvorfor endres ikke verdien når du ganger teller og nevner med samme tall?</li>
            <li>Hva skjer hvis du bare ganger telleren?</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
