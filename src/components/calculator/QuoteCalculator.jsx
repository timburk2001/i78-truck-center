import { useState } from 'react'
import { LoadScript } from '@react-google-maps/api'
import AddressInput from './AddressInput'
import EstimateResult from './EstimateResult'
import { MAPS_API_KEY, MAPS_LIBRARIES, DEPOT_ADDRESS, RATES } from '../../lib/googleMaps'
import { useDistanceMatrix } from '../../hooks/useDistanceMatrix'

const SERVICE_OPTIONS = [
  { value: 'light', label: 'Light Duty (up to 7,000 lbs) — $120/hr' },
  { value: 'medium', label: 'Medium Duty (up to 17,000 lbs) — $185/hr' },
  { value: 'heavy', label: 'Heavy Duty (Over 17,000 lbs) — Call for Price' },
]

function CalculatorInner() {
  const [pickup, setPickup] = useState(null)
  const [dropoff, setDropoff] = useState(null)
  const [serviceType, setServiceType] = useState('')
  const [estimate, setEstimate] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const { fetchLeg } = useDistanceMatrix()

  const isHeavy = serviceType === 'heavy'

  const handleCalculate = async (e) => {
    e.preventDefault()

    setEstimate(null)
    setError(null)

    if (!serviceType) {
      setError('Please select a vehicle weight class.')
      return
    }

    if (isHeavy) {
      setEstimate('HEAVY_DUTY')
      return
    }

    if (!pickup) {
      setError('Please enter and select a pickup location.')
      return
    }
    if (!dropoff) {
      setError('Please enter and select a drop-off destination.')
      return
    }

    setIsLoading(true)
    try {
      const [legA, legB] = await Promise.all([
        fetchLeg(DEPOT_ADDRESS, { lat: pickup.lat, lng: pickup.lng }),
        fetchLeg({ lat: pickup.lat, lng: pickup.lng }, { lat: dropoff.lat, lng: dropoff.lng }),
      ])

      const legAHours = legA.durationSeconds / 3600
      const legBHours = legB.durationSeconds / 3600
      const totalHours = legAHours + legBHours + 0.5 // +0.5hr hookup
      const total = totalHours * RATES[serviceType]

      setEstimate(total)
    } catch (err) {
      setError('Unable to calculate route. Please call us for a quote.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleCalculate} className="flex flex-col gap-5">
      {/* Service type selector */}
      <div className="flex flex-col gap-1">
        <label htmlFor="service-type" className="text-sm font-semibold text-white/80 uppercase tracking-wide">
          Vehicle Weight Class
        </label>
        <select
          id="service-type"
          value={serviceType}
          onChange={(e) => {
            setServiceType(e.target.value)
            setEstimate(null)
            setError(null)
          }}
          className="w-full px-4 py-3 rounded-md text-white text-sm border border-white/20 focus:outline-none focus:border-red-600 transition-all"
          style={{ backgroundColor: '#1e1818' }}
        >
          <option value="" disabled>Select weight class…</option>
          {SERVICE_OPTIONS.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Heavy duty shortcut — show call prompt immediately */}
      {isHeavy ? (
        <EstimateResult estimate="HEAVY_DUTY" />
      ) : (
        <>
          <AddressInput
            id="pickup-address"
            label="Pickup / Current Location"
            placeholder="Enter pickup address…"
            onPlaceSelected={setPickup}
            disabled={!serviceType || isHeavy}
          />
          <AddressInput
            id="dropoff-address"
            label="Drop-off Destination"
            placeholder="Enter destination address…"
            onPlaceSelected={setDropoff}
            disabled={!serviceType || isHeavy}
          />

          <button
            type="submit"
            disabled={isLoading || !serviceType}
            className="w-full py-4 rounded-md text-white font-bold text-lg uppercase tracking-wide transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#c02026', fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {isLoading ? 'Calculating…' : 'Get Estimate'}
          </button>

          {(estimate !== null || error) && (
            <EstimateResult estimate={estimate} error={error} isLoading={isLoading} />
          )}
        </>
      )}
    </form>
  )
}

export default function QuoteCalculator() {
  if (!MAPS_API_KEY) {
    return (
      <div className="rounded-lg p-6 border border-yellow-500/30 text-center" style={{ backgroundColor: '#1e1818' }}>
        <p className="text-yellow-400 text-sm mb-3">⚠️ Quote calculator not yet configured.</p>
        <a href="tel:7179335655" className="text-white font-bold text-lg hover:text-red-400 transition-colors">
          Call 717-933-5655 for an instant quote
        </a>
      </div>
    )
  }

  return (
    <LoadScript apiKey={MAPS_API_KEY} libraries={MAPS_LIBRARIES}>
      <CalculatorInner />
    </LoadScript>
  )
}
