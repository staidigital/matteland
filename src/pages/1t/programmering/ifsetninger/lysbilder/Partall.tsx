import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

const BRUK: [string, string, string][] = [
  ['n % 2 == 0', 'n er et partall', 'Går 2 opp i n, er resten 0.'],
  ['n % 2 == 1', 'n er et oddetall', 'Et oddetall har alltid 1 i rest når vi deler på 2.'],
  ['n % 3 == 0', 'n er delelig med 3', 'Det samme virker for alle tall: n % d == 0 betyr at d går opp i n.'],
  ['n % 10', 'siste siffer i n', '127 % 10 gir 7. Det som er til overs når vi tar bort hele tiere.'],
];

export const BRUK_STEG = BRUK.length;

export const Partall: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Modulo og if</div>
    <h2>Partall, oddetall og delelighet</h2>
    <div className="cols">
      <div className="stack" style={{ gap: 10 }}>
        <p>Resten 0 betyr at divisjonen går opp. Det kan vi teste med en if-setning.</p>
        {BRUK.map(([kode, betyr, hvorfor], i) => (
          <div className="panel stack" key={kode} style={{ gap: 4, padding: '8px 16px' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <Kode inline>{kode}</Kode>
              {frag > i ? (
                <b className="reveal pen">{betyr}</b>
              ) : (
                <button className="btn" onClick={() => setFrag(i + 1)}>
                  Hva betyr det?
                </button>
              )}
            </div>
            {frag > i && <p className="small muted reveal">{hvorfor}</p>}
          </div>
        ))}
      </div>
      <div className="stack">
        <Kodeboks
          kode={"n = int(input('Skriv et heltall: '))\n\nif n % 2 == 0:\n    print(n, 'er et partall')\nelse:\n    print(n, 'er et oddetall')"}
          variabler
        />
        <p className="hintline">Utvid programmet så det også sier om tallet er delelig med 3.</p>
      </div>
    </div>
  </div>
);
