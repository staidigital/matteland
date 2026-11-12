import { DEF_STEG, Def } from './lysbilder/Def';
import { EksempelNullpunkt, NULLPUNKT_STEG } from './lysbilder/EksempelNullpunkt';
import { EksempelPrimtall } from './lysbilder/EksempelPrimtall';
import { FlereParametre } from './lysbilder/FlereParametre';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { RETURN_STEG, ReturnPrint } from './lysbilder/ReturnPrint';
import { Tittel } from './lysbilder/Tittel';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import type { Lysbilde } from '../../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Funksjoner',
    steg: 0,
    C: Tittel,
    notat: 'f(5) = 25 − 10 − 3 = 12 og f(−1) = 0. Gå gjennom linje for linje: programmet hopper inn i funksjonen og tilbake.',
  },
  {
    tittel: 'Lage og bruke en funksjon',
    steg: DEF_STEG,
    C: Def,
    notat:
      'Skillet mellom å definere og å kalle er det viktigste her. Kobling til funksjonsbegrepet: én innverdi gir én utverdi. f(10) − f(0) = 30.',
  },
  {
    tittel: 'return eller print?',
    steg: RETURN_STEG,
    C: ReturnPrint,
    notat: 'Den vanligste misforståelsen. La elevene gjette a og b før dere kjører. 10 skrives ut fra inne i dobbel_print.',
  },
  {
    tittel: 'Flere parametre',
    steg: 0,
    C: FlereParametre,
    notat:
      'Rekkefølgen på argumentene må stemme med parametrene. Lokale variabler: vekstfaktor finnes ikke utenfor funksjonen. Svar: 31 059, 26 878 og 62 309.',
  },
  {
    tittel: 'Eksempel: nullpunkt',
    steg: NULLPUNKT_STEG,
    C: EksempelNullpunkt,
    notat:
      'En enkel numerisk metode. Mindre steg gir flere riktige desimaler, men tar lengre tid. GeoGebra gir 2,0946. Halveringsmetoden er en raskere variant.',
  },
  {
    tittel: 'Eksempel: primtall',
    steg: 0,
    C: EksempelPrimtall,
    notat: "Funksjoner som svarer True/False. end=' ' gjør at alt skrives på én linje. Det er 168 primtall under 1000.",
  },
  {
    tittel: 'Vanlige feil',
    steg: FEIL_STEG,
    C: VanligeFeil,
    notat:
      'Nederst: kolon først (SyntaxError), så skrives <function omkrets …> ut. Med omkrets(5) skrives None. Til slutt mangler return.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Oppgave a uten maskin. I c er return n % 2 == 0 en fin snarvei, men if/else er like riktig.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Tre nivåer: regne ut funksjonsverdier, følge flere kall og sammensatte funksjoner, og skille return fra print.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat: 'Exit ticket: lag en funksjon som gir arealet av et rektangel, og bruk den til å regne ut arealet av et 7 × 4-rektangel.',
  },
];
