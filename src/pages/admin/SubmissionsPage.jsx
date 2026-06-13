import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

const TABS = ['Contact', 'Job Applications']

export default function SubmissionsPage() {
  const [tab, setTab] = useState(0)
  const [contacts, setContacts] = useState(null)
  const [jobs, setJobs] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      const [{ data: c, error: ce }, { data: j, error: je }] = await Promise.all([
        supabase.from('contact_submissions').select('*').order('created_at', { ascending: false }),
        supabase.from('job_applications').select('*').order('created_at', { ascending: false }),
      ])
      if (ce || je) setError((ce || je).message)
      setContacts(c || [])
      setJobs(j || [])
    }
    load()
  }, [])

  const rows = tab === 0 ? contacts : jobs
  const isLoading = rows === null

  return (
    <div style={{ padding: 40 }}>
      <h1 style={{ fontFamily: 'var(--ff-display)', fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Submissions</h1>
      <p style={{ color: 'var(--ink)', opacity: 0.45, fontSize: 14, marginBottom: 28 }}>
        Incoming contact messages and job applications.
      </p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, borderBottom: '2px solid var(--grey)' }}>
        {TABS.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              padding: '10px 20px',
              fontSize: 14,
              fontWeight: 700,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--ff-body)',
              color: tab === i ? 'var(--red)' : 'var(--ink)',
              opacity: tab === i ? 1 : 0.45,
              borderBottom: tab === i ? '2px solid var(--red)' : '2px solid transparent',
              marginBottom: -2,
              transition: 'all 0.15s',
            }}
          >
            {t}
            {!isLoading && (
              <span style={{
                marginLeft: 8,
                background: tab === i ? 'var(--red)' : 'var(--grey)',
                color: tab === i ? 'white' : 'var(--ink)',
                borderRadius: 20,
                padding: '1px 8px',
                fontSize: 11,
                fontWeight: 700,
              }}>
                {i === 0 ? contacts?.length ?? 0 : jobs?.length ?? 0}
              </span>
            )}
          </button>
        ))}
      </div>

      {error && <p style={{ color: 'var(--red)', marginBottom: 16 }}>{error}</p>}

      {isLoading ? (
        <p style={{ color: 'var(--ink)', opacity: 0.4 }}>Loading…</p>
      ) : rows.length === 0 ? (
        <p style={{ color: 'var(--ink)', opacity: 0.4, fontSize: 14 }}>No submissions yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {rows.map(row => (
            tab === 0
              ? <ContactCard key={row.id} row={row} />
              : <JobCard key={row.id} row={row} />
          ))}
        </div>
      )}
    </div>
  )
}

function ContactCard({ row }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={cardStyle}>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}
      >
        <div>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{row.name}</span>
          <span style={{ marginLeft: 12, color: 'var(--ink)', opacity: 0.45, fontSize: 13 }}>{row.email}</span>
          {row.phone && <span style={{ marginLeft: 12, color: 'var(--ink)', opacity: 0.45, fontSize: 13 }}>{row.phone}</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: 'var(--ink)', opacity: 0.35, fontSize: 12 }}>{fmt(row.created_at)}</span>
          <span style={{ fontSize: 12, opacity: 0.4 }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--grey)' }}>
          {row.service && <p style={metaStyle}><strong>Service:</strong> {row.service}</p>}
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink)', margin: 0 }}>{row.message}</p>
        </div>
      )}
    </div>
  )
}

function JobCard({ row }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={cardStyle}>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
        onClick={() => setOpen(o => !o)}
      >
        <div>
          <span style={{ fontWeight: 700, fontSize: 15 }}>{row.name}</span>
          <span style={{ marginLeft: 12, color: 'var(--ink)', opacity: 0.45, fontSize: 13 }}>{row.email}</span>
          {row.position && (
            <span style={{ marginLeft: 12, background: 'var(--navy)', color: 'white', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 2 }}>
              {row.position}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ color: 'var(--ink)', opacity: 0.35, fontSize: 12 }}>{fmt(row.created_at)}</span>
          <span style={{ fontSize: 12, opacity: 0.4 }}>{open ? '▲' : '▼'}</span>
        </div>
      </div>
      {open && (
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--grey)', display: 'flex', flexDirection: 'column', gap: 8 }}>
          {row.phone && <p style={metaStyle}><strong>Phone:</strong> {row.phone}</p>}
          {row.experience && <p style={metaStyle}><strong>Experience:</strong> {row.experience}</p>}
          {row.cover_letter && <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ink)', margin: 0 }}>{row.cover_letter}</p>}
          {row.resume_url && <ResumeLink path={row.resume_url} />}
        </div>
      )}
    </div>
  )
}

function ResumeLink({ path }) {
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState(false)

  async function open() {
    setLoading(true); setErr(false)
    const { data, error } = await supabase.storage.from('resumes').createSignedUrl(path, 3600)
    setLoading(false)
    if (error || !data?.signedUrl) { setErr(true); return }
    window.open(data.signedUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={open}
      disabled={loading}
      style={{ background: 'none', border: 'none', padding: 0, color: err ? 'var(--ink)' : 'var(--red)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--ff-body)', textAlign: 'left' }}
    >
      {loading ? 'Opening…' : err ? 'Resume unavailable' : 'View Resume ↗'}
    </button>
  )
}

function fmt(ts) {
  if (!ts) return ''
  return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

const cardStyle = {
  background: 'white',
  border: '1px solid var(--grey)',
  padding: '16px 20px',
  boxShadow: '0 1px 4px rgba(40,32,32,0.05)',
}

const metaStyle = {
  fontSize: 13,
  color: 'var(--ink)',
  opacity: 0.6,
  margin: '0 0 4px',
}
