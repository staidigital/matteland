import React from 'react';
import { X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx, Verditabell } from '../../funksjoner/felles';

type Oppg = { sporsmal: React.ReactNode; svar: React.ReactNode };

const OPPGAVER: Oppg[] = [
  {
    sporsmal: (
      <>
        Hvor skjærer grafen til{' '}
        <span className="math nw">
          <Fx /> = 2<X /> + 4
        </span>{' '}
        aksene?
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <Fx x="0" /> = 4 &nbsp;→&nbsp; (0 , 4)
        </span>
        <span className="mline">
          2<X /> + 4 = 0 &nbsp;→&nbsp; <X /> = −2 &nbsp;→&nbsp; (−2 , 0)
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Tabellen viser punkter på en rett linje. Hvor skjærer linja aksene?
        <div style={{ height: 8 }} />
        <Verditabell x={<X />} y={<i className="v">y</i>} xs={[-2, 0, 2, 4, 6, 8]} ys={[4, 3, 2, 1, 0, -1]} />
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <X /> = 0 gir (0 , 3)
        </span>
        <span className="mline">
          <i className="v">y</i> = 0 gir (6 , 0)
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Løs likningen{' '}
        <span className="math nw">
          −<X /> + 4 = 3<X /> − 4
        </span>
        . Hva er skjæringspunktet mellom de to linjene?
      </>
    ),
    svar: (
      <>
        <span className="mline">
          −4<X /> = −8 &nbsp;→&nbsp; <X /> = 2
        </span>
        <span className="mline">−2 + 4 = 2, så punktet er (2 , 2)</span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Hvor skjærer grafen til{' '}
        <span className="math nw">
          <Fx /> = 5
        </span>{' '}
        aksene?
      </>
    ),
    svar: (
      <>
        (0 , 5)
        <span className="small muted" style={{ display: 'block', fontFamily: 'var(--f-body)' }}>
          Grafen er vannrett og treffer aldri x-aksen. Ingen nullpunkter.
        </span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Finn skjæringspunktene</h2>
    <div className="grid2">
      {OPPGAVER.map((o, i) => (
        <div className="panel stack" key={i} style={{ gap: 10 }}>
          <div>
            <b className="pen">{'abcd'[i]}</b> &nbsp;{o.sporsmal}
          </div>
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
