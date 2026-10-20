import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="logo">
          Matteland
        </Link>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
    </>
  )
}
