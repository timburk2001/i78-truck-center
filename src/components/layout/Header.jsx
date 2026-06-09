import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import LogoHorizontal from '../../assets/logo-horizontal-white.svg?react'
import Icon from '../ui/Icon'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [shrunk, setShrunk] = useState(false)

  // Scroll shrink
  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Body overflow + Escape key when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 shadow-lg">
        {/* Top bar */}
        <div style={{ backgroundColor: 'var(--red)' }} className="text-white text-sm py-2 px-4">
          <div className="wrap flex items-center justify-between gap-y-1 flex-wrap">
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-1.5 text-white/80 text-xs">
                <Icon name="pin" size={14} />
                120 Klein Road, Bethel, PA 19507
              </span>
              <span className="hidden sm:block text-white/40">|</span>
              <a
                href="tel:7179335655"
                className="flex items-center gap-1.5 font-bold text-white text-sm tracking-wide hover:text-[var(--cream)] transition-colors"
              >
                <Icon name="phone" size={14} />
                717-933-5655
              </a>
            </div>
            <span className="flex items-center gap-1.5 text-white/90 font-semibold text-xs tracking-wider uppercase">
              <Icon name="bolt" size={13} />
              24/7 Emergency Dispatch
            </span>
          </div>
        </div>

        {/* Main nav bar */}
        <div
          style={{
            backgroundColor: 'var(--ink)',
            minHeight: shrunk ? 62 : 76,
            transition: 'min-height 0.25s ease',
          }}
          className="px-4 flex items-center"
        >
          <div className="wrap w-full flex items-center justify-between">
            <NavLink to="/" aria-label="I78 Truck Center Home">
              <LogoHorizontal
                style={{
                  height: shrunk ? 33 : 38,
                  width: 'auto',
                  transition: 'height 0.25s ease',
                }}
              />
            </NavLink>

            {/* Desktop nav — hidden below 1180px */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-semibold tracking-wide uppercase transition-colors ${
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
                className="ml-3 btn-red text-sm py-2.5 px-5"
              >
                <Icon name="phone" size={14} />
                Call Now
              </a>
            </nav>

            {/* Mobile hamburger — visible below 1180px */}
            <button
              className="lg:hidden text-white p-2 hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Icon name="menu" size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer — always in DOM, slides from top */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 60,
          backgroundColor: 'var(--ink)',
          transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
        aria-hidden={!menuOpen}
      >
        {/* Drawer header */}
        <div
          style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'var(--red)' }}
          className="px-4 py-2 flex items-center justify-between"
        >
          <a href="tel:7179335655" className="flex items-center gap-1.5 font-bold text-white text-sm">
            <Icon name="phone" size={14} />
            717-933-5655
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="text-white p-2 hover:bg-white/10 transition-colors"
          >
            <Icon name="close" size={22} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col py-4 px-4 gap-1">
          {navLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `px-4 py-3.5 text-base font-semibold tracking-wide uppercase transition-colors border-b border-white/5 ${
                  isActive ? 'text-white bg-white/10' : 'text-white/70 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href="tel:7179335655"
            onClick={() => setMenuOpen(false)}
            className="btn-red mt-4 justify-center text-base"
          >
            <Icon name="phone" size={16} />
            Call 717-933-5655
          </a>
        </nav>
      </div>
    </>
  )
}
