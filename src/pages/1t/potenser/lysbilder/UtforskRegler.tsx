import React, { useState } from 'react';
import { Frac, V, minus } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;

type Modus = 'gange' | 'dele' | 'potens';

const Faktorer: React.FC<{ antall: number; fra?: number; strek?: number; cls?: string }> = ({ antall, fra = 0, strek = 0, cls }) => (
  <span className={cls} style={{ whiteSpace: 'normal' }}>
    {Array.from({ length: antall }, (_, i) => (
      <React.Fragment key={i}>
        {i > 0 && ' · '}
        <span className={fra + i < strek ? 'cancel' : undefined}><A /></span>
      </React.Fragment>
    ))}
  </span>
);

const Eks: React.FC<{ e: number }> = ({ e }) => <sup>{minus(e)}</sup>;

export const UtforskRegler: React.FC = () => {
  const [modus, setModus] = useState<Modus>('gange');
  const [m, setM] = useState(3);
  const [n, setN] = useState(2);
  return (
    <div className="slide">
      <div className="kicker">Utforsk · Potensreglene</div>
      <h2>Tell faktorene</h2>
      <div className="seg" role="group" aria-label="Regel" style={{ alignSelf: 'start' }}>
        {(
          [
            ['gange', 'Gange'],
            ['dele', 'Dele'],
            ['potens', 'Potens av potens'],
          ] as [Modus, string][]
        ).map(([k, l]) => (
          <button key={k} aria-pressed={modus === k} onClick={() => setModus(k)}>
            {l}
          </button>
        ))}
      </div>
      <div className="cols">
        <div className="stack">
          <Slider id="p-m" label={<V c="m" />} value={m} min={1} max={6} step={1} onChange={setM} />
          <Slider id="p-n" label={<V c="n" />} value={n} min={1} max={modus === 'potens' ? 4 : 6} step={1} onChange={setN} />
          <div className="boxed math big">
            {modus === 'gange' && (
              <>
                <A /><Eks e={m} /> · <A /><Eks e={n} /> = <span className="pen"><A /><Eks e={m + n} /></span>
              </>
            )}
            {modus === 'dele' && (
              <>
                <Frac n={<><A /><Eks e={m} /></>} d={<><A /><Eks e={n} /></>} /> = <span className="pen"><A /><Eks e={m - n} /></span>
              </>
            )}
            {modus === 'potens' && (
              <>
                (<A /><Eks e={m} />)<Eks e={n} /> = <span className="pen"><A /><Eks e={m * n} /></span>
              </>
            )}
          </div>
        </div>
        <div className="panel stack">
          {modus === 'gange' && (
            <>
              <p className="math">
                <Faktorer antall={m} cls="c1" /> · <Faktorer antall={n} cls="c2" />
              </p>
              <p>
                {m} faktorer og {n} faktorer gir {m + n} faktorer til sammen. Vi <b>legger sammen</b> eksponentene.
              </p>
            </>
          )}
          {modus === 'dele' && (
            <>
              <p className="math">
                <Frac n={<Faktorer antall={m} strek={Math.min(m, n)} />} d={<Faktorer antall={n} strek={Math.min(m, n)} />} />
              </p>
              <p>
                {Math.min(m, n)} {Math.min(m, n) === 1 ? 'faktor' : 'faktorer'} kan strykes. Vi <b>trekker fra</b> eksponenten i nevneren.
                {m === n && ' Alle faktorene strykes, og igjen står 1. Det kommer vi tilbake til.'}
                {m < n && ' Nå blir eksponenten negativ, og faktorene som er igjen, står i nevneren.'}
              </p>
            </>
          )}
          {modus === 'potens' && (
            <>
              <p className="math">
                {Array.from({ length: n }, (_, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && ' · '}(<Faktorer antall={m} cls={i % 2 ? 'c2' : 'c1'} />)
                  </React.Fragment>
                ))}
              </p>
              <p>
                {n} {n === 1 ? 'parentes' : 'parenteser'} med {m} {m === 1 ? 'faktor' : 'faktorer'} i hver gir {m * n} faktorer. Vi <b>ganger</b> eksponentene.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
