import { motion } from 'framer-motion'

const pillars = [
  {
    label: 'STOCK IN',
    number: '01',
    description: 'We place your products smartly, backed by visual merchandising and field team execution.',
    accent: 'yellow' as const,
  },
  {
    label: 'STOCK OUT',
    number: '02',
    description: 'Our promoters convert shelf visibility into real sales — engaging shoppers in-store.',
    accent: 'sky' as const,
  },
  {
    label: 'DATA & INSIGHTS',
    number: '03',
    description: 'Track your ROI with live dashboards. Every shelf touchpoint recorded and reported.',
    accent: 'sky' as const,
  },
]

export default function PillarsOverview() {
  return (
    <section className="relative py-24 sm:py-28 bg-base">
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {pillars.map((pillar, i) => {
            const isYellow = pillar.accent === 'yellow'
            return (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-base-light p-10 group cursor-default hover:bg-base-lighter transition-colors duration-500 relative"
              >
                {/* Number */}
                <span className="text-[11px] font-mono text-white/15 absolute top-6 right-6">
                  {pillar.number}
                </span>

                {/* Accent dot */}
                <div className={`w-2.5 h-2.5 rounded-full mb-8 ${
                  isYellow ? 'bg-yellow' : 'bg-sky'
                }`} />

                <h3 className={`text-xs font-bold tracking-[0.2em] mb-4 ${
                  isYellow ? 'text-yellow' : 'text-sky'
                }`}>
                  {pillar.label}
                </h3>
                <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/65 transition-colors duration-500">
                  {pillar.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-7 py-3 text-sm font-medium text-white/60 border border-white/12 hover:border-yellow/40 hover:text-yellow rounded-full transition-all duration-300"
          >
            Request a Demo
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
