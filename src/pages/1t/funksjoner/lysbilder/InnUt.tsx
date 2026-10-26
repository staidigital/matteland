import React, { useState } from 'react';
import { Frac, Op, V, minus } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Fx } from '../felles';

type Eksempel = 'kvadrat' | 'temp';

const Kvadratfigur: React.FC<{ n: number }> = ({ n }) => {
  const r = 24;
  return (
    <svg width={n * r} height={n * r} viewBox={`0 0 ${n * r} ${n * r}`} role="img" aria-label={`Kvadrattall nummer ${n}`}>
      {Array.from({ length: n * n }, (_, k) => (
        <circle key={k} cx={(k % n) * r + r / 2} cy={Math.floor(k / n) * r + r / 2} r={8.5} style={{ fill: 'var(--r2)' }} />
      ))}
    </svg>
  );
};

export const InnUt: React.FC = () => {
  const [eks, setEks] = useState<Eksempel>('kvadrat');
  const [n, setN] = useState(4);
  const [c, setC] = useState(20);
  const fahrenheit = (9 * c) / 5 + 32;

  return (
    <div className="slide">
      <div className="kicker">Innverdi og utverdi</div>
      <h2>En sammenheng mellom to størrelser</h2>
      <div className="seg" role="group" aria-label="Eksempel" style={{ alignSelf: 'start' }}>
        <button aria-pressed={eks === 'kvadrat'} onClick={() => setEks('kvadrat')}>
          Kvadrattall
        </button>
        <button aria-pressed={eks === 'temp'} onClick={() => setEks('temp')}>
          Celsius til fahrenheit
        </button>
      </div>
      <div className="cols">
        <div className="stack">
          {eks === 'kvadrat' ? (
            <>
              <p>
                Kvadrattall nummer <V c="n" /> er <V c="n" />
                <sup>2</sup>. Kaller vi funksjonen <V c="K" />, skriver vi{' '}
                <span className="math">
                  <Fx f="K" x={<V c="n" />} /> = <V c="n" />
                  <sup>2</sup>
                </span>
                .
              </p>
              <Slider id="iu-n" label={<V c="n" />} value={n} min={1} max={10} step={1} onChange={setN} />
            </>
          ) : (
            <>
              <p>
                Fahrenheitgrader regnes ut fra celsiusgrader. Kaller vi funksjonen <V c="T" />, skriver vi{' '}
                <span className="math">
                  <Fx f="T" x={<V c="c" />} /> = <Frac n="9" d="5" />
                  <V c="c" /> + 32
                </span>
                .
              </p>
              <Slider id="iu-c" label={<>°C</>} value={c} min={-20} max={40} step={5} onChange={setC} />
            </>
          )}
          <div className="boxed">
            Hvis hver gyldig innverdi gir <b>bare én</b> utverdi, sier vi at vi har en <b>funksjon</b>.
          </div>
          <p className="small muted">
            {eks === 'kvadrat'
              ? 'Hver n gir ett og aldri mer enn ett kvadrattall.'
              : 'Hver celsiustemperatur svarer til nøyaktig én fahrenheittemperatur.'}
          </p>
        </div>
        <div className="stack" style={{ alignItems: 'center' }}>
          <div className="maskin">
            <div className="inn c1">
              <span className="lbl">Inn</span>
              {eks === 'kvadrat' ? n : minus(c)}
            </div>
            <span className="pil">→</span>
            <div className="boks">
              <span className="lbl">{eks === 'kvadrat' ? 'Kvadrerer' : '· 9/5 + 32'}</span>
              <i className="v">{eks === 'kvadrat' ? 'K' : 'T'}</i>
            </div>
            <span className="pil">→</span>
            <div className="ut c2">
              <span className="lbl">Ut</span>
              {eks === 'kvadrat' ? n * n : minus(fahrenheit)}
            </div>
          </div>
          <div className="math">
            {eks === 'kvadrat' ? (
              <>
                <Fx f="K" x={<span className="c1">{n}</span>} />
                <Op>=</Op>
                {n}
                <sup>2</sup>
                <Op>=</Op>
                <span className="c2">{n * n}</span>
              </>
            ) : (
              <>
                <Fx f="T" x={<span className="c1">{minus(c)}</span>} />
                <Op>=</Op>
                <Frac n="9" d="5" />· {c < 0 ? `(${minus(c)})` : c} + 32
                <Op>=</Op>
                <span className="c2">{minus(fahrenheit)}</span>
              </>
            )}
          </div>
          {eks === 'kvadrat' ? (
            <div className="panel" style={{ display: 'grid', placeItems: 'center', minHeight: 200, minWidth: 220 }}>
              <Kvadratfigur n={n} />
            </div>
          ) : (
            <p className="muted">
              {minus(c)} °C er det samme som {minus(fahrenheit)} °F.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
