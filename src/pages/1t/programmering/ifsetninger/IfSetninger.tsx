import { Presentasjon } from '../../../../presentasjon/Presentasjon'
import { LYSBILDER } from './lysbildeliste'

export default function IfSetninger() {
  return <Presentasjon lysbilder={LYSBILDER} tilbake={{ til: '/1t', tekst: '1T' }} />
}
