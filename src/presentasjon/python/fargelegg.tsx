import React from 'react';

/* Enkel fargelegging av Python-kode, én linje om gangen. */

const NOKKELORD = new Set(
  'and as assert break class continue def del elif else except False finally for from global if import in is lambda None nonlocal not or pass raise return True try while with yield'.split(
    ' ',
  ),
);
const INNEBYGD = new Set(
  'print input int float str round type abs len range min max sum list bool pow sqrt pi'.split(' '),
);

const TOKEN =
  /(#.*$)|([fFrRbBuU]{0,2}(?:'(?:[^'\\]|\\.)*'?|"(?:[^"\\]|\\.)*"?))|(\b\d+(?:\.\d*)?(?:[eE][+-]?\d+)?\b|\.\d+\b)|([A-Za-z_À-ɏ][\wÀ-ɏ]*)/g;

export function fargeleggLinje(linje: string): React.ReactNode[] {
  const ut: React.ReactNode[] = [];
  let sist = 0;
  for (const m of linje.matchAll(TOKEN)) {
    const i = m.index!;
    if (i > sist) ut.push(linje.slice(sist, i));
    let cls: string | null = null;
    if (m[1]) cls = 'py-kom';
    else if (m[2]) cls = 'py-str';
    else if (m[3]) cls = 'py-tall';
    else if (NOKKELORD.has(m[4])) cls = 'py-nok';
    else if (INNEBYGD.has(m[4])) cls = 'py-inn';
    ut.push(
      cls ? (
        <span key={i} className={cls}>
          {m[0]}
        </span>
      ) : (
        m[0]
      ),
    );
    sist = i + m[0].length;
  }
  if (sist < linje.length) ut.push(linje.slice(sist));
  return ut;
}

/** Fargelagt kode som ikke kan endres, for eksempel i en løsning */
export const Kode: React.FC<{ children: string; inline?: boolean }> = ({ children, inline }) =>
  inline ? (
    <code className="py-inline">{fargeleggLinje(children)}</code>
  ) : (
    <pre className="py-statisk">
      {children.split('\n').map((l, i) => (
        <span key={i} className="py-linje">
          {l === '' ? '​' : fargeleggLinje(l)}
        </span>
      ))}
    </pre>
  );
