import Kort from '../../components/Kort.tsx'
import { LYSBILDER as tallmengder } from './tallmengder/lysbildeliste'
import { LYSBILDER as bokstavuttrykk } from './bokstavuttrykk/lysbildeliste'
import { LYSBILDER as brokregning } from './brokregning/lysbildeliste'
import { LYSBILDER as forstegradslikninger } from './forstegradslikninger/lysbildeliste'
import { LYSBILDER as potenser } from './potenser/lysbildeliste'
import { LYSBILDER as figurtall } from './figurtall/lysbildeliste'
import { LYSBILDER as nullpunktsfaktorisering } from './nullpunktsfaktorisering/lysbildeliste'
import { LYSBILDER as funksjoner } from './funksjoner/lysbildeliste'
import { LYSBILDER as skjaeringspunkter } from './skjaeringspunkter/lysbildeliste'
import { LYSBILDER as lineare } from './lineare/lysbildeliste'
import { LYSBILDER as polynomfunksjoner } from './polynomfunksjoner/lysbildeliste'

const inndelinger = [
  {
    tittel: 'Basics',
    temaer: [
      {
        path: 'tallmengder',
        tittel: 'Tallmengder',
        tekst: 'Hva slags tall finnes, og hvordan skriver vi hvilke tall vi snakker om?',
        antall: tallmengder.length,
      },
      {
        path: 'bokstavuttrykk',
        tittel: 'Bokstavuttrykk og faktorisering',
        tekst: 'Å gange ut og å faktorisere er det samme regnestykket, bare i hver sin retning.',
        antall: bokstavuttrykk.length,
      },
      {
        path: 'brokregning',
        tittel: 'Brøkregning',
        tekst: 'Forkorte, finne fellesnevner, gange og dele, og det samme med bokstaver.',
        antall: brokregning.length,
      },
      {
        path: 'forstegradslikninger',
        tittel: 'Førstegradslikninger',
        tekst: 'Finne det ukjente tallet ved å gjøre det samme på begge sider.',
        antall: forstegradslikninger.length,
      },
      {
        path: 'potenser',
        tittel: 'Potenser og røtter',
        tekst: 'Gjentatt multiplikasjon, reglene som følger av det, og hvorfor røtter også er potenser.',
        antall: potenser.length,
      },
      {
        path: 'figurtall',
        tittel: 'Figurtall og generalisering',
        tekst: 'Fra noen få figurer til en formel som gjelder for alle.',
        antall: figurtall.length,
      },
    ],
  },
  {
    tittel: 'Andregradslikninger',
    temaer: [
      {
        path: 'nullpunktsfaktorisering',
        tittel: 'Nullpunktsfaktorisering',
        tekst: 'Når vi vet hvor grafen krysser x-aksen, kan vi skrive andregradsuttrykket som et produkt av faktorer.',
        antall: nullpunktsfaktorisering.length,
      },
    ],
  },
  {
    tittel: 'Funksjoner',
    temaer: [
      {
        path: 'funksjoner',
        tittel: 'Funksjonsbegrepet',
        tekst: 'En funksjon er en regel som gjør om hver innverdi til nøyaktig én utverdi.',
        antall: funksjoner.length,
      },
      {
        path: 'skjaeringspunkter',
        tittel: 'Skjæringspunkter',
        tekst: 'Hvor treffer grafen aksene, og hvor møtes to grafer? Svaret finner vi med en likning.',
        antall: skjaeringspunkter.length,
      },
      {
        path: 'lineare-funksjoner',
        tittel: 'Lineære funksjoner',
        tekst: 'Grafen er en rett linje. To tall bestemmer alt: hvor bratt den er, og hvor den skjærer y-aksen.',
        antall: lineare.length,
      },
      {
        path: 'polynomfunksjoner',
        tittel: 'Polynomfunksjoner',
        tekst: 'Parabler og kurver som snur. Vi finner symmetrilinjer, topp- og bunnpunkter og nullpunkter.',
        antall: polynomfunksjoner.length,
      },
    ],
  },
]

export const antallPresentasjoner = inndelinger.reduce((sum, i) => sum + i.temaer.length, 0)

export default function Matematikk1T() {
  return (
    <section>
      <h1>Matematikk 1T</h1>
      <p className="lede">Velg et tema for å åpne presentasjonen, eller gå rett til formlene du skal kunne utenat.</p>
      <div className="puggeliste">
        <Kort
          til="formler"
          tittel="Puggeliste"
          tekst="Formlene du skal kunne utenat, klare til utskrift."
          fot="Formler"
          fremhevet
        />
      </div>
      <nav aria-label="Temaer">
        {inndelinger.map((inndeling) => (
          <div key={inndeling.tittel} className="inndeling">
            <h2>{inndeling.tittel}</h2>
            <ul className="kort-liste">
              {inndeling.temaer.map((tema) => (
                <li key={tema.path}>
                  <Kort til={tema.path} tittel={tema.tittel} tekst={tema.tekst} fot={`${tema.antall} lysbilder`} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </section>
  )
}
