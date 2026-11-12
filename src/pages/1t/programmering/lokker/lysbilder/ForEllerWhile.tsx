import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

export const FOR_WHILE_STEG = 1;

export const ForEllerWhile: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">for eller while?</div>
    <h2>Når skal vi bruke hvilken?</h2>
    <div className="grid2">
      <div className="panel stack" style={{ gap: 6 }}>
        <h3>
          <code>for</code>
        </h3>
        <p className="small">Når vi vet hvor mange runder det skal bli, eller hvilke tall vi skal gå gjennom.</p>
        <p className="small muted">Verditabell fra −3 til 3, summen av de 100 første tallene, gangetabellen.</p>
      </div>
      <div className="panel stack" style={{ gap: 6 }}>
        <h3>
          <code>while</code>
        </h3>
        <p className="small">Når vi ikke vet hvor mange runder det blir, bare når vi skal stoppe.</p>
        <p className="small muted">Til beløpet er doblet, til verdien er under en grense, til brukeren skriver riktig svar.</p>
      </div>
    </div>
    <div className="cols">
      <div className="stack">
        <h3>En løkke som aldri slutter</h3>
        <p>
          Programmet skal telle oppover i totrinn til n blir 10. Kjør det. Etter noen sekunder stopper kodeboksen det. Hvorfor
          slutter det aldri?
        </p>
        {frag >= 1 ? (
          <div className="panel reveal small">
            n blir 1, 3, 5, 7, 9, 11, … og blir aldri <i>nøyaktig</i> 10, så <code>n != 10</code> er alltid sant. Bruk heller{' '}
            <code>n &lt; 10</code>. Sjekk alltid at noe i løkka gjør at vilkåret til slutt blir usant.
          </div>
        ) : (
          <button className="btn" onClick={() => setFrag(1)} style={{ alignSelf: 'start' }}>
            Vis svar
          </button>
        )}
      </div>
      <Kodeboks kode={"n = 1\nwhile n != 10:\n    n = n + 2\nprint('Ferdig, n er', n)"} variabler />
    </div>
  </div>
);
