import React, { useState } from 'react';
import { X } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Intervall } from '../../funksjoner/felles';
import { Tallinje } from '../felles';

export const Intervaller: React.FC = () => {
  const [a, setA] = useState(-2);
  const [lengde, setLengde] = useState(5);
  const [aMed, setAMed] = useState(true);
  const [bMed, setBMed] = useState(false);
  const b = Math.min(a + lengde, 6);
  const fa = a < 0 ? '−' + Math.abs(a) : a;
  const fb = b < 0 ? '−' + Math.abs(b) : b;
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Intervaller</div>
      <h2>Alle tallene mellom to grenser</h2>
      <div className="cols">
        <div className="stack">
          <Tallinje min={-6} max={6} a={a} b={b} aMed={aMed} bMed={bMed} />
          <Slider id="iv-a" label="start" value={a} min={-6} max={5} step={1} onChange={setA} />
          <Slider id="iv-l" label="lengde" value={lengde} min={1} max={8} step={1} onChange={setLengde} />
          <div className="row">
            <label className="check">
              <input type="checkbox" checked={aMed} onChange={(e) => setAMed(e.target.checked)} /> {fa} er med
            </label>
            <label className="check">
              <input type="checkbox" checked={bMed} onChange={(e) => setBMed(e.target.checked)} /> {fb} er med
            </label>
          </div>
        </div>
        <div className="stack">
          <div className="boxed math big">
            <Intervall a={a} b={b} aMed={aMed} bMed={bMed} />
          </div>
          <p className="math">
            {fa} {aMed ? '≤' : '<'} <X /> {bMed ? '≤' : '<'} {fb}
          </p>
          <p>
            <b>Hakeparentes</b> [ ] og fylt prikk: tallet er med. <b>Spissparentes</b> ⟨ ⟩ og åpen prikk: tallet er ikke med.
          </p>
          <div className="tablewrap">
            <table className="cases">
              <tbody>
                <tr>
                  <td className="math nw">[2 , →⟩</td>
                  <td className="math nw"><X /> ≥ 2</td>
                  <td className="small">alle tall fra og med 2</td>
                </tr>
                <tr>
                  <td className="math nw">⟨← , 2⟩</td>
                  <td className="math nw"><X /> &lt; 2</td>
                  <td className="small">alle tall under 2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="small muted">Mot → og ← står det alltid spissparentes, for det finnes ikke noe siste tall.</p>
        </div>
      </div>
    </div>
  );
};
