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
    t: 'Brukt før den er laget',
    oppsett: <span className="small">Skriv ut arealet</span>,
    feil: (
      <>
        <Liten>{'print(areal)\nareal = 5 * 4'}</Liten>
        <Merk>NameError</Merk>
      </>
    ),
    riktig: <Liten>{'areal = 5 * 4\nprint(areal)'}</Liten>,
    hvorfor: 'Python leser ovenfra og ned. En variabel må få en verdi før den kan brukes.',
  },
  {
    t: 'Regner med tekst fra input',
    oppsett: <span className="small">Alder neste år</span>,
    feil: (
      <>
        <Liten>{"alder = input('Alder: ')\nprint(alder + 1)"}</Liten>
        <Merk>TypeError</Merk>
      </>
    ),
    riktig: <Liten>{"alder = int(input('Alder: '))\nprint(alder + 1)"}</Liten>,
    hvorfor: 'input() gir tekst, og tekst + tall går ikke. Gjør om med int() eller float().',
  },
  {
    t: 'Anførselstegn rundt navnet',
    oppsett: <span className="small">Skriv ut verdien av svar</span>,
    feil: (
      <>
        <Liten>{"svar = 42\nprint('svar')"}</Liten>
        <Merk>skriver ut ordet svar</Merk>
      </>
    ),
    riktig: <Liten>{'svar = 42\nprint(svar)'}</Liten>,
    hvorfor: 'Med anførselstegn blir det tekst. Uten anførselstegn henter Python verdien til variabelen.',
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
        <h3>Programmet har to feil</h3>
        <p>
          Programmet skal skrive ut arealet og omkretsen av et rektangel. Kjør det, les feilmeldingen og rett feilen. Gjenta til
          programmet virker.
        </p>
        <p className="hintline">Hint: store og små bokstaver, og gangetegn.</p>
      </div>
      <Kodeboks
        kode={"lengde = 8\nbredde = 5\nAreal = lengde * bredde\nomkrets = 2*lengde + 2bredde\nprint('Arealet er', areal)\nprint('Omkretsen er', omkrets)"}
      />
    </div>
  </div>
);
