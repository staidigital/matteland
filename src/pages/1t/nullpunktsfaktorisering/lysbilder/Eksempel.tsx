import React from 'react';
import { Graf } from '../../../../presentasjon/Graf';
import { FactorForm, Factored, Frac, Poly, V, X, X1, X2 } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

export const EKSEMPEL_STEG = 5;

export const Eksempel: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel</div>
    <h2>
      Faktoriser{' '}
      <span className="math">
        <Poly a={2} b={-2} c={-12} />
      </span>
    </h2>
    <div className="cols wide-left">
      <div className="stack">
        <ol className="steps">
          {frag >= 1 && (
            <li className="reveal">
              <span className="no">1</span>
              <div>
                <p>Sett lik null og les av koeffisientene:</p>
                <p className="math">
                  <Poly a={2} b={-2} c={-12} /> = 0 &nbsp; gir &nbsp; <V c="a" /> = 2, <V c="b" /> = −2, <V c="c" /> = −12
                </p>
              </div>
            </li>
          )}
          {frag >= 2 && (
            <li className="reveal">
              <span className="no">2</span>
              <div>
                <p>abc-formelen:</p>
                <p className="math">
                  <X /> ={' '}
                  <Frac
                    n={
                      <>
                        2 ± √
                        <span className="rad">
                          (−2)<sup>2</sup> − 4·2·(−12)
                        </span>
                      </>
                    }
                    d="2·2"
                  />{' '}
                  = <Frac n="2 ± √100" d="4" /> = <Frac n="2 ± 10" d="4" />
                </p>
              </div>
            </li>
          )}
          {frag >= 3 && (
            <li className="reveal">
              <span className="no">3</span>
              <div>
                <p>To løsninger:</p>
                <p className="math">
                  <span className="c1">
                    <X1 /> = <Frac n="12" d="4" /> = 3
                  </span>{' '}
                  &nbsp; og &nbsp;{' '}
                  <span className="c2">
                    <X2 /> = <Frac n="−8" d="4" /> = −2
                  </span>
                </p>
              </div>
            </li>
          )}
          {frag >= 4 && (
            <li className="reveal">
              <span className="no">4</span>
              <div>
                <p>
                  Sett inn i{' '}
                  <span className="math">
                    <FactorForm />
                  </span>
                  :
                </p>
                <p className="math">
                  2(<X /> − <span className="c1">3</span>)(<X /> − (<span className="c2">−2</span>)) ={' '}
                </p>
                <div className="boxed math inline">
                  <Factored a={2} r1={3} r2={-2} />
                </div>
              </div>
            </li>
          )}
          {frag >= 5 && (
            <li className="reveal">
              <span className="no">5</span>
              <div>
                <p>Kontroll ved å gange ut:</p>
                <p className="math">
                  2(<X />
                  <sup>2</sup> + 2<X /> − 3<X /> − 6) = 2(<X />
                  <sup>2</sup> − <X /> − 6) = <Poly a={2} b={-2} c={-12} /> <span className="right">✓</span>
                </p>
              </div>
            </li>
          )}
        </ol>
        <StepButtons frag={frag} setFrag={setFrag} steps={EKSEMPEL_STEG} />
      </div>
      <div className="stack">
        <Graf
          a={2}
          b={-2}
          c={-12}
          ymin={-14}
          ymax={10}
          roots={
            frag >= 3
              ? [
                  { x: 3, cls: 'c1', name: 'x₁' },
                  { x: -2, cls: 'c2', name: 'x₂' },
                ]
              : []
          }
          title="Grafen til 2x² − 2x − 12"
        />
        <p className="small muted">
          {frag < 3 ? 'Nullpunktene dukker opp i grafen når vi har regnet dem ut.' : 'Grafen bekrefter nullpunktene 3 og −2.'}
        </p>
      </div>
    </div>
  </div>
);
