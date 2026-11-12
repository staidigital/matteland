import React, { useEffect, useId, useRef, useState } from 'react';
import { Feilboks, PythonStatus } from './Kodeboks';
import { fargeleggLinje } from './fargelegg';
import { kjor } from './motor';
import './python.css';

type Linje = {
  inn: string;
  ut: string;
  feil?: [string, string, number | null];
  /** Teksten fra input() når linja venter på svar */
  inndata?: string;
};

/** Python-konsoll: skriv én linje, trykk Enter og se svaret med en gang. Variablene huskes til du trykker «Tøm». */
export const Konsoll: React.FC<{ forslag?: string[] }> = ({ forslag }) => {
  const id = useId();
  const [historikk, setHistorikk] = useState<Linje[]>([]);
  const [linje, setLinje] = useState('');
  const [kjorer, setKjorer] = useState(false);
  const [bla, setBla] = useState<number | null>(null);
  const inp = useRef<HTMLInputElement>(null);

  const nullstill = () => kjor({ modus: 'nullstill', kode: '', konsoll: id }, () => {});

  // Et nytt besøk på lysbildet starter med tomme variabler
  useEffect(() => {
    kjor({ modus: 'nullstill', kode: '', konsoll: id }, () => {});
  }, [id]);

  /** Kjører linja. Med svar kjøres den samme linja på nytt med svaret til input(). */
  const send = (kode: string, svar?: string[]) => {
    if (!kode.trim() || kjorer) return false;
    setKjorer(true);
    const ny = !svar;
    if (ny) setHistorikk((h) => [...h, { inn: kode, ut: '' }]);
    let forste = true;
    const oppdaterSiste = (f: (l: Linje) => Linje) => setHistorikk((h) => [...h.slice(0, -1), f(h[h.length - 1])]);
    kjor({ modus: 'konsoll', kode, konsoll: id, svar }, (t) => {
      const f = forste;
      forste = false;
      oppdaterSiste((l) => ({ ...l, ut: f ? t : l.ut + t }));
    }).promise.then((r) => {
      setKjorer(false);
      oppdaterSiste((l) => ({ ...l, ut: forste ? '' : l.ut, feil: r.feil, inndata: r.inndata }));
      inp.current?.focus();
    });
    return true;
  };

  const sendLinje = (e: React.FormEvent) => {
    e.preventDefault();
    if (!send(linje)) return;
    setLinje('');
    setBla(null);
  };

  const tidligere = historikk.map((h) => h.inn);
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
    e.preventDefault();
    if (tidligere.length === 0) return;
    let n = bla ?? tidligere.length;
    n = e.key === 'ArrowUp' ? Math.max(0, n - 1) : n + 1;
    if (n >= tidligere.length) {
      setBla(null);
      setLinje('');
    } else {
      setBla(n);
      setLinje(tidligere[n]);
    }
  };

  const siste = historikk[historikk.length - 1];
  const venter = !kjorer && siste?.inndata !== undefined;

  return (
    <div className="py py-konsoll">
      <div className="py-topp">
        <span className="py-fil">Konsoll</span>
        <PythonStatus />
        <span className="py-knapper">
          <button
            className="btn"
            onClick={() => {
              nullstill();
              setHistorikk([]);
              inp.current?.focus();
            }}
            disabled={historikk.length === 0}
            title="Tøm konsollen og glem variablene"
          >
            Tøm
          </button>
        </span>
      </div>
      <div className="py-konsoll-ut" onClick={() => window.getSelection()?.isCollapsed && inp.current?.focus()}>
        {historikk.map((h, i) => (
          <div key={i} className="py-post">
            <div className="py-innlinje">
              <span className="py-prompt" aria-hidden="true">
                &gt;&gt;&gt;
              </span>
              <code>{fargeleggLinje(h.inn)}</code>
            </div>
            {(h.ut || h.inndata !== undefined) && (
              <pre className="py-res">
                {h.ut}
                {venter && i === historikk.length - 1 && (
                  <form
                    className="py-svar"
                    onSubmit={(e) => {
                      e.preventDefault();
                      send(h.inn, [new FormData(e.currentTarget).get('svar') as string]);
                    }}
                  >
                    <input name="svar" autoFocus autoComplete="off" aria-label="Svar til programmet" />
                  </form>
                )}
              </pre>
            )}
            {h.feil && <Feilboks feil={h.feil} kompakt />}
          </div>
        ))}
        {!venter && (
          <form className="py-innlinje" onSubmit={sendLinje}>
            <span className="py-prompt" aria-hidden="true">
              &gt;&gt;&gt;
            </span>
            <input
              ref={inp}
              value={linje}
              onChange={(e) => setLinje(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label="Python-konsoll: skriv en linje og trykk Enter"
              placeholder={historikk.length === 0 ? 'Skriv et regnestykke og trykk Enter' : undefined}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </form>
        )}
      </div>
      {forslag && (
        <div className="row small" style={{ gap: 6 }}>
          <span className="muted">Prøv:</span>
          {forslag.map((f) => (
            <button
              key={f}
              className="btn py-forslag"
              onClick={() => {
                setLinje(f);
                inp.current?.focus();
              }}
            >
              <code>{f}</code>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
