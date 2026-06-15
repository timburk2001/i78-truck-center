import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import Turnstile, { TURNSTILE_SITE_KEY } from '../Turnstile'

const inputStyle = {
  backgroundColor: '#f7f3ed',
  border: '1px solid #dad2c9',
  color: '#282020',
}
const inputClass = 'w-full px-4 py-3 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#c02026] focus:border-transparent transition-all placeholder:text-[#dad2c9]'
const labelClass = 'block text-sm font-semibold mb-1 uppercase tracking-wide'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('idle')
  const [captchaToken, setCaptchaToken] = useState(null)
  const [turnstileKey, setTurnstileKey] = useState(0)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    // Route through the submit-quote edge function so the Turnstile token is
    // verified server-side before anything is stored.
    const { data, error } = await supabase.functions.invoke('submit-quote', {
      body: { name: form.name, email: form.email, phone: form.phone || null, message: form.message, captchaToken },
    })

    if (error || data?.error) {
      setStatus('error')
      setCaptchaToken(null)
      setTurnstileKey((k) => k + 1) // single-use token — refresh for retry
      return
    }
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="rounded-lg p-8 border text-center" style={{ backgroundColor: '#f7f3ed', borderColor: '#dad2c9' }}>
        <div className="text-4xl mb-3">✅</div>
        <h3 className="text-xl font-bold mb-2" style={{ color: '#282020' }}>Message Received!</h3>
        <p className="text-sm" style={{ color: 'rgba(40,32,32,0.65)' }}>
          We'll be in touch soon. For urgent needs, call us directly at{' '}
          <a href="tel:7179335655" className="font-bold" style={{ color: '#c02026' }}>717-933-5655</a>.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      <div>
        <label htmlFor="contact-name" className={labelClass} style={{ color: '#282020' }}>Full Name *</label>
        <input id="contact-name" type="text" required value={form.name} onChange={set('name')}
          placeholder="John Smith" className={inputClass} style={inputStyle} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-email" className={labelClass} style={{ color: '#282020' }}>Email *</label>
          <input id="contact-email" type="email" required value={form.email} onChange={set('email')}
            placeholder="you@example.com" className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass} style={{ color: '#282020' }}>Phone</label>
          <input id="contact-phone" type="tel" value={form.phone} onChange={set('phone')}
            placeholder="(555) 555-5555" className={inputClass} style={inputStyle} />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass} style={{ color: '#282020' }}>Message *</label>
        <textarea id="contact-message" required rows={5} value={form.message} onChange={set('message')}
          placeholder="Describe your situation or question…" className={inputClass}
          style={{ ...inputStyle, resize: 'vertical' }} />
      </div>

      <Turnstile key={turnstileKey} onVerify={setCaptchaToken} onExpire={() => setCaptchaToken(null)} />

      {status === 'error' && (
        <p className="text-sm text-center" style={{ color: '#c02026' }}>
          Submission failed. Please call us at{' '}
          <a href="tel:7179335655" className="font-bold">717-933-5655</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading' || (!!TURNSTILE_SITE_KEY && !captchaToken)}
        className="py-4 rounded-md text-white font-bold text-lg uppercase tracking-wide transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#c02026', fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  )
}
