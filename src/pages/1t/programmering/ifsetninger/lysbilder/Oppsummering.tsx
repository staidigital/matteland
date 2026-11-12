import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';

export const Oppsummering: React.FC = () => (
  <div className="slide">
    <div className="kicker">Oppsummering</div>
    <h2>Dette skal du kunne</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">if, elif og else</span>
          <Kode>{"if n % 2 == 0:\n    print('Partall')\nelif n < 0:\n    print('Negativt oddetall')\nelse:\n    print('Oddetall')"}</Kode>
          <ul className="stack small" style={{ gap: 4, paddingLeft: '1.2em', margin: '10px 0 0' }}>
            <li>Kolon på slutten av linja, og innrykk på det som hører til.</li>
            <li>Python kjører bare den første delen som er sann. Sett det strengeste vilkåret først.</li>
            <li>else har ikke noe vilkår.</li>
          </ul>
        </div>
      </div>
      <div className="stack">
        <div className="panel stack small" style={{ gap: 6 }}>
          <span>
            <b>Sammenligninger</b> gir <code>True</code> eller <code>False</code>: <code>==</code> <code>!=</code>{' '}
            <code>&lt;</code> <code>&gt;</code> <code>&lt;=</code> <code>&gt;=</code>
          </span>
          <span>
            <b>Flere vilkår:</b> <code>and</code> (begge), <code>or</code> (minst én) og <code>not</code> (snur).
          </span>
        </div>
        <div className="boxed">
          <span className="label">Modulo</span>
          <p className="small">
            <code>a % b</code> er resten og <code>a // b</code> er antall hele ganger. <code>n % d == 0</code> betyr at d går
            opp i n.
          </p>
          <span className="math small">17 = 5 · 3 + 2</span>
        </div>
      </div>
    </div>
  </div>
);
