import React from 'react';
import { Frac, V, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;
const M = () => <V c="m" />;
const N = () => <V c="n" />;

const RADER: { navn: string; regel: React.ReactNode; eks: React.ReactNode }[] = [
  { navn: 'Gange', regel: <><A /><sup><M /></sup> · <A /><sup><N /></sup> = <A /><sup><M /> + <N /></sup></>, eks: <>2<sup>3</sup> · 2<sup>4</sup> = 2<sup>7</sup> = 128</> },
  { navn: 'Dele', regel: <><Frac n={<><A /><sup><M /></sup></>} d={<><A /><sup><N /></sup></>} /> = <A /><sup><M /> − <N /></sup></>, eks: <><Frac n={<><X /><sup>5</sup></>} d={<><X /><sup>2</sup></>} /> = <X /><sup>3</sup></> },
  { navn: 'Potens av potens', regel: <>(<A /><sup><M /></sup>)<sup><N /></sup> = <A /><sup><M /> · <N /></sup></>, eks: <>(<A /><sup>2</sup>)<sup>4</sup> = <A /><sup>8</sup></> },
  { navn: 'Potens av produkt', regel: <>(<A /><B />)<sup><N /></sup> = <A /><sup><N /></sup><B /><sup><N /></sup></>, eks: <>(2<X />)<sup>3</sup> = 8<X /><sup>3</sup></> },
  { navn: 'Potens av brøk', regel: <>(<Frac n={<A />} d={<B />} />)<sup><N /></sup> = <Frac n={<><A /><sup><N /></sup></>} d={<><B /><sup><N /></sup></>} /></>, eks: <>(<Frac n="3" d={<X />} />)<sup>2</sup> = <Frac n="9" d={<><X /><sup>2</sup></>} /></> },
];

export const REGLER_STEG = RADER.length;

export const Regler: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Potensreglene</div>
    <h2>Fem regler å kunne utenat</h2>
    <div className="grid3">
      {RADER.map((r, i) => (
        <div className="panel stack" key={r.navn} style={{ gap: 8 }}>
          <h3>{r.navn}</h3>
          <span className="math">{r.regel}</span>
          {frag > i ? (
            <span className="math reveal pen">{r.eks}</span>
          ) : (
            <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
              Vis eksempel
            </button>
          )}
        </div>
      ))}
    </div>
    <p className="muted">Reglene for gange og dele krever samme grunntall. <span className="math nw">2<sup>3</sup> · 5<sup>4</sup></span> kan ikke skrives som én potens på denne måten.</p>
  </div>
);
