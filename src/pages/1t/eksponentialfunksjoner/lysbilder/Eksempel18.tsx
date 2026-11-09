import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Op, X, dec } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { tusen } from '../../skjaeringspunkter/felles';
import { Eksp, eksp } from '../felles';

const P = eksp(600000, 1.026);
/** Grafen tegnes i tusen kroner, så aksene får lesbare tall */
const Pk = (x: number) => P(x) / 1000;
const MILLION = Math.log(1000000 / 600000) / Math.log(1.026);

export const EKS18_STEG = 4;

export const Eksempel18: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [x, setX] = useState(4);

  return (
    <div className="slide">
      <div className="kicker">Eksempel 18 · Sparekonto</div>
      <h2>Randis arv</h2>
      <div className="cols">
        <div className="stack">
          <p>
            Randi setter inn 600 000 kr på en sparekonto med fast rente. Etter <X /> år har beløpet vokst til
          </p>
          <div className="boxed math">
            <Fx f="P" />
            <Op>=</Op>
            <Eksp a={600000} b={1.026} />
          </div>
          {frag >= 1 && (
            <div className="panel reveal">
              <span className="mline">
                <b>a</b> &nbsp;Variabelen <X /> står i eksponenten, så <i className="v">P</i> er en eksponentialfunksjon.
              </span>
              {frag >= 2 && (
                <span className="mline reveal" style={{ marginTop: 8 }}>
                  <b>b</b> &nbsp;Vekstfaktoren 1,026 = 102,6 % = 100 % + <b className="pen">2,6 %</b>. Det er den
                  årlige renta.
                </span>
              )}
            </div>
          )}
          {frag >= 3 && (
            <div className="panel reveal">
              <b>c</b> &nbsp;
              <span className="math nw">
                <Fx f="P" x="4" /> = 600 000 · 1,026<sup>4</sup> ≈ <b>{tusen(P(4))}</b>
              </span>
              <span className="mline">Etter fire år har Randi {tusen(P(4))} kr i banken.</span>
            </div>
          )}
          {frag >= 4 && (
            <div className="panel reveal">
              <b>d</b> &nbsp;Vi tegner linja <span className="math nw">y = 1 000 000</span> og finner skjæringspunktet{' '}
              <b className="pen nw">({dec(MILLION, 1)} , 1 000 000)</b>. Det tar nesten 20 år.
              <p className="small muted">
                I GeoGebra: <code>Skjæring(P, y = 1000000)</code>
              </p>
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={EKS18_STEG} />
        </div>
        <div className="stack">
          <FunkGraf
            kurver={[{ f: Pk, fra: 0 }]}
            punkter={[
              { x, y: Pk(x), farge: 'ink' },
              ...(frag >= 4
                ? [{ x: MILLION, y: 1000, farge: 'pen', navn: `(${dec(MILLION, 1)} , 1 000 000)`, plass: 'over' as const }]
                : []),
            ]}
            ekstra={(s) => (
              <>
                <Hjelpelinje s={s} x1={x} y1={0} x2={x} y2={Pk(x)} farge="muted" />
                {frag >= 4 && <Hjelpelinje s={s} x1={0} y1={1000} x2={26} y2={1000} farge="pen" />}
              </>
            )}
            xmin={-1}
            xmax={26}
            ymin={0}
            ymax={1150}
            ysteg={100}
            yetikett={200}
            xetikett={4}
            h={320}
            xnavn="år"
            ynavn="tusen kr"
            title="Grafen til P(x) = 600 000 · 1,026^x for x fra 0 til 26 år"
          />
          <Slider id="p-x" label={<X />} value={x} min={0} max={25} step={1} onChange={setX} />
          <p className="math">
            <Fx f="P" x={x} /> ≈ <b>{tusen(P(x))}</b> kr
          </p>
          <p className="hintline">Oppgaver: 3.40–3.45</p>
        </div>
      </div>
    </div>
  );
};
