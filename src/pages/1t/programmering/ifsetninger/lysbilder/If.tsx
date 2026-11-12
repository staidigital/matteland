import React from 'react';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import { type LysbildeProps, StepButtons } from '../../../../../presentasjon/ui';

export const IF_STEG = 3;

export const If: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">if</div>
    <h2>Kjør linjene bare hvis noe er sant</h2>
    <div className="cols">
      <div className="stack">
        <div className="boxed">
          <span className="label">Oppbygning</span>
          <pre className="py-statisk" style={{ border: 0, padding: 0, background: 'none' }}>
            <span className="py-nok">if</span> <i>vilkår</i>
            <b className="pen">:</b>
            {'\n'}
            <span style={{ background: 'var(--hl)' }}>{'    '}</span>
            <i>dette kjøres bare hvis vilkåret er sant</i>
            {'\n'}
            <span style={{ background: 'var(--hl)' }}>{'    '}</span>
            <i>og dette</i>
            {'\n'}
            <i>dette kjøres alltid</i>
          </pre>
        </div>
        {frag >= 1 && (
          <p className="reveal">
            <b className="pen">Kolon</b> etter vilkåret. Det sier at nå kommer det som hører til if-en.
          </p>
        )}
        {frag >= 2 && (
          <p className="reveal">
            <b className="pen">Innrykk</b> (fire mellomrom) markerer hvilke linjer som hører til. Editoren rykker inn av seg
            selv etter et kolon.
          </p>
        )}
        {frag >= 3 && (
          <p className="reveal">
            Den første linja <b className="pen">uten innrykk</b> hører ikke lenger til if-en, og kjøres uansett.
          </p>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={IF_STEG} />
      </div>
      <div className="stack">
        <Kodeboks
          kode={"temperatur = 25\n\nif temperatur > 20:\n    print('Shorts i dag!')\n    print('Husk solkrem.')\nprint('Ha en fin dag.')"}
          linjeForLinje
        />
        <p className="hintline">
          Endre temperaturen til 15 og kjør igjen. Hvilke linjer blir hoppet over? Hva skjer om du fjerner innrykket foran{' '}
          <code>print('Husk solkrem.')</code>?
        </p>
      </div>
    </div>
  </div>
);
