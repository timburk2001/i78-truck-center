// Single source of truth for site-wide SEO constants and structured data.
// NAP (name/address/phone) here is mirrored in the UI (Footer, Contact page,
// googleMaps.js DEPOT_ADDRESS); keep them in sync if the business details change.

export const SITE_URL = 'https://i78truckcenter.com'
export const SITE_NAME = 'I-78 Truck Center'
export const PHONE = '717-933-5655'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/hero-trucks.jpg`

// schema.org TowingService (a subtype of AutomotiveBusiness → LocalBusiness).
// Rendered once site-wide from Layout. Drives Google local-pack / rich results.
export const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TowingService',
  name: SITE_NAME,
  url: SITE_URL,
  image: DEFAULT_OG_IMAGE,
  telephone: `+1-${PHONE}`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '120 Kline Rd',
    addressLocality: 'Bethel',
    addressRegion: 'PA',
    postalCode: '19507',
    addressCountry: 'US',
  },
  // TODO: add `geo` { '@type': 'GeoCoordinates', latitude, longitude } once
  // exact coordinates for 120 Kline Rd are confirmed.
  areaServed: {
    '@type': 'GeoCircle',
    name: 'I-78 corridor — Bethel, PA and surrounding counties',
  },
  // 24/7 — open every day, all day.
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
}
