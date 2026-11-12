import React, { useState } from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Slider } from '../../../../../presentasjon/ui';

const Prikk: React.FC<{ rest?: boolean }> = ({ rest }) => (
  <span
    style={{
      width: 14,
      height: 14,
      borderRadius: '50%',
      background: rest ? 'var(--pen)' : 'var(--r1)',
      display: 'inline-block',
    }}
  />
);

/** a ting fordelt i grupper på b, med resten for seg */
const Grupper: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const q = Math.floor(a / b);
  const r = a % b;
  return (
    <div className="row" style={{ gap: 8, alignItems: 'stretch' }} aria-label={`${a} prikker i ${q} grupper på ${b}, ${r} til overs`}>
      {Array.from({ length: q }, (_, i) => (
        <span
          key={i}
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            gap: 4,
            padding: 6,
            border: '1.5px solid var(--r1)',
            borderRadius: 8,
            maxWidth: 14 * 5 + 4 * 4 + 12 + 3,
          }}
        >
          {Array.from({ length: b }, (_, k) => (
            <Prikk key={k} />
          ))}
        </span>
      ))}
      {r > 0 && (
        <span
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            gap: 4,
            padding: 6,
            border: '1.5px dashed var(--pen)',
            borderRadius: 8,
            maxWidth: 14 * 5 + 4 * 4 + 12 + 3,
          }}
        >
          {Array.from({ length: r }, (_, k) => (
            <Prikk key={k} rest />
          ))}
        </span>
      )}
    </div>
  );
};

export const Modulo: React.FC = () => {
  const [a, setA] = useState(17);
  const [b, setB] = useState(5);
  const q = Math.floor(a / b);
  const r = a % b;
  return (
    <div className="slide">
      <div className="kicker">Modulo</div>
      <h2>Hva blir til overs?</h2>
      <div className="cols">
        <div className="stack">
          <p>
            <code>%</code> heter <b>modulo</b> og gir resten når vi deler. <code>//</code> gir hvor mange hele ganger det går
            opp.
          </p>
          <div className="tablewrap">
            <table className="cases">
              <tbody>
                <tr>
                  <td>
                    <b className="py-inline pen">//</b>
                  </td>
                  <td>heltallsdivisjon</td>
                  <td>
                    <Kode inline>17 // 5</Kode>
                  </td>
                  <td>
                    <code className="py-inline">3</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b className="py-inline pen">%</b>
                  </td>
                  <td>rest (modulo)</td>
                  <td>
                    <Kode inline>17 % 5</Kode>
                  </td>
                  <td>
                    <code className="py-inline">2</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="boxed">
            <span className="label">Sammenhengen</span>
            <span className="math">
              17 = 5 · <span className="c1">3</span> + <span className="pen">2</span>
            </span>
          </div>
          <p className="small">Akkurat som når vi deler med rest i barneskolen: 17 : 5 = 3 med 2 i rest.</p>
        </div>
        <div className="stack">
          <Slider id="mod-a" label="a" value={a} min={0} max={40} step={1} onChange={setA} />
          <Slider id="mod-b" label="b" value={b} min={1} max={10} step={1} onChange={setB} />
          <div className="panel stack" style={{ gap: 10 }}>
            <Grupper a={a} b={b} />
            <span className="math">
              {a} = {b} · <span className="c1">{q}</span> + <span className="pen">{r}</span>
            </span>
            <span className="small">
              <Kode inline>{`${a} // ${b}`}</Kode> gir <b className="c1">{q}</b> &nbsp;og&nbsp;{' '}
              <Kode inline>{`${a} % ${b}`}</Kode> gir <b className="pen">{r}</b>
            </span>
          </div>
          <p className="hintline">Når blir resten 0? Hva betyr det at resten er 0?</p>
        </div>
      </div>
    </div>
  );
};
