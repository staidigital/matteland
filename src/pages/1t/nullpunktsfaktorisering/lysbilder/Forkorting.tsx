import React from 'react';
import { Factored, Frac, Poly, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

export const FORKORTING_STEG = 3;

const Teller = () => <Poly a={1} b={-1} c={-6} />;
const Nevner = () => <Poly a={1} b={0} c={-9} />;

export const Forkorting: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Bruk</div>
    <h2>Hvorfor gidde? Forkorting av brøker</h2>
    <div className="stack">
      <p>
        Forkort{' '}
        <span className="math">
          <Frac n={<Teller />} d={<Nevner />} />
        </span>
      </p>
      <ol className="steps">
        {frag >= 1 && (
          <li className="reveal">
            <span className="no">1</span>
            <div>
              <p>Nullpunktsfaktoriser teller og nevner hver for seg:</p>
              <p className="math">
                <Teller /> = 0 gir <X /> = 3 eller <X /> = −2, så <Teller /> = <Factored a={1} r1={3} r2={-2} c1="" c2="" />
              </p>
              <p className="math">
                <Nevner /> = 0 gir <X /> = 3 eller <X /> = −3, så <Nevner /> = <Factored a={1} r1={3} r2={-3} c1="" c2="" />
              </p>
            </div>
          </li>
        )}
        {frag >= 2 && (
          <li className="reveal">
            <span className="no">2</span>
            <div>
              <p>Den felles faktoren kan strykes:</p>
              <p className="math big">
                <Frac
                  n={
                    <>
                      <span className="cancel">
                        (<X /> − 3)
                      </span>
                      (<X /> + 2)
                    </>
                  }
                  d={
                    <>
                      <span className="cancel">
                        (<X /> − 3)
                      </span>
                      (<X /> + 3)
                    </>
                  }
                />
              </p>
            </div>
          </li>
        )}
        {frag >= 3 && (
          <li className="reveal">
            <span className="no">3</span>
            <div>
              <div className="boxed math inline">
                <Frac n={<Teller />} d={<Nevner />} /> ={' '}
                <Frac
                  n={
                    <>
                      <X /> + 2
                    </>
                  }
                  d={
                    <>
                      <X /> + 3
                    </>
                  }
                />
                , &nbsp; <X /> ≠ ±3
              </div>
            </div>
          </li>
        )}
      </ol>
      <StepButtons frag={frag} setFrag={setFrag} steps={FORKORTING_STEG} />
      <p className="muted small">Faktorisert form brukes også i fortegnslinjer når vi løser andregradsulikheter.</p>
    </div>
  </div>
);
