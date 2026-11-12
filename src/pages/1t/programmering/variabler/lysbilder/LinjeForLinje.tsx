import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

export const LINJE_STEG = 1;

export const LinjeForLinje: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Reflekter og diskuter</div>
    <h2>Hva skriver programmet ut?</h2>
    <div className="cols wide-left">
      <Kodeboks kode={'x = 3\ny = x + 2\nx = 10\nprint(x, y)'} variabler linjeForLinje />
      <div className="stack">
        <p>
          Bestem deg først: blir det <code>10 12</code> eller <code>10 5</code>? Diskuter med sidemannen.
        </p>
        <p className="small muted">Bruk «Linje for linje» og følg med i tabellen.</p>
        {frag >= 1 ? (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <p>
              Svaret er <code className="py-inline pen">10 5</code>.
            </p>
            <p className="small">
              I linje 2 regner Python ut <code>x + 2</code> med verdien x har <b>da</b>, altså 3 + 2 = 5. Variabelen y husker
              svaret, ikke regnestykket. Når x endres i linje 3, påvirker det ikke y.
            </p>
          </div>
        ) : (
          <button className="btn" onClick={() => setFrag(1)} style={{ alignSelf: 'start' }}>
            Vis svar
          </button>
        )}
      </div>
    </div>
  </div>
);
