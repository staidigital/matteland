import { Link } from 'react-router-dom'

type Props = {
  til: string
  tittel: string
  tekst: string
  fot: string
  fremhevet?: boolean
}

/** Et lenkekort som fører videre til et fag, en presentasjon eller en annen side. */
export default function Kort({ til, tittel, tekst, fot, fremhevet }: Props) {
  return (
    <Link to={til} className={'kort' + (fremhevet ? ' fremhevet' : '')}>
      <span className="kort-tittel">{tittel}</span>
      <span className="kort-tekst">{tekst}</span>
      <span className="kort-fot">
        <span>{fot}</span>
        <span aria-hidden="true">→</span>
      </span>
    </Link>
  )
}
