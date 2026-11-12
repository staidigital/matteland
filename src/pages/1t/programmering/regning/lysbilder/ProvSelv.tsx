import React from 'react';
import { Frac } from '../../../../../presentasjon/matte';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

type Oppgave = { sporsmal: React.ReactNode; kode: string; ut: string; merk?: React.ReactNode };

const OPPGAVER: Oppgave[] = [
  {
    sporsmal: (
      <>
        Hva skriver <Kode inline>{'print((56/8 + 7*2)/3)'}</Kode> ut? Hva skjer om du fjerner de innerste parentesene?
      </>
    ),
    kode: 'print((56/8 + 7*2)/3)\nprint(56/8 + 7*2/3)',
    ut: '7.0\n11.666666666666668',
    merk: 'Uten parentesene deles bare 7*2 på 3.',
  },
  {
    sporsmal: (
      <span className="math">
        3 + 4<sup>2</sup> &nbsp;og&nbsp; 5 · 3 − 4<sup>3</sup>
      </span>
    ),
    kode: 'print(3 + 4**2)\nprint(5*3 - 4**3)',
    ut: '19\n-49',
  },
  {
    sporsmal: (
      <span className="math">
        4 + <Frac n="2" d={<>3 − 4<sup>2</sup></>} />
      </span>
    ),
    kode: 'print(4 + 2/(3 - 4**2))',
    ut: '3.8461538461538463',
  },
  {
    sporsmal: (
      <span className="math">
        −5,33<sup>2</sup> + <Frac n={<>7<sup>2</sup> − 3<sup>2</sup></>} d={<Frac n="8" d="3" />} />
      </span>
    ),
    kode: 'print(-5.33**2 + (7**2 - 3**2)/(8/3))',
    ut: '-13.4089',
    merk: '-5.33**2 betyr −(5,33²), akkurat som i matematikken.',
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Regn ut i Python</h2>
    <div className="cols">
      <div className="stack" style={{ gap: 12 }}>
        {OPPGAVER.map((o, i) => (
          <div className="panel stack" key={i} style={{ gap: 8, padding: '10px 16px' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span>
                <b className="pen">{'abcd'[i]}</b> &nbsp;{o.sporsmal}
              </span>
              {frag <= i && (
                <button className="btn" onClick={() => setFrag(i + 1)}>
                  Vis svar
                </button>
              )}
            </div>
            {frag > i && (
              <div className="reveal stack" style={{ gap: 6 }}>
                <Kode>{o.kode}</Kode>
                <span className="small">
                  Svar: <code className="py-inline pen">{o.ut.replace('\n', ' og ')}</code>
                  {o.merk && <> &nbsp;{o.merk}</>}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="stack">
        <Kodeboks kode={'# Skriv koden din her\n'} minLinjer={6} />
        <p className="hintline">Skriv koden selv før du viser svaret. Sammenlign med sidemannen.</p>
      </div>
    </div>
  </div>
);
