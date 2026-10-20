import React from 'react';

/* ---------- tall og formatering ---------- */

export const EPS = 1e-9;
export const near = (a: number, b: number) => Math.abs(a - b) < 1e-7;

export const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
};

/** Gjør om til brøk med nevner ≤ 12, eller null hvis tallet ikke er en slik brøk. */
export function toFrac(x: number): { n: number; d: number } | null {
  if (!isFinite(x)) return null;
  for (let d = 1; d <= 12; d++) {
    const n = Math.round(x * d);
    if (Math.abs(n / d - x) < 1e-9) {
      const g = gcd(n, d) || 1;
      return { n: n / g, d: d / g };
    }
  }
  return null;
}

/** Heltall med ekte minustegn. */
export const minus = (n: number) => (n < 0 ? '−' + Math.abs(n) : String(n));

/** Desimaltall med komma og ekte minustegn. */
export const dec = (v: number, k = 2) =>
  String(Math.round(v * 10 ** k) / 10 ** k).replace('.', ',').replace('-', '−');

/** Kort tekstform: 3, −2, 3/2 eller ≈ 1,41 */
export const fmt = (v: number) => {
  const f = toFrac(v);
  if (!f) return '≈ ' + dec(v);
  return f.d === 1 ? minus(f.n) : minus(f.n) + '/' + f.d;
};

/** Tall i et regnestykke med parentes rundt negative tall: 4·(−12) */
export const par = (n: number) => (n < 0 ? `(${minus(n)})` : String(n));

/* ---------- byggesteiner for matte ---------- */

export const X = () => <i className="v">x</i>;
export const V: React.FC<{ c: string }> = ({ c }) => <i className="v">{c}</i>;
export const X1: React.FC<{ farge?: boolean }> = ({ farge }) => (
  <span className={farge ? 'c1' : undefined}>
    <V c="x" />
    <sub>1</sub>
  </span>
);
export const X2: React.FC<{ farge?: boolean }> = ({ farge }) => (
  <span className={farge ? 'c2' : undefined}>
    <V c="x" />
    <sub>2</sub>
  </span>
);
export const Op: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="op">{children}</span>;

export const Frac: React.FC<{ n: React.ReactNode; d: React.ReactNode }> = ({ n, d }) => (
  <span className="frac">
    <span>{n}</span>
    <span>{d}</span>
  </span>
);

/** Viser et tall som heltall, stablet brøk eller tilnærmet desimaltall. */
export const Num: React.FC<{ v: number; plain?: boolean }> = ({ v, plain }) => {
  const f = toFrac(v);
  if (f && f.d === 1) return <span>{minus(f.n)}</span>;
  if (f)
    return (
      <span>
        {f.n < 0 && '−'}
        <Frac n={Math.abs(f.n)} d={f.d} />
      </span>
    );
  return (
    <span>
      {plain ? '' : '≈ '}
      {dec(v)}
    </span>
  );
};

/** ax² + bx + c med riktige fortegn, uten 1-ere og uten nulledd. */
export const Poly: React.FC<{ a: number; b: number; c: number }> = ({ a, b, c }) => {
  const terms = ([[a, 2], [b, 1], [c, 0]] as const).filter(([k]) => Math.abs(k) > EPS);
  if (!terms.length) return <span>0</span>;
  return (
    <span className="nw">
      {terms.map(([k, p], i) => {
        const abs = Math.abs(k);
        const sign = i === 0 ? (k < 0 ? '−' : null) : <Op>{k < 0 ? '−' : '+'}</Op>;
        return (
          <React.Fragment key={p}>
            {sign}
            {abs === 1 && p > 0 ? null : <Num v={abs} />}
            {p > 0 && <X />}
            {p === 2 && <sup>2</sup>}
          </React.Fragment>
        );
      })}
    </span>
  );
};

/** Én faktor (x − r). Negativ r gir (x + |r|), r = 0 gir bare x. */
export const Factor: React.FC<{ r: number; cls?: string; approx?: boolean }> = ({ r, cls, approx }) => {
  if (Math.abs(r) < EPS)
    return (
      <span className={cls}>
        <X />
      </span>
    );
  return (
    <span className={cls}>
      (<X />
      <Op>{r > 0 ? '−' : '+'}</Op>
      <Num v={Math.abs(r)} plain={approx} />)
    </span>
  );
};

const Lead: React.FC<{ a: number }> = ({ a }) => {
  if (near(a, 1)) return null;
  if (near(a, -1)) return <span>−</span>;
  return <Num v={a} />;
};

/** a(x − r1)(x − r2), eller a(x − r1)² når nullpunktene er like. */
export const Factored: React.FC<{ a: number; r1: number; r2: number; c1?: string; c2?: string }> = ({
  a,
  r1,
  r2,
  c1 = 'c1',
  c2 = 'c2',
}) => {
  const approx = !toFrac(r1) || !toFrac(r2);
  if (near(r1, r2))
    return (
      <span className="nw">
        {approx && '≈ '}
        <Lead a={a} />
        <Factor r={r1} cls={c1} approx={approx} />
        <sup>2</sup>
      </span>
    );
  let f: [number, string][] = [
    [r1, c1],
    [r2, c2],
  ];
  if (Math.abs(r2) < EPS) f = f.reverse(); // x(x − 3) heller enn (x − 3)x
  return (
    <span className="nw">
      {approx && '≈ '}
      <Lead a={a} />
      {f.map(([r, c], i) => (
        <Factor key={i} r={r} cls={c} approx={approx} />
      ))}
    </span>
  );
};

/** ax² + bx + c med bokstaver */
export const Gen = () => (
  <span className="nw">
    <V c="a" />
    <X />
    <sup>2</sup> + <V c="b" />
    <X /> + <V c="c" />
  </span>
);

/** a(x − x₁)(x − x₂) med bokstaver */
export const FactorForm: React.FC<{ farge?: boolean }> = ({ farge }) => (
  <span className="nw">
    <V c="a" />(<X /> − <X1 farge={farge} />)(<X /> − <X2 farge={farge} />)
  </span>
);

/** abc-formelen */
export const ABC = () => (
  <span className="math">
    <X /> <Op>=</Op>
    <Frac
      n={
        <>
          −<V c="b" /> ± √
          <span className="rad">
            <V c="b" />
            <sup>2</sup> − 4<V c="a" />
            <V c="c" />
          </span>
        </>
      }
      d={
        <>
          2<V c="a" />
        </>
      }
    />
  </span>
);
