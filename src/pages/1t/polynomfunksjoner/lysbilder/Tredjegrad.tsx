import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Pol, ekstremalpunkter, nullpunkter, polynom } from '../felles';

type Kort = { sporsmal: string; svar: string; polynomer: number[][] };

const KORT: Kort[] = [
  {
    sporsmal: 'Hvor mange nullpunkter kan en tredjegradsfunksjon ha?',
    svar: 'Ett, to eller tre.',
    polynomer: [[1, -1, -2, 0]],
  },
  {
    sporsmal: 'Er det mulig at en tredjegradsfunksjon ikke har noen nullpunkter?',
    svar: 'Nei. Grafen går fra langt nede til langt oppe (eller motsatt), så den må krysse x-aksen minst én gang.',
    polynomer: [[1, 0, 1, 2]],
  },
  {
    sporsmal: 'Hvordan kan en tredjegradsfunksjon med to nullpunkter se ut?',
    svar: 'Et av ekstremalpunktene ligger på x-aksen. Der berører grafen aksen uten å krysse den.',
    polynomer: [[1, 0, -3, 2]],
  },
  {
    sporsmal: 'Hvor mange ekstremalpunkter kan en tredjegradsfunksjon ha?',
    svar: 'Enten to (ett toppunkt og ett bunnpunkt) eller ingen.',
    polynomer: [
      [1, 0, -3, 0],
      [0.5, 0, 0, 0],
    ],
  },
];

export const TREDJE_STEG = KORT.length;

export const Tredjegrad: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Reflekter og diskuter</div>
    <h2>Tredjegradsfunksjoner</h2>
    <div className="grid4">
      {KORT.map((k, i) => (
        <div className="panel stack" key={i} style={{ gap: 10 }}>
          <p>
            <b className="pen">{i + 1}</b> &nbsp;{k.sporsmal}
          </p>
          {frag > i ? (
            <div className="reveal stack" style={{ gap: 8 }}>
              <p className="pen">{k.svar}</p>
              <FunkGraf
                kurver={k.polynomer.map((p, j) => ({ f: polynom(p), farge: j ? 'c1' : 'ink' }))}
                punkter={k.polynomer.flatMap((p, j) => [
                  ...nullpunkter(polynom(p), -3, 3).map((x) => ({ x, y: 0, farge: 'pen' })),
                  ...ekstremalpunkter(polynom(p), -3, 3).map((e) => ({ x: e.x, y: e.y, farge: j ? 'c1' : 'c2' })),
                ])}
                xmin={-3}
                xmax={3}
                ymin={-4}
                ymax={5}
                h={480}
                title="Eksempel på grafen til en tredjegradsfunksjon"
              />
              <p className="small muted math" style={{ fontSize: '1em' }}>
                {k.polynomer.map((p, j) => (
                  <span key={j} className={j ? 'c1' : undefined}>
                    {j > 0 && ' · '}
                    <Pol k={p} />
                  </span>
                ))}
              </p>
            </div>
          ) : (
            <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
              Vis svar
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);
