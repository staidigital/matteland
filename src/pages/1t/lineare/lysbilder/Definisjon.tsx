import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { V, X } from '../../../../presentasjon/matte';
import type { LysbildeProps } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';

const TILFELLER = [
  { navn: 'a > 0', f: (x: number) => 0.5 * x + 1, tekst: 'stiger mot høyre' },
  { navn: 'a < 0', f: (x: number) => -0.6 * x + 2, tekst: 'synker mot høyre' },
  { navn: 'a = 0', f: () => 2, tekst: 'parallell med x-aksen' },
];

const REFLEKTER: { sporsmal: React.ReactNode; svar: React.ReactNode }[] = [
  {
    sporsmal: (
      <>
        Konstantledd og stigningstall for <Fx /> = <X />?
      </>
    ),
    svar: (
      <>
        <Fx /> = 1 · <X /> + 0, så <V c="a" /> = 1 og <V c="b" /> = 0.
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Hvordan ser linja <V c="y" /> = 2 ut?
      </>
    ),
    svar: <>Vannrett, parallell med x-aksen, gjennom (0 , 2).</>,
  },
  {
    sporsmal: <>Likningen for en linje som ligger på x-aksen?</>,
    svar: (
      <>
        <V c="y" /> = 0
      </>
    ),
  },
  {
    sporsmal: (
      <>
        Hvordan ser linja 2<X /> + <V c="y" /> = 3 ut?
      </>
    ),
    svar: (
      <>
        <V c="y" /> = −2<X /> + 3: synker, skjærer y-aksen i 3.
      </>
    ),
  },
];

export const DEFINISJON_STEG = REFLEKTER.length;

export const Definisjon: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Lineær funksjon</div>
    <h2>Stigningstall og konstantledd</h2>
    <div className="boxed">
      <span className="label">Lineær funksjon</span>
      En lineær funksjon har funksjonsuttrykket{' '}
      <span className="math nw">
        <Fx /> = <i className="v c2">a</i>
        <X /> + <i className="v pen">b</i>
      </span>
      . Grafen er en rett linje med <b className="c2">stigningstallet a</b> og <b className="pen">konstantleddet b</b>.
      <p className="small muted" style={{ marginTop: 6 }}>
        Vi skriver også <span className="math nw"><V c="y" /> = <V c="a" /><V c="x" /> + <V c="b" /></span>, og kaller det likningen for en rett linje.
      </p>
    </div>
    <div className="traps">
      {TILFELLER.map((t) => (
        <div className="stack" key={t.navn} style={{ gap: 6 }}>
          <FunkGraf
            kurver={[{ f: t.f }]}
            xmin={-3}
            xmax={5}
            ymin={-1.5}
            ymax={4}
            h={170}
            xetikett={10}
            yetikett={10}
            title={`Linje med ${t.navn}`}
          />
          <p className="small">
            <b className="math">{t.navn}</b>: {t.tekst}
          </p>
        </div>
      ))}
    </div>
    <div className="panel stack" style={{ gap: 8 }}>
      <h3>Reflekter og diskuter</h3>
      <div className="grid2">
        {REFLEKTER.map((r, i) => (
          <div key={i} className="stack" style={{ gap: 4 }}>
            <p className="small">{r.sporsmal}</p>
            {frag > i ? (
              <p className="pen reveal">{r.svar}</p>
            ) : (
              <button className="btn" style={{ alignSelf: 'start' }} onClick={() => setFrag(i + 1)}>
                Vis svar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);
