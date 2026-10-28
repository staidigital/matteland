import React from 'react';
import { FunkGraf, type Punkt } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, V, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Trekant } from '../felles';

const P = (x: number) => 140 * x + 200;

export const BADMINTON_STEG = 3;

export const Badminton: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const punkter: Punkt[] = [];
  if (frag >= 1) punkter.push({ x: 0, y: 200, farge: 'pen', navn: '(0 , 200)', plass: 'over' });
  if (frag >= 2) punkter.push({ x: 10, y: 1600, farge: 'pen', navn: '(10 , 1600)', plass: 'venstre' });

  return (
    <div className="slide">
      <div className="kicker">Eksempel · Finne funksjonsuttrykket fra grafen</div>
      <h2>Hva koster det å spille badminton?</h2>
      <div className="cols">
        <div className="stack">
          <p>
            Klubben tar en fast månedspris pluss en sum per time vi leier bane. Finn <Fx f="P" /> for <X /> timer.
          </p>
          {frag >= 1 && (
            <div className="panel reveal">
              Grafen skjærer y-aksen i <b className="pen">200</b>. Konstantleddet er derfor 200.
            </div>
          )}
          {frag >= 2 && (
            <div className="panel reveal stack" style={{ gap: 6 }}>
              <p>
                Vi velger to punkter vi kan lese presist: (0 , 200) og (10 , 1600).
              </p>
              <p className="math">
                <V c="a" /> ={' '}
                <Frac
                  n={
                    <>
                      Δ<V c="y" />
                    </>
                  }
                  d={
                    <>
                      Δ<X />
                    </>
                  }
                />{' '}
                = <Frac n="1600 − 200" d="10 − 0" /> = <Frac n="1400" d="10" /> = <b className="c2">140</b>
              </p>
            </div>
          )}
          {frag >= 3 && (
            <div className="boxed reveal stack" style={{ gap: 6 }}>
              <span className="math">
                <Fx f="P" />
                <Op>=</Op>
                <span className="c2">140</span>
                <X /> + <span className="pen">200</span>
              </span>
              <p className="small">Månedsprisen er 200 kr, og det koster 140 kr per time å leie bane.</p>
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={BADMINTON_STEG} />
        </div>
        <FunkGraf
          kurver={[{ f: P, fra: 0, til: 11.5 }]}
          punkter={punkter}
          ekstra={(s) =>
            frag >= 2 && <Trekant s={s} x={0} y={200} dx={10} dy={1400} tekstX="Δx = 10" tekstY="Δy = 1400" />
          }
          xmin={-0.7}
          xmax={12}
          ymin={-80}
          ymax={1900}
          ysteg={100}
          yetikett={200}
          h={420}
          xnavn="timer"
          ynavn="kroner"
          title="Grafen til prisen for å spille badminton, som går gjennom (0, 200) og (10, 1600)"
        />
      </div>
    </div>
  );
};
