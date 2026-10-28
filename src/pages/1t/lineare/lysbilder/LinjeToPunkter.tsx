import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, V, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Trekant } from '../felles';

const TREDJEDEL = <Frac n="1" d="3" />;
const Y = () => <V c="y" />;

export const LINJE_STEG = 3;

export const LinjeToPunkter: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Å finne likningen for en linje</div>
    <h2>Linja gjennom A(−3 , 5) og B(6 , 2)</h2>
    <div className="cols">
      <div className="stack">
        <ol className="steps">
          {frag >= 1 && (
            <li className="reveal">
              <span className="no">1</span>
              <div>
                <p>Stigningstallet:</p>
                <p className="math">
                  <V c="a" /> ={' '}
                  <Frac
                    n={
                      <>
                        Δ<Y />
                      </>
                    }
                    d={
                      <>
                        Δ<X />
                      </>
                    }
                  />{' '}
                  = <Frac n="2 − 5" d="6 − (−3)" /> = <Frac n="−3" d="9" /> = <span className="c2">−{TREDJEDEL}</span>
                </p>
              </div>
            </li>
          )}
          {frag >= 2 && (
            <li className="reveal">
              <span className="no">2</span>
              <div>
                <p>
                  Alle punkter på linja oppfyller <span className="math nw"><V c="y" /> = <V c="a" /><V c="x" /> + <V c="b" /></span>. Vi setter inn B(6 , 2):
                </p>
                <p className="math">
                  <span className="mline">
                    2 = −{TREDJEDEL} · 6 + <V c="b" />
                  </span>
                  <span className="mline">
                    2 = −2 + <V c="b" />
                  </span>
                  <span className="mline">
                    <V c="b" /> = 2 + 2 = <span className="pen">4</span>
                  </span>
                </p>
              </div>
            </li>
          )}
          {frag >= 3 && (
            <li className="reveal">
              <span className="no">3</span>
              <div className="boxed math">
                <Y /> = −{TREDJEDEL}
                <X /> + 4
              </div>
            </li>
          )}
        </ol>
        <StepButtons frag={frag} setFrag={setFrag} steps={LINJE_STEG} />
        <p className="small muted">Spiller det noen rolle om vi setter inn A eller B? Prøv med A!</p>
      </div>
      <FunkGraf
        kurver={frag >= 3 ? [{ f: (x) => -x / 3 + 4 }] : []}
        punkter={[
          { x: -3, y: 5, farge: 'pen', navn: 'A(−3 , 5)', plass: 'over' },
          { x: 6, y: 2, farge: 'pen', navn: 'B(6 , 2)', plass: 'over' },
          ...(frag >= 2 ? [{ x: 0, y: 4, navn: '(0 , 4)', plass: 'hoyre' as const }] : []),
        ]}
        ekstra={(s) => frag >= 1 && <Trekant s={s} x={-3} y={5} dx={9} dy={-3} tekstX="Δx = 9" tekstY="Δy = −3" />}
        xmin={-5}
        xmax={9}
        ymin={-1}
        ymax={7}
        h={380}
        title="Punktene A(−3, 5) og B(6, 2) og linja gjennom dem"
      />
    </div>
  </div>
);
