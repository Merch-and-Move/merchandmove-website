import { motion } from 'framer-motion'

const features = [
  {
    title: 'Smarter Shelf Placement',
    description: 'We position your products to maximize visibility and sell-through.',
  },
  {
    title: 'Real-Time Proof of Work',
    description: 'Our app tracks every action with timestamped photos and instant access to your data.',
  },
  {
    title: 'Full-Service Merch Execution',
    description: 'From stock rotation to display setups, we handle it all — accurately and on time.',
  },
]

export default function StockInSection() {
  return (
    <section id="merchandising" className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[600px] h-[600px] -bottom-40 -left-40 opacity-35" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
            >
              Stock In
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl text-white mb-12 leading-[1.05]"
            >
              Retail merchandising services that move your product —{' '}
              <span className="italic text-gradient-yellow">not just your packaging.</span>
            </motion.h2>

            <div className="space-y-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="group flex gap-5"
                >
                  <div className="accent-line flex-shrink-0 bg-yellow/20 group-hover:bg-yellow transition-colors" />
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/65 transition-colors duration-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Placeholder — with mock UI elements for more weight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="card-elevated rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-4 glow-yellow"
          >
            <div className="flex gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-yellow/30" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
            </div>
            <div className="w-3/4 h-2 bg-white/[0.06] rounded-full" />
            <div className="w-2/3 h-2 bg-white/[0.04] rounded-full" />
            <div className="w-1/2 h-2 bg-white/[0.03] rounded-full" />
            <span className="text-white/15 text-xs font-medium mt-4">Merchandising Dashboard</span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
