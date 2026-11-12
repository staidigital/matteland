import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import { type LysbildeProps, StepButtons } from '../../../../../presentasjon/ui';

const PAR: [React.ReactNode, string, string][] = [
  [<>f(x) = 3x + 2</>, 'def f(x):\n    return 3*x + 2', 'Definerer funksjonen'],
  [<>f(4)</>, 'f(4)', 'Bruker (kaller) funksjonen med x = 4'],
  [<>y = f(4) = 14</>, 'y = f(4)', 'Lagrer funksjonsverdien i en variabel'],
];

export const DEF_STEG = 3;

export const Def: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">def og return</div>
    <h2>Lage og bruke en funksjon</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">Oppbygning</span>
          <pre className="py-statisk" style={{ border: 0, padding: 0, background: 'none' }}>
            <span className="py-nok">def</span> <i>navn</i>(<i>parameter</i>)<b className="pen">:</b>
            {'\n'}
            <span style={{ background: 'var(--hl)' }}>{'    '}</span>
            <i>utregninger</i>
            {'\n'}
            <span style={{ background: 'var(--hl)' }}>{'    '}</span>
            <span className="py-nok">return</span> <i>svaret</i>
          </pre>
        </div>
        {frag >= 1 && (
          <p className="reveal">
            <code>def</code> lager funksjonen, men <b>kjører den ikke</b>. Ingenting skjer før vi bruker den.
          </p>
        )}
        {frag >= 2 && (
          <p className="reveal">
            Når vi skriver <code>f(4)</code>, får parameteren x verdien 4, og linjene i funksjonen kjøres.
          </p>
        )}
        {frag >= 3 && (
          <p className="reveal">
            <code>return</code> sender svaret tilbake. <code>f(4)</code> blir byttet ut med 14 der den står.
          </p>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={DEF_STEG} />
      </div>
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
              {PAR.map(([m, p, t], i) => (
                <tr key={i}>
                  <td className="math nw">{m}</td>
                  <td>
                    <span style={{ fontSize: '0.85em', display: 'block' }}>
                      <Kode>{p}</Kode>
                    </span>
                    <span className="small muted">{t}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Kodeboks kode={'def f(x):\n    return 3*x + 2\n\ny = f(4)\nprint(y)\nprint(f(10) - f(0))'} variabler linjeForLinje />
      </div>
    </div>
  </div>
);
