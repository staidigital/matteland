import React, { useState } from 'react';
import { X, gcd } from '../../../../presentasjon/matte';
import { Ledd, Vekt } from '../felles';

/** Startlikninger ax + b = cx + d, alle med c < a og b < d så trekkene alltid kan føre fram */
const START = [
  { a: 3, b: 2, c: 1, d: 8 },
  { a: 4, b: 1, c: 2, d: 9 },
  { a: 5, b: 2, c: 3, d: 8 },
  { a: 2, b: 6, c: 1, d: 10 },
];

export const UtforskVekt: React.FC = () => {
  const [nr, setNr] = useState(0);
  const [{ a, b, c, d }, setL] = useState(START[0]);
  const g = gcd(gcd(a, b), gcd(c, d));
  const ferdig = a === 1 && b === 0 && c === 0;
  const ny = () => {
    const neste = (nr + 1) % START.length;
    setNr(neste);
    setL(START[neste]);
  };
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Likevekt</div>
      <h2>Gjør det samme på begge sider</h2>
      <div className="cols">
        <Vekt
          venstre={{ x: a, ener: b }}
          hoyre={{ x: c, ener: d }}
          beskrivelse={`Skålvekt i likevekt med ${a} x-klosser og ${b} lodd til venstre, og ${c} x-klosser og ${d} lodd til høyre`}
        />
        <div className="stack">
          <div className="boxed math" role="status">
            <Ledd k={a} m={b} /> = <Ledd k={c} m={d} />
          </div>
          <div className="row">
            <button className="btn" onClick={() => setL({ a: a - 1, b, c: c - 1, d })} disabled={a === 0 || c === 0}>
              Ta bort én <X /> på begge sider
            </button>
            <button className="btn" onClick={() => setL({ a, b: b - 1, c, d: d - 1 })} disabled={b === 0 || d === 0}>
              Ta bort ett lodd på begge sider
            </button>
            <button className="btn" onClick={() => setL({ a: a / g, b: b / g, c: c / g, d: d / g })} disabled={g < 2}>
              {g < 2 ? 'Del begge sider' : `Del begge sider på ${g}`}
            </button>
          </div>
          {ferdig ? (
            <div className="fb ok">
              Nå står <span className="math"><X /></span> alene, og vekta er fortsatt i likevekt. Løsningen er <span className="math"><X /> = {d}</span>.
            </div>
          ) : (
            <p className="small muted">Målet er én <span className="math"><X /></span> alene på den ene siden. Alle trekkene gjøres på begge sider, så vekta holder seg i likevekt.</p>
          )}
          <div className="row">
            <button className="btn" onClick={() => setL(START[nr])}>Start på nytt</button>
            <button className={'btn' + (ferdig ? ' primary' : '')} onClick={ny}>Ny likning</button>
          </div>
        </div>
      </div>
    </div>
  );
};
