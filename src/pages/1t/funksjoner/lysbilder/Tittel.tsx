import React from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Op, X } from '../../../../presentasjon/matte';
import { Fx } from '../felles';

export const Tittel: React.FC = () => (
  <div className="slide">
    <div className="kicker">Matematikk 1T · Funksjoner</div>
    <h1>Funksjons&shy;begrepet</h1>
    <p className="lede">En funksjon er en regel som gjør om hver innverdi til nøyaktig én utverdi.</p>
    <div className="cols wide-left">
      <FunkGraf
        kurver={[{ f: (x) => 10 * x + 200 }]}
        punkter={[{ x: 3, y: 230, farge: 'pen', navn: '(3 , 230)', plass: 'hoyre' }]}
        ekstra={(s) => (
          <>
            <Hjelpelinje s={s} x1={3} y1={0} x2={3} y2={230} farge="c1" />
            <Hjelpelinje s={s} x1={3} y1={230} x2={0} y2={230} farge="c2" />
          </>
        )}
        xmin={-4}
        xmax={13}
        ymin={-60}
        ymax={360}
        ysteg={20}
        yetikett={100}
        ynavn="f(x)"
        title="Grafen til f(x) = 10x + 200 med punktet (3, 230) markert"
      />
      <div className="stack">
        <div className="boxed math big">
          <Fx /> <Op>=</Op> 10<X /> + 200
        </div>
        <div className="maskin">
          <div className="inn c1">3</div>
          <span className="pil">→</span>
          <div className="boks">
            <span className="lbl">Funksjonen</span>
            <i className="v">f</i>
          </div>
          <span className="pil">→</span>
          <div className="ut c2">230</div>
        </div>
        <p>
          Setter vi inn <span className="math c1">3</span>, får vi ut{' '}
          <span className="math c2">10 · 3 + 200 = 230</span>. Punktet (3 , 230) ligger på grafen.
        </p>
        <p className="hintline">
          Bla med <kbd>→</kbd> og <kbd>←</kbd> eller mellomrom. Trykk <kbd>?</kbd> for alle tastene.
        </p>
      </div>
    </div>
  </div>
);
