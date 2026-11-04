import React from 'react';
import { V, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>(−2)<sup>4</sup> = (−2) · (−2) · (−2) · (−2) = <span className="pen">16</span></>, t: 'Parentesen betyr at hele −2 opphøyes. Partall gir positivt svar.' },
  { m: <>−2<sup>4</sup> = −(2 · 2 · 2 · 2) = <span className="pen">−16</span></>, t: 'Uten parentes gjelder eksponenten bare 2. Minustegnet står utenfor.' },
  { m: <>(−2)<sup>3</sup> = (−2) · (−2) · (−2) = <span className="pen">−8</span></>, t: 'Oddetall gir negativt svar.' },
  { m: <>(2<X />)<sup>2</sup> = 2<X /> · 2<X /> = <span className="pen">4<X /><sup>2</sup></span> &nbsp;men&nbsp; 2<X /><sup>2</sup> = 2 · <X /> · <X /></>, t: <>Eksponenten gjelder bare det som står rett foran.</> },
];

export const POTENS_STEG = TRINN.length;

export const HvaErPotens: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Potenser</div>
    <h2>Hva eksponenten gjelder for</h2>
    <div className="boxed">
      <span className="label">Potens</span>
      <span className="math nw"><V c="a" /><sup><V c="n" /></sup></span> er <V c="a" /> ganget med seg selv, med <V c="n" /> like faktorer.
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={POTENS_STEG} />
  </div>
);
