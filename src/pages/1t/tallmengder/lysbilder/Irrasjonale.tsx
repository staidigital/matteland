import React from 'react';
import { Frac, Rot } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Tallinje } from '../felles';

export const IRRASJONALE_STEG = 3;

export const Irrasjonale: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Tallmengder</div>
    <h2>Irrasjonale og reelle tall</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">Irrasjonale tall</span>
          Tall som <b>ikke</b> kan skrives som en brøk av to hele tall. Desimalene tar aldri slutt og gjentar seg ikke.
          <span className="mline math">
            <Rot>2</Rot> = 1,41421356… &nbsp;&nbsp; π = 3,14159265…
          </span>
        </div>
        {frag >= 1 && (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <h3>Rot er ikke alltid irrasjonal</h3>
            <p>
              <span className="math nw"><Rot>9</Rot> = 3</span> er naturlig. <span className="math nw"><Rot>2</Rot></span> og{' '}
              <span className="math nw"><Rot>10</Rot></span> er irrasjonale, fordi 2 og 10 ikke er kvadrattall.
            </p>
          </div>
        )}
        {frag >= 2 && (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <h3>Tilnærminger er rasjonale</h3>
            <p>
              <span className="math nw">3,14 = <Frac n="314" d="100" /></span> er rasjonalt. Det er en tilnærmet verdi for π, ikke π selv.
            </p>
          </div>
        )}
      </div>
      <div className="stack">
        {frag >= 3 && (
          <div className="boxed reveal">
            <span className="label">Reelle tall ℝ</span>
            De rasjonale og de irrasjonale tallene til sammen. Hvert punkt på tallinja er et reelt tall, og hvert reelt tall er et
            punkt på tallinja.
          </div>
        )}
        {frag >= 3 && (
          <div className="reveal">
            <Tallinje
              min={-2}
              max={4}
              tall={[
                { x: -1.5, navn: '−3/2' },
                { x: Math.SQRT2, navn: '√2' },
                { x: 2.5, navn: '5/2' },
                { x: Math.PI, navn: 'π' },
              ]}
            />
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={IRRASJONALE_STEG} />
      </div>
    </div>
  </div>
);
