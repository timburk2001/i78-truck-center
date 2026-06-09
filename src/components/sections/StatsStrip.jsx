import Icon from '../ui/Icon'

const STATS = [
  { icon: 'clock', value: '24/7',     label: 'Emergency Dispatch' },
  { icon: 'hook',  value: '50-Ton',   label: 'Rotator Capacity' },
  { icon: 'semi',  value: '1–8 Axle', label: 'Any Configuration' },
  { icon: 'route', value: 'I-78',     label: 'Corridor Coverage' },
]

export default function StatsStrip() {
  return (
    <section style={{ backgroundColor: 'var(--navy)' }} aria-label="Key capabilities">
      <div className="wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
          }}
          className="stats-grid"
        >
          {STATS.map(({ icon, value, label }, i) => (
            <div
              key={value}
              className="reveal"
              style={{
                padding: '36px 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10,
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.12)' : 'none',
                textAlign: 'center',
              }}
            >
              <Icon
                name={icon}
                size={28}
                style={{ color: 'var(--orange)', flexShrink: 0 }}
              />
              <span
                style={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(28px,3vw,40px)',
                  lineHeight: 1,
                  color: 'white',
                }}
              >
                {value}
              </span>
              <span
                style={{
                  fontFamily: 'var(--ff-body)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'rgba(247,243,237,0.6)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > div:nth-child(2) {
            border-right: none !important;
          }
          .stats-grid > div:nth-child(1),
          .stats-grid > div:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.12);
          }
        }
      `}</style>
    </section>
  )
}
