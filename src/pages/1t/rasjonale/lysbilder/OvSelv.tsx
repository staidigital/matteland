import React from 'react';
import { Frac, Num, Poly, X, near } from '../../../../presentasjon/matte';
import { OvSelvRamme, type Ovelse } from '../../../../presentasjon/ovelser';
import { ri, riUtenNull } from '../../bokstavuttrykk/oppgaver';
import { Fx, Mengde } from '../../funksjoner/felles';
import { tusen } from '../../skjaeringspunkter/felles';
import { Ras } from '../felles';

type Niva = 'asymptoter' | 'nullpunkt' | 'mengder' | 'modell';

const NIVAER: [Niva, string][] = [
  ['asymptoter', 'Asymptoter'],
  ['nullpunkt', 'Nullpunkt'],
  ['mengder', 'Definisjons- og verdimengde'],
  ['modell', 'Spleiselag'],
];

const velg = <T,>(arr: T[]) => arr[ri(0, arr.length - 1)];

/** (ax + b)/(cx + d) med c ≠ 0 og ad − bc ≠ 0, så grafen er en ekte hyperbel */
function lagBrok() {
  for (;;) {
    const a = riUtenNull(-4, 4);
    const b = ri(-6, 6);
    const c = velg([1, 1, 2, 3, 4, -1, -2]);
    const d = ri(-8, 8);
    if (a * d - b * c !== 0) return { a, b, c, d, r: a / c, s: -d / c };
  }
}

const Side: React.FC = () => (
  <p className="muted small">
    For <Fx /> = (a<X /> + b)/(c<X /> + d): horisontal asymptote y = a/c, vertikal asymptote <X /> = −d/c. Skriv brøk som
    3/2.
  </p>
);

function lagAsymptoter(): Ovelse {
  const { a, b, c, d, r, s } = lagBrok();
  return {
    oppgave: (
      <>
        <Fx /> = <Ras a={a} b={b} c={c} d={d} />
      </>
    ),
    instruks: 'Finn asymptotene til grafen.',
    felt: [
      { navn: 'Vertikal', foran: <>vertikal: <X /> =</> },
      { navn: 'Horisontal', foran: <>horisontal: y =</> },
    ],
    vurder: ({ tall: [v, h] }) => {
      if (near(v, s) && near(h, r)) return null;
      if (near(v, -s)) return 'Vertikal: sett nevneren lik null og løs. Pass på fortegnet.';
      if (near(v, -b / a) || near(h, -b / a)) return 'Du har brukt telleren. Den gir nullpunktet, ikke asymptoten.';
      if (near(h, c / a)) return 'Horisontal: tallet foran x i telleren delt på tallet foran x i nevneren, a/c.';
      if (!near(v, s)) return 'Vertikal: løs cx + d = 0.';
      return 'Horisontal: se bare på leddene med x når x er svært stor.';
    },
    losning: (
      <>
        <span className="mline">
          <Poly a={0} b={c} c={d} /> = 0
          &nbsp;⇒&nbsp; <span className="pen"><X /> = <Num v={s} /></span>
        </span>
        <span className="mline">
          y = <Frac n={a < 0 ? `−${-a}` : a} d={c < 0 ? `−${-c}` : c} /> = <span className="pen"><Num v={r} /></span>
        </span>
      </>
    ),
    side: <Side />,
  };
}

function lagNullpunkt(): Ovelse {
  const { a, b, c, d } = lagBrok();
  const n = -b / a;
  return {
    oppgave: (
      <>
        <Fx /> = <Ras a={a} b={b} c={c} d={d} />
      </>
    ),
    instruks: 'Finn nullpunktet til f.',
    felt: [{ navn: 'Nullpunkt', foran: <><X /> =</> }],
    vurder: ({ tall: [v] }) => {
      if (near(v, n)) return null;
      if (near(v, -d / c)) return 'Der er nevneren null. Da er funksjonen ikke definert. Bruk telleren.';
      if (near(v, -n)) return 'Riktig idé, men sjekk fortegnet når du løser likningen.';
      return 'En brøk er null når telleren er null. Løs ax + b = 0.';
    },
    losning: (
      <>
        <span className="mline">Telleren = 0:</span>
        <span className="mline">
          <Poly a={0} b={a} c={b} /> = 0 &nbsp;⇒&nbsp; <span className="pen"><X /> = <Num v={n} /></span>
        </span>
      </>
    ),
    side: (
      <p className="muted small">
        Telleren = 0 gir nullpunkt. Nevneren = 0 gir vertikal asymptote. Skriv brøk som 3/2.
      </p>
    ),
  };
}

