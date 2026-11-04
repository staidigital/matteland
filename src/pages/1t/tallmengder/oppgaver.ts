export type Mengde = 'N' | 'Z' | 'Q' | 'R';

/** Tallmengdene fra den minste til den største */
export const MENGDER: Mengde[] = ['N', 'Z', 'Q', 'R'];
export const SYMBOL: Record<Mengde, string> = { N: 'ℕ', Z: 'ℤ', Q: 'ℚ', R: 'ℝ' };
export const NAVN: Record<Mengde, string> = {
  N: 'naturlige tall',
  Z: 'hele tall',
  Q: 'rasjonale tall',
  R: 'reelle tall',
};

/** Et tall, slik det skrives, og den minste tallmengden det hører til */
export type Tall = { tekst: string; minste: Mengde; grunn: string };

export const TALL: Tall[] = [
  { tekst: '7', minste: 'N', grunn: 'Et positivt helt tall.' },
  { tekst: '√9', minste: 'N', grunn: '√9 = 3, så tallet er naturlig selv om det står med rot.' },
  { tekst: '12/4', minste: 'N', grunn: '12/4 = 3, så tallet er naturlig selv om det står som brøk.' },
  { tekst: '0', minste: 'Z', grunn: '0 er et helt tall, men ikke et naturlig tall.' },
  { tekst: '−3', minste: 'Z', grunn: 'Et negativt helt tall.' },
  { tekst: '−√16', minste: 'Z', grunn: '−√16 = −4, som er et helt tall.' },
  { tekst: '3/4', minste: 'Q', grunn: 'En brøk av to hele tall som ikke kan forkortes til et helt tall.' },
  { tekst: '−5/2', minste: 'Q', grunn: 'En brøk av to hele tall, og −5/2 = −2,5 er ikke helt.' },
  { tekst: '0,25', minste: 'Q', grunn: '0,25 = 1/4. Desimalene tar slutt.' },
  { tekst: '0,333…', minste: 'Q', grunn: '0,333… = 1/3. Desimalene gjentar seg.' },
  { tekst: '3,14', minste: 'Q', grunn: '3,14 = 314/100. Det er π som er irrasjonalt, ikke 3,14.' },
  { tekst: '√2', minste: 'R', grunn: '2 er ikke et kvadrattall, så √2 er irrasjonalt.' },
  { tekst: '√10', minste: 'R', grunn: '10 er ikke et kvadrattall, så √10 er irrasjonalt.' },
  { tekst: 'π', minste: 'R', grunn: 'π er irrasjonalt. Desimalene tar aldri slutt og gjentar seg ikke.' },
  { tekst: '1 + √3', minste: 'R', grunn: 'Et helt tall pluss et irrasjonalt tall er irrasjonalt.' },
];

export type Niva = 'mengde' | 'skrivemate' | 'med' | 'notasjon' | 'union';

export const NIVAER: [Niva, string][] = [
  ['mengde', 'Tallmengde'],
  ['skrivemate', 'Intervall'],
  ['med', 'Er tallet med?'],
  ['notasjon', '∈ og ⊂'],
  ['union', '∪ og \\'],
];

export type Iv = { a: number; b: number; aMed: boolean; bMed: boolean };

/** Er x med i intervallet? */
export const iIntervall = (x: number, { a, b, aMed, bMed }: Iv) =>
  (aMed ? x >= a : x > a) && (bMed ? x <= b : x < b);

export const ivTekst = ({ a, b, aMed, bMed }: Iv) => `${aMed ? '[' : '⟨'}${tegn(a)} , ${tegn(b)}${bMed ? ']' : '⟩'}`;
export const ulikhetTekst = ({ a, b, aMed, bMed }: Iv) =>
  `${tegn(a)} ${aMed ? '≤' : '<'} x ${bMed ? '≤' : '<'} ${tegn(b)}`;
const tegn = (n: number) => (n < 0 ? '−' + Math.abs(n) : String(n));

const ri = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
const myntkast = () => Math.random() < 0.5;
const pickEn = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

export const lagIntervall = (): Iv => {
  const a = ri(-6, 3);
  return { a, b: a + ri(2, 6), aMed: myntkast(), bMed: myntkast() };
};

/** De fire mulige skrivemåtene for samme endepunkter */
export const alleVarianter = ({ a, b }: Iv): Iv[] => [
  { a, b, aMed: true, bMed: true },
  { a, b, aMed: false, bMed: false },
  { a, b, aMed: true, bMed: false },
  { a, b, aMed: false, bMed: true },
];

/** Et tall å teste: et av endepunktene, eller et helt tall nær intervallet. */
export const lagTesttall = (iv: Iv) => {
  const r = Math.random();
  if (r < 0.3) return iv.a;
  if (r < 0.6) return iv.b;
  return ri(iv.a - 2, iv.b + 2);
};

