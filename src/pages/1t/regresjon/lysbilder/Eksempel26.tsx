import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, V } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider, StepButtons } from '../../../../presentasjon/ui';
import { Prikker } from '../../figurtall/felles';
import { Datatabell } from '../felles';

const T = (n: number) => (n * n + n) / 2;

/** Trekant med n prikker nederst, venstrejustert */
const trekant = (n: number) => {
  const p: { x: number; y: number }[] = [];
  for (let r = 0; r < n; r++) for (let k = 0; k < n - r; k++) p.push({ x: k + r / 2, y: r });
  return p;
};

const Tn: React.FC<{ n: React.ReactNode }> = ({ n }) => (
  <span className="nw">
    <V c="T" />({n})
  </span>
);

export const EKS26_STEG = 3;

export const Eksempel26: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [n, setN] = useState(4);

  return (
    <div className="slide">
      <div className="kicker">Eksempel 26 · Figurtall</div>
      <h2>Trekanttall nummer 100</h2>
      <div className="cols">
        <div className="stack">
          <p>
            Trekanttall nummer <V c="n" /> er summen 1 + 2 + … + <V c="n" />. Å summere helt til 100 er tungvint. Finnes det en
            enklere sammenheng?
          </p>
          <Datatabell x={<>Nummer, <V c="n" /></>} y="Trekanttall" xs={[1, 2, 3, 4]} ys={[1, 3, 6, 10]} />
          {frag >= 1 && (
            <div className="panel reveal">
              <b>a</b> &nbsp;Regresjon: lineær og eksponentiell passer dårlig. Andregrad passer <b>perfekt</b>:
              <span className="mline math">
                y = 0,5<i className="v">x</i>
                <sup>2</sup> + 0,5<i className="v">x</i>
              </span>
            </div>
          )}
          {frag >= 2 && (
            <div className="panel reveal math">
              <Tn n={<V c="n" />} />
              <Op>=</Op>
              <Frac
                n={
                  <>
                    <V c="n" />
                    <sup>2</sup> + <V c="n" />
                  </>
                }
                d="2"
              />
            </div>
          )}
          {frag >= 3 && (
            <div className="panel reveal math">
              <b style={{ fontFamily: 'var(--f-body)' }}>b</b> &nbsp;
              <Tn n="100" /> = <Frac n={<>100<sup>2</sup> + 100</>} d="2" /> = <b className="pen">5050</b>
            </div>
          )}
          <StepButtons frag={frag} setFrag={setFrag} steps={EKS26_STEG} />
        </div>
        <div className="stack">
          <Slider id="e26-n" label={<V c="n" />} value={n} min={1} max={10} step={1} onChange={setN} />
          <div className="row" style={{ alignItems: 'flex-end', gap: 18 }}>
            <Prikker p={trekant(n)} rute={n > 7 ? 16 : 22} merkelapp={`Trekanttall nummer ${n}`} />
            <span className="math big">
              <Tn n={n} /> = <b className="pen">{T(n)}</b>
            </span>
          </div>
          <FunkGraf
            kurver={frag >= 1 ? [{ f: T, fra: 0, til: 11, farge: 'c1' }] : []}
            punkter={[1, 2, 3, 4].map((k) => ({ x: k, y: T(k), farge: 'ink' }))}
            xmin={-0.3}
            xmax={6}
            ymin={-1}
            ymax={22}
            ysteg={2}
            yetikett={4}
            xetikett={1}
            h={260}
            xnavn="n"
            ynavn="T"
            title="De fire første trekanttallene med andregradsmodell"
          />
          <p className="hintline">Oppgaver: 3.68–3.69</p>
        </div>
      </div>
    </div>
  );
};
