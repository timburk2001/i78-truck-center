const items = [
  { icon: '⚡', text: '24/7 Emergency Dispatch' },
  { icon: '🏋️', text: 'Heavy-Duty Capable' },
  { icon: '🛡️', text: 'Licensed & Insured' },
  { icon: '📍', text: 'Serving All of PA' },
]

export default function TrustBar() {
  return (
    <div style={{ backgroundColor: '#1e1818' }} className="border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <ul className="flex flex-wrap justify-center md:justify-between gap-x-8 gap-y-3">
          {items.map(({ icon, text }) => (
            <li key={text} className="flex items-center gap-2 text-white/80 text-sm font-semibold">
              <span className="text-lg" aria-hidden="true">{icon}</span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
