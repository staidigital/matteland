import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { StepButtons } from '../../../../presentasjon/ui';
import { Datatabell, TV_X, TV_Y } from '../felles';

const AR = [2015, 2016, 2017, 2018, 2019, 2021, 2023, 2024];

export const SPREDNING_STEG = 2;

export const Spredning: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Lineær regresjon</div>
    <h2>Fra tabell til spredningsdiagram</h2>
    <Datatabell x="Årstall" y="Seertid (min/dag)" xs={AR} ys={TV_Y} />
    <div className="cols">
      <div className="stack">
        {frag >= 1 && (
          <div className="panel reveal">
            <b>x</b> = antall år etter 2015, &nbsp;<b>y</b> = seertid i minutter per dag. Vi får punktene
            <p className="math small">
              {TV_X.map((x, i) => `(${x} , ${TV_Y[i]})`).join(', ')}
            </p>
          </div>
        )}
        <div className="boxed">
          <span className="label">Spredningsdiagram</span>
          <p>Sammenhørende verdier fra et datamateriale, avmerket som punkter i et koordinatsystem.</p>
        </div>
        {frag >= 2 && (
          <p className="reveal">
            Diagrammet viser at seertiden <b>synker</b> fra år til år, nesten som en rett linje.{' '}
            <b>Regresjon</b> handler om å beskrive denne sammenhengen med en funksjon.
          </p>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={SPREDNING_STEG} />
      </div>
      <FunkGraf
        punkter={frag >= 1 ? TV_X.map((x, i) => ({ x, y: TV_Y[i], farge: 'pen' })) : []}
        xmin={-0.8}
        xmax={10}
        ymin={0}
        ymax={130}
        ysteg={10}
        yetikett={20}
        xetikett={1}
        h={340}
        xnavn="år etter 2015"
        ynavn="min/dag"
        title="Spredningsdiagram for seertid etter 2015"
      />
    </div>
  </div>
);
