import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/manage-users`

async function authHeaders() {
  const { data: { session } } = await supabase.auth.getSession()
  return { Authorization: `Bearer ${session?.access_token}`, 'Content-Type': 'application/json' }
}

export default function UsersPage() {
  const [users, setUsers] = useState(null)
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [inviting, setInviting] = useState(false)
  const [deletingId, setDeletingId] = useState(null)

  async function load() {
    const res = await fetch(FN_URL, { headers: await authHeaders() })
    const data = await res.json()
    if (!res.ok) { setError(data.error); return }
    setUsers(data)
  }

  useEffect(() => { load() }, [])

  async function handleInvite(e) {
    e.preventDefault()
    setInviting(true)
    setError(null)
    const res = await fetch(FN_URL, {
      method: 'POST',
      headers: await authHeaders(),
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setInviting(false)
    if (!res.ok) { setError(data.error); return }
    setEmail('')
    load()
  }

  async function handleDelete(userId) {
    if (!confirm('Remove this admin user? They will no longer be able to log in.')) return
    setDeletingId(userId)
    setError(null)
    const res = await fetch(`${FN_URL}/${userId}`, {
      method: 'DELETE',
      headers: await authHeaders(),
    })
    const data = await res.json()
    setDeletingId(null)
    if (!res.ok) { setError(data.error); return }
    load()
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Admin Users</h1>
      <p style={{ color: 'var(--ink)', opacity: 0.45, fontSize: 14, marginBottom: 28 }}>
        Manage who can log into this admin panel.
      </p>

      {/* Invite form */}
      <div style={{ background: 'white', border: '1px solid var(--grey)', padding: '20px 24px', marginBottom: 28 }}>
        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 800, marginBottom: 14 }}>Invite New Admin</h3>
        <form onSubmit={handleInvite} style={{ display: 'flex', gap: 12, alignItems: 'flex-end' }}>
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
          <button type="submit" className="btn-red" disabled={inviting} style={{ opacity: inviting ? 0.7 : 1, flexShrink: 0 }}>
            {inviting ? 'Sending…' : 'Send Invite'}
          </button>
        </form>
        <p style={{ fontSize: 12, color: 'var(--ink)', opacity: 0.4, marginTop: 8 }}>
          An invitation email will be sent. The user must set their password via the link.
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
                {['Email', 'Invited', 'Last Sign-In', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.45 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--grey)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{u.email}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--ink)', opacity: 0.45 }}>{fmt(u.invited_at || u.created_at)}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--ink)', opacity: 0.45 }}>{u.last_sign_in_at ? fmt(u.last_sign_in_at) : '—'}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(u.id)}
                      disabled={deletingId === u.id}
                      style={{
                        background: 'none',
                        border: '1px solid rgba(192,32,38,0.3)',
                        color: 'var(--red)',
                        padding: '4px 12px',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'var(--ff-body)',
                        opacity: deletingId === u.id ? 0.5 : 1,
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
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
