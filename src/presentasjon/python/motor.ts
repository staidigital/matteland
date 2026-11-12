/* Én felles Python-arbeider for hele siden. Jobbene kjøres én om gangen i køen.
   Bruker et program for lang tid, stoppes arbeideren og en ny startes. */

import type { FraArbeider, Jobb, Resultat } from './worker';

export type Status = 'av' | 'laster' | 'klar' | 'feil';

/** Lengste tid et program får kjøre før det stoppes */
const MAKS_TID = 8000;

type Ventende = {
  jobb: Jobb;
  ut: (tekst: string) => void;
  ferdig: (r: Resultat) => void;
};

let arbeider: Worker | null = null;
let status: Status = 'av';
const lyttere = new Set<() => void>();
const ko: Ventende[] = [];
let aktiv: Ventende | null = null;
let tidtaker: number | undefined;
let nesteId = 1;

const settStatus = (s: Status) => {
  status = s;
  lyttere.forEach((l) => l());
};

export const lyttTilStatus = (l: () => void) => {
  lyttere.add(l);
  return () => lyttere.delete(l);
};
export const hentStatus = () => status;

function start() {
  settStatus('laster');
  const w = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
  arbeider = w;
  w.onmessage = (e: MessageEvent<FraArbeider>) => {
    const m = e.data;
    if (m.type === 'klar') {
      settStatus('klar');
      neste();
    } else if (m.type === 'lastefeil') {
      settStatus('feil');
      // Alle som venter, får beskjed
      [aktiv, ...ko.splice(0)].forEach((v) => v?.ferdig({ feil: ['Lastefeil', m.melding, null], variabler: [], steg: [] }));
      aktiv = null;
    } else if (aktiv && m.id === aktiv.jobb.id) {
      if (m.type === 'ut') aktiv.ut(m.tekst);
      else {
        clearTimeout(tidtaker);
        const v = aktiv;
        aktiv = null;
        const { type: _t, id: _i, ...r } = m;
        v.ferdig(r);
        neste();
      }
    }
  };
  w.onerror = () => {
    if (status === 'laster') {
      settStatus('feil');
      [aktiv, ...ko.splice(0)].forEach((v) => v?.ferdig({ feil: ['Lastefeil', '', null], variabler: [], steg: [] }));
      aktiv = null;
    }
  };
}

/** Starter Python i bakgrunnen, så det er klart når noen trykker «Kjør» */
export function forbered() {
  if (!arbeider || status === 'feil') start();
}

function neste() {
  if (aktiv || status !== 'klar' || ko.length === 0) return;
  aktiv = ko.shift()!;
  const id = aktiv.jobb.id;
  arbeider!.postMessage(aktiv.jobb);
  tidtaker = window.setTimeout(() => stopp(id, 'Tidsavbrudd'), MAKS_TID);
}

/** Stopper en jobb. Er den i gang, må hele arbeideren startes på nytt. */
function stopp(id: number, grunn: string) {
  const i = ko.findIndex((v) => v.jobb.id === id);
  if (i >= 0) {
    const [v] = ko.splice(i, 1);
    v.ferdig({ feil: [grunn, '', null], variabler: [], steg: [] });
    return;
  }
  if (aktiv?.jobb.id !== id) return;
  clearTimeout(tidtaker);
  const v = aktiv;
  aktiv = null;
  arbeider?.terminate();
  arbeider = null;
  v.ferdig({ feil: [grunn, '', null], variabler: [], steg: [] });
  start();
}

/** Legger en jobb i køen. Utskrift kommer fortløpende til `ut`. */
export function kjor(jobb: Omit<Jobb, 'id'>, ut: (tekst: string) => void) {
  forbered();
  const id = nesteId++;
  const promise = new Promise<Resultat>((ferdig) => {
    ko.push({ jobb: { ...jobb, id }, ut, ferdig });
    neste();
  });
  return { promise, avbryt: () => stopp(id, 'Stoppet') };
}
