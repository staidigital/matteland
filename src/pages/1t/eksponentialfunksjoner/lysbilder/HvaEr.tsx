import React from 'react';
import { X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Eksp, EkspGen } from '../felles';

const XS = [0, 1, 2, 3, 4, 5];

export const HVA_STEG = 2;

export const HvaEr: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksponentialfunksjoner</div>
    <h2>Variabelen står i eksponenten</h2>
    <div className="cols">
      <div className="stack">
        <div className="panel math">
          <span className="mline">
            <Fx /> = <Eksp b={2} />
          </span>
          <span className="mline">
            <Fx f="g" /> = <Eksp a={500} b={[1, 2]} />
          </span>
          <span className="mline">
            <Fx f="h" x={<i className="v">t</i>} /> = <Eksp a={2.3} b={1.04} v="t" />
          </span>
        </div>
        <p>
          En eksponentialfunksjon består av en potens med variabelen i <b>eksponenten</b>. Potensen kan være ganget med
          en konstant, som i <i className="v">g</i> og <i className="v">h</i>.
        </p>
        {frag >= 2 && (
          <div className="boxed reveal">
            <span className="label">Generelt</span>
            <span className="math">
              <Fx /> = <EkspGen farge />
            </span>
            <p style={{ marginTop: 6 }}>
              <b className="c1">b &gt; 1:</b> grafen stiger. <b className="c1">b &lt; 1:</b> grafen faller.
            </p>
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={HVA_STEG} />
      </div>
      <div className="stack">
        {frag >= 1 && (
          <div className="panel stack reveal" style={{ gap: 12 }}>
            <h3>
              <X />
              <sup>2</sup> eller 2<sup><X /></sup>?
            </h3>
            <div className="tablewrap">
              <table className="vt">
                <tbody>
                  <tr>
                    <th>
                      <X />
                    </th>
                    {XS.map((x) => (
                      <td key={x}>{x}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>
                      <X />
                      <sup>2</sup>
                    </th>
                    {XS.map((x) => (
                      <td key={x}>{x * x}</td>
                    ))}
                  </tr>
                  <tr>
                    <th>
                      2<sup><X /></sup>
                    </th>
                    {XS.map((x) => (
                      <td key={x} className="on">
                        {2 ** x}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <X />
              <sup>2</sup> er et <b>polynom</b>: grunntallet varierer, eksponenten er fast.
            </p>
            <p>
              2<sup><X /></sup> er en <b>eksponentialfunksjon</b>: grunntallet er fast, eksponenten varierer. Verdien{' '}
              <span className="pen">dobles</span> hver gang <X /> øker med 1.
            </p>
            <p className="muted small">Etter en stund vokser 2ˣ fra alle polynomer, uansett grad.</p>
          </div>
        )}
      </div>
    </div>
  </div>
);
