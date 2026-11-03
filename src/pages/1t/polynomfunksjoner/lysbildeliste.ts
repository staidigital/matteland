import { EKS13_STEG, Eksempel13 } from './lysbilder/Eksempel13';
import { EKS14_STEG, Eksempel14 } from './lysbilder/Eksempel14';
import { EKS15_STEG, Eksempel15 } from './lysbilder/Eksempel15';
import { EKS16_STEG, Eksempel16 } from './lysbilder/Eksempel16';
import { EKSTREMAL_STEG, Ekstremalpunkter } from './lysbilder/Ekstremalpunkter';
import { GRAD_STEG, Grad } from './lysbilder/Grad';
import { IMPALA_STEG, Impala } from './lysbilder/Impala';
import { NULL_STEG, Nullpunkter } from './lysbilder/Nullpunkter';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PARABEL_STEG, Parabelen } from './lysbilder/Parabelen';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { SYMMETRI_STEG, Symmetri } from './lysbilder/Symmetri';
import { SYMLINJE_STEG, Symmetrilinja } from './lysbilder/Symmetrilinja';
import { Tittel } from './lysbilder/Tittel';
import { TREDJE_STEG, Tredjegrad } from './lysbilder/Tredjegrad';
import { Utforsk } from './lysbilder/Utforsk';
import { UtforskGrad } from './lysbilder/UtforskGrad';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Polynomfunksjoner',
    steg: 0,
    C: Tittel,
    notat:
      "Vis bildet av L'Oceanogràfic fra boka. Spør: hva har de to grafene felles, og hva skiller dem? (Begge snur, men g snur to ganger.)",
  },
  {
    tittel: 'Utforsk a, b og c',
    steg: 0,
    C: Utforsk,
    notat:
      'Utforsk-oppgaven i boka. Start med b = 0 og c = 0 (f(x) = ax²): hva skjer når a blir negativ? Stor? Liten? Så c (g(x) = x² + c). La b vente til neste lysbilde.',
  },
  {
    tittel: 'Parabelen',
    steg: PARABEL_STEG,
    C: Parabelen,
    notat:
      'Egenskapene i boka. La elevene gjette før hver graf. Poeng: b flytter toppunktet både sidelengs og opp/ned, men alle grafene går gjennom (0 , c).',
  },
  {
    tittel: 'Symmetri',
    steg: SYMMETRI_STEG,
    C: Symmetri,
    notat:
      'Utforsk «Symmetri». La elevene lage verditabellene selv (gjerne i par) før du viser dem. Steg 2 farger like verdier likt. Flytt r: punktene er alltid like høyt.',
  },
  {
    tittel: 'Symmetrilinja',
    steg: SYMLINJE_STEG,
    C: Symmetrilinja,
    notat:
      'Regelen x = −b/(2a). Spør: hvorfor kan ikke a være 0? Steg 1 viser hvorfor ax² er symmetrisk om x = 0. Det generelle beviset er oppg. 3.125.',
  },
  {
    tittel: 'Eksempel 13',
    steg: EKS13_STEG,
    C: Eksempel13,
    notat:
      'Eksempel 13. I c bruker vi symmetrien i stedet for å regne. I boka står det «g = g(0)» i koden, som overskriver funksjonen g. Her heter variabelen y. Oppg. 3.29.',
  },
  {
    tittel: 'Impalaens hopp',
    steg: IMPALA_STEG,
    C: Impala,
    notat:
      'Utforsk «Ekstremalpunkter». Svarene er avlesninger, så «omtrent» er godt nok. Poeng: toppunktet ligger midt mellom nullpunktene (symmetrilinja).',
  },
  {
    tittel: 'Ekstremalpunkter',
    steg: EKSTREMAL_STEG,
    C: Ekstremalpunkter,
    notat:
      'Definisjonen. Pek på det lille toppunktet: lavere enn det store, men likevel et toppunkt, fordi det er høyest «i nærheten».',
  },
  {
    tittel: 'Eksempel 14',
    steg: EKS14_STEG,
    C: Eksempel14,
    notat:
      'Eksempel 14. Bygg grafen bit for bit: symmetrilinje, bunnpunkt, verdimengde, nullpunkter, så kurven. Kontroll: nullpunktene −1 og 3 ligger symmetrisk om x = 1. Oppg. 3.30–3.33.',
  },
  {
    tittel: 'Nullpunkter',
    steg: NULL_STEG,
    C: Nullpunkter,
    notat:
      'Reflekter og diskuter fra boka. Flytt parabelen opp og ned mens elevene svarer. Koble til diskriminanten: b² − 4ac > 0, = 0 og < 0.',
  },
  {
    tittel: 'Utforsk tredje og fjerde grad',
    steg: 0,
    C: UtforskGrad,
    notat:
      'Utforsk «Flere polynomfunksjoner». Tredje grad: 0 eller 2 ekstremalpunkter, 1–3 nullpunkter. Fjerde grad: 1 eller 3 ekstremalpunkter, 0–4 nullpunkter. Konstantleddet flytter grafen opp og ned.',
  },
  {
    tittel: 'Grad',
    steg: GRAD_STEG,
    C: Grad,
    notat:
      'Polynomer og grad. Vis gjerne bildet av The Twist på Kistefos fra boka. De to siste er feller: 2^x og 3/x er ikke polynomer.',
  },
  {
    tittel: 'Eksempel 15',
    steg: EKS15_STEG,
    C: Eksempel15,
    notat: 'Eksempel 15. Vis i GeoGebra samtidig. Kontrollen i b kobler til nullpunktsfaktorisering. Oppg. 3.34–3.35.',
  },
  {
    tittel: 'Eksempel 16',
    steg: EKS16_STEG,
    C: Eksempel16,
    notat:
      'Eksempel 16. Spør før b: hva tror dere modellen gir for en seksåring? Poeng: en modell gjelder bare i definisjonsmengden. Oppg. 3.36–3.37.',
  },
  {
    tittel: 'Reflekter: tredjegradsfunksjoner',
    steg: TREDJE_STEG,
    C: Tredjegrad,
    notat:
      'Reflekter og diskuter etter eksempel 16. La gruppene skissere før svaret vises. Nr. 3: (x − 1)²(x + 2) berører x-aksen i x = 1.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat:
      'Fra oppg. 3.30a, 3.30d, 3.31a og 3.31c. Gi 5 minutter i par. I d er det ingen nullpunkter, fordi diskriminanten er negativ.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat:
      'Elevene kan øve på egne maskiner. Start med symmetrilinja, gå så videre til ekstremalpunktet og nullpunktene.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat:
      'Exit ticket: f(x) = x² − 6x + 5. Finn symmetrilinja, ekstremalpunktet og nullpunktene. (Svar: x = 3, bunnpunkt (3 , −4), x = 1 og x = 5)',
  },
];
