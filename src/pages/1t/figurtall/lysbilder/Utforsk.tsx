import React, { useState } from 'react';
import { Slider } from '../../../../presentasjon/ui';
import { V } from '../../../../presentasjon/matte';
import { Verditabell } from '../../funksjoner/felles';
import { F, Prikker } from '../felles';
import { MONSTER, prikker, type Monster } from '../oppgaver';

export const Utforsk: React.FC = () => {
  const [m, setM] = useState<Monster>('l');
  const [n, setN] = useState(3);
  const [vis, setVis] = useState(false);
  const mo = MONSTER.find((k) => k.id === m)!;
  const nr = [1, 2, 3, 4, 5, 6];
  return (
    <div className="slide">
      <div className="kicker">Utforsk</div>
      <h2>Hvor mange prikker er det i figur 100?</h2>
      <div className="row" role="group" aria-label="Mønster">
        {MONSTER.map((k) => (
          <button
            key={k.id}
            className={'btn' + (k.id === m ? ' primary' : '')}
            aria-pressed={k.id === m}
            onClick={() => {
              setM(k.id);
              setVis(false);
            }}
          >
            {k.navn}
          </button>
        ))}
      </div>
      <div className="cols">
        <div className="stack">
          <Slider id="f-n" label={<V c="n" />} value={n} min={1} max={8} step={1} onChange={setN} />
          <div className="panel" style={{ minHeight: 200, display: 'grid', placeItems: 'center' }}>
            <Prikker p={prikker(m, n)} rute={20} />
          </div>
          <p>
            Figur {n} har <b className="pen">{mo.f(n)}</b> prikker.
          </p>
        </div>
        <div className="stack">
          <Verditabell x={<V c="n" />} y={<F />} xs={nr} ys={nr.map(mo.f)} pa={n <= 6 ? n - 1 : undefined} />
          <ol className="small" style={{ margin: 0, paddingLeft: '1.3em' }}>
            <li>Hvordan vokser figuren fra én figur til den neste?</li>
            <li>Beskriv hvordan du kan telle prikkene uten å telle én og én.</li>
            <li>Skriv en formel for antallet prikker i figur <V c="n" />.</li>
          </ol>
          {vis ? (
            <div className="boxed math reveal">
              <F /> = {mo.formel} &nbsp;&nbsp; <F n="100" /> = {mo.f(100)}
            </div>
          ) : (
            <button className="btn" onClick={() => setVis(true)} style={{ alignSelf: 'start' }}>
              Vis formelen
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
