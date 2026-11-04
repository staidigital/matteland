import { Link, Outlet, useLocation } from 'react-router-dom'

export default function Layout() {
  // Forsiden har navnet som hovedoverskrift, så den trenger ikke logoen i tillegg
  const erForside = useLocation().pathname === '/'
  return (
    <>
      {!erForside && (
        <header className="site-header">
          <Link to="/" className="logo">
            Matteland
          </Link>
        </header>
      )}
      <main className="site-main">
        <Outlet />
      </main>
    </>
  )
}
