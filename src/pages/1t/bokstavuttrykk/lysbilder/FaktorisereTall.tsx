import React from 'react';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>60 = 2 · 30</>, t: '60 er et partall, så vi deler med 2.' },
  { m: <>60 = 2 · 2 · 15</>, t: '30 er også et partall.' },
  { m: <>60 = 2 · 2 · 3 · 5</>, t: '15 kan ikke deles med 2, men med 3. Nå er alle faktorene primtall, og vi er ferdige.' },
  { m: <>84 = <span className="pen">2 · 2 · 3 · 7</span> &nbsp;og&nbsp; 45 = <span className="pen">3 · 3 · 5</span></>, t: 'Prøv de minste primtallene først: 2, 3, 5, 7, …' },
];

export const FAKTOR_TALL_STEG = TRINN.length;

export const FaktorisereTall: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Faktorisere tall</div>
    <h2>Skriv tallet som et produkt av primtall</h2>
    <div className="grid2">
      <div className="boxed">
        <span className="label">Primtall</span>
        Et helt tall større enn 1 som bare kan deles med 1 og seg selv.
        <span className="mline math">2, 3, 5, 7, 11, 13, 17, 19, 23, …</span>
      </div>
      <div className="boxed">
        <span className="label">Faktorisere</span>
        Å skrive noe som et <b>produkt</b>. Tallene vi ganger sammen, kaller vi <b>faktorer</b>. Alle hele tall større enn 1 kan skrives som et produkt av primtall, og bortsett fra rekkefølgen er det bare én måte å gjøre det på.
      </div>
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={FAKTOR_TALL_STEG} />
  </div>
);
