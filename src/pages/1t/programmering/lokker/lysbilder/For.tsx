import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import { type LysbildeProps, StepButtons } from '../../../../../presentasjon/ui';

export const FOR_STEG = 3;

export const For: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">for-løkker</div>
    <h2>Gjenta et bestemt antall ganger</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">Oppbygning</span>
          <pre className="py-statisk" style={{ border: 0, padding: 0, background: 'none' }}>
            <span className="py-nok">for</span> <i>variabel</i> <span className="py-nok">in</span>{' '}
            <span className="py-inn">range</span>(<i>antall</i>)<b className="pen">:</b>
            {'\n'}
            <span style={{ background: 'var(--hl)' }}>{'    '}</span>
            <i>dette gjentas</i>
            {'\n'}
            <i>dette kjøres etter løkka</i>
          </pre>
        </div>
        {frag >= 1 && (
          <p className="reveal">
            <code>range(5)</code> gir tallene <b className="pen">0, 1, 2, 3 og 4</b>. Det er fem tall, men vi starter på 0 og
            stopper <i>før</i> 5.
          </p>
        )}
        {frag >= 2 && (
          <p className="reveal">
            For hver runde får <code>i</code> neste tall. Linjene med innrykk kjøres én gang per runde.
          </p>
        )}
        {frag >= 3 && (
          <p className="reveal">
            Kolon og innrykk virker akkurat som i if-setninger. Den første linja uten innrykk kjøres først når løkka er ferdig.
          </p>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={FOR_STEG} />
      </div>
      <div className="stack">
        <Kodeboks kode={"for i in range(5):\n    print('Runde', i)\nprint('Ferdig')"} variabler linjeForLinje />
        <p className="hintline">
          Hva skjer om du rykker inn <code>print('Ferdig')</code>? Prøv, og forklar.
        </p>
      </div>
    </div>
  </div>
);
