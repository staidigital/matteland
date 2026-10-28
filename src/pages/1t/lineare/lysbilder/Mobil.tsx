import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Op, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Trekant } from '../felles';

const P = (x: number) => 149 + 30 * x;

export const MOBIL_STEG = 2;

export const Mobil: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [x, setX] = useState(3);

  return (
    <div className="slide">
      <div className="kicker">Eksempel · Stigningstall og konstantledd i praksis</div>
      <h2>Mobilabonnementet til Adam</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed math big">
            <Fx f="P" />
            <Op>=</Op>
            <span className="pen">149</span> + <span className="c2">30</span>
            <X />
          </div>
          <p className="small muted">
            <i className="v">P</i> er prisen i kroner, og <X /> er antall gigabyte mobildata.
          </p>
          <Slider id="mob-x" label={<X />} value={x} min={0} max={10} step={1} onChange={setX} />
          <p className="math">
            <Fx f="P" x={x} /> = 149 + 30 · {x} = <b>{P(x)}</b> kr
          </p>
          {frag >= 1 && (
            <div className="panel reveal">
              <b>a</b> &nbsp;Stigningstallet er <b className="c2">30</b>, og konstantleddet er <b className="pen">149</b>.
            </div>
          )}
          {frag >= 2 && (
            <div className="panel reveal">
              <b>b</b> &nbsp;Adam betaler <span className="c2">30 kr per gigabyte</span>. I tillegg har abonnementet en
              fastpris på <span className="pen">149 kr i måneden</span>.
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={MOBIL_STEG} />
        </div>
        <FunkGraf
          kurver={[{ f: P, fra: 0 }]}
          punkter={[
            { x: 0, y: 149, farge: 'pen' },
            { x, y: P(x), farge: 'ink', navn: `(${x} , ${P(x)})`, plass: 'venstre' },
          ]}
          ekstra={(s) => (
            <>
              <Hjelpelinje s={s} x1={x} y1={0} x2={x} y2={P(x)} farge="muted" />
              {frag >= 1 && <Trekant s={s} x={7} y={P(7)} dx={1} dy={30} tekstX="1 GB" tekstY="30 kr" />}
            </>
          )}
          xmin={-0.5}
          xmax={10.5}
          ymin={-20}
          ymax={500}
          xsteg={1}
          ysteg={50}
          yetikett={100}
          h={420}
          xnavn="GB"
          ynavn="kroner"
          title="Grafen til P(x) = 149 + 30x"
        />
      </div>
    </div>
  );
};
