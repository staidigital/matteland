import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <section className="home">
      <h1>Matteland</h1>
      <nav>
        <ul className="link-list">
          <li>
            <Link to="/1t">Matematikk 1T</Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}
