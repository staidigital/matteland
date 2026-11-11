import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Rot, X, dec } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Fx, Intervall, Mengde } from '../../funksjoner/felles';
import { KurveNavn } from '../../skjaeringspunkter/felles';
import { nrot } from '../felles';

const h = (x: number) => nrot(x - 3, 2);
const g = (x: number) => nrot(x + 4, 3);

export const ROT_STEG = 2;

export const Rotfunksjoner: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [x, setX] = useState(7);
  const y = h(x);

  return (
    <div className="slide">
      <div className="kicker">Rotfunksjoner</div>
      <h2>Variabelen står inni rottegnet</h2>
      <div className="cols">
        <div className="stack">
          <div className="panel stack" style={{ gap: 10 }}>
            <h3>
              Utforsk:{' '}
              <span className="math nw">
                <Fx f="h" /> = <Rot>
                  <X /> − 3
                </Rot>
              </span>
            </h3>
            <Slider id="rot-x" label={<X />} value={x} min={-2} max={12} step={0.5} onChange={setX} />
            <p className="math">
              <Fx f="h" x={dec(x)} /> = <Rot>{dec(x - 3)}</Rot>{' '}
              {isNaN(y) ? (
                <span className="wrong" style={{ fontFamily: 'var(--f-body)', fontSize: '0.75em' }}>
                  ikke definert, roten av et negativt tall
                </span>
              ) : (
                <>
                  = <b>{dec(y)}</b>
                </>
              )}
            </p>
          </div>
          {frag >= 1 && (
            <div className="boxed reveal">
              <span className="label">Kvadratrot</span>
              Vi kan ikke ta kvadratroten av negative tall. <span className="math nw">√x</span> er bare definert for{' '}
              <span className="nw">x ≥ 0</span>, så{' '}
              <span className="math nw">
                <Mengde m="D" /> = <Intervall a={0} b={Infinity} />
              </span>
              . For <span className="c1">h</span> må <span className="nw">x − 3 ≥ 0</span>, altså{' '}
              <span className="math nw">
                <Mengde m="D" f="h" /> = <Intervall a={3} b={Infinity} />
              </span>
              .
            </div>
          )}
          {frag >= 2 && (
            <div className="panel reveal">
              <b className="c2">Tredjerota</b> av negative tall finnes: ∛(−8) = −2, fordi (−2)³ = −8. Derfor er{' '}
              <span className="math nw">
                <Fx f="g" /> = ∛
                <span className="rad">
                  <X /> + 4
                </span>
              </span>{' '}
              definert for alle x:{' '}
              <span className="math nw">
                <Mengde m="D" f="g" /> = ℝ
              </span>
              .
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={ROT_STEG} />
        </div>
        <FunkGraf
          kurver={[{ f: h, farge: 'c1' }, ...(frag >= 2 ? [{ f: g, farge: 'c2' }] : [])]}
          punkter={[
            ...(isNaN(y) ? [] : [{ x, y, farge: 'ink' }]),
            ...(frag >= 1 ? [{ x: 3, y: 0, farge: 'c1', navn: '(3 , 0)', plass: 'under' as const }] : []),
          ]}
          ekstra={(s) => (
            <>
              <KurveNavn s={s} x={10.5} y={3.2} farge="c1">
                h
              </KurveNavn>
              {frag >= 2 && (
                <KurveNavn s={s} x={-5.6} y={-1.6} farge="c2">
                  g
                </KurveNavn>
              )}
            </>
          )}
          xmin={-8}
          xmax={13}
          ymin={-3}
          ymax={5}
          h={380}
          title="Grafen til h(x) = √(x − 3), og grafen til g(x) = ∛(x + 4)"
        />
      </div>
    </div>
  );
};
