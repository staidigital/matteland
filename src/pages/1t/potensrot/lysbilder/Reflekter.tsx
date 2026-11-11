import React from 'react';
import { Frac, Rot, V, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const KORT: [React.ReactNode, React.ReactNode][] = [
  [
    'Finner du noen sammenheng mellom en potensfunksjon og en rotfunksjon?',
    <>
      En rot er en potens med brøk som eksponent. Grafen til <Rot><X /></Rot> er den samme som grafen til{' '}
      <X />
      <sup>1/2</sup> for <X /> &gt; 0.
    </>,
  ],
  [
    <>
      Kan du skrive <Rot><X /></Rot> som en potensfunksjon?
    </>,
    <>
      Ja: <Rot><X /></Rot> = <X />
      <sup>1/2</sup>, fordi (<X />
      <sup>1/2</sup>)<sup>2</sup> = <X />
      <sup>1</sup> = <X />. Altså <V c="a" /> = 1 og <V c="b" /> = <Frac n="1" d="2" />.
    </>,
  ],
  [
    <>
      Hvordan skriver du <Rot n="3"><X /></Rot> og <Frac n="1" d={<X />} /> som potenser?
    </>,
    <>
      <Rot n="3"><X /></Rot> = <X />
      <sup>1/3</sup> og <Frac n="1" d={<X />} /> = <X />
      <sup>−1</sup>. Begge er potensfunksjoner.
    </>,
  ],
];

export const REFLEKTER_STEG = KORT.length;

export const Reflekter: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Reflekter og diskuter</div>
    <h2>Røtter er potenser</h2>
    <div className="grid3">
      {KORT.map(([s, svar], i) => (
        <div className="panel stack" key={i} style={{ gap: 10 }}>
          <p>
            <b className="pen">{i + 1}</b> &nbsp;{s}
          </p>
          {frag > i ? (
            <p className="reveal pen">{svar}</p>
          ) : (
            <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
              Vis svar
            </button>
          )}
        </div>
      ))}
    </div>
    <div className="boxed">
      <span className="label">Fra potenser</span>
      <span className="math">
        <Rot n={<V c="n" />}>
          <V c="a" />
        </Rot>{' '}
        = <V c="a" />
        <sup>1/n</sup>
      </span>
    </div>
  </div>
);
