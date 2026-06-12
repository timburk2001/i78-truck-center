import { useEffect, useState } from 'react'
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

const NAV = [
  { to: '/admin', label: 'Submissions', end: true },
  { to: '/admin/recipients', label: 'Recipients' },
  { to: '/admin/users', label: 'Users' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const [checking, setChecking] = useState(true)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate('/admin/login', { replace: true }); return }
      setUserEmail(session.user.email)
      setChecking(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate('/admin/login', { replace: true })
    })
    return () => subscription.unsubscribe()
  }, [navigate])

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
        <p style={{ color: 'var(--ink)', opacity: 0.4, fontSize: 14 }}>Loading…</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--cream)' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220,
        background: 'var(--ink)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        position: 'sticky',
        top: 0,
        height: '100vh',
      }}>
        <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <Link to="/">
            <img src="/assets/logo-stacked-fullcolor-light.svg" alt="I78" style={{ height: 40, width: 'auto' }} />
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 10 }}>
            Admin
          </p>
        </div>

        <nav style={{ flex: 1, padding: '16px 0' }}>
          {NAV.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              style={({ isActive }) => ({
                display: 'block',
                padding: '10px 20px',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--red)' : '3px solid transparent',
                transition: 'all 0.15s',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginBottom: 10, wordBreak: 'break-all' }}>{userEmail}</p>
          <button
            onClick={handleLogout}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.6)',
              padding: '7px 14px',
              fontSize: 12,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              cursor: 'pointer',
              width: '100%',
              fontFamily: 'var(--ff-body)',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}
