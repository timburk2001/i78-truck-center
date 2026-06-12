import Seo from '../components/Seo'
import ContactForm from '../components/forms/ContactForm'
import Icon from '../components/ui/Icon'

function InfoItem({ iconName, label, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      <div
        style={{
          width: 40,
          height: 40,
          backgroundColor: 'var(--red)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginTop: 2,
          color: 'white',
        }}
      >
        <Icon name={iconName} size={18} />
      </div>
      <div>
        <p
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontSize: 12,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            marginBottom: 4,
          }}
        >
          {label}
        </p>
        {children}
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Us | I-78 Truck Center"
        description="Call I-78 Truck Center at 717-933-5655 for 24/7 towing and recovery, or send a message. Located at 120 Kline Rd, Bethel, PA 19507."
        path="/contact"
      />
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          paddingBlock: 96,
          textAlign: 'center',
          backgroundColor: 'var(--ink)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/assets/shop-fleet.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
        <div
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(40,32,32,0.85)' }}
          aria-hidden="true"
        />
        <div className="wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 680 }}>
          <span className="eyebrow reveal" style={{ color: 'rgba(247,243,237,0.5)', marginBottom: 20, display: 'inline-flex' }}>
            Get in Touch
          </span>
          <h1
            className="reveal d1"
            style={{
              color: 'white',
              fontSize: 'clamp(36px,5vw,72px)',
              marginTop: 16,
              marginBottom: 16,
            }}
          >
            Contact Us
          </h1>
          <p className="reveal d2" style={{ color: 'rgba(247,243,237,0.65)', fontSize: 18, lineHeight: 1.7, marginBottom: 32 }}>
            Need help right now? Call us directly. For general inquiries, use the form below.
          </p>
          <div className="reveal d3">
            <a href="tel:7179335655" className="btn-red" style={{ fontSize: 18 }}>
              <Icon name="phone" size={18} />
              717-933-5655 — Available 24/7
            </a>
          </div>
        </div>

        <div
          className="caution-stripe"
          aria-hidden="true"
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 18, zIndex: 2 }}
        />
      </section>

      {/* ── FORM + INFO ───────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
        {/* Grunge tire texture — subtle, reads on cream */}
        <div className="texture-overlay is-soft" aria-hidden="true" />
        <div className="wrap" style={{ paddingBlock: 96, position: 'relative', zIndex: 1 }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 56, alignItems: 'start' }}
            className="contact-grid"
          >
            {/* Contact form */}
            <div className="reveal">
              <h2
                style={{
                  color: 'var(--ink)',
                  fontSize: 'clamp(24px,3vw,36px)',
                  marginBottom: 28,
                }}
              >
                Send a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact info */}
            <div className="reveal d1">
              <h2
                style={{
                  color: 'var(--ink)',
                  fontSize: 'clamp(24px,3vw,36px)',
                  marginBottom: 28,
                }}
              >
                Direct Contact
              </h2>

              <div
                style={{
                  backgroundColor: 'var(--ink)',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                }}
              >
                <InfoItem iconName="pin" label="Address">
                  <a
                    href="https://www.google.com/maps/place/I-78+Truck+Center/@40.4923901,-76.2237416,143m/data=!3m1!1e3!4m15!1m8!3m7!1s0x89c5e2555c1381af:0xe976598fe925020e!2s120+Kline+Rd,+Bethel,+PA+19507!3b1!8m2!3d40.4924198!4d-76.2242854!16s%2Fg%2F11gmfs73sj!3m5!1s0x89c5e25542f3321f:0x9d41625ab30a4feb!8m2!3d40.4924055!4d-76.2242333!16s%2Fg%2F1x5qtqt2!5m1!1e1?hl=en-US&entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--orange)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
                  >
                    120 Kline Rd<br />Bethel, PA 19507
                  </a>
                </InfoItem>

                <InfoItem iconName="phone" label="Phone">
                  <a
                    href="tel:7179335655"
                    style={{ color: 'white', fontSize: 18, fontWeight: 700, textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--orange)'}
                    onMouseLeave={e => e.target.style.color = 'white'}
                  >
                    717-933-5655
                  </a>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 4 }}>
                    Available 24 hours, 7 days a week
                  </p>
                </InfoItem>

                <InfoItem iconName="mail" label="Billing & Inquiries">
                  <a
                    href="mailto:billing@i78truckcenter.com"
                    style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, textDecoration: 'none', transition: 'color 0.15s', wordBreak: 'break-all' }}
                    onMouseEnter={e => e.target.style.color = 'var(--orange)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
                  >
                    billing@i78truckcenter.com
                  </a>
                </InfoItem>

                <InfoItem iconName="clock" label="Hours">
                  <p style={{ color: 'white', fontSize: 14, fontWeight: 600 }}>24/7 Emergency Dispatch</p>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, marginTop: 3 }}>We never close.</p>
                </InfoItem>
              </div>

              {/* Map */}
              <div
                style={{
                  marginTop: 20,
                  overflow: 'hidden',
                  aspectRatio: '16/9',
                  backgroundColor: 'var(--grey)',
                }}
              >
                <iframe
                  title="I78 Truck Center Location"
                  src="https://maps.google.com/maps?q=I-78+Truck+Center,+120+Kline+Rd,+Bethel,+PA+19507&output=embed"
                  style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>
    </>
  )
}
