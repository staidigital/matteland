import { DEF_STEG, Definisjon } from './lysbilder/Definisjon';
import { EKS17_STEG, Eksempel17 } from './lysbilder/Eksempel17';
import { EKS18_STEG, Eksempel18 } from './lysbilder/Eksempel18';
import { HVA_STEG, HvaEr } from './lysbilder/HvaEr';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { REFLEKTER_STEG, Reflekter } from './lysbilder/Reflekter';
import { Tittel } from './lysbilder/Tittel';
import { Utforsk } from './lysbilder/Utforsk';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import { VEKST_STEG, Vekstfaktor } from './lysbilder/Vekstfaktor';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Eksponentialfunksjoner',
    steg: 0,
    C: Tittel,
    notat:
      'Spør: hva skjer med f når x øker med 1? Og med g? (Dobles og halveres.) Kan grafene noen gang treffe x-aksen?',
  },
  {
    tittel: 'Utforsk a og b',
    steg: 0,
    C: Utforsk,
    notat:
      'Utforsk-oppgaven i boka, i par. 1: start med b = 2 og b = 1/2. 2: gå gjennom grunntallene 3, 3/2, 1/4, 4/5 og 1. 3: b > 1 vokser, b < 1 avtar. 4: a = 1, 3 og 0,5 med b = 2.',
  },
  {
    tittel: 'Variabelen i eksponenten',
    steg: HVA_STEG,
    C: HvaEr,
    notat:
      'Koble til «Grad» i polynomfunksjoner: 2^x var ikke et polynom. Spør hvilken som er størst for x = 10 (100 mot 1024).',
  },
  {
    tittel: 'Vekstfaktor',
    steg: VEKST_STEG,
    C: Vekstfaktor,
    notat:
      'Repetisjon fra prosentregning. La elevene svare på tavla/mini-whiteboard før hvert svar. Vekstfaktor 2 = økning på 100 % overrasker mange.',
  },
  {
    tittel: 'Konstanten a og definisjonen',
    steg: DEF_STEG,
    C: Definisjon,
    notat:
      'Husk b⁰ = 1 fra potenser. Kravene a > 0 og b > 0 i definisjonen. Steg 2: lineær legger til, eksponentiell ganger med. Det er slik vi kjenner dem igjen i en tabell.',
  },
  {
    tittel: 'Eksempel 17',
    steg: EKS17_STEG,
    C: Eksempel17,
    notat:
      'Eksempel 17. Les a i skjæringen med y-aksen, og b som f(1) : f(0). Spør hvorfor vi bruker x = 0 og x = 1 (da blir regningen enklest). Oppg. 3.38–3.39.',
  },
  {
    tittel: 'Eksempel 18',
    steg: EKS18_STEG,
    C: Eksempel18,
    notat:
      'Eksempel 18. Spør før d: hvor lang tid tror dere det tar? Vis gjerne i GeoGebra samtidig. Dra i x for å se at beløpet vokser mer og mer for hvert år. Oppg. 3.40–3.45.',
  },
  {
    tittel: 'Reflekter og diskuter',
    steg: REFLEKTER_STEG,
    C: Reflekter,
    notat:
      'Reflekter og diskuter fra boka. Nr. 3: en negativ x betyr tid før nå. Koble til oppg. 3.42 (bakteriene for to timer siden).',
  },
  {
    tittel: 'Vanlige feil',
    steg: FEIL_STEG,
    C: VanligeFeil,
    notat: 'La elevene finne feilen før du viser riktig svar. Den tredje feilen gjør mange på kalkulatoren også.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat:
      'Fra oppg. 3.41, 3.40b, 3.43b og 3.42a. Gi 5–7 minutter i par. I d: diskuter hvorfor 45 000 · 0,5² gir feil svar (3.42b).',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Elevene kan øve på egne maskiner. Start med vekstfaktor, så funksjonsuttrykk, regning og avlesning fra graf.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat:
      'Exit ticket: en bil koster 400 000 kr og taper 15 % av verdien hvert år. Skriv funksjonsuttrykket og finn verdien etter 3 år. (Svar: V(x) = 400 000 · 0,85^x, V(3) ≈ 245 650 kr)',
  },
];
