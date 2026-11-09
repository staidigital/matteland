import React from 'react';
import { FunkGraf, Hjelpelinje } from '../../../../presentasjon/FunkGraf';
import { Op } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { KurveNavn } from '../../skjaeringspunkter/felles';
import { Eksp, eksp } from '../felles';

const f = eksp(4, 0.5);
const g = eksp(1, 2);

export const EKS17_STEG = 2;

export const Eksempel17: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel 17 · Fra graf til uttrykk</div>
    <h2>Finn funksjonsuttrykkene</h2>
    <div className="cols">
      <div className="stack">
        <p>
          Grafene viser eksponentialfunksjonene <span className="c1">f</span> og <span className="c2">g</span>. Les av to
          ting: hvor grafen skjærer y-aksen (<i className="v">a</i>), og hva vi ganger med når <i className="v">x</i>{' '}
          øker fra 0 til 1 (<i className="v">b</i>).
        </p>
        {frag >= 1 && (
          <div className="panel reveal">
            <b>a</b> &nbsp;<span className="c1">f</span> skjærer y-aksen i 4. Fra <i className="v">x</i> = 0 til 1 går
            verdien fra 4 til 2, altså til halvparten. Vekstfaktoren er 0,5.
            <p className="math">
              <Fx />
              <Op>=</Op>
              <b className="c1">
                <Eksp a={4} b={0.5} />
              </b>
            </p>
          </div>
        )}
        {frag >= 2 && (
          <div className="panel reveal">
            <b>b</b> &nbsp;<span className="c2">g</span> skjærer y-aksen i 1. Fra <i className="v">x</i> = 0 til 1 går
            verdien fra 1 til 2, altså det dobbelte. Vekstfaktoren er 2.
            <p className="math">
              <Fx f="g" />
              <Op>=</Op>
              <b className="c2">
                <Eksp b={2} />
              </b>
            </p>
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={EKS17_STEG} />
        <p className="hintline">Oppgaver: 3.38–3.39</p>
      </div>
      <FunkGraf
        kurver={[
          { f, farge: 'c1' },
          { f: g, farge: 'c2' },
        ]}
        punkter={[
          ...(frag >= 1
            ? [
                { x: 0, y: 4, farge: 'c1', navn: '(0 , 4)', plass: 'hoyre' as const },
                { x: 1, y: 2, farge: 'c1', navn: '(1 , 2)', plass: 'hoyre' as const },
              ]
            : []),
          ...(frag >= 2
            ? [
                { x: 0, y: 1, farge: 'c2', navn: '(0 , 1)', plass: 'venstre' as const },
                { x: 1, y: 2, farge: 'c2' },
              ]
            : []),
        ]}
        ekstra={(s) => (
          <>
            <KurveNavn s={s} x={-0.55} y={4.6} farge="c1">
              f
            </KurveNavn>
            <KurveNavn s={s} x={2.25} y={4.6} farge="c2">
              g
            </KurveNavn>
            {frag >= 1 && <Hjelpelinje s={s} x1={1} y1={0} x2={1} y2={2} farge="muted" />}
          </>
        )}
        xmin={-1.5}
        xmax={5.5}
        ymin={-0.5}
        ymax={5}
        xetikett={1}
        yetikett={1}
        h={400}
        title="Grafene til f og g. f går gjennom (0 , 4) og (1 , 2). g går gjennom (0 , 1) og (1 , 2)."
      />
    </div>
  </div>
);
