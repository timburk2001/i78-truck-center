import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import ServiceCard from '../components/ui/ServiceCard'
import Icon from '../components/ui/Icon'
import QuoteCalculator from '../components/calculator/QuoteCalculator'
import StatsStrip from '../components/sections/StatsStrip'
import FeatureRecovery from '../components/sections/FeatureRecovery'
import FleetBand from '../components/sections/FleetBand'
import ServiceArea from '../components/sections/ServiceArea'
import LogoVertical from '../assets/logo-vertical-white.svg?react'
import TowHookRed from '../assets/tow-hook-red.svg?react'

const SERVICES_PREVIEW = [
  {
    icon: 'car',
    title: 'Light Duty Towing',
    description: 'Fast, reliable towing for passenger vehicles, motorcycles, and SUVs up to 7,000 lbs.',
    image: '/assets/light-duty-scene.jpg',
  },
  {
    icon: 'semi',
    title: 'Heavy Duty Towing',
    description: 'Equipped for semi-trucks, box trucks, and commercial vehicles requiring specialized rigging.',
    image: '/assets/heavy-duty-tow.jpg',
  },
  {
    icon: 'hook',
    title: 'Recovery Services',
    description: 'Rollover recovery, off-road winching, and complex extraction from any terrain.',
    image: '/assets/IMG_7960.JPG',
  },
  {
    icon: 'cone',
    title: 'Emergency Road Service',
    description: 'On-scene tire changes, fuel delivery, battery jump-starts, and lockout assistance.',
    image: '/assets/IMG_9854.jpeg',
  },
  {
    icon: 'shop',
    title: 'Secure Storage',
    description: 'Indoor and outdoor secured vehicle storage — short-term and long-term options available.',
    image: '/assets/shop-fleet.jpg',
  },
  {
    icon: 'wrench',
    title: 'Hauling & Repairs',
    description: 'Flatbed equipment transport plus on-site and shop repairs: brakes, clutches, tires, and more.',
    image: '/assets/IMG_8429.jpeg',
  },
]

const WHY_ITEMS = [
  {
    icon: 'bolt',
    title: 'Rapid Response',
    body: 'On I-78 or off it — we pick up and we show up. Every call is treated with urgency.',
  },
  {
    icon: 'shield',
    title: 'Licensed & Insured',
    body: 'Fully certified, bonded, and compliant with PA regulations. USDOT 682054.',
  },
  {
    icon: 'wrench',
    title: 'Full-Service Capable',
    body: 'From tire changes to heavy duty rotator recovery — we have the right equipment for the job.',
  },
]

