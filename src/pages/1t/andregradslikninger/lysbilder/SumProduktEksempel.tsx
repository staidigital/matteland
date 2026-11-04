import React from 'react';
import { X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>Sum 5 og produkt 6</>, t: 'Tallet foran x er summen, og konstantleddet er produktet.' },
  { m: <>1 · 6 = 6, men 1 + 6 = 7. &nbsp; 2 · 3 = 6, og <span className="pen">2 + 3 = 5</span> <span className="right">✓</span></>, t: 'Finn par med riktig produkt, og sjekk summen. Da er det færre par å prøve.' },
  { m: <>(<X /> + 2)(<X /> + 3) = 0</>, t: 'Skriv venstre side som et produkt.' },
  { m: <span className="pen"><X /> = −2 eller <X /> = −3</span>, t: 'Bruk produktregelen. Tallene i parentesene skifter fortegn.' },
  { m: <>Prøve: (−2)<sup>2</sup> + 5 · (−2) + 6 = 4 − 10 + 6 = 0 <span className="right">✓</span></>, t: 'Sett gjerne svaret inn i likningen.' },
];

export const EKSEMPEL_STEG = TRINN.length;

export const SumProduktEksempel: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Sum og produkt</div>
    <h2>Løs <span className="math"><Xk /> + 5<X /> + 6 = 0</span></h2>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={EKSEMPEL_STEG} />
  </div>
);
