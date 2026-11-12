import React from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, X } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Datatabell } from '../felles';

const f = (x: number) => x ** 3 / 3 + x ** 2 / 2 + x / 6;

const TABELL: [number, string, number][] = [
  [2, '1 + 4', 5],
  [3, '1 + 4 + 9', 14],
  [4, '1 + 4 + 9 + 16', 30],
  [5, '1 + 4 + 9 + 16 + 25', 55],
];

const FASER = ['Forstå problemet', 'Lage en plan', 'Gjennomføre planen', 'Se tilbake'];

export const EKS27_STEG = 4;

/** Pyramide sett fra siden: lag k har k kuler */
const Pyramide: React.FC<{ lag: number }> = ({ lag }) => {
  const r = 12;
  const W = lag * 2 * r + 4;
  const H = lag * 1.75 * r + r + 4;
  const kuler = [];
  for (let k = 1; k <= lag; k++)
    for (let i = 0; i < k; i++)
      kuler.push(<circle key={`${k}-${i}`} cx={W / 2 + (i - (k - 1) / 2) * 2 * r} cy={(k - 1) * 1.75 * r + r + 2} r={r - 1} style={{ fill: 'var(--r2)' }} />);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={`Pyramide med ${lag} lag sett fra siden`} style={{ maxWidth: '100%', height: 'auto' }}>
      {kuler}
    </svg>
  );
};

export const Eksempel27: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel 27 · Problemløsning med regresjon</div>
    <h2>Hvor mange trøfler trenger Frida?</h2>
    <p>
      Konditor Frida stabler sjokoladetrøfler i en pyramide: én på toppen, 2 · 2 = 4 i laget under, 3 · 3 = 9 i neste, og så
      videre. Hvor mange trøfler trenger hun til en pyramide med <b>20 lag</b>?
    </p>
    <div className="row" role="list" aria-label="Problemløsning" style={{ gap: 8 }}>
      {FASER.map((t, i) => (
        <span key={t} role="listitem" className={'pill' + (frag === i + 1 ? ' pen' : frag > i ? '' : ' muted')}>
          {i + 1} {t}
        </span>
      ))}
    </div>
    <div className="cols">
      <div className="stack">
        {frag === 1 && (
          <div className="panel reveal">
            Vi kunne lagt sammen 1 + 4 + 9 + … + 400, men det tar lang tid. Finnes det en sammenheng?
          </div>
        )}
        {frag === 2 && (
          <div className="panel reveal">
            Vi teller kulene i noen mindre pyramider og ser om tallene har en sammenheng. Så bruker vi regresjon.
          </div>
        )}
        {frag >= 3 && (
          <div className="reveal">
            <Datatabell x="Lag" y="Kuler" xs={TABELL.map(([l]) => l)} ys={TABELL.map(([, u, k]) => <span title={u}>{k}</span>)} />
          </div>
        )}
        {frag >= 3 && (
          <div className="panel reveal">
            Tredjegradsregresjon passer perfekt: <span className="math nw">y = 0,3333<X /><sup>3</sup> + 0,5<X /><sup>2</sup> + 0,1667<X /></span>
            <span className="mline math">
              <Fx />
              <Op>=</Op>
              <Frac n="1" d="3" />
              <X />
              <sup>3</sup> + <Frac n="1" d="2" />
              <X />
              <sup>2</sup> + <Frac n="1" d="6" />
              <X /> &nbsp;⇒&nbsp; <Fx x="20" /> = <b className="pen">2870</b>
            </span>
          </div>
        )}
        {frag >= 4 && (
          <div className="panel reveal">
            <b>Se tilbake</b> &nbsp;Seks lag: 55 + 6 · 6 = 91. Modellen gir{' '}
            <span className="math nw">
              <Fx x="6" /> = 91
            </span>
            . Det stemmer!
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={EKS27_STEG} />
      </div>
      <div className="stack">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Pyramide lag={frag >= 3 ? 5 : 3} />
        </div>
        {frag >= 3 && (
          <FunkGraf
            kurver={[{ f, fra: 0, til: 7, farge: 'c1' }]}
            punkter={TABELL.map(([l, , k]) => ({ x: l, y: k, farge: 'ink' })).concat(
              frag >= 4 ? [{ x: 6, y: 91, farge: 'pen' }] : [],
            )}
            xmin={-0.3}
            xmax={7}
            ymin={-5}
            ymax={110}
            ysteg={10}
            yetikett={20}
            xetikett={1}
            h={240}
            xnavn="lag"
            ynavn="kuler"
            title="Antall trøfler i pyramider med tredjegradsmodell"
          />
        )}
        <p className="hintline">Oppgaver: 3.70–3.71</p>
      </div>
    </div>
  </div>
);
