import Icon from '../ui/Icon'

const ROUTES = ['I-78', 'I-81', 'US-22', 'PA-501']

export default function ServiceArea() {
  return (
    <section style={{ backgroundColor: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
      <div className="wrap" style={{ position: 'relative', zIndex: 1, paddingBlock: 80 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 72,
            alignItems: 'center',
          }}
          className="service-area-grid"
        >
          {/* Left — copy */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <span className="eyebrow" style={{ color: 'rgba(247,243,237,0.5)' }}>
              Coverage Area
            </span>

            <h2
              style={{
                color: 'white',
                fontSize: 'clamp(30px,3.5vw,48px)',
                margin: 0,
              }}
            >
              We Run the{' '}
              <span style={{ color: 'var(--orange)' }}>I-78 Corridor</span>
            </h2>

            <p style={{ color: 'rgba(247,243,237,0.65)', fontSize: 16, lineHeight: 1.7 }}>
              Based out of Bethel, PA, our dispatch team covers I-78, I-81, US-22, and surrounding
              Pennsylvania routes. Wherever you're stranded — we can reach you fast.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
              <a href="#quote-calculator" className="btn-ghost">
                Get an Estimate
                <Icon name="arrow" size={15} />
              </a>
              <a href="tel:7179335655" className="btn-red">
                <Icon name="phone" size={15} />
                Call Now
              </a>
            </div>
          </div>

          {/* Right — route badges */}
          <div
            className="reveal d2"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
            }}
          >
            {ROUTES.map((route) => (
              <div
                key={route}
                style={{
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  padding: '24px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  alignItems: 'center',
                  transition: 'border-color 0.2s, background 0.2s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--orange)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.background = 'transparent'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 800,
                    fontSize: 28,
                    lineHeight: 1,
                    color: 'white',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {route}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--ff-body)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'rgba(247,243,237,0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  Corridor
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .service-area-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding-block: 60px !important;
          }
        }
      `}</style>
    </section>
  )
}
