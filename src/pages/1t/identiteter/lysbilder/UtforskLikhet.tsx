import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { dec, X, Xk } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

type Tilfelle = { navn: string; v: React.ReactNode; h: React.ReactNode; fv: (x: number) => number; fh: (x: number) => number; konklusjon: string };

const TILFELLER: Tilfelle[] = [
  { navn: 'A', v: <>2(<X /> + 3)</>, h: <>2<X /> + 6</>, fv: (x) => 2 * (x + 3), fh: (x) => 2 * x + 6, konklusjon: 'Grafene ligger oppå hverandre. Sidene er like for alle x: en identitet.' },
  { navn: 'B', v: <>2<X /> + 3</>, h: <>7</>, fv: (x) => 2 * x + 3, fh: () => 7, konklusjon: 'Sidene er like bare for x = 2: en likning med én løsning.' },
  { navn: 'C', v: <>(<X /> + 1)<sup>2</sup></>, h: <><Xk /> + 1</>, fv: (x) => (x + 1) ** 2, fh: (x) => x * x + 1, konklusjon: 'Sidene er like bare for x = 0: dette er ingen identitet, selv om det kan se slik ut.' },
  { navn: 'D', v: <><X /> + 1</>, h: <><X /> + 3</>, fv: (x) => x + 1, fh: (x) => x + 3, konklusjon: 'Parallelle linjer: sidene er aldri like. Likningen har ingen løsning.' },
];

export const UtforskLikhet: React.FC = () => {
  const [i, setI] = useState(0);
  const [x, setX] = useState(1);
  const t = TILFELLER[i];
  const v = t.fv(x);
  const h = t.fh(x);
  const like = Math.abs(v - h) < 1e-9;
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Når er to sider like?</div>
      <h2>Prøv forskjellige verdier av <X /></h2>
      <div className="cols">
        <div className="stack">
          <div className="seg" role="group" aria-label="Velg likhet">
            {TILFELLER.map((k, n) => (
              <button key={k.navn} aria-pressed={i === n} onClick={() => setI(n)}>
                {k.navn}
              </button>
            ))}
          </div>
          <div className="boxed math big">
            <span className="c1">{t.v}</span> = <span className="c2">{t.h}</span>
          </div>
          <Slider id="u-x" label={<X />} value={x} min={-4} max={4} step={0.5} onChange={setX} />
          <p className="math">
            <span className="c1">{dec(v)}</span> {like ? '=' : '≠'} <span className="c2">{dec(h)}</span> &nbsp;
            <span className={like ? 'right' : 'wrong'}>{like ? 'Sidene er like' : 'Sidene er ulike'}</span>
          </p>
          <p>{t.konklusjon}</p>
        </div>
        <FunkGraf
          kurver={[
            { f: t.fv, farge: 'c1' },
            { f: t.fh, farge: 'c2' },
          ]}
          punkter={[
            { x, y: v, farge: 'c1' },
            { x, y: h, farge: 'c2' },
          ]}
          xmin={-5}
          xmax={5}
          ymin={-6}
          ymax={16}
          h={420}
          title="Grafene til venstre og høyre side av likheten"
        />
      </div>
    </div>
  );
};
