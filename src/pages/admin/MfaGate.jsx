import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'

export default function MfaGate() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('loading') // loading | enroll | challenge | error
  const [qr, setQr] = useState(null)
  const [secret, setSecret] = useState(null)
  const [factorId, setFactorId] = useState(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function init() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { navigate('/admin/login', { replace: true }); return }

      const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
      if (aal?.currentLevel === 'aal2') { navigate('/admin', { replace: true }); return }

      const { data: factors, error: listErr } = await supabase.auth.mfa.listFactors()
      if (listErr) { if (!cancelled) { setError(listErr.message); setMode('error') } return }

      const verified = (factors?.totp || []).find(f => f.status === 'verified')
      if (verified) {
        if (!cancelled) { setFactorId(verified.id); setMode('challenge') }
        return
      }

      // No verified factor — enroll. Clear any stale unverified factors first.
      for (const f of (factors?.totp || []).filter(f => f.status === 'unverified')) {
        try { await supabase.auth.mfa.unenroll({ factorId: f.id }) } catch (_) { /* noop */ }
      }
      const { data: enrolled, error: enrErr } = await supabase.auth.mfa.enroll({ factorType: 'totp' })
      if (cancelled) return
      if (enrErr) { setError(enrErr.message); setMode('error'); return }
      setFactorId(enrolled.id)
      setQr(enrolled.totp.qr_code)
      setSecret(enrolled.totp.secret)
      setMode('enroll')
    }
    init()
    return () => { cancelled = true }
  }, [navigate])

  async function handleVerify(e) {
    e.preventDefault()
    setBusy(true); setError(null)
    const { data: ch, error: chErr } = await supabase.auth.mfa.challenge({ factorId })
    if (chErr) { setBusy(false); setError(chErr.message); return }
    const { error: vErr } = await supabase.auth.mfa.verify({ factorId, challengeId: ch.id, code: code.trim() })
    setBusy(false)
    if (vErr) { setError(vErr.message); setCode(''); return }
    navigate('/admin', { replace: true })
  }

  async function handleSignOut() {
    await supabase.auth.signOut()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)' }}>
      <div style={{ background: 'white', padding: 40, width: '100%', maxWidth: 420, boxShadow: '0 8px 40px rgba(0,0,0,0.25)' }}>
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
          <img src="/assets/logo-stacked-fullcolor-dark.svg" alt="I78 Truck Center" style={{ height: 48 }} />
          <p style={{ fontSize: 13, marginTop: 12, opacity: 0.5, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Two-Step Verification
          </p>
        </div>

        {mode === 'loading' && <p style={{ textAlign: 'center', opacity: 0.4, fontSize: 14 }}>Loading…</p>}

        {mode === 'error' && (
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: 'var(--red)', fontSize: 14, lineHeight: 1.6 }}>{error || 'Something went wrong.'}</p>
            <button onClick={handleSignOut} className="btn-red" style={{ marginTop: 16, justifyContent: 'center', width: '100%' }}>Back to Login</button>
          </div>
        )}

        {mode === 'enroll' && (
          <>
            <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.7, marginBottom: 16 }}>
              Scan this QR code with an authenticator app (Google Authenticator, Authy, 1Password), then enter the 6-digit code to finish setup.
            </p>
            {qr && (
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                <img src={qr} alt="MFA QR code" style={{ width: 200, height: 200 }} />
              </div>
            )}
            {secret && (
              <p style={{ fontSize: 12, textAlign: 'center', opacity: 0.5, marginBottom: 16, wordBreak: 'break-all' }}>
                Can’t scan? Enter this key manually:<br /><code style={{ fontWeight: 700 }}>{secret}</code>
              </p>
            )}
            <CodeForm code={code} setCode={setCode} onSubmit={handleVerify} busy={busy} error={error} label="Verify & Enable" />
          </>
        )}

        {mode === 'challenge' && (
          <>
            <p style={{ fontSize: 14, lineHeight: 1.6, opacity: 0.7, marginBottom: 16 }}>
              Enter the current 6-digit code from your authenticator app.
            </p>
            <CodeForm code={code} setCode={setCode} onSubmit={handleVerify} busy={busy} error={error} label="Verify" />
          </>
        )}

        {(mode === 'enroll' || mode === 'challenge') && (
          <button onClick={handleSignOut} style={{ background: 'none', border: 'none', color: 'var(--ink)', opacity: 0.45, fontSize: 12, marginTop: 16, cursor: 'pointer', width: '100%', fontFamily: 'var(--ff-body)' }}>
            Sign out
          </button>
        )}
      </div>
    </div>
  )
}

function CodeForm({ code, setCode, onSubmit, busy, error, label }) {
  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]*"
        maxLength={6}
        value={code}
        onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
        placeholder="123456"
        autoFocus
        style={{
          width: '100%', padding: '12px 14px', border: '1.5px solid var(--grey)', background: 'var(--cream)',
          fontSize: 22, letterSpacing: '0.3em', textAlign: 'center', fontFamily: 'var(--ff-body)', outline: 'none', boxSizing: 'border-box',
        }}
      />
      {error && <p style={{ color: 'var(--red)', fontSize: 13, margin: 0 }}>{error}</p>}
      <button type="submit" className="btn-red" disabled={busy || code.length !== 6} style={{ justifyContent: 'center', opacity: (busy || code.length !== 6) ? 0.6 : 1 }}>
        {busy ? 'Verifying…' : label}
      </button>
    </form>
  )
}
