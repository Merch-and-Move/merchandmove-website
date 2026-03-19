import { motion } from 'framer-motion'

const pillars = [
  {
    label: 'STOCK IN',
    description: 'We place your products smartly, backed by visual merchandising and field team execution.',
    accent: 'yellow',
  },
  {
    label: 'STOCK OUT',
    description: 'Our promoters convert shelf visibility into real sales — engaging shoppers in-store.',
    accent: 'sky',
  },
  {
    label: 'DATA & INSIGHTS',
    description: 'Track your ROI with live dashboards. Every shelf touchpoint recorded and reported.',
    accent: 'sky',
  },
]

export default function CustomisationSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-base-light overflow-hidden">
      {/* Gradient backdrop */}
      <div className="absolute inset-0 opacity-30" style={{ background: 'linear-gradient(169deg, rgba(36,51,173,0.15) 0%, rgba(62,181,225,0.1) 100%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[11px] font-medium tracking-[0.2em] text-sky uppercase mb-5"
        >
          Tailored Solutions
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-4 leading-[1.05]"
        >
          Customised to Your{' '}
          <span className="italic text-gradient-yellow">Full Basket</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base text-white/40 mb-16 max-w-xl mx-auto"
        >
          Everything tailored — from FMCG staff training to live sales tracking and reporting.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass-card rounded-2xl p-8 text-left group cursor-default transition-all duration-300"
            >
              <div className={`w-2 h-2 rounded-full mb-5 ${pillar.accent === 'yellow' ? 'bg-yellow' : 'bg-sky'}`} />
              <h3 className={`text-[11px] font-semibold tracking-[0.15em] mb-3 ${
                pillar.accent === 'yellow' ? 'text-yellow' : 'text-sky'
              }`}>
                {pillar.label}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">
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
