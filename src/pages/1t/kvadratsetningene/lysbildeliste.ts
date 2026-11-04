import { ANDRE_STEG, Andre } from './lysbilder/Andre';
import { BAKLENGS_STEG, Baklengs } from './lysbilder/Baklengs';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import { FORSTE_STEG, Forste } from './lysbilder/Forste';
import { KJENN_STEG, KjennIgjen } from './lysbilder/KjennIgjen';
import { KONJUGAT_STEG, Konjugat } from './lysbilder/Konjugat';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { Tittel } from './lysbilder/Tittel';
import { UtforskKvadrat } from './lysbilder/UtforskKvadrat';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  { tittel: 'Kvadratsetningene', steg: 0, C: Tittel, notat: 'Spør: Er (x + 3)² det samme som x² + 9? La elevene stemme før dere går videre.' },
  { tittel: 'Utforsk kvadratet', steg: 0, C: UtforskKvadrat, notat: 'Dra i glidebryteren. Pek på de to like rektanglene: det er de som gir 2ab, og det er dem mange glemmer.' },
  { tittel: '1. kvadratsetning', steg: FORSTE_STEG, C: Forste, notat: 'Gang ut med to parenteser først, slik elevene kan fra Basics. Setningen er bare en snarvei for det samme.' },
  { tittel: '2. kvadratsetning', steg: ANDRE_STEG, C: Andre, notat: 'Spør hvorfor siste ledd er pluss: minus ganger minus. La elevene regne ut (5 − 2x)² selv før du viser svaret.' },
  { tittel: 'Konjugatsetningen', steg: KONJUGAT_STEG, C: Konjugat, notat: 'Midtleddene forsvinner. Hoderegningen 21 · 19 pleier å overraske: la dem prøve 32 · 28 etterpå.' },
  { tittel: 'Baklengs', steg: BAKLENGS_STEG, C: Baklengs, notat: 'Dette brukes igjen i fullstendig kvadrat og i andregradslikninger. Sjekk alltid midtleddet.' },
  { tittel: 'Kjenn igjen', steg: KJENN_STEG, C: KjennIgjen, notat: 'La elevene diskutere hvert uttrykk i par. Poenget med d og e: ikke alle uttrykk passer.' },
  { tittel: 'Vanlige feil', steg: FEIL_STEG, C: VanligeFeil, notat: 'Vis feilen, la elevene diskutere i par i 30 sekunder, og vis så riktig svar. Sett inn x = 1 for å avsløre feilen.' },
  { tittel: 'Prøv selv', steg: PROV_STEG, C: ProvSelv, notat: 'Regn i boka. Oppgave f kobler til neste presentasjon om identiteter.' },
  { tittel: 'Øv selv', steg: 0, C: OvSelv, notat: 'Elevene kan øve på egne maskiner. Oppgavene lages tilfeldig.' },
  { tittel: 'Oppsummering', steg: 0, C: Oppsummering, notat: 'Exit ticket: Faktoriser 2x² − 18. (Svar: 2(x + 3)(x − 3))' },
];
