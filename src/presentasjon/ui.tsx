import React from 'react';
import { dec } from './matte';

/** Alle lysbilder får hvilket steg som vises (frag) og en måte å endre det på. */
export type LysbildeProps = { frag: number; setFrag: (n: number) => void };

export type Lysbilde = {
  /** Vises i kontrollinjen og som verktøytips på prikkene */
  tittel: string;
  /** Antall steg som vises ett om gangen med → før neste lysbilde. 0 = alt vises med en gang. */
  steg: number;
  /** Stikkord til læreren (tast N) */
  notat: string;
  C: React.ComponentType<LysbildeProps>;
};

export const StepButtons: React.FC<LysbildeProps & { steps: number }> = ({ frag, setFrag, steps }) => (
  <div className="row">
    <button className="btn primary" onClick={() => setFrag(Math.min(frag + 1, steps))} disabled={frag >= steps}>
      Vis neste steg
    </button>
    <button className="btn" onClick={() => setFrag(0)} disabled={frag === 0}>
      Start på nytt
    </button>
    <span className="hintline">
      Steg {frag} av {steps}
    </span>
  </div>
);

export const Slider: React.FC<{
  id: string;
  label: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}> = ({ id, label, value, min, max, step, onChange }) => (
  <div className="slider">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
    />
    <output htmlFor={id}>{dec(value)}</output>
  </div>
);
