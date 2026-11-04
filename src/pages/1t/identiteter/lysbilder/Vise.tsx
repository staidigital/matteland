import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>Venstre side: (<X /> + 3)<sup>2</sup> − 6<X /></>, t: 'Velg den siden det er mest å regne på.' },
  { m: <>= <Xk /> + 6<X /> + 9 − 6<X /></>, t: 'Bruk 1. kvadratsetning.' },
  { m: <>= <Xk /> + 9</>, t: 'Trekk sammen like ledd.' },
  { m: <>= <span className="pen">høyre side</span> <span className="right">✓</span></>, t: 'Vi har ikke brukt noe spesielt tall for x, så dette gjelder for alle x.' },
];

export const VISE_STEG = TRINN.length;

export const Vise: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Fremgangsmåte</div>
    <h2>Regn fra den ene siden til den andre</h2>
    <div className="boxed">
      <span className="label">Oppgave</span>
      Vis at <span className="math nw">(<X /> + 3)<sup>2</sup> − 6<X /> = <Xk /> + 9</span>.
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={VISE_STEG} />
    <p className="muted">Ikke flytt ledd over likhetstegnet. Det er jo likheten vi skal vise, så vi kan ikke bruke den ennå.</p>
  </div>
);
