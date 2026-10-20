# matteland
Samle undervisningsmateriell i matematikk.

## Utvikling

```bash
npm install
npm run dev
```

## Struktur

- `/` – forside
- `/1t` – Matematikk 1T
- `/1t/nullpunktsfaktorisering` – Nullpunktsfaktorisering

Sider ligger i `src/pages/`, med én mappe per fag (f.eks. `src/pages/1t/`). Ruter defineres i `src/App.tsx`.

## Presentasjoner

Felles byggesteiner for interaktive presentasjoner ligger i `src/presentasjon/`:

| Fil | Innhold |
| --- | --- |
| `Presentasjon.tsx` | Kontrollinjen, tastene, lærernotat og lys/mørk-tema |
| `presentasjon.css` | Farger, skrifter og layout (gjelder bare inne i `.presentasjon`) |
| `ui.tsx` | Typene `Lysbilde` og `LysbildeProps`, `StepButtons` og `Slider` |
| `matte.tsx` | Byggesteiner for matte: `Poly`, `Factored`, `Frac`, `Num` med mer |
| `Graf.tsx` | Graf med rutenett og markerte nullpunkter |
| `fonter/` | Fraunces og IBM Plex Sans (SIL Open Font License) |

Hver presentasjon har en egen mappe, f.eks. `src/pages/1t/nullpunktsfaktorisering/`, med `lysbildeliste.ts`
(rekkefølge, titler, steg og lærernotat), én fil per lysbilde i `lysbilder/` og en side som viser
`<Presentasjon lysbilder={…} />`. Presentasjoner legges utenfor `Layout` i `src/App.tsx` så de får hele skjermen.

Taster: → / mellomrom / PageDown neste, ← / PageUp forrige, N lærernotat, F fullskjerm, T lys/mørk,
H skjul kontrollinjen, ? hjelp. Du kan lenke rett til et lysbilde med `#nummer`, f.eks. `/1t/nullpunktsfaktorisering#9`.
