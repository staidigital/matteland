import React, { useState } from 'react';
import { X } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Vekt } from '../felles';

export const Hva: React.FC = () => {
  const [x, setX] = useState(1);
  const v = 2 * x + 3;
  const h = x + 7;
  const helling = Math.max(-9, Math.min(9, (h - v) * 1.5));
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Hva er en likning?</div>
      <h2>Løsningen får begge sider til å bli like</h2>
      <div className="boxed math">
        <span className="label">Likning</span>
        2<X /> + 3 = <X /> + 7
      </div>
      <div className="cols">
        <Vekt
          venstre={{ x: 2, ener: 3 }}
          hoyre={{ x: 1, ener: 7 }}
          helling={helling}
          beskrivelse={`Skålvekt der venstre side veier ${v} og høyre side veier ${h}`}
        />
        <div className="stack">
          <Slider id="hva-x" label={<X />} value={x} min={0} max={9} step={1} onChange={setX} />
          <div className="panel math">
            <span className="mline">Venstre side: 2 · {x} + 3 = {v}</span>
            <span className="mline">Høyre side: {x} + 7 = {h}</span>
          </div>
          {v === h ? (
            <div className="fb ok" role="status">
              Likevekt! <span className="math"><X /> = {x}</span> er løsningen av likningen.
            </div>
          ) : (
            <p role="status">{v > h ? 'Venstre side er tyngst.' : 'Høyre side er tyngst.'} Prøv en annen verdi.</p>
          )}
          <p className="small muted">
            En førstegradslikning er en likning der den ukjente bare står i første potens, altså <span className="math nw"><X /></span> og ikke <span className="math nw"><X /><sup>2</sup></span>.
          </p>
        </div>
      </div>
    </div>
  );
};
