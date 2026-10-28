import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, Poly, V, X, minus, near, par } from '../../../../presentasjon/matte';
import { lesTall } from '../../nullpunktsfaktorisering/oppgaver';
import { NIVAER, type Niva, type Oppgave, lagOppgave } from '../oppgaver';

type Tilbakemelding = { ok: boolean; msg: string } | null;

const Y = () => <V c="y" />;
const pkt = ([x, y]: [number, number]) => `(${minus(x)} , ${minus(y)})`;

/** Utregningen, linje for linje */
const Losning: React.FC<{ t: Oppgave }> = ({ t }) => {
  const { a, b, p, q } = t;
  if (t.niva === 'les')
    return (
      <>
        <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>
          Linja skjærer y-aksen i (0 , {minus(b)}), så <V c="b" /> = <span className="pen">{minus(b)}</span>.
        </span>
        <span className="mline small" style={{ fontFamily: 'var(--f-body)' }}>
          Én til høyre gir {Math.abs(a)} {a > 0 ? 'opp' : 'ned'}, så <V c="a" /> = <span className="c2">{minus(a)}</span>.
        </span>
      </>
    );
  if (t.niva === 'topunkt')
    return (
      <>
        <span className="mline">
          <V c="a" /> = <Frac n={`${minus(q[1])} − ${par(p[1])}`} d={`${minus(q[0])} − ${par(p[0])}`} /> ={' '}
          <Frac n={minus(q[1] - p[1])} d={q[0] - p[0]} /> = <span className="c2">{minus(a)}</span>
        </span>
        <span className="mline">
          {minus(p[1])} = {minus(a)} · {par(p[0])} + <V c="b" />
        </span>
        <span className="mline">
          <V c="b" /> = {minus(p[1])} {a * p[0] < 0 ? '+' : '−'} {Math.abs(a * p[0])} = <span className="pen">{minus(b)}</span>
        </span>
      </>
    );
  return (
    <>
      <span className="mline">
        <Y /> − {par(p[1])} = {minus(a)}(<X /> − {par(p[0])})
      </span>
      <span className="mline">
        <Y /> = <Poly a={0} b={a} c={-a * p[0]} /> {p[1] < 0 ? '−' : '+'} {Math.abs(p[1])}
      </span>
    </>
  );
};

export const OvSelv: React.FC = () => {
  const [niva, setNiva] = useState<Niva>('les');
  const [t, setT] = useState(() => lagOppgave('les'));
  const [inpA, setInpA] = useState('');
  const [inpB, setInpB] = useState('');
  const [fb, setFb] = useState<Tilbakemelding>(null);
  const [losning, setLosning] = useState(false);
  const [lost, setLost] = useState(false);
  const [antall, setAntall] = useState(0);

  const nyOppgave = (n: Niva) => {
    setT(lagOppgave(n));
    setInpA('');
    setInpB('');
    setFb(null);
    setLosning(false);
    setLost(false);
  };

  const sjekk = (e: React.FormEvent) => {
    e.preventDefault();
    const a = lesTall(inpA);
    const b = lesTall(inpB);
    if (!isFinite(a) || !isFinite(b)) {
      setFb({ ok: false, msg: 'Skriv inn både a og b. Desimaltall skrives med komma, brøk som 3/2.' });
      return;
    }
    const aOk = near(a, t.a);
    const bOk = near(b, t.b);
    if (aOk && bOk) {
      setFb({ ok: true, msg: 'Riktig!' });
      if (!lost) {
        setLost(true);
        setAntall((n) => n + 1);
      }
      return;
    }
    if (aOk) {
      setFb({
        ok: false,
        msg:
          t.niva === 'les'
            ? 'Stigningstallet er riktig. Hvor skjærer linja y-aksen?'
            : 'Stigningstallet er riktig. Sett inn punktet i y = ax + b og finn b.',
      });
      return;
    }
    if (near(a, -t.a)) {
      setFb({ ok: false, msg: 'Sjekk fortegnet på stigningstallet. Stiger eller synker linja mot høyre?' });
      return;
    }
    if (t.niva === 'topunkt' && near(a, 1 / t.a)) {
      setFb({ ok: false, msg: 'Har du delt Δx på Δy? Stigningstallet er Δy/Δx.' });
      return;
    }
    setFb({
      ok: false,
      msg:
        t.niva === 'les'
          ? 'Gå én rute til høyre fra et punkt på linja. Hvor mye går du opp eller ned?'
          : t.niva === 'topunkt'
            ? 'Regn ut (y₂ − y₁)/(x₂ − x₁). Husk parentes rundt negative tall.'
            : 'Stigningstallet står i oppgaven. Sett inn i y − y₀ = a(x − x₀).',
    });
  };

  const vis = t.niva === 'les' || lost || losning;

  return (
    <div className="slide">
      <div className="kicker">Øv selv</div>
      <h2>Finn likningen y = ax + b</h2>
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
            {t.niva === 'les' && <>Grafen viser en rett linje. Les av stigningstallet og konstantleddet.</>}
            {t.niva === 'topunkt' && (
              <>
                Linja går gjennom <b className="nw">{pkt(t.p)}</b> og <b className="nw">{pkt(t.q)}</b>.
              </>
            )}
            {t.niva === 'ettpunkt' && (
              <>
                Linja har stigningstallet <b>{minus(t.a)}</b> og går gjennom <b className="nw">{pkt(t.p)}</b>.
              </>
            )}
          </div>
          <div className="row" style={{ alignItems: 'end' }}>
            <span className="math">
              <Y /> =
            </span>
            <div className="field">
              <label htmlFor="ov-a" className="c2">
                a
              </label>
              <input id="ov-a" autoComplete="off" value={inpA} onChange={(e) => setInpA(e.target.value)} />
            </div>
            <span className="math">
              <X /> +
            </span>
            <div className="field">
              <label htmlFor="ov-b" className="pen">
                b
              </label>
              <input id="ov-b" autoComplete="off" value={inpB} onChange={(e) => setInpB(e.target.value)} />
            </div>
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
              <p className="math">
                <Y /> = <Poly a={0} b={t.a} c={t.b} />
              </p>
            </div>
          )}
        </form>
        <div className="stack">
          {vis && (
            <FunkGraf
              kurver={[{ f: (x) => t.a * x + t.b }]}
              punkter={
                t.niva === 'les'
                  ? []
                  : [
                      { x: t.p[0], y: t.p[1], farge: 'pen', navn: pkt(t.p), plass: 'venstre' as const },
                      ...(t.niva === 'topunkt'
                        ? [{ x: t.q[0], y: t.q[1], farge: 'pen', navn: pkt(t.q), plass: 'hoyre' as const }]
                        : []),
                    ]
              }
              xmin={-7}
              xmax={7}
              ymin={-9}
              ymax={9}
              xetikett={1}
              h={400}
              title="Grafen til linja i oppgaven"
            />
          )}
          {!vis && (
            <p className="muted small">
              {t.niva === 'topunkt'
                ? 'Finn a = Δy/Δx først, og sett så inn ett av punktene for å finne b.'
                : 'Bruk ettpunktsformelen y − y₀ = a(x − x₀) og løs med hensyn på y.'}{' '}
              Grafen vises når du har løst oppgaven. Trykk Enter for å sjekke.
            </p>
          )}
          {t.niva === 'les' && !lost && !losning && (
            <p className="muted small">Hint: start der linja skjærer y-aksen. Trykk Enter for å sjekke.</p>
          )}
        </div>
      </div>
    </div>
  );
};
