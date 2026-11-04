import { near } from '../../../presentasjon/matte';

/** Sant hvis de to svarene er de to løsningene, i valgfri rekkefølge. */
export const toLosninger = (u: number, v: number, x1: number, x2: number) =>
  (near(u, x1) && near(v, x2)) || (near(u, x2) && near(v, x1));

/** Feltene for to løsninger */
export const LOSNINGSFELT = [
  { navn: 'Første løsning', foran: 'x =' },
  { navn: 'Andre løsning', foran: 'eller x =' },
];
