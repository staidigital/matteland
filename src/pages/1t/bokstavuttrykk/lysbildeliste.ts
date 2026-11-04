import { FAKTOR_TALL_STEG, FaktorisereTall } from './lysbilder/FaktorisereTall';
import { FELLES_STEG, FellesFaktor } from './lysbilder/FellesFaktor';
import { GANGE_INN_STEG, GangeMedParentes } from './lysbilder/GangeMedParentes';
import { GANGE_STEG, GangeUt } from './lysbilder/GangeUt';
import { LOSE_STEG, LoseOppParenteser } from './lysbilder/LoseOppParenteser';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { REGNE_STEG, RegneMedBokstaver } from './lysbilder/RegneMedBokstaver';
import { Tittel } from './lysbilder/Tittel';
import { UtforskAreal } from './lysbilder/UtforskAreal';
import { UtforskFaktorer } from './lysbilder/UtforskFaktorer';
import { UtforskVerdi } from './lysbilder/UtforskVerdi';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Bokstavuttrykk og faktorisering',
    steg: 0,
    C: Tittel,
    notat: 'Spør hvorfor de to uttrykkene må være like. Kvadratsetningene kommer i et eget kapittel senere og er ikke med her.',
  },
  {
    tittel: 'Regne med bokstaver',
    steg: REGNE_STEG,
    C: RegneMedBokstaver,
    notat: 'La elevene prøve hver linje før du viser den. Skill tydelig mellom pluss (krever like ledd) og gange (krever det ikke).',
  },
  {
    tittel: 'Utforsk verdier',
    steg: 0,
    C: UtforskVerdi,
    notat: 'Svar på 1: 2x + 7 = 9x gir x = 1. Ett tall som stemmer, beviser ikke at uttrykkene er like. Men ett tall som ikke stemmer, avslører en feil.',
  },
  {
    tittel: 'Løse opp parenteser',
    steg: LOSE_STEG,
    C: LoseOppParenteser,
    notat: 'Minus foran parentes er den vanligste feilkilden. Si gjerne at minus foran betyr −1 ganger parentesen. Det kobler til neste lysbilde.',
  },
  {
    tittel: 'Multiplisere med parentes',
    steg: GANGE_INN_STEG,
    C: GangeMedParentes,
    notat: 'Linje 3: fortegnsregelen. Linje 4: mange regner 5 − 2 først. Vis gjerne med tall at det gir feil svar.',
  },
  {
    tittel: 'Utforsk to parenteser',
    steg: 0,
    C: UtforskAreal,
    notat: 'Modellen viser positive tall. Svar: tallet foran x er a + b, konstantleddet er a · b, og a = 3, b = 4 gir x² + 7x + 12.',
  },
  {
    tittel: 'Multiplisere to parenteser',
    steg: GANGE_STEG,
    C: GangeUt,
    notat: 'Vis gjerne med buer hvilke ledd som ganges sammen. Fire produkter hver gang, deretter trekker vi sammen.',
  },
  {
    tittel: 'Faktorisere tall',
    steg: FAKTOR_TALL_STEG,
    C: FaktorisereTall,
    notat: '1 regnes ikke som primtall. Vis gjerne delelighetsreglene: partall deles med 2, tverrsum delelig med 3, siste siffer 0 eller 5 deles med 5.',
  },
  {
    tittel: 'Utforsk felles faktorer',
    steg: 0,
    C: UtforskFaktorer,
    notat: 'Bro mellom faktorisering av tall og av uttrykk. La elevene finne felles faktorer før de flytter glidebryterne.',
  },
  {
    tittel: 'Trekke ut felles faktor',
    steg: FELLES_STEG,
    C: FellesFaktor,
    notat: 'Understrek at faktorisering er å gange ut baklengs. Be elevene alltid gange ut igjen som kontroll. Siste linje: det står igjen 1 i parentesen.',
  },
  {
    tittel: 'Vanlige feil',
    steg: FEIL_STEG,
    C: VanligeFeil,
    notat: 'La elevene finne feilen og teste med et tall før du viser svaret.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Regn i par. Én oppgave for hvert tema, i samme rekkefølge som i presentasjonen.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Tilfeldige oppgaver i seks typer, én for hvert tema. Elevene fyller inn tall i svaret, og negative tall skrives med minustegn.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat: 'Be elevene lage ett eget eksempel for hver regel.',
  },
];
