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

export default function CustomisationSection() {
  return (
    <section className="relative py-32 sm:py-40 bg-base overflow-hidden">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 opacity-40" style={{ background: 'linear-gradient(169deg, rgba(36,51,173,0.2) 0%, rgba(62,181,225,0.1) 100%)' }} />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[11px] font-bold tracking-[0.25em] text-sky uppercase mb-6"
        >
          Tailored Solutions
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-5 leading-[1.05]"
        >
          Customised to Your{' '}
          <span className="italic text-gradient-yellow">Full Basket</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base text-white/50 mb-16 max-w-lg mx-auto leading-[1.7]"
        >
          Everything tailored — from FMCG staff training to live sales tracking and reporting.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="bg-base-light p-10 text-left group cursor-default hover:bg-base-lighter transition-colors duration-500 relative"
            >
              <span className="text-[11px] font-mono text-white/15 absolute top-6 right-6">
                {pillar.number}
              </span>
              <div className={`w-2.5 h-2.5 rounded-full mb-6 ${pillar.accent === 'yellow' ? 'bg-yellow' : 'bg-sky'}`} />
              <h3 className={`text-xs font-bold tracking-[0.2em] mb-3 ${
                pillar.accent === 'yellow' ? 'text-yellow' : 'text-sky'
              }`}>
                {pillar.label}
              </h3>
              <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/65 transition-colors duration-500">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
