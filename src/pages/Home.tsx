import Kort from '../components/Kort.tsx'
import { antallPresentasjoner } from './1t/Matematikk1T.tsx'

export default function Home() {
  return (
    <section className="home">
      <div className="kicker">Undervisningsmateriell i matematikk</div>
      <h1>Matteland</h1>
      <p className="lede">Interaktive presentasjoner, oppgaver og formler til bruk i timen og hjemme.</p>
      <nav aria-label="Fag">
        <ul className="kort-liste">
          <li>
            <Kort
              til="/1t"
              tittel="Matematikk 1T"
              tekst="Fra tallmengder og brøk til funksjoner og polynomer."
              fot={`${antallPresentasjoner} presentasjoner og puggeliste`}
            />
          </li>
        </ul>
      </nav>
    </section>
  )
}
