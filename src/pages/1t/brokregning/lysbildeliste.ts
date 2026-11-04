import { BOKSTAVER_STEG, Bokstaver } from './lysbilder/Bokstaver';
import { DELE_STEG, Dele } from './lysbilder/Dele';
import { FORKORTE_STEG, Forkorte } from './lysbilder/Forkorte';
import { Gange } from './lysbilder/Gange';
import { LIKNINGER_STEG, Likninger } from './lysbilder/Likninger';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PLUSS_STEG, PlussMinus } from './lysbilder/PlussMinus';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { REKKEFOLGE_STEG, Regnerekkefolge } from './lysbilder/Regnerekkefolge';
import { Tittel } from './lysbilder/Tittel';
import { Utforsk } from './lysbilder/Utforsk';
import { UtforskSum } from './lysbilder/UtforskSum';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  { tittel: 'Brøkregning', steg: 0, C: Tittel, notat: 'Spør hvorfor de tre brøkene har samme verdi. Det er kjernen i å forkorte og utvide.' },
  { tittel: 'Utforsk like brøker', steg: 0, C: Utforsk, notat: 'Svar: vi ganger med k/k, som er lik 1. Ganger vi bare telleren, blir verdien k ganger større.' },
  { tittel: 'Forkorte og utvide', steg: FORKORTE_STEG, C: Forkorte, notat: 'Del gjerne i flere omganger når den største felles faktoren ikke er lett å se.' },
  { tittel: 'Pluss og minus', steg: PLUSS_STEG, C: PlussMinus, notat: 'La elevene foreslå fellesnevner. Produktet av nevnerne virker alltid, men er ikke alltid det minste.' },
  { tittel: 'Utforsk fellesnevner', steg: 0, C: UtforskSum, notat: 'Velg nevnere som 3 og 4, deretter 2 og 4. Se at delene blir like store med fellesnevner.' },
  { tittel: 'Gange', steg: 0, C: Gange, notat: 'Overlappet er brøk av brøk: 2/3 av 3/4. Modellen viser brøker mellom 0 og 1.' },
  { tittel: 'Dele', steg: DELE_STEG, C: Dele, notat: 'Start med hvor mange fjerdedeler det går på 2. Da gir regelen mening.' },
  { tittel: 'Regnerekkefølge og fortegn', steg: REKKEFOLGE_STEG, C: Regnerekkefolge, notat: 'La elevene gjette om de to første svarene blir like før du viser dem.' },
  { tittel: 'Brøker med bokstaver', steg: BOKSTAVER_STEG, C: Bokstaver, notat: 'Bygger på faktorisering. Nevn at nevneren ikke kan være 0, derfor x ≠ −2 i linje 4.' },
  { tittel: 'Likninger med brøk', steg: LIKNINGER_STEG, C: Likninger, notat: 'Bruk fellesnevner og gang hvert eneste ledd, også høyresiden. Sett prøve på svaret.' },
  { tittel: 'Vanlige feil', steg: FEIL_STEG, C: VanligeFeil, notat: 'La elevene teste feilene med tall før du viser riktig svar. Siste feil: brøkstreken virker som en parentes rundt telleren, så minusen gjelder alle leddene der.' },
  { tittel: 'Prøv selv', steg: PROV_STEG, C: ProvSelv, notat: 'Regn i par. Oppgave e bygger på konjugatsetningen, og f bruker fellesnevner 6.' },
  { tittel: 'Øv selv', steg: 0, C: OvSelv, notat: 'Tilfeldige oppgaver i fire typer. Svar som ikke er forkortet nok, får et hint i stedet for rødt kryss.' },
  { tittel: 'Oppsummering', steg: 0, C: Oppsummering, notat: 'Gi elevene et par minutter til å forklare reglene med egne ord.' },
];
