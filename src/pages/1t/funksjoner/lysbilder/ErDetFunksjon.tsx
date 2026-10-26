import React from 'react';
import { V, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx, Verditabell } from '../felles';

type Sak = { t: string; innhold: React.ReactNode; svar: boolean; hvorfor: React.ReactNode };

const SAKER: Sak[] = [
  {
    t: 'Kvadrattall',
    innhold: <Verditabell x={<V c="n" />} y={<Fx f="K" x={<V c="n" />} />} xs={[1, 2, 3, 4, 5]} ys={[1, 4, 9, 16, 25]} />,
    svar: true,
    hvorfor: 'Hver n gir nøyaktig ett kvadrattall.',
  },
  {
    t: 'En tabell',
    innhold: <Verditabell x={<X />} y={<V c="y" />} xs={[1, 2, 2, 3]} ys={[5, 6, 8, 9]} />,
    svar: false,
    hvorfor: (
      <>
        <span className="math">
          <X /> = 2
        </span>{' '}
        gir både 6 og 8. Én innverdi kan ikke ha to utverdier.
      </>
    ),
  },
  {
    t: 'Temperatur gjennom natta',
    innhold: (
      <Verditabell x={<V c="t" />} y={<Fx f="T" x={<V c="t" />} />} xs={[2, 4, 6, 8]} ys={[-0.8, -1.5, -1.2, -0.8]} />
    ),
    svar: true,
    hvorfor: 'Hvert tidspunkt har én temperatur. At to tidspunkter har samme temperatur, er helt greit.',
  },
  {
    t: 'Likningen y² = x',
    innhold: (
      <p className="math">
        <V c="y" />
        <sup>2</sup> = <X />
      </p>
    ),
    svar: false,
    hvorfor: (
      <>
        <span className="math">
          <X /> = 4
        </span>{' '}
        gir{' '}
        <span className="math">
          <V c="y" /> = 2
        </span>{' '}
        og{' '}
        <span className="math">
          <V c="y" /> = −2
        </span>
        . To utverdier, så <V c="y" /> er ikke en funksjon av <X />.
      </>
    ),
  },
];

export const SAKER_STEG = SAKER.length;

export const ErDetFunksjon: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Sjekk</div>
    <h2>Er det en funksjon?</h2>
    <p>
      Spørsmålet er alltid det samme: gir hver innverdi <b>nøyaktig én</b> utverdi?
    </p>
    <div className="grid2">
      {SAKER.map((k, i) => (
        <div className="panel stack" key={i} style={{ gap: 10 }}>
          <h3>{k.t}</h3>
          {k.innhold}
          {frag > i ? (
            <div className="reveal stack" style={{ gap: 6 }}>
              <span className="pill" style={{ alignSelf: 'start', color: k.svar ? 'var(--ok)' : 'var(--bad)' }}>
                {k.svar ? 'Ja, en funksjon' : 'Nei, ikke en funksjon'}
              </span>
              <p className="small">{k.hvorfor}</p>
            </div>
          ) : (
            <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
              Vis svar
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);
