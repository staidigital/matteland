import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op, dec } from '../../../../presentasjon/matte';
import { type LysbildeProps, Slider } from '../../../../presentasjon/ui';
import { Fx } from '../../funksjoner/felles';
import { Pol, nullpunkter, polynom } from '../felles';

const SPORSMAL: [string, string][] = [
  ['Har alle andregradsfunksjoner nullpunkter?', 'Nei. Parabelen kan ligge helt over eller under x-aksen.'],
  ['Kan en andregradsfunksjon ha akkurat ett nullpunkt?', 'Ja, når ekstremalpunktet ligger på x-aksen.'],
  ['Kan et ekstremalpunkt også være et nullpunkt?', 'Ja, i det samme tilfellet.'],
];

export const NULL_STEG = SPORSMAL.length;

export const Nullpunkter: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const [a, setA] = useState(1);
  const [q, setQ] = useState(-3);
  // f(x) = a(x − 1)² + q, skrevet ut på formen ax² + bx + c
  const K = [a, -2 * a, a + q];
  const f = polynom(K);
  const r = nullpunkter(f, -10, 10);

  return (
    <div className="slide">
      <div className="kicker">Nullpunkter · Reflekter og diskuter</div>
      <h2>Hvor mange nullpunkter kan en parabel ha?</h2>
      <div className="cols">
        <div className="stack">
          <p>
            Nullpunktene er løsningene av{' '}
            <span className="math nw">
              <Fx /> = 0
            </span>
            .
          </p>
          <div className="boxed math">
            <Fx />
            <Op>=</Op>
            <Pol k={K} />
          </div>
          <Slider
            id="np-a"
            label={<span className="c2">a</span>}
            value={a}
            min={-2}
            max={2}
            step={0.5}
            onChange={(v) => setA(v || 0.5)}
          />
          <Slider id="np-q" label="flytt" value={q} min={-5} max={5} step={0.5} onChange={setQ} />
          <p>
            <b className="pen">
              {r.length === 0 ? 'Ingen nullpunkter' : r.length === 1 ? 'Ett nullpunkt' : 'To nullpunkter'}
            </b>
            {r.length > 0 && <>: x = {r.map((x) => dec(x)).join(' og x = ')}</>}
          </p>
          <div className="stack" style={{ gap: 8 }}>
            {SPORSMAL.map(([sp, svar], i) => (
              <div key={i} className="panel" style={{ padding: '10px 16px' }}>
                {sp}{' '}
                {frag > i ? (
                  <span className="reveal pen">{svar}</span>
                ) : (
                  <button className="btn" onClick={() => setFrag(i + 1)}>
                    Vis svar
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        <FunkGraf
          kurver={[{ f }]}
          punkter={[{ x: 1, y: q, farge: 'muted' }, ...r.map((x) => ({ x, y: 0, farge: 'pen' }))]}
          xmin={-5}
          xmax={7}
          ymin={-7}
          ymax={7}
          h={440}
          title="Parabel som kan flyttes opp og ned for å vise to, ett eller ingen nullpunkter"
        />
      </div>
    </div>
  );
};
