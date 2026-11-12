import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';

export const ElseElif: React.FC = () => (
  <div className="slide">
    <div className="kicker">else og elif</div>
    <h2>Flere veier gjennom programmet</h2>
    <div className="cols">
      <div className="stack">
        <div className="panel stack" style={{ gap: 6 }}>
          <p>
            <code>else</code> betyr «ellers». Den kjøres når vilkåret i if-en er usant. Den har ikke noe eget vilkår.
          </p>
          <Kode>{"if tall >= 0:\n    print('Ikke negativt')\nelse:\n    print('Negativt')"}</Kode>
        </div>
        <div className="panel stack" style={{ gap: 6 }}>
          <p>
            <code>elif</code> er kort for «else if». Python sjekker vilkårene ovenfra og ned, og kjører <b>bare den første</b>{' '}
            delen som er sann.
          </p>
        </div>
      </div>
      <div className="stack">
        <Kodeboks
          kode={
            "tall = float(input('Skriv et tall: '))\n\nif tall > 0:\n    print('Tallet er positivt')\nelif tall < 0:\n    print('Tallet er negativt')\nelse:\n    print('Tallet er null')"
          }
          linjeForLinje
        />
        <p className="hintline">Kjør tre ganger: med et positivt tall, et negativt tall og 0.</p>
      </div>
    </div>
  </div>
);
