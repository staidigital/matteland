import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Op, Poly, X, fmt, minus, near, par } from '../../../../presentasjon/matte';
import { lesTall } from '../../nullpunktsfaktorisering/oppgaver';
import { Fx } from '../../funksjoner/felles';
import { NIVAER, type Niva, type Oppgave, lagOppgave, verdi } from '../oppgaver';

type Tilbakemelding = { ok: boolean; msg: string } | null;

const OPPGAVETEKST: Record<Niva, string> = {
  yakse: 'Finn skjæringspunktet med y-aksen',
  nullpunkt: 'Finn skjæringspunktet med x-aksen',
  linjer: 'Finn skjæringspunktet mellom grafene',
};

/** Utregningen, linje for linje */
const Losning: React.FC<{ t: Oppgave }> = ({ t }) => {
  const { f, g } = t;
  if (t.niva === 'yakse')
    return (
      <span className="mline">
        <Fx x="0" />
        <Op>=</Op>
        {minus(f.a)} · 0 {f.b < 0 ? '−' : '+'} {Math.abs(f.b)}
        <Op>=</Op>
        <span className="c2">{minus(f.b)}</span>
      </span>
    );
  if (t.niva === 'nullpunkt')
    return (
      <>
        <span className="mline">
          <Poly a={0} b={f.a} c={f.b} /> = 0
        </span>
        <span className="mline">
          <Poly a={0} b={f.a} c={0} /> = {minus(-f.b)}
        </span>
        <span className="mline">
          <X /> = {minus(-f.b)} : {par(f.a)} = <span className="c1">{minus(t.x)}</span>
        </span>
      </>
    );
  const da = f.a - g.a;
  return (
    <>
      <span className="mline">
        <Poly a={0} b={f.a} c={f.b} /> = <Poly a={0} b={g.a} c={g.b} />
      </span>
      <span className="mline">
        <Poly a={0} b={da} c={0} /> = {minus(g.b - f.b)}
      </span>
      <span className="mline">
        <X /> = <span className="c1">{minus(t.x)}</span>
      </span>
      <span className="mline">
        <Fx x={minus(t.x)} /> = {minus(f.a)} · {par(t.x)} {f.b < 0 ? '−' : '+'} {Math.abs(f.b)} ={' '}
        <span className="c2">{minus(t.y)}</span>
      </span>
    </>
  );
};

