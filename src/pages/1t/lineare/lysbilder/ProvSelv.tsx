import React from 'react';
import { Frac, V, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';

type Oppg = { sporsmal: React.ReactNode; svar: React.ReactNode };

const Y = () => <V c="y" />;

const OPPGAVER: Oppg[] = [
  {
    sporsmal: (
      <>
        Smågodt koster{' '}
        <span className="math nw">
          <Fx f="P" /> = 15,90<X /> + 5
        </span>
        , der <X /> er antall hektogram. Finn stigningstallet og konstantleddet, og forklar hva de betyr.
      </>
    ),
    svar: (
      <>
        <V c="a" /> = 15,90 og <V c="b" /> = 5
        <span className="small" style={{ display: 'block', fontFamily: 'var(--f-body)' }}>
          Godteriet koster 15,90 kr per hektogram, og begeret koster 5 kr.
        </span>
      </>
    ),
  },
  {
    sporsmal: <>Finn stigningstallet til linja gjennom (−2 , 3) og (1 , 6).</>,
    svar: (
      <>
        <V c="a" /> = <Frac n="6 − 3" d="1 − (−2)" /> = <Frac n="3" d="3" /> = 1
      </>
    ),
  },
  {
    sporsmal: <>Finn likningen for linja gjennom A(1 , 6) og B(4 , 2).</>,
    svar: (
      <>
        <span className="mline">
          <V c="a" /> = <Frac n="2 − 6" d="4 − 1" /> = −<Frac n="4" d="3" />
        </span>
        <span className="mline">
          6 = −<Frac n="4" d="3" /> · 1 + <V c="b" /> → <V c="b" /> = <Frac n="22" d="3" />
        </span>
        <span className="mline">
          <Y /> = −<Frac n="4" d="3" />
          <X /> + <Frac n="22" d="3" />
        </span>
      </>
    ),
  },
  {
    sporsmal: <>En linje har stigningstallet −2 og går gjennom (3 , 1). Finn likningen for linja.</>,
    svar: (
      <>
        <span className="mline">
          <Y /> − 1 = −2(<X /> − 3)
        </span>
        <span className="mline">
          <Y /> = −2<X /> + 7
        </span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Stigningstall, konstantledd og likninger</h2>
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
