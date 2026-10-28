import React from 'react';
import { FunkGraf, type Punkt } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';

const f = (x: number) => (9 / 5) * x + 32;
const NI_FEMTEDELER = <Frac n="9" d="5" />;

export const TEMPERATUR_STEG = 2;

export const Temperatur: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const punkter: Punkt[] = [];
  if (frag >= 1) punkter.push({ x: 0, y: 32, farge: 'c2', navn: '(0 , 32)', plass: 'hoyre' });
  if (frag >= 2) punkter.push({ x: -160 / 9, y: 0, farge: 'c1', navn: '(−17,8 , 0)', plass: 'venstre' });

  return (
    <div className="slide">
      <div className="kicker">Eksempel · Nullpunkt</div>
      <h2>Fra celsius til fahrenheit</h2>
      <div className="boxed">
        <span className="label">Nullpunkt</span>
        Nullpunktet er <X />
        -verdien til skjæringspunktet med <X />
        -aksen, altså løsningen av likningen{' '}
        <span className="math">
          <Fx /> = 0
        </span>
        .
      </div>
      <div className="cols">
        <div className="stack">
          <p>
            <span className="math">
              <Fx />
              <Op>=</Op>
              {NI_FEMTEDELER}
              <X /> + 32
            </span>{' '}
            gjør om <X /> grader celsius til grader fahrenheit.
          </p>
          {frag >= 1 && (
            <div className="panel stack reveal" style={{ gap: 6 }}>
              <h3 className="c2">a &nbsp;Skjæring med y-aksen</h3>
              <p className="math">
                <Fx x="0" /> = {NI_FEMTEDELER} · 0 + 32 = <span className="c2">32</span>
              </p>
              <p className="small">0 °C svarer til 32 °F.</p>
            </div>
          )}
          {frag >= 2 && (
            <div className="panel stack reveal" style={{ gap: 6 }}>
              <h3 className="c1">b &nbsp;Nullpunkt</h3>
              <p className="math">
                <span className="mline">
                  {NI_FEMTEDELER}
                  <X /> + 32 = 0
                </span>
                <span className="mline">
                  {NI_FEMTEDELER}
                  <X /> = −32
                </span>
                <span className="mline">
                  <X /> = <Frac n="−32 · 5" d="9" /> = <Frac n="−160" d="9" /> ≈ <span className="c1">−17,8</span>
                </span>
              </p>
              <p className="small">−18 °C svarer omtrent til 0 °F.</p>
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={TEMPERATUR_STEG} />
        </div>
        <FunkGraf
          kurver={[{ f }]}
          punkter={punkter}
          xmin={-40}
          xmax={40}
          ymin={-40}
          ymax={120}
          xsteg={5}
          ysteg={10}
          xetikett={10}
          yetikett={40}
          h={400}
          xnavn="°C"
          ynavn="°F"
          title="Grafen til f(x) = 9/5 x + 32"
        />
      </div>
    </div>
  );
};
