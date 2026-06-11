const FLEET_STATS = [
  { value: '20+',           label: 'Trucks in Fleet' },
  { value: 'PA-Certified',  label: 'Every Technician' },
  { value: 'Heavy Duty',    label: 'Max Recovery Capacity' },
]

export default function FleetBand() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 480,
        display: 'flex',
        alignItems: 'flex-end',
      }}
      aria-label="Our fleet"
    >
      {/* Background photo */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/assets/shop-fleet.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 80%',
        }}
        aria-hidden="true"
      />

      {/* Content — no photo overlay; legibility via text-shadow */}
      <div className="wrap" style={{ position: 'relative', zIndex: 1, width: '100%', paddingBlock: 64, textShadow: '0 0 4px rgba(40,32,32,0.95), 0 2px 16px rgba(40,32,32,0.9)' }}>
        <div
          style={{
            display: 'flex',
            gap: 56,
            flexWrap: 'wrap',
            alignItems: 'flex-end',
          }}
        >
          {FLEET_STATS.map(({ value, label }, i) => (
            <div
              key={label}
              className={`reveal d${i + 1}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(36px,4vw,56px)',
                  lineHeight: 1,
                  color: 'var(--orange)',
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'rgba(247,243,237,0.65)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
