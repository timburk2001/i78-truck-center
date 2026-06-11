import { Link } from 'react-router-dom'
import Icon from '../ui/Icon'

const CAP_LIST = [
  { icon: 'semi',  text: 'Heavy Duty Rotator' },
  { icon: 'hook',  text: 'Heavy Winching & Rigging' },
  { icon: 'clock', text: '24/7 Rapid Response' },
  { icon: 'pin',   text: 'I-78 Corridor & Beyond' },
]

export default function FeatureRecovery() {
  return (
    <section
      style={{ backgroundColor: 'var(--ink)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Tow hook watermark — subtle, dark-on-dark */}
      <img
        src="/assets/tow-hook-warmwhite.png"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: -40,
          top: '50%',
          transform: 'translateY(-50%)',
          height: '110%',
          width: 'auto',
          opacity: 0.06,
          pointerEvents: 'none',
          userSelect: 'none',
          objectFit: 'contain',
        }}
      />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 72,
            alignItems: 'center',
            paddingBlock: 80,
          }}
          className="feature-grid"
        >
          {/* Left — image */}
          <div
            className="reveal"
            style={{ position: 'relative' }}
          >
            {/* Red left accent bar */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 4,
                background: 'var(--red)',
                zIndex: 2,
              }}
            />
            <img
              src="/assets/heavy-recovery.jpg"
              alt="Heavy recovery operation with heavy duty rotator"
              style={{
                display: 'block',
                width: '100%',
                aspectRatio: '4 / 3',
                objectFit: 'cover',
                paddingLeft: 0,
              }}
            />
          </div>

          {/* Right — copy */}
          <div className="reveal d1" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <span className="eyebrow" style={{ color: 'rgba(247,243,237,0.5)' }}>
              Heavy Recovery
            </span>

            <h2
              style={{
                color: 'white',
                fontSize: 'clamp(32px,4vw,52px)',
                margin: 0,
              }}
            >
              When It Takes a{' '}
              <span style={{ color: 'var(--orange)' }}>Heavy Duty Rotator</span>
            </h2>

            <p style={{ color: 'rgba(247,243,237,0.65)', fontSize: 16, lineHeight: 1.7 }}>
              Large-scale recovery demands specialized gear and certified expertise. Our heavy recovery fleet
              handles semi rollovers, off-road extractions, and complex multi-axle incidents that standard
              towers can't touch — 24 hours a day, 7 days a week.
            </p>

            {/* Cap list */}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {CAP_LIST.map(({ icon, text }) => (
                <li
                  key={text}
                  style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                >
                  <Icon name={icon} size={16} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                  <span style={{ color: 'rgba(247,243,237,0.85)', fontWeight: 600, fontSize: 15 }}>
                    {text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8 }}>
              <a href="tel:7179335655" className="btn-red">
                <Icon name="phone" size={16} />
                Call For Recovery
              </a>
              <Link to="/services" className="btn-ghost">
                All Services
                <Icon name="arrow" size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .feature-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding-block: 60px !important;
          }
        }
      `}</style>
    </section>
  )
}
