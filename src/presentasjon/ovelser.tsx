import React, { useState } from 'react';
import { lesTall } from '../pages/1t/nullpunktsfaktorisering/oppgaver';
import type { LysbildeProps } from './ui';

/* ---------- utregning som vises steg for steg ---------- */

export type Trinn = { m: React.ReactNode; t?: React.ReactNode };

/** Nummerert utregning. Viser de `frag - fra` første trinnene, eller alle hvis frag er utelatt. */
export const Utregning: React.FC<{ trinn: Trinn[]; frag?: number; fra?: number }> = ({ trinn, frag, fra = 0 }) => (
  <ol className="steps">
    {trinn.map(
      (l, i) =>
        (frag === undefined || frag - fra > i) && (
          <li key={i} className="reveal">
            <span className="no">{i + 1}</span>
            <div>
              <div className="math">{l.m}</div>
              {l.t && <p className="small muted">{l.t}</p>}
            </div>
          </li>
        ),
    )}
  </ol>
);

/* ---------- «Prøv selv» ---------- */

export type ProvOppgave = { sporsmal: React.ReactNode; svar: React.ReactNode };

/** Rutenett med oppgaver der svaret vises med en knapp eller med → */
export const ProvOppgaver: React.FC<LysbildeProps & { oppgaver: ProvOppgave[] }> = ({ oppgaver, frag, setFrag }) => (
  <>
    <div className="grid2">
      {oppgaver.map((o, i) => (
        <div className="panel stack" key={i} style={{ gap: 10 }}>
          <p>
            <b className="pen">{'abcdefgh'[i]}</b> &nbsp;{o.sporsmal}
          </p>
          {frag > i ? (
            <div className="math reveal">{o.svar}</div>
          ) : (
            <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
              Vis svar
            </button>
          )}
        </div>
      ))}
    </div>
    <p className="hintline">Regn i boka først, og sammenlign med sidemannen før du viser svaret.</p>
  </>
);

/* ---------- «Vanlige feil» ---------- */

export type Feil = { t: string; oppsett: React.ReactNode; feil: React.ReactNode; riktig: React.ReactNode; hvorfor: React.ReactNode };

/** Tre kort med en typisk feil, der det riktige svaret vises med en knapp eller med → */
export const FeilListe: React.FC<LysbildeProps & { feil: Feil[] }> = ({ feil, frag, setFrag }) => (
  <>
    <div className="traps">
      {feil.map((k, i) => (
        <div className="panel stack" key={i} style={{ gap: 10 }}>
          <h3>{k.t}</h3>
          <div className="math" style={{ fontSize: '1.1em' }}>
            {k.oppsett}
          </div>
          <div className="math wrong">
            <span className="tag">Feil</span>
            {k.feil}
          </div>
          {frag > i ? (
            <>
              <div className="math right reveal">
                <span className="tag">Riktig</span>
                <span style={{ color: 'var(--ink)' }}>{k.riktig}</span>
              </div>
              <p className="small reveal">{k.hvorfor}</p>
            </>
          ) : (
            <button className="btn" onClick={() => setFrag(i + 1)} style={{ alignSelf: 'start' }}>
              Vis riktig
            </button>
          )}
        </div>
      ))}
    </div>
    <p className="hintline">Diskuter med sidemannen før du viser svaret.</p>
  </>
);

/* ---------- «Øv selv» ---------- */

export type Svar = {
  /** Feltene lest som tall, NaN hvis feltet er tomt eller ugyldig */
  tall: number[];
  /** Feltene slik de ble skrevet */
  tekst: string[];
  /** Indeksen til valgt knapp, eller null */
  valg: number | null;
};

