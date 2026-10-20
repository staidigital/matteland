import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './fonter.css';
import './presentasjon.css';
import type { Lysbilde } from './ui';

type Props = {
  lysbilder: Lysbilde[];
  /** Hvor «tilbake»-lenken i kontrollinjen går, f.eks. /1t */
  tilbake: { til: string; tekst: string };
};

/** Lysbildenummer fra adressen, f.eks. /1t/nullpunktsfaktorisering#6 */
const fraAdresse = (antall: number) => {
  const n = parseInt(window.location.hash.slice(1), 10);
  return n >= 1 && n <= antall ? n - 1 : 0;
};

export const Presentasjon: React.FC<Props> = ({ lysbilder: LYSBILDER, tilbake }) => {
  const SISTE = LYSBILDER.length - 1;
  const [i, setI] = useState(() => fraAdresse(LYSBILDER.length));
  const [frag, setFrag] = useState(0);
  const [notat, setNotat] = useState(false);
  const [linje, setLinje] = useState(true);
  const [hjelp, setHjelp] = useState(false);
  const [tema, setTema] = useState<'light' | 'dark'>();
  const stage = useRef<HTMLElement>(null);

  const go = useCallback((n: number, f = 0) => {
    if (n < 0 || n > SISTE) return;
    setI(n);
    setFrag(f);
    // Behold history.state, ellers mister React Router oversikten over historikken
    history.replaceState(history.state, '', '#' + (n + 1));
    stage.current?.scrollTo(0, 0);
  }, [SISTE]);

  // → viser først neste steg på lysbildet, deretter neste lysbilde
  const next = useCallback(() => {
    if (frag < LYSBILDER[i].steg) setFrag(frag + 1);
    else go(i + 1);
  }, [LYSBILDER, i, frag, go]);

  // ← går ett steg tilbake; fra steg 0 til forrige lysbilde med alle steg vist
  const prev = useCallback(() => {
    if (frag > 0) setFrag(frag - 1);
    else if (i > 0) go(i - 1, LYSBILDER[i - 1].steg);
  }, [LYSBILDER, i, frag, go]);

  const fullskjerm = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen?.().catch(() => {});
  }, []);

  const byttTema = useCallback(() => {
    setTema((t) => {
      const mork = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches);
      return mork ? 'light' : 'dark';
    });
  }, []);

  // Tastatur – også presentasjonsklikkere (de sender PageDown/PageUp)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement).tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return; // skriving og glidebrytere
      switch (e.key) {
        case ' ':
          if (tag === 'BUTTON') return; // mellomrom trykker på knappen som har fokus
          e.preventDefault();
          next();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          next();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          prev();
          break;
        case 'Home':
          go(0);
          break;
        case 'End':
          go(SISTE);
          break;
        case 'n':
        case 'N':
          setNotat((v) => !v);
          break;
        case 'f':
        case 'F':
          fullskjerm();
          break;
        case 'h':
        case 'H':
          setLinje((v) => !v);
          break;
        case 't':
        case 'T':
          byttTema();
          break;
        case '?':
          setHjelp((v) => !v);
          break;
        case 'Escape':
          setHjelp(false);
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, go, fullskjerm, byttTema, SISTE]);

  const L = LYSBILDER[i];
  const S = L.C;

  return (
    <div className="presentasjon" data-theme={tema}>
      <main className="stage" ref={stage}>
        <S key={i} frag={frag} setFrag={setFrag} />
      </main>

      {notat && (
        <aside className="notes">
          <div className="notes-title">Lærernotat · {L.tittel}</div>
          <div>{L.notat}</div>
        </aside>
      )}

      {hjelp && (
        <div className="help" onClick={() => setHjelp(false)}>
          <div>
            <table>
              <tbody>
                <tr><td>→ · mellomrom · PageDown</td><td>Neste steg eller lysbilde</td></tr>
                <tr><td>← · PageUp</td><td>Forrige steg eller lysbilde</td></tr>
                <tr><td>N</td><td>Vis/skjul lærernotat</td></tr>
                <tr><td>F</td><td>Fullskjerm</td></tr>
                <tr><td>T</td><td>Bytt mellom lys og mørk</td></tr>
                <tr><td>H</td><td>Skjul/vis kontrollinjen</td></tr>
                <tr><td>Home / End</td><td>Første / siste lysbilde</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <nav className={'nav' + (linje ? '' : ' hidden')} aria-label="Lysbilder">
        <Link className="btn" to={tilbake.til} title={tilbake.tekst}>
          ← {tilbake.tekst}
        </Link>
        <button className="btn" onClick={prev} disabled={i === 0 && frag === 0} aria-label="Forrige">
          ←
        </button>
        <span className="count">
          {i + 1} / {LYSBILDER.length}
        </span>
        <span className="navtitle">{L.tittel}</span>
        <div className="dots">
          {LYSBILDER.map((s, k) => (
            <button key={k} aria-label={s.tittel} title={`${k + 1}. ${s.tittel}`} aria-current={k === i} onClick={() => go(k)} />
          ))}
        </div>
        <button className={'btn' + (notat ? ' on' : '')} onClick={() => setNotat((v) => !v)} title="Lærernotat (N)">
          Notat
        </button>
        <button className="btn" onClick={fullskjerm} title="Fullskjerm (F)">
          ⛶
        </button>
        <button className="btn" onClick={() => setHjelp((v) => !v)} title="Tastatur (?)">
          ?
        </button>
        <button
          className="btn primary"
          onClick={next}
          disabled={i === SISTE && frag >= L.steg}
          aria-label="Neste"
        >
          →
        </button>
      </nav>
    </div>
  );
};
