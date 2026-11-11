import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Op, V, dec } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { tusen } from '../../skjaeringspunkter/felles';
import { Pot } from '../felles';

const P = (v: number) => 2669 * v ** 3.05;
/** Grafen tegnes i megawatt, så aksen får lesbare tall */
const Pm = (v: number) => P(v) / 1e6;

export const EKS19_STEG = 3;

export const Eksempel19: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [v, setV] = useState(8);

  return (
    <div className="slide">
      <div className="kicker">Eksempel 19 · Potensfunksjon som modell</div>
      <h2>Effekten til en vindturbin</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed math">
            <Fx f="P" x={<V c="v" />} />
            <Op>=</Op>
            <Pot a={2669} b={3.05} v="v" />, &nbsp;<V c="v" /> ∈ [0 , 14]
          </div>
          <p className="small muted">
            <i className="v">P</i> er effekten i watt, og <i className="v">v</i> er vindstyrken i meter per sekund.
          </p>
          {frag >= 1 && (
            <div className="panel reveal">
              <b>a</b> &nbsp;Variabelen <V c="v" /> står i <b>grunntallet</b>, og eksponenten 3,05 er fast. Da er det en
              potensfunksjon.
            </div>
          )}
          {frag >= 2 && (
            <div className="panel reveal">
              <b>b</b>
              <span className="mline math">
                <Fx f="P" x="4" /> = 2669 · 4<sup>3,05</sup> ≈ <b className="c1">{tusen(P(4))}</b> W ≈ 0,18 MW
              </span>
              <span className="mline math">
                <Fx f="P" x="12" /> = 2669 · 12<sup>3,05</sup> ≈ <b className="c2">{tusen(P(12))}</b> W ≈ 5,2 MW
              </span>
              <p className="small muted">Tre ganger så mye vind gir nesten 30 ganger så stor effekt.</p>
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={EKS19_STEG} />
        </div>
        <div className="stack">
          {frag < 3 ? (
            <>
              <FunkGraf
                kurver={[{ f: Pm, fra: 0, til: 14 }]}
                punkter={[
                  { x: v, y: Pm(v), farge: 'ink' },
                  ...(frag >= 2
                    ? [
                        { x: 4, y: Pm(4), farge: 'c1' },
                        { x: 12, y: Pm(12), farge: 'c2' },
                      ]
                    : []),
                ]}
                ekstra={(s) => <Hjelpelinje s={s} x1={v} y1={0} x2={v} y2={Pm(v)} farge="muted" />}
                xmin={-0.5}
                xmax={16}
                ymin={0}
                ymax={9}
                yetikett={1}
                h={340}
                xnavn="m/s"
                ynavn="MW"
                title="Grafen til P(v) = 2669 · v^3,05 for v fra 0 til 14, i megawatt"
              />
              <Slider id="p-v" label={<V c="v" />} value={v} min={0} max={14} step={0.5} onChange={setV} />
              <p className="math">
                <Fx f="P" x={dec(v)} /> ≈ <b>{tusen(P(v))}</b> W
              </p>
            </>
          ) : (
            <div className="stack reveal" style={{ gap: 10 }}>
              <h3>Løsning med programmering</h3>
              <pre className="kode" style={{ fontSize: '0.72em' }}>
                <span className="k">import</span> matplotlib.pyplot <span className="k">as</span> plt{'\n\n'}
                <span className="k">def</span> P(v):{'\n'}
                {'    '}
                <span className="k">return</span> 2669*v**3.05{'\n\n'}
                v = 0{'\n'}
                vsteg = 0.01{'\n'}
                v_verdier = []{'\n'}
                y_verdier = []{'\n\n'}
                <span className="k">while</span> v &lt;= 14:{'\n'}
                {'    '}v_verdier.append(v){'\n'}
                {'    '}y_verdier.append(P(v)){'\n'}
                {'    '}v = v + vsteg{'\n\n'}
                plt.plot(v_verdier, y_verdier){'\n'}
                plt.plot([4], [P(4)], <span className="s">"o"</span>){'\n'}
                plt.plot([12], [P(12)], <span className="s">"o"</span>){'\n'}
                plt.show(){'\n'}
                print(f<span className="s">"Effekten er {'{P(4):.0f}'} W når vindstyrken er 4 m/s"</span>){'\n'}
                print(f<span className="s">"og {'{P(12):.0f}'} W når vindstyrken er 12 m/s"</span>)
              </pre>
              <pre className="kode">
                Effekten er {Math.round(P(4))} W når vindstyrken er 4 m/s{'\n'}
                og {Math.round(P(12))} W når vindstyrken er 12 m/s
              </pre>
            </div>
          )}
          <p className="hintline">Oppgaver: 3.46–3.50</p>
        </div>
      </div>
    </div>
  );
};
