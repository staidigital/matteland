import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { tusen } from '../../skjaeringspunkter/felles';
import { Datatabell, SOL_X, SOL_Y, Uttrykk, tilpass } from '../felles';

const lin = tilpass('lin', SOL_X, SOL_Y)!;
const eks = tilpass('eksp', SOL_X, SOL_Y)!;

export const EKS25_STEG = 5;

export const Eksempel25: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel 25 · Eksponentiell modell</div>
    <h2>Solcelleboomen</h2>
    <Datatabell
      x="År"
      y="Nye installasjoner (GW)"
      xs={[2020, 2021, 2022, 2023, 2024]}
      ys={SOL_Y.map((v) => String(v).replace('.', ','))}
    />
    <div className="cols">
      <div className="stack">
        {frag >= 1 && (
          <div className="panel reveal">
            <b>a</b> &nbsp;x = år etter 2020. Økningen blir stadig større, så en eksponentiell modell passer:
            <span className="mline math pen">
              <Fx />
              <Op>=</Op>
              <Uttrykk t={eks} d={2} />
            </span>
          </div>
        )}
        {frag >= 3 && (
          <div className="panel reveal">
            <b>c</b> &nbsp;Vekstfaktoren er 1,42. Den årlige installasjonen har økt med omtrent <b>42 %</b> per år.
          </div>
        )}
        {frag >= 4 && (
          <div className="panel reveal">
            <b>d</b> &nbsp;2029 er ni år etter 2020:{' '}
            <span className="math nw">
              <Fx x="9" /> ≈ {tusen(eks.f(9))}
            </span>{' '}
            GW.
          </div>
        )}
        {frag >= 5 && (
          <div className="panel reveal">
            <b>e</b> &nbsp;Fortsetter utviklingen? Det avhenger av teknologi og priser. Jo lenger fram i tid, jo mer usikker er
            modellen.
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={EKS25_STEG} />
      </div>
      <div className="stack">
        <FunkGraf
          kurver={[
            ...(frag === 1 ? [{ f: lin.f, fra: -0.5, til: 11, farge: 'muted' }] : []),
            ...(frag >= 1 ? [{ f: eks.f, fra: -0.5, til: frag >= 2 ? 11 : 4.5, farge: 'c1' }] : []),
          ]}
          punkter={[
            ...SOL_X.map((x, i) => ({ x, y: SOL_Y[i], farge: 'ink' })),
            ...(frag >= 4 ? [{ x: 9, y: eks.f(9), farge: 'pen', navn: '(9 , 2531)', plass: 'venstre' as const }] : []),
          ]}
          xmin={-0.6}
          xmax={11}
          ymin={0}
          ymax={frag >= 2 ? 3000 : 600}
          ysteg={frag >= 2 ? 250 : 50}
          yetikett={frag >= 2 ? 500 : 100}
          xetikett={1}
          h={330}
          xnavn="år etter 2020"
          ynavn="GW"
          title="Nye solcelleinstallasjoner med eksponentiell modell"
        />
        {frag === 1 && (
          <p className="small muted reveal">
            Grå: lineær modell <span className="math nw">y = <Uttrykk t={lin} d={1} /></span> passer dårligere.
          </p>
        )}
        {frag >= 2 && (
          <p className="small reveal">
            <b>b</b> &nbsp;Grafen til <i className="v">f</i> for <X /> fra 0 til 11.
          </p>
        )}
        <p className="hintline">Oppgaver: 3.64–3.67</p>
      </div>
    </div>
  </div>
);
