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
    t: 'Én for lite',
    oppsett: <span className="small">Skriv ut 1 til 10</span>,
    feil: (
      <>
        <Liten>{'for i in range(1, 10):\n    print(i)'}</Liten>
        <Merk>stopper på 9</Merk>
      </>
    ),
    riktig: <Liten>{'for i in range(1, 11):\n    print(i)'}</Liten>,
    hvorfor: 'Stopp-verdien i range er aldri med. Vil du ha med 10, må du skrive 11.',
  },
  {
    t: 'Nullstiller i løkka',
    oppsett: <span className="small">Summen av 1 til 5</span>,
    feil: (
      <>
        <Liten>{'for i in range(1, 6):\n    summen = 0\n    summen = summen + i\nprint(summen)'}</Liten>
        <Merk>skriver ut 5</Merk>
      </>
    ),
    riktig: <Liten>{'summen = 0\nfor i in range(1, 6):\n    summen = summen + i\nprint(summen)'}</Liten>,
    hvorfor: 'Startverdien må settes før løkka. Ellers starter summen på 0 i hver runde.',
  },
  {
    t: 'Glemmer å oppdatere',
    oppsett: <span className="small">Tell ned fra 5</span>,
    feil: (
      <>
        <Liten>{'n = 5\nwhile n > 0:\n    print(n)'}</Liten>
        <Merk>stopper aldri</Merk>
      </>
    ),
    riktig: <Liten>{'n = 5\nwhile n > 0:\n    print(n)\n    n = n - 1'}</Liten>,
    hvorfor: 'Noe i løkka må endre seg, så vilkåret til slutt blir usant.',
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
          Programmet skal regne ut 1 + 2 + … + 10, som er 55. Rett feilmeldingene først. Når programmet kjører, er det fortsatt
          én feil igjen.
        </p>
        <p className="hintline">Hint: kolon, innrykk og range.</p>
      </div>
      <Kodeboks kode={'summen = 0\nfor i in range(1, 10)\nsummen = summen + i\nprint(summen)'} />
    </div>
  </div>
);
