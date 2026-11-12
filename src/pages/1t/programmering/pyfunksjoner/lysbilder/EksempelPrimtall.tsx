import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

export const EksempelPrimtall: React.FC = () => (
  <div className="slide">
    <div className="kicker">Eksempel · Funksjoner som svarer ja eller nei</div>
    <h2>Alle primtall under 50</h2>
    <div className="cols">
      <div className="stack">
        <p>
          I løkke-presentasjonen sjekket vi om ett tall var et primtall. Nå pakker vi det inn i en funksjon som svarer{' '}
          <code>True</code> eller <code>False</code>. Da kan vi bruke den i en if-setning, og teste mange tall.
        </p>
        <div className="boxed">
          <span className="label">return avslutter funksjonen</span>
          <p className="small">
            Så snart Python kommer til en <code>return</code>, er funksjonen ferdig. Finner vi én deler, kan vi svare{' '}
            <code>False</code> med en gang, uten å teste resten.
          </p>
        </div>
        <p className="hintline">Hvor mange primtall finnes under 1000? Lag en teller.</p>
      </div>
      <Kodeboks
        kode={"def er_primtall(n):\n    if n < 2:\n        return False\n    for d in range(2, n):\n        if n % d == 0:\n            return False\n    return True\n\nfor n in range(1, 51):\n    if er_primtall(n):\n        print(n, end=' ')"}
      />
    </div>
  </div>
);
