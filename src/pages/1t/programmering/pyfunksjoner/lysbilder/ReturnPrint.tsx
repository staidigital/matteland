import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

export const RETURN_STEG = 2;

export const ReturnPrint: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Reflekter og diskuter</div>
    <h2>return eller print?</h2>
    <div className="cols wide-left">
      <Kodeboks
        kode={"def dobbel_print(x):\n    print(2 * x)\n\ndef dobbel_return(x):\n    return 2 * x\n\na = dobbel_print(5)\nb = dobbel_return(5)\nprint('a er', a)\nprint('b er', b)"}
        variabler
        linjeForLinje
      />
      <div className="stack">
        <p>Begge funksjonene ser ut til å regne ut det dobbelte. Hva tror du a og b blir? Kjør og se.</p>
        <div className="panel stack" style={{ gap: 6 }}>
          <p>
            <b className="pen">1</b> &nbsp;Hvorfor blir a <code>None</code>?
          </p>
          {frag >= 1 ? (
            <p className="small reveal">
              <code>dobbel_print</code> skriver 10 på skjermen, men sender ingenting tilbake. En funksjon uten return gir{' '}
              <code>None</code>, som betyr «ingenting».
            </p>
          ) : (
            <button className="btn" onClick={() => setFrag(1)} style={{ alignSelf: 'start' }}>
              Vis svar
            </button>
          )}
        </div>
        <div className="panel stack" style={{ gap: 6 }}>
          <p>
            <b className="pen">2</b> &nbsp;Når skal vi bruke hva?
          </p>
          {frag >= 2 ? (
            <p className="small reveal">
              Bruk <code>return</code> når svaret skal brukes videre: lagres, regnes med eller sammenlignes. Bruk{' '}
              <code>print</code> bare når noe skal vises til den som kjører programmet. Matematiske funksjoner skal nesten
              alltid ha return.
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
