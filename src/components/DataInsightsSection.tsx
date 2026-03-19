import { motion } from 'framer-motion'

const features = [
  {
    title: 'Live Sales Visibility',
    description: 'Track real-time performance by store, promoter, and SKU.',
    stat: '24/7',
    statLabel: 'Live tracking',
  },
  {
    title: 'Predictive Inventory Alerts',
    description: 'Prevent out-of-stocks before they happen with early warning insights.',
    stat: '-40%',
    statLabel: 'Stock-outs',
  },
  {
    title: 'Smarter Team Deployment',
    description: 'See where your in-store teams drive the most value — and scale it.',
    stat: '3x',
    statLabel: 'ROI clarity',
  },
]

export default function DataInsightsSection() {
  return (
    <section id="platform" className="relative py-28 sm:py-36 bg-base overflow-hidden">
      {/* Orbs */}
      <div className="mesh-orb mesh-orb-sky w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-medium tracking-[0.2em] text-sky uppercase mb-5"
          >
            Data & Insights
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-[1.05]"
          >
            See What Sells. Know Where.{' '}
            <span className="italic text-gradient-sky">Act Fast.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-white/40 max-w-2xl mx-auto leading-relaxed"
          >
            We turn retail analytics and store-level sales data into smart
            decisions that move your business forward. Our system uploads
            store-level sales daily and transforms them into live dashboards.
          </motion.p>
        </div>

        {/* Feature cards — bento-style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass-card rounded-2xl p-8 group cursor-default transition-all duration-300 hover:glow-sky"
            >
              {/* Stat */}
              <div className="mb-6">
                <span className="font-display text-4xl sm:text-5xl text-sky italic">
                  {feature.stat}
                </span>
                <span className="block text-[10px] font-medium tracking-[0.15em] text-white/30 uppercase mt-1">
                  {feature.statLabel}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dashboard placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 glass-card rounded-2xl aspect-[21/9] flex items-center justify-center glow-sky"
        >
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-3 bg-sky/10 rounded-xl flex items-center justify-center">
              <svg className="w-7 h-7 text-sky/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <span className="text-white/15 text-sm font-medium">Dashboard Preview</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
