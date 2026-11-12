import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

export const EksempelFizzBuzz: React.FC = () => (
  <div className="slide">
    <div className="kicker">Eksempel · Løkker og if</div>
    <h2>FizzBuzz for alle tallene</h2>
    <div className="cols">
      <div className="stack">
        <p>
          I forrige presentasjon sjekket vi ett tall om gangen. Med en løkke rundt if-setningen får vi hele rekka: 1, 2, Fizz, 4,
          Buzz, Fizz, 7, …
        </p>
        <p>
          Legg merke til innrykket: if-setningen står <b>inne i</b> løkka, så den kjøres én gang for hvert tall.
        </p>
        <p className="hintline">
          Endre programmet så det skriver «Bang» for tall som er delelige med 7. Hvor i rekkefølgen må det nye vilkåret stå?
        </p>
      </div>
      <Kodeboks
        kode={"for n in range(1, 31):\n    if n % 15 == 0:\n        print('FizzBuzz')\n    elif n % 3 == 0:\n        print('Fizz')\n    elif n % 5 == 0:\n        print('Buzz')\n    else:\n        print(n)"}
      />
    </div>
  </div>
);
