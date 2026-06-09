import { Link } from 'react-router-dom'

export default function ServiceCard({ icon, title, description, linkTo = '/services', variant = 'dark', image }) {
  const isDark = variant === 'dark'

  const card = (
    <div
      className="group rounded-lg border transition-all duration-200 h-full flex flex-col overflow-hidden"
      style={isDark
        ? { borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.04)' }
        : { borderColor: '#dad2c9', backgroundColor: '#f7f3ed' }
      }
      onMouseEnter={e => e.currentTarget.style.borderColor = '#c02026'}
      onMouseLeave={e => e.currentTarget.style.borderColor = isDark ? 'rgba(255,255,255,0.1)' : '#dad2c9'}
    >
      {image && (
        <div className="aspect-video overflow-hidden flex-shrink-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div
          className="w-12 h-12 rounded-md flex items-center justify-center text-2xl flex-shrink-0"
          style={{ backgroundColor: '#c02026' }}
          aria-hidden="true"
        >
          {icon}
        </div>
        <h3
          className="text-xl font-bold uppercase tracking-wide"
          style={{ color: isDark ? '#ffffff' : '#282020', fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {title}
        </h3>
        <p className="text-sm leading-relaxed flex-1" style={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(40,32,32,0.65)' }}>
          {description}
        </p>
        {linkTo && (
          <span className="text-sm font-semibold mt-1 flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: '#c02026' }}>
            Learn More →
          </span>
        )}
      </div>
    </div>
  )

  if (linkTo) {
    return (
      <Link to={linkTo} className="block h-full no-underline">
        {card}
      </Link>
    )
  }
  return card
}
