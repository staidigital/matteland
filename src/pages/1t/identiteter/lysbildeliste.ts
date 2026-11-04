import { BEGGE_STEG, BeggeSider } from './lysbilder/BeggeSider';
import { FEIL_STEG, VanligeFeil } from './lysbilder/VanligeFeil';
import { FIGUR_STEG, BevisMedFigur } from './lysbilder/BevisMedFigur';
import { HELTALL_STEG, Heltall } from './lysbilder/Heltall';
import { HvaEr } from './lysbilder/HvaEr';
import { MOTBEVIS_STEG, Motbevis } from './lysbilder/Motbevis';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { Tittel } from './lysbilder/Tittel';
import { UtforskLikhet } from './lysbilder/UtforskLikhet';
import { VISE_STEG, Vise } from './lysbilder/Vise';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  { tittel: 'Identitet og bevis', steg: 0, C: Tittel, notat: 'Spør: Hva er forskjellen på de to likhetene? Hvilke verdier av x gjør hver av dem sann?' },
  { tittel: 'Utforsk likheter', steg: 0, C: UtforskLikhet, notat: 'Gå gjennom de fire tilfellene. Dra i x og se når de to sidene er like. La elevene gjette før dere drar.' },
  { tittel: 'Hva er en identitet', steg: 0, C: HvaEr, notat: 'Få frem ordet «alle». En likning stiller et spørsmål, en identitet er en påstand.' },
  { tittel: 'Vise en identitet', steg: VISE_STEG, C: Vise, notat: 'Regn bare på én side, og ikke flytt over likhetstegnet. Vi vet jo ikke ennå at de to sidene er like.' },
  { tittel: 'Regn på begge sider', steg: BEGGE_STEG, C: BeggeSider, notat: 'Når begge sider kan regnes ut, er det ofte enklest å få samme uttrykk på begge sider. Pass på parentesen foran minus i det siste eksempelet.' },
  { tittel: 'Motbevis', steg: MOTBEVIS_STEG, C: Motbevis, notat: 'Ett eksempel som ikke stemmer er et motbevis. Mange eksempler som stemmer er ikke et bevis.' },
  { tittel: 'Bevis med hele tall', steg: HELTALL_STEG, C: Heltall, notat: 'Bygger på bevisene i figurtall. La elevene prøve noen tall først, og la dem finne påstanden: «Hva legger dere merke til?»' },
  { tittel: 'Bevis med figur', steg: FIGUR_STEG, C: BevisMedFigur, notat: 'En figur med lengder gir en forklaring for positive tall. Algebraen dekker alle tall. Spør: Hvorfor blir de to figurene like store?' },
  { tittel: 'Vanlige feil', steg: FEIL_STEG, C: VanligeFeil, notat: 'Vis feilen, la elevene diskutere i par, og vis så riktig svar.' },
  { tittel: 'Prøv selv', steg: PROV_STEG, C: ProvSelv, notat: 'Be elevene skrive hele bevis, ikke bare regning. Oppgave f er en utfordring.' },
  { tittel: 'Øv selv', steg: 0, C: OvSelv, notat: 'Elevene kan øve på egne maskiner. Oppgavene lages tilfeldig.' },
  { tittel: 'Oppsummering', steg: 0, C: Oppsummering, notat: 'Exit ticket: Vis at (x + 5)(x − 5) + 25 = x².' },
];
