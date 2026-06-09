import { useState } from 'react'
import CautionStripe from '../components/ui/CautionStripe'
import Modal from '../components/ui/Modal'
import JobApplicationForm from '../components/forms/JobApplicationForm'

const TEAM = [
  {
    name: 'John D.',
    title: 'Owner / Operator',
    bio: 'With over 20 years in the towing and recovery industry, John founded I78 Truck Center with a commitment to professional, round-the-clock service for motorists across Pennsylvania.',
  },
  {
    name: 'Mike T.',
    title: 'Lead Recovery Technician',
    bio: 'Mike specializes in heavy-duty and complex recovery operations. Certified in rigging and multi-axle extraction, he leads our most demanding call-outs with calm expertise.',
  },
  {
    name: 'Sarah L.',
    title: 'Dispatch Coordinator',
    bio: 'Sarah keeps the operation running smoothly around the clock. She manages routing, driver coordination, and customer communication — ensuring every call is handled with urgency.',
  },
]

function TeamMemberCard({ name, title, bio }) {
  return (
    <div
      className="rounded-xl overflow-hidden border flex flex-col"
      style={{ backgroundColor: '#282020', borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <div
        className="aspect-square flex items-center justify-center"
        style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
      >
        <span className="text-6xl" style={{ opacity: 0.3 }}>👤</span>
      </div>
      <div className="p-5 flex flex-col gap-1 flex-1">
        <h3
          className="text-white text-xl font-bold uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          {name}
        </h3>
        <p className="text-sm font-semibold uppercase tracking-wider" style={{ color: '#c02026' }}>
          {title}
        </p>
        <p className="text-sm leading-relaxed mt-2" style={{ color: 'rgba(255,255,255,0.55)' }}>{bio}</p>
      </div>
    </div>
  )
}

function HiringCard({ onApply }) {
  return (
    <div
      className="rounded-xl overflow-hidden border-2 border-dashed flex flex-col items-center justify-center text-center p-8 gap-4 cursor-pointer transition-colors"
      style={{ borderColor: '#c02026', backgroundColor: '#282020', minHeight: '320px' }}
      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#123c5f'}
      onMouseLeave={e => e.currentTarget.style.backgroundColor = '#282020'}
      onClick={onApply}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-white text-3xl"
        style={{ backgroundColor: '#c02026' }}
      >
        +
      </div>
      <div>
        <h3
          className="text-white text-2xl font-black uppercase mb-2"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          We're Hiring!
        </h3>
        <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>
          Join the I78 Truck Center team. We're always looking for skilled drivers, technicians, and dispatchers who share our commitment to excellence.
        </p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onApply() }}
        className="mt-2 px-6 py-3 rounded-lg text-white font-bold uppercase tracking-wide text-sm transition-all hover:brightness-110"
        style={{ backgroundColor: '#c02026', fontFamily: "'Barlow Condensed', sans-serif" }}
      >
        Apply Now →
      </button>
    </div>
  )
}

export default function AboutPage() {
  const [hiringOpen, setHiringOpen] = useState(false)

  return (
    <>
      {/* Page hero */}
      <section
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ backgroundColor: '#282020' }}
      >
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/assets/hero-trucks.jpg')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(40,32,32,0.82)' }} aria-hidden="true" />
        <div className="absolute inset-0 texture-overlay" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="text-white text-5xl sm:text-6xl font-black uppercase tracking-wide mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            About I78 Truck Center
          </h1>
          <p className="text-lg" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Built in Bethel. Trusted across Pennsylvania.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <CautionStripe height="h-6" />
        </div>
      </section>

      {/* Company history */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: '#f7f3ed' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('/assets/caution-warmgrey.png')",
            backgroundSize: 'auto 80px',
            backgroundRepeat: 'repeat',
            opacity: 0.18,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="rounded-xl aspect-video overflow-hidden">
            <img
              src="/assets/shop-fleet.jpg"
              alt="I78 Truck Center shop and fleet"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2
              className="text-4xl font-black uppercase tracking-wide mb-6"
              style={{ color: '#282020', fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Our Story
            </h2>
            <p className="leading-relaxed mb-4" style={{ color: 'rgba(40,32,32,0.7)' }}>
              I78 Truck Center began with a single truck and an unwavering commitment to showing up — rain, snow, or the middle of the night. What started as a local roadside assistance service has grown into one of the region's most capable towing and recovery operations, serving individual motorists and commercial fleets across Pennsylvania.
            </p>
            <p className="leading-relaxed mb-4" style={{ color: 'rgba(40,32,32,0.7)' }}>
              Based at our facility at 120 Klein Road in Bethel, PA, we've built our reputation call by call, job by job. Every member of our team understands that when the phone rings, someone is counting on us. That sense of responsibility drives everything we do.
            </p>
            <p className="leading-relaxed" style={{ color: 'rgba(40,32,32,0.7)' }}>
              From state police-mandated recovery scenes on I-78 to getting a family back on the road after a breakdown — we treat every job with the same level of professionalism and urgency.
            </p>
          </div>
        </div>
      </section>

      <CautionStripe />

      {/* Values */}
      <section className="py-16 px-6 relative overflow-hidden" style={{ backgroundColor: '#123c5f' }}>
        <div className="absolute inset-0 texture-overlay" aria-hidden="true" />
        <div className="relative z-10 max-w-5xl mx-auto text-center mb-10">
          <h2
            className="text-white text-4xl font-black uppercase tracking-wide"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            What We Stand For
          </h2>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { icon: '⚡', title: 'Rapid Response', desc: 'Every minute counts in an emergency. We prioritize speed without sacrificing safety.' },
            { icon: '🤝', title: 'Honest Service', desc: 'No hidden fees. No runaround. You\'ll know the price before we hook up.' },
            { icon: '💪', title: 'Pro-Grade Equipment', desc: 'Our fleet is maintained to the highest standards — ready for any job, any time.' },
          ].map(({ icon, title, desc }) => (
            <div
              key={title}
              className="rounded-xl p-6 border text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)' }}
            >
              <div className="text-4xl mb-3">{icon}</div>
              <h3
                className="text-white text-xl font-bold uppercase mb-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CautionStripe />

      {/* Team + Hiring */}
      <section className="py-20 px-6 relative overflow-hidden" style={{ backgroundColor: '#282020' }}>
        <div className="absolute inset-0 texture-overlay" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-white text-4xl font-black uppercase tracking-wide mb-3"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Meet the Team
            </h2>
            <p className="max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
              The people behind every successful job. Experienced, certified, and always ready to roll.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
            <HiringCard onApply={() => setHiringOpen(true)} />
          </div>
        </div>
      </section>

      <Modal isOpen={hiringOpen} onClose={() => setHiringOpen(false)} title="Join Our Team">
        <JobApplicationForm onSuccess={() => setHiringOpen(false)} />
      </Modal>
    </>
  )
}
