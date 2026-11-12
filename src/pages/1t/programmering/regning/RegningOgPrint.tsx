import { Presentasjon } from '../../../../presentasjon/Presentasjon'
import { LYSBILDER } from './lysbildeliste'

export default function RegningOgPrint() {
  return <Presentasjon lysbilder={LYSBILDER} tilbake={{ til: '/1t', tekst: '1T' }} />
}
