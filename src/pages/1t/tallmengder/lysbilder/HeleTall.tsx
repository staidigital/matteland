import React from 'react';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Tallinje } from '../felles';

export const HELE_STEG = 2;

export const HeleTall: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Tallmengder</div>
    <h2>Naturlige og hele tall</h2>
    <div className="boxed">
      <span className="label">Naturlige tall</span>
      <span className="math">ℕ = {'{'}1, 2, 3, 4, …{'}'}</span>
      <span className="mline small">Tallene vi teller med. Vi kan alltid legge sammen og gange, og svaret blir naturlig.</span>
    </div>
    {frag >= 1 && (
      <div className="panel reveal stack" style={{ gap: 6 }}>
        <p>
          Men <span className="math nw">3 − 5</span> har ikke noe svar blant de naturlige tallene. Derfor utvider vi:
        </p>
      </div>
    )}
    {frag >= 2 && (
      <div className="boxed reveal">
        <span className="label">Hele tall</span>
        <span className="math">ℤ = {'{'}…, −3, −2, −1, 0, 1, 2, 3, …{'}'}</span>
        <span className="mline small">De naturlige tallene, null og de negative tallene.</span>
      </div>
    )}
    {frag >= 2 && (
      <div className="reveal">
        <Tallinje min={-5} max={5} tall={[{ x: -2, navn: '3 − 5' }]} />
      </div>
    )}
    <StepButtons frag={frag} setFrag={setFrag} steps={HELE_STEG} />
  </div>
);
