import React from 'react';
import { FunkGraf, type Punkt } from '../../../../presentasjon/FunkGraf';
import { Frac, V, X, Xk } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const TRINN: Trinn[] = [
  { m: <>−2<Xk /> + 120<X /> − 1000 = 0</>, t: 'Bedriften går i null når overskuddet er 0.' },
  { m: <><Xk /> − 60<X /> + 500 = 0</>, t: 'Del på −2. Husk å dele alle leddene.' },
  { m: <><X /> = <Frac n="60 ± 40" d="2" />, &nbsp; altså <span className="pen"><X /> = 10 eller <X /> = 50</span></>, t: 'abc-formelen. Begge svarene gir mening, og de har hver sin betydning.' },
  { m: <>Mellom 10 og 50 enheter går bedriften med overskudd.</>, t: 'Grafen ligger over x-aksen mellom de to nullpunktene.' },
];

export const OVERSKUDD_STEG = TRINN.length;

export const Overskudd: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const punkter: Punkt[] =
    frag >= 3
      ? [
          { x: 10, y: 0, farge: 'c1', navn: '10', plass: 'over' },
          { x: 50, y: 0, farge: 'c2', navn: '50', plass: 'over' },
        ]
      : [];
  return (
    <div className="slide">
      <div className="kicker">Eksempel · Økonomi</div>
      <h2>Når går bedriften med overskudd?</h2>
      <div className="boxed">
        <span className="label">Oppgave</span>
        En bedrift lager <X /> enheter av en vare per dag. Overskuddet er <span className="math nw"><V c="O" />(<X />) = −2<Xk /> + 120<X /> − 1000</span> kroner. For hvilke verdier av <X /> går bedriften med overskudd?
      </div>
      <div className="cols wide-left">
        <div className="stack">
          <Utregning trinn={TRINN} frag={frag} />
          <StepButtons frag={frag} setFrag={setFrag} steps={OVERSKUDD_STEG} />
        </div>
        <FunkGraf
          kurver={[{ f: (x) => -2 * x * x + 120 * x - 1000, fra: 0, til: 60, farge: 'pen' }]}
          punkter={punkter}
          xmin={-5}
          xmax={65}
          ymin={-1200}
          ymax={1000}
          xsteg={5}
          xetikett={10}
          ysteg={200}
          yetikett={400}
          ynavn="O"
          h={340}
          title="Overskuddet som funksjon av antall enheter"
        />
      </div>
    </div>
  );
};
