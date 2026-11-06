import Kort from '../components/Kort.tsx'
import { antallPresentasjoner } from './1t/Matematikk1T.tsx'

function Sverd() {
  return (
    <svg className="kort-ikon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2" />
      <path d="M14.5 6.5 18 3h3v3l-3.5 3.5M5 14l4 4M7 17l-3 3M3 19l2 2" />
    </svg>
  )
}

export default function Home() {
  return (
    <section className="home">
      <div className="kicker">Undervisningsmateriell i matematikk</div>
      <h1>Matteland</h1>
      <p className="lede">Interaktive presentasjoner, oppgaver og formler til bruk i timen og hjemme.</p>
      <nav aria-label="Innhold">
        <ul className="kort-liste">
          <li>
            <Kort
              til="/1t"
              tittel="Matematikk 1T"
              tekst="Fra tallmengder og brøk til funksjoner og polynomer."
              fot={`${antallPresentasjoner} presentasjoner og puggeliste`}
            />
          </li>
          <li>
            <Kort
              til="/math-of-clans"
              tittel="Math of Clans"
              tekst="Løs matteoppgaver for å få soldater og gull, og erobre kartet med klanen din."
              fot="Spill for hele klassen"
              ikon={<Sverd />}
              fremhevet
            />
          </li>
        </ul>
      </nav>
    </section>
  )
}
