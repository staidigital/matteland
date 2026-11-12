import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import { type LysbildeProps, StepButtons } from '../../../../../presentasjon/ui';

const REGLER: [string, string][] = [
  ['Årstall som er delelige med 4, er skuddår.', '2024 % 4 == 0'],
  ['Unntak: hundreår (delelige med 100) er ikke skuddår.', '1900 % 100 == 0'],
  ['Unntak fra unntaket: år som er delelige med 400, er skuddår likevel.', '2000 % 400 == 0'],
];

export const SKUDDAR_STEG = REGLER.length + 1;

export const EksempelSkuddar: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Modulo og if</div>
    <h2>Er det skuddår?</h2>
    <div className="cols">
      <div className="stack">
        <p>Et år har 365,2425 dager i snitt. Derfor har vi skuddår, med 29. februar, etter disse reglene:</p>
        <ol className="stack" style={{ gap: 8, paddingLeft: '1.2em', margin: 0 }}>
          {REGLER.map(
            ([regel, kode], i) =>
              frag > i && (
                <li key={i} className="reveal">
                  {regel} <code className="py-inline small">{kode}</code>
                </li>
              ),
          )}
        </ol>
        {frag > REGLER.length && (
          <div className="panel reveal small">
            Vi sjekker det strengeste først, akkurat som med poengene: 400 før 100 før 4. Da kan hver regel stå i sin egen{' '}
            <code>elif</code>.
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={SKUDDAR_STEG} />
      </div>
      <div className="stack">
        <Kodeboks
          kode={
            "ar = int(input('Årstall: '))\n\nif ar % 400 == 0:\n    print(ar, 'er skuddår')\nelif ar % 100 == 0:\n    print(ar, 'er ikke skuddår')\nelif ar % 4 == 0:\n    print(ar, 'er skuddår')\nelse:\n    print(ar, 'er ikke skuddår')"
          }
          linjeForLinje
        />
        <p className="hintline">Test med 2024, 2026, 1900 og 2000.</p>
      </div>
    </div>
  </div>
);
