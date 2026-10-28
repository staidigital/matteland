import React, { useState } from 'react';
import { FunkGraf, type Punkt } from '../../../../presentasjon/FunkGraf';
import { Op, Poly, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Trekant } from '../felles';

const OPPG = [
  { navn: 'f', a: 3, b: 2, punkt: '(1 , 5)' },
  { navn: 'g', a: -1, b: 0, punkt: '(1 , −1)' },
];

export const TEGNE_STEG = 3;

export const TegneForHand: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [n, setN] = useState(0);
  const t = OPPG[n];
  const punkter: Punkt[] = [];
  if (frag >= 1) punkter.push({ x: 0, y: t.b, farge: 'pen', navn: `(0 , ${t.b})`, plass: 'venstre' });
  if (frag >= 2) punkter.push({ x: 1, y: t.a + t.b, farge: 'pen', navn: t.punkt, plass: 'hoyre' });

  return (
    <div className="slide">
      <div className="kicker">Eksempel · Tegne grafen for hånd</div>
      <h2>Start i konstantleddet, gå med stigningstallet</h2>
      <div className="seg" role="group" aria-label="Velg funksjon" style={{ alignSelf: 'start' }}>
        {OPPG.map((o, i) => (
          <button
            key={o.navn}
            aria-pressed={n === i}
            onClick={() => {
              setN(i);
              setFrag(0);
            }}
          >
            {'ab'[i]} &nbsp;{o.navn}(x) = {o.a === -1 ? '−x' : '3x + 2'}
          </button>
        ))}
      </div>
      <div className="cols">
        <div className="stack">
          <div className="boxed math big">
            <Fx f={t.navn} />
            <Op>=</Op>
            <Poly a={0} b={t.a} c={t.b} />
            {t.b === 0 && <span className="muted"> = −1<X /> + 0</span>}
          </div>
          <ol className="steps">
            {frag >= 1 && (
              <li className="reveal">
                <span className="no">1</span>
                <div>
                  Konstantleddet er <b className="pen">{t.b}</b>. Grafen går gjennom <b className="nw">(0 , {t.b})</b>
                  {t.b === 0 && ', altså origo'}.
                </div>
              </li>
            )}
            {frag >= 2 && (
              <li className="reveal">
                <span className="no">2</span>
                <div>
                  Stigningstallet er <b className="c2">{String(t.a).replace('-', '−')}</b>. Vi går{' '}
                  <span className="c1">1 til høyre</span> og{' '}
                  <span className="c2">
                    {Math.abs(t.a)} {t.a > 0 ? 'opp' : 'ned'}
                  </span>{' '}
                  til punktet <b className="nw">{t.punkt}</b>.
                </div>
              </li>
            )}
            {frag >= 3 && (
              <li className="reveal">
                <span className="no">3</span>
                <div>Vi trekker en rett linje gjennom de to punktene.</div>
              </li>
            )}
          </ol>
          <StepButtons frag={frag} setFrag={setFrag} steps={TEGNE_STEG} />
          <p className="small muted">Vi kunne også laget en verditabell og trukket linja gjennom punktene.</p>
        </div>
        <FunkGraf
          kurver={frag >= 3 ? [{ f: (x) => t.a * x + t.b }] : []}
          punkter={punkter}
          ekstra={(s) => frag >= 2 && <Trekant s={s} x={0} y={t.b} dx={1} dy={t.a} />}
          xmin={-4}
          xmax={5}
          ymin={-4}
          ymax={7}
          h={420}
          title={`Grafen til ${t.navn}(x) tegnet for hånd`}
        />
      </div>
    </div>
  );
};
