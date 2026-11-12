import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Ras } from '../felles';

type Kort = [React.ReactNode, React.ReactNode];

const Kortstokk: React.FC<LysbildeProps & { kort: Kort[]; tittel: string; boks?: React.ReactNode }> = ({
  kort,
  tittel,
  boks,
  frag,
  setFrag,
}) => (
  <div className="slide">
    <div className="kicker">Reflekter og diskuter</div>
    <h2>{tittel}</h2>
    <div className={kort.length === 2 ? 'grid2' : 'grid3'}>
      {kort.map(([s, svar], i) => (
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
    {boks}
  </div>
);

const AKSER: Kort[] = [
  [
    <>
      Hva skal til for at grafen til en rasjonal funksjon skjærer <i className="v">y</i>-aksen?
    </>,
    <>
      Funksjonen må være definert for <X /> = 0, altså må nevneren være forskjellig fra 0 når <X /> = 0. Skjæringspunktet
      er (0 , <Fx x="0" />).
    </>,
  ],
  [
    <>
      Hva skal til for at grafen til en rasjonal funksjon skjærer <X />-aksen?
    </>,
    <>
      Telleren må kunne bli null. En brøk er null bare når telleren er null og nevneren ikke er det.
    </>,
  ],
];

export const AKSER_STEG = AKSER.length;

export const ReflekterAkser: React.FC<LysbildeProps> = (p) => (
  <Kortstokk
    {...p}
    kort={AKSER}
    tittel="Når skjærer grafen aksene?"
    boks={
      <div className="panel">
        <p>
          Grafen til{' '}
          <span className="math nw">
            <Fx /> = <Frac n="1" d={<X />} />
          </span>{' '}
          skjærer ingen av aksene. Telleren er aldri 0, og <X /> = 0 er ikke med.
        </p>
      </div>
    }
  />
);

const NULLPUNKT: Kort[] = [
  [
    'Hvorfor er det bare nevneren som bestemmer den vertikale asymptoten?',
    <>
      Vi kan ikke dele på null. Når nevneren nærmer seg 0 (og telleren ikke gjør det), blir brøken svært stor eller svært
      liten.
    </>,
  ],
  [
    'Hvor mange nullpunkter kan en rasjonal funksjon ha?',
    <>
      Like mange som telleren har. Med et førstegradsuttrykk i telleren er det høyst ett nullpunkt.
    </>,
  ],
  [
    'Har nevneren noen betydning for nullpunktet?',
    <>
      Ja: hvis nevneren også er null for samme <X />, er funksjonen ikke definert der, og vi har ikke noe nullpunkt.
    </>,
  ],
];

export const NULLPUNKT_STEG = NULLPUNKT.length;

export const ReflekterNullpunkt: React.FC<LysbildeProps> = (p) => (
  <Kortstokk
    {...p}
    kort={NULLPUNKT}
    tittel="Teller og nevner har hver sin jobb"
    boks={
      <div className="boxed">
        <span className="label">Huskeregel</span>
        <p>
          <b>Telleren</b> = 0 gir nullpunktet. &nbsp; <b className="c2">Nevneren</b> = 0 gir den vertikale asymptoten.
        </p>
        <p className="small">
          Eksempel:{' '}
          <span className="math nw">
            <Ras a={2} b={-1} c={1} d={3} />
          </span>{' '}
          har nullpunkt <X /> = <Frac n="1" d="2" /> og vertikal asymptote <X /> = −3.
        </p>
      </div>
    }
  />
);
