import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

const GJETT: [string, React.ReactNode, string, string][] = [
  ['print(2 * 3**2)', <>2 · 3<sup>2</sup></>, '18', 'Potens før ganging: 2 · 9.'],
  ['print(-3**2)', <>−3<sup>2</sup></>, '-9', 'Potensen regnes først, så minus: −(3²). Akkurat som i matematikken.'],
  ['print((-3)**2)', <>(−3)<sup>2</sup></>, '9', 'Med parentes er det −3 som opphøyes.'],
];

export const REKKEFOLGE_STEG = GJETT.length;

export const Rekkefolge: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Tallregning</div>
    <h2>Regnerekkefølge</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">Python følger de vanlige reglene</span>
          <ol className="stack" style={{ gap: 2, paddingLeft: '1.2em', margin: 0 }}>
            <li>Parenteser</li>
            <li>
              Potenser <code>**</code>
            </li>
            <li>
              Ganging og deling <code>*</code> <code>/</code>
            </li>
            <li>
              Pluss og minus <code>+</code> <code>-</code>
            </li>
          </ol>
        </div>
        <p>Vil vi regne i en annen rekkefølge, bruker vi parenteser.</p>
        {GJETT.map(([kode, matte, ut, hvorfor], i) => (
          <div className="panel stack" key={i} style={{ gap: 6, padding: '10px 16px' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className="row">
                <Kode inline>{kode}</Kode>
                <span className="math small muted">{matte}</span>
              </span>
              {frag <= i && (
                <button className="btn" onClick={() => setFrag(i + 1)}>
                  Vis svar
                </button>
              )}
            </div>
            {frag > i && (
              <p className="reveal small">
                <code className="py-inline pen">{ut}</code> &nbsp;{hvorfor}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="stack">
        <Kodeboks kode={'print(2 * 3**2)\nprint((2 * 3)**2)'} />
        <p className="hintline">Endre parentesene og se hvordan svaret endrer seg.</p>
      </div>
    </div>
  </div>
);
