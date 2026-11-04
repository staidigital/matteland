import { EKSEMPEL_STEG, Eksempler } from './lysbilder/Eksempler';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import { LOSE_STEG, LoseLikning } from './lysbilder/LoseLikning';
import { MEDA_STEG, MedA } from './lysbilder/MedA';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { Regelen } from './lysbilder/Regelen';
import { Tittel } from './lysbilder/Tittel';
import { Bunnpunkt } from './lysbilder/Bunnpunkt';
import { UtforskHjorne } from './lysbilder/UtforskHjorne';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  { tittel: 'Fullstendig kvadrat', steg: 0, C: Tittel, notat: 'Repeter 1. kvadratsetning. Spør: Hva mangler for at x² + 6x skal bli et kvadrat?' },
  { tittel: 'Hva mangler?', steg: 0, C: UtforskHjorne, notat: 'Dra i b. La elevene si hvor stort hjørnet er før du fyller det. Poenget: hjørnet er alltid (b/2)².' },
  { tittel: 'Regelen', steg: 0, C: Regelen, notat: 'Legg til og trekk fra det samme tallet: da er uttrykket uendret. Det er hele knepet.' },
  { tittel: 'Eksempler', steg: EKSEMPEL_STEG, C: Eksempler, notat: 'Spør klassen før hvert steg. Det siste eksempelet gir brøk: halvparten av 3 er 3/2. Oppgaven er ikke vanskeligere, bare litt mer regning.' },
  { tittel: 'Når a ikke er 1', steg: MEDA_STEG, C: MedA, notat: 'Trekk ut a fra de to første leddene. Pek på at −9 blir −18 når vi ganger inn igjen.' },
  { tittel: 'Løse likninger', steg: LOSE_STEG, C: LoseLikning, notat: 'Dette er knepet bak abc-formelen, som kommer senere. Vis at alle tre utfallene kan skje.' },
  { tittel: 'Hva vi kan lese av', steg: 0, C: Bunnpunkt, notat: 'Kobling til polynomfunksjoner. Et kvadrat er aldri negativt, så minste verdi er q. Flytt p og q.' },
  { tittel: 'Vanlige feil', steg: FEIL_STEG, C: VanligeFeil, notat: 'Vis feilen, la elevene diskutere i par, og vis så riktig svar. Gang ut for å avsløre feilen.' },
  { tittel: 'Prøv selv', steg: PROV_STEG, C: ProvSelv, notat: 'Regn i boka. Kontroller ved å gange ut.' },
  { tittel: 'Øv selv', steg: 0, C: OvSelv, notat: 'Elevene kan øve på egne maskiner. Oppgavene lages tilfeldig.' },
  { tittel: 'Oppsummering', steg: 0, C: Oppsummering, notat: 'Exit ticket: Skriv x² − 10x + 4 som fullstendig kvadrat. (Svar: (x − 5)² − 21)' },
];
