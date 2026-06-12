import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function SetPassword() {
  const navigate = useNavigate()
  const [ready, setReady] = useState(false)
  const [checked, setChecked] = useState(false)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    // The invite link carries a session token in the URL hash, which the
    // Supabase client picks up automatically (detectSessionInUrl).
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setReady(true)
      setChecked(true)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) { setReady(true); setChecked(true) }
    })
    return () => subscription.unsubscribe()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setSaving(true)
    setError(null)
    const { error: err } = await supabase.auth.updateUser({ password })
    setSaving(false)
    if (err) { setError(err.message); return }
    navigate('/admin')
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--ink)',
    }}>
      <div style={{
        background: 'white',
        padding: 40,
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
      }}>
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <img src="/assets/logo-stacked-fullcolor-dark.svg" alt="I78 Truck Center" style={{ height: 52 }} />
          <p style={{ color: 'var(--ink)', fontSize: 13, marginTop: 12, opacity: 0.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Set Your Password
          </p>
        </div>

        {!checked ? (
          <p style={{ textAlign: 'center', color: 'var(--ink)', opacity: 0.4, fontSize: 14 }}>Verifying invitation…</p>
        ) : !ready ? (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--red)', fontSize: 14, lineHeight: 1.6 }}>
              This invitation link is invalid or has expired.
            </p>
            <button onClick={() => navigate('/admin/login')} className="btn-red" style={{ marginTop: 16, justifyContent: 'center', width: '100%' }}>
              Go to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label style={labelStyle}>New Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoFocus
                style={inputStyle}
                placeholder="At least 8 characters"
              />
            </div>
            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {error && <p style={{ color: 'var(--red)', fontSize: 13, margin: 0 }}>{error}</p>}

            <button type="submit" className="btn-red" disabled={saving} style={{ marginTop: 8, justifyContent: 'center', opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Saving…' : 'Set Password & Continue'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: 12,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color: 'var(--ink)',
  marginBottom: 6,
  opacity: 0.6,
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  border: '1.5px solid var(--grey)',
  fontSize: 15,
  fontFamily: 'var(--ff-body)',
  outline: 'none',
  boxSizing: 'border-box',
  background: 'var(--cream)',
}
