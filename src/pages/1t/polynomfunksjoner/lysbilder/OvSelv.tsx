import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, X, minus, near, par } from '../../../../presentasjon/matte';
import { Fx } from '../../funksjoner/felles';
import { lesTall } from '../../nullpunktsfaktorisering/oppgaver';
import { Pol, Symmetrilinje, polynom } from '../felles';
import { NIVAER, type Niva, type Oppgave, lagOppgave } from '../oppgaver';

type Tilbakemelding = { ok: boolean; msg: string } | null;

/** Utregningen, linje for linje */
const Losning: React.FC<{ t: Oppgave }> = ({ t }) => {
  const { a, b, c, p, q, r } = t;
  const sym = (
    <span className="mline">
      <X /> = −<Frac n={minus(b)} d={`2 · ${par(a)}`} /> = <span className="pen">{minus(p)}</span>
    </span>
  );
  if (t.niva === 'symmetri') return sym;
  if (t.niva === 'ekstremal')
    return (
      <>
        {sym}
        <span className="mline">
          <Fx x={minus(p)} /> = {minus(a)} · {par(p)}
          <sup>2</sup> {b < 0 ? '−' : '+'} {Math.abs(b)} · {par(p)} {c < 0 ? '−' : '+'} {Math.abs(c)} = {minus(q)}
        </span>
        <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>
          {a > 0 ? 'a > 0, så det er et bunnpunkt' : 'a < 0, så det er et toppunkt'}: ({minus(p)} , {minus(q)})
        </span>
      </>
    );
  const d = b * b - 4 * a * c;
  return (
    <>
      <span className="mline">
        <X /> ={' '}
        <Frac
          n={
            <>
              {minus(-b)} ± √
              <span className="rad">
                {par(b)}
                <sup>2</sup> − 4 · {par(a)} · {par(c)}
              </span>
            </>
          }
          d={`2 · ${par(a)}`}
        />{' '}
        = <Frac n={`${minus(-b)} ± ${Math.sqrt(d)}`} d={minus(2 * a)} />
      </span>
      <span className="mline">
        <X /> = {minus(r[0])} &nbsp;eller&nbsp; <X /> = {minus(r[1])}
      </span>
    </>
  );
};

