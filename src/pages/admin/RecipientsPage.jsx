import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function RecipientsPage() {
  const [recipients, setRecipients] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', receives_contact: true, receives_applications: true })
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  async function load() {
    const { data, error: err } = await supabase.from('form_recipients').select('*').order('created_at')
    if (err) { setError(err.message); return }
    setRecipients(data)
  }

  useEffect(() => { load() }, [])

  async function handleAdd(e) {
    e.preventDefault()
    setAdding(true)
    setError(null)
    const { error: err } = await supabase.from('form_recipients').insert([form])
    setAdding(false)
    if (err) { setError(err.message); return }
    setForm({ name: '', email: '', receives_contact: true, receives_applications: true })
    load()
  }

  async function handleToggle(id, field, current) {
    const { error: err } = await supabase.from('form_recipients').update({ [field]: !current }).eq('id', id)
    if (err) { setError(err.message); return }
    load()
  }

  async function handleDelete(id) {
    if (!confirm('Remove this recipient? They will stop receiving form notifications.')) return
    setDeletingId(id)
    const { error: err } = await supabase.from('form_recipients').delete().eq('id', id)
    setDeletingId(null)
    if (err) { setError(err.message); return }
    load()
  }

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Form Recipients</h1>
      <p style={{ color: 'var(--ink)', opacity: 0.45, fontSize: 14, marginBottom: 28 }}>
        Who receives email notifications when forms are submitted.
      </p>

      {/* Add form */}
      <div style={{ background: 'white', border: '1px solid var(--grey)', padding: '20px 24px', marginBottom: 28 }}>
        <h3 style={{ fontFamily: 'var(--ff-display)', fontSize: 16, fontWeight: 800, marginBottom: 14 }}>Add Recipient</h3>
        <form onSubmit={handleAdd} style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'flex-end' }}>
          <div style={{ flex: '1 1 160px' }}>
            <label style={labelStyle}>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
              placeholder="e.g. Shawn"
              style={inputStyle}
            />
          </div>
          <div style={{ flex: '2 1 220px' }}>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
              placeholder="shawn@i78truckcenter.com"
              style={inputStyle}
            />
          </div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', paddingBottom: 2 }}>
            <label style={checkLabel}>
              <input type="checkbox" checked={form.receives_contact} onChange={e => setForm(f => ({ ...f, receives_contact: e.target.checked }))} />
              Contact
            </label>
            <label style={checkLabel}>
              <input type="checkbox" checked={form.receives_applications} onChange={e => setForm(f => ({ ...f, receives_applications: e.target.checked }))} />
              Applications
            </label>
          </div>
          <button type="submit" className="btn-red" disabled={adding} style={{ opacity: adding ? 0.7 : 1, flexShrink: 0 }}>
            {adding ? 'Adding…' : 'Add'}
          </button>
        </form>
      </div>

      {error && <p style={{ color: 'var(--red)', marginBottom: 16, fontSize: 13 }}>{error}</p>}

      {recipients === null ? (
        <p style={{ color: 'var(--ink)', opacity: 0.4 }}>Loading…</p>
      ) : recipients.length === 0 ? (
        <p style={{ color: 'var(--ink)', opacity: 0.4, fontSize: 14 }}>No recipients added yet.</p>
      ) : (
        <div style={{ background: 'white', border: '1px solid var(--grey)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--grey)' }}>
                {['Name', 'Email', 'Contact Forms', 'Job Apps', ''].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.45 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recipients.map(r => (
                <tr key={r.id} style={{ borderBottom: '1px solid var(--grey)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600 }}>{r.name}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--ink)', opacity: 0.55 }}>{r.email}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <Toggle on={r.receives_contact} onChange={() => handleToggle(r.id, 'receives_contact', r.receives_contact)} />
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <Toggle on={r.receives_applications} onChange={() => handleToggle(r.id, 'receives_applications', r.receives_applications)} />
                  </td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button
                      onClick={() => handleDelete(r.id)}
                      disabled={deletingId === r.id}
                      style={{
                        background: 'none',
                        border: '1px solid rgba(192,32,38,0.3)',
                        color: 'var(--red)',
                        padding: '4px 12px',
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: 'pointer',
                        fontFamily: 'var(--ff-body)',
                        opacity: deletingId === r.id ? 0.5 : 1,
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

function Toggle({ on, onChange }) {
  return (
    <button
      onClick={onChange}
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        background: on ? 'var(--navy)' : 'var(--grey)',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'background 0.2s',
        flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute',
        top: 3,
        left: on ? 20 : 3,
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: 'white',
        transition: 'left 0.2s',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
      }} />
    </button>
  )
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

const checkLabel = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
  userSelect: 'none',
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
