import { BROK_STEG, BrokEksponent } from './lysbilder/BrokEksponent';
import { FORENKLING_STEG, Forenkling } from './lysbilder/Forenkling';
import { POTENS_STEG, HvaErPotens } from './lysbilder/HvaErPotens';
import { ROT_STEG, Kvadratrot } from './lysbilder/Kvadratrot';
import { NullNegativ } from './lysbilder/NullNegativ';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { REGLER_STEG, Regler } from './lysbilder/Regler';
import { STANDARDFORM_STEG, Standardform } from './lysbilder/Standardform';
import { Tittel } from './lysbilder/Tittel';
import { UtforskRegler } from './lysbilder/UtforskRegler';
import { UtforskRot } from './lysbilder/UtforskRot';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  { tittel: 'Potenser og røtter', steg: 0, C: Tittel, notat: 'Bruk begrepene grunntall og eksponent. Spør hva 2 opphøyd i −1 kan bety. Svaret kommer senere.' },
  { tittel: 'Hva er en potens?', steg: POTENS_STEG, C: HvaErPotens, notat: 'La elevene forutsi fortegnet. Kalkulator og GeoGebra tolker −2^4 som −16, så parentesen er viktig.' },
  { tittel: 'Utforsk potensreglene', steg: 0, C: UtforskRegler, notat: 'La elevene formulere reglene selv ved å telle faktorer. Under Dele peker m ≤ n fram mot eksponent 0 og negative eksponenter.' },
  { tittel: 'Potensreglene', steg: REGLER_STEG, C: Regler, notat: 'Samme regler som på puggelista. La elevene regne eksemplet før de viser det.' },
  { tittel: 'Eksponent 0 og negative eksponenter', steg: 0, C: NullNegativ, notat: 'Mønsteret begrunner at a⁰ = 1. Også a^m / a^m = a^(m − m) = a⁰, og det er jo 1.' },
  { tittel: 'Forenkle med potensreglene', steg: FORENKLING_STEG, C: Forenkling, notat: 'Del opp i tall og hver bokstav for seg. Linje 4 viser hvorfor det lønner seg å bruke samme grunntall.' },
  { tittel: 'Standardform', steg: STANDARDFORM_STEG, C: Standardform, notat: 'Kort repetisjon. Bruk eksempler fra naturfag: lysfart ≈ 3 · 10⁸ m/s. Hopp over hvis elevene kan dette.' },
  { tittel: 'Kvadratrot', steg: ROT_STEG, C: Kvadratrot, notat: 'Understrek at √9 = 3, ikke ±3. Likningen x² = 9 har to løsninger, men roten er ett tall. Rotregelen står på puggelista.' },
  { tittel: 'Utforsk røtter', steg: 0, C: UtforskRot, notat: 'La elevene finne det største kvadrattallet før de flytter glidebryteren. Sammenlign kalkulatorverdiene.' },
  { tittel: 'Brøk som eksponent', steg: BROK_STEG, C: BrokEksponent, notat: 'Begrunn med potensregelen: a^(1/2) · a^(1/2) = a. Vi antar at grunntallet er positivt.' },
  { tittel: 'Vanlige feil', steg: FEIL_STEG, C: VanligeFeil, notat: 'La elevene teste med tall før du viser riktig svar.' },
  { tittel: 'Prøv selv', steg: PROV_STEG, C: ProvSelv, notat: 'Regn i par, uten kalkulator. Oppgave e: 2⁵ = 32.' },
  { tittel: 'Øv selv', steg: 0, C: OvSelv, notat: 'Tilfeldige oppgaver i fire typer. Elevene kan jobbe selv på egen maskin.' },
  { tittel: 'Oppsummering', steg: 0, C: Oppsummering, notat: 'Sammenlign med puggelista. Få elevene til å forklare hver regel med et eksempel.' },
];
