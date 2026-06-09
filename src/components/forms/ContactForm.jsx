import { useState } from 'react'
import { supabase } from '../../lib/supabase'

const inputClass =
  'w-full px-4 py-3 rounded-md bg-white border border-gray-300 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all'
const labelClass = 'block text-sm font-semibold text-gray-700 mb-1 uppercase tracking-wide'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    const { error } = await supabase
      .from('contact_submissions')
      .insert({ name: form.name, email: form.email, phone: form.phone || null, message: form.message })

    if (error) {
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg p-8 border border-green-500/30 text-center bg-green-50">
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Received!</h3>
        <p className="text-gray-600 text-sm">
          We'll be in touch soon. For urgent needs, call us directly at{' '}
          <a href="tel:7179335655" className="font-bold text-red-700">717-933-5655</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="contact-name" className={labelClass}>Full Name *</label>
        <input
          id="contact-name"
          type="text"
          required
          value={form.name}
          onChange={set('name')}
          placeholder="John Smith"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-email" className={labelClass}>Email *</label>
          <input
            id="contact-email"
            type="email"
            required
            value={form.email}
            onChange={set('email')}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>Phone</label>
          <input
            id="contact-phone"
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            placeholder="(555) 555-5555"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>Message *</label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          placeholder="Describe your situation or question…"
          className={inputClass}
          style={{ resize: 'vertical' }}
        />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">
          Submission failed. Please call us at{' '}
          <a href="tel:7179335655" className="font-bold">717-933-5655</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="py-4 rounded-md text-white font-bold text-lg uppercase tracking-wide transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#c02026', fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
