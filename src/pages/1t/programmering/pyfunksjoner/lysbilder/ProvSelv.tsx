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
          <Kode>{'def g(x):\n    return 2*x + 1\n\nprint(g(3) + g(0))\nprint(g(g(1)))'}</Kode>
        </span>
      </>
    ),
    svar: (
      <span className="small">
        <code className="py-inline pen">8</code> og <code className="py-inline pen">7</code>. &nbsp;g(3) = 7 og g(0) = 1. g(1) =
        3, så g(g(1)) = g(3) = 7.
      </span>
    ),
  },
  {
    sporsmal: (
      <>
        Lag en funksjon <code>fahrenheit(c)</code> som gjør om fra celsius med formelen{' '}
        <span className="math nw">F = 1,8C + 32</span>. Hva er 37,5 °C i fahrenheit?
      </>
    ),
    svar: (
      <>
        <Kode>{'def fahrenheit(c):\n    return 1.8*c + 32\n\nprint(fahrenheit(37.5))'}</Kode>
        <span className="small">37,5 °C er 99,5 °F.</span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Lag en funksjon <code>er_partall(n)</code> som gir <code>True</code> hvis n er et partall og ellers <code>False</code>.
      </>
    ),
    svar: (
      <>
        <Kode>{'def er_partall(n):\n    return n % 2 == 0\n\nprint(er_partall(14), er_partall(7))'}</Kode>
        <span className="small">En sammenligning er allerede True eller False, så vi kan returnere den direkte.</span>
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Lag en funksjon for <span className="math nw">f(x) = 2x² − 3x + 1</span>, og skriv ut en verditabell for x fra −2 til
        3. Hvor er nullpunktene?
      </>
    ),
    svar: (
      <>
        <Kode>{'def f(x):\n    return 2*x**2 - 3*x + 1\n\nfor x in range(-2, 4):\n    print(x, f(x))'}</Kode>
        <span className="small">f(1) = 0, så x = 1 er et nullpunkt. Det andre er x = 0,5, som ikke er et heltall.</span>
      </>
    ),
  },
];

export const PROV_STEG = OPPGAVER.length;

export const ProvSelv: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Prøv selv</div>
    <h2>Funksjoner</h2>
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
        <p className="hintline">Test funksjonen med verdier der du vet svaret, før du stoler på den.</p>
      </div>
    </div>
  </div>
);
