const DISCLAIMER =
  'This is a standard towing estimate only. Final prices are subject to change based on field complications such as accidents, roll-overs, tracking debris, or leaking fluids.'

export default function EstimateResult({ estimate, error, isLoading }) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center gap-3 py-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
        <div
          className="w-6 h-6 rounded-full border-2 animate-spin"
          style={{ borderColor: 'rgba(255,255,255,0.2)', borderTopColor: '#c02026' }}
          aria-hidden="true"
        />
        <span>Calculating your estimate…</span>
      </div>
    )
  }

  if (estimate === 'HEAVY_DUTY') {
    return (
      <div className="rounded-lg p-6 border text-center" style={{ backgroundColor: '#282020', borderColor: '#c02026' }}>
        <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.7)' }}>Heavy-duty variables are highly volatile.</p>
        <p className="font-semibold text-lg mb-4 text-white">Please call us directly for an accurate quote:</p>
        <a
          href="tel:7179335655"
          className="inline-block px-8 py-4 rounded-lg text-white text-2xl font-black tracking-wider hover:brightness-110 transition-all"
          style={{ backgroundColor: '#c02026', fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          📞 717-933-5655
        </a>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg p-5 border text-center" style={{ backgroundColor: '#282020', borderColor: 'rgba(231,53,37,0.4)' }}>
        <p className="text-sm mb-3" style={{ color: '#e73525' }}>⚠️ {error}</p>
        <a href="tel:7179335655" className="font-bold text-lg text-white hover:brightness-110 transition-all">
          Call 717-933-5655 for a quote
        </a>
      </div>
    )
  }

  if (estimate === null || estimate === undefined) return null

  const low = Math.round(estimate * 0.9)
  const high = Math.round(estimate * 1.1)

  return (
    <div className="rounded-lg border overflow-hidden" style={{ backgroundColor: '#282020', borderColor: 'rgba(255,255,255,0.1)' }}>
      <div className="px-6 py-5 text-center">
        <p className="text-xs mb-1 uppercase tracking-widest font-semibold" style={{ color: 'rgba(255,255,255,0.6)' }}>Estimated Cost</p>
        <p
          className="text-5xl font-black text-white mb-1"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          ${low.toLocaleString()} – ${high.toLocaleString()}
        </p>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>*Price range based on typical conditions</p>
      </div>
      <div className="px-6 pb-5">
        <a
          href="tel:7179335655"
          className="block w-full text-center py-3 rounded-md text-white font-bold text-sm uppercase tracking-wide transition-all hover:brightness-110"
          style={{ backgroundColor: '#c02026' }}
        >
          Confirm with Dispatch — 717-933-5655
        </a>
        <p className="text-xs mt-4 leading-relaxed italic text-center" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {DISCLAIMER}
        </p>
      </div>
    </div>
  )
}
