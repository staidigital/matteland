import React from 'react';
import { FunkGraf, type Punkt } from '../../../../presentasjon/FunkGraf';
import { V } from '../../../../presentasjon/matte';
import { Utregning, type Trinn } from '../../../../presentasjon/ovelser';
import { type LysbildeProps, StepButtons } from '../../../../presentasjon/ui';

const T = () => <V c="t" />;

const TRINN: Trinn[] = [
  { m: <>Lander: −5<T /><sup>2</sup> + 10<T /> + 15 = 0</>, t: 'Ballen lander når høyden er 0.' },
  { m: <><T /><sup>2</sup> − 2<T /> − 3 = 0 &nbsp;gir&nbsp; (<T /> − 3)(<T /> + 1) = 0</>, t: 'Del på −5, og bruk sum og produkt.' },
  { m: <><span className="pen"><T /> = 3</span> &nbsp; eller &nbsp; <T /> = −1</>, t: 'Tiden begynner når ballen kastes, så t = −1 gir ikke mening. Ballen lander etter 3 sekunder.' },
  { m: <>Høyde 15 m: −5<T /><sup>2</sup> + 10<T /> + 15 = 15 &nbsp;gir&nbsp; −5<T />(<T /> − 2) = 0</>, t: 'En ny likning, der høyden er 15 i stedet for 0.' },
  { m: <><T /> = 0 eller <span className="pen"><T /> = 2</span></>, t: 'Her gir begge svarene mening: ballen er i 15 meters høyde to ganger, på vei opp og på vei ned.' },
];

export const KAST_STEG = TRINN.length;

export const Kast: React.FC<LysbildeProps> = ({ frag, setFrag }) => {
  const punkter: Punkt[] = [];
  if (frag >= 3) punkter.push({ x: 3, y: 0, farge: 'c1', navn: 'Lander', plass: 'over' });
  if (frag >= 5) punkter.push({ x: 0, y: 15, farge: 'c2', plass: 'hoyre' }, { x: 2, y: 15, farge: 'c2', navn: '15 m', plass: 'hoyre' });
  return (
    <div className="slide">
      <div className="kicker">Eksempel · Kast</div>
      <h2>Når lander ballen?</h2>
      <div className="boxed">
        <span className="label">Oppgave</span>
        En ball kastes opp fra et tak. Høyden over bakken etter <T /> sekunder er <span className="math nw"><V c="h" />(<T />) = −5<T /><sup>2</sup> + 10<T /> + 15</span> meter.
      </div>
      <div className="cols wide-left">
        <div className="stack">
          <Utregning trinn={TRINN} frag={frag} />
          <StepButtons frag={frag} setFrag={setFrag} steps={KAST_STEG} />
        </div>
        <FunkGraf
          kurver={[{ f: (t) => -5 * t * t + 10 * t + 15, fra: 0, til: 3, farge: 'pen' }]}
          punkter={punkter}
          xmin={-0.5}
          xmax={4}
          ymin={-3}
          ymax={25}
          ysteg={5}
          xetikett={1}
          xnavn="t"
          ynavn="h"
          h={340}
          title="Høyden til ballen som funksjon av tiden"
        />
      </div>
    </div>
  );
};
