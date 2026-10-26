import React from 'react';
import { V, X } from '../../../../presentasjon/matte';
import { Fx, Intervall, Mengde } from '../felles';

/** Liten tallinje som viser et intervall med åpne/lukkede endepunkter */
const Tallinje: React.FC<{ aMed: boolean; bMed?: boolean; uendelig?: boolean }> = ({ aMed, bMed = true, uendelig }) => {
  const xa = 30;
  const xb = uendelig ? 150 : 120;
  return (
    <svg width="160" height="26" viewBox="0 0 160 26" aria-hidden="true">
      <line x1="4" x2="156" y1="13" y2="13" style={{ stroke: 'var(--muted)', strokeWidth: 1.5 }} />
      <line x1={xa} x2={xb} y1="13" y2="13" style={{ stroke: 'var(--pen)', strokeWidth: 5 }} />
      {uendelig && <path d="M146 6 L156 13 L146 20" style={{ fill: 'none', stroke: 'var(--pen)', strokeWidth: 2.5 }} />}
      <circle cx={xa} cy="13" r="5.5" style={aMed ? { fill: 'var(--pen)' } : { fill: 'var(--card)', stroke: 'var(--pen)', strokeWidth: 2.5 }} />
      {!uendelig && (
        <circle cx={xb} cy="13" r="5.5" style={bMed ? { fill: 'var(--pen)' } : { fill: 'var(--card)', stroke: 'var(--pen)', strokeWidth: 2.5 }} />
      )}
    </svg>
  );
};

const a = <V c="a" />;
const b = <V c="b" />;

type Rad = { iv: React.ReactNode; betyr: React.ReactNode; type: string; linje: React.ReactNode };

const RADER: Rad[] = [
  { iv: <>[{a} , {b}]</>, betyr: <>{a} ≤ <X /> ≤ {b}</>, type: 'lukket', linje: <Tallinje aMed bMed /> },
  { iv: <>⟨{a} , {b}⟩</>, betyr: <>{a} &lt; <X /> &lt; {b}</>, type: 'åpent', linje: <Tallinje aMed={false} bMed={false} /> },
  { iv: <>⟨{a} , {b}]</>, betyr: <>{a} &lt; <X /> ≤ {b}</>, type: 'halvåpent', linje: <Tallinje aMed={false} bMed /> },
  { iv: <>[{a} , {b}⟩</>, betyr: <>{a} ≤ <X /> &lt; {b}</>, type: 'halvåpent', linje: <Tallinje aMed bMed={false} /> },
  { iv: <>[{a} , →⟩</>, betyr: <><X /> ≥ {a}</>, type: 'uten øvre grense', linje: <Tallinje aMed uendelig /> },
];

export const Intervaller: React.FC = () => (
  <div className="slide">
    <div className="kicker">Intervaller</div>
    <h2>Skrivemåter, og hvorfor vi begrenser</h2>
    <div className="cols">
      <div className="stack">
        <div className="tablewrap">
          <table className="cases">
            <thead>
              <tr>
                <th>Intervall</th>
                <th>Betyr</th>
                <th>Type</th>
                <th aria-label="Tallinje" />
              </tr>
            </thead>
            <tbody>
              {RADER.map(({ iv, betyr, type, linje }, i) => (
                <tr key={i}>
                  <td className="math nw">{iv}</td>
                  <td className="math nw">{betyr}</td>
                  <td className="small">{type}</td>
                  <td>{linje}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small muted">
          Hakeparentes: tallet er med. Spissparentes: tallet er ikke med. <span className="math">ℝ</span> betyr alle reelle
          tall.
        </p>
      </div>
      <div className="stack">
        <h3>Tre grunner til å begrense definisjonsmengden</h3>
        <ol className="steps">
          <li>
            <span className="no">1</span>
            <div>
              <p>
                <b>Uttrykket</b> tillater det ikke.
              </p>
              <p className="math">
                <Fx f="g" /> = √<X /> &nbsp; gir &nbsp; <Mengde m="D" f="g" /> = <Intervall a={0} b={Infinity} />
              </p>
            </div>
          </li>
          <li>
            <span className="no">2</span>
            <div>
              <p>
                <b>Situasjonen</b> gir bare mening for noen verdier.
              </p>
              <p className="math">
                Figurtall: <Mengde m="D" f="K" /> = ℕ = {'{'}1, 2, 3, …{'}'}
              </p>
              <p className="math">
                Et døgn: <Mengde m="D" f="T" /> = <Intervall a={0} b={24} />
              </p>
            </div>
          </li>
          <li>
            <span className="no">3</span>
            <div>
              <p>
                <b>Oppgaven</b> bestemmer det.
              </p>
              <p className="math">
                <Fx /> = 10<X /> + 200, &nbsp; <Mengde m="D" /> = <Intervall a={0} b={12} aMed={false} />
              </p>
            </div>
          </li>
        </ol>
        <p className="small muted">
          Står det ingen definisjonsmengde, er den alle <X />
          -verdier der uttrykket gir mening.
        </p>
      </div>
    </div>
  </div>
);
