import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Re-run scroll reveal on every route change
  useScrollReveal()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
