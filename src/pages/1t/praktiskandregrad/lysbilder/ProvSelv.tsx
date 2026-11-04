import React from 'react';
import { V, X, Xk } from '../../../../presentasjon/matte';
import { ProvOppgaver, type ProvOppgave } from '../../../../presentasjon/ovelser';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const T = () => <V c="t" />;

const OPPGAVER: ProvOppgave[] = [
  { sporsmal: <>Et rektangel er 4 cm lengre enn det er bredt, og arealet er 60 cm². Finn sidene.</>, svar: <><span className="mline"><X />(<X /> + 4) = 60</span><span className="mline"><X /> = 6 eller <X /> = −10</span><span className="mline pen">6 cm og 10 cm</span></> },
  { sporsmal: <>Når siden i et kvadrat øker med 3 cm, blir arealet 64 cm². Hvor lang var siden?</>, svar: <><span className="mline">(<X /> + 3)<sup>2</sup> = 64</span><span className="mline"><X /> + 3 = ±8</span><span className="mline pen">5 cm</span></> },
  { sporsmal: <>Summen av et tall og kvadratet av tallet er 30. Hvilket tall er det?</>, svar: <><span className="mline"><Xk /> + <X /> − 30 = 0</span><span className="mline pen"><X /> = 5 eller <X /> = −6</span><span className="mline small">Begge stemmer.</span></> },
  { sporsmal: <>En ball har høyden <span className="math nw">−5<T /><sup>2</sup> + 20<T /> + 25</span> meter etter <T /> sekunder. Når lander den?</>, svar: <><span className="mline"><T /><sup>2</sup> − 4<T /> − 5 = 0</span><span className="mline"><T /> = 5 eller <T /> = −1</span><span className="mline pen">Etter 5 sekunder</span></> },
  { sporsmal: <>I en rettvinklet trekant er katetene <X /> og <X /> + 2, og hypotenusen er 10. Finn katetene.</>, svar: <><span className="mline"><Xk /> + (<X /> + 2)<sup>2</sup> = 100</span><span className="mline"><Xk /> + 2<X /> − 48 = 0</span><span className="mline pen">6 og 8</span></> },
  { sporsmal: <>Overskuddet er <span className="math nw">−<Xk /> + 40<X /> − 300</span> kroner ved <X /> enheter. Når går bedriften med overskudd?</>, svar: <><span className="mline"><Xk /> − 40<X /> + 300 = 0</span><span className="mline"><X /> = 10 eller <X /> = 30</span><span className="mline pen">Mellom 10 og 30 enheter</span></> },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Fra tekst til likning</h2>
    <ProvOppgaver oppgaver={OPPGAVER} {...p} />
  </div>
);
