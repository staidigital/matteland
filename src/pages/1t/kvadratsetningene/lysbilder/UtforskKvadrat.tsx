import React, { useState } from 'react';
import { Poly, X, Xk } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Arealmodell } from '../../bokstavuttrykk/felles';

export const UtforskKvadrat: React.FC = () => {
  const [a, setA] = useState(3);
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Et kvadrat av en sum</div>
      <h2>Hvor mange deler består kvadratet av?</h2>
      <div className="cols">
        <Arealmodell a={a} b={a} merke />
        <div className="stack">
          <Slider id="k-a" label={<span>a</span>} value={a} min={1} max={6} step={1} onChange={setA} />
          <div className="boxed math">
            <span className="mline">(<X /> + {a})<sup>2</sup></span>
            <span className="mline">= <Xk /> + {a}<X /> + {a}<X /> + {a * a}</span>
            <span className="mline">= <span className="pen"><Poly a={1} b={2 * a} c={a * a} /></span></span>
          </div>
          <ol className="small" style={{ margin: 0, paddingLeft: '1.3em' }}>
            <li>Hvilken sammenheng er det mellom <i className="v">a</i> og tallet foran <X />?</li>
            <li>Hvilken sammenheng er det mellom <i className="v">a</i> og konstantleddet?</li>
            <li>Hvorfor er ikke <span className="nw">(<X /> + {a})<sup>2</sup></span> det samme som <span className="nw"><Xk /> + {a * a}</span>?</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
