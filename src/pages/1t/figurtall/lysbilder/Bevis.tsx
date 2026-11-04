import React from 'react';
import { V } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const N = () => <V c="n" />;
const M = () => <V c="m" />;

export const BEVIS_STEG = 4;

export const Bevis: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Generalisering</div>
    <h2>Fra eksempler til bevis</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">Med bokstaver</span>
          Når <N /> er et helt tall, er <span className="math nw">2<N /></span> et partall og <span className="math nw">2<N /> + 1</span> et oddetall.
        </div>
        {frag >= 1 && (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <h3>Summen av to oddetall er et partall</h3>
            <p className="muted small">3 + 5 = 8 og 7 + 11 = 18 stemmer, men eksempler er ikke nok.</p>
            <p className="math">(2<M /> + 1) + (2<N /> + 1) = 2<M /> + 2<N /> + 2 = <span className="pen">2(<M /> + <N /> + 1)</span></p>
            <p className="small">Svaret har faktoren 2, så det er et partall. Dette gjelder alle oddetall.</p>
          </div>
        )}
        {frag >= 2 && (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <h3>Forskjellen mellom to kvadrattall på rad</h3>
            <p className="math">(<N /> + 1)<sup>2</sup> − <N /><sup>2</sup> = <N /><sup>2</sup> + 2<N /> + 1 − <N /><sup>2</sup> = <span className="pen">2<N /> + 1</span></p>
            <p className="small">Kvadrattallene 1, 4, 9, 16 øker med 3, 5, 7, … De neste oddetallene.</p>
          </div>
        )}
      </div>
      <div className="stack">
        {frag >= 3 && (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <h3>Hvorfor eksempler ikke er nok</h3>
            <p>
              Formelen <span className="math nw"><N /><sup>2</sup> + <N /> + 41</span> gir primtall for <span className="nw"><N /> = 1, 2, 3, …, 39</span>. Da er det fristende å tro at den alltid gjør det.
            </p>
            {frag >= 4 && (
              <p className="reveal">
                Men <span className="math nw"><N /> = 40</span> gir <span className="math nw">40<sup>2</sup> + 40 + 41 = 1681 = 41 · 41</span>, som ikke er et primtall.
              </p>
            )}
          </div>
        )}
        <p className="muted">
          Et <b>motbevis</b> trenger bare ett eksempel. Et <b>bevis</b> må gjelde for alle tall, og derfor bruker vi bokstaver.
        </p>
        <StepButtons frag={frag} setFrag={setFrag} steps={BEVIS_STEG} />
      </div>
    </div>
  </div>
);
