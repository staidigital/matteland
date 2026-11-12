import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, X, dec, near } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { hyperbel } from '../felles';

const SPORSMAL: [React.ReactNode, React.ReactNode][] = [
  [
    <>
      Hvor store <i className="v">y</i>-verdier kan vi få?
    </>,
    <>
      Så store vi vil: <Fx x="0,001" /> = 1000.
    </>,
  ],
  [
    <>
      Hvor små <i className="v">y</i>-verdier kan vi få?
    </>,
    <>
      Så små vi vil: <Fx x="−0,001" /> = −1000.
    </>,
  ],
  [
    <>
      Kan <i className="v">y</i>-verdien bli null?
    </>,
    <>Nei, telleren er alltid 1.</>,
  ],
  ['Tegn en skisse av grafen.', <>To deler: én for x &gt; 0 og én for x &lt; 0.</>],
  [
    <>
      Hva skjer når vi nærmer oss <i className="v">y</i>-aksen?
    </>,
    <>Fra høyre går grafen mot +∞, fra venstre mot −∞. Den treffer aldri aksen.</>,
  ],
];

export const UTFORSK_STEG = SPORSMAL.length;

const PROV = [-1000, -0.5, -0.01, 0.01, 0.5, 1000];

export const Utforsk: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [x, setX] = useState(2);
  const null_ = near(x, 0);
  const y = 1 / x;

  return (
    <div className="slide">
      <div className="kicker">Utforsk</div>
      <h2>Hva gjør brøken 1/x?</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed math big">
            <Fx />
            <Op>=</Op>
            <Frac n="1" d={<X />} />
            <span className="small muted" style={{ fontFamily: 'var(--f-body)' }}>
              {' '}
              , <X /> ≠ 0
            </span>
          </div>
          <Slider id="ut-x" label={<X />} value={x} min={-4} max={4} step={0.05} onChange={(v) => setX(+v.toFixed(2))} />
          <div className="row" role="group" aria-label="Prøv x-verdier" style={{ gap: 6 }}>
            {PROV.map((v) => (
              <button key={v} className={'btn' + (near(v, x) ? ' on' : '')} aria-pressed={near(v, x)} onClick={() => setX(v)}>
                {dec(v)}
              </button>
            ))}
          </div>
          <p className="math">
            {null_ ? (
              <>
                <Fx x="0" /> = <Frac n="1" d="0" /> <span className="small c2"> ikke definert!</span>
              </>
            ) : (
              <>
                <Fx x={dec(x)} /> = <Frac n="1" d={dec(x)} /> = <b className="pen">{dec(y, 3)}</b>
              </>
            )}
          </p>
          <ol className="stack" style={{ gap: 6, paddingLeft: '1.3em', margin: 0 }}>
            {SPORSMAL.map(([s, svar], i) => (
              <li key={i}>
                {s}{' '}
                {frag > i ? (
                  <span className="reveal pen small">{svar}</span>
                ) : (
                  <button className="btn" style={{ padding: '0 0.6em' }} onClick={() => setFrag(i + 1)}>
                    Vis svar
                  </button>
                )}
              </li>
            ))}
          </ol>
        </div>
        <FunkGraf
          kurver={frag >= 4 ? hyperbel(0, 1, 1, 0, 'c1') : []}
          punkter={null_ ? [] : [{ x, y, farge: 'pen', navn: `(${dec(x)} , ${dec(y)})`, plass: x > 0 ? 'hoyre' : 'venstre' }]}
          xmin={-5}
          xmax={5}
          ymin={-5}
          ymax={5}
          h={420}
          title="Grafen til f(x) = 1/x"
        />
      </div>
    </div>
  );
};
