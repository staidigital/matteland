import React from 'react';
import { X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const FEIL: { t: string; feil: React.ReactNode; rett: React.ReactNode; hvorfor: React.ReactNode }[] = [
  {
    t: 'Ganger bare første ledd',
    feil: <>3(<X /> + 2) = 3<X /> + 2</>,
    rett: <>3(<X /> + 2) = 3<X /> + 6</>,
    hvorfor: <>Test med <X /> = 1: venstre side blir 9, ikke 5.</>,
  },
  {
    t: 'Minus foran parentes',
    feil: <>4 − (<X /> − 2) = 4 − <X /> − 2</>,
    rett: <>4 − (<X /> − 2) = 4 − <X /> + 2 = 6 − <X /></>,
    hvorfor: 'Alle leddene i parentesen skifter fortegn.',
  },
  {
    t: 'Blander pluss og gange',
    feil: <>2<X /> + 3<X /> = 5<X /><sup>2</sup></>,
    rett: <>2<X /> + 3<X /> = 5<X /> &nbsp;og&nbsp; 2<X /> · 3<X /> = 6<X /><sup>2</sup></>,
    hvorfor: 'Når vi legger sammen, endres ikke eksponenten.',
  },
];

export const FEIL_STEG = FEIL.length;

export const VanligeFeil: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Pass på</div>
    <h2>Vanlige feil</h2>
    <div className="traps">
      {FEIL.map((k, i) => (
        <div className="panel stack" key={i} style={{ gap: 10 }}>
          <h3>{k.t}</h3>
          <div className="math wrong">
            <span className="tag">Feil</span>
            {k.feil}
          </div>
          {frag > i ? (
            <>
              <div className="math right reveal">
                <span className="tag">Riktig</span>
                {k.rett}
              </div>
              <p className="small muted reveal">{k.hvorfor}</p>
            </>
          ) : (
            <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
              Vis riktig
            </button>
          )}
        </div>
      ))}
    </div>
  </div>
);
