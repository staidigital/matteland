import React, { useState } from 'react';
import { Graf } from '../../../../presentasjon/Graf';
import { Factor, FactorForm, Factored, Frac, Num, Op, Poly, V, X, X1, X2, fmt, minus, near, par } from '../../../../presentasjon/matte';
import { NIVAER, type Niva, lagOppgave, lesTall } from '../oppgaver';

type Tilbakemelding = { ok: boolean; msg: string } | null;
const TOM = { a: '', x1: '', x2: '' };

export const OvSelv: React.FC = () => {
  const [niva, setNiva] = useState<Niva>('enkel');
  const [t, setT] = useState(() => lagOppgave('enkel'));
  const [inp, setInp] = useState(TOM);
  const [fb, setFb] = useState<Tilbakemelding>(null);
  const [hint, setHint] = useState(false);
  const [losning, setLosning] = useState(false);
  const [lost, setLost] = useState(false);
  const [antall, setAntall] = useState(0);

  const b = -t.a * (t.r1 + t.r2);
  const c = t.a * t.r1 * t.r2;
  const D = b * b - 4 * t.a * c;
  const rotD = Math.round(Math.sqrt(D));

  const nyOppgave = (n: Niva) => {
    setT(lagOppgave(n));
    setInp(TOM);
    setFb(null);
    setHint(false);
    setLosning(false);
    setLost(false);
  };

  const A = lesTall(inp.a);
  const u = lesTall(inp.x1);
  const w = lesTall(inp.x2);
  const utfylt = [A, u, w].every(isFinite) && A !== 0;

  const sjekk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utfylt) {
      setFb({ ok: false, msg: 'Fyll inn a, x₁ og x₂. Brøk kan skrives som 3/2, desimaltall med komma.' });
      return;
    }
    const rotterOk = (near(u, t.r1) && near(w, t.r2)) || (near(u, t.r2) && near(w, t.r1));
    if (rotterOk && near(A, t.a)) {
      setFb({ ok: true, msg: 'Riktig! Gang gjerne ut for å se at du får uttrykket tilbake.' });
      if (!lost) {
        setLost(true);
        setAntall((n) => n + 1);
      }
      return;
    }
    if (rotterOk) {
      setFb({ ok: false, msg: 'Nullpunktene stemmer. Sjekk a: det er tallet foran x².' });
      return;
    }
    const galt = [u, w].find((z) => !near(z, t.r1) && !near(z, t.r2));
    if (galt !== undefined) {
      const verdi = t.a * galt * galt + b * galt + c;
      setFb({ ok: false, msg: `Sett inn x = ${fmt(galt)} i uttrykket. Da blir det ${fmt(verdi)}, ikke 0.` });
      return;
    }
    setFb({ ok: false, msg: 'Du har skrevet samme nullpunkt to ganger. Dette uttrykket har to ulike nullpunkter.' });
  };

  const p = Math.round(t.r2 * t.a); // telleren når r2 = p/a

  return (
    <div className="slide">
      <div className="kicker">Øv selv</div>
      <h2>Faktoriser uttrykket</h2>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="seg" role="group" aria-label="Vanskelighetsgrad">
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
            <Poly a={t.a} b={b} c={c} />
          </div>
          <p>
            Finn <V c="a" /> og nullpunktene. Da kan uttrykket skrives som{' '}
            <span className="math">
              <FactorForm />
            </span>
            .
          </p>
          <div className="row" style={{ gap: 16 }}>
            <div className="field">
              <label htmlFor="p-a">
                <V c="a" />
              </label>
              <input id="p-a" autoComplete="off" value={inp.a} onChange={(e) => setInp({ ...inp, a: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="p-x1">
                <X1 />
              </label>
              <input id="p-x1" autoComplete="off" value={inp.x1} onChange={(e) => setInp({ ...inp, x1: e.target.value })} />
            </div>
            <div className="field">
              <label htmlFor="p-x2">
                <X2 />
              </label>
              <input id="p-x2" autoComplete="off" value={inp.x2} onChange={(e) => setInp({ ...inp, x2: e.target.value })} />
            </div>
          </div>
          <div className="muted">
            Din faktorisering:{' '}
            <span className="math" style={{ color: 'var(--ink)' }}>
              {utfylt ? <Factored a={A} r1={u} r2={w} c1="" c2="" /> : '…'}
            </span>
          </div>
          <div className="row">
            <button type="submit" className="btn primary">
              Sjekk
            </button>
            <button type="button" className="btn" onClick={() => setHint(true)}>
              Hint
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
          {hint && (
            <div className="panel reveal stack" style={{ gap: 8 }}>
              <h3>Hint</h3>
              <p>
                Her er{' '}
                <span className="math">
                  <V c="a" /> = {minus(t.a)}
                </span>
                ,{' '}
                <span className="math">
                  <V c="b" /> = <Num v={b} />
                </span>{' '}
                og{' '}
                <span className="math">
                  <V c="c" /> = <Num v={c} />
                </span>
                .
              </p>
              <p>
                Diskriminanten blir{' '}
                <span className="math">
                  <V c="D" /> = {par(b)}
                  <sup>2</sup> − 4·{par(t.a)}·{par(c)} = {D}
                </span>
                , og √{D} = {rotD}.
              </p>
            </div>
          )}
          {losning && (
            <div className="panel reveal stack" style={{ gap: 8 }}>
              <h3>Løsning</h3>
              <p className="math">
                <X /> ={' '}
                <Frac
                  n={
                    <>
                      {minus(-b)} ± {rotD}
                    </>
                  }
                  d={minus(2 * t.a)}
                />{' '}
                &nbsp; gir &nbsp;{' '}
                <span className="c1">
                  <Num v={t.r1} />
                </span>{' '}
                og{' '}
                <span className="c2">
                  <Num v={t.r2} />
                </span>
              </p>
              <p className="math">
                <Poly a={t.a} b={b} c={c} />
                <Op>=</Op>
                <Factored a={t.a} r1={t.r1} r2={t.r2} />
              </p>
              {t.niva === 'brok' && (
                <p className="math">
                  <Op>=</Op>
                  <Factor r={t.r1} cls="c1" />({t.a}
                  <X />
                  <Op>{p > 0 ? '−' : '+'}</Op>
                  {Math.abs(p)})
                </p>
              )}
            </div>
          )}
          {(lost || losning) && (
            <Graf
              a={t.a}
              b={b}
              c={c}
              h={300}
              ymin={-12}
              ymax={12}
              roots={[
                { x: t.r1, cls: 'c1', name: 'x₁' },
                { x: t.r2, cls: 'c2', name: 'x₂' },
              ]}
              title="Grafen til oppgaveuttrykket"
            />
          )}
          {!hint && !losning && !lost && (
            <p className="muted small">
              Skriv brøk som <code>3/2</code>. Rekkefølgen på nullpunktene spiller ingen rolle. Trykk Enter for å sjekke.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
