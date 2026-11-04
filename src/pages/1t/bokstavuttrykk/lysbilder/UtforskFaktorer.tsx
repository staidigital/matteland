import React, { useState } from 'react';
import { X, gcd } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { primfaktorer } from '../oppgaver';

/** Primtallsfaktorene til begge tallene, der felles faktorer er merket */
function merk(a: number[], b: number[]) {
  const rest = [...b];
  return a.map((p) => {
    const i = rest.indexOf(p);
    if (i < 0) return { p, felles: false };
    rest.splice(i, 1);
    return { p, felles: true };
  });
}

const Produkt: React.FC<{ n: number; f: { p: number; felles: boolean }[] }> = ({ n, f }) => (
  <span className="mline">
    {n} ={' '}
    {f.map(({ p, felles }, i) => (
      <React.Fragment key={i}>
        {i > 0 && ' · '}
        <span className={felles ? 'pen' : undefined} style={felles ? { fontWeight: 700 } : undefined}>{p}</span>
      </React.Fragment>
    ))}
  </span>
);

export const UtforskFaktorer: React.FC = () => {
  const [a, setA] = useState(12);
  const [b, setB] = useState(18);
  const fa = primfaktorer(a);
  const fb = primfaktorer(b);
  const g = gcd(a, b);
  const fg = merk(fa, fb).filter((k) => k.felles).map((k) => k.p);
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Felles faktorer</div>
      <h2>Hva har to tall felles?</h2>
      <div className="cols">
        <div className="stack">
          <Slider id="f-a" label="tall 1" value={a} min={2} max={120} step={1} onChange={setA} />
          <Slider id="f-b" label="tall 2" value={b} min={2} max={120} step={1} onChange={setB} />
          <div className="boxed math">
            <Produkt n={a} f={merk(fa, fb)} />
            <Produkt n={b} f={merk(fb, fa)} />
          </div>
          <p>
            {g === 1 ? (
              <>Tallene har ingen felles primtallsfaktorer. Den største felles faktoren er <b>1</b>.</>
            ) : (
              <>
                Felles faktorer: <span className="pen">{fg.join(' · ')}</span>. Den største felles faktoren er <b className="pen">{g}</b>.
              </>
            )}
          </p>
        </div>
        <div className="stack">
          <h3>Dette trenger vi for å trekke ut felles faktor</h3>
          <div className="panel math">
            {a}<X /> + {b}
            {g > 1 && <> = <span className="pen">{g}</span>({a / g === 1 ? '' : a / g}<X /> + {b / g})</>}
          </div>
          <p>
            {g > 1
              ? `Begge leddene kan deles med ${g}, så vi kan trekke ${g} utenfor parentesen.`
              : 'Leddene har ingen felles tallfaktor, så uttrykket kan ikke faktoriseres på denne måten.'}
          </p>
          <p className="small muted">Prøv 24 og 36, 30 og 42, og 35 og 12.</p>
        </div>
      </div>
    </div>
  );
};