export type Ovelse = {
  oppgave: React.ReactNode;
  instruks: React.ReactNode;
  /** Svarfelter: tekst foran og bak hvert felt (bruk tomt array når oppgaven har svarknapper) */
  felt?: { navn: string; foran?: React.ReactNode; bak?: React.ReactNode }[];
  /** Svarknapper */
  valg?: React.ReactNode[];
  /** Returnerer null når svaret er riktig, ellers et hint */
  vurder: (s: Svar) => string | null;
  losning: React.ReactNode;
  /** Figur eller tips ved siden av oppgaven */
  side?: React.ReactNode;
};

type RammeProps<N extends string> = {
  tittel: string;
  nivaer: [N, string][];
  lag: (niva: N) => Ovelse;
};

/** Oppgavegenerator med nivåvalg, sjekk, løsning og teller */
export function OvSelvRamme<N extends string>({ tittel, nivaer, lag }: RammeProps<N>) {
  const [niva, setNiva] = useState<N>(nivaer[0][0]);
  const [o, setO] = useState(() => lag(nivaer[0][0]));
  const [inp, setInp] = useState<string[]>([]);
  const [valgt, setValgt] = useState<number | null>(null);
  const [fb, setFb] = useState<{ ok: boolean; msg: string } | null>(null);
  const [losning, setLosning] = useState(false);
  const [lost, setLost] = useState(false);
  const [antall, setAntall] = useState(0);

  const nyOppgave = (n: N) => {
    setO(lag(n));
    setInp([]);
    setValgt(null);
    setFb(null);
    setLosning(false);
    setLost(false);
  };

  const felt = o.felt ?? [];

  const sjekk = (e: React.FormEvent) => {
    e.preventDefault();
    const tekst = felt.map((_, i) => (inp[i] ?? '').trim());
    if (o.valg && valgt === null) return setFb({ ok: false, msg: 'Velg et svar først.' });
    if (tekst.some((t) => !t)) return setFb({ ok: false, msg: 'Fyll ut alle feltene først.' });
    const tall = tekst.map(lesTall);
    if (tall.some((t) => !isFinite(t)))
      return setFb({ ok: false, msg: 'Skriv tall. Desimaltall skrives med komma, brøk som 3/4.' });
    const hint = o.vurder({ tall, tekst, valg: valgt });
    if (hint) return setFb({ ok: false, msg: hint });
    setFb({ ok: true, msg: 'Riktig!' });
    if (!lost) {
      setLost(true);
      setAntall((n) => n + 1);
    }
  };

  return (
    <div className="slide">
      <div className="kicker">Øv selv</div>
      <h2>{tittel}</h2>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div className="row" role="group" aria-label="Oppgavetype" style={{ gap: 6 }}>
          {nivaer.map(([k, l]) => (
            <button
              key={k}
              className={'btn' + (niva === k ? ' primary' : '')}
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
            <span className="math">{o.oppgave}</span>
            <span className="mline small" style={{ marginTop: 6 }}>
              {o.instruks}
            </span>
          </div>
          {o.valg && (
            <div className="row" role="group" aria-label="Svaralternativer">
              {o.valg.map((v, i) => (
                <button
                  type="button"
                  key={i}
                  className={'btn' + (valgt === i ? ' on' : '')}
                  aria-pressed={valgt === i}
                  onClick={() => setValgt(i)}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
          {felt.length > 0 && (
            <div className="row">
              {felt.map((f, i) => (
                <React.Fragment key={i}>
                  {f.foran && <span className="math">{f.foran}</span>}
                  <span className="field">
                    <input
                      aria-label={f.navn}
                      autoComplete="off"
                      inputMode="text"
                      value={inp[i] ?? ''}
                      onChange={(e) => {
                        const neste = [...inp];
                        neste[i] = e.target.value;
                        setInp(neste);
                      }}
                    />
                  </span>
                  {f.bak && <span className="math">{f.bak}</span>}
                </React.Fragment>
              ))}
            </div>
          )}
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
          {o.side}
          {losning && (
            <div className="panel reveal stack" style={{ gap: 8 }}>
              <h3>Løsning</h3>
              <div className="math">{o.losning}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
