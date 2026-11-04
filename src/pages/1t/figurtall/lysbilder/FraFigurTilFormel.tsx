import React from 'react';
import { V } from '../../../../presentasjon/matte';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';
import { Verditabell } from '../../funksjoner/felles';
import { F, Figurrekke } from '../felles';
import { prikker } from '../oppgaver';

const N = () => <V c="n" />;
const NR = [1, 2, 3, 4];

export const FORMEL_STEG = 4;

export const FraFigurTilFormel: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Eksempel</div>
    <h2>Fra figur til formel</h2>
    <div className="cols">
      <div className="stack">
        <div className="panel"><Figurrekke figurer={NR.map((n) => prikker('l', n))} rute={18} /></div>
        <p>
          Vi skriver <span className="math nw"><F /></span> for antallet prikker i figur <N />.
        </p>
        {frag >= 1 && (
          <div className="reveal">
            <Verditabell x={<N />} y={<F />} xs={[1, 2, 3, 4]} ys={[3, 5, 7, 9]} />
          </div>
        )}
      </div>
      <div className="stack">
        {frag >= 1 && <p className="reveal">Tabellen viser at hver figur får 2 nye prikker.</p>}
        {frag >= 2 && (
          <p className="reveal">
            I figur <N /> er det <span className="c1"><N /> prikker bortover</span>, <span className="c2"><N /> prikker oppover</span> og{' '}
            <span className="pen">1 prikk i hjørnet</span>.
          </p>
        )}
        {frag >= 3 && (
          <div className="boxed math reveal">
            <span className="label">Formel</span>
            <F /> = <span className="c1"><N /></span> + <span className="c2"><N /></span> + <span className="pen">1</span> = 2<N /> + 1
          </div>
        )}
        {frag >= 4 && (
          <p className="math reveal">
            <F n="100" /> = 2 · 100 + 1 = <span className="pen">201</span>
          </p>
        )}
        <StepButtons frag={frag} setFrag={setFrag} steps={FORMEL_STEG} />
      </div>
    </div>
  </div>
);