export const OvSelv: React.FC = () => {
  const [niva, setNiva] = useState<Niva>('yakse');
  const [t, setT] = useState(() => lagOppgave('yakse'));
  const [inpX, setInpX] = useState('');
  const [inpY, setInpY] = useState('');
  const [fb, setFb] = useState<Tilbakemelding>(null);
  const [losning, setLosning] = useState(false);
  const [lost, setLost] = useState(false);
  const [antall, setAntall] = useState(0);

  const nyOppgave = (n: Niva) => {
    setT(lagOppgave(n));
    setInpX('');
    setInpY('');
    setFb(null);
    setLosning(false);
    setLost(false);
  };

  const sjekk = (e: React.FormEvent) => {
    e.preventDefault();
    const x = lesTall(inpX);
    const y = lesTall(inpY);
    if (!isFinite(x) || !isFinite(y)) {
      setFb({ ok: false, msg: 'Skriv inn begge koordinatene. Desimaltall skrives med komma, brøk som 3/2.' });
      return;
    }
    if (near(x, t.x) && near(y, t.y)) {
      setFb({ ok: true, msg: `Riktig! Skjæringspunktet er (${minus(t.x)} , ${minus(t.y)}).` });
      if (!lost) {
        setLost(true);
        setAntall((n) => n + 1);
      }
      return;
    }
    if (near(x, t.y) && near(y, t.x)) {
      setFb({ ok: false, msg: 'Har du byttet om x og y? Punktet skrives (x , y).' });
      return;
    }
    if (t.niva === 'yakse') {
      setFb({ ok: false, msg: near(x, 0) ? 'På y-aksen er x = 0. Regn ut f(0).' : 'Alle punkter på y-aksen har x = 0.' });
      return;
    }
    if (t.niva === 'nullpunkt') {
      setFb({
        ok: false,
        msg: !near(y, 0)
          ? 'Alle punkter på x-aksen har y = 0.'
          : `Sett inn x = ${fmt(x)}: da blir f(x) = ${fmt(verdi(t.f, x))}, ikke 0.`,
      });
      return;
    }
    if (near(x, t.x)) {
      setFb({ ok: false, msg: 'Riktig x! Sett x inn i f(x) eller g(x) for å finne y.' });
      return;
    }
    setFb({
      ok: false,
      msg: `Sett inn x = ${fmt(x)}: f(x) = ${fmt(verdi(t.f, x))} og g(x) = ${fmt(verdi(t.g, x))}. De må være like.`,
    });
  };

  const linjer = t.niva === 'linjer';
  const ymin = Math.min(-8, t.y - 4);
  const ymax = Math.max(8, t.y + 4);

  return (
    <div className="slide">
      <div className="kicker">Øv selv</div>
      <h2>{OPPGAVETEKST[t.niva]}</h2>
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
          <div className="boxed math big">
            <span className="mline">
              <Fx />
              <Op>=</Op>
              <span className={linjer ? 'c1' : undefined}>
                <Poly a={0} b={t.f.a} c={t.f.b} />
              </span>
            </span>
            {linjer && (
              <span className="mline">
                <Fx f="g" />
                <Op>=</Op>
                <span className="c2">
                  <Poly a={0} b={t.g.a} c={t.g.b} />
                </span>
              </span>
            )}
          </div>
          <div className="row" style={{ alignItems: 'end' }}>
            <span className="math">(</span>
            <div className="field">
              <label htmlFor="ov-x">
                <X />
              </label>
              <input id="ov-x" autoComplete="off" value={inpX} onChange={(e) => setInpX(e.target.value)} />
            </div>
            <span className="math">,</span>
            <div className="field">
              <label htmlFor="ov-y">
                <i className="v">y</i>
              </label>
              <input id="ov-y" autoComplete="off" value={inpY} onChange={(e) => setInpY(e.target.value)} />
            </div>
            <span className="math">)</span>
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
        </form>
        <div className="stack">
          {losning && (
            <div className="panel reveal stack" style={{ gap: 8 }}>
              <h3>Løsning</h3>
              <p className="math">
                <Losning t={t} />
              </p>
              <p>
                Skjæringspunktet er{' '}
                <b className="pen nw">
                  ({minus(t.x)} , {minus(t.y)})
                </b>
                .
              </p>
            </div>
          )}
          {(lost || losning) && (
            <FunkGraf
              kurver={[
                { f: (x) => verdi(t.f, x), farge: linjer ? 'c1' : undefined },
                ...(linjer ? [{ f: (x: number) => verdi(t.g, x), farge: 'c2' }] : []),
              ]}
              punkter={[
                {
                  x: t.x,
                  y: t.y,
                  farge: 'pen',
                  navn: `(${minus(t.x)} , ${minus(t.y)})`,
                  plass: t.x > 2 ? 'venstre' : 'hoyre',
                },
              ]}
              xmin={-8}
              xmax={8}
              ymin={ymin}
              ymax={ymax}
              ysteg={ymax - ymin > 24 ? 2 : 1}
              h={300}
              title="Grafen til funksjonene i oppgaven med skjæringspunktet markert"
            />
          )}
          {!losning && !lost && (
            <p className="muted small">
              {t.niva === 'yakse'
                ? 'På y-aksen er x = 0.'
                : t.niva === 'nullpunkt'
                  ? 'På x-aksen er y = 0. Løs f(x) = 0.'
                  : 'Løs f(x) = g(x), og sett x inn i en av funksjonene.'}{' '}
              Trykk Enter for å sjekke.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
