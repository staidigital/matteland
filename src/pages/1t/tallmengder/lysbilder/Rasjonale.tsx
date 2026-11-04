import React from 'react';
import { Frac, V } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const EKS: { d: string; b: React.ReactNode; t: string }[] = [
  { d: '0,25', b: <Frac n="1" d="4" />, t: 'Desimalene tar slutt.' },
  { d: '−2,5', b: <>−<Frac n="5" d="2" /></>, t: 'Negative tall kan også være brøker.' },
  { d: '0,333…', b: <Frac n="1" d="3" />, t: 'Desimalene gjentar seg.' },
  { d: '0,1212…', b: <Frac n="4" d="33" />, t: 'Gruppen 12 gjentar seg.' },
  { d: '−4', b: <Frac n="−4" d="1" />, t: 'Alle hele tall er også rasjonale.' },
];

export const RASJONALE_STEG = EKS.length;

export const Rasjonale: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Tallmengder</div>
    <h2>Rasjonale tall</h2>
    <p className="lede">
      <span className="math nw">3 : 4</span> har ikke noe svar blant de hele tallene. Da trenger vi brøker.
    </p>
    <div className="boxed">
      <span className="label">Rasjonale tall ℚ</span>
      Alle tall som kan skrives som en brøk <span className="math"><Frac n={<V c="a" />} d={<V c="b" />} /></span>, der{' '}
      <V c="a" /> og <V c="b" /> er hele tall og <span className="nw"><V c="b" /> ≠ 0</span>. Som desimaltall tar de slutt, eller så gjentar
      desimalene seg.
    </div>
    <div className="tablewrap">
      <table className="cases">
        <tbody>
          {EKS.map(({ d, b, t }, i) => (
            <tr key={i}>
              <td className="math nw">{d}</td>
              <td className="math nw">{frag > i ? <span className="reveal">= {b}</span> : ' '}</td>
              <td className="small muted">{frag > i ? t : ' '}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <StepButtons frag={frag} setFrag={setFrag} steps={RASJONALE_STEG} />
  </div>
);
