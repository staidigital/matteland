import { Analytics } from '@vercel/analytics/react'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import Matematikk1T from './pages/1t/Matematikk1T.tsx'
import Tallmengder from './pages/1t/tallmengder/Tallmengder.tsx'
import Bokstavuttrykk from './pages/1t/bokstavuttrykk/Bokstavuttrykk.tsx'
import Brokregning from './pages/1t/brokregning/Brokregning.tsx'
import Forstegradslikninger from './pages/1t/forstegradslikninger/Forstegradslikninger.tsx'
import PotenserOgRotter from './pages/1t/potenser/PotenserOgRotter.tsx'
import Figurtall from './pages/1t/figurtall/Figurtall.tsx'
import Kvadratsetningene from './pages/1t/kvadratsetningene/Kvadratsetningene.tsx'
import IdentitetOgBevis from './pages/1t/identiteter/IdentitetOgBevis.tsx'
import FullstendigKvadrat from './pages/1t/fullstendigkvadrat/FullstendigKvadrat.tsx'
import Andregradslikninger from './pages/1t/andregradslikninger/Andregradslikninger.tsx'
import AbcFormelen from './pages/1t/abcformelen/AbcFormelen.tsx'
import PraktiskAndregrad from './pages/1t/praktiskandregrad/PraktiskAndregrad.tsx'
import Nullpunktsfaktorisering from './pages/1t/nullpunktsfaktorisering/Nullpunktsfaktorisering.tsx'
import Funksjoner from './pages/1t/funksjoner/Funksjoner.tsx'
import Skjaeringspunkter from './pages/1t/skjaeringspunkter/Skjaeringspunkter.tsx'
import LineareFunksjoner from './pages/1t/lineare/LineareFunksjoner.tsx'
import Polynomfunksjoner from './pages/1t/polynomfunksjoner/Polynomfunksjoner.tsx'
import Eksponentialfunksjoner from './pages/1t/eksponentialfunksjoner/Eksponentialfunksjoner.tsx'
import PotensRot from './pages/1t/potensrot/PotensRot.tsx'
import Rasjonale from './pages/1t/rasjonale/Rasjonale.tsx'
import Regresjon from './pages/1t/regresjon/Regresjon.tsx'
import Formler from './pages/1t/formler/Formler.tsx'
import RegningOgPrint from './pages/1t/programmering/regning/RegningOgPrint.tsx'
import Variabler from './pages/1t/programmering/variabler/Variabler.tsx'
import IfSetninger from './pages/1t/programmering/ifsetninger/IfSetninger.tsx'

// Lastes for seg, så resten av siden slipper å laste ned Supabase
const MathOfClans = lazy(() => import('./pages/mathofclans/MathOfClans.tsx'))
const MathOfClansAdmin = lazy(() => import('./pages/mathofclans/Admin.tsx'))

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="1t" element={<Matematikk1T />} />
          <Route
            path="math-of-clans"
            element={
              <Suspense>
                <MathOfClans />
              </Suspense>
            }
          />
          <Route
            path="math-of-clans/admin"
            element={
              <Suspense>
                <MathOfClansAdmin />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Presentasjoner bruker hele skjermen og har sin egen kontrollinje */}
        <Route path="1t/tallmengder" element={<Tallmengder />} />
        <Route path="1t/bokstavuttrykk" element={<Bokstavuttrykk />} />
        <Route path="1t/brokregning" element={<Brokregning />} />
        <Route path="1t/forstegradslikninger" element={<Forstegradslikninger />} />
        <Route path="1t/potenser" element={<PotenserOgRotter />} />
        <Route path="1t/figurtall" element={<Figurtall />} />
        <Route path="1t/kvadratsetningene" element={<Kvadratsetningene />} />
        <Route path="1t/identitet-og-bevis" element={<IdentitetOgBevis />} />
        <Route path="1t/fullstendig-kvadrat" element={<FullstendigKvadrat />} />
        <Route path="1t/andregradslikninger" element={<Andregradslikninger />} />
        <Route path="1t/abc-formelen" element={<AbcFormelen />} />
        <Route path="1t/praktisk-andregrad" element={<PraktiskAndregrad />} />
        <Route path="1t/nullpunktsfaktorisering" element={<Nullpunktsfaktorisering />} />
        <Route path="1t/funksjoner" element={<Funksjoner />} />
        <Route path="1t/skjaeringspunkter" element={<Skjaeringspunkter />} />
        <Route path="1t/lineare-funksjoner" element={<LineareFunksjoner />} />
        <Route path="1t/polynomfunksjoner" element={<Polynomfunksjoner />} />
        <Route path="1t/eksponentialfunksjoner" element={<Eksponentialfunksjoner />} />
        <Route path="1t/potens-og-rotfunksjoner" element={<PotensRot />} />
        <Route path="1t/rasjonale-funksjoner" element={<Rasjonale />} />
        <Route path="1t/modellering-og-regresjon" element={<Regresjon />} />
        <Route path="1t/regning-og-print" element={<RegningOgPrint />} />
        <Route path="1t/variabler" element={<Variabler />} />
        <Route path="1t/if-setninger" element={<IfSetninger />} />
        <Route path="1t/formler" element={<Formler />} />
      </Routes>
      <Analytics />
    </>
  )
}
