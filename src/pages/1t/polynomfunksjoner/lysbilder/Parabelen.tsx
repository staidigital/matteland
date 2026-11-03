import React from 'react';
import { FunkGraf, type Kurve } from '../../../../presentasjon/FunkGraf';
import { Gen } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { polynom } from '../felles';

type Egenskap = { tekst: React.ReactNode; kurver: [number[], string][] };

const EGENSKAPER: Egenskap[] = [
  {
    tekst: (
      <>
        <b className="c1">a &gt; 0:</b> hul side opp (∪). <b className="c2">a &lt; 0:</b> hul side ned (∩).
      </>
    ),
    kurver: [
      [[1, -2, 0], 'c1'],
      [[-1, 2, 3], 'c2'],
    ],
  },
  {
    tekst: (
      <>
        Jo større tallverdi <i className="v">a</i> har, jo <b>smalere</b> blir parabelen.
      </>
    ),
    kurver: [
      [[0.3, 0, 0], 'muted'],
      [[1, 0, 0], 'ink'],
      [[3, 0, 0], 'c1'],
    ],
  },
  {
    tekst: (
      <>
        Endrer vi <i className="v">b</i>, flytter parabelen seg både sidelengs og opp eller ned.
      </>
    ),
    kurver: [
      [[1, -2, 1], 'c1'],
      [[1, 0, 1], 'ink'],
      [[1, 2, 1], 'c2'],
    ],
  },
  {
    tekst: (
      <>
        <i className="v">c</i> flytter parabelen bare opp eller ned. Grafen skjærer y-aksen i (0 ,{' '}
        <i className="v">c</i>).
      </>
    ),
    kurver: [
      [[-1, 0, 1], 'c1'],
      [[-1, 0, 3], 'ink'],
      [[-1, 0, 5], 'c2'],
    ],
  },
];

export const PARABEL_STEG = EGENSKAPER.length - 1;

export const Parabelen: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Andregradsfunksjoner</div>
    <h2>Parabelen</h2>
    <p>
      En andregradsfunksjon{' '}
      <span className="math nw">
        <Fx /> = <Gen />
      </span>{' '}
      har en <b>parabel</b> som graf.
    </p>
    <div className="grid2">
      {EGENSKAPER.slice(0, frag + 1).map((e, i) => (
        <div className="panel stack reveal" key={i} style={{ gap: 10 }}>
          <p>{e.tekst}</p>
          <FunkGraf
            kurver={e.kurver.map(([k, farge]): Kurve => ({ f: polynom(k), farge }))}
            xmin={-4}
            xmax={4}
            ymin={-3}
            ymax={6}
            h={130}
            xetikett={2}
            title="Parabler med ulike verdier av a, b og c"
          />
        </div>
      ))}
    </div>
    <StepButtons frag={frag} setFrag={setFrag} steps={PARABEL_STEG} />
  </div>
);
