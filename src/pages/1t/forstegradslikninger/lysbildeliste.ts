import { BEGGE_STEG, BeggeSider } from './lysbilder/BeggeSider';
import { BROK_STEG, MedBrok } from './lysbilder/MedBrok';
import { Hva } from './lysbilder/Hva';
import { LOSNINGER_STEG, Losninger } from './lysbilder/Losninger';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PARENTES_STEG, Parenteser } from './lysbilder/Parenteser';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { REGLER_STEG, Regler } from './lysbilder/Regler';
import { TEKST_STEG, Tekstoppgave } from './lysbilder/Tekstoppgave';
import { Tittel } from './lysbilder/Tittel';
import { UtforskVekt } from './lysbilder/UtforskVekt';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  { tittel: 'Førstegradslikninger', steg: 0, C: Tittel, notat: 'Spør hva hver x må veie for at vekta skal være i likevekt. Svar: 3. La elevene forklare hvordan de tenkte.' },
  { tittel: 'Hva er en likning?', steg: 0, C: Hva, notat: 'Dra x sakte. La elevene si på forhånd hvilken vei vekta tipper. Løsningen er x = 4, den eneste verdien som gir likevekt.' },
  { tittel: 'Utforsk likevekt', steg: 0, C: UtforskVekt, notat: 'La elevene velge trekkene. Poenget: så lenge vi gjør det samme på begge sider, er vekta i likevekt. Det finnes flere veier til samme svar.' },
  { tittel: 'Løse en likning', steg: REGLER_STEG, C: Regler, notat: 'Å «flytte over og skifte fortegn» er en snarvei for å trekke fra på begge sider. Vis gjerne hvorfor før dere bruker snarveien.' },
  { tittel: 'x på begge sider', steg: BEGGE_STEG, C: BeggeSider, notat: 'Samle x på den siden der det blir positivt, så slipper elevene å dele på et negativt tall. Svaret kan godt være en brøk, som i linje 6.' },
  { tittel: 'Parenteser', steg: PARENTES_STEG, C: Parenteser, notat: 'Bygger på Bokstavuttrykk. Stopp ved linje 2 og spør hvorfor det står + 4.' },
  { tittel: 'Likninger med brøk', steg: BROK_STEG, C: MedBrok, notat: 'Bygger på Brøkregning. Parentesen rundt x + 1 er det viktigste her, for brøkstreken virker som en parentes.' },
  { tittel: 'Antall løsninger', steg: LOSNINGER_STEG, C: Losninger, notat: 'Når x forsvinner, ser vi på påstanden som er igjen. Usann gir ingen løsning, sann betyr at alle tall er løsninger.' },
  { tittel: 'Sette opp en likning', steg: TEKST_STEG, C: Tekstoppgave, notat: 'Det vanskeligste er ofte å bestemme hva x står for. Be elevene skrive det ned hver gang, og å svare med hele setninger.' },
  { tittel: 'Vanlige feil', steg: FEIL_STEG, C: VanligeFeil, notat: 'La elevene sette prøve på det feile svaret før du viser riktig. Da oppdager de feilen selv.' },
  { tittel: 'Prøv selv', steg: PROV_STEG, C: ProvSelv, notat: 'Regn i par. Oppgave f krever at elevene setter opp likningen selv. Minn om å sette prøve.' },
  { tittel: 'Øv selv', steg: 0, C: OvSelv, notat: 'Tilfeldige oppgaver i fire typer. Alle svarene er hele tall, men elevene kan også skrive svaret som brøk.' },
  { tittel: 'Oppsummering', steg: 0, C: Oppsummering, notat: 'Gi elevene et par minutter til å forklare fremgangsmåten med egne ord.' },
];
