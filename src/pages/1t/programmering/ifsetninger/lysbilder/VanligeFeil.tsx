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
    t: 'Ett likhetstegn',
    oppsett: <span className="small">Er x lik 5?</span>,
    feil: (
      <>
        <Liten>{"if x = 5:\n    print('Fem')"}</Liten>
        <Merk>SyntaxError</Merk>
      </>
    ),
    riktig: <Liten>{"if x == 5:\n    print('Fem')"}</Liten>,
    hvorfor: '= gir en variabel en verdi. == sammenligner.',
  },
  {
    t: 'Glemt kolon',
    oppsett: <span className="small">Er x større enn 5?</span>,
    feil: (
      <>
        <Liten>{"if x > 5\n    print('Stort')"}</Liten>
        <Merk>SyntaxError: expected ':'</Merk>
      </>
    ),
    riktig: <Liten>{"if x > 5:\n    print('Stort')"}</Liten>,
    hvorfor: 'Linjer med if, elif og else slutter alltid med kolon.',
  },
  {
    t: 'Halvt vilkår',
    oppsett: <span className="small">Er x lik 1 eller 2?</span>,
    feil: (
      <>
        <Liten>{"if x == 1 or 2:\n    print('Ja')"}</Liten>
        <Merk>skriver Ja for alle x</Merk>
      </>
    ),
    riktig: <Liten>{"if x == 1 or x == 2:\n    print('Ja')"}</Liten>,
    hvorfor: 'Python leser «x == 1» or «2», og 2 regnes alltid som sant. Hvert vilkår må skrives helt ut.',
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
          Programmet skal si om n er delelig med 3 og om n er delelig med 5. Kjør, les feilmeldingen og rett. Gjenta til
          programmet virker.
        </p>
        <p className="hintline">Hint: likhetstegn, kolon og innrykk.</p>
      </div>
      <Kodeboks
        kode={"n = 15\nif n % 3 = 0\n    print(n, 'er delelig med 3')\n if n % 5 == 0:\n    print(n, 'er delelig med 5')"}
      />
    </div>
  </div>
);
