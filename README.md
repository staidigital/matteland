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
- `/1t/tallmengder`, `/1t/bokstavuttrykk`, `/1t/brokregning`, `/1t/forstegradslikninger`, `/1t/potenser`, `/1t/figurtall` – Inndelingen «Basics»: grunnlaget for resten av kurset
- `/1t/kvadratsetningene`, `/1t/identitet-og-bevis`, `/1t/fullstendig-kvadrat`, `/1t/andregradslikninger`, `/1t/abc-formelen`, `/1t/praktisk-andregrad`, `/1t/nullpunktsfaktorisering` – Inndelingen «Andregradsuttrykk og -likninger»
- `/1t/formler` – Puggeliste med formlene elevene skal kunne utenat (utskriftsvennlig)

Sider ligger i `src/pages/`, med én mappe per fag (f.eks. `src/pages/1t/`). Ruter defineres i `src/App.tsx`.

## Presentasjoner

Felles byggesteiner for interaktive presentasjoner ligger i `src/presentasjon/`:

| Fil | Innhold |
| --- | --- |
| `Presentasjon.tsx` | Kontrollinjen, tastene, lærernotat og lys/mørk-tema |
| `presentasjon.css` | Layout og komponenter (gjelder bare inne i `.presentasjon`). Farger og skrifter for hele nettstedet ligger i `src/tema.css` |
| `ui.tsx` | Typene `Lysbilde` og `LysbildeProps`, `StepButtons` og `Slider` |
| `matte.tsx` | Byggesteiner for matte: `Poly`, `Factored`, `Frac`, `Num` med mer |
| `Graf.tsx` | Graf med rutenett og markerte nullpunkter |
| `ovelser.tsx` | `Utregning` (nummererte trinn), `ProvOppgaver`, `FeilListe` og `OvSelvRamme` (oppgavegenerator med sjekk og løsning) |
| `fonter/` | Fraunces og IBM Plex Sans (SIL Open Font License) |

Hver presentasjon har en egen mappe, f.eks. `src/pages/1t/nullpunktsfaktorisering/`, med `lysbildeliste.ts`
(rekkefølge, titler, steg og lærernotat), én fil per lysbilde i `lysbilder/` og en side som viser
`<Presentasjon lysbilder={…} />`. Presentasjoner legges utenfor `Layout` i `src/App.tsx` så de får hele skjermen.

Taster: → / mellomrom / PageDown neste (viser først steg, ruller så ned til skjult innhold), ← / PageUp forrige, N lærernotat, F fullskjerm, T lys/mørk,
H skjul kontrollinjen, ? hjelp. Du kan lenke rett til et lysbilde med `#nummer`, f.eks. `/1t/nullpunktsfaktorisering#9`.
