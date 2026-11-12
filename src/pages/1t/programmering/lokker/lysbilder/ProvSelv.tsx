import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

type Oppgave = { sporsmal: React.ReactNode; svar: React.ReactNode };

const OPPGAVER: Oppgave[] = [
  {
    sporsmal: (
      <>
        Hva skriver programmet ut?
        <span className="small" style={{ display: 'block', marginTop: 6 }}>
          <Kode>{'for i in range(2, 11, 3):\n    print(i)'}</Kode>
        </span>
      </>
    ),
    svar: (
      <span className="small">
        <code className="py-inline pen">2 5 8</code> &nbsp;(på hver sin linje). Neste ville vært 11, men stopp er ikke med.
      </span>
    ),
  },
  {
    sporsmal: <>Lag et program som skriver ut 7-gangen: 7 · 1 = 7, 7 · 2 = 14, … , 7 · 10 = 70.</>,
    svar: <Kode>{"for i in range(1, 11):\n    print(f'7 · {i} = {7 * i}')"}</Kode>,
  },
  {
    sporsmal: (
      <>
        Regn ut summen av kvadrattallene <span className="math nw">1² + 2² + 3² + … + 10²</span>.
      </>
    ),
    svar: (
      <>
        <Kode>{'summen = 0\nfor i in range(1, 11):\n    summen = summen + i**2\nprint(summen)'}</Kode>
        <span className="small">Summen er 385.</span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        En bil koster 400 000 kr og taper 15 % av verdien hvert år. Hvor mange år tar det før bilen er verdt mindre enn 100 000
        kr?
      </>
    ),
    svar: (
      <>
        <Kode>{"verdi = 400000\nar = 0\nwhile verdi >= 100000:\n    verdi = verdi * 0.85\n    ar = ar + 1\nprint(ar, 'år')"}</Kode>
        <span className="small">Etter 9 år er bilen verdt omtrent 92 647 kr.</span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Løkker</h2>
    <div className="cols">
      <div className="stack" style={{ gap: 12 }}>
        {OPPGAVER.map((o, i) => (
          <div className="panel stack" key={i} style={{ gap: 8, padding: '10px 16px' }}>
            <div className="row" style={{ justifyContent: 'space-between', alignItems: 'start', flexWrap: 'nowrap' }}>
              <span>
                <b className="pen">{'abcd'[i]}</b> &nbsp;{o.sporsmal}
              </span>
              {frag <= i && (
                <button className="btn" onClick={() => setFrag(i + 1)} style={{ flex: 'none' }}>
                  Vis svar
                </button>
              )}
            </div>
            {frag > i && (
              <div className="reveal stack" style={{ gap: 6 }}>
                {o.svar}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="stack">
        <Kodeboks kode={'# Skriv programmet ditt her\n'} minLinjer={8} variabler linjeForLinje />
        <p className="hintline">Bruk «Linje for linje» hvis programmet ikke gjør det du tror.</p>
      </div>
    </div>
  </div>
);
