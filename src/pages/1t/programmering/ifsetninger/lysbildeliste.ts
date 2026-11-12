import { AndOr } from './lysbilder/AndOr';
import { EksempelAbc } from './lysbilder/EksempelAbc';
import { EksempelSkuddar, SKUDDAR_STEG } from './lysbilder/EksempelSkuddar';
import { ElseElif } from './lysbilder/ElseElif';
import { IF_STEG, If } from './lysbilder/If';
import { Modulo } from './lysbilder/Modulo';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { BRUK_STEG, Partall } from './lysbilder/Partall';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { REKKEFOLGE_STEG, Rekkefolge } from './lysbilder/Rekkefolge';
import { Sammenligning } from './lysbilder/Sammenligning';
import { Tittel } from './lysbilder/Tittel';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import type { Lysbilde } from '../../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'If-setninger',
    steg: 0,
    C: Tittel,
    notat: 'Kjør med 16 og med 20. Spør: hvordan vet programmet hvilken linje det skal skrive ut?',
  },
  {
    tittel: 'Sant eller usant?',
    steg: 0,
    C: Sammenligning,
    notat:
      "Her kommer typen bool, som vi utsatte i variabler. 7 == 7.0 er True, men '7' == 7 er False: tekst og tall er aldri like.",
  },
  {
    tittel: 'if',
    steg: IF_STEG,
    C: If,
    notat:
      'Innrykket er grammatikken i Python. Uten innrykk på «Husk solkrem» skrives den ut uansett. Shift + Tab rykker ut i editoren.',
  },
  {
    tittel: 'else og elif',
    steg: 0,
    C: ElseElif,
    notat: 'Gå gjennom linje for linje med et negativt tall. Poenget: nøyaktig én av de tre delene kjøres.',
  },
  {
    tittel: 'Hva skriver programmet ut?',
    steg: REKKEFOLGE_STEG,
    C: Rekkefolge,
    notat: 'La elevene stemme. Mange tror begge skrives ut. Rett programmet sammen ved å bytte rekkefølge på vilkårene.',
  },
  {
    tittel: 'Modulo',
    steg: 0,
    C: Modulo,
    notat:
      'Dra i glidebryterne. Resten er alltid mindre enn b. Hverdagseksempel: 17 elever i grupper på 5 gir 3 grupper og 2 til overs.',
  },
  {
    tittel: 'Partall og delelighet',
    steg: BRUK_STEG,
    C: Partall,
    notat:
      'n % 10 gir siste siffer, og n // 10 tar bort siste siffer. Klokkeregning er også modulo: (22 + 5) % 24 = 3.',
  },
  {
    tittel: 'and, or og not',
    steg: 0,
    C: AndOr,
    notat: 'Test elevene: hva er n % 2 == 0 and n % 3 == 0? (Delelig med 6.)',
  },
  {
    tittel: 'Eksempel: skuddår',
    steg: SKUDDAR_STEG,
    C: EksempelSkuddar,
    notat:
      'Kan også skrives på én linje: ar % 4 == 0 and (ar % 100 != 0 or ar % 400 == 0). 1900 var ikke skuddår, 2000 var det.',
  },
  {
    tittel: 'Eksempel: abc-formelen',
    steg: 0,
    C: EksempelAbc,
    notat: 'Kobling til variabler, der d < 0 ga komplekse tall. Nå sjekker programmet diskriminanten først.',
  },
  {
    tittel: 'Vanlige feil',
    steg: FEIL_STEG,
    C: VanligeFeil,
    notat:
      'x == 1 or 2 er den lumskeste, fordi den ikke gir feilmelding. Nederst: rett = til ==, legg til kolon, og fjern mellomrommet foran if på linje 4.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Oppgave a gjøres uten maskin. FizzBuzz er en klassiker. Den kommer igjen når vi lærer løkker.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Tre nivåer: rest og heltallsdivisjon, vurdere vilkår, og følge en if-elif-else.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat: 'Exit ticket: skriv et vilkår som er sant når n er delelig med 4, men ikke med 10. (n % 4 == 0 and n % 10 != 0)',
  },
];
