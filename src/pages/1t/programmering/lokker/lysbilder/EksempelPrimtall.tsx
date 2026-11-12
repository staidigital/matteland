import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import { type LysbildeProps, StepButtons } from '../../../../../presentasjon/ui';

export const PRIMTALL_STEG = 3;

export const EksempelPrimtall: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Løkker, if og modulo</div>
    <h2>Er tallet et primtall?</h2>
    <p>Et primtall er et tall større enn 1 som bare er delelig med 1 og seg selv. Er 91 et primtall?</p>
    <div className="cols">
      <div className="stack">
        {frag >= 1 && (
          <div className="panel reveal">
            <b>Idé:</b> prøv å dele på alle tallene fra 2 og opp til n − 1. Går én av dem opp (<code>n % d == 0</code>), er n
            ikke et primtall.
          </div>
        )}
        {frag >= 2 && (
          <div className="panel reveal">
            <b>Antall delere:</b> vi teller hvor mange tall som går opp, akkurat som når vi summerer. Er antallet 0 når løkka er
            ferdig, er n et primtall.
          </div>
        )}
        {frag >= 3 && (
          <div className="panel reveal">
            91 = 7 · 13, så 91 er <b className="pen">ikke</b> et primtall. Prøv 97. Hvor høyt må vi egentlig teste? (Holder det
            med opp til √n?)
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={PRIMTALL_STEG} />
      </div>
      <Kodeboks
        kode={"n = 91\ndelere = 0\n\nfor d in range(2, n):\n    if n % d == 0:\n        print(d, 'går opp i', n)\n        delere = delere + 1\n\nif delere == 0:\n    print(n, 'er et primtall')\nelse:\n    print(n, 'er ikke et primtall')"}
        variabler
      />
    </div>
  </div>
);
