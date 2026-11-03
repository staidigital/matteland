import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Op, X, dec } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { skjaering } from '../../skjaeringspunkter/felles';
import { Pol, polynom } from '../felles';

const K = [0.01, -0.37, 4.75, 50.75];
const V = polynom(K);
const X67 = skjaering(V, () => 67, 0, 12);

export const EKS16_STEG = 3;

export const Eksempel16: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [x, setX] = useState(3);

  return (
    <div className="slide">
      <div className="kicker">Eksempel 16 · Tredjegradsfunksjon som modell</div>
      <h2>Hvor lang er babyen?</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed math">
            <Fx f="V" />
            <Op>=</Op>
            <Pol k={K} />
          </div>
          <p className="small muted">
            <i className="v">V</i> er lengden i centimeter, og <X /> er antall måneder etter fødselen, <X /> ∈ [0 , 12].
          </p>
          <Slider id="v-x" label={<X />} value={x} min={0} max={12} step={0.5} onChange={setX} />
          <p className="math">
            <Fx f="V" x={dec(x)} /> ≈ <b>{dec(V(x), 1)}</b> cm
          </p>
          {frag >= 1 && (
            <div className="panel reveal">
              <b>a</b> &nbsp;Vi tegner linja <span className="math nw">y = 67</span> og finner skjæringspunktet{' '}
              <b className="pen nw">({dec(X67)} , 67)</b>. Barnet var 67 cm langt da det var omtrent {dec(X67, 1)}{' '}
              måneder gammelt.
              <p className="small muted">
                I GeoGebra: <code>V(x) = Funksjon(0.01x^3 - 0.37x^2 + 4.75x + 50.75, 0, 12)</code>
              </p>
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={EKS16_STEG} />
        </div>
        <div className="stack">
          {frag < 3 ? (
            <FunkGraf
              kurver={[{ f: V, fra: 0, til: 12 }]}
              punkter={[
                { x, y: V(x), farge: 'ink' },
                ...(frag >= 1
                  ? [{ x: X67, y: 67, farge: 'pen', navn: `(${dec(X67)} , 67)`, plass: 'over' as const }]
                  : []),
              ]}
              ekstra={(s) => (
                <>
                  <Hjelpelinje s={s} x1={x} y1={0} x2={x} y2={V(x)} farge="muted" />
                  {frag >= 1 && <Hjelpelinje s={s} x1={0} y1={67} x2={13} y2={67} farge="pen" />}
                </>
              )}
              xmin={-0.5}
              xmax={13}
              ymin={0}
              ymax={90}
              ysteg={5}
              yetikett={10}
              h={340}
              xnavn="måneder"
              ynavn="cm"
              title="Grafen til V(x) = 0,01x³ − 0,37x² + 4,75x + 50,75 for x fra 0 til 12"
            />
          ) : (
            <div className="stack reveal" style={{ gap: 10 }}>
              <h3>Løsning med programmering</h3>
              <pre className="kode">
                <span className="s"># Definerer funksjonen V</span>
                {'\n'}
                <span className="k">def</span> V(x):{'\n'}
                {'    '}
                <span className="k">return</span> 0.01*x**3 - 0.37*x**2 + 4.75*x + 50.75{'\n'}
                <span className="s"># Regner ut lengde ved 6 år, dvs. 72 måneder</span>
                {'\n'}lengde = V(72){'\n'}
                {'\n'}print(f
                <span className="s">'Etter funksjonen er barnets lengde: {'{lengde:.2f}'} cm, når det er 6 år.'</span>)
              </pre>
              <pre className="kode">Etter funksjonen er barnets lengde: 2207.15 cm, når det er 6 år.</pre>
              <p className="muted">En modell gjelder bare i definisjonsmengden. Her er det de tolv første månedene.</p>
            </div>
          )}
          {frag >= 2 && (
            <div className="panel reveal">
              <b>b</b> &nbsp;Seks år er 72 måneder:{' '}
              <span className="math nw">
                <Fx f="V" x="72" /> = {dec(V(72))}
              </span>
              . Over 22 meter er ikke mulig, så modellen kan ikke brukes for eldre barn.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
