import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import LogoHorizontal from '../../assets/logo-horizontal-white.svg?react'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top bar — always visible phone number */}
      <div style={{ backgroundColor: '#c02026' }} className="text-white text-sm py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-y-1">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="hidden sm:inline text-white/90">📍 120 Klein Road, Bethel, PA 19507</span>
            <span className="hidden sm:inline text-white/50">|</span>
            <a
              href="tel:7179335655"
              className="font-bold text-white text-base tracking-wide hover:text-yellow-200 transition-colors"
            >
              📞 717-933-5655
            </a>
          </div>
          <span className="text-white/90 font-semibold text-xs sm:text-sm tracking-wider uppercase">
            ⚡ 24/7 Emergency Dispatch
          </span>
        </div>
      </div>

      {/* Main nav bar */}
      <div style={{ backgroundColor: '#282020' }} className="py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <NavLink to="/" aria-label="I78 Truck Center Home">
            <LogoHorizontal className="h-9 w-auto" />
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `px-4 py-2 rounded text-sm font-semibold tracking-wide uppercase transition-colors ${
                    isActive
                      ? 'text-white bg-white/10'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <a
              href="tel:7179335655"
              className="ml-3 px-5 py-2 rounded text-sm font-bold tracking-wide uppercase text-white transition-colors"
              style={{ backgroundColor: '#c02026' }}
            >
              Call Now
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2 rounded hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div style={{ backgroundColor: '#282020' }} className="md:hidden mt-2 pb-3 border-t border-white/10">
            <nav className="flex flex-col pt-2">
              {navLinks.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 text-sm font-semibold tracking-wide uppercase transition-colors ${
                      isActive ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <a
                href="tel:7179335655"
                className="mx-4 mt-3 py-3 rounded text-center text-sm font-bold tracking-wide uppercase text-white"
                style={{ backgroundColor: '#c02026' }}
              >
                📞 Call 717-933-5655
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
