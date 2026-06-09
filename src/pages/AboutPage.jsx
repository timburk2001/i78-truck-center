import { useState } from 'react'
import Modal from '../components/ui/Modal'
import JobApplicationForm from '../components/forms/JobApplicationForm'
import Icon from '../components/ui/Icon'

const TEAM = [
  {
    initials: 'JD',
    name: 'John D.',
    title: 'Owner / Operator',
    bio: 'With over 20 years in the towing and recovery industry, John founded I78 Truck Center with a commitment to professional, round-the-clock service for motorists across Pennsylvania.',
  },
  {
    initials: 'MT',
    name: 'Mike T.',
    title: 'Lead Recovery Technician',
    bio: 'Mike specializes in heavy-duty and complex recovery operations. Certified in rigging and multi-axle extraction, he leads our most demanding call-outs with calm expertise.',
  },
  {
    initials: 'SL',
    name: 'Sarah L.',
    title: 'Dispatch Coordinator',
    bio: 'Sarah keeps the operation running smoothly around the clock. She manages routing, driver coordination, and customer communication — ensuring every call is handled with urgency.',
  },
]

const VALUES = [
  {
    icon: 'bolt',
    title: 'Rapid Response',
    desc: 'Every minute counts in an emergency. We prioritize speed without sacrificing safety.',
  },
  {
    icon: 'shield',
    title: 'Honest Service',
    desc: "No hidden fees. No runaround. You'll know the price before we hook up.",
  },
  {
    icon: 'wrench',
    title: 'Pro-Grade Equipment',
    desc: 'Our fleet is maintained to the highest standards — ready for any job, any time.',
  },
]

function TeamMemberCard({ initials, name, title, bio }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--ink)',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.04)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 800,
            fontSize: 52,
            color: 'rgba(255,255,255,0.18)',
            letterSpacing: '-0.02em',
          }}
        >
          {initials}
        </span>
      </div>
      <div style={{ padding: '20px 20px 24px', display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        <h3
          style={{
            color: 'white',
            fontFamily: 'var(--ff-display)',
            fontWeight: 800,
            fontSize: 18,
            margin: 0,
          }}
        >
          {name}
        </h3>
        <p style={{ color: 'var(--red)', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '2px 0 0' }}>
          {title}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.65, marginTop: 10 }}>
          {bio}
        </p>
      </div>
    </div>
  )
}

function HiringCard({ onApply }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        border: '2px dashed var(--red)',
        backgroundColor: hovered ? 'var(--navy)' : 'var(--ink)',
        minHeight: 320,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 32,
        gap: 16,
        cursor: 'pointer',
        transition: 'background-color 0.2s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onApply}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          backgroundColor: 'var(--red)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <Icon name="arrow" size={22} />
      </div>
      <div>
        <h3
          style={{
            color: 'white',
            fontFamily: 'var(--ff-display)',
            fontWeight: 800,
            fontSize: 22,
            margin: '0 0 8px',
          }}
        >
          We're Hiring!
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.65, maxWidth: 260, margin: '0 auto' }}>
          Join the I78 Truck Center team. We're always looking for skilled drivers, technicians,
          and dispatchers who share our commitment to excellence.
        </p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onApply() }}
        className="btn-red"
        style={{ marginTop: 8 }}
      >
        Apply Now
        <Icon name="arrow" size={15} />
      </button>
    </div>
  )
}