function lagMengder(): Ovelse {
  const { a, b, c, d, r, s } = lagBrok();
  return {
    oppgave: (
      <>
        <Fx /> = <Ras a={a} b={b} c={c} d={d} />
      </>
    ),
    instruks: 'Finn definisjonsmengden og verdimengden.',
    felt: [
      { navn: 'D', foran: <><Mengde m="D" /> = ℝ \ {'{'}</>, bak: '}' },
      { navn: 'V', foran: <><Mengde m="V" /> = ℝ \ {'{'}</>, bak: '}' },
    ],
    vurder: ({ tall: [dv, vv] }) => {
      if (near(dv, s) && near(vv, r)) return null;
      if (near(dv, r) && near(vv, s)) return 'Du har byttet om. D handler om x-verdiene, V om y-verdiene.';
      if (!near(dv, s)) return 'Definisjonsmengden: hvilken x gir null i nevneren?';
      return 'Verdimengden: grafen treffer aldri den horisontale asymptoten y = a/c.';
    },
    losning: (
      <>
        <span className="mline pen">
          <Mengde m="D" /> = ℝ \ {'{'}
          <Num v={s} />
          {'}'} &nbsp; <Mengde m="V" /> = ℝ \ {'{'}
          <Num v={r} />
          {'}'}
        </span>
        <span className="mline small">Unntakene er asymptotene.</span>
      </>
    ),
    side: <Side />,
  };
}

function lagModell(): Ovelse {
  const K = velg([2400, 3000, 3600, 4200, 4500, 5000, 6000, 7500]);
  const P = velg([100, 120, 150, 200, 250]);
  const grense = K / P;
  const svar = Number.isInteger(grense) ? grense + 1 : Math.ceil(grense);
  const hva = velg(['hytte', 'buss til skidagen', 'lokale og mat til festen', 'leie av en båt']);
  return {
    oppgave: <>{tusen(K)} kr</>,
    instruks: (
      <>
        En gruppe deler utgiftene til {hva} på {tusen(K)} kr likt. Hvor mange må være med for at prisen skal bli{' '}
        <b>under</b> {P} kr per person?
      </>
    ),
    felt: [{ navn: 'Antall', foran: 'antall:', bak: 'personer' }],
    vurder: ({ tall: [v] }) => {
      if (near(v, svar)) return null;
      if (near(v, grense)) return `Med ${grense} personer blir det nøyaktig ${P} kr. Det skal være under.`;
      if (near(v, Math.floor(grense))) return 'Rund opp: med færre personer blir prisen over grensen.';
      return `Løs ${tusen(K)}/x = ${P}.`;
    },
    losning: (
      <>
        <span className="mline">
          <Frac n={tusen(K)} d={<X />} /> = {P} &nbsp;⇒&nbsp; <X /> = <Frac n={tusen(K)} d={P} /> ={' '}
          {Number.isInteger(grense) ? grense : grense.toFixed(2).replace('.', ',')}
        </span>
        <span className="mline pen">Minst {svar} personer</span>
      </>
    ),
    side: (
      <p className="muted small">
        Pris per person: <Fx /> = <Frac n="samlet pris" d="antall" />. Prisen går ned når antallet går opp.
      </p>
    ),
  };
}

function lag(niva: Niva): Ovelse {
  if (niva === 'asymptoter') return lagAsymptoter();
  if (niva === 'nullpunkt') return lagNullpunkt();
  if (niva === 'mengder') return lagMengder();
  return lagModell();
}

export const OvSelv: React.FC = () => <OvSelvRamme tittel="Rasjonale funksjoner" nivaer={NIVAER} lag={lag} />;
