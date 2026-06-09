import { useCallback } from 'react'

export function useDistanceMatrix() {
  const fetchLeg = useCallback((origin, destination) => {
    return new Promise((resolve, reject) => {
      if (!window.google?.maps?.DistanceMatrixService) {
        reject(new Error('Google Maps not loaded'))
        return
      }
      const service = new window.google.maps.DistanceMatrixService()
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: window.google.maps.TravelMode.DRIVING,
          unitSystem: window.google.maps.UnitSystem.IMPERIAL,
        },
        (response, status) => {
          if (status !== 'OK') {
            reject(new Error(`Distance Matrix error: ${status}`))
            return
          }
          const element = response.rows[0]?.elements[0]
          if (!element || element.status !== 'OK') {
            reject(new Error('Route not found'))
            return
          }
          resolve({
            durationSeconds: element.duration.value,
            distanceMeters: element.distance.value,
          })
        }
      )
    })
  }, [])

  return { fetchLeg }
}
