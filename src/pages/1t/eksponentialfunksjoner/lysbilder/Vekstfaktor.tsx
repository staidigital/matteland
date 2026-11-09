import React from 'react';
import { Frac, V } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const KORT: [React.ReactNode, React.ReactNode][] = [
  ['Økning på 4 %', '100 % + 4 % = 104 % = 1,04'],
  ['Nedgang på 20 %', '100 % − 20 % = 80 % = 0,80'],
  ['Økning på 2,6 %', '100 % + 2,6 % = 102,6 % = 1,026'],
  ['Vekstfaktor 0,86', '86 % = 100 % − 14 %. En nedgang på 14 %.'],
  ['Vekstfaktor 1,5', '150 % = 100 % + 50 %. En økning på 50 %.'],
  ['Vekstfaktor 2', '200 % = 100 % + 100 %. Verdien dobles.'],
];

export const VEKST_STEG = KORT.length;

export const Vekstfaktor: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Prosentvis endring</div>
    <h2>Grunntallet er vekstfaktoren</h2>
    <div className="cols">
      <div className="boxed">
        <span className="label">Vekstfaktor</span>
        <span className="math">100 % ± <V c="p" /> %</span>
        <p className="math" style={{ fontSize: '1.1em' }}>
          økning: 1 + <Frac n={<V c="p" />} d="100" /> &nbsp; nedgang: 1 − <Frac n={<V c="p" />} d="100" />
        </p>
      </div>
      <p>
        Vekstfaktoren forteller hvor mange prosent grafen stiger eller faller <b>hver gang vi går én enhet mot høyre</b>.
        Vi ganger med det samme tallet hver gang.
      </p>
    </div>
    <div className="grid3">
      {KORT.map(([s, svar], i) => (
        <div className="panel stack" key={i} style={{ gap: 8 }}>
          <b>{s}</b>
          {frag > i ? (
            <span className="reveal pen math" style={{ fontSize: '1.1em' }}>
              {svar}
            </span>
          ) : (
            <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
              Vis svar
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);
