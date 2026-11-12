import React from 'react';
import { Frac } from '../../../../../presentasjon/matte';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import { type LysbildeProps, StepButtons } from '../../../../../presentasjon/ui';

const UTTRYKK = (
  <>
    3 + 4 · 5<sup>3</sup> − 4,53 +{' '}
    <Frac
      n={
        <>
          3<sup>2</sup> − 1
        </>
      }
      d={
        <>
          2<sup>3</sup> + 1
        </>
      }
    />
  </>
);

const TRINN: [React.ReactNode, string, string][] = [
  [<>4 · 5<sup>3</sup></>, '4*5**3', 'Gangetegnet er *, potens er **.'],
  ['4,53', '4.53', 'Punktum som desimaltegn.'],
  [
    <Frac n={<>3<sup>2</sup> − 1</>} d={<>2<sup>3</sup> + 1</>} />,
    '(3**2 - 1)/(2**3 + 1)',
    'Parentes rundt telleren og rundt nevneren, fordi begge har flere ledd.',
  ],
];

export const EKS1_STEG = TRINN.length;

export const Eksempel1: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel 1 · Brøk og parenteser</div>
    <h2>Fra matematikk til Python</h2>
    <div className="row">
      <span>Regn ut</span>
      <span className="math big">{UTTRYKK}</span>
    </div>
    <div className="cols">
      <div className="stack">
        <div className="tablewrap">
          <table className="cases">
            <thead>
              <tr>
                <th>Matematikk</th>
                <th>Python</th>
              </tr>
            </thead>
            <tbody>
              {TRINN.map(
                ([m, p, t], i) =>
                  frag > i && (
                    <tr key={i} className="reveal">
                      <td className="math nw">{m}</td>
                      <td>
                        <Kode inline>{p}</Kode>
                        <div className="small muted">{t}</div>
                      </td>
                    </tr>
                  ),
              )}
            </tbody>
          </table>
        </div>
        <StepButtons frag={frag} setFrag={setFrag} steps={EKS1_STEG} />
      </div>
      <div className="stack">
        <p>Vi oversetter ledd for ledd. Resten skrives som det står.</p>
        <p className="hintline">
          Ta bort parentesene rundt nevneren i programmet under, og kjør igjen. Hvorfor blir svaret et helt annet?
        </p>
      </div>
    </div>
    <Kodeboks kode={'print(3 + 4*5**3 - 4.53 + (3**2 - 1)/(2**3 + 1))'} />
  </div>
);
