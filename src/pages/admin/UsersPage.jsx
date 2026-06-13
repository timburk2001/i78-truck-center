import { useEffect, useState } from 'react'
import { supabase, SUPABASE_URL } from '../../lib/supabase'

const FN_URL = `${SUPABASE_URL}/functions/v1/manage-users`

async function authHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  return { Authorization: `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' }
}

export default function UsersPage() {
  const [users, setUsers] = useState(null)
  const [currentEmail, setCurrentEmail] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [notice, setNotice] = useState(null) // { kind: 'created'|'reset', email, password }
  const [busy, setBusy] = useState(false)
  const [rowBusy, setRowBusy] = useState(null)

  async function load() {
    const res = await fetch(FN_URL, { headers: await authHeaders() })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Failed to load users'); return }
    setUsers(data)
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setCurrentEmail(user?.email || ''))
    load()
  }, [])

  async function handleAdd(e) {
    e.preventDefault()
    setBusy(true); setError(null); setNotice(null)
    const res = await fetch(FN_URL, {
      method: 'POST',
      headers: await authHeaders(),
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setBusy(false)
    if (!res.ok) { setError(data.error || 'Failed to add user'); return }
    setNotice({ kind: 'created', email: data.email, password: data.tempPassword })
    setEmail('')
    load()
  }

  async function handleReset(user) {
    if (!confirm(`Reset the password for ${user.email}? Their current password will stop working.`)) return
    setRowBusy(user.id); setError(null); setNotice(null)
    const res = await fetch(`${FN_URL}/${user.id}`, {
      method: 'PATCH',
      headers: await authHeaders(),
    })
    const data = await res.json()
    setRowBusy(null)
    if (!res.ok) { setError(data.error || 'Failed to reset password'); return }
    setNotice({ kind: 'reset', email: user.email, password: data.tempPassword })
  }

  async function handleDelete(user) {
    if (!confirm(`Remove ${user.email}? They will no longer be able to log in.`)) return
    setRowBusy(user.id); setError(null)
    const res = await fetch(`${FN_URL}/${user.id}`, {
      method: 'DELETE',
      headers: await authHeaders(),
    })
    const data = await res.json()
    setRowBusy(null)
    if (!res.ok) { setError(data.error || 'Failed to remove user'); return }
    load()
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Admin Users</h1>
      <p style={{ color: 'var(--ink)', opacity: 0.45, fontSize: 14, marginBottom: 28 }}>
        Manage who can log into this admin panel.
      </p>

      {/* Temp-password notice */}
      {notice && (
        <div style={{ background: '#fff', border: '2px solid var(--navy)', padding: '18px 22px', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
            <div>
              <p style={{ fontWeight: 800, fontSize: 15, margin: '0 0 4px', color: 'var(--navy)' }}>
                {notice.kind === 'created' ? 'User created' : 'Password reset'} — share this temporary password
              </p>
              <p style={{ fontSize: 13, opacity: 0.6, margin: '0 0 12px' }}>
                {notice.email} should log in with it and change it afterward. It won’t be shown again.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <code style={{ background: 'var(--cream)', border: '1px solid var(--grey)', padding: '8px 14px', fontSize: 16, fontWeight: 700, letterSpacing: '0.04em' }}>
                  {notice.password}
                </code>
                <button
                  onClick={() => navigator.clipboard?.writeText(notice.password)}
                  style={ghostBtn}
                >
                  Copy
                </button>
              </div>
            </div>
            <button onClick={() => setNotice(null)} style={{ ...ghostBtn, border: 'none', fontSize: 18, opacity: 0.4 }}>✕</button>
          </div>
        </div>
      )}

      {/* Add user */}
      <div style={{ background: 'white', border: '1px solid var(--grey)', padding: '20px 24px', marginBottom: 28 }}>
        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 800, marginBottom: 14 }}>Add New Admin</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="newadmin@example.com"
              style={inputStyle}
            />
          </div>
          <button type="submit" className="btn-red" disabled={busy} style={{ opacity: busy ? 0.7 : 1, flexShrink: 0 }}>
            {busy ? 'Adding…' : 'Add User'}
          </button>
        </form>
        <p style={{ fontSize: 12, color: 'var(--ink)', opacity: 0.4, marginTop: 8 }}>
          The account is created instantly with a temporary password you can share. No email required.
        </p>
      </div>

      {error && <p style={{ color: 'var(--red)', marginBottom: 16, fontSize: 13 }}>{error}</p>}

      {users === null ? (
        <p style={{ color: 'var(--ink)', opacity: 0.4 }}>Loading…</p>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--grey)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--grey)' }}>
                {['Email', 'Created', 'Last Sign-In', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.45 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => {
                const isSelf = u.email === currentEmail
                return (
                  <tr key={u.id} style={{ borderBottom: '1px solid var(--grey)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>
                      {u.email}{isSelf && <span style={{ marginLeft: 8, fontSize: 11, fontWeight: 700, color: 'var(--navy)' }}>(you)</span>}
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--ink)', opacity: 0.45 }}>{fmt(u.created_at)}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--ink)', opacity: 0.45 }}>{u.last_sign_in_at ? fmt(u.last_sign_in_at) : '—'}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                      <button onClick={() => handleReset(u)} disabled={rowBusy === u.id} style={{ ...rowBtn, marginRight: 8 }}>
                        Reset Password
                      </button>
                      <button
                        onClick={() => handleDelete(u)}
                        disabled={rowBusy === u.id || isSelf}
                        title={isSelf ? "You can't remove your own account" : undefined}
                        style={{ ...rowBtn, color: 'var(--red)', borderColor: 'rgba(192,32,38,0.3)', opacity: isSelf ? 0.35 : 1, cursor: isSelf ? 'not-allowed' : 'pointer' }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function fmt(ts) {
  if (!ts) return '—'
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const labelStyle = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  opacity: 0.5,
  marginBottom: 5,
}

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  border: '1.5px solid var(--grey)',
  fontSize: 14,
  fontFamily: 'var(--ff-body)',
  outline: 'none',
  boxSizing: 'border-box',
  background: 'var(--cream)',
}

const rowBtn = {
  background: 'none',
  border: '1px solid var(--grey)',
  color: 'var(--ink)',
  padding: '4px 12px',
  fontSize: 12,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'var(--ff-body)',
}

const ghostBtn = {
  background: 'none',
  border: '1px solid var(--grey)',
  color: 'var(--ink)',
  padding: '7px 14px',
  fontSize: 13,
  fontWeight: 700,
  cursor: 'pointer',
  fontFamily: 'var(--ff-body)',
}
