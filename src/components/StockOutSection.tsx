import { motion } from 'framer-motion'

const features = [
  {
    title: 'Your Own Client Portal',
    description: 'Log in to your dedicated dashboard and see exactly what\'s happening across every store, shift, and product — updated daily.',
  },
  {
    title: 'Shift-Level Sales Data',
    description: 'Know how much each promoter sold on every shift. No guesswork, no waiting for month-end reports. Data flows in within 24 hours.',
  },
  {
    title: 'Complete Transparency',
    description: 'Every action is tracked — GPS-verified check-ins, timestamped activities, and sales tied to specific promoters and stores.',
  },
]

export default function StockOutSection() {
  return (
    <section id="platform" className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-sky w-[600px] h-[600px] -top-20 -right-40 opacity-30" />
      <div className="mesh-orb mesh-orb-indigo w-[400px] h-[400px] bottom-0 left-20 opacity-20" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Placeholder (left) — Dashboard mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-elevated rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-4 glow-sky order-2 lg:order-1"
          >
            {/* Mock dashboard with chart bars */}
            <div className="w-4/5 space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-sky/30" />
                <div className="w-20 h-2 bg-white/[0.08] rounded-full" />
                <div className="ml-auto w-16 h-2 bg-white/[0.06] rounded-full" />
              </div>
              {/* Mini bar chart */}
              <div className="flex items-end gap-2 h-20">
                {[40, 65, 50, 80, 70, 90, 55].map((h, i) => (
                  <div key={i} className="flex-1 rounded-t-sm bg-sky/15 hover:bg-sky/25 transition-colors" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="flex justify-between">
                <div className="w-8 h-1.5 bg-white/[0.04] rounded-full" />
                <div className="w-8 h-1.5 bg-white/[0.04] rounded-full" />
                <div className="w-8 h-1.5 bg-white/[0.04] rounded-full" />
              </div>
              <div className="h-px bg-white/[0.06]" />
              <div className="flex gap-4">
                <div className="flex-1 p-2 rounded-lg bg-white/[0.03]">
                  <div className="w-10 h-1.5 bg-sky/20 rounded-full mb-1" />
                  <div className="w-6 h-1 bg-white/[0.04] rounded-full" />
                </div>
                <div className="flex-1 p-2 rounded-lg bg-white/[0.03]">
                  <div className="w-8 h-1.5 bg-yellow/15 rounded-full mb-1" />
                  <div className="w-10 h-1 bg-white/[0.04] rounded-full" />
                </div>
              </div>
            </div>
            <span className="text-white/15 text-xs font-medium">Client Portal — Sales Dashboard</span>
          </motion.div>

          {/* Content (right) */}
          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[11px] font-bold tracking-[0.25em] text-sky uppercase mb-6"
            >
              Your Portal
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl text-white mb-6 leading-[1.05]"
            >
              See Every Sale.{' '}
              <span className="italic text-gradient-sky">Know Your ROI.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-white/50 mb-10 leading-[1.7]"
            >
              Our platform doesn't just track shifts — it tracks results.
              Access your own portal to monitor sales performance, promoter activity,
              and ROI across every store you've activated.
            </motion.p>

            <div className="space-y-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group flex gap-5"
                >
                  <div className="accent-line flex-shrink-0 bg-sky/20 group-hover:bg-sky transition-colors" />
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/65 transition-colors duration-500">{feature.description}</p>
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
