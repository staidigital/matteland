import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

const NAVN: [string, boolean, string][] = [
  ['pris2', true, 'Tall er lov, bare ikke først.'],
  ['2pris', false, 'Et navn kan ikke starte med et tall.'],
  ['ny pris', false, 'Mellomrom er ikke lov. Python tror det er to navn.'],
  ['ny_pris', true, 'Bruk understrek i stedet for mellomrom.'],
];

export const NAVN_STEG = NAVN.length;

export const HvaErVariabel: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Variabler</div>
    <h2>Et navn på en verdi</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">Tilordning</span>
          <Kode>{'navn = verdi'}</Kode>
          <p className="small" style={{ marginTop: 8 }}>
            Python regner ut verdien til høyre og lagrer den under navnet til venstre. Etterpå kan vi bruke navnet i stedet for
            verdien.
          </p>
        </div>
        <Kodeboks kode={'a = 5\nb = 3\nprint(a * b)\nprint(a + b)'} variabler />
      </div>
      <div className="stack">
        <h3>Regler for navn</h3>
        <ul className="stack small" style={{ gap: 4, paddingLeft: '1.2em', margin: 0 }}>
          <li>Bokstaver, tall og understrek, men ikke tall først.</li>
          <li>
            Store og små bokstaver er forskjellige: <code>Pris</code> og <code>pris</code> er to ulike variabler.
          </li>
          <li>Velg navn som forteller hva verdien er. Mange lar være å bruke æ, ø og å.</li>
        </ul>
        <p>Er dette gyldige variabelnavn?</p>
        <div className="grid2" style={{ gap: 10 }}>
          {NAVN.map(([navn, ok, hvorfor], i) => (
            <div className="panel stack" key={navn} style={{ gap: 4, padding: '8px 14px' }}>
              <code className="py-inline" style={{ alignSelf: 'start' }}>
                {navn}
              </code>
              {frag > i ? (
                <p className={'small reveal ' + (ok ? 'right' : 'wrong')}>
                  <b>{ok ? 'Ja.' : 'Nei.'}</b> {hvorfor}
                </p>
              ) : (
                <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
                  Vis
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
