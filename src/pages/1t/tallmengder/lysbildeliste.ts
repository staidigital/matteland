import { EKSEMPEL_STEG, Eksempel } from './lysbilder/Eksempel';
import { HELE_STEG, HeleTall } from './lysbilder/HeleTall';
import { IRRASJONALE_STEG, Irrasjonale } from './lysbilder/Irrasjonale';
import { Intervaller } from './lysbilder/Intervaller';
import { LIGGER_STEG, LiggerI } from './lysbilder/LiggerI';
import { NOTASJON_STEG, NotasjonIBruk } from './lysbilder/NotasjonIBruk';
import { PROV_NOTASJON_STEG, ProvNotasjon } from './lysbilder/ProvNotasjon';
import { UnionUtenom } from './lysbilder/UnionUtenom';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { RASJONALE_STEG, Rasjonale } from './lysbilder/Rasjonale';
import { Tittel } from './lysbilder/Tittel';
import { Utforsk } from './lysbilder/Utforsk';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Tallmengder',
    steg: 0,
    C: Tittel,
    notat: 'Spør: hvilke typer tall kjenner dere? La elevene plassere et par tall i figuren før du går videre.',
  },
  {
    tittel: 'Utforsk tallmengdene',
    steg: 0,
    C: Utforsk,
    notat: 'La elevene gjette før du klikker. Bruk særlig √9 og 3,14 for å få fram at utseendet kan lure.',
  },
  {
    tittel: 'Naturlige og hele tall',
    steg: HELE_STEG,
    C: HeleTall,
    notat: 'Her regner vi ikke 0 som et naturlig tall, slik resten av Matteland gjør. Noen bøker og fagmiljøer regner 0 med. Vis hvorfor mengdene utvides: en regneoperasjon mangler svar.',
  },
  {
    tittel: 'Rasjonale tall',
    steg: RASJONALE_STEG,
    C: Rasjonale,
    notat: 'Kontroller gjerne brøkene på kalkulator: 4 : 33 = 0,1212… Poenget er at desimalene enten tar slutt eller gjentar seg.',
  },
  {
    tittel: 'Irrasjonale og reelle tall',
    steg: IRRASJONALE_STEG,
    C: Irrasjonale,
    notat: 'Vi beviser ikke at √2 er irrasjonalt her. Kalkulatoren viser bare noen få desimaler, så den kan ikke avgjøre om et tall er irrasjonalt.',
  },
  {
    tittel: 'Eksempel: minste tallmengde',
    steg: EKSEMPEL_STEG,
    C: Eksempel,
    notat: 'La elevene diskutere i par før hvert svar. √2 · √8 er en fin overraskelse og peker fram mot rotreglene.',
  },
  {
    tittel: 'Intervaller',
    steg: 0,
    C: Intervaller,
    notat: 'Samme skrivemåte som i Funksjonsbegrepet, med spissparentes for åpne endepunkter. Flytt start og lengde, og slå endepunktene av og på.',
  },
  {
    tittel: 'Ligger i og delmengde',
    steg: LIGGER_STEG,
    C: LiggerI,
    notat: 'Les tegnene høyt: «3 ligger i de naturlige tallene». Skillet som er vanskelig: ∈ står mellom et tall og en mengde, ⊂ mellom to mengder. Noen bøker skriver ⊆ for delmengde. Her brukes ⊂.',
  },
  {
    tittel: 'Utforsk union og utenom',
    steg: 0,
    C: UnionUtenom,
    notat: 'Union: flytt intervallene så de overlapper og se at unionen blir ett intervall. Utenom: flytt tallet inn i intervallet, ut til et endepunkt og utenfor. Skråstreken \\ leses «utenom».',
  },
  {
    tittel: 'Notasjon i bruk',
    steg: NOTASJON_STEG,
    C: NotasjonIBruk,
    notat: 'Her møter de notasjonen i praksis, særlig definisjonsmengder. Linje 1 og 2 peker fram mot funksjoner der vi ikke kan dele med 0.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Regn i par. d: mange glemmer å telle med 0 og −2, eller tar med 3.',
  },
  {
    tittel: 'Prøv selv: notasjon',
    steg: PROV_NOTASJON_STEG,
    C: ProvNotasjon,
    notat: 'Regn i par. a: be elevene lese hvert svar høyt. d: unionen med overlapp blir ett intervall.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Tilfeldige oppgaver i fem typer. Elevene kan jobbe selv på egen maskin.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat: 'Få elevene til å gi et nytt eksempel for hver rad, og et tall som bare er med i den nederste.',
  },
];
