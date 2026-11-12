import { ABC_STEG, EksempelAbc } from './lysbilder/EksempelAbc';
import { EksempelSparing, SPARING_STEG } from './lysbilder/EksempelSparing';
import { HvaErVariabel, NAVN_STEG } from './lysbilder/HvaErVariabel';
import { Inndata } from './lysbilder/Inndata';
import { LINJE_STEG, LinjeForLinje } from './lysbilder/LinjeForLinje';
import { OPPDATERE_STEG, Oppdatere } from './lysbilder/Oppdatere';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PenUtskrift } from './lysbilder/PenUtskrift';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { Tittel } from './lysbilder/Tittel';
import { Typer } from './lysbilder/Typer';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import type { Lysbilde } from '../../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Variabler',
    steg: 0,
    C: Tittel,
    notat:
      'Kjør, og la en elev endre prisen. Poenget: tallet står ett sted, med et navn som sier hva det er. Vis gjerne «Linje for linje».',
  },
  {
    tittel: 'Et navn på en verdi',
    steg: NAVN_STEG,
    C: HvaErVariabel,
    notat: 'Bildet «en lapp med navn som henger på en verdi» fungerer godt. Æ, ø og å er faktisk lov i Python 3, men gir ofte trøbbel ved deling av kode.',
  },
  {
    tittel: 'Hva skriver programmet ut?',
    steg: LINJE_STEG,
    C: LinjeForLinje,
    notat:
      'Mange tror y oppdateres når x endres, som i et regneark eller en GeoGebra-funksjon. La elevene stemme før dere går gjennom linje for linje.',
  },
  {
    tittel: '= betyr «sett lik»',
    steg: OPPDATERE_STEG,
    C: Oppdatere,
    notat: 'Penger etter hver linje: 1000, 1500, 3000. Likhetstegnet for sammenligning (==) kommer når vi lærer if.',
  },
  {
    tittel: 'Typer',
    steg: 0,
    C: Typer,
    notat: "La elevene gjette før de trykker Enter. '3' + 4 gir TypeError. 'ha' * 3 gir 'hahaha'.",
  },
  {
    tittel: 'Les inn fra brukeren',
    steg: 0,
    C: Inndata,
    notat:
      'Uten float( ) blir r tekst, og r**2 gir TypeError. Programmet stopper og venter på svar i konsollen. Kjøres koden på nytt, må svarene skrives inn igjen.',
  },
  {
    tittel: 'Pen utskrift',
    steg: 0,
    C: PenUtskrift,
    notat: 'Samme avrundingsfeil som i regning og print. round( ) holder i de fleste oppgaver. :.2f er greit for kroner.',
  },
  {
    tittel: 'Eksempel: sparing',
    steg: SPARING_STEG,
    C: EksempelSparing,
    notat: 'Kobling til eksponentialfunksjoner. Doblingstiden er omtrent 16 år (1,045^16 ≈ 2,02). Variabelnavnet ar fordi å er uvanlig.',
  },
  {
    tittel: 'Eksempel: abc-formelen',
    steg: ABC_STEG,
    C: EksempelAbc,
    notat:
      'Prøv a = 1, b = 2, c = 5: da blir d negativ, og Python svarer med komplekse tall (j). Vi trenger if for å håndtere det, og det kommer senere.',
  },
  {
    tittel: 'Vanlige feil',
    steg: FEIL_STEG,
    C: VanligeFeil,
    notat: 'Nederst: rett først 2bredde → 2*bredde (SyntaxError på linje 4), så Areal → areal (NameError på linje 5).',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Oppgave a gjøres uten maskin. b–d skrives i kodeboksen eller i elevenes eget verktøy.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Tre nivåer: følge verdiene gjennom et program, kjenne igjen typer, og forutsi utskrift.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat: 'Exit ticket: lag et program som spør etter to tall og skriver ut gjennomsnittet.',
  },
];
