import React, { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { erAvbrudd, forklarFeil } from './feil';
import { fargeleggLinje } from './fargelegg';
import { forbered, hentStatus, kjor, lyttTilStatus } from './motor';
import type { Resultat, Variabel } from './worker';
import './python.css';

/* ---------- små byggeklosser som også brukes av konsollen ---------- */

/** Viser om Python er lastet */
export const PythonStatus: React.FC = () => {
  const status = useSyncExternalStore(lyttTilStatus, hentStatus);
  useEffect(forbered, []);
  if (status === 'klar') return null;
  return (
    <span className={'py-status' + (status === 'feil' ? ' bad' : '')} role="status">
      {status === 'feil' ? 'Python kunne ikke lastes' : 'Laster Python …'}
    </span>
  );
};

export const Feilboks: React.FC<{ feil: [string, string, number | null]; kompakt?: boolean }> = ({ feil, kompakt }) => {
  const [type, melding, linje] = feil;
  const avbrudd = erAvbrudd(type);
  const forklaring = forklarFeil(type, melding);
  return (
    <div className={'py-feil reveal' + (kompakt ? ' kompakt' : '')} role="alert">
      {!avbrudd && (
        <div className="py-feilkode">
          {linje && !kompakt ? <b>Linje {linje}: </b> : null}
          {type}
          {melding ? `: ${melding}` : ''}
        </div>
      )}
      {forklaring && <div className="py-forklaring">{forklaring}</div>}
    </div>
  );
};

const TYPENAVN: Record<string, string> = {
  int: 'heltall',
  float: 'desimaltall',
  str: 'tekst',
  bool: 'sann/usann',
  list: 'liste',
  function: 'funksjon',
};

const Variabeltabell: React.FC<{ variabler: Variabel[]; forrige?: Variabel[] }> = ({ variabler, forrige }) => {
  const gammel = new Map(forrige?.map(([n, v]) => [n, v]));
  return (
    <div className="py-var">
      <div className="py-etikett">Variabler</div>
      {variabler.length === 0 ? (
        <p className="small muted">Ingen variabler ennå.</p>
      ) : (
        <table>
          <tbody>
            {variabler.map(([navn, verdi, type]) => (
              <tr key={navn} className={forrige && gammel.get(navn) !== verdi ? 'endret' : undefined}>
                <th scope="row">{navn}</th>
                <td className="py-verdi">{verdi}</td>
                <td className="py-type" title={type}>
                  {TYPENAVN[type] ?? type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

/** Setter inn tekst der markøren står, og beholder angre-historikken når nettleseren lar oss */
function settInn(ta: HTMLTextAreaElement, s: string, oppdater: (v: string) => void) {
  if (!document.execCommand('insertText', false, s)) {
    ta.setRangeText(s, ta.selectionStart, ta.selectionEnd, 'end');
    oppdater(ta.value);
  }
}

/** Sletter tegnene fra og med `fra` til `til` */
function slett(ta: HTMLTextAreaElement, fra: number, til: number, oppdater: (v: string) => void) {
  ta.setSelectionRange(fra, til);
  if (!document.execCommand('delete')) {
    ta.setRangeText('', fra, til, 'end');
    oppdater(ta.value);
  }
}

/* ---------- kodeboksen ---------- */

type Props = {
  /** Koden som står der fra start, og som «Tilbakestill» henter fram igjen */
  kode: string;
  /** Navnet øverst i boksen */
  fil?: string;
  /** Vis tabell over variablene etter kjøring */
  variabler?: boolean;
  /** Vis knappen «Linje for linje» */
  linjeForLinje?: boolean;
  /** Minste antall linjer i editoren */
  minLinjer?: number;
};

/** Python-kode som kan endres og kjøres rett i lysbildet */
export const Kodeboks: React.FC<Props> = ({ kode, fil = 'program.py', variabler, linjeForLinje, minLinjer = 1 }) => {
  const [tekst, setTekst] = useState(kode);
  const [ut, setUt] = useState('');
  const [kjorer, setKjorer] = useState(false);
  const [res, setRes] = useState<Resultat | null>(null);
  const [kjortKode, setKjortKode] = useState<string | null>(null);
  const [svar, setSvar] = useState<string[]>([]);
  const [stegNr, setStegNr] = useState<number | null>(null);
  const jobb = useRef<ReturnType<typeof kjor> | null>(null);
  const startStegEtter = useRef(false);
  const esc = useRef(false);
  const ta = useRef<HTMLTextAreaElement>(null);

  // Stopp et program som går når lysbildet forlates
  useEffect(() => () => jobb.current?.avbryt(), []);

  const kjør = useCallback(
    (svarListe: string[] = []) => {
      if (jobb.current) return;
      setStegNr(null);
      setKjorer(true);
      let forste = true;
      const kode = tekst;
      const j = kjor({ modus: 'program', kode, svar: svarListe }, (t) => {
        const ny = forste;
        forste = false;
        setUt((u) => (ny ? t : u + t));
      });
      jobb.current = j;
      j.promise.then((r) => {
        if (jobb.current !== j) return;
        jobb.current = null;
        if (forste) setUt('');
        setKjorer(false);
        setRes(r);
        setSvar(svarListe);
        setKjortKode(kode);
        if (startStegEtter.current && r.inndata === undefined) {
          startStegEtter.current = false;
          if (!r.feil || !erAvbrudd(r.feil[0])) setStegNr(0);
        }
      });
    },
    [tekst],
  );

  const stopp = () => {
    startStegEtter.current = false;
    jobb.current?.avbryt();
  };

  const venterPaSvar = !kjorer && res?.inndata !== undefined && kjortKode === tekst;
  const oppdatert = kjortKode === tekst;

  const startLinjeForLinje = () => {
    if (oppdatert && res && res.inndata === undefined && res.steg.length > 0) setStegNr(0);
    else {
      startStegEtter.current = true;
      kjør();
    }
  };

  const endre = (v: string) => {
    setTekst(v);
    setStegNr(null);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      kjør();
      return;
    }
    if (e.key === 'Escape') {
      esc.current = true;
      return;
    }
    const pos = el.selectionStart;
    const linjestart = el.value.lastIndexOf('\n', pos - 1) + 1;
    // Tab rykker inn, Shift + Tab rykker ut. Trykk Esc først for å hoppe ut av editoren med Tab.
    if (e.key === 'Tab' && !esc.current) {
      e.preventDefault();
      if (!e.shiftKey) settInn(el, '    ', endre);
      else {
        const n = /^ {0,4}/.exec(el.value.slice(linjestart))![0].length;
        if (n > 0) {
          slett(el, linjestart, linjestart + n, endre);
          const ny = Math.max(linjestart, pos - n);
          el.setSelectionRange(ny, ny);
        }
      }
      return;
    }
    esc.current = false;
    // Backspace i innrykket fjerner et helt innrykk (fire mellomrom)
    if (e.key === 'Backspace' && pos === el.selectionEnd && pos > linjestart) {
      const foran = el.value.slice(linjestart, pos);
      if (/^ +$/.test(foran)) {
        e.preventDefault();
        slett(el, pos - (foran.length % 4 || 4), pos, endre);
        return;
      }
    }
    if (e.key === 'Enter' && !e.shiftKey && !e.altKey) {
      const start = el.value.lastIndexOf('\n', el.selectionStart - 1) + 1;
      const linje = el.value.slice(start, el.selectionStart);
      let innrykk = /^ */.exec(linje)![0];
      if (linje.trimEnd().endsWith(':')) innrykk += '    ';
      e.preventDefault();
      settInn(el, '\n' + innrykk, endre);
    }
  };

  const linjer = tekst.split('\n');
  while (linjer.length < minLinjer) linjer.push('');

  const steg = stegNr !== null && res ? res.steg : null;
  const naa = steg?.[stegNr!];
  const forrigeSteg = steg && stegNr! > 0 ? steg[stegNr! - 1] : undefined;
  const nesteLinje = naa?.[0] ?? 0;
  const forrigeLinje = forrigeSteg?.[0] ?? 0;
  const feilLinje = !steg && oppdatert && res?.feil?.[2];

  const linjeKlasse = (nr: number) =>
    nr === nesteLinje ? ' py-neste' : nr === forrigeLinje ? ' py-forrige' : nr === feilLinje ? ' py-feillinje' : '';

  const visUt = naa ? ut.slice(0, naa[2]) : ut;
  const ferdigUtenUtskrift = !kjorer && res && !res.feil && res.inndata === undefined && ut === '' && !steg;

  return (
    <div className={'py' + (steg ? ' py-steg' : '')}>
      <div className="py-topp">
        <span className="py-fil">{fil}</span>
        <PythonStatus />
        <span className="py-knapper">
          {kjorer ? (
            <button className="btn" onClick={stopp}>
              ■ Stopp
            </button>
          ) : (
            <button className="btn primary" onClick={() => kjør()} title="Kjør (Ctrl + Enter)">
              ▶ Kjør
            </button>
          )}
          {linjeForLinje && (
            <button className={'btn' + (steg ? ' on' : '')} onClick={steg ? () => setStegNr(null) : startLinjeForLinje} disabled={kjorer}>
              {steg ? 'Avslutt' : 'Linje for linje'}
            </button>
          )}
          <button
            className="btn"
            onClick={() => {
              stopp();
              endre(kode);
              setUt('');
              setRes(null);
              setKjortKode(null);
            }}
            disabled={tekst === kode && !res}
            title="Tilbakestill koden"
            aria-label="Tilbakestill koden"
          >
            ↺
          </button>
        </span>
      </div>

      <div className="py-kodefelt">
        <div className="py-nr" aria-hidden="true">
          {linjer.map((_, i) => (
            <div key={i} className={linjeKlasse(i + 1)}>
              {i + 1}
            </div>
          ))}
        </div>
        <div className="py-rull">
          <div className="py-lag">
            <pre className="py-farge" aria-hidden="true">
              {linjer.map((l, i) => (
                <span key={i} className={'py-linje' + linjeKlasse(i + 1)}>
                  {l === '' ? '​' : fargeleggLinje(l)}
                </span>
              ))}
            </pre>
            <textarea
              ref={ta}
              value={tekst}
              onChange={(e) => endre(e.target.value)}
              onKeyDown={onKeyDown}
              aria-label={`Python-kode i ${fil}`}
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              wrap="off"
              rows={1}
              cols={1}
            />
          </div>
        </div>
      </div>

      {steg && naa && (
        <div className="py-stegline">
          <button className="btn" onClick={() => setStegNr(stegNr! - 1)} disabled={stegNr === 0} aria-label="Forrige linje">
            ◀
          </button>
          <button
            className="btn primary"
            onClick={() => setStegNr(stegNr! + 1)}
            disabled={stegNr === steg.length - 1}
            autoFocus
          >
            Neste linje ▶
          </button>
          <span className="small">
            {nesteLinje ? (
              <>
                Neste linje som kjøres: <b className="pen">{nesteLinje}</b>
              </>
            ) : (
              <b>Programmet er ferdig.</b>
            )}
          </span>
          <span className="hintline">
            Steg {stegNr! + 1} av {steg.length}
          </span>
        </div>
      )}

      <div className={'py-under' + (variabler ? ' med-var' : '')}>
        <div className="py-ut" aria-live="polite">
          <div className="py-etikett">Konsoll</div>
          {(visUt || venterPaSvar || kjorer) && (
          <pre>
            {visUt}
            {venterPaSvar && (
              <form
                className="py-svar"
                onSubmit={(e) => {
                  e.preventDefault();
                  const v = new FormData(e.currentTarget).get('svar') as string;
                  kjør([...svar, v]);
                }}
              >
                <input name="svar" autoFocus autoComplete="off" aria-label="Svar til programmet" />
              </form>
            )}
            {kjorer && !visUt && <span className="muted">…</span>}
          </pre>
          )}
          {venterPaSvar && <p className="hintline">Programmet venter. Skriv svaret og trykk Enter.</p>}
          {ferdigUtenUtskrift && (
            <p className="hintline">
              Programmet kjørte, men skrev ikke ut noe. Bruk <code>print( )</code> for å vise et resultat.
            </p>
          )}
          {!kjorer && !steg && res?.feil && <Feilboks feil={res.feil} />}
          {steg && nesteLinje === 0 && res?.feil && !erAvbrudd(res.feil[0]) && <Feilboks feil={res.feil} />}
          {!res && !kjorer && !ut && (
            <p className="hintline">
              Trykk <b>Kjør</b> eller <kbd>Ctrl</kbd> + <kbd>Enter</kbd>.
            </p>
          )}
        </div>
        {variabler && (
          <Variabeltabell
            variabler={naa ? naa[1] : oppdatert && res ? res.variabler : []}
            forrige={naa ? forrigeSteg?.[1] ?? [] : undefined}
          />
        )}
      </div>
    </div>
  );
};
