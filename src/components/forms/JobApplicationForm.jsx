import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const MAX_FILE_SIZE_MB = 10

const inputClass =
  'w-full px-4 py-3 rounded-md border border-white/20 text-white text-sm placeholder-white/30 focus:outline-none focus:border-red-500 transition-all'
const selectClass =
  'w-full px-4 py-3 rounded-md border border-white/20 text-white text-sm focus:outline-none focus:border-red-500 transition-all'
const labelClass = 'block text-xs font-semibold text-white/60 mb-1 uppercase tracking-wide'

const bgDark = { backgroundColor: '#1e1818' }

export default function JobApplicationForm({ onSuccess }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    position: '', cdl_class: 'None',
    years_experience: '',
  })
  const [resumeFile, setResumeFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFileError('')
    if (!file) { setResumeFile(null); return }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`File must be under ${MAX_FILE_SIZE_MB}MB.`)
      setResumeFile(null)
      return
    }
    setResumeFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    let resume_url = null

    try {
      // Upload resume if provided
      if (resumeFile) {
        const safeName = form.name.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
        const path = `applications/${Date.now()}_${safeName}`
        const { data, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(path, resumeFile, { cacheControl: '3600', upsert: false })
        if (uploadError) throw uploadError
        resume_url = data.path
      }

      const { error: insertError } = await supabase.from('job_applications').insert({
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        position: form.position,
        cdl_class: form.cdl_class,
        years_experience: parseInt(form.years_experience, 10) || 0,
        resume_url,
      })

      if (insertError) throw insertError

      setStatus('success')
      setTimeout(() => onSuccess?.(), 2000)
    } catch (err) {
      setStatus('error')
      setErrorMsg('Submission failed. Please email us at billing@i78truckcenter.com.')
    }
  }

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <div className="text-5xl mb-4">🎉</div>
        <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          Application Received!
        </h3>
        <p className="text-white/60 text-sm">We'll review your application and be in touch soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div>
        <label htmlFor="job-name" className={labelClass}>Full Name *</label>
        <input id="job-name" type="text" required value={form.name} onChange={set('name')}
          placeholder="John Smith" className={inputClass} style={bgDark} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="job-email" className={labelClass}>Email *</label>
          <input id="job-email" type="email" required value={form.email} onChange={set('email')}
            placeholder="you@example.com" className={inputClass} style={bgDark} />
        </div>
        <div>
          <label htmlFor="job-phone" className={labelClass}>Phone</label>
          <input id="job-phone" type="tel" value={form.phone} onChange={set('phone')}
            placeholder="(555) 555-5555" className={inputClass} style={bgDark} />
        </div>
      </div>

      <div>
        <label htmlFor="job-position" className={labelClass}>Position Applying For *</label>
        <select id="job-position" required value={form.position} onChange={set('position')}
          className={selectClass} style={bgDark}>
          <option value="" disabled>Select a position…</option>
          <option value="Driver">Driver</option>
          <option value="Recovery Technician">Recovery Technician</option>
          <option value="Dispatcher">Dispatcher</option>
          <option value="Mechanic">Mechanic</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="job-cdl" className={labelClass}>CDL License Class *</label>
          <select id="job-cdl" required value={form.cdl_class} onChange={set('cdl_class')}
            className={selectClass} style={bgDark}>
            <option value="None">None</option>
            <option value="A">Class A</option>
            <option value="B">Class B</option>
            <option value="C">Class C</option>
          </select>
        </div>
        <div>
          <label htmlFor="job-exp" className={labelClass}>Years of Experience *</label>
          <input id="job-exp" type="number" required min="0" max="50"
            value={form.years_experience} onChange={set('years_experience')}
            placeholder="0" className={inputClass} style={bgDark} />
        </div>
      </div>

      <div>
        <label htmlFor="job-resume" className={labelClass}>Resume (PDF, DOC — max {MAX_FILE_SIZE_MB}MB)</label>
        <input
          id="job-resume"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:text-white file:cursor-pointer transition-all"
          style={{ '--file-bg': '#c02026' }}
        />
        {fileError && <p className="text-red-400 text-xs mt-1">{fileError}</p>}
      </div>

      {errorMsg && (
        <p className="text-red-400 text-sm text-center">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-2 py-4 rounded-md text-white font-bold text-lg uppercase tracking-wide transition-all hover:brightness-110 disabled:opacity-60"
        style={{ backgroundColor: '#c02026', fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {status === 'loading' ? 'Submitting…' : 'Submit Application'}
      </button>
    </form>
  )
}
