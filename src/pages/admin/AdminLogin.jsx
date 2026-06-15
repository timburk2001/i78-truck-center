import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import Turnstile, { TURNSTILE_SITE_KEY } from '../../components/Turnstile'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [captchaToken, setCaptchaToken] = useState(null)
  const [turnstileKey, setTurnstileKey] = useState(0)

  function resetCaptcha() {
    setCaptchaToken(null)
    setTurnstileKey(k => k + 1)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const { error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: captchaToken ? { captchaToken } : undefined,
    })
    setLoading(false)
    if (err) {
      setError(err.message)
      resetCaptcha() // Turnstile tokens are single-use — get a fresh one for the retry
      return
    }
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
            Admin Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              style={inputStyle}
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          <Turnstile key={turnstileKey} onVerify={setCaptchaToken} onExpire={() => setCaptchaToken(null)} />

          {error && (
            <p style={{ color: 'var(--red)', fontSize: 13, margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            className="btn-red"
            disabled={loading || (!!TURNSTILE_SITE_KEY && !captchaToken)}
            style={{ marginTop: 8, justifyContent: 'center', opacity: (loading || (!!TURNSTILE_SITE_KEY && !captchaToken)) ? 0.7 : 1 }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
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
