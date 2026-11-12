import { BESTE_STEG, BesteLinje } from './lysbilder/BesteLinje';
import { EKS24_STEG, Eksempel24 } from './lysbilder/Eksempel24';
import { EKS25_STEG, Eksempel25 } from './lysbilder/Eksempel25';
import { EKS26_STEG, Eksempel26 } from './lysbilder/Eksempel26';
import { EKS27_STEG, Eksempel27 } from './lysbilder/Eksempel27';
import { Modeller } from './lysbilder/Modeller';
import { Oppskrift } from './lysbilder/Oppskrift';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { REFLEKTER_STEG, Reflekter } from './lysbilder/Reflekter';
import { SPREDNING_STEG, Spredning } from './lysbilder/Spredning';
import { Strikk } from './lysbilder/Strikk';
import { Tittel } from './lysbilder/Tittel';
import { Utforsk } from './lysbilder/Utforsk';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Modellering og regresjon',
    steg: 0,
    C: Tittel,
    notat: 'Spør: ser dere på mer eller mindre TV enn før? Kan vi bruke modellen til å si noe om 2030? Er det rimelig?',
  },
  {
    tittel: 'Utforsk vannstrålen',
    steg: 0,
    C: Utforsk,
    notat:
      'Utforsk-oppgaven i boka. Punktene er lest av bildet. Prøv modellene i tur og orden: andregrad passer best. Elevene kan ta egne bilder og gjøre det samme i GeoGebra.',
  },
  {
    tittel: 'Spredningsdiagram',
    steg: SPREDNING_STEG,
    C: Spredning,
    notat: 'Hvorfor bruker vi år etter 2015 og ikke årstallet? (Små tall, og konstantleddet blir startverdien.) Merk at 2020 og 2022 mangler.',
  },
  {
    tittel: 'Eksempel 24',
    steg: EKS24_STEG,
    C: Eksempel24,
    notat:
      'La en elev styre glidebryterne og prøve å få avvik² så lavt som mulig før du viser løsningen. Linja for hånd og regresjonslinja er nesten like. Oppg. 3.63.',
  },
  {
    tittel: 'Hvilken linje passer best?',
    steg: BESTE_STEG,
    C: BesteLinje,
    notat:
      'Reflekter og diskuter. Kvadratene viser avvikene. Regresjonslinja har minst samlet areal. Minste kvadraters metode er bakgrunnen, men elevene trenger ikke regne den.',
  },
  {
    tittel: 'Lineær regresjon',
    steg: 0,
    C: Oppskrift,
    notat: 'Boksen fra boka og framgangsmåten i GeoGebra. Vis gjerne live i GeoGebra med TV-dataene.',
  },
  {
    tittel: 'Utforsk: skyt med strikk',
    steg: 0,
    C: Strikk,
    notat:
      'Elevene gjør forsøket i par. Skriv inn målingene til en gruppe og prøv modellene. Tallene som står der fra før, er bare eksempler.',
  },
  {
    tittel: 'Eksempel 25',
    steg: EKS25_STEG,
    C: Eksempel25,
    notat:
      'Steg 1 viser også den lineære modellen i grått: hvorfor passer den dårlig? Vekstfaktor 1,42 gir 42 % økning. Diskuter e. Oppg. 3.64–3.67.',
  },
  {
    tittel: 'Ulike modeller',
    steg: 0,
    C: Modeller,
    notat: 'La elevene beskrive kjennetegnene med egne ord før du viser teksten. Koble til funksjonstypene fra tidligere i kapittelet.',
  },
  {
    tittel: 'Reflekter og diskuter',
    steg: REFLEKTER_STEG,
    C: Reflekter,
    notat:
      'Spørsmål 3: velg fjerdegrad. Den treffer alle fem punktene nøyaktig, men gir 486 hytter i 2031, langt over de andre. Lineær gir 301 og eksponentiell 357. Data fra oppg. 3.67.',
  },
  {
    tittel: 'Eksempel 26',
    steg: EKS26_STEG,
    C: Eksempel26,
    notat: 'Kobling til figurtall. Dra n for å vise trekantene. Gauss og 1 + 2 + … + 100 = 5050 er en fin historie. Oppg. 3.68–3.69.',
  },
  {
    tittel: 'Eksempel 27',
    steg: EKS27_STEG,
    C: Eksempel27,
    notat:
      'Problemløsning i fire faser. La elevene telle lagene selv før steg 3. Se tilbake: sjekk modellen på en verdi vi ikke brukte. Oppg. 3.70–3.71.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Fra oppg. 3.63, 3.67, 3.68 og 3.69. Elevene bruker GeoGebra på a og b.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Tre nivåer: kjenne igjen modelltype, bruke en modell, og tallmønstre.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat:
      'Exit ticket: f(x) = 840 · 0,93^x viser antall fisk x år etter 2020. Hva er den årlige endringen? Hva sier modellen om 2030? (Svar: −7 %, omtrent 407.)',
  },
];
