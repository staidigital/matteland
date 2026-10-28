import { BADMINTON_STEG, Badminton } from './lysbilder/Badminton';
import { DEFINISJON_STEG, Definisjon } from './lysbilder/Definisjon';
import { ETTPUNKT_STEG, Ettpunkt } from './lysbilder/Ettpunkt';
import { LINJE_STEG, LinjeToPunkter } from './lysbilder/LinjeToPunkter';
import { MOBIL_STEG, Mobil } from './lysbilder/Mobil';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { TEGNE_STEG, TegneForHand } from './lysbilder/TegneForHand';
import { Tittel } from './lysbilder/Tittel';
import { ToPunkter } from './lysbilder/ToPunkter';
import { Utforsk } from './lysbilder/Utforsk';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Lineære funksjoner',
    steg: 0,
    C: Tittel,
    notat: 'Spør: Hva skjer med f(x) når x øker med 1? Hvor skjærer linja y-aksen, og hvorfor? (f(0) = −3)',
  },
  {
    tittel: 'Utforsk a og b',
    steg: 0,
    C: Utforsk,
    notat: 'Utforsk-oppgaven i boka (f, i, l har samme a). La elevene gjette før du flytter: hva skjer når a blir negativ? Når b = 0? Slå på parallelle linjer.',
  },
  {
    tittel: 'Stigningstall og konstantledd',
    steg: DEFINISJON_STEG,
    C: Definisjon,
    notat: 'Reflekter og diskuter fra boka. La paret diskutere ett spørsmål om gangen før du viser svaret. 2x + y = 3 må skrives om til y = −2x + 3.',
  },
  {
    tittel: 'Tegne grafen for hånd',
    steg: TEGNE_STEG,
    C: TegneForHand,
    notat: 'Eksempel 8. Vis på tavla samtidig. Spør: hvordan går vi hvis a = 1/2? (2 bort, 1 opp). Oppg. 3.16–3.17.',
  },
  {
    tittel: 'Mobilabonnement',
    steg: MOBIL_STEG,
    C: Mobil,
    notat: 'Eksempel 9. Konstantleddet er det du betaler uansett, stigningstallet er prisen per enhet. Oppg. 3.18–3.19.',
  },
  {
    tittel: 'Stigningstall fra to punkter',
    steg: 0,
    C: ToPunkter,
    notat: 'Utforsk-oppgaven «Å finne likningen for en linje». Flytt P og Q: a endres ikke. Reflekter: Kan Δy være negativ? (Ja, linje C.) Hva med Δx? (Ja, hvis Q er til venstre for P.) Sett Q = P: hvorfor går det ikke?',
  },
  {
    tittel: 'Finne uttrykket fra grafen',
    steg: BADMINTON_STEG,
    C: Badminton,
    notat: 'Eksempel 10. Poenget: velg punkter du kan lese av presist. Oppg. 3.20–3.21.',
  },
  {
    tittel: 'Linja gjennom to punkter',
    steg: LINJE_STEG,
    C: LinjeToPunkter,
    notat: 'Eksempel 11. Reflekter: har det noe å si hvilket punkt vi velger? La halve klassen bruke A: 5 = −1/3 · (−3) + b gir også b = 4. Oppg. 3.22–3.24.',
  },
  {
    tittel: 'Ettpunktsformelen',
    steg: ETTPUNKT_STEG,
    C: Ettpunkt,
    notat: 'Eksempel 12 gir samme linje som eksempel 11. Reflekter: spiller det noen rolle om a skrives som brøk eller desimaltall? (−0,333… blir unøyaktig.) Oppg. 3.25–3.26.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Fra oppg. 3.18, 3.23b, 3.24a og 3.25. Gi 4–5 minutter i par. I c blir b en brøk: det er lov.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Elevene kan øve på egne maskiner. Start med å lese av grafen, gå så videre til to punkter og ettpunktsformelen.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat: 'Exit ticket: Finn likningen for linja gjennom (1 , 1) og (3 , 7). (Svar: a = 3, y = 3x − 2)',
  },
];
