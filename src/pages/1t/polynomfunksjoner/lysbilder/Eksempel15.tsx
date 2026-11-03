import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { pkt } from '../../skjaeringspunkter/felles';
import { Pol, ekstremalpunkter, polynom } from '../felles';

const K = [1, -1, -2, 0];
const f = polynom(K);
const [TOPP, BUNN] = ekstremalpunkter(f, -3, 3);

export const EKS15_STEG = 3;

export const Eksempel15: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel 15 · Ekstremalpunkter og nullpunkter digitalt</div>
    <h2>En tredjegradsfunksjon i GeoGebra</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed math big">
          <Fx />
          <Op>=</Op>
          <Pol k={K} />
        </div>
        {frag >= 1 && (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <p>
              <b>a</b> &nbsp;Skriv inn funksjonsuttrykket i algebrafeltet:
            </p>
            <pre className="kode">f(x) = x^3 - x^2 - 2x</pre>
          </div>
        )}
        {frag >= 2 && (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <p>
              <b>b</b> &nbsp;<code>Nullpunkt(f)</code> gir tre nullpunkter:{' '}
              <span className="math nw">
                <X /> = −1, &nbsp;
                <X /> = 0 &nbsp;og&nbsp; <X /> = 2
              </span>
            </p>
            <p className="small muted">
              Kontroll: <span className="math nw">x³ − x² − 2x = x(x² − x − 2) = x(x + 1)(x − 2)</span>
            </p>
          </div>
        )}
        {frag >= 3 && (
          <div className="panel reveal">
            <b>c</b> &nbsp;<code>Ekstremalpunkt(f)</code> gir toppunktet{' '}
            <b className="c2 nw">{pkt(TOPP.x, TOPP.y, 2)}</b> og bunnpunktet{' '}
            <b className="c1 nw">{pkt(BUNN.x, BUNN.y, 2)}</b>.
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={EKS15_STEG} />
      </div>
      <FunkGraf
        kurver={frag >= 1 ? [{ f }] : []}
        punkter={[
          ...(frag >= 2
            ? [
                { x: -1, y: 0, farge: 'pen', navn: '(−1 , 0)', plass: 'under' as const },
                { x: 0, y: 0, farge: 'pen', navn: '(0 , 0)', plass: 'hoyre' as const },
                { x: 2, y: 0, farge: 'pen', navn: '(2 , 0)', plass: 'hoyre' as const },
              ]
            : []),
          ...(frag >= 3
            ? [
                { x: TOPP.x, y: TOPP.y, farge: 'c2', navn: pkt(TOPP.x, TOPP.y, 2), plass: 'over' as const },
                { x: BUNN.x, y: BUNN.y, farge: 'c1', navn: pkt(BUNN.x, BUNN.y, 2), plass: 'under' as const },
              ]
            : []),
        ]}
        xmin={-3}
        xmax={3.5}
        ymin={-3.5}
        ymax={3.5}
        xetikett={1}
        h={400}
        title="Grafen til f(x) = x³ − x² − 2x med nullpunkter, toppunkt og bunnpunkt"
      />
    </div>
  </div>
);
