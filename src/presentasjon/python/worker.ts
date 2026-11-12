/* Kjører Python (Pyodide) i en egen tråd, så en løkke som aldri slutter ikke fryser lysbildet.
   Hovedtråden (motor.ts) stopper arbeideren hvis et program bruker for lang tid. */

import { PYODIDE_URL } from './versjon';

type PyProxy = { toJs: (o: object) => unknown; destroy: () => void };
type Pyodide = {
  runPython: (kode: string) => unknown;
  globals: { get: (navn: string) => (...args: unknown[]) => PyProxy };
};

export type Jobb = {
  id: number;
  /** program: hele koden kjøres på nytt hver gang. konsoll: én linje i et navnerom som huskes. nullstill: glem konsollen. */
  modus: 'program' | 'konsoll' | 'nullstill';
  kode: string;
  konsoll?: string;
  /** Svar som allerede er skrevet inn til input(), i rekkefølge */
  svar?: string[];
};

/** [navn, verdi som tekst, type] */
export type Variabel = [string, string, string];
/** [linjen som kjøres nå (0 = ferdig), variablene før linjen kjøres, antall tegn skrevet ut så langt] */
export type Steg = [number, Variabel[], number];

export type Resultat = {
  /** [feiltype, melding, linje] */
  feil?: [string, string, number | null];
  /** Teksten input() viste før programmet stoppet og venter på svar */
  inndata?: string;
  variabler: Variabel[];
  steg: Steg[];
};

export type FraArbeider =
  | { type: 'klar' }
  | { type: 'lastefeil'; melding: string }
  | { type: 'ut'; id: number; tekst: string }
  | ({ type: 'ferdig'; id: number } & Resultat);

const OPPSETT = String.raw`
import sys, builtins, inspect, time, traceback, types, warnings

class _TrengerInndata(BaseException): pass
class _ForMyeUtskrift(BaseException): pass

_MAKS_UT = 200_000
_MAKS_STEG = 2_000
_konsoller = {}

class _Skriver:
    def __init__(self, send):
        self.send = send
        self.buf = []
        self.antall = 0
        self.sist = time.monotonic()
    def write(self, s):
        s = str(s)
        self.antall += len(s)
        if self.antall > _MAKS_UT:
            raise _ForMyeUtskrift()
        self.buf.append(s)
        if time.monotonic() - self.sist > 0.05:
            self.flush()
        return len(s)
    def flush(self):
        if self.buf:
            self.send(''.join(self.buf))
            self.buf = []
        self.sist = time.monotonic()
    def isatty(self):
        return False

_SKJULT = (types.ModuleType, types.BuiltinFunctionType, type)

def _verdier(ns):
    ut = []
    for k, v in list(ns.items()):
        if k.startswith('_') or isinstance(v, _SKJULT):
            continue
        if isinstance(v, types.FunctionType):
            try:
                r = 'def ' + v.__name__ + str(inspect.signature(v))
            except Exception:
                r = 'def ' + v.__name__
        else:
            try:
                r = repr(v)
            except Exception:
                r = '?'
        if len(r) > 60:
            r = r[:57] + '...'
        ut.append([k, r, type(v).__name__])
    return ut

def _lag_sporer(steg, skriver, filnavn):
    def sporer(ramme, hendelse, arg):
        if ramme.f_code.co_filename != filnavn:
            return None
        if hendelse == 'line' and len(steg) < _MAKS_STEG:
            v = _verdier(ramme.f_globals)
            navn = ramme.f_code.co_name
            # Inne i en funksjon vises også de lokale variablene, merket med funksjonsnavnet
            if navn != '<module>':
                v += [[k + ' (i ' + navn + ')', r, t] for k, r, t in _verdier(ramme.f_locals)]
            steg.append([ramme.f_lineno, v, skriver.antall])
        return sporer
    return sporer

def _beskriv(e, filnavn):
    navn = type(e).__name__
    if isinstance(e, SyntaxError):
        return [navn, e.msg or '', e.lineno if e.filename == filnavn else None]
    linje = None
    for f in traceback.extract_tb(e.__traceback__):
        if f.filename == filnavn:
            linje = f.lineno
    return [navn, str(e), linje]

def _kjor(modus, kode, konsoll, svar, send):
    if modus == 'nullstill':
        _konsoller.pop(konsoll, None)
        return {'variabler': [], 'steg': []}
    skriver = _Skriver(send)
    svar = list(svar)
    def inp(tekst=''):
        tekst = str(tekst)
        if svar:
            s = svar.pop(0)
            skriver.write(tekst + s + '\n')
            return s
        skriver.write(tekst)
        raise _TrengerInndata(tekst)
    if modus == 'konsoll':
        ns = _konsoller.setdefault(konsoll, {'__name__': '__main__'})
        filnavn = '<konsoll>'
    else:
        ns = {'__name__': '__main__'}
        filnavn = '<kode>'
    gammel = (sys.stdout, sys.stderr, builtins.input)
    sys.stdout = sys.stderr = skriver
    builtins.input = inp
    steg = []
    res = {}
    try:
        with warnings.catch_warnings():
            warnings.simplefilter('ignore')
            c = compile(kode, filnavn, 'single' if modus == 'konsoll' else 'exec')
        if modus == 'program':
            sys.settrace(_lag_sporer(steg, skriver, filnavn))
        try:
            exec(c, ns)
        finally:
            sys.settrace(None)
    except _TrengerInndata as e:
        res['inndata'] = e.args[0]
    except _ForMyeUtskrift:
        res['feil'] = ['ForMyeUtskrift', '', None]
    except BaseException as e:
        res['feil'] = _beskriv(e, filnavn)
    finally:
        sys.stdout, sys.stderr, builtins.input = gammel
        try:
            skriver.flush()
        except Exception:
            pass
    res['variabler'] = _verdier(ns)
    if modus == 'program':
        steg.append([0, res['variabler'], skriver.antall])
    res['steg'] = steg
    return res
`;

const arbeider = self as unknown as Worker;
const send = (m: FraArbeider) => arbeider.postMessage(m);

let py: Pyodide;
const klar = (async () => {
  const { loadPyodide } = await import(/* @vite-ignore */ PYODIDE_URL + 'pyodide.mjs');
  py = await loadPyodide({ indexURL: PYODIDE_URL });
  py.runPython(OPPSETT);
})();

klar.then(
  () => send({ type: 'klar' }),
  (e) => send({ type: 'lastefeil', melding: String(e) }),
);

arbeider.onmessage = async (e: MessageEvent<Jobb>) => {
  const j = e.data;
  try {
    await klar;
  } catch {
    return;
  }
  const kjor = py.globals.get('_kjor');
  const svar = kjor(j.modus, j.kode, j.konsoll ?? '', j.svar ?? [], (tekst: string) =>
    send({ type: 'ut', id: j.id, tekst }),
  );
  const r = svar.toJs({ dict_converter: Object.fromEntries }) as Resultat;
  svar.destroy();
  send({ type: 'ferdig', id: j.id, ...r });
};
