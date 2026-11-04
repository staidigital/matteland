import { Presentasjon } from '../../../presentasjon/Presentasjon'
import { LYSBILDER } from './lysbildeliste'

export default function Figurtall() {
  return <Presentasjon lysbilder={LYSBILDER} tilbake={{ til: '/1t', tekst: '1T' }} />
}
