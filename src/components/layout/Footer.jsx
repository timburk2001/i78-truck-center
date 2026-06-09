import { Link, NavLink } from 'react-router-dom'
import LogoVertical from '../../assets/logo-vertical-white.svg?react'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: '#282020' }} className="text-white relative overflow-hidden">
      {/* Tire-track texture */}
      <div className="texture-overlay" aria-hidden="true" />
      {/* Caution stripe top border */}
      <div className="caution-stripe h-3" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Column 1 — Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link to="/" aria-label="I78 Truck Center Home">
              <LogoVertical className="h-20 w-auto" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              Pennsylvania's most trusted towing and recovery service. On the road or off it — we get you moving.
            </p>
          </div>

          {/* Column 2 — Quick links + social */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-white font-bold text-lg uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Quick Links
            </h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map(({ to, label, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `text-sm transition-colors ${isActive ? 'text-white' : 'text-white/60 hover:text-white'}`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="I78 Truck Center on Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Column 3 — Contact info */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-white font-bold text-lg uppercase tracking-widest"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Contact
            </h3>
            <address className="not-italic flex flex-col gap-2 text-sm text-white/70">
              <span>120 Klein Road</span>
              <span>Bethel, PA 19507</span>
              <a
                href="tel:7179335655"
                className="font-bold text-white hover:text-[#e73525] transition-colors text-base"
              >
                717-933-5655
              </a>
              <a
                href="mailto:billing@i78truckcenter.com"
                className="text-white/60 hover:text-white transition-colors break-all"
              >
                billing@i78truckcenter.com
              </a>
              <span className="font-semibold" style={{ color: '#e73525' }}>⚡ 24/7 Emergency Dispatch</span>
            </address>
            <a
              href="/assets/state-pricing.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-xs text-white/40 hover:text-white/70 transition-colors underline underline-offset-2"
            >
              State-Mandated Towing Rates (PDF) ↗
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-4 px-6">
        <p className="text-center text-white/40 text-xs">
          © {year} I78 Truck Center. All rights reserved. Licensed & Insured in Pennsylvania.
        </p>
      </div>
    </footer>
  )
}
