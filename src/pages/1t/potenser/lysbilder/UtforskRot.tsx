import React, { useState } from 'react';
import { Rot, dec } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { forenkleRot } from '../oppgaver';

export const UtforskRot: React.FC = () => {
  const [n, setN] = useState(72);
  const { k, m } = forenkleRot(n);
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Forenkle røtter</div>
      <h2>Finn det største kvadrattallet</h2>
      <div className="cols">
        <div className="stack">
          <Slider id="r-n" label="tallet" value={n} min={2} max={200} step={1} onChange={setN} />
          <div className="boxed math big">
            <Rot>{n}</Rot>
            {k > 1 && m > 1 && (
              <>
                {' '}= <Rot>{k * k} · {m}</Rot> = <span className="pen">{k}<Rot>{m}</Rot></span>
              </>
            )}
            {m === 1 && <> = <span className="pen">{k}</span></>}
          </div>
          <p className="muted">
            {m === 1 && `${n} er et kvadrattall, så roten er et helt tall.`}
            {k === 1 && `Ingen kvadrattall større enn 1 går opp i ${n}, så roten kan ikke forenkles.`}
            {k > 1 && m > 1 && `Det største kvadrattallet som går opp i ${n}, er ${k * k}.`}
          </p>
          <p className="small">
            På kalkulator: √{n} ≈ {dec(Math.sqrt(n), 4)}
            {m > 1 && k > 1 && ` og ${k} · √${m} ≈ ${dec(k * Math.sqrt(m), 4)}`}
          </p>
        </div>
        <div className="stack">
          <h3>Kvadrattallene</h3>
          <div className="tablewrap">
            <table className="vt">
              <tbody>
                <tr>
                  {[4, 9, 16, 25, 36, 49].map((q) => <td key={q} className={q === k * k ? 'on' : undefined}>{q}</td>)}
                </tr>
                <tr>
                  {[64, 81, 100, 121, 144, 169].map((q) => <td key={q} className={q === k * k ? 'on' : undefined}>{q}</td>)}
                </tr>
              </tbody>
            </table>
          </div>
          <p>Eksakte svar som <span className="math nw">6<Rot>2</Rot></span> er ofte bedre enn avrundede desimaltall, og de brukes videre i regningen.</p>
          <p className="small muted">Prøv 50, 75, 98 og 180.</p>
        </div>
      </div>
    </div>
  );
};
