import React from 'react';
import { X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TILFELLER: { t: string; m: React.ReactNode; s: React.ReactNode }[] = [
  {
    t: 'Én løsning',
    m: <><span className="mline">2<X /> + 1 = 7</span><span className="mline">2<X /> = 6</span><span className="mline pen"><X /> = 3</span></>,
    s: 'Bare ett tall gjør at likningen stemmer. Det vanlige tilfellet.',
  },
  {
    t: 'Ingen løsning',
    m: <><span className="mline">2<X /> + 3 = 2<X /> + 5</span><span className="mline">2<X /> − 2<X /> = 5 − 3</span><span className="mline pen">0 = 2</span></>,
    s: 'x forsvinner, og det som er igjen, er usant. Ingen tall gjør likningen sann.',
  },
  {
    t: 'Alle tall er løsninger',
    m: <><span className="mline">2(<X /> + 1) = 2<X /> + 2</span><span className="mline">2<X /> − 2<X /> = 2 − 2</span><span className="mline pen">0 = 0</span></>,
    s: 'x forsvinner, og det som er igjen, er sant. De to sidene er samme uttrykk.',
  },
];

export const LOSNINGER_STEG = TILFELLER.length;

export const Losninger: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Antall løsninger</div>
    <h2>Hva skjer når x forsvinner?</h2>
    <div className="grid3">
      {TILFELLER.map(
        (k, i) =>
          frag > i && (
            <div className="panel stack reveal" key={i} style={{ gap: 10 }}>
              <h3>{k.t}</h3>
              <div className="math">{k.m}</div>
              <p className="small muted">{k.s}</p>
            </div>
          ),
      )}
    </div>
    <StepButtons frag={frag} setFrag={setFrag} steps={LOSNINGER_STEG} />
  </div>
);
