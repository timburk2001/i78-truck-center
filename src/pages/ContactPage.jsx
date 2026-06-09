import CautionStripe from '../components/ui/CautionStripe'
import ContactForm from '../components/forms/ContactForm'

function InfoItem({ icon, label, children }) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-md flex items-center justify-center text-xl flex-shrink-0 mt-0.5"
        style={{ backgroundColor: '#c02026' }}
        aria-hidden="true"
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
        {children}
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      {/* Page hero */}
      <section
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ backgroundColor: '#282020' }}
      >
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/assets/shop-fleet.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(40,32,32,0.85)' }} aria-hidden="true" />
        <div className="absolute inset-0 texture-overlay" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="text-white text-5xl sm:text-6xl font-black uppercase tracking-wide mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Contact Us
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Need help right now? Call us directly. For general inquiries, use the form below.
          </p>
          <a
            href="tel:7179335655"
            className="inline-block mt-6 px-8 py-4 rounded-lg text-white font-bold text-xl uppercase tracking-wide hover:brightness-110 transition-all"
            style={{ backgroundColor: '#c02026', fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            📞 717-933-5655 — Available 24/7
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <CautionStripe height="h-6" />
        </div>
      </section>

      {/* Form + info */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: '#f7f3ed' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/assets/caution-warmgrey.png')",
            backgroundSize: 'auto 80px',
            backgroundRepeat: 'repeat',
            opacity: 0.18,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact form */}
          <div className="lg:col-span-3">
            <h2
              className="text-3xl font-black uppercase tracking-wide mb-6"
              style={{ color: '#282020', fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Send a Message
            </h2>
            <ContactForm />
          </div>

          {/* Contact info */}
          <div className="lg:col-span-2">
            <h2
              className="text-3xl font-black uppercase tracking-wide mb-6"
              style={{ color: '#282020', fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Get in Touch
            </h2>

            <div
              className="rounded-xl p-6 flex flex-col gap-6"
              style={{ backgroundColor: '#282020' }}
            >
              <InfoItem icon="📍" label="Address">
                <a
                  href="https://maps.google.com/?q=120+Klein+Road+Bethel+PA+19507"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                  onMouseEnter={e => e.target.style.color = '#e73525'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.85)'}
                >
                  120 Klein Road<br />Bethel, PA 19507
                </a>
              </InfoItem>

              <InfoItem icon="📞" label="Phone">
                <a
                  href="tel:7179335655"
                  className="text-white text-lg font-bold transition-colors"
                  onMouseEnter={e => e.target.style.color = '#e73525'}
                  onMouseLeave={e => e.target.style.color = 'white'}
                >
                  717-933-5655
                </a>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>Available 24 hours, 7 days a week</p>
              </InfoItem>

              <InfoItem icon="✉️" label="Billing & Inquiries">
                <a
                  href="mailto:billing@i78truckcenter.com"
                  className="text-sm transition-colors break-all"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                  onMouseEnter={e => e.target.style.color = '#e73525'}
                  onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.85)'}
                >
                  billing@i78truckcenter.com
                </a>
              </InfoItem>

              <InfoItem icon="🕐" label="Hours">
                <p className="text-white text-sm">24/7 Emergency Dispatch</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>We never close.</p>
              </InfoItem>
            </div>

            {/* Map */}
            <div className="mt-6 rounded-xl overflow-hidden aspect-video" style={{ backgroundColor: '#dad2c9' }}>
              <iframe
                title="I78 Truck Center Location"
                src="https://maps.google.com/maps?q=120+Klein+Road+Bethel+PA+19507&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
