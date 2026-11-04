import React, { useState } from 'react';
import { minus, near, Poly, V, X } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

const MAL: [number, number][] = [
  [5, 6],
  [-1, -12],
  [-7, 10],
  [2, -15],
  [1, -6],
];

const parentes = (t: number) => (t === 0 ? <X /> : <>(<X /> {t < 0 ? '−' : '+'} {Math.abs(t)})</>);

export const SumProdukt: React.FC = () => {
  const [p, setP] = useState(1);
  const [q, setQ] = useState(1);
  const [i, setI] = useState(0);
  const [b, c] = MAL[i];
  const treff = near(p + q, b) && near(p * q, c);
  return (
    <div className="slide">
      <div className="kicker">Metode 3 · Sum og produkt</div>
      <h2>To tall bestemmer uttrykket</h2>
      <div className="boxed math big">
        (<X /> + <V c="p" />)(<X /> + <V c="q" />) = <X /><sup>2</sup> + (<V c="p" /> + <V c="q" />)<X /> + <V c="p" /><V c="q" />
      </div>
      <div className="cols">
        <div className="stack">
          <Slider id="s-p" label={<V c="p" />} value={p} min={-8} max={8} step={1} onChange={setP} />
          <Slider id="s-q" label={<V c="q" />} value={q} min={-8} max={8} step={1} onChange={setQ} />
          <div className="panel stack" style={{ gap: 6 }}>
            <p className="math">{parentes(p)}{parentes(q)} = <Poly a={1} b={p + q} c={p * q} /></p>
            <p className="small muted">Sum: {minus(p)} + {minus(q)} = {minus(p + q)}. Produkt: {minus(p)} · {minus(q)} = {minus(p * q)}.</p>
          </div>
        </div>
        <div className="stack">
          <h3>Treff dette uttrykket:</h3>
          <div className="boxed math big"><Poly a={1} b={b} c={c} /></div>
          {treff ? (
            <p className="fb ok reveal" role="status">Riktig! Sum {minus(b)} og produkt {minus(c)}.</p>
          ) : (
            <p className="muted">Finn to tall med sum {minus(b)} og produkt {minus(c)}.</p>
          )}
          <div className="row">
            <button className="btn" onClick={() => setI((i + 1) % MAL.length)}>Nytt uttrykk</button>
          </div>
        </div>
      </div>
    </div>
  );
};
