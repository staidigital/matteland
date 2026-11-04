import React, { useState } from 'react';
import { minus } from '../../../../presentasjon/matte';
import { Slider } from '../../../../presentasjon/ui';
import { Intervall } from '../../funksjoner/felles';
import { Tallinje, type Del } from '../felles';

type Modus = 'union' | 'utenom';

export const UnionUtenom: React.FC = () => {
  const [modus, setModus] = useState<Modus>('union');
  const [a, setA] = useState(-5);
  const [la, setLa] = useState(3);
  const [c, setC] = useState(1);
  const [lc, setLc] = useState(3);
  const [x, setX] = useState(-3);
  const b = Math.min(a + la, 6);
  const d = Math.min(c + lc, 6);
  const A = <Intervall a={a} b={b} />;
  const B = <Intervall a={c} b={d} />;
  const overlapp = Math.max(a, c) <= Math.min(b, d);
  const inni = x > a && x < b;

  let resultat: Del[];
  if (modus === 'union') resultat = overlapp ? [{ a: Math.min(a, c), b: Math.max(b, d), aMed: true, bMed: true }] : [{ a, b, aMed: true, bMed: true }, { a: c, b: d, aMed: true, bMed: true }];
  else if (inni) resultat = [{ a, b: x, aMed: true, bMed: false }, { a: x, b, aMed: false, bMed: true }];
  else resultat = [{ a, b, aMed: x !== a, bMed: x !== b }];

  return (
    <div className="slide">
      <div className="kicker">Utforsk · Mengdenotasjon</div>
      <h2>Slå sammen og ta bort</h2>
      <div className="seg" role="group" aria-label="Operasjon" style={{ alignSelf: 'start' }}>
        <button aria-pressed={modus === 'union'} onClick={() => setModus('union')}>Union ∪</button>
        <button aria-pressed={modus === 'utenom'} onClick={() => setModus('utenom')}>Utenom \</button>
      </div>
      <div className="cols">
        <div className="stack">
          <Slider id="u-a" label={<span className="c1">start</span>} value={a} min={-6} max={5} step={1} onChange={setA} />
          <Slider id="u-la" label={<span className="c1">lengde</span>} value={la} min={1} max={6} step={1} onChange={setLa} />
          {modus === 'union' ? (
            <>
              <Slider id="u-c" label={<span className="c2">start</span>} value={c} min={-6} max={5} step={1} onChange={setC} />
              <Slider id="u-lc" label={<span className="c2">lengde</span>} value={lc} min={1} max={6} step={1} onChange={setLc} />
            </>
          ) : (
            <Slider id="u-x" label="tallet" value={x} min={-6} max={6} step={1} onChange={setX} />
          )}
          <Tallinje min={-6} max={6} deler={[{ a, b, aMed: true, bMed: true, farge: 'var(--r1)' }]} merke={modus === 'utenom' ? x : undefined} />
          {modus === 'union' && <Tallinje min={-6} max={6} deler={[{ a: c, b: d, aMed: true, bMed: true, farge: 'var(--r2)' }]} />}
        </div>
        <div className="stack">
          <Tallinje min={-6} max={6} deler={resultat} />
          {modus === 'union' ? (
            <>
              <div className="boxed math">
                <span className="c1">{A}</span> ∪ <span className="c2">{B}</span>
                {overlapp && <> = <span className="pen"><Intervall a={Math.min(a, c)} b={Math.max(b, d)} /></span></>}
              </div>
              <p>
                <b>Unionen</b> av to mengder er alle tallene som ligger i <b>minst én</b> av dem.{' '}
                {overlapp ? 'Intervallene henger sammen, så unionen er ett intervall.' : 'Det er et hull mellom intervallene, så vi må skrive begge.'}
              </p>
            </>
          ) : (
            <>
              <div className="boxed math">
                {A} \ {'{'}{minus(x)}{'}'}
                {' '}={' '}
                <span className="pen">
                  {inni ? (
                    <><Intervall a={a} b={x} bMed={false} /> ∪ <Intervall a={x} b={b} aMed={false} /></>
                  ) : (
                    <Intervall a={a} b={b} aMed={x !== a} bMed={x !== b} />
                  )}
                </span>
              </div>
              <p>
                <b>\</b> leses «utenom» og tar bort tall fra en mengde.{' '}
                {inni && 'Tallet ligger inni intervallet, så det blir et hull og to deler.'}
                {(x === a || x === b) && 'Tallet er et endepunkt, så parentesen blir en spissparentes.'}
                {(x < a || x > b) && 'Tallet er ikke med fra før, så ingenting endres.'}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
