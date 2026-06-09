import CautionStripe from '../components/ui/CautionStripe'
import ServiceCard from '../components/ui/ServiceCard'

const SERVICES = [
  {
    icon: '🚗',
    title: 'Light Duty Towing',
    description:
      'We provide fast, professional towing for all standard passenger vehicles, SUVs, vans, and motorcycles up to 7,000 lbs. Whether you\'ve broken down on the highway or been involved in a minor accident, our light-duty fleet is ready to respond around the clock. All vehicles are handled with care to prevent additional damage during transport.',
  },
  {
    icon: '🚛',
    title: 'Heavy Duty Towing',
    description:
      'When standard towing equipment won\'t cut it, you need I78 Truck Center. Our heavy-duty fleet is capable of handling semi-trucks, box trucks, tankers, RVs, and large commercial vehicles. We work closely with state police and fleet managers across Pennsylvania to provide safe, compliant heavy towing services — any hour, any weather.',
  },
  {
    icon: '⛏️',
    title: 'Recovery Services',
    description:
      'Rollovers, off-road incidents, and difficult extraction situations require specialized knowledge and equipment. Our certified recovery technicians are trained in complex rigging and heavy winching operations. From embankment recoveries to multi-vehicle extraction, we approach every scene with safety as the top priority.',
  },
  {
    icon: '🔧',
    title: 'Emergency Road Service',
    description:
      'Not every breakdown requires a tow. Our roadside assistance service covers tire changes, battery jump-starts, fuel delivery, and lockout assistance — getting you back on the road without the cost and delay of a full tow. We carry standard supplies for the most common roadside emergencies.',
  },
  {
    icon: '🏠',
    title: 'Secure Storage',
    description:
      'When your vehicle needs to stay with us, you can trust it\'s in good hands. Our secure storage yard provides both short-term and long-term options for impounded, recovered, or damaged vehicles. We maintain detailed inventory logs and coordinate directly with insurance companies and legal representatives when required.',
  },
  {
    icon: '🔩',
    title: 'Specialized Hauling & Repairs',
    description:
      'Beyond towing, I78 Truck Center operates a full-service repair shop offering brake service, clutch replacement, tire mounting and balancing, and other major and minor mechanical repairs. Our flatbed fleet also handles equipment transport — whether you\'re moving construction machinery, agricultural equipment, or oversized loads.',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Page hero */}
      <section
        className="py-20 px-6 text-center relative overflow-hidden"
        style={{ backgroundColor: '#282020' }}
      >
        <div
          className="absolute inset-0 opacity-5 bg-center bg-cover"
          style={{ backgroundImage: "url('/assets/hero-bg.jpg')" }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="text-white text-5xl sm:text-6xl font-black uppercase tracking-wide mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Our Services
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            From a flat tire to a major highway recovery — we have the equipment, training, and availability to handle it.
          </p>
          <a
            href="tel:7179335655"
            className="inline-block mt-6 px-8 py-4 rounded-lg text-white font-bold text-lg uppercase tracking-wide hover:brightness-110 transition-all"
            style={{ backgroundColor: '#c02026', fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            📞 Call for Immediate Service
          </a>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <CautionStripe height="h-6" />
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} {...service} variant="light" linkTo={null} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        className="py-16 px-6 text-center"
        style={{ backgroundColor: '#282020' }}
      >
        <CautionStripe height="h-6" className="mb-12" />
        <div className="max-w-2xl mx-auto">
          <h2
            className="text-white text-3xl font-black uppercase tracking-wide mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Need a Service Not Listed?
          </h2>
          <p className="text-white/60 mb-6">
            Every situation is unique. Call us and we'll tell you exactly what we can do for you — no run-around, no hold music.
          </p>
          <a
            href="tel:7179335655"
            className="inline-block px-10 py-4 rounded-lg text-white font-black text-xl uppercase tracking-wide hover:brightness-110 transition-all"
            style={{ backgroundColor: '#c02026', fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            📞 717-933-5655
          </a>
        </div>
      </section>
    </>
  )
}
