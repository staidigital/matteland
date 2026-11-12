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
          <Kode>{'a = 4\nb = a * 3\na = a + 1\nprint(a, b)'}</Kode>
        </span>
      </>
    ),
    svar: (
      <span className="small">
        <code className="py-inline pen">5 12</code> &nbsp;b ble regnet ut mens a var 4.
      </span>
    ),
  },
  {
    sporsmal: <>Lag et program som regner ut arealet og omkretsen av en sirkel med radius 6. Bruk π ≈ 3,14.</>,
    svar: (
      <>
        <Kode>{"r = 6\nareal = 3.14 * r**2\nomkrets = 2 * 3.14 * r\nprint('Areal:', areal)\nprint('Omkrets:', omkrets)"}</Kode>
        <span className="small">Areal 113.04, omkrets 37.68.</span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Lag et program som spør etter en temperatur i grader celsius og skriver den ut i fahrenheit. Formelen er{' '}
        <span className="math nw">F = 1,8C + 32</span>.
      </>
    ),
    svar: (
      <>
        <Kode>{"c = float(input('Grader celsius: '))\nf = 1.8*c + 32\nprint(f'{c} °C er {f} °F')"}</Kode>
        <span className="small">20 °C gir 68 °F.</span>
      </>
    ),
  },
  {
    sporsmal: <>Lag et program som spør etter a, b og c, og skriver ut løsningene av andregradslikningen.</>,
    svar: (
      <Kode>
        {"a = float(input('a = '))\nb = float(input('b = '))\nc = float(input('c = '))\nd = b**2 - 4*a*c\nprint((-b + d**0.5)/(2*a))\nprint((-b - d**0.5)/(2*a))"}
      </Kode>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Variabler</h2>
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
        <Kodeboks kode={'# Skriv programmet ditt her\n'} minLinjer={8} variabler />
        <p className="hintline">Kopier gjerne et forslag inn i kodeboksen og endre på det.</p>
      </div>
    </div>
  </div>
);
