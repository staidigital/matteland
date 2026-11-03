import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, Gen, V, X, dec, par } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Pol, Symmetrilinje, polynom } from '../felles';

export const SYMLINJE_STEG = 1;

export const Symmetrilinja: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [a, setA] = useState(-1);
  const [b, setB] = useState(2);
  const [c, setC] = useState(3);
  const p = -b / (2 * a);

  return (
    <div className="slide">
      <div className="kicker">Symmetrilinje for parabel</div>
      <h2>Hvor ligger symmetrilinja?</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed">
            <span className="label">Symmetrilinje</span>
            <span className="math">
              <Fx /> = <Gen />
            </span>{' '}
            har symmetrilinja{' '}
            <span className="math nw">
              <X /> = −
              <Frac
                n={<V c="b" />}
                d={
                  <>
                    2<V c="a" />
                  </>
                }
              />
            </span>
          </div>
          <Slider
            id="sl-a"
            label={<span className="c2">a</span>}
            value={a}
            min={-3}
            max={3}
            step={0.5}
            onChange={(v) => setA(v || 0.5)}
          />
          <Slider id="sl-b" label={<span className="c1">b</span>} value={b} min={-6} max={6} step={1} onChange={setB} />
          <Slider
            id="sl-c"
            label={<span className="pen">c</span>}
            value={c}
            min={-5}
            max={5}
            step={1}
            onChange={setC}
          />
          <div className="panel math">
            <span className="mline">
              <Fx /> = <Pol k={[a, b, c]} />
            </span>
            <span className="mline">
              <X /> = −<Frac n={dec(b)} d={`2 · ${par(a).replace('.', ',')}`} /> = <b className="pen">{dec(p)}</b>
            </span>
          </div>
          <StepButtons frag={frag} setFrag={setFrag} steps={SYMLINJE_STEG} />
        </div>
        <div className="stack">
          <FunkGraf
            kurver={[{ f: polynom([a, b, c]) }]}
            punkter={[{ x: p, y: polynom([a, b, c])(p), farge: 'pen' }]}
            ekstra={(s) => (
              <>
                <Symmetrilinje sx={s.sx} H={s.H} p={p} />
                <text className="g-txt" x={s.sx(p) + 6} y={18} style={{ fill: 'var(--pen)' }}>
                  x = {dec(p)}
                </text>
              </>
            )}
            xmin={-6}
            xmax={6}
            ymin={-8}
            ymax={8}
            h={360}
            title={`Grafen til f(x) = ${dec(a)}x² + ${dec(b)}x + ${dec(c)} med symmetrilinja`}
          />
          {frag >= 1 && (
            <div className="panel reveal stack" style={{ gap: 6 }}>
              <h3>
                Hvorfor er{' '}
                <span className="math nw">
                  <Fx /> = <V c="a" />
                  <X />
                  <sup>2</sup>
                </span>{' '}
                symmetrisk om{' '}
                <span className="math nw">
                  <X /> = 0
                </span>
                ?
              </h3>
              <p className="math">
                <span className="mline">
                  <i className="v">f</i>(0 + <V c="r" />) = <V c="a" /> · (0 + <V c="r" />)<sup>2</sup> = <V c="a" />
                  <V c="r" />
                  <sup>2</sup>
                </span>
                <span className="mline">
                  <i className="v">f</i>(0 − <V c="r" />) = <V c="a" /> · (0 − <V c="r" />)<sup>2</sup> = <V c="a" />
                  <V c="r" />
                  <sup>2</sup>
                </span>
              </p>
              <p className="small muted">Beviset for den generelle formelen gjennomfører vi i oppgave 3.125.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
