import React, { useState } from 'react';
import { Frac, V, X, minus } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const N = () => <V c="n" />;
const EKSP = [3, 2, 1, 0, -1, -2, -3];

export const NullNegativ: React.FC = () => {
  const [g, setG] = useState(2);
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Eksponent 0 og negative eksponenter</div>
      <h2>Fortsett mønsteret</h2>
      <div className="cols">
        <div className="stack">
          <Slider id="n-g" label={<A />} value={g} min={2} max={5} step={1} onChange={setG} />
          <div className="tablewrap">
            <table className="vt" style={{ width: '100%' }}>
              <tbody>
                {EKSP.map((e) => (
                  <tr key={e}>
                    <th>{g}<sup>{minus(e)}</sup></th>
                    <td className={e === 0 ? 'on' : undefined}>
                      {e >= 0 ? g ** e : <Frac n="1" d={g ** -e} />}
                    </td>
                    <td className="small muted" style={{ fontFamily: 'var(--f-body)' }}>
                      {e > -3 ? `: ${g} gir neste` : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="stack">
          <div className="boxed math">
            <span className="label">Regler</span>
            <span className="mline"><A /><sup>0</sup> = 1</span>
            <span className="mline"><A /><sup>−<N /></sup> = <Frac n="1" d={<><A /><sup><N /></sup></>} /></span>
          </div>
          <p className="small muted">Her må <span className="nw"><A /> ≠ 0</span>, for vi kan ikke dele med 0.</p>
          <p>
            Hver gang eksponenten går ned med 1, deler vi med grunntallet. Da må <span className="math nw">{g}<sup>0</sup> = 1</span>, og negative
            eksponenter gir brøker.
          </p>
          <div className="panel math">
            <span className="mline">5<sup>0</sup> = 1</span>
            <span className="mline">3<sup>−2</sup> = <Frac n="1" d={<>3<sup>2</sup></>} /> = <Frac n="1" d="9" /></span>
            <span className="mline"><X /><sup>−1</sup> = <Frac n="1" d={<X />} /></span>
          </div>
          <p className="small muted">En negativ eksponent gir ikke et negativt tall: <span className="math nw">2<sup>−3</sup> = <Frac n="1" d="8" /></span>, ikke −8.</p>
        </div>
      </div>
    </div>
  );
};
