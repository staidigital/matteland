import { Akser } from './lysbilder/Akser';
import { FOLKETALL_STEG, Folketall } from './lysbilder/Folketall';
import { LIKNING_STEG, LikningGrafisk } from './lysbilder/LikningGrafisk';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { TEMPERATUR_STEG, Temperatur } from './lysbilder/Temperatur';
import { Tittel } from './lysbilder/Tittel';
import { TO_LINJER_STEG, ToLinjer } from './lysbilder/ToLinjer';
import { Utforsk } from './lysbilder/Utforsk';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Skjæringspunkter',
    steg: 0,
    C: Tittel,
    notat: 'Spør før du blar: Hva er spesielt med alle punkter på y-aksen? Og på x-aksen? Pek på (3 , 2): hva vet vi om f(3) og g(3)?',
  },
  {
    tittel: 'Skjæring med aksene',
    steg: 0,
    C: Akser,
    notat: 'Som oppg. 3.9, 3.11 og 3.12. La elevene regne før du bytter funksjon. Andregradsfunksjonen kobler til nullpunktsfaktorisering. f(x) = 5: hvorfor ingen nullpunkter?',
  },
  {
    tittel: 'Nullpunkt',
    steg: TEMPERATUR_STEG,
    C: Temperatur,
    notat: 'Eksempel 5 i boka. Spør om tolkningen: hva betyr (0 , 32), og hva betyr nullpunktet? Ved 0 °F frøs Fahrenheits saltvannsblanding.',
  },
  {
    tittel: 'Utforsk: f(x) = g(x)',
    steg: 0,
    C: Utforsk,
    notat: 'Utforsk-oppgaven i boka. La elevene foreslå x før du flytter. Poenget: der grafene møtes, gir begge funksjonene samme verdi. Løs x + 2 = −x + 4 på tavla etterpå.',
  },
  {
    tittel: 'Skjæring mellom grafer',
    steg: TO_LINJER_STEG,
    C: ToLinjer,
    notat: 'Eksempel 6. Grafisk først, så regning. Spør: hvorfor ganger vi med 3? Får vi samme y om vi bruker g(3)? (1/3 · 3 + 1 = 2). Oppg. 3.13–3.14.',
  },
  {
    tittel: 'Likninger grafisk',
    steg: LIKNING_STEG,
    C: LikningGrafisk,
    notat: 'Eksempel 7. Vis gjerne i GeoGebra med «Skjæring mellom to objekter». Spør hvorfor svaret er x-koordinaten og ikke punktet. Oppg. 3.15.',
  },
  {
    tittel: 'Skjæringspunkt i en modell',
    steg: FOLKETALL_STEG,
    C: Folketall,
    notat: 'Oppg. 3.14. Likningen kan ikke løses med vanlig regning i 1T, så her trenger vi grafen. La elevene finne intervallet med glidebryteren før du viser svaret.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Fra oppg. 3.9, 3.10, 3.15a og 3.12d. Gi 3–4 minutter i par.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Elevene kan øve på egne maskiner. Start med y-aksen, så nullpunkt, så to linjer.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat: 'Exit ticket: f(x) = 2x − 6 og g(x) = −x + 3. Finn nullpunktet til f og skjæringspunktet mellom grafene. (Svar: x = 3 og (3 , 0))',
  },
];
