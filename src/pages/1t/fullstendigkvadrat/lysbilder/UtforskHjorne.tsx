import React, { useState } from 'react';
import { Poly, X, Xk } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Hjorne } from '../felles';

export const UtforskHjorne: React.FC = () => {
  const [b, setB] = useState(6);
  const [fylt, setFylt] = useState(false);
  const h = b / 2;
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Hva mangler?</div>
      <h2>Et hjørne fra å være et kvadrat</h2>
      <div className="cols">
        <Hjorne b={b} fylt={fylt} />
        <div className="stack">
          <Slider id="h-b" label={<i className="v">b</i>} value={b} min={2} max={10} step={2} onChange={setB} />
          <div className="boxed math">
            <span className="mline"><Xk /> + {b}<X /> + {fylt ? <span className="pen">{h * h}</span> : '?'}</span>
            {fylt && <span className="mline reveal">= (<X /> + {h})<sup>2</sup></span>}
          </div>
          <div className="row">
            <button className="btn primary" onClick={() => setFylt(!fylt)}>
              {fylt ? 'Ta bort hjørnet' : 'Fyll hjørnet'}
            </button>
          </div>
          <ol className="small" style={{ margin: 0, paddingLeft: '1.3em' }}>
            <li>Hvor brede er stripene når vi deler {b}<X /> i to like deler?</li>
            <li>Hvor stort er hjørnet som mangler?</li>
            <li>Hva mangler <Poly a={1} b={14} c={0} /> for å bli et kvadrat?</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
