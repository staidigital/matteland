import { EKS1_STEG, Eksempel1 } from './lysbilder/Eksempel1';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { KONSOLL_STEG, ProgramKonsoll } from './lysbilder/ProgramKonsoll';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { Regneartene } from './lysbilder/Regneartene';
import { REKKEFOLGE_STEG, Rekkefolge } from './lysbilder/Rekkefolge';
import { TEKST_STEG, TekstEllerTall } from './lysbilder/TekstEllerTall';
import { Tittel } from './lysbilder/Tittel';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import type { Lysbilde } from '../../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Regning og print',
    steg: 0,
    C: Tittel,
    notat:
      'Python lastes første gang (noen sekunder, krever nett). Kjør programmet, og la en elev endre teksten. Spør: hvorfor står det 8 og ikke 3 + 5 på siste linje?',
  },
  {
    tittel: 'Tekst eller utregning?',
    steg: TEKST_STEG,
    C: TekstEllerTall,
    notat:
      'La elevene skrive ned hva de tror før hvert svar. Komma i print er ikke i boka, men gjør utskriften mye ryddigere enn to print-linjer.',
  },
  {
    tittel: 'Regneartene',
    steg: 0,
    C: Regneartene,
    notat: 'Kjør, og la elevene prøve 6/2 og 2^3 selv. ^ gir 1 fordi det er bitvis XOR, men det trenger de ikke vite.',
  },
  {
    tittel: 'Regnerekkefølge',
    steg: REKKEFOLGE_STEG,
    C: Rekkefolge,
    notat: '-3**2 = -9 overrasker mange, men er det samme som −3² i matematikken. Kobling til potenser.',
  },
  {
    tittel: 'Eksempel 1',
    steg: EKS1_STEG,
    C: Eksempel1,
    notat:
      'Oversett ledd for ledd. Kjør til slutt, og prøv uten parentes rundt nevneren: da blir det 3 + 500 − 4,53 + 1 + 1 = 500,47 omtrent. Oppg. 7.1–7.3.',
  },
  {
    tittel: 'Program eller konsoll?',
    steg: KONSOLL_STEG,
    C: ProgramKonsoll,
    notat:
      'Programmet til venstre skriver ingenting fordi print mangler. I konsollen kommer svaret med en gang. Hos dere kan konsollen se annerledes ut (In/Out i noen verktøy). Oppg. 7.4.',
  },
  {
    tittel: 'Vanlige feil',
    steg: FEIL_STEG,
    C: VanligeFeil,
    notat:
      'De tre øverste gir galt svar uten feilmelding, og er derfor de farligste. Nederst: rett først parentesen på linje 2 (SyntaxError), så gangetegnet på linje 1 (TypeError).',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Tilsvarer oppg. 7.1–7.3. Elevene kan bruke kodeboksen her eller sitt eget verktøy.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Tre nivåer: regne ut uten maskin, velge riktig kode, og skille tekst fra utregning.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat: 'Exit ticket: skriv en print-linje som regner ut (2,5² + 1)/(4 − 1,5). (Svar: print((2.5**2 + 1)/(4 - 1.5)) gir 2.9.)',
  },
];
