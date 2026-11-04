import React, { useState } from 'react';
import { FunkGraf, type Punkt } from '../../../../presentasjon/FunkGraf';
import { dec, minus, Rot, V, X, Xk } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

export const UtforskRot: React.FC = () => {
  const [k, setK] = useState(16);
  const r = Math.sqrt(Math.max(k, 0));
  const hel = Number.isInteger(r);
  const punkter: Punkt[] = k > 0 ? [{ x: -r, y: k, farge: 'c2' }, { x: r, y: k, farge: 'c1' }] : k === 0 ? [{ x: 0, y: 0, farge: 'pen' }] : [];
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Kvadratrot</div>
      <h2>Hvor mange tall har kvadrat lik <V c="k" />?</h2>
      <div className="cols">
        <div className="stack">
          <div className="boxed math big"><Xk /> = {minus(k)}</div>
          <Slider id="r-k" label={<V c="k" />} value={k} min={-5} max={25} step={1} onChange={setK} />
          {k > 0 && (
            <p className="math reveal">
              <span className="c1"><X /> = {hel ? r : <Rot>{k}</Rot>}</span> eller <span className="c2"><X /> = −{hel ? r : <Rot>{k}</Rot>}</span>
              {!hel && <span className="muted small"> &nbsp;(≈ ±{dec(r)})</span>}
            </p>
          )}
          {k === 0 && <p className="math reveal pen"><X /> = 0 er den eneste løsningen.</p>}
          {k < 0 && <p className="reveal">Ingen løsning: et kvadrat kan aldri bli negativt.</p>}
          <p className="muted small">Hvorfor to løsninger? Både 4<sup>2</sup> og (−4)<sup>2</sup> er 16.</p>
        </div>
        <FunkGraf
          kurver={[{ f: (x) => x * x, farge: 'ink' }, { f: () => k, farge: 'pen' }]}
          punkter={punkter}
          xmin={-6}
          xmax={6}
          ymin={-6}
          ymax={30}
          ysteg={2}
          yetikett={6}
          h={420}
          title="Grafen til x² og den vannrette linjen y = k"
        />
      </div>
    </div>
  );
};
