import React from 'react';
import { V, X } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const A = () => <V c="a" />;
const B = () => <V c="b" />;

const TRINN: Trinn[] = [
  { m: <>3<X /> + (2<X /> − 4) = 3<X /> + 2<X /> − 4 = <span className="pen">5<X /> − 4</span></>, t: 'Pluss foran: fjern parentesen. Ingenting skifter fortegn.' },
  { m: <>5<X /> − (2<X /> − 3) = 5<X /> − 2<X /> + 3 = <span className="pen">3<X /> + 3</span></>, t: 'Minus foran: 2x blir −2x, og −3 blir +3.' },
  { m: <>4 − (<X /> + 2) = 4 − <X /> − 2 = <span className="pen">2 − <X /></span></>, t: 'Husk å skifte fortegn også på det første leddet.' },
  { m: <>2<A /> − (<A /> − <B /> + 3) = 2<A /> − <A /> + <B /> − 3 = <span className="pen"><A /> + <B /> − 3</span></>, t: 'Alle leddene skifter fortegn, uansett hvor mange de er.' },
  { m: <>(<X /> + 1) − (2<X /> − 3) = <X /> + 1 − 2<X /> + 3 = <span className="pen">−<X /> + 4</span></>, t: 'Bare parentesen med minus foran skifter fortegn.' },
];

export const LOSE_STEG = TRINN.length;

export const LoseOppParenteser: React.FC<LysbildeProps> = ({ frag, setFrag }) => (
  <div className="slide">
    <div className="kicker">Løse opp parenteser</div>
    <h2>Pluss eller minus foran parentesen</h2>
    <div className="grid2">
      <div className="boxed math">
        <span className="label">Pluss foran</span>
        <A /> + (<B /> − <V c="c" />) = <A /> + <B /> − <V c="c" />
      </div>
      <div className="boxed math">
        <span className="label">Minus foran: alle ledd skifter fortegn</span>
        <A /> − (<B /> − <V c="c" />) = <A /> − <B /> + <V c="c" />
      </div>
    </div>
    <Utregning trinn={TRINN} frag={frag} />
    <StepButtons frag={frag} setFrag={setFrag} steps={LOSE_STEG} />
  </div>
);
