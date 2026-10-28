import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op, X } from '../../../../presentasjon/matte';
import { Fx, Verditabell } from '../../funksjoner/felles';
import { Trekant } from '../felles';

const f = (x: number) => 2 * x - 3;

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Funksjoner</div>
    <h1>Lineære funksjoner</h1>
    <p className="lede">Grafen er en rett linje. To tall bestemmer alt: hvor bratt den er, og hvor den skjærer y-aksen.</p>
    <div className="cols wide-left">
      <FunkGraf
        kurver={[{ f }]}
        punkter={[{ x: 0, y: -3, farge: 'pen', navn: '(0 , −3)', plass: 'venstre' }]}
        ekstra={(s) => (
          <>
            <Trekant s={s} x={0} y={-3} dx={1} dy={2} />
            <Trekant s={s} x={2} y={1} dx={1} dy={2} />
          </>
        )}
        xmin={-3}
        xmax={5}
        ymin={-5}
        ymax={6}
        h={380}
        title="Grafen til f(x) = 2x − 3 med stigningstrekanter"
      />
      <div className="stack">
        <div className="boxed math big">
          <Fx />
          <Op>=</Op>
          <span className="c2">2</span>
          <X /> <span className="pen">− 3</span>
        </div>
        <Verditabell x={<X />} y={<Fx />} xs={[0, 1, 2, 3]} ys={[-3, -1, 1, 3]} />
        <p>
          Hver gang <X /> øker med <span className="c1">1</span>, øker funksjonsverdien med{' '}
          <span className="c2">2</span>. Linja skjærer y-aksen i <span className="pen">−3</span>.
        </p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
