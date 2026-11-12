import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { dec } from '../../../../presentasjon/matte';
import { lesTall } from '../../nullpunktsfaktorisering/oppgaver';
import { MODELLER, type Modell, Uttrykk, tilpass } from '../felles';

const les = (s: string) =>
  s
    .trim()
    .split(/[\s;]+/)
    .filter(Boolean)
    .map(lesTall);

/** Pene akser: et steg som gir 5–10 ruter */
const steg = (span: number) => {
  const r = span / 8;
  const p = 10 ** Math.floor(Math.log10(r));
  return [1, 2, 5, 10].map((k) => k * p).find((k) => k >= r) ?? p * 10;
};

export const Strikk: React.FC = () => {
  const [xt, setXt] = useState('2 3 4 5 7 8');
  const [yt, setYt] = useState('1,1 1,9 2,8 3,4 5,1 5,6');
  const [m, setM] = useState<Modell>('lin');
  const [xp, setXp] = useState(6);

  const xs0 = les(xt);
  const ys0 = les(yt);
  const n = Math.min(xs0.length, ys0.length);
  const ok = xs0.slice(0, n).every(isFinite) && ys0.slice(0, n).every(isFinite);
  const xs = ok ? xs0.slice(0, n) : [];
  const ys = ok ? ys0.slice(0, n) : [];
  const t = n > 0 ? tilpass(m, xs, ys) : null;

  const xmax = Math.max(10, ...xs, xp) * 1.1;
  const ymax = Math.max(1, ...ys, t ? t.f(xp) || 0 : 0) * 1.15;
  const xst = steg(xmax);
  const yst = steg(ymax);

  return (
    <div className="slide">
      <div className="kicker">Utforsk · Å skyte med gummistrikk</div>
      <h2>Lag din egen modell</h2>
      <div className="cols">
        <div className="stack">
          <div className="field">
            <label htmlFor="st-x">x: stramning (cm)</label>
            <input id="st-x" value={xt} onChange={(e) => setXt(e.target.value)} style={{ width: '100%' }} />
          </div>
          <div className="field">
            <label htmlFor="st-y">y: lengde (m)</label>
            <input id="st-y" value={yt} onChange={(e) => setYt(e.target.value)} style={{ width: '100%' }} />
          </div>
          <p className="hintline">Skill tallene med mellomrom. Bruk desimalkomma. Skriv inn klassens egne målinger.</p>
          <div className="seg" role="group" aria-label="Velg modell" style={{ alignSelf: 'start', flexWrap: 'wrap' }}>
            {MODELLER.map(([k, navn]) => (
              <button key={k} aria-pressed={m === k} onClick={() => setM(k)}>
                {navn}
              </button>
            ))}
          </div>
          {!ok || xs0.length !== ys0.length ? (
            <p className="panel">Sjekk tallene: det må være like mange x- og y-verdier.</p>
          ) : t ? (
            <div className="panel stack" style={{ gap: 6 }}>
              <span className="math">
                <i className="v">s</i>(<i className="v">x</i>) = <Uttrykk t={t} d={2} />
              </span>
              <span className="math">
                <i className="v">s</i>(
                <input
                  aria-label="x-verdi å forutsi"
                  type="number"
                  value={xp}
                  onChange={(e) => setXp(+e.target.value)}
                  style={{ width: '3.5em', font: 'inherit' }}
                />
                ) ≈ <b className="pen">{dec(t.f(xp), 2)}</b> m
              </span>
            </div>
          ) : (
            <p className="panel">For få punkter, eller verdier som ikke passer til denne modellen.</p>
          )}
        </div>
        <div className="stack">
        <FunkGraf
          kurver={t ? [{ f: t.f, fra: 0, til: xmax, farge: 'c1' }] : []}
          punkter={[
            ...xs.map((x, i) => ({ x, y: ys[i], farge: 'ink' })),
            ...(t && isFinite(t.f(xp)) ? [{ x: xp, y: t.f(xp), farge: 'pen', apen: true }] : []),
          ]}
          xmin={-xmax * 0.05}
          xmax={xmax}
          ymin={-ymax * 0.05}
          ymax={ymax}
          xsteg={xst}
          ysteg={yst}
          xetikett={xst}
          yetikett={yst}
          h={380}
          xnavn="cm"
          ynavn="m"
          title="Spredningsdiagram og modell for strikkskyting"
        />
          <ol className="small stack" style={{ gap: 2, paddingLeft: '1.2em', margin: 0 }}>
            <li>Mål strikken når den ikke er strammet.</li>
            <li>Stram den langs en linjal og skyt. Mål stramningen (cm) og hvor langt den flyr (m).</li>
            <li>Gjenta med ulik stramning. Hold vinkel, høyde og strikk like.</li>
            <li>Finn en modell s(x) med regresjon, og bruk den til å forutsi 6 cm. Stemmer det?</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
