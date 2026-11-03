import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { ekstremalpunkter, polynom } from '../felles';

/** Femtegradspolynom som snur fire ganger, med et lite toppunkt som ligger lavere enn det store */
const f = (x: number) => 0.6 * (polynom([0.2, -1.85, 16.09 / 3, -3.792, -3.9312, 0])(x) + 5.3);
const EKSTREMAL = ekstremalpunkter(f, -1.5, 4.5);

export const EKSTREMAL_STEG = 1;

export const Ekstremalpunkter: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Ekstremalpunkter</div>
    <h2>Toppunkter og bunnpunkter</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">Ekstremalpunkter</span>
          Et <b>toppunkt</b> er et punkt på grafen med høyere y-verdi enn alle punkter <i>i nærheten</i>. Et{' '}
          <b>bunnpunkt</b> har lavere y-verdi enn alle punkter i nærheten. Sammen kaller vi dem <b>ekstremalpunkter</b>.
        </div>
        <p className="muted">
          Det lille toppunktet til høyre er ikke det høyeste punktet på grafen. Det er likevel høyere enn alle punktene
          rundt seg.
        </p>
        {frag >= 1 && (
          <div className="panel reveal stack" style={{ gap: 8 }}>
            <h3>Parabelen har bare ett ekstremalpunkt</h3>
            <p>
              Punktet ligger på symmetrilinja. Er tallet foran <i className="v">x</i>
              <sup>2</sup> positivt, vender parabelen den hule siden opp (∪) og har et <b>bunnpunkt</b>. Er tallet
              negativt (∩), har den et <b>toppunkt</b>.
            </p>
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={EKSTREMAL_STEG} />
      </div>
      <FunkGraf
        kurver={[{ f }]}
        punkter={EKSTREMAL.map((p) => ({
          x: p.x,
          y: p.y,
          farge: p.topp ? 'c2' : 'c1',
          navn: p.topp ? 'toppunkt' : 'bunnpunkt',
          plass: p.topp ? ('over' as const) : ('under' as const),
        }))}
        xmin={-1.5}
        xmax={4.5}
        ymin={-2}
        ymax={5}
        xetikett={1}
        h={420}
        title="Graf med to toppunkter og to bunnpunkter"
      />
    </div>
  </div>
);
