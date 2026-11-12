import React, { useState } from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { tusen } from '../../skjaeringspunkter/felles';

const f = (x: number) => 4500 / x;

export const EKS22_STEG = 4;

export const Eksempel22: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [x, setX] = useState(5);

  return (
    <div className="slide">
      <div className="kicker">Eksempel 22 · Rasjonal funksjon som modell</div>
      <h2>Hva koster klassefesten per person?</h2>
      <div className="cols">
        <div className="stack">
          <p>Lokale 2000 kr og mat 2500 kr deles likt på alle som kommer.</p>
          {frag >= 1 && (
            <div className="panel reveal">
              <b>a</b> &nbsp;La <X /> være antall deltakere. Hver betaler
              <span className="mline math">
                <Fx />
                <Op>=</Op>
                <Frac n="4500" d={<X />} />
              </span>
            </div>
          )}
          {frag >= 2 && (
            <div className="panel reveal">
              <b>b</b> &nbsp;Prisen synker mest for de første deltakerne. Grafen er brattest i starten og flater så ut.
            </div>
          )}
          {frag >= 3 && (
            <div className="panel reveal math">
              <b style={{ fontFamily: 'var(--f-body)' }}>c</b> &nbsp;
              <Fx x="15" /> = <Frac n="4500" d="15" /> = <b className="pen">300</b>
              <span className="small" style={{ fontFamily: 'var(--f-body)' }}>
                {' '}
                kr per person
              </span>
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={EKS22_STEG} />
          <Slider id="fest-x" label="Deltakere" value={x} min={1} max={40} step={1} onChange={setX} />
          <p className="math">
            <Fx x={x} /> = <Frac n="4500" d={x} /> ≈ <b>{tusen(f(x))}</b> kr
          </p>
        </div>
        <div className="stack">
          <FunkGraf
            kurver={frag >= 2 ? [{ f, fra: 1, til: 40 }] : []}
            punkter={[
              { x, y: f(x), farge: 'ink' },
              ...(frag >= 3 ? [{ x: 15, y: 300, farge: 'pen', navn: '(15 , 300)', plass: 'over' as const }] : []),
              ...(frag >= 4 ? [{ x: 30, y: 150, farge: 'c2', navn: '(30 , 150)', plass: 'over' as const }] : []),
            ]}
            ekstra={(s) => (
              <>
                <Hjelpelinje s={s} x1={x} y1={0} x2={x} y2={f(x)} farge="muted" />
                {frag >= 4 && <Hjelpelinje s={s} x1={0} y1={150} x2={45} y2={150} farge="c2" />}
              </>
            )}
            xmin={-2}
            xmax={42}
            ymin={0}
            ymax={2200}
            xsteg={5}
            xetikett={5}
            ysteg={250}
            yetikett={500}
            h={290}
            xnavn="deltakere"
            ynavn="kr"
            title="Grafen til f(x) = 4500/x for 1 til 40 deltakere"
          />
          {frag >= 4 && (
            <div className="panel reveal">
              <b>d</b> &nbsp;Vi løser <span className="math nw"><Fx /> = 150</span>:
              <span className="mline math">
                <Frac n="4500" d={<X />} /> = 150 &nbsp;⇒&nbsp; 4500 = 150<X /> &nbsp;⇒&nbsp; <X /> ={' '}
                <Frac n="4500" d="150" /> = 30
              </span>
              Det må komme <b className="pen">mer enn 30</b> for at det skal bli under 150 kr på hver.
            </div>
          )}
          <p className="hintline">Oppgaver: 3.55–3.56</p>
        </div>
      </div>
    </div>
  );
};
