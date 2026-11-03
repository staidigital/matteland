import { Presentasjon } from '../../../presentasjon/Presentasjon'
import { LYSBILDER } from './lysbildeliste'

export default function Polynomfunksjoner() {
  return <Presentasjon lysbilder={LYSBILDER} tilbake={{ til: '/1t', tekst: '1T' }} />
}
