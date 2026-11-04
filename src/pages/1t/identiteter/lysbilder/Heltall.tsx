import React from 'react';
import { V } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const N = () => <V c="n" />;

const TRINN: Trinn[] = [
  { m: <>(<N /> − 1)(<N /> + 1) = <span className="pen"><N /><sup>2</sup> − 1</span></>, t: 'Produktet av tallene på hver side av et tall er kvadratet minus 1. For eksempel er 9 · 11 = 10² − 1 = 99.' },
  { m: <><N /> + (<N /> + 1) + (<N /> + 2) = 3<N /> + 3 = <span className="pen">3(<N /> + 1)</span></>, t: 'Summen av tre hele tall på rad har faktoren 3, så den er alltid delelig med 3.' },
  { m: <>(2<N /> + 1)<sup>2</sup> = 4<N /><sup>2</sup> + 4<N /> + 1 = <span className="pen">2(2<N /><sup>2</sup> + 2<N />) + 1</span></>, t: 'Kvadratet av et oddetall er 2 ganger et helt tall pluss 1, altså et oddetall.' },
];

export const HELTALL_STEG = TRINN.length;

export const Heltall: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Bevis med hele tall</div>
    <h2>Bokstaver kan stå for alle tall</h2>
    <div className="boxed">
      <span className="label">Når n er et helt tall</span>
      er <span className="math nw">2<N /></span> et partall og <span className="math nw">2<N /> + 1</span> et oddetall. Tall på rad skrives <span className="math nw"><N />, <N /> + 1, <N /> + 2</span>.
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={HELTALL_STEG} />
  </div>
);
