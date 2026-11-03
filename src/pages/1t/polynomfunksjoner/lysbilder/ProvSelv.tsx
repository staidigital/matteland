import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Pol } from '../felles';

type Oppg = { sporsmal: React.ReactNode; svar: React.ReactNode };

const OPPGAVER: Oppg[] = [
  {
    sporsmal: (
      <>
        Har grafen til{' '}
        <span className="math nw">
          <Fx /> = <Pol k={[2, -4, 4]} />
        </span>{' '}
        et toppunkt eller et bunnpunkt? Finn punktet.
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <X /> = −<Frac n="−4" d="2 · 2" /> = 1
        </span>
        <span className="mline">
          <Fx x="1" /> = 2 − 4 + 4 = 2
        </span>
        <span className="mline">Bunnpunkt (1 , 2), fordi a &gt; 0</span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Har grafen til{' '}
        <span className="math nw">
          <Fx f="i" /> = 2<X /> − <X />
          <sup>2</sup>
        </span>{' '}
        et toppunkt eller et bunnpunkt? Finn punktet.
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <X /> = −<Frac n="2" d="2 · (−1)" /> = 1
        </span>
        <span className="mline">
          <Fx f="i" x="1" /> = 2 − 1 = 1
        </span>
        <span className="mline">Toppunkt (1 , 1), fordi a &lt; 0</span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Finn nullpunktene til{' '}
        <span className="math nw">
          <Fx /> = <Pol k={[-1, -2, 3]} />
        </span>
        .
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <X /> = <Frac n="2 ± √(4 + 12)" d="−2" /> = <Frac n="2 ± 4" d="−2" />
        </span>
        <span className="mline">
          <X /> = −3 &nbsp;eller&nbsp; <X /> = 1
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Finn eventuelle nullpunkter til{' '}
        <span className="math nw">
          <Fx f="h" /> = <Pol k={[1, -1, 1]} />
        </span>
        .
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <i className="v">b</i>
          <sup>2</sup> − 4<i className="v">a</i>
          <i className="v">c</i> = 1 − 4 = −3 &lt; 0
        </span>
        <span className="mline">Ingen nullpunkter</span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Ekstremalpunkter og nullpunkter</h2>
    <div className="grid2">
      {OPPGAVER.map((o, i) => (
        <div className="panel stack" key={i} style={{ gap: 10 }}>
          <p>
            <b className="pen">{'abcd'[i]}</b> &nbsp;{o.sporsmal}
          </p>
          {frag > i ? (
            <div className="math reveal">{o.svar}</div>
          ) : (
            <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
              Vis svar
            </button>
          )}
        </div>
      ))}
    </div>
    <p className="hintline">Regn i boka først, og sammenlign med sidemannen før du viser svaret.</p>
  </div>
);
