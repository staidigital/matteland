import React from 'react';
import { Factored, Num, Poly, V, X, X2 } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';

type Feil = { t: string; oppsett: React.ReactNode; feil: React.ReactNode; riktig: React.ReactNode; hvorfor: React.ReactNode };

const FEIL: Feil[] = [
  {
    t: 'Fortegnet snur',
    oppsett: (
      <>
        Nullpunkt: <X2 /> = <span className="c2">−2</span>
      </>
    ),
    feil: (
      <>
        (<X /> − 2)
      </>
    ),
    riktig: (
      <>
        (<X /> − (−2)) = (<X /> + 2)
      </>
    ),
    hvorfor: 'Formelen har minus foran nullpunktet. Et negativt nullpunkt gir derfor pluss i faktoren.',
  },
  {
    t: 'a forsvinner',
    oppsett: (
      <>
        <Poly a={2} b={-2} c={-12} />, nullpunkter 3 og −2
      </>
    ),
    feil: <Factored a={1} r1={3} r2={-2} c1="" c2="" />,
    riktig: <Factored a={2} r1={3} r2={-2} c1="" c2="" />,
    hvorfor: (
      <>
        Uten 2 foran får vi{' '}
        <span className="math">
          <Poly a={1} b={-1} c={-6} />
        </span>{' '}
        når vi ganger ut. Det er bare halvparten av uttrykket.
      </>
    ),
  },
  {
    t: 'Brøk som nullpunkt',
    oppsett: (
      <>
        <Poly a={2} b={1} c={-3} />, nullpunkter 1 og <Num v={-1.5} />
      </>
    ),
    feil: <Factored a={1} r1={1} r2={-1.5} c1="" c2="" />,
    riktig: (
      <>
        <Factored a={2} r1={1} r2={-1.5} c1="" c2="" />{' '}
        <span className="nw">
          = (<X /> − 1)(2
          <X /> + 3)
        </span>
      </>
    ),
    hvorfor: (
      <>
        Husk <V c="a" /> = 2. Gang gjerne 2 inn i brøkfaktoren, så blir svaret penere.
      </>
    ),
  },
];

export const FEIL_STEG = FEIL.length;

export const VanligeFeil: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Pass på</div>
    <h2>Tre vanlige feil</h2>
    <div className="traps">
      {FEIL.map((k, i) => (
        <div className="panel stack" key={i} style={{ gap: 10 }}>
          <h3>{k.t}</h3>
          <div className="math" style={{ fontSize: '1.1em' }}>
            {k.oppsett}
          </div>
          <div className="math wrong">
            <span className="tag">Feil</span>
            {k.feil}
          </div>
          {frag > i ? (
            <>
              <div className="math right reveal">
                <span className="tag">Riktig</span>
                <span style={{ color: 'var(--ink)' }}>{k.riktig}</span>
              </div>
              <p className="small reveal">{k.hvorfor}</p>
            </>
          ) : (
            <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
              Vis riktig
            </button>
          )}
        </div>
      ))}
    </div>
    <p className="hintline">Diskuter med sidemannen før du viser svaret.</p>
  </div>
);
