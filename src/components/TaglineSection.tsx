import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    value: 'Book',
    label: 'Schedule shifts & assign products',
    accent: 'yellow' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    number: '02',
    value: 'Sell',
    label: 'Our promoters actively sell in-store',
    accent: 'sky' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    number: '03',
    value: 'Track',
    label: 'See real-time sales results & ROI',
    accent: 'sky' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
]

/* Connector line between cards — horizontal on desktop, vertical dot on mobile */
function Connector({ delay, from, to }: { delay: number; from: 'yellow' | 'sky'; to: 'sky' }) {
  return (
    <>
      {/* Desktop: horizontal animated line */}
      <div className="hidden sm:flex items-center justify-center">
        <div className="relative w-full h-px">
          {/* Track */}
          <div className="absolute inset-0 bg-white/[0.06]" />
          {/* Animated fill */}
          <motion.div
            className="absolute inset-y-0 left-0 right-0 origin-left"
            style={{
              background: from === 'yellow'
                ? 'linear-gradient(90deg, rgba(249,215,2,0.4), rgba(62,181,225,0.4))'
                : 'linear-gradient(90deg, rgba(62,181,225,0.4), rgba(62,181,225,0.4))',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
          />
          {/* Glow */}
          <motion.div
            className="absolute -inset-y-[2px] left-0 right-0 origin-left blur-[2px]"
            style={{
              background: from === 'yellow'
                ? 'linear-gradient(90deg, rgba(249,215,2,0.2), rgba(62,181,225,0.2))'
                : 'linear-gradient(90deg, rgba(62,181,225,0.2), rgba(62,181,225,0.2))',
            }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + 0.05, ease: 'easeOut' }}
          />
          {/* End dot */}
          <motion.div
            className={`absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full ${
              to === 'sky' ? 'bg-sky/50' : 'bg-yellow/50'
            }`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.5, type: 'spring', stiffness: 400 }}
          />
        </div>
      </div>

      {/* Mobile: vertical connector dots */}
      <motion.div
        className="sm:hidden flex flex-col items-center gap-1 py-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
      >
        <div className="w-px h-3 bg-white/[0.08]" />
        <div className={`w-1.5 h-1.5 rounded-full ${
          from === 'yellow' ? 'bg-yellow/30' : 'bg-sky/30'
        }`} />
        <div className="w-px h-3 bg-white/[0.08]" />
      </motion.div>
    </>
  )
}

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

        {/* ── Connected Step Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_40px_1fr_40px_1fr] gap-0 items-center max-w-3xl mx-auto">
          {steps.map((step, i) => {
            const isYellow = step.accent === 'yellow'
            return (
              <motion.div key={step.value} className="contents">
                {/* Connector before card (except first) */}
                {i > 0 && (
                  <Connector
                    delay={0.5 + i * 0.15}
                    from={steps[i - 1].accent}
                    to="sky"
                  />
                )}

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                  className={`relative bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-xl px-6 py-8 flex flex-col items-center transition-all duration-300 hover:border-white/10 hover:-translate-y-0.5 group cursor-default`}
                >
                  {/* Step number */}
                  <span className="absolute top-3 right-3 text-[10px] font-mono text-white/10">
                    {step.number}
                  </span>

                  {/* Icon container */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 + i * 0.12 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                      isYellow
                        ? 'bg-yellow/10 text-yellow border border-yellow/20'
                        : 'bg-sky/10 text-sky border border-sky/20'
                    }`}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Word */}
                  <span className={`font-display text-4xl italic mb-2 ${
                    isYellow ? 'text-gradient-yellow' : 'text-gradient-sky'
                  }`}>
                    {step.value}
                  </span>

                  {/* Subtitle */}
                  <p className="text-xs text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                    {step.label}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
