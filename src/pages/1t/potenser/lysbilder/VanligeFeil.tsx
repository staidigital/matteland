import React from 'react';
import { Frac, Rot, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const FEIL: { t: string; feil: React.ReactNode; rett: React.ReactNode; hvorfor: React.ReactNode }[] = [
  {
    t: 'Ganger grunntallene',
    feil: <>2<sup>3</sup> · 2<sup>4</sup> = 4<sup>7</sup></>,
    rett: <>2<sup>3</sup> · 2<sup>4</sup> = 2<sup>7</sup></>,
    hvorfor: 'Grunntallet er det samme. Bare eksponentene legges sammen.',
  },
  {
    t: 'Negativ eksponent',
    feil: <>2<sup>−3</sup> = −8</>,
    rett: <>2<sup>−3</sup> = <Frac n="1" d="8" /></>,
    hvorfor: 'En negativ eksponent gir den omvendte verdien, ikke et negativt tall.',
  },
  {
    t: 'Rot av en sum',
    feil: <><Rot><X /><sup>2</sup> + 9</Rot> = <X /> + 3</>,
    rett: <><Rot><X /><sup>2</sup> + 9</Rot> kan ikke forenkles</>,
    hvorfor: <>Test med <X /> = 4: venstre side er 5, høyre side er 7.</>,
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
