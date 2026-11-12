import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { V, X } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';

type Kort = {
  navn: string;
  form: React.ReactNode;
  kjennetegn: string;
  f: (x: number) => number;
  xs: number[];
};

/** Små, faste avvik så punktene ikke ligger nøyaktig på kurven */
const STOY = [0.15, -0.2, 0.1, -0.1, 0.2, -0.15, 0.05, 0.1];

const KORT: Kort[] = [
  {
    navn: 'Lineær modell',
    form: (
      <>
        <Fx /> = <V c="a" />
        <X /> + <V c="b" />
      </>
    ),
    kjennetegn: 'Grafen er en rett linje. Fast økning per steg.',
    f: (x) => 0.7 * x + 1,
    xs: [0.5, 1.5, 2, 3, 4, 4.5, 5.5],
  },
  {
    navn: 'Eksponentiell modell',
    form: (
      <>
        <Fx /> = <V c="a" /> · <V c="b" />
        <sup>
          <i className="v">x</i>
        </sup>
      </>
    ),
    kjennetegn: 'Stiger eller faller med fast prosent. Går aldri gjennom origo.',
    f: (x) => 0.8 * 1.45 ** x,
    xs: [0, 1, 2, 3, 4, 5],
  },
  {
    navn: 'Andregradsmodell',
    form: (
      <>
        <Fx /> = <V c="a" />
        <X />
        <sup>2</sup> + <V c="b" />
        <X /> + <V c="c" />
      </>
    ),
    kjennetegn: 'Grafen har ett toppunkt eller ett bunnpunkt.',
    f: (x) => -0.6 * (x - 3) ** 2 + 5.5,
    xs: [0.8, 1.5, 2.2, 3, 3.6, 4.2, 5.2],
  },
  {
    navn: 'Tredjegradsmodell',
    form: (
      <>
        <Fx /> = <V c="a" />
        <X />
        <sup>3</sup> + <V c="b" />
        <X />
        <sup>2</sup> + <V c="c" />
        <X /> + <V c="d" />
      </>
    ),
    kjennetegn: 'Grafen kan ha både et toppunkt og et bunnpunkt.',
    f: (x) => -0.15 * (x - 1) * (x - 3.2) * (x - 6.5) + 3,
    xs: [0, 0.6, 1.4, 2.2, 3.4, 4.6, 5.4],
  },
  {
    navn: 'Potensmodell',
    form: (
      <>
        <Fx /> = <V c="a" />
        <X />
        <sup>
          <i className="v">b</i>
        </sup>
      </>
    ),
    kjennetegn: 'Grafen går gjennom origo.',
    f: (x) => (x >= 0 ? 2.2 * x ** 0.5 : NaN),
    xs: [0.5, 1, 1.6, 2.2, 3.5, 5],
  },
];

export const Modeller: React.FC = () => (
  <div className="slide">
    <div className="kicker">Ulike regresjonsmodeller</div>
    <h2>Kjenn igjen modellen på punktene</h2>
    <div className="grid3">
      {KORT.map((k) => (
        <div className="panel stack" key={k.navn} style={{ gap: 4 }}>
          <b>{k.navn}</b>
          <span className="math" style={{ fontSize: '1em' }}>
            {k.form}
          </span>
          <FunkGraf
            kurver={[{ f: k.f, fra: 0, farge: 'c1' }]}
            punkter={k.xs.map((x, i) => ({ x, y: k.f(x) + STOY[i], farge: 'c2' }))}
            xmin={-0.4}
            xmax={6.5}
            ymin={-0.4}
            ymax={7}
            xetikett={100}
            yetikett={100}
            h={210}
            title={`Eksempel på ${k.navn.toLowerCase()}`}
          />
          <span className="small">{k.kjennetegn}</span>
        </div>
      ))}
      <div className="boxed stack" style={{ gap: 8 }}>
        <span className="label">Tips</span>
        <p className="small">
          Vi kan ikke alltid se fra punktene hvilken modell som er best. Prøv flere typer, og velg den som både passer godt
          til punktene <b>og</b> gir mening i situasjonen.
        </p>
        <p className="small">En polynommodell kan også være av høyere grad enn 3.</p>
      </div>
    </div>
  </div>
);
