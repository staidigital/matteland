import React from 'react';
import { Frac, Rot } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const RADER: [React.ReactNode, React.ReactNode][] = [
  [<>−<Frac n="8" d="2" /></>, <>−4, altså <b className="pen">helt tall</b>. Forkort før du bestemmer deg.</>],
  [<>1,75</>, <><Frac n="7" d="4" />, altså <b className="pen">rasjonalt</b>.</>],
  [<><Rot>25</Rot></>, <>5, altså <b className="pen">naturlig</b>.</>],
  [<><Rot>5</Rot></>, <>5 er ikke et kvadrattall, altså <b className="pen">irrasjonalt</b>.</>],
  [<>2π</>, <>et rasjonalt tall (ikke 0) ganger et irrasjonalt tall er <b className="pen">irrasjonalt</b>.</>],
  [<><Rot>2</Rot> · <Rot>8</Rot></>, <><Rot>16</Rot> = 4, altså <b className="pen">naturlig</b>. To irrasjonale tall kan gi et rasjonalt produkt.</>],
];

export const EKSEMPEL_STEG = RADER.length;

export const Eksempel: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel</div>
    <h2>Hvilken tallmengde er den minste?</h2>
    <p className="muted">Regn ut eller forenkle først. Det er verdien som teller, ikke hvordan tallet ser ut.</p>
    <div className="grid3">
      {RADER.map(([tall, svar], i) => (
        <div className="panel stack" key={i} style={{ gap: 8 }}>
          <span className="math big">{tall}</span>
          {frag > i ? (
            <span className="reveal">{svar}</span>
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
