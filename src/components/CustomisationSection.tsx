import { motion } from 'framer-motion'

const pillars = [
  {
    label: 'STOCK IN',
    description: 'We place your products smartly, backed by visual merchandising and field team execution.',
  },
  {
    label: 'STOCK OUT',
    description: 'Our promoters convert shelf visibility into real sales — engaging shoppers in-store.',
  },
  {
    label: 'DATA & INSIGHTS',
    description: 'Track your ROI with live dashboards. Every shelf touchpoint recorded and reported.',
  },
]

export default function CustomisationSection() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(169deg, #2433AD 0%, #3EB5E1 100%)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
        >
          Customised to Your Full Basket
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-yellow mb-16 max-w-2xl mx-auto"
        >
          Everything tailored — from FMCG staff training to live sales tracking and reporting.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white/15 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-colors duration-300"
            >
              <h3 className="text-sm font-bold tracking-widest text-white mb-3">{pillar.label}</h3>
              <p className="text-sm text-yellow/90 leading-relaxed">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
