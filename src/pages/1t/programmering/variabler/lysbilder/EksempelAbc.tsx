import React from 'react';
import { ABC } from '../../../../../presentasjon/matte';
import { Kode } from '../../../../../presentasjon/python/fargelegg';
import { Kodeboks } from '../../../../../presentasjon/python/Kodeboks';
import { type LysbildeProps, StepButtons } from '../../../../../presentasjon/ui';

export const ABC_STEG = 3;

export const EksempelAbc: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel · Andregradslikninger</div>
    <h2>abc-formelen som program</h2>
    <div className="row">
      <span>Løs</span>
      <span className="math">
        2<i className="v">x</i>
        <sup>2</sup> − 4<i className="v">x</i> − 6 = 0
      </span>
      <span className="muted">med</span>
      <ABC />
    </div>
    <div className="cols">
      <div className="stack">
        {frag >= 1 && (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <span>
              Vi lagrer <b>a</b>, <b>b</b> og <b>c</b> i variabler, og regner ut det som står under rottegnet først:
            </span>
            <Kode>{'d = b**2 - 4*a*c'}</Kode>
          </div>
        )}
        {frag >= 2 && (
          <div className="panel reveal stack" style={{ gap: 6 }}>
            <span>
              Kvadratrot er det samme som potensen ½, så √d skrives <code>d**0.5</code>. Hele nevneren trenger parentes:
            </span>
            <Kode>{'x1 = (-b + d**0.5) / (2*a)'}</Kode>
          </div>
        )}
        {frag >= 3 && (
          <div className="panel reveal">
            Løsningene er <b className="pen">x = 3</b> og <b className="pen">x = −1</b>. Nå kan programmet løse en hvilken som
            helst andregradslikning: bare endre a, b og c. Hva skjer hvis d er negativ?
          </div>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={ABC_STEG} />
      </div>
      <Kodeboks
        kode={"a = 2\nb = -4\nc = -6\n\nd = b**2 - 4*a*c\nx1 = (-b + d**0.5) / (2*a)\nx2 = (-b - d**0.5) / (2*a)\nprint('x1 =', x1)\nprint('x2 =', x2)"}
        variabler
      />
    </div>
  </div>
);
