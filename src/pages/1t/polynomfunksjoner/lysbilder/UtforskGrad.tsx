import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op, dec } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Pol, ekstremalpunkter, nullpunkter, polynom } from '../felles';

const BOKSTAVER = 'abcde';
const AREAL: [number, number, number][] = [
  [-2, 2, 0.1],
  [-3, 3, 0.25],
  [-5, 5, 0.5],
  [-5, 5, 0.5],
  [-5, 5, 0.5],
];

export const UtforskGrad: React.FC = () => {
  const [grad, setGrad] = useState<3 | 4>(3);
  const [k3, setK3] = useState([1, -1, -2, 0]);
  const [k4, setK4] = useState([0.2, 0, -2, 0, 2]);
  const k = grad === 3 ? k3 : k4;
  const setK = grad === 3 ? setK3 : setK4;
  const f = polynom(k);
  // Leter langt utenfor grafen, så vi teller alle punktene, ikke bare de synlige
  const ekstremal = ekstremalpunkter(f, -40, 40, 8000);
  const null_ = nullpunkter(f, -40, 40, 8000);

  return (
    <div className="slide">
      <div className="kicker">Utforsk · Flere polynomfunksjoner</div>
      <h2>Tredje- og fjerdegradsfunksjoner</h2>
      <div className="cols">
        <div className="stack">
          <div className="seg" role="group" aria-label="Grad" style={{ alignSelf: 'start' }}>
            {([3, 4] as const).map((g) => (
              <button key={g} aria-pressed={grad === g} onClick={() => setGrad(g)}>
                {g === 3 ? 'Tredje grad' : 'Fjerde grad'}
              </button>
            ))}
          </div>
          <div className="boxed math">
            <Fx />
            <Op>=</Op>
            <Pol k={k} />
          </div>
          {k.map((v, i) => {
            const [min, max, step] = AREAL[i];
            return (
              <Slider
                key={grad + BOKSTAVER[i]}
                id={'ug-' + BOKSTAVER[i]}
                label={<span className={i === k.length - 1 ? 'pen' : undefined}>{BOKSTAVER[i]}</span>}
                value={v}
                min={min}
                max={max}
                step={step}
                onChange={(n) => setK(k.map((w, j) => (j === i ? n : w)))}
              />
            );
          })}
          <div className="panel stack" style={{ gap: 6 }}>
            {k[0] === 0 && (
              <p className="wrong">Når a = 0, er ikke funksjonen av {grad === 3 ? 'tredje' : 'fjerde'} grad lenger.</p>
            )}
            <p>
              <b className="c2">{ekstremal.length}</b> ekstremalpunkter &nbsp;·&nbsp;{' '}
              <b className="pen">{null_.length}</b> nullpunkter
            </p>
            {null_.length > 0 && <p className="small muted">Nullpunkter: x ≈ {null_.map((x) => dec(x)).join(', ')}</p>}
          </div>
        </div>
        <div className="stack">
          <FunkGraf
            kurver={[{ f }]}
            punkter={[
              ...ekstremal.map((p) => ({ x: p.x, y: p.y, farge: 'c2' })),
              ...null_.map((x) => ({ x, y: 0, farge: 'pen' })),
            ]}
            xmin={-5}
            xmax={5}
            ymin={-8}
            ymax={8}
            h={420}
            title="Grafen til en tredje- eller fjerdegradsfunksjon med ekstremalpunkter og nullpunkter"
          />
          <ol className="small" style={{ margin: 0, paddingLeft: '1.3em' }}>
            <li>Hva er det høyeste og det laveste antallet ekstremalpunkter?</li>
            <li>Hva er det høyeste og det laveste antallet nullpunkter?</li>
            <li>
              Hvordan påvirker konstantleddet <span className="pen">{BOKSTAVER[k.length - 1]}</span> grafen?
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};