/** Påstander med ∈, ∉, ⊂ og \ som er sanne eller usanne */
export type Pastand = { tekst: string; sann: boolean; grunn: string };

export const PASTANDER: Pastand[] = [
  { tekst: '3 ∈ ℕ', sann: true, grunn: '3 er et naturlig tall.' },
  { tekst: '−3 ∈ ℕ', sann: false, grunn: 'Negative tall er ikke naturlige.' },
  { tekst: '−3 ∈ ℤ', sann: true, grunn: '−3 er et helt tall.' },
  { tekst: '0 ∈ ℕ', sann: false, grunn: 'Her starter ℕ på 1.' },
  { tekst: '3/4 ∈ ℤ', sann: false, grunn: '3/4 er ikke et helt tall.' },
  { tekst: '3/4 ∈ ℚ', sann: true, grunn: '3/4 er en brøk av to hele tall.' },
  { tekst: '√2 ∈ ℚ', sann: false, grunn: '√2 er irrasjonalt.' },
  { tekst: '√2 ∈ ℝ', sann: true, grunn: 'Alle irrasjonale tall er reelle.' },
  { tekst: '√9 ∉ ℕ', sann: false, grunn: '√9 = 3, som ligger i ℕ.' },
  { tekst: 'π ∉ ℚ', sann: true, grunn: 'π er irrasjonalt, så det ligger ikke i ℚ.' },
  { tekst: 'ℕ ⊂ ℤ', sann: true, grunn: 'Alle naturlige tall er hele tall.' },
  { tekst: 'ℤ ⊂ ℕ', sann: false, grunn: 'For eksempel ligger −1 i ℤ, men ikke i ℕ.' },
  { tekst: 'ℚ ⊂ ℝ', sann: true, grunn: 'Alle rasjonale tall er reelle.' },
  { tekst: 'ℝ ⊂ ℚ', sann: false, grunn: 'For eksempel ligger √2 i ℝ, men ikke i ℚ.' },
  { tekst: '{1, 2, 3} ⊂ ℕ', sann: true, grunn: 'Alle de tre tallene er naturlige.' },
  { tekst: '{−1, 0, 1} ⊂ ℕ', sann: false, grunn: '−1 og 0 ligger ikke i ℕ.' },
  { tekst: '{−1, 0, 1} ⊂ ℤ', sann: true, grunn: 'Alle de tre tallene er hele.' },
  { tekst: '[1 , 3] ⊂ [0 , 5]', sann: true, grunn: 'Alle tallene fra 1 til 3 ligger mellom 0 og 5.' },
  { tekst: '[0 , 5] ⊂ ⟨0 , 5⟩', sann: false, grunn: '0 ligger i [0 , 5], men ikke i ⟨0 , 5⟩.' },
  { tekst: '⟨0 , 5⟩ ⊂ [0 , 5]', sann: true, grunn: 'Alle tallene i ⟨0 , 5⟩ ligger også i [0 , 5].' },
  { tekst: '3 ∈ [0 , 3⟩', sann: false, grunn: 'Spissparentesen betyr at 3 ikke er med.' },
  { tekst: '0 ∈ ℝ \\ {0}', sann: false, grunn: 'ℝ \\ {0} er alle reelle tall unntatt 0.' },
  { tekst: '2 ∈ ℝ \\ {0}', sann: true, grunn: 'Bare 0 er tatt bort, og 2 er et reelt tall.' },
  { tekst: 'ℕ ⊂ ℝ \\ {0}', sann: true, grunn: 'Ingen naturlige tall er 0, så alle er med.' },
];

/** Enten to intervaller med et tall å teste, eller ett intervall der ett tall er tatt bort */
export type Sett =
  | { type: 'union'; A: Iv; B: Iv; x: number; med: boolean }
  | { type: 'utenom'; A: Iv; c: number; x: number; med: boolean };

export const lagSett = (): Sett => {
  if (myntkast()) {
    const a = ri(-6, -2);
    const A: Iv = { a, b: a + ri(1, 3), aMed: myntkast(), bMed: myntkast() };
    const c = A.b + ri(1, 2);
    const B: Iv = { a: c, b: c + ri(1, 3), aMed: myntkast(), bMed: myntkast() };
    const x = pickEn([A.a, A.b, B.a, B.b, ri(A.a - 1, B.b + 1)]);
    return { type: 'union', A, B, x, med: iIntervall(x, A) || iIntervall(x, B) };
  }
  const A: Iv = { a: ri(-5, -1), b: ri(2, 6), aMed: true, bMed: true };
  const c = ri(A.a + 1, A.b - 1);
  const x = myntkast() ? c : ri(A.a - 1, A.b + 1);
  return { type: 'utenom', A, c, x, med: iIntervall(x, A) && x !== c };
};
