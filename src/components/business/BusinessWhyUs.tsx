import { motion } from 'framer-motion'

const proofPoints = [
  { label: 'Active selling, not shelf-filling', body: 'Our promoters are trained to close sales in-store. You get that same playbook.' },
  { label: 'An app that tracks everything', body: 'Every sale, every payout, every day. You always know exactly what you\'ve earned.' },
  { label: 'Brands that already move', body: 'You sell products with proven demand and national retail presence.' },
]

export default function BusinessWhyUs() {
  return (
    <section className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-indigo w-[700px] h-[700px] -top-60 left-1/2 -translate-x-1/2 opacity-40" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
        >
          Why Merch &amp; Move
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-14 leading-[1.0]"
        >
          Built on a Business That{' '}
          <span className="italic text-gradient-yellow">Already Sells</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {proofPoints.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card-elevated rounded-2xl p-7"
            >
              <h3 className="text-sm font-semibold text-white mb-2">{p.label}</h3>
              <p className="text-sm text-white/50 leading-[1.8]">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
