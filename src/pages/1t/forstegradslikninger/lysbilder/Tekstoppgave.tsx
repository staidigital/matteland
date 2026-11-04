import React from 'react';
import { X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><X /> = antall elever</>, t: 'Bestem hva x står for.' },
  { m: <>3000 + 150<X /> = 6300</>, t: 'Skriv prisen på to måter: med x og med tallet fra oppgaven.' },
  { m: <>150<X /> = 3300</>, t: 'Flytt over 3000 og skift fortegn.' },
  { m: <span className="pen"><X /> = 22</span>, t: 'Del på 150.' },
  { m: <>3000 + 150 · 22 = 6300</>, t: 'Sett prøve. Svaret stemmer, så det var 22 elever på turen.' },
];

export const TEKST_STEG = TRINN.length;

export const Tekstoppgave: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Fra tekst til likning</div>
    <h2>Sett navn på det du ikke vet</h2>
    <div className="boxed">
      <span className="label math">Oppgave</span>
      En klasse leier buss til en tur. Det koster 3000 kroner, pluss 150 kroner per elev. Regningen ble på 6300 kroner. Hvor mange elever var med?
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={TEKST_STEG} />
  </div>
);