export const OvSelv: React.FC = () => {
  const [niva, setNiva] = useState<Niva>('symmetri');
  const [t, setT] = useState(() => lagOppgave('symmetri'));
  const [inp1, setInp1] = useState('');
  const [inp2, setInp2] = useState('');
  const [type, setType] = useState<'topp' | 'bunn' | null>(null);
  const [fb, setFb] = useState<Tilbakemelding>(null);
  const [losning, setLosning] = useState(false);
  const [lost, setLost] = useState(false);
  const [antall, setAntall] = useState(0);

  const nyOppgave = (n: Niva) => {
    setT(lagOppgave(n));
    setInp1('');
    setInp2('');
    setType(null);
    setFb(null);
    setLosning(false);
    setLost(false);
  };

  const riktig = (msg = 'Riktig!') => {
    setFb({ ok: true, msg });
    if (!lost) {
      setLost(true);
      setAntall((n) => n + 1);
    }
  };

  const symHint = (x: number) =>
    near(x, -t.p)
      ? 'Sjekk fortegnet. Husk minustegnet i x = −b/(2a).'
      : near(x, -t.b / t.a) || near(x, t.b / t.a)
        ? 'Har du glemt 2-tallet i nevneren? x = −b/(2a).'
        : 'Bruk x = −b/(2a). Husk parentes rundt negative tall.';

  const sjekk = (e: React.FormEvent) => {
    e.preventDefault();
    const v1 = lesTall(inp1);
    const v2 = lesTall(inp2);
    if (t.niva === 'symmetri') {
      if (!isFinite(v1)) return setFb({ ok: false, msg: 'Skriv inn x-verdien til symmetrilinja.' });
      return near(v1, t.p) ? riktig() : setFb({ ok: false, msg: symHint(v1) });
    }
    if (!isFinite(v1) || !isFinite(v2))
      return setFb({
        ok: false,
        msg:
          t.niva === 'ekstremal'
            ? 'Skriv inn både x- og y-koordinaten.'
            : 'Skriv inn begge nullpunktene. Desimaltall skrives med komma, brøk som 3/2.',
      });
    if (t.niva === 'ekstremal') {
      if (!near(v1, t.p)) return setFb({ ok: false, msg: symHint(v1) });
      if (!near(v2, t.q)) return setFb({ ok: false, msg: `x er riktig. Regn ut f(${minus(t.p)}) for å finne y.` });
      if (!type) return setFb({ ok: false, msg: 'Punktet er riktig. Er det et toppunkt eller et bunnpunkt?' });
      if ((type === 'topp') !== t.a < 0)
        return setFb({ ok: false, msg: 'Punktet er riktig, men se på fortegnet til a: hul side opp eller ned?' });
      return riktig();
    }
    const [r1, r2] = [v1, v2].sort((x, y) => x - y);
    if (near(r1, t.r[0]) && near(r2, t.r[1])) return riktig();
    const [m1, m2] = [-v1, -v2].sort((x, y) => x - y);
    if (near(m1, t.r[0]) && near(m2, t.r[1]))
      return setFb({ ok: false, msg: 'Sjekk fortegnene. Sett inn i f(x) og se om du får 0.' });
    if (near(r1, t.r[0]) || near(r2, t.r[1]) || near(r1, t.r[1]) || near(r2, t.r[0]))
      return setFb({ ok: false, msg: 'Ett av nullpunktene er riktig. Sjekk det andre.' });
    setFb({ ok: false, msg: 'Løs f(x) = 0 med abc-formelen, og sett inn svarene for å sjekke.' });
  };

  const f = polynom([t.a, t.b, t.c]);
  const vis = lost || losning;

  return (
    <div className="slide">
      <div className="kicker">Øv selv</div>
      <h2>Andregradsfunksjoner</h2>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="seg" role="group" aria-label="Oppgavetype">
          {NIVAER.map(([k, l]) => (
            <button
              key={k}
              aria-pressed={niva === k}
              onClick={() => {
                setNiva(k);
                nyOppgave(k);
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <span className="muted">
          Løste oppgaver: <b style={{ color: 'var(--ink)' }}>{antall}</b>
        </span>
      </div>
      <div className="cols">
        <form className="stack" onSubmit={sjekk}>
          <div className="boxed">
            <span className="math">
              <Fx /> = <Pol k={[t.a, t.b, t.c]} />
            </span>
            <span className="mline small" style={{ marginTop: 6 }}>
              {t.niva === 'symmetri' && 'Finn symmetrilinja.'}
              {t.niva === 'ekstremal' && 'Finn ekstremalpunktet. Er det et toppunkt eller et bunnpunkt?'}
              {t.niva === 'nullpunkt' && 'Finn nullpunktene.'}
            </span>
          </div>
          <div className="row" style={{ alignItems: 'end' }}>
            {t.niva === 'symmetri' && (
              <>
                <span className="math">
                  <X /> =
                </span>
                <div className="field">
                  <label htmlFor="ov-1" className="pen">
                    x
                  </label>
                  <input id="ov-1" autoComplete="off" value={inp1} onChange={(e) => setInp1(e.target.value)} />
                </div>
              </>
            )}
            {t.niva === 'ekstremal' && (
              <>
                <span className="math">(</span>
                <div className="field">
                  <label htmlFor="ov-1">x</label>
                  <input id="ov-1" autoComplete="off" value={inp1} onChange={(e) => setInp1(e.target.value)} />
                </div>
                <span className="math">,</span>
                <div className="field">
                  <label htmlFor="ov-2">y</label>
                  <input id="ov-2" autoComplete="off" value={inp2} onChange={(e) => setInp2(e.target.value)} />
                </div>
                <span className="math">)</span>
                <div className="seg" role="group" aria-label="Toppunkt eller bunnpunkt">
                  <button type="button" aria-pressed={type === 'topp'} onClick={() => setType('topp')}>
                    Toppunkt
                  </button>
                  <button type="button" aria-pressed={type === 'bunn'} onClick={() => setType('bunn')}>
                    Bunnpunkt
                  </button>
                </div>
              </>
            )}
            {t.niva === 'nullpunkt' && (
              <>
                <div className="field">
                  <label htmlFor="ov-1">
                    x<sub>1</sub>
                  </label>
                  <input id="ov-1" autoComplete="off" value={inp1} onChange={(e) => setInp1(e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="ov-2">
                    x<sub>2</sub>
                  </label>
                  <input id="ov-2" autoComplete="off" value={inp2} onChange={(e) => setInp2(e.target.value)} />
                </div>
              </>
            )}
          </div>
          <div className="row">
            <button type="submit" className="btn primary">
              Sjekk
            </button>
            <button type="button" className="btn" onClick={() => setLosning(true)}>
              Vis løsning
            </button>
            <button type="button" className="btn" onClick={() => nyOppgave(niva)}>
              Ny oppgave
            </button>
          </div>
          {fb && (
            <div className={'fb ' + (fb.ok ? 'ok' : 'bad')} role="status">
              {fb.msg}
            </div>
          )}
          {losning && (
            <div className="panel reveal stack" style={{ gap: 8 }}>
              <h3>Løsning</h3>
              <p className="math">
                <Losning t={t} />
              </p>
            </div>
          )}
        </form>
        <div className="stack">
          {vis ? (
            <FunkGraf
              kurver={[{ f }]}
              punkter={
                t.niva === 'nullpunkt'
                  ? t.r.map((x) => ({ x, y: 0, farge: 'pen' }))
                  : [
                      {
                        x: t.p,
                        y: t.q,
                        farge: 'pen',
                        navn: `(${minus(t.p)} , ${minus(t.q)})`,
                        plass: t.a > 0 ? ('under' as const) : ('over' as const),
                      },
                    ]
              }
              ekstra={(s) => <Symmetrilinje sx={s.sx} H={s.H} p={t.p} />}
              xmin={-8}
              xmax={8}
              ymin={-20}
              ymax={20}
              ysteg={2}
              yetikett={4}
              h={400}
              title="Grafen til funksjonen i oppgaven"
            />
          ) : (
            <p className="muted small">
              {t.niva === 'nullpunkt'
                ? 'Løs f(x) = 0 med abc-formelen.'
                : 'Symmetrilinja er x = −b/(2a). Ekstremalpunktet ligger på symmetrilinja.'}{' '}
              Grafen vises når du har løst oppgaven. Trykk Enter for å sjekke.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
