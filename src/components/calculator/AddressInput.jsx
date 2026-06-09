import { useRef } from 'react'
import { Autocomplete } from '@react-google-maps/api'

export default function AddressInput({ label, id, placeholder, onPlaceSelected, disabled }) {
  const autocompleteRef = useRef(null)

  const handleLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete
  }

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace()
    if (place?.geometry?.location) {
      onPlaceSelected({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address,
      })
    } else {
      onPlaceSelected(null)
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-white/80 uppercase tracking-wide">
        {label}
      </label>
      <Autocomplete
        onLoad={handleLoad}
        onPlaceChanged={handlePlaceChanged}
        options={{ componentRestrictions: { country: 'us' } }}
      >
        <input
          id={id}
          type="text"
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-4 py-3 rounded-md text-white placeholder-white/30 text-sm border border-white/20 focus:outline-none focus:ring-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ backgroundColor: '#282020' }}
          onFocus={(e) => (e.target.style.borderColor = '#c02026')}
          onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.2)')}
        />
      </Autocomplete>
    </div>
  )
}
