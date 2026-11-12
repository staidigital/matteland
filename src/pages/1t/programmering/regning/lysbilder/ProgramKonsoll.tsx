import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import { Konsoll } from '../../../../../presentasjon/python/Konsoll';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

export const KONSOLL_STEG = 1;

export const ProgramKonsoll: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel 2 · Konsollen</div>
    <h2>Program eller konsoll?</h2>
    <div className="cols">
      <div className="stack">
        <p>
          <b>Program:</b> mange linjer som kjøres fra toppen hver gang. Vi må bruke <code>print</code> for å se noe.
        </p>
        <Kodeboks kode={'3 + 4.2 - 5*11 + 10.46/2'} />
        <p className="hintline">Kjør programmet. Hvorfor kommer det ikke noe svar? Rett det.</p>
      </div>
      <div className="stack">
        <p>
          <b>Konsoll:</b> én linje om gangen. Trykk Enter, så kommer svaret med en gang, uten <code>print</code>.
        </p>
        <Konsoll forslag={['3 + 4.2 - 5*11 + 10.46/2', '0.1 + 0.2', '2**100']} />
      </div>
    </div>
    <div className="panel stack" style={{ gap: 6 }}>
      <p>
        <b className="pen">?</b> &nbsp;Svaret blir <code>-42.56999999999999</code> og ikke −42,57. Hvorfor?
      </p>
      {frag >= 1 ? (
        <p className="reveal small">
          Datamaskinen lagrer tall i totallsystemet. Der kan ikke 0,1 eller 10,46 skrives nøyaktig, akkurat som 1/3 ikke kan
          skrives nøyaktig som desimaltall hos oss. Det gir en bitteliten avrundingsfeil helt bakerst. Svaret er likevel −42,57.
        </p>
      ) : (
        <button className="btn" onClick={() => setFrag(1)} style={{ alignSelf: 'start' }}>
          Vis svar
        </button>
      )}
    </div>
  </div>
);
