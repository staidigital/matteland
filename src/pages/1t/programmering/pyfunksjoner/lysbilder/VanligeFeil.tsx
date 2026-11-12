import React from 'react';
import { FeilListe, type Feil } from '../../../../../presentasjon/ovelser';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

/** Kortene står i matteskrift i stor størrelse, så koden krympes litt */
const Liten: React.FC<{ children: string }> = ({ children }) => (
  <span style={{ display: 'block', fontSize: '0.66em' }}>
    <Kode>{children}</Kode>
  </span>
);

const Merk: React.FC<{ children: string }> = ({ children }) => (
  <span style={{ display: 'block', fontFamily: 'var(--f-body)', fontSize: '0.6em', marginTop: 4 }}>{children}</span>
);

const FEIL: Feil[] = [
  {
    t: 'Glemt return',
    oppsett: <span className="small">f(x) = x²</span>,
    feil: (
      <>
        <Liten>{'def f(x):\n    x**2\n\nprint(f(3))'}</Liten>
        <Merk>skriver ut None</Merk>
      </>
    ),
    riktig: <Liten>{'def f(x):\n    return x**2\n\nprint(f(3))'}</Liten>,
    hvorfor: 'Uten return regner funksjonen ut svaret, men sender det ikke tilbake.',
  },
  {
    t: 'Glemt parentes',
    oppsett: <span className="small">Skriv ut f(3)</span>,
    feil: (
      <>
        <Liten>{'print(f)'}</Liten>
        <Merk>{'skriver <function f at …>'}</Merk>
      </>
    ),
    riktig: <Liten>{'print(f(3))'}</Liten>,
    hvorfor: 'Uten parentes og verdi bruker vi ikke funksjonen. Python skriver bare ut at f er en funksjon.',
  },
  {
    t: 'Lokal variabel utenfor',
    oppsett: <span className="small">Bruk svaret etterpå</span>,
    feil: (
      <>
        <Liten>{'def areal(r):\n    a = 3.14 * r**2\n    return a\n\nareal(2)\nprint(a)'}</Liten>
        <Merk>NameError</Merk>
      </>
    ),
    riktig: <Liten>{'def areal(r):\n    a = 3.14 * r**2\n    return a\n\na = areal(2)\nprint(a)'}</Liten>,
    hvorfor: 'Variabler inne i en funksjon finnes bare der. Ta vare på svaret fra return i en ny variabel.',
  },
];

export const FEIL_STEG = FEIL.length;

export const VanligeFeil: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Vanlige feil</div>
    <h2>Finn feilen</h2>
    <FeilListe {...p} feil={FEIL} />
    <div className="cols">
      <div className="stack">
        <h3>Programmet har tre feil</h3>
        <p>
          Programmet skal skrive ut omkretsen av en sirkel med radius 5, som er omtrent 31,4. Rett én feil om gangen, og kjør på
          nytt hver gang.
        </p>
        <p className="hintline">Hint: kolon, return og parentes.</p>
      </div>
      <Kodeboks kode={"def omkrets(r)\n    2 * 3.14 * r\n\nprint('Omkretsen er', omkrets)"} />
    </div>
  </div>
);
