import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import Matematikk1T from './pages/1t/Matematikk1T.tsx'
import Nullpunktsfaktorisering from './pages/1t/nullpunktsfaktorisering/Nullpunktsfaktorisering.tsx'
import Funksjoner from './pages/1t/funksjoner/Funksjoner.tsx'
import Skjaeringspunkter from './pages/1t/skjaeringspunkter/Skjaeringspunkter.tsx'
import LineareFunksjoner from './pages/1t/lineare/LineareFunksjoner.tsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="1t" element={<Matematikk1T />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* Presentasjoner bruker hele skjermen og har sin egen kontrollinje */}
      <Route path="1t/nullpunktsfaktorisering" element={<Nullpunktsfaktorisering />} />
      <Route path="1t/funksjoner" element={<Funksjoner />} />
      <Route path="1t/skjaeringspunkter" element={<Skjaeringspunkter />} />
      <Route path="1t/lineare-funksjoner" element={<LineareFunksjoner />} />
    </Routes>
  )
}
