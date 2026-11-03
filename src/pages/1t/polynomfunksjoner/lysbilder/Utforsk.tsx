import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op, dec } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Pol, polynom } from '../felles';

export const Utforsk: React.FC = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);
  const [spor, setSpor] = useState(true);

  const form =
    a === 0
      ? 'Når a = 0, er det ikke lenger en parabel, men en rett linje.'
      : `Parabelen vender den hule siden ${a > 0 ? 'opp (som ∪)' : 'ned (som ∩)'}${
          Math.abs(a) > 1 ? ' og er smalere enn x²' : Math.abs(a) < 1 ? ' og er bredere enn x²' : ''
        }.`;

  return (
    <div className="slide">
      <div className="kicker">Utforsk</div>
      <h2>Hva gjør a, b og c med grafen?</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed math big">
            <Fx />
            <Op>=</Op>
            <Pol k={[a, b, c]} />
          </div>
          <Slider
            id="ut-a"
            label={<span className="c2">a</span>}
            value={a}
            min={-3}
            max={3}
            step={0.25}
            onChange={setA}
          />
          <Slider
            id="ut-b"
            label={<span className="c1">b</span>}
            value={b}
            min={-4}
            max={4}
            step={0.5}
            onChange={setB}
          />
          <Slider
            id="ut-c"
            label={<span className="pen">c</span>}
            value={c}
            min={-5}
            max={5}
            step={0.5}
            onChange={setC}
          />
          <div className="panel stack" style={{ gap: 8 }}>
            <p>
              <b className="c2">a = {dec(a)}:</b> {form}
            </p>
            <p>
              <b className="pen">c = {dec(c)}:</b> grafen skjærer y-aksen i <span className="nw">(0 , {dec(c)})</span>.
            </p>
          </div>
          <label className="check">
            <input type="checkbox" checked={spor} onChange={(e) => setSpor(e.target.checked)} />
            Vis grafen til <i className="v">x</i>
            <sup>2</sup> til sammenligning
          </label>
        </div>
        <FunkGraf
          kurver={[...(spor ? [{ f: (x: number) => x * x, farge: 'muted' }] : []), { f: polynom([a, b, c]) }]}
          punkter={[{ x: 0, y: c, farge: 'pen' }]}
          xmin={-6}
          xmax={6}
          ymin={-7}
          ymax={7}
          h={420}
          title={`Grafen til f(x) = ${dec(a)}x² + ${dec(b)}x + ${dec(c)}`}
        />
      </div>
    </div>
  );
};
