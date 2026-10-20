import { Diskriminanten } from './lysbilder/Diskriminanten';
import { EKSEMPEL_STEG, Eksempel } from './lysbilder/Eksempel';
import { FORKORTING_STEG, Forkorting } from './lysbilder/Forkorting';
import { Fremgangsmate } from './lysbilder/Fremgangsmate';
import { HvaErFaktorisering } from './lysbilder/HvaErFaktorisering';
import { Nullproduktregelen } from './lysbilder/Nullproduktregelen';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { Setningen } from './lysbilder/Setningen';
import { Tittel } from './lysbilder/Tittel';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Nullpunktsfaktorisering',
    steg: 0,
    C: Tittel,
    notat: 'Spør: Hvor krysser grafen x-aksen? Ser dere de samme tallene igjen i uttrykket til høyre?',
  },
  {
    tittel: 'Hva er faktorisering',
    steg: 2,
    C: HvaErFaktorisering,
    notat: 'Repetisjon fra kapittel 02. La elevene gange ut (x − 2)(x − 3) selv før du viser stegene.',
  },
  {
    tittel: 'Nullproduktregelen',
    steg: 0,
    C: Nullproduktregelen,
    notat: 'La elevene foreslå x-verdier som gjør produktet 0 før du drar i glidebryteren. Poenget: et produkt er 0 bare når en av faktorene er 0.',
  },
  {
    tittel: 'Setningen',
    steg: 0,
    C: Setningen,
    notat: 'Flytt x₁ og x₂ med a = 1: hva skjer med faktorene? Endre så a: nullpunktene står stille, men grafen blir brattere eller snur. Spør hvorfor a må stå foran.',
  },
  {
    tittel: 'Fremgangsmåte',
    steg: 0,
    C: Fremgangsmate,
    notat: 'Koble til økta om abc-formelen. Vis gjerne Løs og Faktoriser i GeoGebra CAS.',
  },
  {
    tittel: 'Eksempel',
    steg: EKSEMPEL_STEG,
    C: Eksempel,
    notat: 'Spør klassen før hvert steg: Hva gjør vi nå? Pek på fortegnet i steg 4: x − (−2) blir x + 2.',
  },
  {
    tittel: 'Diskriminanten',
    steg: 0,
    C: Diskriminanten,
    notat: 'Utfordring: Finn et uttrykk med D = 0 og et med D < 0. Hva skjer med grafen? Vis også et tilfelle der D ikke er et kvadrattall.',
  },
  {
    tittel: 'Vanlige feil',
    steg: FEIL_STEG,
    C: VanligeFeil,
    notat: 'Vis feilen, la elevene diskutere i par i 30 sekunder, og vis så riktig svar.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Elevene kan øve på egne maskiner med nullpunktsfaktorisering.html. Start på a = 1, gå videre til a ≠ 1 og brøk-nullpunkt.',
  },
  {
    tittel: 'Forkorting',
    steg: FORKORTING_STEG,
    C: Forkorting,
    notat: 'Kobling til «4 faktorisering og forkorting». Spør hvorfor x ≠ 3 også må stå med selv om faktoren er strøket.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat: 'Exit ticket: Faktoriser 3x² − 3x − 18. (Svar: 3(x − 3)(x + 2))',
  },
];
