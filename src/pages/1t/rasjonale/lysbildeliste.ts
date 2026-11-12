import { ASYMPTOTER_STEG, Asymptoter } from './lysbilder/Asymptoter';
import { DEF_STEG, Definisjon } from './lysbilder/Definisjon';
import { EKS22_STEG, Eksempel22 } from './lysbilder/Eksempel22';
import { EKS23_STEG, Eksempel23 } from './lysbilder/Eksempel23';
import { FinneAsymptotene } from './lysbilder/FinneAsymptotene';
import { Oppsummering } from './lysbilder/Oppsummering';
import { OvSelv } from './lysbilder/OvSelv';
import { PROV_STEG, ProvSelv } from './lysbilder/ProvSelv';
import { AKSER_STEG, NULLPUNKT_STEG, ReflekterAkser, ReflekterNullpunkt } from './lysbilder/Reflekter';
import { Tittel } from './lysbilder/Tittel';
import { UTFORSK_STEG, Utforsk } from './lysbilder/Utforsk';
import type { Lysbilde } from '../../../presentasjon/ui';

export const LYSBILDER: Lysbilde[] = [
  {
    tittel: 'Rasjonale funksjoner',
    steg: 0,
    C: Tittel,
    notat:
      'Spør: hva er nytt med denne grafen sammenlignet med de vi har sett før? (To deler, og stiplede linjer den aldri treffer.)',
  },
  {
    tittel: 'Utforsk 1/x',
    steg: UTFORSK_STEG,
    C: Utforsk,
    notat:
      'Utforsk-oppgaven i boka. La elevene prøve x-verdier selv før du viser svarene. Grafen dukker opp i steg 4. Prøv x = 0 på glidebryteren.',
  },
  {
    tittel: 'Hva er en rasjonal funksjon?',
    steg: DEF_STEG,
    C: Definisjon,
    notat:
      'Definisjonen fra boka. Siste kort er Reflekter og diskuter: (ax + b)/(cx + d) med c = 0 er en lineær funksjon.',
  },
  {
    tittel: 'Eksempel 22',
    steg: EKS22_STEG,
    C: Eksempel22,
    notat:
      'Eksempel 22, klassefesten. Spør før b: hvorfor faller grafen brattest i starten? Under d: hvorfor «mer enn» 30? Oppg. 3.55–3.56.',
  },
  {
    tittel: 'Skjærer grafen aksene?',
    steg: AKSER_STEG,
    C: ReflekterAkser,
    notat: 'Reflekter og diskuter fra boka. La elevene diskutere i par et minutt per spørsmål.',
  },
  {
    tittel: 'Asymptoter',
    steg: ASYMPTOTER_STEG,
    C: Asymptoter,
    notat:
      'Bokas gjennomgang av (2x − 3)/(4x + 6). Dra x mot −1,5 fra begge sider og se verdiene eksplodere. Steg 4 er definisjonsboksen.',
  },
  {
    tittel: 'Å finne asymptotene',
    steg: 0,
    C: FinneAsymptotene,
    notat:
      'Regelen y = a/c og x = −d/c. Endre a og c og se den vannrette linja flytte seg, d og c for den loddrette. Prøv c = 0, og a = 2, b = 4, c = 1, d = 2 (spesialtilfelle).',
  },
  {
    tittel: 'Teller og nevner',
    steg: NULLPUNKT_STEG,
    C: ReflekterNullpunkt,
    notat: 'Reflekter og diskuter fra boka. Huskeregelen: telleren gir nullpunkt, nevneren gir vertikal asymptote.',
  },
  {
    tittel: 'Eksempel 23',
    steg: EKS23_STEG,
    C: Eksempel23,
    notat:
      'Eksempel 23. Steg 3–5: verditabell på én side, tegn kurven, speil om (−3 , 2). Spør hvorfor 2 ikke er med i verdimengden. Oppg. 3.57–3.62.',
  },
  {
    tittel: 'Prøv selv',
    steg: PROV_STEG,
    C: ProvSelv,
    notat: 'Fra oppg. 3.55, 3.57, 3.59 og 3.61. Gi 5–7 minutter i par.',
  },
  {
    tittel: 'Øv selv',
    steg: 0,
    C: OvSelv,
    notat: 'Elevene kan øve på egne maskiner. Fire nivåer: asymptoter, nullpunkt, mengder og spleiselag.',
  },
  {
    tittel: 'Oppsummering',
    steg: 0,
    C: Oppsummering,
    notat:
      'Exit ticket: f(x) = (x + 4)/(2x − 2). Finn asymptotene, nullpunktet og definisjonsmengden. (Svar: y = 1/2, x = 1, x = −4, ℝ \\ {1})',
  },
];
