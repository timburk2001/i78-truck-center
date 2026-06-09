import { Link, NavLink } from 'react-router-dom'
import LogoVertical from '../../assets/logo-vertical-white.svg?react'
import Icon from '../ui/Icon'

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

const serviceLinks = [
  'Light Duty Towing',
  'Heavy Duty Towing',
  'Recovery Services',
  'Emergency Road Service',
  'Secure Storage',
  'Hauling & Repairs',
]

const companyLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
  { to: '/about', label: 'Careers' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{ backgroundColor: 'var(--ink)' }} className="text-white relative overflow-hidden">
      <div className="wrap py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link to="/" aria-label="I78 Truck Center Home">
              <LogoVertical className="h-20 w-auto" />
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, lineHeight: 1.65 }}>
              Pennsylvania's most trusted towing and recovery service. On the road or off it — we get you moving.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
              USDOT 682054 · MC 317524
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="I78 Truck Center on Facebook"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>

          {/* Col 2 — Services */}
          <div className="flex flex-col gap-4">
            <h4 style={{ color: 'white', fontSize: 13, fontFamily: 'var(--ff-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
              Services
            </h4>
            <nav className="flex flex-col gap-2">
              {serviceLinks.map(label => (
                <Link
                  key={label}
                  to="/services"
                  style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = 'white'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Company */}
          <div className="flex flex-col gap-4">
            <h4 style={{ color: 'white', fontSize: 13, fontFamily: 'var(--ff-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
              Company
            </h4>
            <nav className="flex flex-col gap-2">
              {companyLinks.map(({ to, label, end }) => (
                <NavLink
                  key={label}
                  to={to}
                  end={end}
                  style={{ color: 'rgba(255,255,255,0.55)', fontSize: 14, textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.target.style.color = 'white'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.55)'}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Col 4 — Dispatch */}
          <div className="flex flex-col gap-4">
            <h4 style={{ color: 'white', fontSize: 13, fontFamily: 'var(--ff-body)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em' }}>
              Dispatch
            </h4>
            <address className="not-italic flex flex-col gap-3" style={{ fontSize: 14 }}>
              <span className="flex items-start gap-2" style={{ color: 'rgba(255,255,255,0.55)' }}>
                <Icon name="pin" size={15} style={{ marginTop: 2, flexShrink: 0, color: 'var(--orange)' }} />
                <span>120 Klein Road<br />Bethel, PA 19507</span>
              </span>
              <a
                href="tel:7179335655"
                className="flex items-center gap-2 font-bold text-white text-base hover:text-[var(--orange)] transition-colors"
              >
                <Icon name="phone" size={15} style={{ color: 'var(--orange)' }} />
                717-933-5655
              </a>
              <span className="flex items-center gap-2 font-semibold" style={{ color: 'var(--orange)' }}>
                <Icon name="clock" size={15} />
                24/7 Emergency Dispatch
              </span>
              <a
                href="mailto:billing@i78truckcenter.com"
                className="flex items-center gap-2 hover:text-white transition-colors break-all"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                <Icon name="mail" size={14} style={{ flexShrink: 0 }} />
                billing@i78truckcenter.com
              </a>
            </address>
            <a
              href="/assets/state-pricing.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs hover:text-white/70 transition-colors underline underline-offset-2"
              style={{ color: 'rgba(255,255,255,0.35)', marginTop: 2 }}
            >
              State-Mandated Towing Rates (PDF) ↗
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} className="py-4 px-6">
        <p className="text-center" style={{ color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
          © {year} I78 Truck Center. All rights reserved. Licensed & Insured in Pennsylvania. · USDOT 682054 · MC 317524
        </p>
      </div>
    </footer>
  )
}
