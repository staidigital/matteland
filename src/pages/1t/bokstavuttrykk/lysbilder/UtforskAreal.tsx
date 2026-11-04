import React, { useState } from 'react';
import { Op, Poly, X } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Arealmodell } from '../felles';

export const UtforskAreal: React.FC = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  return (
    <div className="slide">
      <div className="kicker">Utforsk · To parenteser</div>
      <h2>Hver del ganges med hver del</h2>
      <div className="cols">
        <Arealmodell a={a} b={b} merke />
        <div className="stack">
          <Slider id="a-a" label={<span>a</span>} value={a} min={1} max={6} step={1} onChange={setA} />
          <Slider id="a-b" label={<span>b</span>} value={b} min={1} max={6} step={1} onChange={setB} />
          <div className="boxed math">
            <span className="mline">
              (<X /> + {a})(<X /> + {b})
            </span>
            <span className="mline">
              <Op>=</Op>
              <X /><sup>2</sup> + {b}<X /> + {a}<X /> + {a * b}
            </span>
            <span className="mline">
              <Op>=</Op>
              <span className="pen"><Poly a={1} b={a + b} c={a * b} /></span>
            </span>
          </div>
          <ol className="small" style={{ margin: 0, paddingLeft: '1.3em' }}>
            <li>Hvilke to tall bestemmer tallet foran <X />?</li>
            <li>Hvilke to tall bestemmer konstantleddet?</li>
            <li>Finn <i className="v">a</i> og <i className="v">b</i> slik at du får <Poly a={1} b={7} c={12} />.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
