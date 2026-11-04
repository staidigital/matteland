import React from 'react';
import { Frac, X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><X /> = bredden i cm, så lengden er <X /> + 3</>, t: 'Bestem hva x står for.' },
  { m: <><X />(<X /> + 3) = 40</>, t: 'Areal er lengde ganger bredde.' },
  { m: <><Xk /> + 3<X /> − 40 = 0</>, t: 'Gang ut, og samle alt på venstre side.' },
  { m: <><X /> = <Frac n="−3 ± 13" d="2" />, &nbsp; altså <X /> = 5 eller <X /> = −8</>, t: 'Bruk abc-formelen. Sum og produkt virker også: 8 og −5.' },
  { m: <><span className="pen">Bredden er 5 cm, og lengden er 8 cm.</span></>, t: 'En lengde kan ikke være negativ, så vi forkaster −8. Kontroll: 5 · 8 = 40.' },
];

export const REKT_STEG = TRINN.length;

export const Rektangel: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Areal</div>
    <h2>Regn deg frem til svaret</h2>
    <div className="boxed">
      <span className="label">Oppgave</span>
      Et rektangel er 3 cm lengre enn det er bredt, og arealet er 40 cm². Finn sidene.
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={REKT_STEG} />
  </div>
);
