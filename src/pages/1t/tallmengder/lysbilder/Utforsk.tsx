import React, { useState } from 'react';
import { Mengdediagram } from '../felles';
import { MENGDER, NAVN, SYMBOL, TALL } from '../oppgaver';

const UTVALG = ['7', '√9', '0', '−3', '3/4', '0,25', '0,333…', '3,14', '√2', 'π'].map(
  (t) => TALL.find((k) => k.tekst === t)!,
);

export const Utforsk: React.FC = () => {
  const [valgt, setValgt] = useState(UTVALG[0]);
  const orden = MENGDER.indexOf(valgt.minste);
  return (
    <div className="slide">
      <div className="kicker">Utforsk</div>
      <h2>Hvor hører tallet hjemme?</h2>
      <div className="row" role="group" aria-label="Velg et tall">
        {UTVALG.map((t) => (
          <button
            key={t.tekst}
            className={'btn' + (t === valgt ? ' primary' : '')}
            aria-pressed={t === valgt}
            onClick={() => setValgt(t)}
            style={{ fontFamily: 'var(--f-math)' }}
          >
            {t.tekst}
          </button>
        ))}
      </div>
      <div className="cols wide-left">
        <Mengdediagram minste={valgt.minste} irrasjonal={valgt.minste === 'R'} />
        <div className="stack">
          <div className="boxed math big">{valgt.tekst}</div>
          <p>{valgt.grunn}</p>
          <div className="tablewrap">
            <table className="cases">
              <tbody>
                {MENGDER.map((m, i) => (
                  <tr key={m}>
                    <td className="math nw">{SYMBOL[m]}</td>
                    <td>{NAVN[m]}</td>
                    <td className={i >= orden ? 'right' : 'wrong'}>
                      <b>{i >= orden ? 'Ja' : 'Nei'}</b>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
