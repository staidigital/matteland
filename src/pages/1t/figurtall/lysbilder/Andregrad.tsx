import React from 'react';
import { V } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { F } from '../felles';

const N = () => <V c="n" />;
const NR = [1, 2, 3, 4, 5];
const VERDI = [3, 8, 15, 24, 35];
const ANDRE = [2, 4, 6, 8, 10];

export const ANDREGRAD_STEG = 4;

export const Andregrad: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Andregradsmønstre</div>
    <h2>Når økningen øker</h2>
    <div className="cols">
      <div className="stack">
        <div className="tablewrap">
          <table className="vt">
            <tbody>
              <tr>
                <th><N /></th>
                {NR.map((n) => <td key={n}>{n}</td>)}
              </tr>
              <tr>
                <th><F /></th>
                {VERDI.map((v) => <td key={v}>{v}</td>)}
              </tr>
              {frag >= 1 && (
                <tr className="reveal">
                  <th className="small">Økning</th>
                  <td />
                  {[5, 7, 9, 11].map((v) => <td key={v}>{v}</td>)}
                </tr>
              )}
              {frag >= 2 && (
                <tr className="reveal">
                  <th className="small">Økning i økningen</th>
                  <td />
                  <td />
                  {[2, 2, 2].map((v, i) => <td key={i} className="on">{v}</td>)}
                </tr>
              )}
              {frag >= 3 && (
                <tr className="reveal">
                  <th className="small"><F /> − <N /><sup>2</sup></th>
                  {ANDRE.map((v) => <td key={v}>{v}</td>)}
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <StepButtons frag={frag} setFrag={setFrag} steps={ANDREGRAD_STEG} />
      </div>
      <div className="stack">
        <p>Finn en formel for tallene 3, 8, 15, 24, 35, …</p>
        {frag >= 1 && <p className="reveal">Økningen er ikke fast, så formelen er ikke lineær.</p>}
        {frag >= 2 && (
          <p className="reveal">
            Men økningen øker med fast verdi, 2. Da er formelen av andre grad. Vi prøver <span className="math nw"><F /> = <N /><sup>2</sup> + …</span>, for <N /><sup>2</sup> har også økning i økningen lik 2.
          </p>
        )}
        {frag >= 3 && (
          <p className="reveal">
            Trekker vi <N /><sup>2</sup> fra hver verdi, står vi igjen med 2, 4, 6, 8, 10. Det er <span className="math nw">2<N /></span>.
          </p>
        )}
        {frag >= 4 && (
          <div className="boxed math reveal">
            <span className="label">Formel</span>
            <span className="mline"><F /> = <N /><sup>2</sup> + 2<N /> = <N />(<N /> + 2)</span>
            <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>
              Kontroll: <span className="nw">3 · 5 = 15</span>, som er <span className="nw">F₃</span>. Stemmer.
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);
