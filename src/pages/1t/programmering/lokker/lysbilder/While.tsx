import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

export const While: React.FC = () => (
  <div className="slide">
    <div className="kicker">while-løkker</div>
    <h2>Gjenta så lenge noe er sant</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">Oppbygning</span>
          <Kode>{'while vilkår:\n    dette gjentas'}</Kode>
          <p className="small" style={{ marginTop: 8 }}>
            Python sjekker vilkåret før hver runde. Er det sant, kjøres linjene med innrykk, og så sjekkes vilkåret igjen. Er
            det usant, går programmet videre.
          </p>
        </div>
        <p>
          Du setter 20 000 kr i banken med 4,5 % rente. Hvor mange år tar det før beløpet er doblet? I variabler-presentasjonen
          prøvde vi oss fram. Nå gjør løkka det for oss.
        </p>
      </div>
      <div className="stack">
        <Kodeboks
          kode={"belop = 20000\nar = 0\n\nwhile belop < 40000:\n    belop = belop * 1.045\n    ar = ar + 1\n\nprint(f'Etter {ar} år er beløpet {round(belop)} kr')"}
          variabler
          linjeForLinje
        />
        <p className="hintline">Hvor lang tid tar det med 3 % rente? Og med 7 %?</p>
      </div>
    </div>
  </div>
);
