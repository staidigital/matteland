import React from 'react';
import { Op, V, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../felles';

export const SKRIVEMATE_STEG = 4;

export const Skrivematen: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const del = (steg: number, cls: string) => (frag >= steg ? `${cls} understrek` : undefined);
  return (
    <div className="slide">
      <div className="kicker">Skrivemåten</div>
      <h2>
        Hva betyr <span className="math">
          <Fx />
        </span>
        ?
      </h2>
      <div className="boxed math big" style={{ alignSelf: 'start' }}>
        <span className={del(1, 'c1')}>
          <i className="v">f</i>
        </span>
        (
        <span className={del(2, 'c2')}>
          <X />
        </span>
        )<Op>=</Op>
        <span className={del(3, 'pen')}>
          10
          <X /> + 200
        </span>
      </div>
      <div className="cols wide-left">
        <ol className="steps">
          {frag >= 1 && (
            <li className="reveal">
              <span className="no">1</span>
              <div>
                <span className="c1">
                  <i className="v">f</i>
                </span>{' '}
                er <b>navnet</b> på funksjonen. Vi kan bruke andre bokstaver også, som <V c="g" />, <V c="K" /> eller{' '}
                <V c="T" />.
              </div>
            </li>
          )}
          {frag >= 2 && (
            <li className="reveal">
              <span className="no">2</span>
              <div>
                <span className="c2">
                  <X />
                </span>{' '}
                er <b>variabelen</b>, altså innverdien vi setter inn.
              </div>
            </li>
          )}
          {frag >= 3 && (
            <li className="reveal">
              <span className="no">3</span>
              <div>
                <span className="pen">
                  10
                  <X /> + 200
                </span>{' '}
                er <b>funksjonsuttrykket</b>, regelen som sier hva funksjonen gjør med <X />.
              </div>
            </li>
          )}
          {frag >= 4 && (
            <li className="reveal">
              <span className="no">4</span>
              <div>
                <p>
                  Setter vi inn <span className="math">x = 3</span>, får vi <b>funksjonsverdien</b>:
                </p>
                <p className="math">
                  <i className="v">f</i>(3) = 10 · 3 + 200 = 230
                </p>
              </div>
            </li>
          )}
        </ol>
        <div className="stack">
          <div className="panel stack" style={{ gap: 8 }}>
            <p>
              <span className="math">
                <V c="y" /> = <i className="v">f</i>(<X />)
              </span>{' '}
              betyr at funksjonen <i className="v">f</i> gjør noe med <X /> og gir oss <V c="y" />.
            </p>
            <p className="small muted">
              Skriver vi{' '}
              <span className="math">
                <Fx x="3" /> = 230
              </span>{' '}
              i stedet for <span className="math">y = 230</span>, ser vi
              hvilken <X />
              -verdi som ga 230.
            </p>
          </div>
          <StepButtons frag={frag} setFrag={setFrag} steps={SKRIVEMATE_STEG} />
        </div>
      </div>
    </div>
  );
};
