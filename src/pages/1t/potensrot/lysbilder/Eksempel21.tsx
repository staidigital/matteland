import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, Rot, X, dec } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';

const v = (x: number) => 4.4 * Math.sqrt(x);
const HOYDE = (25 / 4.4) ** 2;

export const EKS21_STEG = 3;

export const Eksempel21: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [x, setX] = useState(10);

  return (
    <div className="slide">
      <div className="kicker">Eksempel 21 · Rotfunksjon som modell</div>
      <h2>Hvor høy er brua?</h2>
      <div className="cols">
        <div className="stack">
          <p>
            Vi slipper en stein fra en bru. Uten luftmotstand er farten i meter per sekund etter <X /> meter fall
          </p>
          <div className="boxed math">
            <Fx f="v" />
            <Op>=</Op>
            4,4
            <Rot>
              <X />
            </Rot>
          </div>
          <Slider id="bru-x" label={<X />} value={x} min={0} max={50} step={1} onChange={setX} />
          <p className="math">
            <Fx f="v" x={x} /> ≈ <b>{dec(v(x), 1)}</b> m/s
          </p>
          {frag >= 1 && (
            <div className="panel reveal">
              <b>a</b> &nbsp;I GeoGebra: <code>Funksjon(4.4*sqrt(x), 0, 50)</code>
            </div>
          )}
          {frag >= 2 && (
            <div className="panel reveal">
              <b>b</b> &nbsp;Steinen treffer vannet med 25 m/s. Vi tegner <span className="math nw">y = 25</span> og
              finner skjæringspunktet <b className="pen nw">({dec(HOYDE, 1)} , 25)</b>. Brua er omtrent 32 m høy.
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={EKS21_STEG} />
        </div>
        <div className="stack">
          <FunkGraf
            kurver={frag >= 1 ? [{ f: v, fra: 0, til: 50 }] : []}
            punkter={[
              { x, y: v(x), farge: 'ink' },
              ...(frag >= 2
                ? [{ x: HOYDE, y: 25, farge: 'pen', navn: `(${dec(HOYDE, 1)} , 25)`, plass: 'over' as const }]
                : []),
            ]}
            ekstra={(s) => (
              <>
                <Hjelpelinje s={s} x1={x} y1={0} x2={x} y2={v(x)} farge="muted" />
                {frag >= 2 && <Hjelpelinje s={s} x1={0} y1={25} x2={55} y2={25} farge="pen" />}
              </>
            )}
            xmin={-2}
            xmax={55}
            ymin={0}
            ymax={34}
            xsteg={5}
            xetikett={10}
            ysteg={2}
            yetikett={4}
            h={400}
            xnavn="m"
            ynavn="m/s"
            title="Grafen til v(x) = 4,4√x for x fra 0 til 50"
          />
          {frag >= 3 && (
            <div className="panel reveal">
              <b>Uten graf</b> &nbsp;Vi løser <span className="math nw">4,4√<span className="rad"><X /></span> = 25</span>:
              <span className="mline math">
                √<span className="rad"><X /></span> = <Frac n="25" d="4,4" /> &nbsp;⇒&nbsp; <X /> = (<Frac n="25" d="4,4" />)
                <sup>2</sup> ≈ {dec(HOYDE, 1)}
              </span>
            </div>
          )}
          <p className="hintline">Oppgaver: 3.51–3.54</p>
        </div>
      </div>
    </div>
  );
};