export default function HomePage() {
  return (
    <>
      <Seo
        title="I-78 Truck Center | 24/7 Towing & Recovery — Bethel, PA"
        description="I-78 Truck Center — 24/7 light and heavy-duty towing, recovery, and emergency road service in Bethel, PA. Call 717-933-5655."
        path="/"
      />
      {/* ── HERO ─────────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'var(--ink)',
        }}
      >
        {/* Hero bg photo */}
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
        {/* Dark scrim */}
        <div
          style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(40,32,32,0.78)' }}
          aria-hidden="true"
        />
        {/* Hero content */}
        <div
          className="wrap"
          style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
            paddingBlock: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 36,
          }}
        >
          <LogoVertical style={{ width: 'clamp(180px,20vw,260px)', height: 'auto' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h1
              className="reveal"
              style={{
                color: 'white',
                fontSize: 'clamp(36px,5.4vw,80px)',
                maxWidth: 900,
              }}
            >
              Pennsylvania's Most Trusted<br />
              <span style={{ color: 'var(--orange)' }}>Towing &amp; Recovery</span>
            </h1>
            <p
              className="reveal d1"
              style={{
                color: 'rgba(247,243,237,0.72)',
                fontSize: 'clamp(16px,2vw,20px)',
                maxWidth: 560,
                margin: '0 auto',
              }}
            >
              Light duty to heavy duty — when you're stuck, we're on our way.
              Available 24 hours a day, 7 days a week.
            </p>
          </div>

          <div
            className="reveal d2"
            style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <a href="#quote-calculator" className="btn-red">
              Get an Estimate
              <Icon name="arrow" size={16} />
            </a>
            <a href="tel:7179335655" className="btn-ghost">
              <Icon name="phone" size={16} />
              Call Now — 717-933-5655
            </a>
          </div>
        </div>

        {/* Caution hazard band — fixed stripes, expands to full width (never repeats) */}
        <div
          className="caution-stripe"
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 18,
            zIndex: 4,
          }}
        />
      </section>

      {/* ── STATS STRIP ──────────────────────────────────── */}
      <StatsStrip />

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section
        style={{ backgroundColor: 'var(--cream)', position: 'relative', overflow: 'hidden' }}
      >
        {/* Grunge tire texture — reads as intended on the cream background */}
        <div className="texture-overlay is-soft" aria-hidden="true" />
        <div className="wrap" style={{ paddingBlock: 96, position: 'relative', zIndex: 1 }}>
          {/* Heading */}
          <div
            className="reveal"
            style={{ marginBottom: 56, maxWidth: 600 }}
          >
            <span className="eyebrow" style={{ color: 'var(--ink-55)', marginBottom: 16, display: 'inline-flex' }}>
              What We Do
            </span>
            <h2
              style={{
                color: 'var(--ink)',
                fontSize: 'clamp(32px,4vw,56px)',
                marginTop: 16,
                marginBottom: 12,
              }}
            >
              Our Services
            </h2>
            <p style={{ color: 'var(--ink-55)', fontSize: 16, lineHeight: 1.7 }}>
              From roadside assistance to large-scale recovery operations, we have the equipment
              and expertise to handle it all.
            </p>
          </div>

          {/* Cards — extra top padding so badge overhangs show */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 28,
              paddingTop: 32,
            }}
            className="services-grid"
          >
            {SERVICES_PREVIEW.map((service, i) => (
              <div key={service.title} className={`reveal d${Math.min(i + 1, 5)}`}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          <div className="reveal" style={{ marginTop: 48, textAlign: 'center' }}>
            <Link to="/services" className="btn-ghost-dark">
              View All Services
              <Icon name="arrow" size={15} />
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 560px) { .services-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── FEATURE — HEAVY RECOVERY ─────────────────────── */}
      <FeatureRecovery />

      {/* ── FLEET BAND ───────────────────────────────────── */}
      <FleetBand />

      {/* ── ABOUT TEASER / WHY ───────────────────────────── */}
      <section style={{ backgroundColor: 'white' }}>
        <div className="wrap" style={{ paddingBlock: 96 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 72,
              alignItems: 'center',
            }}
            className="about-grid"
          >
            {/* Left — photo */}
            <div className="reveal" style={{ position: 'relative' }}>
              {/* Bold red tow-hook brand graphic — overlaps the photo's top-left corner */}
              <TowHookRed
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: -168,
                  left: -40,
                  width: 'clamp(104px, 14vw, 178px)',
                  height: 'auto',
                  color: 'var(--red)',
                  zIndex: 2,
                  filter: 'drop-shadow(0 10px 26px rgba(40,32,32,0.28))',
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              />
              <img
                src="/assets/shop-fleet.jpg"
                alt="I78 Truck Center shop and fleet"
                style={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: '4 / 3',
                  objectFit: 'cover',
                }}
              />
              {/* Navy label */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  backgroundColor: 'var(--navy)',
                  padding: '12px 20px',
                }}
              >
                <span
                  style={{
                    color: 'white',
                    fontFamily: 'var(--ff-body)',
                    fontSize: 13,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                  }}
                >
                  Bethel, PA — Est. I-78 Corridor
                </span>
              </div>
            </div>

            {/* Right — copy + checklist */}
            <div className="reveal d1" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              <span className="eyebrow" style={{ color: 'var(--ink-55)' }}>
                Why I78 Truck Center
              </span>

              <h2
                style={{
                  color: 'var(--ink)',
                  fontSize: 'clamp(28px,3.5vw,48px)',
                  marginTop: 8,
                }}
              >
                Built on Hard Work &amp;{' '}
                <span style={{ color: 'var(--red)' }}>Dependability</span>
              </h2>

              <p style={{ color: 'var(--ink-55)', fontSize: 16, lineHeight: 1.7 }}>
                I78 Truck Center was founded on a simple principle: when someone calls for help on
                the side of the road, they deserve a fast, professional, and courteous response —
                every time, no matter the hour.
              </p>

              {/* Check list */}
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {WHY_ITEMS.map(({ icon, title, body }) => (
                  <li key={title} style={{ display: 'flex', gap: 18, alignItems: 'flex-start' }}>
                    {/* Icon circle */}
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        border: '1.5px solid var(--red)',
                        background: 'var(--cream)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: 'var(--red)',
                      }}
                    >
                      <Icon name={icon} size={18} />
                    </div>
                    <div>
                      <h4
                        style={{
                          color: 'var(--ink)',
                          fontSize: 16,
                          fontFamily: 'var(--ff-display)',
                          fontWeight: 800,
                          margin: '0 0 4px',
                          lineHeight: 1.2,
                        }}
                      >
                        {title}
                      </h4>
                      <p style={{ color: 'var(--ink-55)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 8 }}>
                <Link to="/about" className="btn-red">
                  Meet Our Team
                  <Icon name="arrow" size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .about-grid {
              grid-template-columns: 1fr !important;
              gap: 40px !important;
            }
          }
        `}</style>
      </section>

      {/* ── SERVICE AREA ─────────────────────────────────── */}
      <ServiceArea />

      {/* ── QUOTE CALCULATOR ─────────────────────────────── */}
      <section
        id="quote-calculator"
        style={{ backgroundColor: 'var(--navy)', position: 'relative', overflow: 'hidden' }}
      >
        <div className="wrap" style={{ paddingBlock: 80, position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
              <span className="eyebrow" style={{ color: 'rgba(247,243,237,0.5)', marginBottom: 16, display: 'inline-flex' }}>
                Instant Estimate
              </span>
              <h2
                style={{
                  color: 'white',
                  fontSize: 'clamp(28px,3.5vw,48px)',
                  marginTop: 16,
                  marginBottom: 12,
                }}
              >
                Get a Towing Estimate
              </h2>
              <p style={{ color: 'rgba(247,243,237,0.65)', fontSize: 16, lineHeight: 1.7 }}>
                Enter your pickup and drop-off locations for a real-time estimate — no guessing required.
              </p>
            </div>

            <div
              className="reveal d1"
              style={{
                backgroundColor: 'var(--ink)',
                border: '1px solid rgba(255,255,255,0.1)',
                padding: 32,
              }}
            >
              <QuoteCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--red)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        {/* Caution-stripe accent — fixed stripes that expand (never repeat), fading in from the right */}
        <div
          className="caution-stripe-faint"
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,0.95), transparent 55%)',
            maskImage: 'linear-gradient(to left, rgba(0,0,0,0.95), transparent 55%)',
            pointerEvents: 'none',
          }}
        />
        {/* Tow hook watermark */}
        <img
          src="/assets/tow-hook-warmwhite.png"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: -20,
            top: '50%',
            transform: 'translateY(-50%)',
            height: '150%',
            width: 'auto',
            opacity: 0.1,
            pointerEvents: 'none',
            userSelect: 'none',
            objectFit: 'contain',
          }}
        />
        <div className="wrap" style={{ paddingBlock: 72, position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <h2
              style={{
                color: 'white',
                fontSize: 'clamp(28px,4vw,52px)',
                maxWidth: 700,
              }}
            >
              Stranded? Don't Wait.
            </h2>
            <p style={{ color: 'rgba(247,243,237,0.85)', fontSize: 18, maxWidth: 480 }}>
              Our dispatch team is standing by 24/7 — call now and we'll get you moving.
            </p>
            <a
              href="tel:7179335655"
              className="reveal d1"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 14,
                backgroundColor: 'var(--cream)',
                color: 'var(--red)',
                fontFamily: 'var(--ff-display)',
                fontWeight: 800,
                fontSize: 'clamp(24px,3vw,36px)',
                padding: '20px 40px',
                textDecoration: 'none',
                lineHeight: 1,
                marginTop: 8,
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'white'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--cream)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <Icon name="phone" size={28} />
              717-933-5655
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
