import { EKSEMPEL_STEG, SumProduktEksempel } from './lysbilder/SumProduktEksempel';
import { FAKTOR_STEG, Faktorisering } from './lysbilder/Faktorisering';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import { FORTEGN_STEG, Fortegn } from './lysbilder/Fortegn';
import { HvaEr } from './lysbilder/HvaEr';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROD_STEG, Produktregelen } from './lysbilder/Produktregelen';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { ROT_STEG, Kvadratrot } from './lysbilder/Kvadratrot';
import { SumProdukt } from './lysbilder/SumProdukt';
import { Tittel } from './lysbilder/Tittel';
import { UtforskRot } from './lysbilder/UtforskRot';
import { VelgMetode } from './lysbilder/VelgMetode';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  { tittel: 'Andregradslikninger', steg: 0, C: Tittel, notat: 'Tre metoder uten formel. Neste presentasjon, abc-formelen, tar de likningene disse metodene ikke klarer.' },
  { tittel: 'Hva er en andregradslikning', steg: 0, C: HvaEr, notat: 'La elevene finne a, b og c. Pek på den siste: den må skrives om først. Løsningene er der grafen krysser x-aksen.' },
  { tittel: 'Utforsk: x² = k', steg: 0, C: UtforskRot, notat: 'Dra i k. Spør hvor mange løsninger det er før dere drar. Hvorfor gir negativ k ingen løsning?' },
  { tittel: 'Kvadratrot og ±', steg: ROT_STEG, C: Kvadratrot, notat: 'Pass på: √25 = 5, men x² = 25 har to løsninger. Derfor skriver vi ± selv.' },
  { tittel: 'Produktregelen', steg: PROD_STEG, C: Produktregelen, notat: 'Regelen virker bare når høyre side er 0. Spør: Hvis ab = 6, må da a eller b være 6?' },
  { tittel: 'Faktorisering', steg: FAKTOR_STEG, C: Faktorisering, notat: 'Trekk ut felles faktor og bruk kvadratsetningene. Spør hva som skjer om vi deler på x i det første eksempelet.' },
  { tittel: 'Sum og produkt', steg: 0, C: SumProdukt, notat: 'La elevene dra i p og q og treffe uttrykket. De oppdager selv at p + q gir b og p · q gir c.' },
  { tittel: 'Eksempel', steg: EKSEMPEL_STEG, C: SumProduktEksempel, notat: 'Begynn med produktet: det er færre par å prøve. Spør klassen før hvert steg.' },
  { tittel: 'Fortegn', steg: FORTEGN_STEG, C: Fortegn, notat: 'La elevene finne fortegnene ut fra tabellen. Husk å dele først hvis a ikke er 1. Det siste eksempelet viser hvorfor vi trenger abc-formelen.' },
  { tittel: 'Velg metode', steg: 0, C: VelgMetode, notat: 'Alle metodene gir samme svar. Velg den raskeste. La elevene gi begrunnelse.' },
  { tittel: 'Vanlige feil', steg: FEIL_STEG, C: VanligeFeil, notat: 'Vis feilen, la elevene diskutere i par, og vis så riktig svar. Sett inn svaret i likningen for å avsløre feilen.' },
  { tittel: 'Prøv selv', steg: PROV_STEG, C: ProvSelv, notat: 'Regn i boka. La elevene si hvilken metode de valgte og hvorfor.' },
  { tittel: 'Øv selv', steg: 0, C: OvSelv, notat: 'Elevene kan øve på egne maskiner. Oppgavene lages tilfeldig.' },
  { tittel: 'Oppsummering', steg: 0, C: Oppsummering, notat: 'Exit ticket: Løs x² − 3x − 10 = 0. (Svar: x = 5 eller x = −2)' },
];
