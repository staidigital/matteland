import { Link } from 'react-router-dom'

const temaer = [
  { path: 'nullpunktsfaktorisering', tittel: 'Nullpunktsfaktorisering' },
  { path: 'funksjoner', tittel: 'Funksjonsbegrepet' },
]

export default function Matematikk1T() {
  return (
    <section>
      <h1>Matematikk 1T</h1>
      <nav>
        <ul className="link-list">
          {temaer.map((tema) => (
            <li key={tema.path}>
              <Link to={tema.path}>{tema.tittel}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  )
}
