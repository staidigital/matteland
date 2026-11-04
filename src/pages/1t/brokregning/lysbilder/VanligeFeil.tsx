import React from 'react';
import { Frac, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const FEIL: { t: string; feil: React.ReactNode; rett: React.ReactNode; hvorfor: React.ReactNode }[] = [
  {
    t: 'Plusser nevnerne',
    feil: <><Frac n="1" d="2" /> + <Frac n="1" d="3" /> = <Frac n="2" d="5" /></>,
    rett: <><Frac n="1" d="2" /> + <Frac n="1" d="3" /> = <Frac n="3" d="6" /> + <Frac n="2" d="6" /> = <Frac n="5" d="6" /></>,
    hvorfor: '2/5 er mindre enn 1/2, så svaret kan ikke stemme.',
  },
  {
    t: 'Stryker ledd',
    feil: <><Frac n={<><X /> + 2</>} d="2" /> = <X /></>,
    rett: <><Frac n={<><X /> + 2</>} d="2" /> = <Frac n={<X />} d="2" /> + 1</>,
    hvorfor: 'Bare faktorer kan strykes. Her er 2 et ledd i telleren.',
  },
  {
    t: 'Deler opp nevneren',
    feil: <><Frac n="1" d={<><X /> + 2</>} /> = <Frac n="1" d={<X />} /> + <Frac n="1" d="2" /></>,
    rett: <><Frac n="1" d={<><X /> + 2</>} /> kan ikke skrives enklere</>,
    hvorfor: <>Test med <X /> = 2: venstre side er 1/4, høyre side er 1.</>,
  },
  {
    t: 'Minus foran en brøk med flere ledd',
    feil: <><Frac n={<><X /> + 3</>} d="2" /> − <Frac n={<><X /> − 1</>} d="2" /> = <Frac n={<><X /> + 3 − <X /> − 1</>} d="2" /> = 1</>,
    rett: <><Frac n={<><X /> + 3</>} d="2" /> − <Frac n={<><X /> − 1</>} d="2" /> = <Frac n={<><X /> + 3 − (<X /> − 1)</>} d="2" /> = <Frac n={<><X /> + 3 − <X /> + 1</>} d="2" /> = 2</>,
    hvorfor: <>Minusen gjelder hele telleren, så sett parentes rundt den. Test med <X /> = 1: venstre side er 2 − 0 = 2, ikke 1.</>,
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
