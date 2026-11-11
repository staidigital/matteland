import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op, dec, near } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { type Eksponent, Pot, eksponent, pot, verdi } from '../felles';

/** Funksjonene fra Utforsk-oppgaven i boka */
const BOKA: Eksponent[] = [1, 2, 3, [1, 2], [1, 3], -1, -2, [-1, 2]];

const beskriv = (b: number) =>
  near(b, 0)
    ? 'x⁰ = 1 for alle x. Grafen er en vannrett linje.'
    : b < 0
      ? 'Grafen avtar. Den går mot uendelig nær y-aksen og nærmer seg x-aksen langt ute.'
      : b < 1
        ? 'Grafen vokser, men blir stadig slakkere.'
        : near(b, 1)
          ? 'Grafen er den rette linja y = x.'
          : 'Grafen vokser, og blir stadig brattere.';

export const Utforsk: React.FC = () => {
  const [b, setB] = useState<Eksponent>(2);
  const [a, setA] = useState(1);
  const [linje, setLinje] = useState(true);
  const bv = verdi(b);

  return (
    <div className="slide">
      <div className="kicker">Utforsk</div>
      <h2>Hva forteller eksponenten?</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed math big">
            <Fx />
            <Op>=</Op>
            <Pot a={a} b={b} />
            <span className="small muted" style={{ fontFamily: 'var(--f-body)' }}>
              {' '}
              , <i className="v">x</i> &gt; 0
            </span>
          </div>
          <Slider
            id="ut-b"
            label={<span className="c1">b</span>}
            value={bv}
            min={-2}
            max={3}
            step={0.1}
            onChange={(v) => setB(+v.toFixed(1))}
          />
          <div className="row" role="group" aria-label="Eksponenter fra boka" style={{ gap: 6 }}>
            {BOKA.map((e) => {
              const pa = near(bv, verdi(e));
              return (
                <button key={eksponent(e)} className={'btn' + (pa ? ' on' : '')} aria-pressed={pa} onClick={() => setB(e)}>
                  <span className="math" style={{ fontSize: '1em' }}>
                    <i className="v">x</i>
                    <sup>{eksponent(e)}</sup>
                  </span>
                </button>
              );
            })}
          </div>
          <Slider id="ut-a" label={<span className="c2">a</span>} value={a} min={0.5} max={3} step={0.5} onChange={setA} />
          <div className="panel stack" style={{ gap: 8 }}>
            <p>
              <b className="c1">b = {dec(bv)}:</b> {beskriv(bv)}
            </p>
            <p>
              Grafen går gjennom <b className="pen nw">(1 , {dec(a)})</b>, fordi 1<sup>b</sup> = 1 for alle{' '}
              <i className="v">b</i>.
            </p>
          </div>
          <label className="check">
            <input type="checkbox" checked={linje} onChange={(e) => setLinje(e.target.checked)} />
            Vis linja y = x til sammenligning
          </label>
        </div>
        <FunkGraf
          kurver={[...(linje ? [{ f: (x: number) => x, farge: 'muted' }] : []), { f: pot(a, bv), fra: 0.001 }]}
          punkter={[{ x: 1, y: a, farge: 'pen' }]}
          xmin={-0.5}
          xmax={5}
          ymin={-0.5}
          ymax={5}
          xetikett={1}
          yetikett={1}
          h={440}
          title={`Grafen til f(x) = ${dec(a)} · x^${dec(bv)} for x > 0`}
        />
      </div>
    </div>
  );
};
