import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Konsoll } from '../../../../../presentasjon/python/Konsoll';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

const RANGE: [string, string, string][] = [
  ['range(5)', '0, 1, 2, 3, 4', 'Fra 0 og opp til, men ikke med, 5.'],
  ['range(1, 6)', '1, 2, 3, 4, 5', 'Fra og med 1, til men ikke med 6.'],
  ['range(0, 20, 5)', '0, 5, 10, 15', 'Det tredje tallet er steget.'],
  ['range(10, 0, -1)', '10, 9, 8, …, 1', 'Negativt steg teller nedover.'],
];

export const RANGE_STEG = RANGE.length;

export const Range: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">range</div>
    <h2>Hvilke tall gir range?</h2>
    <div className="cols">
      <div className="stack" style={{ gap: 10 }}>
        <p>Bestem deg før du viser svaret.</p>
        {RANGE.map(([kode, tall, hvorfor], i) => (
          <div className="panel stack" key={kode} style={{ gap: 4, padding: '8px 16px' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <Kode inline>{kode}</Kode>
              {frag > i ? (
                <b className="reveal pen py-inline">{tall}</b>
              ) : (
                <button className="btn" onClick={() => setFrag(i + 1)}>
                  Vis
                </button>
              )}
            </div>
            {frag > i && <p className="small muted reveal">{hvorfor}</p>}
          </div>
        ))}
        <div className="boxed">
          <span className="label">Husk</span>
          <Kode inline>range(start, stopp, steg)</Kode>
          <p className="small">Stopp er aldri med. Utelater vi start, er den 0. Utelater vi steg, er det 1.</p>
        </div>
      </div>
      <div className="stack">
        <Konsoll forslag={['list(range(5))', 'list(range(1, 6))', 'list(range(0, 20, 5))', 'list(range(10, 0, -1))']} />
        <p className="hintline">
          <code>list( )</code> gjør tallene om til en liste, så vi kan se alle sammen.
        </p>
      </div>
    </div>
  </div>
);
