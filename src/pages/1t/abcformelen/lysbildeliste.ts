import { Diskriminanten } from './lysbilder/Diskriminanten';
import { EKSEMPEL_STEG, Eksempel } from './lysbilder/Eksempel';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import { FLERE_STEG, FlereEksempler } from './lysbilder/FlereEksempler';
import { Hvorfor } from './lysbilder/Hvorfor';
import { Kontroll } from './lysbilder/Kontroll';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { Tittel } from './lysbilder/Tittel';
import { UTLEDNING_STEG, Utledning } from './lysbilder/Utledning';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  { tittel: 'abc-formelen', steg: 0, C: Tittel, notat: 'Formelen skal kunnes utenat, og den står på puggelisten. Spør om noen har sett den før.' },
  { tittel: 'Hvorfor en formel?', steg: 0, C: Hvorfor, notat: 'Prøv sum og produkt på denne likningen. Grafen viser at løsningene finnes, men de er ikke hele tall.' },
  { tittel: 'Hvor kommer den fra?', steg: UTLEDNING_STEG, C: Utledning, notat: 'Dette er fullstendig kvadrat med bokstaver. Sammenlign gjerne med x² + 6x + 5 = 0 ved siden av.' },
  { tittel: 'Eksempel', steg: EKSEMPEL_STEG, C: Eksempel, notat: 'Spør klassen før hvert steg. Skriv alltid parenteser rundt negative tall når de settes inn.' },
  { tittel: 'Flere eksempler', steg: FLERE_STEG, C: FlereEksempler, notat: 'Første eksempel må skrives om til standardform. Pek på at a er negativ i det andre. I det tredje går ikke roten opp, og svaret er eksakt.' },
  { tittel: 'Diskriminanten', steg: 0, C: Diskriminanten, notat: 'Utfordring: Finn et uttrykk med D = 0 og et med D < 0. Hva skjer med grafen?' },
  { tittel: 'Kontroll', steg: 0, C: Kontroll, notat: 'Vis Løs i GeoGebra CAS. Elevene må kunne regne for hånd på prøver uten hjelpemidler.' },
  { tittel: 'Vanlige feil', steg: FEIL_STEG, C: VanligeFeil, notat: 'Vis feilen, la elevene diskutere i par, og vis så riktig svar.' },
  { tittel: 'Prøv selv', steg: PROV_STEG, C: ProvSelv, notat: 'Regn i boka. Start med å finne diskriminanten: oppgave d og e gir noe annet enn to løsninger.' },
  { tittel: 'Øv selv', steg: 0, C: OvSelv, notat: 'Elevene kan øve på egne maskiner. Oppgavene lages tilfeldig.' },
  { tittel: 'Oppsummering', steg: 0, C: Oppsummering, notat: 'Exit ticket: Løs 2x² + 3x − 2 = 0. (Svar: x = 1/2 eller x = −2)' },
];
