import React, { useState } from 'react';
import { dec, X } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

const MAL = 40;

export const UtforskAreal: React.FC = () => {
  const [x, setX] = useState(3);
  const areal = x * (x + 3);
  const u = 22;
  const treff = Math.abs(areal - MAL) < 1e-9;
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Areal</div>
      <h2>Hvor bredt må rektangelet være?</h2>
      <div className="cols">
        <div className="graph" style={{ maxWidth: 440 }}>
          <svg viewBox="0 0 300 260" role="img" aria-label={`Rektangel med bredde ${dec(x)} og lengde ${dec(x + 3)}`}>
            <rect x={36} y={30} width={(x + 3) * u} height={x * u} style={{ fill: 'var(--r1)', opacity: 0.28 }} />
            <rect x={36} y={30} width={(x + 3) * u} height={x * u} style={{ fill: 'none', stroke: 'var(--ink)', strokeWidth: 2 }} />
            <text className="g-name" x={36 + ((x + 3) * u) / 2} y={22} textAnchor="middle">x + 3 = {dec(x + 3)}</text>
            <text className="g-name" x={30} y={30 + (x * u) / 2 + 6} textAnchor="end">{dec(x)}</text>
          </svg>
        </div>
        <div className="stack">
          <div className="boxed">
            <span className="label">Oppgave</span>
            Et rektangel er 3 cm lengre enn det er bredt, og arealet er {MAL} cm².
          </div>
          <Slider id="r-x" label={<span><X /></span>} value={x} min={1} max={8} step={0.5} onChange={setX} />
          <p className="math">Areal: {dec(x)} · {dec(x + 3)} = <b>{dec(areal)} cm²</b></p>
          {treff ? (
            <div className="fb ok reveal" role="status">Der ja! Bredden er {dec(x)} cm og lengden er {dec(x + 3)} cm.</div>
          ) : (
            <p className="muted">{areal < MAL ? 'Arealet er for lite.' : 'Arealet er for stort.'} Mål: {MAL} cm².</p>
          )}
        </div>
      </div>
    </div>
  );
};
