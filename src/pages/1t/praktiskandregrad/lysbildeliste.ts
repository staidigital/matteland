import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import { Fremgangsmate } from './lysbilder/Fremgangsmate';
import { GANGVEI_STEG, Gangvei } from './lysbilder/Gangvei';
import { KAST_STEG, Kast } from './lysbilder/Kast';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OVERSKUDD_STEG, Overskudd } from './lysbilder/Overskudd';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { PYT_STEG, Pytagoras } from './lysbilder/Pytagoras';
import { REKT_STEG, Rektangel } from './lysbilder/Rektangel';
import { Tittel } from './lysbilder/Tittel';
import { UtforskAreal } from './lysbilder/UtforskAreal';
import { VURDER_STEG, VurderSvaret } from './lysbilder/VurderSvaret';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  { tittel: 'Praktisk bruk', steg: 0, C: Tittel, notat: 'Spør: Når lander ballen? Hvordan kan vi finne det uten å måle?' },
  { tittel: 'Fremgangsmåte', steg: 0, C: Fremgangsmate, notat: 'Samme fremgangsmåte som for tekstoppgaver med førstegradslikninger. Det nye er steg 4: vi får ofte to svar.' },
  { tittel: 'Utforsk areal', steg: 0, C: UtforskAreal, notat: 'La elevene prøve seg frem med glidebryteren. Spør så: Hvordan kan vi finne dette uten å prøve?' },
  { tittel: 'Areal', steg: REKT_STEG, C: Rektangel, notat: 'Spør klassen før hvert steg. Spør hvorfor −8 ikke er med i svaret.' },
  { tittel: 'Gangvei', steg: GANGVEI_STEG, C: Gangvei, notat: 'La elevene tegne figuren selv først. Spør hvorfor det er 2x og ikke x på hver side.' },
  { tittel: 'Pytagoras', steg: PYT_STEG, C: Pytagoras, notat: 'Repeter Pytagoras. Vi bruker 1. kvadratsetning på (x + 7)². Svaret er en velkjent trekant: 5, 12 og 13.' },
  { tittel: 'Kast', steg: KAST_STEG, C: Kast, notat: 'Forklar hva 15 betyr (høyden ved start) og hva −5 kommer fra (tyngdekraften, omtrent). Bruk GeoGebra for å sjekke grafen.' },
  { tittel: 'Overskudd', steg: OVERSKUDD_STEG, C: Overskudd, notat: 'Spør hva overskudd = 0 betyr i praksis. Hvorfor taper bedriften penger på veldig mange enheter?' },
  { tittel: 'Vurder svaret', steg: VURDER_STEG, C: VurderSvaret, notat: 'Det er ikke alltid slik at negative svar skal forkastes. Sammenhengen avgjør.' },
  { tittel: 'Vanlige feil', steg: FEIL_STEG, C: VanligeFeil, notat: 'Vis feilen, la elevene diskutere i par, og vis så riktig svar.' },
  { tittel: 'Prøv selv', steg: PROV_STEG, C: ProvSelv, notat: 'Regn i boka. Be elevene skrive svar med enhet og en setning.' },
  { tittel: 'Øv selv', steg: 0, C: OvSelv, notat: 'Elevene kan øve på egne maskiner. Oppgavene lages tilfeldig.' },
  { tittel: 'Oppsummering', steg: 0, C: Oppsummering, notat: 'Exit ticket: Et rektangel har areal 24 cm² og er 2 cm lengre enn det er bredt. Hvor bredt er det? (Svar: 4 cm)' },
];
