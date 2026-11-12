import React from 'react';
import { FunkGraf } from '../../../../../presentasjon/FunkGraf';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import { type LysbildeProps, StepButtons } from '../../../../../presentasjon/ui';

const f = (x: number) => x ** 3 - 2 * x - 5;

export const NULLPUNKT_STEG = 3;

export const EksempelNullpunkt: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Funksjoner og løkker</div>
    <h2>Finn nullpunktet med små steg</h2>
    <p>
      Likningen <span className="math nw">x³ − 2x − 5 = 0</span> kan vi ikke løse med en formel vi kjenner. Men datamaskinen kan
      prøve seg fram.
    </p>
    <div className="cols">
      <div className="stack">
        {frag >= 1 && (
          <div className="panel reveal">
            <b>Verditabell:</b> f(2) = −1 og f(3) = 16. Grafen går fra under til over x-aksen, så nullpunktet ligger mellom 2 og
            3.
          </div>
        )}
        {frag >= 2 && (
          <div className="panel reveal">
            <b>Små steg:</b> start på x = 2 og øk med 0,001 så lenge f(x) er negativ. Når løkka stopper, har vi passert
            nullpunktet.
          </div>
        )}
        {frag >= 3 && (
          <div className="panel reveal">
            Nullpunktet er <b className="pen">x ≈ 2,095</b>. Sjekk med GeoGebra. Hvordan kan du få flere desimaler?
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={NULLPUNKT_STEG} />
        <FunkGraf
          kurver={[{ f, fra: -0.5, til: 3.2, farge: 'c1' }]}
          punkter={[{ x: 2.0946, y: 0, farge: 'pen' }]}
          xmin={-0.5}
          xmax={3.3}
          ymin={-10}
          ymax={18}
          h={240}
          title="Grafen til f(x) = x³ − 2x − 5 med nullpunktet markert"
        />
      </div>
      <div className="stack">
        <Kodeboks
          kode={"def f(x):\n    return x**3 - 2*x - 5\n\nfor x in range(-1, 4):\n    print(x, f(x))\n\nx = 2\nwhile f(x) < 0:\n    x = x + 0.001\nprint('Nullpunkt omtrent ved x =', round(x, 3))"}
          variabler
        />
        <p className="hintline">
          Funksjonen skrives én gang, men brukes både i tabellen og i while-løkka. Bytt ut funksjonsuttrykket og finn et annet
          nullpunkt.
        </p>
      </div>
    </div>
  </div>
);
