import React, { useState } from 'react';
import { Graf, type Rot as Nullpunkt } from '../../../../presentasjon/Graf';
import { minus, Num, par, Poly, Rot, V, X } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

export const Diskriminanten: React.FC = () => {
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);
  const D = b * b - 4 * a * c;
  const rot = Math.sqrt(Math.max(D, 0));
  const [u, w] = [(-b - rot) / (2 * a), (-b + rot) / (2 * a)];
  const [r1, r2] = [Math.min(u, w), Math.max(u, w)];

  const nullpunkter: Nullpunkt[] =
    D > 0
      ? [
          { x: r1, cls: 'c1', name: 'x₁' },
          { x: r2, cls: 'c2', name: 'x₂' },
        ]
      : D === 0
        ? [{ x: r1, cls: 'c1', name: 'x₁ = x₂' }]
        : [];
  const tilfelle =
    D > 0
      ? { t: 'D > 0: to løsninger', farge: 'var(--r1)' }
      : D === 0
        ? { t: 'D = 0: én løsning', farge: 'var(--pen)' }
        : { t: 'D < 0: ingen løsning', farge: 'var(--muted)' };

  return (
    <div className="slide">
      <div className="kicker">Diskriminanten</div>
      <h2>Tallet under rottegnet avgjør</h2>
      <div className="cols">
        <div className="stack">
          <p>
            Tallet <span className="math nw"><V c="D" /> = <V c="b" /><sup>2</sup> − 4<V c="a" /><V c="c" /></span> kalles <b>diskriminanten</b>. Vi kan ikke ta kvadratroten av et negativt tall.
          </p>
          <Slider id="d-a" label={<V c="a" />} value={a} min={-3} max={3} step={1} onChange={(v) => setA(v === 0 ? (a > 0 ? -1 : 1) : v)} />
          <Slider id="d-b" label={<V c="b" />} value={b} min={-6} max={6} step={1} onChange={setB} />
          <Slider id="d-c" label={<V c="c" />} value={c} min={-6} max={6} step={1} onChange={setC} />
          <p className="math"><Poly a={a} b={b} c={c} /> = 0</p>
          <p className="math"><V c="D" /> = {par(b)}<sup>2</sup> − 4 · {par(a)} · {par(c)} = {minus(D)}</p>
          <p><b style={{ color: tilfelle.farge }}>{tilfelle.t}</b></p>
          {D > 0 && (
            <p className="math">
              <span className="c1"><X /> = <Num v={r1} /></span> eller <span className="c2"><X /> = <Num v={r2} /></span>
              {!Number.isInteger(rot) && <span className="small muted"> &nbsp;(<Rot>{D}</Rot> går ikke opp)</span>}
            </p>
          )}
          {D === 0 && <p className="math c1"><X /> = <Num v={r1} /></p>}
        </div>
        <Graf a={a} b={b} c={c} ymin={-12} ymax={12} roots={nullpunkter} title="Grafen til uttrykket med nullpunktene markert" />
      </div>
    </div>
  );
};
