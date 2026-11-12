import React from 'react';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import type { LysbildeProps } from '../../../../../presentasjon/ui';

const GJETT: [string, string, string][] = [
  ["print('7 * 6')", '7 * 6', 'Alt mellom anførselstegnene skrives ut akkurat som det står.'],
  ['print(7 * 6)', '42', 'Uten anførselstegn regner Python ut verdien og skriver svaret.'],
  ['print("7 * 6 =", 7 * 6)', '7 * 6 = 42', 'Komma skiller delene. Python setter inn et mellomrom mellom dem.'],
  ["print('Svaret er', 7 * 6, 'kroner')", 'Svaret er 42 kroner', 'Vi kan blande tekst og utregninger så mye vi vil.'],
];

export const TEKST_STEG = GJETT.length;

export const TekstEllerTall: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">print</div>
    <h2>Tekst eller utregning?</h2>
    <div className="cols">
      <div className="stack" style={{ gap: 12 }}>
        <p>Hva tror du skrives ut? Bestem deg før du viser svaret.</p>
        {GJETT.map(([kode, ut, hvorfor], i) => (
          <div className="panel stack" key={i} style={{ gap: 6, padding: '10px 16px' }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <Kode inline>{kode}</Kode>
              {frag <= i && (
                <button className="btn" onClick={() => setFrag(i + 1)}>
                  Vis svar
                </button>
              )}
            </div>
            {frag > i && (
              <div className="reveal">
                <code className="py-inline pen">{ut}</code>
                <p className="small muted">{hvorfor}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="stack">
        <div className="boxed">
          <span className="label">print</span>
          <ul className="stack" style={{ gap: 4, paddingLeft: '1.2em', margin: 0 }}>
            <li>
              <b>Med anførselstegn</b> er det tekst. Den skrives ut som den står.
            </li>
            <li>
              <b>Uten anførselstegn</b> regner Python ut verdien.
            </li>
            <li>
              <b>Komma</b> skiller flere ting som skal stå på samme linje.
            </li>
          </ul>
        </div>
        <Kodeboks kode={"print('7 * 6')\nprint(7 * 6)"} />
        <p className="hintline">
          Du kan bruke enkle <code>'</code> eller doble <code>"</code> anførselstegn, men samme type på begge sider av teksten.
        </p>
      </div>
    </div>
  </div>
);
