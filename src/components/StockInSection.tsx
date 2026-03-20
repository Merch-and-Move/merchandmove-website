import { motion } from 'framer-motion'

const features = [
  {
    title: 'Active Selling, Not Passive Placement',
    description: 'Our promoters don\'t just place stock — they engage shoppers, answer questions, recommend products, and close sales right at the shelf.',
  },
  {
    title: 'Trained Brand Ambassadors',
    description: 'Every promoter is trained on your products, brand protocols, and retail processes. They represent your brand with the same care as your own team.',
  },
  {
    title: 'National Footprint, Local Execution',
    description: 'With promoters across South Africa, we activate in-store selling wherever your products are stocked — from Sandton to Somerset West.',
  },
]

export default function StockInSection() {
  return (
    <section id="active-selling" className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[600px] h-[600px] -bottom-40 -left-40 opacity-30" />
      <div className="mesh-orb mesh-orb-indigo w-[300px] h-[300px] top-20 right-20 opacity-20" />
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
              Active In-Store Selling
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl text-white mb-6 leading-[1.05]"
            >
              Your Products, Our People —{' '}
              <span className="italic text-gradient-yellow">More Sales.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-sm text-white/50 mb-12 leading-[1.8]"
            >
              Traditional merchandising stops at shelf placement. We go further — our promoters
              actively sell your products to shoppers, turning every shift into measurable revenue.
            </motion.p>

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

          {/* Placeholder — mock in-store scenario */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="card-elevated rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-6 glow-yellow"
          >
            {/* Mini mock UI showing a promoter check-in */}
            <div className="w-4/5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow/20 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-yellow/50" />
                </div>
                <div>
                  <div className="w-24 h-2 bg-white/[0.08] rounded-full" />
                  <div className="w-16 h-1.5 bg-white/[0.04] rounded-full mt-1.5" />
                </div>
                <div className="ml-auto px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20">
                  <span className="text-[9px] font-medium text-emerald-400">Active</span>
                </div>
              </div>
              <div className="h-px bg-white/[0.06]" />
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="w-20 h-1.5 bg-white/[0.06] rounded-full" />
                  <div className="w-12 h-1.5 bg-yellow/15 rounded-full" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-16 h-1.5 bg-white/[0.05] rounded-full" />
                  <div className="w-10 h-1.5 bg-yellow/10 rounded-full" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-24 h-1.5 bg-white/[0.04] rounded-full" />
                  <div className="w-14 h-1.5 bg-yellow/10 rounded-full" />
                </div>
              </div>
            </div>
            <span className="text-white/15 text-xs font-medium">Promoter Activity Feed</span>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
