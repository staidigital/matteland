import { EksempelFizzBuzz } from './lysbilder/EksempelFizzBuzz';
import { EksempelPrimtall, PRIMTALL_STEG } from './lysbilder/EksempelPrimtall';
import { FOR_STEG, For } from './lysbilder/For';
import { FOR_WHILE_STEG, ForEllerWhile } from './lysbilder/ForEllerWhile';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { RANGE_STEG, Range } from './lysbilder/Range';
import { SUMMERE_STEG, Summere } from './lysbilder/Summere';
import { Tittel } from './lysbilder/Tittel';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import { Verditabell } from './lysbilder/Verditabell';
import { While } from './lysbilder/While';
import type { Lysbilde } from '../../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Løkker',
    steg: 0,
    C: Tittel,
    notat: 'Kjør, og la en elev bytte 6 med 101. Spør: hvor mange linjer kode ville dette vært uten løkke?',
  },
  {
    tittel: 'for-løkker',
    steg: FOR_STEG,
    C: For,
    notat:
      'Gå gjennom linje for linje og pek på i i tabellen. Rykk inn print(\'Ferdig\'): da skrives den ut fem ganger.',
  },
  {
    tittel: 'range',
    steg: RANGE_STEG,
    C: Range,
    notat: 'At stopp ikke er med, er den vanligste feilen. Fordelen: range(n) gir nøyaktig n tall.',
  },
  {
    tittel: 'Verditabell',
    steg: 0,
    C: Verditabell,
    notat:
      'Kobling til funksjoner. if inne i for: innrykk i to nivåer. Prøv en annen funksjon, for eksempel 2x − 1, og sammenlign med GeoGebra.',
  },
  {
    tittel: 'Summere med en løkke',
    steg: SUMMERE_STEG,
    C: Summere,
    notat: 'Gauss-historien passer her. Kobling til figurtall: trekanttallene n(n + 1)/2.',
  },
  {
    tittel: 'while-løkker',
    steg: 0,
    C: While,
    notat: 'Svar: 16 år med 4,5 %, 24 år med 3 % og 11 år med 7 %. Variabelnavnet ar fordi å er uvanlig i kode.',
  },
  {
    tittel: 'for eller while?',
    steg: FOR_WHILE_STEG,
    C: ForEllerWhile,
    notat:
      'Kodeboksen stopper programmet etter 8 sekunder. I vanlige verktøy må elevene selv trykke Stopp eller Ctrl + C. Rett ved å bytte != med <.',
  },
  {
    tittel: 'Eksempel: FizzBuzz',
    steg: 0,
    C: EksempelFizzBuzz,
    notat: 'Fortsettelse fra if-setninger. Bang-oppgaven åpner for diskusjon: hva skal 21 (3 · 7) og 35 (5 · 7) bli?',
  },
  {
    tittel: 'Eksempel: primtall',
    steg: PRIMTALL_STEG,
    C: EksempelPrimtall,
    notat:
      'Telleren delere er samme mønster som summen. Det holder å teste opp til √n: har n en faktor større enn √n, har den også en mindre.',
  },
  {
    tittel: 'Vanlige feil',
    steg: FEIL_STEG,
    C: VanligeFeil,
    notat:
      'Nederst: kolon (SyntaxError), innrykk (IndentationError), og til slutt range(1, 10) som gir 45 i stedet for 55. Den siste gir ingen feilmelding.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Oppgave a uten maskin. d bruker while fordi vi ikke vet antall år på forhånd.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Tre nivåer: hvilke tall range gir, følge en sum eller teller gjennom løkka, og telle runder i en while-løkke.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat: 'Exit ticket: skriv en løkke som regner ut 1 · 2 · 3 · … · 10. (Start med produkt = 1, svaret er 3 628 800.)',
  },
];
