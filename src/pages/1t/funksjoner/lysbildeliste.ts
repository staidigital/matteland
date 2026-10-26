import { DefVerdi } from './lysbilder/DefVerdi';
import { DIGITALT_STEG, Digitalt } from './lysbilder/Digitalt';
import { EnXEnY } from './lysbilder/EnXEnY';
import { ErDetFunksjon, SAKER_STEG } from './lysbilder/ErDetFunksjon';
import { InnUt } from './lysbilder/InnUt';
import { Intervaller } from './lysbilder/Intervaller';
import { Koordinatsystemet } from './lysbilder/Koordinatsystemet';
import { LeseGraf } from './lysbilder/LeseGraf';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { SKRIVEMATE_STEG, Skrivematen } from './lysbilder/Skrivematen';
import { Tittel } from './lysbilder/Tittel';
import { TreFormer } from './lysbilder/TreFormer';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Funksjonsbegrepet',
    steg: 0,
    C: Tittel,
    notat: 'Spør: Hva skjer med utverdien hvis vi setter inn 4 i stedet for 3? Hvor ligger det punktet på grafen?',
  },
  {
    tittel: 'Koordinatsystemet',
    steg: 0,
    C: Koordinatsystemet,
    notat: 'Kort repetisjon (oppg. 3.1–3.2). La elevene gjette kvadranten før du flytter punktet. Sett x = 0: hvor havner alle slike punkter?',
  },
  {
    tittel: 'Innverdi og utverdi',
    steg: 0,
    C: InnUt,
    notat: 'Kobling til kapittel 1 (kvadrattall) og kapittel 2 (fahrenheit). Poenget: én innverdi gir én utverdi. Spør hva 0 °C og 100 °C blir.',
  },
  {
    tittel: 'Er det en funksjon?',
    steg: SAKER_STEG,
    C: ErDetFunksjon,
    notat: 'La elevene stemme med fingrene (1 = ja, 2 = nei) før hvert svar. Temperaturtabellen er den viktigste: samme utverdi to ganger er lov.',
  },
  {
    tittel: 'Skrivemåten f(x)',
    steg: SKRIVEMATE_STEG,
    C: Skrivematen,
    notat: 'Vanlig misforståelse: f(x) betyr ikke f ganger x. Spør hva f(0) blir, og hva det betyr for grafen (skjæring med andreaksen).',
  },
  {
    tittel: 'Uttrykk, tabell og graf',
    steg: 0,
    C: TreFormer,
    notat: 'Flytt glidebryteren til en x som står i tabellen, og til en som ikke gjør det. Oppg. 3.4: tre punkter på grafen til P(x) = 2x − 5.',
  },
  {
    tittel: 'Lese av grafen',
    steg: 0,
    C: LeseGraf,
    notat: 'Som oppg. 3.5. Spør: f(0), f(4), f(12)? Bytt så til «Finn x» med f(x) = 80: to svar. Hvorfor er det lov? Hva skjer for f(x) = 110?',
  },
  {
    tittel: 'Én x gir én y',
    steg: 0,
    C: EnXEnY,
    notat: 'Start med √x og flytt linja til negative x: ingen verdi. Bytt til y² = x: to treff. Bruk dette som overgang til definisjonsmengde.',
  },
  {
    tittel: 'Definisjons- og verdimengde',
    steg: 0,
    C: DefVerdi,
    notat: 'Utgangspunkt: Df = ⟨0, 12] som i boka. Kryss av og på for endepunktene og se sirklene. Spør hvorfor Vf følger med når Df endres.',
  },
  {
    tittel: 'Intervaller',
    steg: 0,
    C: Intervaller,
    notat: 'Figurtall gir en liste, ikke et intervall: VK = {1, 4, 9, …}. Oppg. 3.9: T(t) = 80 − 1,5t, DT = [0, 20]. Finn VT sammen.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Fra oppg. 3.10 og 3.11. Gi 3–4 minutter i par. I c er parentesen poenget: f(2a) = (2a)², ikke 2a².',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Elevene kan øve på egne maskiner. Start med lineær, gå videre til andregrad (negative x i kvadrat) og «Finn x».',
  },
  {
    tittel: 'Python og GeoGebra',
    steg: DIGITALT_STEG,
    C: Digitalt,
    notat: 'Eksempel 1 i boka. Spør hva utskriften blir før du viser den. Oppg. 3.12–3.13 passer som videre arbeid.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat: 'Exit ticket: g(x) = 2x − 5 med Dg = [0, 4]. Finn g(4) og Vg. (Svar: 3 og [−5, 3])',
  },
];
