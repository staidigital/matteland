import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const FEIL: { t: string; feil: React.ReactNode; rett: React.ReactNode; hvorfor: React.ReactNode }[] = [
  {
    t: 'Flytter uten å skifte fortegn',
    feil: <>2<X /> + 3 = 9 &nbsp;⇒&nbsp; 2<X /> = 9 + 3</>,
    rett: <>2<X /> + 3 = 9 &nbsp;⇒&nbsp; 2<X /> = 9 − 3 = 6</>,
    hvorfor: 'Vi trekker fra 3 på begge sider, så tallet skifter fortegn når det flyttes over.',
  },
  {
    t: 'Trekker fra i stedet for å dele',
    feil: <>3<X /> = 12 &nbsp;⇒&nbsp; <X /> = 12 − 3 = 9</>,
    rett: <>3<X /> = 12 &nbsp;⇒&nbsp; <X /> = <Frac n="12" d="3" /> = 4</>,
    hvorfor: <>3<X /> betyr 3 · <X />, så vi må dele for å få <X /> alene. Prøve: 3 · 9 = 27, ikke 12.</>,
  },
  {
    t: 'Glemmer fortegnet i parentesen',
    feil: <>7 − (<X /> − 2) = 4 &nbsp;⇒&nbsp; 7 − <X /> − 2 = 4</>,
    rett: <>7 − (<X /> − 2) = 4 &nbsp;⇒&nbsp; 7 − <X /> + 2 = 4 &nbsp;⇒&nbsp; <X /> = 5</>,
    hvorfor: 'Minus foran parentesen gjelder alle leddene inni, så −2 blir til +2.',
  },
  {
    t: 'Ganger ikke alle leddene',
    feil: <><Frac n={<X />} d="2" /> + 1 = 4 &nbsp;⇒&nbsp; <X /> + 1 = 8</>,
    rett: <><Frac n={<X />} d="2" /> + 1 = 4 &nbsp;⇒&nbsp; <X /> + 2 = 8 &nbsp;⇒&nbsp; <X /> = 6</>,
    hvorfor: 'Også leddet uten brøk må ganges med 2.',
  },
];

export const FEIL_STEG = FEIL.length;

export const VanligeFeil: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Pass på</div>
    <h2>Vanlige feil</h2>
    <div className="grid2">
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
