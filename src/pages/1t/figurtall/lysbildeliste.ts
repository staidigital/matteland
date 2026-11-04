import { ANDREGRAD_STEG, Andregrad } from './lysbilder/Andregrad';
import { BEVIS_STEG, Bevis } from './lysbilder/Bevis';
import { NUMMER_STEG, Figurnummer } from './lysbilder/Figurnummer';
import { FORMEL_STEG, FraFigurTilFormel } from './lysbilder/FraFigurTilFormel';
import { Lineart } from './lysbilder/Lineart';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { Ramme } from './lysbilder/Ramme';
import { Tittel } from './lysbilder/Tittel';
import { Trekanttall } from './lysbilder/Trekanttall';
import { Utforsk } from './lysbilder/Utforsk';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  { tittel: 'Figurtall og generalisering', steg: 0, C: Tittel, notat: 'La elevene telle og gjette på figur 5 og figur 100. Spør hvordan de kan slippe å telle.' },
  { tittel: 'Utforsk mønstre', steg: 0, C: Utforsk, notat: 'Velg gjerne ett mønster om gangen. La elevene formulere en regel med ord før de bruker bokstaver.' },
  { tittel: 'Fra figur til formel', steg: FORMEL_STEG, C: FraFigurTilFormel, notat: 'Fargene viser hvor hvert ledd i formelen kommer fra. Få fram at formelen beskriver hvordan figuren er bygd.' },
  { tittel: 'Lineære mønstre', steg: 0, C: Lineart, notat: 'Kobling til lineære funksjoner: økningen er stigningstallet, men definisjonsmengden er naturlige tall.' },
  { tittel: 'Trekanttall', steg: 0, C: Trekanttall, notat: 'Klassisk argument: to like trekanter gir et rektangel. Regn også 1 + 2 + … + 100 = 5050.' },
  { tittel: 'Samme figur, ulike formler', steg: 0, C: Ramme, notat: 'La elevene telle på sin egen måte først. Vis at ulike formler er det samme etter forenkling. Fin repetisjon av kvadratsetningene.' },
  { tittel: 'Andregradsmønstre', steg: ANDREGRAD_STEG, C: Andregrad, notat: 'Fast økning i økningen gir andre grad. Når økningen i økningen er 2, er tallet foran n² lik 1. GeoGebra-regresjon kan brukes til å kontrollere.' },
  { tittel: 'Bruke formelen baklengs', steg: NUMMER_STEG, C: Figurnummer, notat: 'Andregradslikningen kobler til abc-formelen. Understrek hvorfor −11 forkastes: figurnummeret må være et naturlig tall.' },
  { tittel: 'Fra eksempler til bevis', steg: BEVIS_STEG, C: Bevis, notat: 'Regn gjerne noen verdier av n² + n + 41 i GeoGebra før du viser n = 40.' },
  { tittel: 'Prøv selv', steg: PROV_STEG, C: ProvSelv, notat: 'Regn i par. Oppgave f er et lite bevis: faktorisering viser at 3 går opp.' },
  { tittel: 'Øv selv', steg: 0, C: OvSelv, notat: 'Tilfeldige oppgaver i fire typer. Figurnummer-oppgavene med andregrad krever abc-formelen eller CAS.' },
  { tittel: 'Oppsummering', steg: 0, C: Oppsummering, notat: 'La elevene lage sitt eget mønster og gi det til sidemannen, som skal finne formelen.' },
];
