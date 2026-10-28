import { Link } from 'react-router-dom'

const inndelinger = [
  {
    tittel: 'Andregradslikninger',
    temaer: [{ path: 'nullpunktsfaktorisering', tittel: 'Nullpunktsfaktorisering' }],
  },
  {
    tittel: 'Funksjoner',
    temaer: [
      { path: 'funksjoner', tittel: 'Funksjonsbegrepet' },
      { path: 'skjaeringspunkter', tittel: 'Skjæringspunkter' },
      { path: 'lineare-funksjoner', tittel: 'Lineære funksjoner' },
    ],
  },
]

export default function Matematikk1T() {
  return (
    <section>
      <h1>Matematikk 1T</h1>
      <nav>
        {inndelinger.map((inndeling) => (
          <div key={inndeling.tittel} className="inndeling">
            <h2>{inndeling.tittel}</h2>
            <ul className="link-list">
              {inndeling.temaer.map((tema) => (
                <li key={tema.path}>
                  <Link to={tema.path}>{tema.tittel}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </section>
  )
}
