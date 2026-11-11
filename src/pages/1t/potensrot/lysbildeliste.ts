import { DEF_STEG, Definisjon } from './lysbilder/Definisjon';
import { EKS19_STEG, Eksempel19 } from './lysbilder/Eksempel19';
import { EKS20_STEG, Eksempel20 } from './lysbilder/Eksempel20';
import { EKS21_STEG, Eksempel21 } from './lysbilder/Eksempel21';
import { EKSPONENT_STEG, Eksponenten } from './lysbilder/Eksponenten';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { REFLEKTER_STEG, Reflekter } from './lysbilder/Reflekter';
import { ROT_STEG, Rotfunksjoner } from './lysbilder/Rotfunksjoner';
import { Tittel } from './lysbilder/Tittel';
import { Utforsk } from './lysbilder/Utforsk';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Potens- og rotfunksjoner',
    steg: 0,
    C: Tittel,
    notat:
      'Spør: hva har de tre grafene felles? (De går gjennom (1 , 1).) Hvorfor tegner vi bare for x > 0? Det kommer vi tilbake til.',
  },
  {
    tittel: 'Utforsk eksponenten',
    steg: 0,
    C: Utforsk,
    notat:
      'Utforsk-oppgaven i boka. 2: x, x², x³, x^(1/2), x^(1/3). 3: x^(−1), x^(−2), x^(−1/2). 4: sorter etter b < 0, b > 1 og 0 < b < 1. Felles punkt: (1 , 1). La elevene dra i b selv.',
  },
  {
    tittel: 'Eksponenten bestemmer formen',
    steg: EKSPONENT_STEG,
    C: Eksponenten,
    notat: 'Oppgave 5 i Utforsk: la elevene oppsummere før du viser hvert panel.',
  },
  {
    tittel: 'Potensfunksjoner',
    steg: DEF_STEG,
    C: Definisjon,
    notat:
      'Definisjonen og oppg. 3.46. Pek på forskjellen fra forrige presentasjon: a · bˣ mot a · xᵇ. 3x² er både potensfunksjon og andregradsfunksjon.',
  },
  {
    tittel: 'Eksempel 19',
    steg: EKS19_STEG,
    C: Eksempel19,
    notat:
      'Eksempel 19. Spør før b: hvor mye mer effekt gir tre ganger så mye vind? Steg 3 viser Python-programmet fra boka. Oppg. 3.46–3.50.',
  },
  {
    tittel: 'Rotfunksjoner',
    steg: ROT_STEG,
    C: Rotfunksjoner,
    notat:
      'Utforsk «Rotfunksjoner»: dra x under 3 og se at h ikke er definert. Steg 2: tredjerota av negative tall finnes, så g er definert for alle x.',
  },
  {
    tittel: 'Eksempel 20',
    steg: EKS20_STEG,
    C: Eksempel20,
    notat:
      'Eksempel 20. La elevene kombinere i par før du viser svarene. g er en halvsirkel med radius 5. Oppg. 3.52 er samme type.',
  },
  {
    tittel: 'Eksempel 21',
    steg: EKS21_STEG,
    C: Eksempel21,
    notat:
      'Eksempel 21. Grafen dukker opp i steg 1. Steg 3 løser likningen uten graf ved å kvadrere begge sider. Oppg. 3.51–3.54.',
  },
  {
    tittel: 'Reflekter og diskuter',
    steg: REFLEKTER_STEG,
    C: Reflekter,
    notat: 'Reflekter og diskuter fra boka. Kobling til «Potenser og røtter»: brøk som eksponent.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Fra oppg. 3.48c, 3.49b, 3.51 og 3.54b–c. Gi 5–7 minutter i par. I d: S(x) = 0 gir endene av halvsirkelen.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Elevene kan øve på egne maskiner. «Regn ut» er uten kalkulator og øver på brøk og negative eksponenter.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat:
      'Exit ticket: f(x) = 2x^(1/2). Finn f(9) og f(16). Er f en potensfunksjon eller en eksponentialfunksjon? Hva er definisjonsmengden til √(x + 2)? (Svar: 6, 8, potensfunksjon, [−2 , →⟩)',
  },
];
