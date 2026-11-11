import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Rot, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx, Intervall, Mengde } from '../../funksjoner/felles';
import { nrot } from '../felles';

type Par = {
  navn: string;
  uttrykk: React.ReactNode;
  f: (x: number) => number;
  /** Tegneintervall, så grafen treffer endepunktene nøyaktig */
  fra?: number;
  til?: number;
  d: React.ReactNode;
  hvorfor: React.ReactNode;
};

const PAR: Par[] = [
  {
    navn: 'f',
    uttrykk: (
      <Rot>
        <X /> − 2
      </Rot>
    ),
    f: (x) => nrot(x - 2, 2),
    fra: 2,
    d: <Intervall a={2} b={Infinity} />,
    hvorfor: (
      <>
        <X /> − 2 ≥ 0 gir <X /> ≥ 2
      </>
    ),
  },
  {
    navn: 'g',
    uttrykk: (
      <Rot>
        25 − <X />
        <sup>2</sup>
      </Rot>
    ),
    f: (x) => nrot(25 - x * x, 2),
    fra: -5,
    til: 5,
    d: <Intervall a={-5} b={5} />,
    hvorfor: (
      <>
        25 − <X />
        <sup>2</sup> ≥ 0 gir −5 ≤ <X /> ≤ 5
      </>
    ),
  },
  {
    navn: 'h',
    uttrykk: (
      <Rot n="5">
        <X /> − 2
      </Rot>
    ),
    f: (x) => nrot(x - 2, 5),
    d: <>ℝ</>,
    hvorfor: 'femterota finnes for alle reelle tall',
  },
];

const FARGER = ['c1', 'c2', 'ink'];

export const EKS20_STEG = PAR.length;

export const Eksempel20: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel 20 · Definisjonsmengder</div>
    <h2>Kombiner uttrykk og definisjonsmengde</h2>
    <div className="cols">
      <div className="stack">
        <div className="row" style={{ gap: 8 }}>
          <span className="muted">Definisjonsmengdene:</span>
          <span className="pill math" style={{ fontSize: '1em' }}>
            <Intervall a={-5} b={5} />
          </span>
          <span className="pill math" style={{ fontSize: '1em' }}>
            <Intervall a={2} b={Infinity} />
          </span>
          <span className="pill math" style={{ fontSize: '1em' }}>
            ℝ
          </span>
        </div>
        {PAR.map((p, i) => (
          <div className="panel" key={p.navn}>
            <span className={'math ' + (FARGER[i] === 'ink' ? '' : FARGER[i])}>
              <Fx f={p.navn} /> = {p.uttrykk}
            </span>
            {frag > i && (
              <p className="reveal">
                <span className="math pen nw">
                  <Mengde m="D" f={p.navn} /> = {p.d}
                </span>
                <span className="small muted"> &nbsp;fordi {p.hvorfor}</span>
              </p>
            )}
          </div>
        ))}
        <StepButtons frag={frag} setFrag={setFrag} steps={EKS20_STEG} />
        <p className="hintline">Hint: kvadratrota av et negativt tall finnes ikke. Hva med femterota?</p>
      </div>
      <FunkGraf
        kurver={PAR.slice(0, frag).map((p, i) => ({ f: p.f, fra: p.fra, til: p.til, farge: FARGER[i] }))}
        xmin={-7}
        xmax={9}
        ymin={-3}
        ymax={6}
        h={420}
        title="Grafene til f(x) = √(x − 2), g(x) = √(25 − x²) og h(x) = femterota av (x − 2)"
      />
    </div>
  </div>
);
