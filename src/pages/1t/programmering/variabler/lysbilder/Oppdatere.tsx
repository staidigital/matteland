import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import { type LysbildeProps, StepButtons } from '../../../../../presentasjon/ui';

export const OPPDATERE_STEG = 3;

export const Oppdatere: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Tilordning</div>
    <h2>
      <code style={{ fontSize: '0.9em' }}>=</code> betyr «sett lik», ikke «er lik»
    </h2>
    <div className="cols">
      <div className="stack">
        <p>
          I matematikken er <span className="math">x = x + 1</span> en likning uten løsning. I Python er det en ordre:
        </p>
        <div className="boxed">
          <Kode>{'x = x + 1'}</Kode>
          <ol className="stack small" style={{ gap: 4, paddingLeft: '1.2em', margin: '8px 0 0' }}>
            {frag >= 1 && <li className="reveal">Regn ut høyre side med den verdien x har nå.</li>}
            {frag >= 2 && <li className="reveal">Legg svaret i x. Den gamle verdien forsvinner.</li>}
          </ol>
        </div>
        {frag >= 3 && (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <p className="small">
              Til venstre for <code>=</code> må det alltid stå ett variabelnavn. <code>5 = x</code> og{' '}
              <code>x + 1 = y</code> gir feilmelding.
            </p>
            <p className="small muted">
              Kortform: <code>x += 1</code> betyr det samme som <code>x = x + 1</code>.
            </p>
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={OPPDATERE_STEG} />
      </div>
      <div className="stack">
        <Kodeboks
          kode={'penger = 1000\npenger = penger + 500\npenger = penger * 2\nprint(penger)'}
          variabler
          linjeForLinje
        />
        <p className="hintline">Hva er verdien av penger etter hver linje? Tenk først, og sjekk med «Linje for linje».</p>
      </div>
    </div>
  </div>
);
