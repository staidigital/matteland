import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { MODELLER, type Modell, Uttrykk, VANN_X, VANN_Y, avvik, tilpass } from '../felles';
import { dec } from '../../../../presentasjon/matte';

export const Utforsk: React.FC = () => {
  const [m, setM] = useState<Modell | null>(null);
  const t = m ? tilpass(m, VANN_X, VANN_Y) : null;

  return (
    <div className="slide">
      <div className="kicker">Utforsk · Kamera og GeoGebra</div>
      <h2>Hvilken funksjon passer til vannstrålen?</h2>
      <div className="cols">
        <div className="stack">
          <p>
            Vi tar bilde av en vannstråle, legger det i et koordinatsystem og setter punkter langs strålen. Så lar vi GeoGebra
            prøve ulike funksjonstyper.
          </p>
          <div className="seg" role="group" aria-label="Velg modell" style={{ alignSelf: 'start', flexWrap: 'wrap' }}>
            {MODELLER.map(([k, navn]) => (
              <button key={k} aria-pressed={m === k} onClick={() => setM(m === k ? null : k)}>
                {navn}
              </button>
            ))}
          </div>
          {t ? (
            <div className="panel reveal stack" style={{ gap: 6 }}>
              <span className="math">
                y = <Uttrykk t={t} d={2} />
              </span>
              <span className="small muted">Sum av kvadrerte avvik: {dec(avvik(t.f, VANN_X, VANN_Y), 1)}</span>
            </div>
          ) : m ? (
            <p className="panel">Denne modellen kan ikke brukes her. Den krever positive verdier, men strålen starter i (0 , 0).</p>
          ) : (
            <p className="panel muted">Velg en funksjonstype og se hvor godt den passer.</p>
          )}
          <div className="boxed">
            <span className="label">Modellering</span>
            <p>
              Å beskrive virkeligheten med matematikk. Funksjonen vi lager, kaller vi en <b>modell</b>. Den gjelder under
              visse forutsetninger, og blir mer usikker jo lenger fram i tid vi går.
            </p>
          </div>
        </div>
        <FunkGraf
          kurver={t ? [{ f: t.f, fra: -0.5, til: 7, farge: 'c1' }] : []}
          punkter={VANN_X.map((x, i) => ({ x, y: VANN_Y[i], farge: 'c2' }))}
          xmin={-0.5}
          xmax={8}
          ymin={-0.5}
          ymax={8.5}
          xetikett={1}
          yetikett={1}
          h={460}
          title="Punkter langs en vannstråle med valgt regresjonsmodell"
        />
      </div>
    </div>
  );
};
