import ServiceCard from '../components/ui/ServiceCard'
import Icon from '../components/ui/Icon'

const SERVICES = [
  {
    icon: 'car',
    image: '/assets/light-duty-scene.jpg',
    title: 'Light Duty Towing',
    description:
      "We provide fast, professional towing for all standard passenger vehicles, SUVs, vans, and motorcycles up to 7,000 lbs. Whether you've broken down on the highway or been involved in a minor accident, our light-duty fleet is ready to respond around the clock.",
    linkTo: null,
  },
  {
    icon: 'semi',
    image: '/assets/heavy-recovery.jpg',
    title: 'Heavy Duty Towing',
    description:
      "When standard towing equipment won't cut it, you need I78 Truck Center. Our heavy-duty fleet is capable of handling semi-trucks, box trucks, tankers, RVs, and large commercial vehicles — any hour, any weather.",
    linkTo: null,
  },
  {
    icon: 'hook',
    image: '/assets/winter-recovery.jpg',
    title: 'Recovery Services',
    description:
      'Rollovers, off-road incidents, and difficult extraction situations require specialized knowledge and equipment. Our certified recovery technicians are trained in complex rigging and heavy winching operations.',
    linkTo: null,
  },
  {
    icon: 'cone',
    image: '/assets/flatbed-truck.jpg',
    title: 'Emergency Road Service',
    description:
      'Not every breakdown requires a tow. Our roadside assistance service covers tire changes, battery jump-starts, fuel delivery, and lockout assistance — getting you back on the road fast.',
    linkTo: null,
  },
  {
    icon: 'shop',
    image: '/assets/shop-fleet.jpg',
    title: 'Secure Storage',
    description:
      "When your vehicle needs to stay with us, you can trust it's in good hands. Our secure storage yard provides both short-term and long-term options for impounded, recovered, or damaged vehicles.",
    linkTo: null,
  },
  {
    icon: 'wrench',
    image: '/assets/specialized-lift.jpg',
    title: 'Specialized Hauling & Repairs',
    description:
      'Beyond towing, I78 Truck Center operates a full-service repair shop offering brake service, clutch replacement, tire mounting and balancing, and other major mechanical repairs. Our flatbed fleet handles equipment transport too.',
    linkTo: null,
  },
]

export default function ServicesPage() {
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
            backgroundImage: "url('/assets/heavy-crane.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          aria-hidden="true"
        />
        <div className="wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 760, textShadow: '0 1px 2px rgba(40,32,32,0.92), 0 3px 22px rgba(40,32,32,0.82)' }}>
          <span className="eyebrow reveal" style={{ color: 'rgba(247,243,237,0.5)', marginBottom: 20, display: 'inline-flex' }}>
            What We Offer
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
            Our Services
          </h1>
          <p className="reveal d2" style={{ color: 'rgba(247,243,237,0.65)', fontSize: 18, lineHeight: 1.7, marginBottom: 32 }}>
            From a flat tire to a major highway recovery — we have the equipment, training,
            and availability to handle it.
          </p>
          <div className="reveal d3">
            <a href="tel:7179335655" className="btn-red">
              <Icon name="phone" size={16} />
              Call for Immediate Service
            </a>
          </div>
        </div>

        <div
          className="caution-stripe"
          aria-hidden="true"
          style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 18, zIndex: 2 }}
        />
      </section>

      {/* ── SERVICES GRID ────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
        {/* Grunge tire texture — subtle, reads on cream */}
        <div className="texture-overlay is-soft" aria-hidden="true" />
        <div className="wrap" style={{ paddingBlock: 96, position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3,1fr)',
              gap: 28,
              paddingTop: 32,
            }}
            className="svc-grid"
          >
            {SERVICES.map((service, i) => (
              <div key={service.title} className={`reveal d${Math.min(i + 1, 5)}`}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) { .svc-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 560px) { .svc-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────── */}
      <section
        style={{
          backgroundColor: 'var(--ink)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
        }}
      >
        <div className="wrap" style={{ paddingBlock: 72, position: 'relative', zIndex: 1 }}>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
            <h2
              style={{
                color: 'white',
                fontSize: 'clamp(24px,3.5vw,44px)',
                maxWidth: 600,
              }}
            >
              Need a Service Not Listed?
            </h2>
            <p style={{ color: 'rgba(247,243,237,0.6)', fontSize: 16, lineHeight: 1.7, maxWidth: 480 }}>
              Every situation is unique. Call us and we'll tell you exactly what we can do for
              you — no run-around, no hold music.
            </p>
            <div style={{ marginTop: 12 }}>
              <a href="tel:7179335655" className="btn-red">
                <Icon name="phone" size={16} />
                717-933-5655
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
