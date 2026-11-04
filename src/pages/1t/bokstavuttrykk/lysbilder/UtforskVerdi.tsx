import React, { useState } from 'react';
import { X, minus, par } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

export const UtforskVerdi: React.FC = () => {
  const [x, setX] = useState(2);
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Regne med bokstaver</div>
      <h2>En bokstav står for et tall</h2>
      <div className="cols">
        <div className="stack">
          <Slider id="v-x" label={<X />} value={x} min={-5} max={5} step={1} onChange={setX} />
          <div className="panel math">
            <span className="mline">3<X /> + 5 − <X /> + 2</span>
            <span className="mline">= 3 · {par(x)} + 5 − {par(x)} + 2 = <b>{minus(3 * x + 5 - x + 2)}</b></span>
          </div>
          <div className="panel math right">
            <span className="mline">2<X /> + 7</span>
            <span className="mline">= 2 · {par(x)} + 7 = <b>{minus(2 * x + 7)}</b></span>
          </div>
          <div className="panel math wrong">
            <span className="mline">9<X /></span>
            <span className="mline">= 9 · {par(x)} = <b>{minus(9 * x)}</b></span>
          </div>
        </div>
        <div className="stack">
          <p>
            Når vi forenkler riktig, får uttrykkene samme verdi for <b>alle</b> tall. Flytt glidebryteren og se at de to første alltid er like.
          </p>
          <p>
            Tredje uttrykk er en vanlig feil: 3<X /> + 5 − <X /> + 2 er lagt sammen til 9<X />. Tall og <X />-ledd er ikke like ledd.
          </p>
          <ol className="small" style={{ margin: 0, paddingLeft: '1.3em' }}>
            <li>For hvilken verdi av <X /> gir 9<X /> tilfeldigvis riktig svar? Hvorfor er ikke det nok?</li>
            <li>Hvordan kan du bruke et tall til å kontrollere en forenkling?</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
