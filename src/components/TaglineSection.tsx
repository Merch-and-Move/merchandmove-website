import { motion } from 'framer-motion'

export default function TaglineSection() {
  return (
    <section id="about" className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-sky w-[500px] h-[500px] top-0 right-0 opacity-25" />

      {/* Grid lines */}
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold tracking-[0.25em] uppercase text-sky mb-8"
        >
          Why Merch & Move
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-[1.0]"
        >
          We Don't Just Fill Shelves.{' '}
          <span className="italic text-gradient-sky">We Move Product</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base sm:text-lg text-white/55 leading-[1.8] mb-16 max-w-3xl mx-auto"
        >
          Most merchandising companies place products on shelves and walk away.
          We place a trained promoter next to your product who <span className="text-white font-medium">actively sells it to shoppers</span> —
          answering questions, recommending products, and driving conversions at the point of sale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto"
        >
          {[
            {
              value: 'Book',
              label: 'Schedule shifts & assign products',
              accent: 'yellow' as const,
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              ),
            },
            {
              value: 'Sell',
              label: 'Our promoters actively sell in-store',
              accent: 'sky' as const,
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              ),
            },
            {
              value: 'Track',
              label: 'See real-time sales results & ROI',
              accent: 'sky' as const,
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              ),
            },
          ].map((item, i) => {
            const isYellow = item.accent === 'yellow'
            return (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="text-center flex flex-col items-center"
              >
                {/* Icon container — matching mockup card style */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 + i * 0.12 }}
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                    isYellow
                      ? 'bg-yellow/10 text-yellow border border-yellow/20'
                      : 'bg-sky/10 text-sky border border-sky/20'
                  }`}
                >
                  {item.icon}
                </motion.div>

                <span className={`font-display text-3xl italic ${
                  isYellow ? 'text-gradient-yellow' : 'text-gradient-sky'
                }`}>
                  {item.value}
                </span>
                <p className="text-xs text-white/40 mt-2">{item.label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
