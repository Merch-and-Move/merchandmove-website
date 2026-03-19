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
    <section id="merchandising" className="relative py-28 sm:py-36 bg-base overflow-hidden">
      {/* Orb */}
      <div className="mesh-orb mesh-orb-yellow w-[500px] h-[500px] -bottom-40 -left-40 opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[11px] font-medium tracking-[0.2em] text-yellow uppercase mb-5"
            >
              Stock In
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-10 leading-[1.1]"
            >
              Retail merchandising services that move your product —{' '}
              <span className="italic text-gradient-yellow">not just your packaging.</span>
            </motion.h2>

            <div className="space-y-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="group flex gap-4"
                >
                  <div className="flex-shrink-0 w-px bg-yellow/20 group-hover:bg-yellow/60 transition-colors duration-500" />
                  <div className="py-1">
                    <h3 className="text-sm font-semibold text-white mb-1.5">{feature.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card rounded-2xl aspect-[4/3] flex items-center justify-center glow-yellow"
          >
            <span className="text-white/15 text-sm font-medium">Merchandising Image</span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
