import { motion } from 'framer-motion'

const features = [
  {
    title: 'Active In-Store Promotion',
    description: 'Our promoters are trained to represent your brand, turning passive shelf presence into active sales opportunities.',
  },
  {
    title: 'Enhanced Customer Engagement',
    description: 'By interacting with customers, we create personalized experiences that increase brand loyalty and drive repeat purchases.',
  },
  {
    title: 'Real-Time Sales Analytics',
    description: 'Monitor sales performance and customer feedback instantly through our integrated reporting tools.',
  },
]

export default function StockOutSection() {
  return (
    <section id="sales" className="relative py-28 sm:py-36 bg-base-light overflow-hidden">
      {/* Orbs */}
      <div className="mesh-orb mesh-orb-sky w-[500px] h-[500px] -top-20 -right-40 opacity-30" />
      <div className="mesh-orb mesh-orb-indigo w-[300px] h-[300px] bottom-0 left-20 opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Placeholder (left) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="glass-card rounded-2xl aspect-[4/3] flex items-center justify-center glow-sky order-2 lg:order-1"
          >
            <span className="text-white/15 text-sm font-medium">Active Selling Image</span>
          </motion.div>

          {/* Content (right) */}
          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[11px] font-medium tracking-[0.2em] text-sky uppercase mb-5"
            >
              Stock Out
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-5 leading-[1.1]"
            >
              Turning Shelf Presence into{' '}
              <span className="italic text-gradient-sky">Sales Performance</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-white/40 mb-10 leading-relaxed"
            >
              At Merch&Move, we don't just place your products — we offer active
              in-store sales solutions that drive conversions. Our trained in-store
              promoters engage directly with shoppers, providing product knowledge,
              answering questions, and driving purchase decisions.
            </motion.p>

            <div className="space-y-6">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group flex gap-4"
                >
                  <div className="flex-shrink-0 w-px bg-sky/20 group-hover:bg-sky/60 transition-colors duration-500" />
                  <div className="py-1">
                    <h3 className="text-sm font-semibold text-white mb-1.5">{feature.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
