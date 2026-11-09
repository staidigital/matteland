import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, dec, near } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Eksp, eksp } from '../felles';

/** Grunntallene fra Utforsk-oppgaven i boka */
const GRUNNTALL: [number, React.ReactNode][] = [
  [2, '2'],
  [0.5, <Frac n="1" d="2" />],
  [3, '3'],
  [1.5, <Frac n="3" d="2" />],
  [0.25, <Frac n="1" d="4" />],
  [0.8, <Frac n="4" d="5" />],
  [1, '1'],
];
const KONSTANTER = [1, 3, 0.5];

export const Utforsk: React.FC = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);
  const [spor, setSpor] = useState(true);

  const forklaring = near(b, 1)
    ? 'Når b = 1, er bˣ = 1 for alle x. Grafen er en vannrett linje.'
    : b > 1
      ? `b > 1: grafen stiger. Funksjonsverdien ganges med ${dec(b)} hver gang x øker med 1.`
      : `b < 1: grafen faller. Funksjonsverdien ganges med ${dec(b)} hver gang x øker med 1.`;

  return (
    <div className="slide">
      <div className="kicker">Utforsk</div>
      <h2>Hva gjør a og b med grafen?</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed math big">
            <Fx />
            <Op>=</Op>
            <Eksp a={a} b={b} />
          </div>
          <Slider id="ut-b" label={<span className="c1">b</span>} value={b} min={0.1} max={3} step={0.05} onChange={setB} />
          <div className="row" role="group" aria-label="Grunntall fra boka" style={{ gap: 6 }}>
            {GRUNNTALL.map(([v, l]) => (
              <button key={v} className={'btn' + (near(b, v) ? ' on' : '')} aria-pressed={near(b, v)} onClick={() => setB(v)}>
                <span className="math" style={{ fontSize: '1em' }}>
                  {l}
                </span>
              </button>
            ))}
          </div>
          <Slider id="ut-a" label={<span className="c2">a</span>} value={a} min={0.25} max={4} step={0.25} onChange={setA} />
          <div className="row" role="group" aria-label="Konstanter fra boka" style={{ gap: 6 }}>
            {KONSTANTER.map((v) => (
              <button key={v} className={'btn' + (near(a, v) ? ' on' : '')} aria-pressed={near(a, v)} onClick={() => setA(v)}>
                a = {dec(v)}
              </button>
            ))}
          </div>
          <div className="panel stack" style={{ gap: 8 }}>
            <p>
              <b className="c1">b = {dec(b)}:</b> {forklaring}
            </p>
            <p>
              <b className="c2">a = {dec(a)}:</b> grafen skjærer y-aksen i <span className="nw">(0 , {dec(a)})</span>.
            </p>
          </div>
          <label className="check">
            <input type="checkbox" checked={spor} onChange={(e) => setSpor(e.target.checked)} />
            Vis grafen til 2<sup><i className="v">x</i></sup> til sammenligning
          </label>
        </div>
        <FunkGraf
          kurver={[...(spor ? [{ f: eksp(1, 2), farge: 'muted' }] : []), { f: eksp(a, b) }]}
          punkter={[{ x: 0, y: a, farge: 'pen' }]}
          xmin={-4}
          xmax={4}
          ymin={-1}
          ymax={9}
          h={440}
          title={`Grafen til f(x) = ${dec(a)} · ${dec(b)}^x`}
        />
      </div>
    </div>
  );
};
