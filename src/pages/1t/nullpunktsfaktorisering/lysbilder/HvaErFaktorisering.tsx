import React from 'react';
import { Factored, Op, Poly, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

export const HvaErFaktorisering: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Utgangspunkt</div>
    <h2>Å faktorisere betyr å skrive som et produkt</h2>
    <div className="cols">
      <div className="stack">
        <div className="panel math">
          <span className="mline">
            12 <Op>=</Op> 2 · 2 · 3
          </span>
          <span className="mline">
            6<X /> + 9 <Op>=</Op> 3(2
            <X /> + 3)
          </span>
          <span className="mline">
            <Poly a={1} b={-5} c={6} /> <Op>=</Op> <Factored a={1} r1={2} r2={3} />
          </span>
        </div>
        <p>Faktorisert form er nyttig når vi skal</p>
        <ul style={{ margin: 0 }}>
          <li>lese av nullpunktene direkte</li>
          <li>forkorte rasjonale uttrykk</li>
          <li>løse andregradsulikheter med fortegnslinje</li>
        </ul>
      </div>
      <div className="stack">
        <h3>Stemmer det? Gang ut og sjekk</h3>
        <div className="panel math">
          <span className="mline">
            <Factored a={1} r1={2} r2={3} />
          </span>
          {frag >= 1 && (
            <span className="mline reveal">
              <Op>=</Op>
              <X />·<X /> − 3<X /> − 2<X /> + 6
            </span>
          )}
          {frag >= 2 && (
            <span className="mline reveal">
              <Op>=</Op>
              <Poly a={1} b={-5} c={6} /> <span className="right">✓</span>
            </span>
          )}
        </div>
        <StepButtons frag={frag} setFrag={setFrag} steps={2} />
        <p className="muted small">
          Å gange ut er lett. Denne økta handler om veien tilbake: fra <Poly a={1} b={-5} c={6} /> til faktorene.
        </p>
      </div>
    </div>
  </div>
);
