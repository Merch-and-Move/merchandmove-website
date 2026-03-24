import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    number: '01',
    value: 'Book',
    label: 'Schedule shifts at any of our 500+ retail locations. Choose your stores, dates, and products — fully managed through our platform.',
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
    label: 'Our trained promoters actively engage shoppers, recommend your products, and drive point-of-sale conversions in-store.',
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
    label: 'See real-time sales results on your portal. Only pay commission on products we actually sell — fully transparent, fully aligned.',
    accent: 'sky' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
]

/* ── Connector between cards ─────────────────────────────────── */
function Connector({ delay, accentFrom }: { delay: number; accentFrom: 'yellow' | 'sky' }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-40px' })

  const gradientColor = accentFrom === 'yellow'
    ? 'rgba(249,215,2,0.4)'
    : 'rgba(62,181,225,0.4)'
  const dotColor = accentFrom === 'yellow'
    ? 'rgba(249,215,2,0.7)'
    : 'rgba(62,181,225,0.7)'

  return (
    <>
      {/* Desktop: horizontal line with traveling glow */}
      <div ref={ref} className="hidden sm:flex items-center justify-center">
        <div className="relative w-full h-px overflow-hidden">
          {/* Static track */}
          <div className="absolute inset-0 bg-white/[0.06]" />

          {/* Static drawn line (appears once on scroll) */}
          <motion.div
            className="absolute inset-y-0 left-0 right-0 origin-left"
            style={{ background: gradientColor }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay, ease: 'easeOut' }}
          />

          {/* Traveling glow dot — loops continuously */}
          {inView && (
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-1 rounded-full blur-[3px]"
              style={{ background: dotColor }}
              animate={{ left: ['-10%', '110%'] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatDelay: 2.5,
                delay: delay + 0.8,
                ease: 'easeInOut',
              }}
            />
          )}
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
          accentFrom === 'yellow' ? 'bg-yellow/30' : 'bg-sky/30'
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

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_48px_1fr_48px_1fr] gap-0 items-center">
          {steps.map((step, i) => {
            const isYellow = step.accent === 'yellow'
            return (
              <motion.div key={step.value} className="contents">
                {/* Connector before card (except first) */}
                {i > 0 && (
                  <Connector
                    delay={0.5 + i * 0.15}
                    accentFrom={steps[i - 1].accent}
                  />
                )}

                {/* Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                  className="relative bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm rounded-xl px-5 py-7 sm:px-6 sm:py-8 flex flex-col items-center transition-all duration-300 hover:border-white/10 hover:-translate-y-0.5 group cursor-default"
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
                  <span className={`font-display text-4xl italic mb-3 ${
                    isYellow ? 'text-gradient-yellow' : 'text-gradient-sky'
                  }`}>
                    {step.value}
                  </span>

                  {/* Description (merged from PillarsOverview) */}
                  <p className="text-xs text-white/40 leading-relaxed group-hover:text-white/55 transition-colors duration-300">
                    {step.label}
                  </p>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* CTA link to detailed steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14"
        >
          <a
            href="#how-it-works"
            className="inline-flex items-center px-7 py-3 text-sm font-medium text-white/60 border border-white/12 hover:border-yellow/40 hover:text-yellow rounded-full transition-all duration-300"
          >
            See How It Works
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
