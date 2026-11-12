import React from 'react';
import { Frac } from '../../../../../presentasjon/matte';
import { FeilListe, type Feil } from '../../../../../presentasjon/ovelser';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

/** Det programmet skriver ut, på egen linje under koden */
const Ut: React.FC<{ children: string }> = ({ children }) => (
  <span className="py-inline" style={{ display: 'block', marginTop: 4 }}>
    → {children}
  </span>
);

const FEIL: Feil[] = [
  {
    t: 'Komma som desimaltegn',
    oppsett: <span>4,5 · 2</span>,
    feil: (
      <span className="small">
        <Kode inline>print(4,5 * 2)</Kode>
        <Ut>4 10</Ut>
      </span>
    ),
    riktig: (
      <span className="small">
        <Kode inline>print(4.5 * 2)</Kode>
        <Ut>9.0</Ut>
      </span>
    ),
    hvorfor: 'Komma skiller ting som skal skrives ut. Python skrev ut 4 og så 5 * 2.',
  },
  {
    t: '^ er ikke potens',
    oppsett: (
      <span>
        2<sup>3</sup>
      </span>
    ),
    feil: (
      <span className="small">
        <Kode inline>print(2^3)</Kode>
        <Ut>1</Ut>
      </span>
    ),
    riktig: (
      <span className="small">
        <Kode inline>print(2**3)</Kode>
        <Ut>8</Ut>
      </span>
    ),
    hvorfor: 'Tegnet ^ betyr noe helt annet i Python. Potens skrives alltid med **.',
  },
  {
    t: 'Brøk uten parentes',
    oppsett: (
      <span>
        <Frac n={<>3<sup>2</sup> − 1</>} d={<>2<sup>3</sup> + 1</>} />
      </span>
    ),
    feil: (
      <span className="small">
        <Kode inline>print((3**2 - 1)/2**3 + 1)</Kode>
        <Ut>2.0</Ut>
      </span>
    ),
    riktig: (
      <span className="small">
        <Kode inline>print((3**2 - 1)/(2**3 + 1))</Kode>
        <Ut>0.8888888888888888</Ut>
      </span>
    ),
    hvorfor: 'Uten parentes deler Python bare på 2**3, og legger til 1 etterpå.',
  },
];

export const FEIL_STEG = FEIL.length;

export const VanligeFeil: React.FC<LysbildeProps> = (p) => (
  <div className="slide">
    <div className="kicker">Vanlige feil</div>
    <h2>Feil som ikke gir feilmelding</h2>
    <FeilListe {...p} feil={FEIL} />
    <div className="cols">
      <div className="stack">
        <h3>Feil som gir feilmelding</h3>
        <p>
          Noen ganger forstår ikke Python koden i det hele tatt. Da får vi en feilmelding som forteller hvilken linje feilen er
          på. Kjør programmet, les meldingen og rett feilen.
        </p>
      </div>
      <Kodeboks kode={'print(5(2 + 3))\nprint((3 + 4) * 2'} />
    </div>
  </div>
);
