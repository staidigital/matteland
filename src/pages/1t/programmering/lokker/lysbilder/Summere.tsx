import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

export const SUMMERE_STEG = 2;

export const Summere: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Summere med en løkke</div>
    <h2>1 + 2 + 3 + … + 100</h2>
    <div className="cols wide-left">
      <div className="stack">
        <Kodeboks
          kode={"summen = 0\nfor i in range(1, 101):\n    summen = summen + i\nprint('Summen er', summen)"}
          variabler
          linjeForLinje
        />
        <p className="hintline">
          Endre 101 til 6, og gå gjennom linje for linje. Se hvordan <code>summen</code> vokser.
        </p>
      </div>
      <div className="stack">
        <p>
          Vi starter med <code>summen = 0</code>. For hver runde legger vi til det neste tallet. Det er den samme oppdateringen
          som <code>x = x + 1</code>, bare inne i en løkke.
        </p>
        <div className="panel stack" style={{ gap: 6 }}>
          <p>
            <b className="pen">1</b> &nbsp;Hva skjer om <code>summen = 0</code> flyttes inn i løkka?
          </p>
          {frag >= 1 ? (
            <p className="small reveal">
              Da nullstilles summen i hver runde, og programmet skriver ut 100, bare det siste tallet.
            </p>
          ) : (
            <button className="btn" onClick={() => setFrag(1)} style={{ alignSelf: 'start' }}>
              Vis svar
            </button>
          )}
        </div>
        <div className="panel stack" style={{ gap: 6 }}>
          <p>
            <b className="pen">2</b> &nbsp;Hvordan kan du regne ut summen uten datamaskin?
          </p>
          {frag >= 2 ? (
            <p className="small reveal">
              Legg sammen første og siste, andre og nest siste, og så videre: 1 + 100, 2 + 99, … Det blir 50 par som hver gir
              101, altså 50 · 101 = 5050. Formelen for trekanttall: <span className="math nw">n(n + 1)/2</span>.
            </p>
          ) : (
            <button className="btn" onClick={() => setFrag(2)} style={{ alignSelf: 'start' }}>
              Vis svar
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);
