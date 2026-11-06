import { useCallback, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { FunctionsHttpError, type Session } from '@supabase/supabase-js'
import Spillskjerm, { type Handling } from './Spillskjerm.tsx'
import { useRunde } from './useRunde.ts'
import { erAdmin, supabase, tilBrukernavn, tilEpost, useSesjon } from './supabase.ts'
import './mathofclans.css'

export default function MathOfClans() {
  const sesjon = useSesjon()

  // Unngår at skjemaet blinker til for den som allerede er innlogget
  if (sesjon === undefined) return null
  if (sesjon) return <Innlogget sesjon={sesjon} />

  return (
    <section className="moc-innlogging">
      <div className="kicker">Matteland</div>
      <h1>Math of Clans</h1>
      <Innlogging />
    </section>
  )
}

function Innlogget({ sesjon }: { sesjon: Session }) {
  const { tilstand, lastet, feil, settStatus, effekter, fjernEffekt, oppdaterForsvar } = useRunde(sesjon.user.id)

  const handling: Handling = useCallback(async (innhold) => {
    const { data, error } = await supabase.functions.invoke('spill', { body: innhold })
    if (!error) return { data }
    if (error instanceof FunctionsHttpError) {
      const svar = await error.context.json().catch(() => null)
      if (svar?.feil) return { feil: svar.feil as string }
    }
    return { feil: 'Fikk ikke kontakt med serveren.' }
  }, [])

  return (
    <section className="moc-spillside">
      <div className="moc-spillhode">
        <h1>Math of Clans</h1>
        <div className="moc-bruker">
          <span>{tilBrukernavn(sesjon)}</span>
          {erAdmin(sesjon) && <Link className="moc-lenke" to="/math-of-clans/admin">Administrer</Link>}
          <button type="button" className="moc-knapp-liten" onClick={() => void supabase.auth.signOut()}>
            Logg ut
          </button>
        </div>
      </div>

      {feil && <p className="moc-feil" role="alert">{feil}</p>}

      {lastet && !tilstand.runde && (
        <p className="moc-beskjed">Ingen runde er startet ennå. Vent til læreren starter en runde.</p>
      )}

      {lastet && tilstand.runde && (
        <Spillskjerm
          tilstand={tilstand}
          spillerId={sesjon.user.id}
          handling={handling}
          settStatus={settStatus}
          effekter={effekter}
          fjernEffekt={fjernEffekt}
          oppdaterForsvar={oppdaterForsvar}
        />
      )}
    </section>
  )
}

function Innlogging() {
  const [brukernavn, setBrukernavn] = useState('')
  const [passord, setPassord] = useState('')
  const [feil, setFeil] = useState('')
  const [venter, setVenter] = useState(false)

  async function loggInn(event: FormEvent) {
    event.preventDefault()
    setVenter(true)
    setFeil('')
    const { error } = await supabase.auth.signInWithPassword({
      email: tilEpost(brukernavn),
      password: passord,
    })
    setVenter(false)
    if (error) {
      setFeil(
        error.code === 'invalid_credentials'
          ? 'Feil brukernavn eller passord.'
          : 'Kunne ikke logge inn. Prøv igjen om litt.',
      )
    }
  }

  return (
    <form className="moc-kort" onSubmit={loggInn}>
      <label htmlFor="moc-brukernavn">Brukernavn</label>
      <input
        id="moc-brukernavn"
        name="brukernavn"
        type="text"
        autoComplete="username"
        autoCapitalize="none"
        spellCheck={false}
        required
        value={brukernavn}
        onChange={(e) => setBrukernavn(e.target.value)}
      />

      <label htmlFor="moc-passord">Passord</label>
      <input
        id="moc-passord"
        name="passord"
        type="password"
        autoComplete="current-password"
        required
        value={passord}
        onChange={(e) => setPassord(e.target.value)}
      />

      <button type="submit" className="moc-knapp" disabled={venter}>
        {venter ? 'Logger inn …' : 'Logg inn'}
      </button>

      {feil && (
        <p className="moc-feil" role="alert">
          {feil}
        </p>
      )}
    </form>
  )
}
