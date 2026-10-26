import React, { useState } from 'react';
import { FunkGraf } from '../../../../presentasjon/FunkGraf';
import { Frac, Op, Poly, X, fmt, minus, near, par } from '../../../../presentasjon/matte';
import { lesTall } from '../../nullpunktsfaktorisering/oppgaver';
import { NIVAER, type Niva, type Oppgave, lagOppgave, verdi } from '../oppgaver';
import { Fx } from '../felles';

type Tilbakemelding = { ok: boolean; msg: string } | null;

/** f(k) = 2·(−3)² − (−3) + 4 = 18 + 3 + 4 = 25, ledd for ledd */
const Innsatt: React.FC<{ t: Oppgave }> = ({ t }) => {
  const k = t.k;
  const ledd = ([[t.a, 2], [t.b, 1], [t.c, 0]] as const).filter(([koef]) => koef !== 0);
  const fortegn = (n: number, i: number) => (i === 0 ? (n < 0 ? '−' : '') : <Op>{n < 0 ? '−' : '+'}</Op>);
  return (
    <>
      <span className="mline">
        <Fx x={minus(k)} />
        <Op>=</Op>
        {ledd.map(([koef, p], i) => (
          <React.Fragment key={p}>
            {fortegn(koef, i)}
            {p === 0 ? Math.abs(koef) : (Math.abs(koef) === 1 ? '' : Math.abs(koef) + '·') + par(k)}
            {p === 2 && <sup>2</sup>}
          </React.Fragment>
        ))}
      </span>
      <span className="mline">
        <Op>=</Op>
        {ledd.map(([koef, p], i) => {
          const v = koef * k ** p;
          return (
            <React.Fragment key={p}>
              {fortegn(v, i)}
              {Math.abs(v)}
            </React.Fragment>
          );
        })}
        <Op>=</Op>
        <span className="c2">{minus(verdi(t, k))}</span>
      </span>
    </>
  );
};

export const OvSelv: React.FC = () => {
  const [niva, setNiva] = useState<Niva>('lineaer');
  const [t, setT] = useState(() => lagOppgave('lineaer'));
  const [inp, setInp] = useState('');
  const [fb, setFb] = useState<Tilbakemelding>(null);
  const [losning, setLosning] = useState(false);
  const [lost, setLost] = useState(false);
  const [antall, setAntall] = useState(0);

  const v = verdi(t, t.k);
  const finnx = t.niva === 'finnx';

  const nyOppgave = (n: Niva) => {
    setT(lagOppgave(n));
    setInp('');
    setFb(null);
    setLosning(false);
    setLost(false);
  };

  const sjekk = (e: React.FormEvent) => {
    e.preventDefault();
    const svar = lesTall(inp);
    if (!isFinite(svar)) {
      setFb({ ok: false, msg: 'Skriv inn et tall. Desimaltall skrives med komma, brøk som 3/2.' });
      return;
    }
    if (near(svar, finnx ? t.k : v)) {
      setFb({ ok: true, msg: finnx ? `Riktig! Sjekk: f(${minus(t.k)}) = ${minus(v)}.` : 'Riktig!' });
      if (!lost) {
        setLost(true);
        setAntall((n) => n + 1);
      }
      return;
    }
    if (finnx) {
      setFb({ ok: false, msg: `Sett inn x = ${fmt(svar)}: da blir f(x) = ${fmt(verdi(t, svar))}, ikke ${minus(v)}.` });
      return;
    }
    if (t.k < 0 && t.a !== 0 && near(svar, -t.a * t.k * t.k + t.b * t.k + t.c)) {
      setFb({ ok: false, msg: `Pass på kvadratet: (${minus(t.k)})² = ${t.k * t.k}, ikke −${t.k * t.k}.` });
      return;
    }
    setFb({ ok: false, msg: `Ikke helt. Bytt ut hver x med ${par(t.k)} og regn ut. Husk parentes rundt negative tall.` });
  };

  const ymin = Math.min(-10, Math.floor((v - 6) / 5) * 5);
  const ymax = Math.max(10, Math.ceil((v + 6) / 5) * 5);
  const span = ymax - ymin;
  const ysteg = span > 60 ? 10 : span > 30 ? 5 : 2;

  return (
    <div className="slide">
      <div className="kicker">Øv selv</div>
      <h2>{finnx ? 'Finn x-verdien' : 'Regn ut funksjonsverdien'}</h2>
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
            <Fx />
            <Op>=</Op>
            <Poly a={t.a} b={t.b} c={t.c} />
          </div>
          <p className="math">
            {finnx ? (
              <>
                Finn <X /> slik at <Fx /> = {minus(v)}.
              </>
            ) : (
              <>
                Finn <Fx x={minus(t.k)} />.
              </>
            )}
          </p>
          <div className="field">
            <label htmlFor="ov-svar">{finnx ? <X /> : <Fx x={minus(t.k)} />}</label>
            <input id="ov-svar" autoComplete="off" value={inp} onChange={(e) => setInp(e.target.value)} />
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
                {finnx ? (
                  <>
                    <span className="mline">
                      <Poly a={0} b={t.b} c={t.c} /> = {minus(v)}
                    </span>
                    <span className="mline">
                      {t.b === 1 ? '' : t.b === -1 ? '−' : minus(t.b)}
                      <X /> = {minus(v)} {t.c < 0 ? '+' : '−'} {Math.abs(t.c)} = {minus(v - t.c)}
                    </span>
                    <span className="mline">
                      <X /> = <Frac n={minus(v - t.c)} d={minus(t.b)} /> = <span className="c1">{minus(t.k)}</span>
                    </span>
                  </>
                ) : (
                  <Innsatt t={t} />
                )}
              </p>
            </div>
          )}
          {(lost || losning) && (
            <FunkGraf
              kurver={[{ f: (x) => verdi(t, x) }]}
              punkter={[
                {
                  x: t.k,
                  y: v,
                  farge: 'pen',
                  navn: `(${minus(t.k)} , ${minus(v)})`,
                  plass: t.k > 3 ? 'venstre' : 'hoyre',
                },
              ]}
              xmin={-7}
              xmax={7}
              ymin={ymin}
              ymax={ymax}
              ysteg={ysteg}
              h={300}
              ynavn="f(x)"
              title="Grafen til funksjonen i oppgaven med svaret markert"
            />
          )}
          {!losning && !lost && (
            <p className="muted small">
              {finnx
                ? 'Sett uttrykket lik verdien og løs likningen.'
                : 'Bytt ut hver x med tallet, med parentes rundt negative tall.'}{' '}
              Trykk Enter for å sjekke.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
