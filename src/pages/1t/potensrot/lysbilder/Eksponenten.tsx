import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { type Eksponent, Pot, eksponent, pot, verdi } from '../felles';

type Gruppe = { tittel: React.ReactNode; tekst: React.ReactNode; eksponenter: Eksponent[] };

const GRUPPER: Gruppe[] = [
  {
    tittel: <>b &gt; 1</>,
    tekst: 'Grafen vokser, og blir stadig brattere.',
    eksponenter: [2, 3],
  },
  {
    tittel: <>0 &lt; b &lt; 1</>,
    tekst: 'Grafen vokser, men blir stadig slakkere.',
    eksponenter: [
      [1, 2],
      [1, 3],
    ],
  },
  {
    tittel: <>b &lt; 0</>,
    tekst: 'Grafen avtar. Den nærmer seg aksene uten å treffe dem.',
    eksponenter: [-1, -2, [-1, 2]],
  },
];

const FARGER = ['c1', 'c2', 'ink'];

export const EKSPONENT_STEG = GRUPPER.length - 1;

export const Eksponenten: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Utforsk · Oppsummering</div>
    <h2>Eksponenten bestemmer formen</h2>
    <p>
      Alle grafene går gjennom <b className="pen">(1 , 1)</b>. Den grå linja er <span className="nw">y = x</span>,
      altså <span className="nw">b = 1</span>.
    </p>
    <div className="grid3">
      {GRUPPER.slice(0, frag + 1).map((g, i) => (
        <div className="panel stack reveal" key={i} style={{ gap: 10 }}>
          <h3 className="math" style={{ fontSize: '1.3em' }}>
            {g.tittel}
          </h3>
          <FunkGraf
            kurver={[
              { f: (x: number) => x, farge: 'muted' },
              ...g.eksponenter.map((e, j) => ({ f: pot(1, verdi(e)), fra: 0.001, farge: FARGER[j] })),
            ]}
            punkter={[{ x: 1, y: 1, farge: 'pen' }]}
            xmin={-0.3}
            xmax={3}
            ymin={-0.3}
            ymax={3}
            xetikett={1}
            yetikett={1}
            h={300}
            title={`Potensfunksjoner med eksponent ${g.eksponenter.map(eksponent).join(', ')}`}
          />
          <p className="math" style={{ fontSize: '1.05em' }}>
            {g.eksponenter.map((e, j) => (
              <span key={j} className={FARGER[j] === 'ink' ? undefined : FARGER[j]}>
                {j > 0 && ' · '}
                <Pot b={e} />
              </span>
            ))}
          </p>
          <p>{g.tekst}</p>
        </div>
      ))}
    </div>
    <StepButtons frag={frag} setFrag={setFrag} steps={EKSPONENT_STEG} />
  </div>
);
