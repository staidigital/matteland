import React from 'react';
import { Frac } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>5 200 000 = <span className="pen">5,2 · 10<sup>6</sup></span></>, t: 'Komma flyttes seks plasser mot venstre.' },
  { m: <>0,00043 = <span className="pen">4,3 · 10<sup>−4</sup></span></>, t: 'Komma flyttes fire plasser mot høyre. Tall mellom 0 og 1 gir negativ eksponent.' },
  { m: <>(3 · 10<sup>4</sup>) · (2 · 10<sup>−7</sup>) = 6 · 10<sup>4 + (−7)</sup> = <span className="pen">6 · 10<sup>−3</sup></span></>, t: 'Gang tallene for seg og tierpotensene for seg.' },
  { m: <><Frac n={<>8 · 10<sup>5</sup></>} d={<>2 · 10<sup>2</sup></>} /> = <span className="pen">4 · 10<sup>3</sup></span></> },
  { m: <>(6 · 10<sup>4</sup>) · (5 · 10<sup>3</sup>) = 30 · 10<sup>7</sup> = <span className="pen">3 · 10<sup>8</sup></span></>, t: 'Tallet foran må være mindre enn 10, så vi skriver 30 = 3 · 10.' },
];

export const STANDARDFORM_STEG = TRINN.length;

export const Standardform: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Tall på standardform</div>
    <h2>Svært store og svært små tall</h2>
    <div className="boxed">
      <span className="label">Standardform</span>
      <span className="math nw"><i className="v">a</i> · 10<sup><i className="v">n</i></sup></span>, der <span className="math nw">1 ≤ <i className="v">a</i> &lt; 10</span> og <i className="v">n</i> er et helt tall.
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={STANDARDFORM_STEG} />
  </div>
);
