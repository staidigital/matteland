import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

export const REKKEFOLGE_STEG = 2;

export const Rekkefolge: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Reflekter og diskuter</div>
    <h2>Hva skriver programmet ut?</h2>
    <div className="cols wide-left">
      <Kodeboks
        kode={"poeng = 85\n\nif poeng >= 50:\n    print('Bestått')\nelif poeng >= 80:\n    print('Veldig bra!')\nelse:\n    print('Ikke bestått')"}
        linjeForLinje
      />
      <div className="stack">
        <p>
          Elevene skal få «Veldig bra!» når de har minst 80 poeng. Hva skriver programmet ut for 85 poeng? Bestem deg før du
          kjører.
        </p>
        {frag >= 1 ? (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <p>
              Det skrives bare ut <code className="py-inline pen">Bestått</code>.
            </p>
            <p className="small">
              85 ≥ 50 er sant, så den første delen kjøres. Da hopper Python over resten, selv om 85 ≥ 80 også er sant.
            </p>
          </div>
        ) : (
          <button className="btn" onClick={() => setFrag(1)} style={{ alignSelf: 'start' }}>
            Vis svar
          </button>
        )}
        {frag >= 2 ? (
          <div className="panel reveal small">
            <b>Rett programmet:</b> sjekk det strengeste vilkåret først, altså <code>poeng &gt;= 80</code> før{' '}
            <code>poeng &gt;= 50</code>.
          </div>
        ) : (
          frag >= 1 && (
            <button className="btn" onClick={() => setFrag(2)} style={{ alignSelf: 'start' }}>
              Hvordan retter vi det?
            </button>
          )
        )}
      </div>
    </div>
  </div>
);
