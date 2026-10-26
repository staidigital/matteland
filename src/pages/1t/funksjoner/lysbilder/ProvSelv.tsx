import React from 'react';
import { V, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx, Intervall, Mengde } from '../felles';

type Oppg = { sporsmal: React.ReactNode; svar: React.ReactNode };

const a = <V c="a" />;

const OPPGAVER: Oppg[] = [
  {
    sporsmal: (
      <>
        Finn <Fx x="−3" />, <Fx x="0" /> og <Fx x="3" />.
      </>
    ),
    svar: (
      <>
        <Fx x="−3" /> = (−3)<sup>2</sup> = 9, &nbsp; <Fx x="0" /> = 0, &nbsp; <Fx x="3" /> = 9
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Finn <Mengde m="D" /> og <Mengde m="V" />.
      </>
    ),
    svar: (
      <>
        <Mengde m="D" /> = ℝ, &nbsp; <Mengde m="V" /> = <Intervall a={0} b={Infinity} />
        <span className="small muted" style={{ display: 'block', fontFamily: 'var(--f-body)' }}>
          Et kvadrat blir aldri negativt.
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Finn <Fx x={<>2{a}</>} /> og <Fx x={<>{a} + 1</>} />.
      </>
    ),
    svar: (
      <>
        <span className="mline">
          <Fx x={<>2{a}</>} /> = (2{a})<sup>2</sup> = 4{a}
          <sup>2</sup>
        </span>
        <span className="mline">
          <Fx x={<>{a} + 1</>} /> = ({a} + 1)<sup>2</sup> = {a}
          <sup>2</sup> + 2{a} + 1
        </span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        <Fx f="K" x={<V c="n" />} /> = <V c="n" />
        <sup>2</sup> gir kvadrattallene. Er 64 og 99 med i <Mengde m="V" f="K" />?
      </>
    ),
    svar: (
      <>
        64 = 8<sup>2</sup>, så 64 er med.
        <span className="mline">
          99 er ikke med: 9<sup>2</sup> = 81 og 10<sup>2</sup> = 100.
        </span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>
      Funksjonen <span className="math">f</span> er gitt ved{' '}
      <span className="math">
        <Fx /> = <X />
        <sup>2</sup>
      </span>
    </h2>
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
