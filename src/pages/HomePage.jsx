import { Link } from 'react-router-dom'
import CautionStripe from '../components/ui/CautionStripe'
import TrustBar from '../components/ui/TrustBar'
import ServiceCard from '../components/ui/ServiceCard'
import QuoteCalculator from '../components/calculator/QuoteCalculator'
import LogoVertical from '../assets/logo-vertical-dark.svg?react'

const SERVICES_PREVIEW = [
  { icon: '🚗', title: 'Light Duty Towing', description: 'Fast, reliable towing for passenger vehicles, motorcycles, and SUVs up to 7,000 lbs.' },
  { icon: '🚛', title: 'Heavy Duty Towing', description: 'Equipped for semi-trucks, box trucks, and commercial vehicles requiring specialized rigging.' },
  { icon: '⛏️', title: 'Recovery Services', description: 'Rollover recovery, off-road winching, and complex extraction from any terrain.' },
  { icon: '🔧', title: 'Emergency Road Service', description: 'On-scene tire changes, fuel delivery, battery jump-starts, and lockout assistance.' },
  { icon: '🏠', title: 'Secure Storage', description: 'Indoor and outdoor secured vehicle storage — short-term and long-term options available.' },
  { icon: '🔩', title: 'Hauling & Repairs', description: 'Flatbed equipment transport plus on-site and shop repairs: brakes, clutches, tires, and more.' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#282020' }}
      >
        {/* Background texture overlay */}
        <div
          className="absolute inset-0 opacity-10 bg-center bg-cover"
          style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
          aria-hidden="true"
        />
        {/* Placeholder image area (replace when client provides photos) */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, #c02026 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-8">
          <LogoVertical className="w-56 sm:w-72 mx-auto" />

          <div>
            <h1
              className="text-white text-4xl sm:text-6xl font-black uppercase tracking-tight leading-tight mb-4"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Pennsylvania's Most Trusted<br />
              <span style={{ color: '#c02026' }}>Towing & Recovery</span>
            </h1>
            <p className="text-white/70 text-lg sm:text-xl max-w-2xl mx-auto">
              Light duty to heavy duty — when you're stuck, we're on our way. Available 24 hours a day, 7 days a week.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <a
              href="#quote-calculator"
              className="px-8 py-4 rounded-lg text-white font-bold text-lg uppercase tracking-wide text-center transition-all hover:brightness-110"
              style={{ backgroundColor: '#c02026', fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Get an Estimate
            </a>
            <a
              href="tel:7179335655"
              className="px-8 py-4 rounded-lg text-white font-bold text-lg uppercase tracking-wide text-center border-2 border-white/40 hover:border-white hover:bg-white/10 transition-all"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              📞 Call Now — 717-933-5655
            </a>
          </div>
        </div>

        {/* Bottom caution stripe */}
        <div className="absolute bottom-0 left-0 right-0">
          <CautionStripe height="h-8" />
        </div>
      </section>

      {/* Trust bar */}
      <TrustBar />

      {/* Services preview */}
      <section className="py-20 px-6" style={{ backgroundColor: '#282020' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-white text-4xl font-black uppercase tracking-wide mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Our Services
            </h2>
            <p className="text-white/60 max-w-xl mx-auto">
              From roadside assistance to large-scale recovery operations, we have the equipment and expertise to handle it all.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES_PREVIEW.map((service) => (
              <ServiceCard key={service.title} {...service} variant="dark" />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-block px-8 py-3 rounded-lg border-2 border-white/30 text-white font-semibold uppercase tracking-wide hover:border-white hover:bg-white/10 transition-all text-sm"
            >
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      <CautionStripe />

      {/* Quote Calculator */}
      <section
        id="quote-calculator"
        className="py-20 px-6"
        style={{ backgroundColor: '#1a1414' }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h2
              className="text-white text-4xl font-black uppercase tracking-wide mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Get an Instant Estimate
            </h2>
            <p className="text-white/60">
              Enter your location and destination below to get a real-time towing estimate — no guessing required.
            </p>
          </div>

          <div className="rounded-xl p-6 border border-white/10" style={{ backgroundColor: '#282020' }}>
            <QuoteCalculator />
          </div>
        </div>
      </section>

      <CautionStripe />

      {/* About teaser */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-4xl font-black uppercase tracking-wide mb-4"
              style={{ color: '#282020', fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Built on Hard Work &<br />
              <span style={{ color: '#c02026' }}>Dependability</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              I78 Truck Center was founded on a simple principle: when someone calls for help on the side of the road, they deserve a fast, professional, and courteous response — every time, no matter the hour.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Based out of Bethel, PA, our fleet and team are equipped to handle everything from a stranded motorist on I-78 to complex multi-axle recovery operations for state police.
            </p>
            <Link
              to="/about"
              className="inline-block px-6 py-3 rounded-lg text-white font-bold uppercase tracking-wide text-sm transition-all hover:brightness-110"
              style={{ backgroundColor: '#c02026' }}
            >
              Meet Our Team →
            </Link>
          </div>
          <div
            className="rounded-xl overflow-hidden aspect-video flex items-center justify-center"
            style={{ backgroundColor: '#282020' }}
          >
            {/* Placeholder for a truck/shop photo */}
            <div className="text-center p-8">
              <div className="text-6xl mb-3">🏗️</div>
              <p className="text-white/40 text-sm">Photo Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section
        className="py-14 px-6 text-center"
        style={{ backgroundColor: '#c02026' }}
      >
        <h2
          className="text-white text-3xl sm:text-4xl font-black uppercase tracking-wide mb-4"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          Stranded? Don't Wait.
        </h2>
        <p className="text-white/85 mb-6 text-lg">Our dispatch team is standing by 24/7 — call now and we'll get you moving.</p>
        <a
          href="tel:7179335655"
          className="inline-block px-10 py-5 rounded-lg bg-white font-black text-2xl uppercase tracking-wide hover:bg-yellow-50 transition-all"
          style={{ color: '#c02026', fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          📞 717-933-5655
        </a>
      </section>
    </>
  )
}