export default function AboutPage() {
  const [hiringOpen, setHiringOpen] = useState(false)

  return (
    <>
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
            backgroundImage: "url('/assets/hero-trucks.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
        <div
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(40,32,32,0.82)' }}
          aria-hidden="true"
        />
        <div className="wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 760 }}>
          <span className="eyebrow reveal" style={{ color: 'rgba(247,243,237,0.5)', marginBottom: 20, display: 'inline-flex' }}>
            Our Story
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
            About I78 Truck Center
          </h1>
          <p className="reveal d2" style={{ color: 'rgba(247,243,237,0.65)', fontSize: 18, lineHeight: 1.7 }}>
            Built in Bethel. Trusted across Pennsylvania.
          </p>
        </div>

        <div
          className="caution-stripe"
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 18,
            zIndex: 2,
          }}
        />
      </section>

      {/* ── COMPANY HISTORY ──────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
        {/* Grunge tire texture — subtle, reads on cream */}
        <div className="texture-overlay is-soft" aria-hidden="true" />
        <div className="wrap" style={{ paddingBlock: 96, position: 'relative', zIndex: 1 }}>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}
            className="story-grid"
          >
            <div className="reveal" style={{ overflow: 'hidden' }}>
              <img
                src="/assets/shop-fleet.jpg"
                alt="I78 Truck Center shop and fleet"
                style={{ display: 'block', width: '100%', aspectRatio: '16/9', objectFit: 'cover' }}
              />
            </div>
            <div className="reveal d1" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <span className="eyebrow" style={{ color: 'var(--ink-55)' }}>Est. Bethel, PA</span>
              <h2 style={{ color: 'var(--ink)', fontSize: 'clamp(28px,3.5vw,44px)', marginTop: 12 }}>
                Our Story
              </h2>
              <p style={{ color: 'var(--ink-55)', fontSize: 16, lineHeight: 1.75 }}>
                I78 Truck Center began with a single truck and an unwavering commitment to showing
                up — rain, snow, or the middle of the night. What started as a local roadside
                assistance service has grown into one of the region's most capable towing and
                recovery operations.
              </p>
              <p style={{ color: 'var(--ink-55)', fontSize: 16, lineHeight: 1.75 }}>
                Based at our facility at 120 Kline Rd in Bethel, PA, we've built our reputation
                call by call, job by job. Every member of our team understands that when the phone
                rings, someone is counting on us.
              </p>
              <p style={{ color: 'var(--ink-55)', fontSize: 16, lineHeight: 1.75 }}>
                From state police-mandated recovery scenes on I-78 to getting a family back on the
                road after a breakdown — we treat every job with the same level of professionalism
                and urgency.
              </p>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .story-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          }
        `}</style>
      </section>

      {/* ── VALUES ───────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
        <div className="wrap" style={{ paddingBlock: 80, position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="eyebrow" style={{ color: 'rgba(247,243,237,0.5)', marginBottom: 16, display: 'inline-flex' }}>
              Our Principles
            </span>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px,3.5vw,48px)', marginTop: 16 }}>
              What We Stand For
            </h2>
          </div>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}
            className="values-grid"
          >
            {VALUES.map(({ icon, title, desc }, i) => (
              <div
                key={title}
                className={`reveal d${i + 1}`}
                style={{
                  border: '1px solid rgba(255,255,255,0.12)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  padding: '36px 28px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    border: '1.5px solid var(--orange)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--orange)',
                  }}
                >
                  <Icon name={icon} size={22} />
                </div>
                <h3
                  style={{
                    color: 'white',
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 800,
                    fontSize: 20,
                    margin: 0,
                  }}
                >
                  {title}
                </h3>
                <p style={{ color: 'rgba(247,243,237,0.6)', fontSize: 15, lineHeight: 1.65, margin: 0 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .values-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ── TEAM + HIRING ─────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--ink)', position: 'relative', overflow: 'hidden' }}>
        <div className="wrap" style={{ paddingBlock: 96, position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="eyebrow" style={{ color: 'rgba(247,243,237,0.45)', marginBottom: 16, display: 'inline-flex' }}>
              The People
            </span>
            <h2 style={{ color: 'white', fontSize: 'clamp(28px,3.5vw,48px)', marginTop: 16, marginBottom: 12 }}>
              Meet the Team
            </h2>
            <p style={{ color: 'rgba(247,243,237,0.5)', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
              Experienced, certified, and always ready to roll.
            </p>
          </div>

          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}
            className="team-grid"
          >
            {TEAM.map((member) => (
              <div key={member.name} className="reveal">
                <TeamMemberCard {...member} />
              </div>
            ))}
            <div className="reveal d4">
              <HiringCard onApply={() => setHiringOpen(true)} />
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) { .team-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 560px)  { .team-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      <Modal isOpen={hiringOpen} onClose={() => setHiringOpen(false)} title="Join Our Team">
        <JobApplicationForm onSuccess={() => setHiringOpen(false)} />
      </Modal>
    </>
  )
}
