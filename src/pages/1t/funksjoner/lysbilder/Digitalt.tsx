import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx, Verditabell } from '../felles';

const f = (x: number) => x * x + 2 * x;
const XS = [-4, -3, -2, -1, 0, 1, 2];

export const DIGITALT_STEG = 2;

export const Digitalt: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Digitale verktøy</div>
    <h2>Funksjoner i Python og GeoGebra</h2>
    <div className="cols">
      <div className="stack">
        <p>
          Verditabell for{' '}
          <span className="math">
            <Fx /> = <X />
            <sup>2</sup> + 2<X />
          </span>{' '}
          med <X /> fra −4 til 2:
        </p>
        <pre className="kode">
          <span className="k">def</span> f(x):{'\n'}
          {'    '}
          <span className="k">return</span> x**2 + 2*x{'\n'}
          {'\n'}
          <span className="k">for</span> x <span className="k">in</span> range(-4, 3):{'\n'}
          {'    '}print(x, f(x))
        </pre>
        <p className="small muted">
          <code>def</code> definerer funksjonen, og <code>return</code> sier hvilken verdi den gir tilbake.{' '}
          <code>range(-4, 3)</code> stopper <i>før</i> 3, så siste <X />
          -verdi er 2.
        </p>
        <div className="panel stack" style={{ gap: 6 }}>
          <h3>I GeoGebra</h3>
          <p className="small">
            Algebrafeltet: <code>f(x) = x^2 + 2x</code> &nbsp; CAS: <code>f(x) := x^2 + 2x</code>
          </p>
          <p className="small muted">
            I CAS bruker vi <code>:=</code> når vi definerer en funksjon, og <code>=</code> når vi løser en likning.
            Skriver vi <code>f(3)</code>, får vi funksjonsverdien.
          </p>
        </div>
      </div>
      <div className="stack">
        {frag >= 1 && (
          <div className="reveal stack" style={{ gap: 6 }}>
            <h3>Utskriften blir en verditabell</h3>
            <Verditabell x={<X />} y={<Fx />} xs={XS} ys={XS.map(f)} />
          </div>
        )}
        {frag >= 2 && (
          <div className="reveal">
            <FunkGraf
              kurver={[{ f, fra: -4, til: 2 }]}
              punkter={XS.map((x) => ({ x, y: f(x), farge: 'pen' }))}
              xmin={-5}
              xmax={3}
              ymin={-2}
              ymax={9}
              h={300}
              xetikett={1}
              ynavn="f(x)"
              title="Grafen til f(x) = x² + 2x for x fra −4 til 2 med punktene fra verditabellen"
            />
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={DIGITALT_STEG} />
      </div>
    </div>
  </div>
);
