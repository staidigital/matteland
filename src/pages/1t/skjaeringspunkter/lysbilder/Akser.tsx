import React, { useState } from 'react';
import { FunkGraf, type Punkt } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, Poly, V, X } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';

type Plass = Punkt['plass'];
type Tilfelle = {
  knapp: string;
  f: (x: number) => number;
  uttrykk: React.ReactNode;
  /** Utregningen av f(0) */
  yakse: React.ReactNode;
  /** Linjene i likningen f(x) = 0 */
  nullpunkt: React.ReactNode[];
  y0: number;
  nullpunkter: number[];
  plassY: Plass;
  plassX: Plass[];
};

const TO_TREDJEDELER = <Frac n="2" d="3" />;

const TILFELLER: Tilfelle[] = [
  {
    knapp: '2x + 4',
    f: (x) => 2 * x + 4,
    uttrykk: <Poly a={0} b={2} c={4} />,
    yakse: (
      <>
        2 · 0 + 4 = <span className="c2">4</span>
      </>
    ),
    nullpunkt: [
      <>
        2<X /> + 4 = 0
      </>,
      <>
        2<X /> = −4
      </>,
      <>
        <X /> = <span className="c1">−2</span>
      </>,
    ],
    y0: 4,
    nullpunkter: [-2],
    plassY: 'hoyre',
    plassX: ['hoyre'],
  },
  {
    knapp: '−⅔x + 4',
    f: (x) => (-2 / 3) * x + 4,
    uttrykk: (
      <>
        −{TO_TREDJEDELER}
        <X /> + 4
      </>
    ),
    yakse: (
      <>
        −{TO_TREDJEDELER} · 0 + 4 = <span className="c2">4</span>
      </>
    ),
    nullpunkt: [
      <>
        −{TO_TREDJEDELER}
        <X /> + 4 = 0 &nbsp;<span className="small muted">| · 3</span>
      </>,
      <>
        −2<X /> + 12 = 0
      </>,
      <>
        −2<X /> = −12
      </>,
      <>
        <X /> = <span className="c1">6</span>
      </>,
    ],
    y0: 4,
    nullpunkter: [6],
    plassY: 'over',
    plassX: ['over'],
  },
  {
    knapp: 'x² − 2x − 3',
    f: (x) => x * x - 2 * x - 3,
    uttrykk: <Poly a={1} b={-2} c={-3} />,
    yakse: (
      <>
        0<sup>2</sup> − 2 · 0 − 3 = <span className="c2">−3</span>
      </>
    ),
    nullpunkt: [
      <>
        <Poly a={1} b={-2} c={-3} /> = 0
      </>,
      <>
        (<X /> + 1)(<X /> − 3) = 0
      </>,
      <>
        <X /> = <span className="c1">−1</span> eller <X /> = <span className="c1">3</span>
      </>,
    ],
    y0: -3,
    nullpunkter: [-1, 3],
    plassY: 'hoyre',
    plassX: ['venstre', 'hoyre'],
  },
  {
    knapp: '5',
    f: () => 5,
    uttrykk: <>5</>,
    yakse: <span className="c2">5</span>,
    nullpunkt: [
      <>5 = 0</>,
      <span key="tekst" className="small" style={{ fontFamily: 'var(--f-body)' }}>
        Dette er aldri sant. Grafen er parallell med <X />
        -aksen, så <i className="v">f</i> har <b>ingen nullpunkter</b>.
      </span>,
    ],
    y0: 5,
    nullpunkter: [],
    plassY: 'over',
    plassX: [],
  },
];

export const Akser: React.FC = () => {
  const [n, setN] = useState(0);
  const t = TILFELLER[n];

  return (
    <div className="slide">
      <div className="kicker">Skjæring med aksene</div>
      <h2>
        Én koordinat er alltid null
      </h2>
      <div className="seg" role="group" aria-label="Velg funksjon" style={{ alignSelf: 'start' }}>
        {TILFELLER.map((k, i) => (
          <button key={i} aria-pressed={n === i} onClick={() => setN(i)}>
            f(x) = {k.knapp}
          </button>
        ))}
      </div>
      <div className="cols">
        <div className="stack">
          <div className="boxed math big">
            <Fx />
            <Op>=</Op>
            {t.uttrykk}
          </div>
          <div className="panel stack" style={{ gap: 6 }}>
            <h3 className="c2">Skjæring med y-aksen</h3>
            <p className="small muted">
              Langs hele y-aksen er <X /> = 0. Vi regner ut <Fx x="0" />.
            </p>
            <p className="math">
              <Fx x="0" /> = {t.yakse}
            </p>
            <p>
              Punktet er{' '}
              <b className="c2 nw">
                (0 , {String(t.y0).replace('-', '−')})
              </b>
              .
            </p>
          </div>
          <div className="panel stack" style={{ gap: 6 }}>
            <h3 className="c1">Nullpunkter</h3>
            <p className="small muted">
              Langs hele x-aksen er <V c="y" /> = 0. Vi løser <Fx /> = 0.
            </p>
            <p className="math">
              {t.nullpunkt.map((l, i) => (
                <span className="mline" key={i}>
                  {l}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="stack">
          <FunkGraf
            kurver={[{ f: t.f }]}
            punkter={[
              { x: 0, y: t.y0, farge: 'c2', navn: `(0 , ${String(t.y0).replace('-', '−')})`, plass: t.plassY },
              ...t.nullpunkter.map((x, i) => ({
                x,
                y: 0,
                farge: 'c1',
                navn: `(${String(x).replace('-', '−')} , 0)`,
                plass: t.plassX[i],
              })),
            ]}
            xmin={-5}
            xmax={8}
            ymin={-5}
            ymax={8}
            title={`Grafen til f(x) = ${t.knapp} med skjæringspunktene med aksene markert`}
          />
          <div className="boxed">
            <span className="label">Husk</span>
            <span className="math">
              <X /> = 0
            </span>{' '}
            på y-aksen. &nbsp;
            <span className="math">
              <V c="y" /> = 0
            </span>{' '}
            på x-aksen.
          </div>
        </div>
      </div>
    </div>
  );
};
