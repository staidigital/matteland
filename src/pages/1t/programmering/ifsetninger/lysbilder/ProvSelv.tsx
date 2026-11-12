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
          <Kode>{"x = 7\nif x % 2 == 0:\n    print('A')\nelif x % 3 == 1:\n    print('B')\nelse:\n    print('C')"}</Kode>
        </span>
      </>
    ),
    svar: (
      <span className="small">
        <code className="py-inline pen">B</code> &nbsp;7 % 2 er 1, så det første vilkåret er usant. 7 % 3 er 1, så det andre er
        sant.
      </span>
    ),
  },
  {
    sporsmal: <>Lag et program som spør etter et heltall og skriver ut om det er delelig med 7.</>,
    svar: (
      <Kode>
        {"n = int(input('Heltall: '))\nif n % 7 == 0:\n    print(n, 'er delelig med 7')\nelse:\n    print(n, 'er ikke delelig med 7')"}
      </Kode>
    ),
  },
  {
    sporsmal: (
      <>
        En kinobillett koster 120 kr. Barn under 16 år betaler 70 kr, og alle som er 67 år eller eldre, betaler 80 kr. Lag et
        program som spør etter alderen og skriver ut prisen.
      </>
    ),
    svar: (
      <Kode>
        {"alder = int(input('Alder: '))\nif alder < 16:\n    pris = 70\nelif alder >= 67:\n    pris = 80\nelse:\n    pris = 120\nprint('Prisen er', pris, 'kr')"}
      </Kode>
    ),
  },
  {
    sporsmal: (
      <>
        Lag et program som spør etter et heltall og skriver «Fizz» hvis det er delelig med 3, «Buzz» hvis det er delelig med 5,
        «FizzBuzz» hvis det er delelig med begge, og ellers tallet selv.
      </>
    ),
    svar: (
      <>
        <Kode>
          {"n = int(input('Heltall: '))\nif n % 15 == 0:\n    print('FizzBuzz')\nelif n % 3 == 0:\n    print('Fizz')\nelif n % 5 == 0:\n    print('Buzz')\nelse:\n    print(n)"}
        </Kode>
        <span className="small">Det strengeste vilkåret først. n % 15 == 0 kan også skrives n % 3 == 0 and n % 5 == 0.</span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>If-setninger og modulo</h2>
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
        <Kodeboks kode={'# Skriv programmet ditt her\n'} minLinjer={10} />
        <p className="hintline">Test programmet med flere verdier, også grensetilfellene (for eksempel 16 og 67 år).</p>
      </div>
    </div>
  </div>
);
