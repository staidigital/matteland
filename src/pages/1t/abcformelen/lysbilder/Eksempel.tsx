import React from 'react';
import { Graf } from '../../../../presentasjon/Graf';
import { Frac, Poly, Rot, V, X, X1, X2 } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <><V c="a" /> = 2, &nbsp; <V c="b" /> = −3, &nbsp; <V c="c" /> = −2</>, t: 'Likningen står på standardform. Les av koeffisientene med fortegn.' },
  { m: <><X /> = <Frac n={<>−(−3) ± <Rot>(−3)<sup>2</sup> − 4 · 2 · (−2)</Rot></>} d="2 · 2" /></>, t: 'Sett inn, med parentes rundt negative tall.' },
  { m: <><X /> = <Frac n={<>3 ± <Rot>9 + 16</Rot></>} d="4" /> = <Frac n={<>3 ± <Rot>25</Rot></>} d="4" /> = <Frac n="3 ± 5" d="4" /></>, t: 'Regn ut under rottegnet først.' },
  { m: <><span className="c1"><X1 /> = <Frac n="8" d="4" /> = 2</span> &nbsp; eller &nbsp; <span className="c2"><X2 /> = <Frac n="−2" d="4" /> = −<Frac n="1" d="2" /></span></>, t: 'Pluss gir den ene løsningen, og minus gir den andre.' },
];

export const EKSEMPEL_STEG = TRINN.length;

export const Eksempel: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel</div>
    <h2>Løs <span className="math"><Poly a={2} b={-3} c={-2} /> = 0</span></h2>
    <div className="cols wide-left">
      <div className="stack">
        <Utregning trinn={TRINN} frag={frag} />
        <StepButtons frag={frag} setFrag={setFrag} steps={EKSEMPEL_STEG} />
      </div>
      <Graf
        a={2}
        b={-3}
        c={-2}
        ymin={-5}
        ymax={8}
        h={320}
        roots={frag >= 4 ? [{ x: 2, cls: 'c1', name: 'x₁' }, { x: -0.5, cls: 'c2', name: 'x₂' }] : []}
        title="Grafen til 2x² − 3x − 2"
      />
    </div>
  </div>
);
