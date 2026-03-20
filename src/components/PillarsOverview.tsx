import { motion } from 'framer-motion'

const pillars = [
  {
    label: 'BOOK SHIFTS',
    number: '01',
    description: 'Schedule shifts at any of our 500+ retail locations. Choose your stores, dates, and products — fully managed through our platform.',
    accent: 'yellow' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    label: 'ACTIVE SELLING',
    number: '02',
    description: 'Our trained promoters actively engage shoppers, recommend your products, and drive point-of-sale conversions in-store.',
    accent: 'sky' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    label: 'TRACK & PAY',
    number: '03',
    description: 'See real-time sales results on your portal. Only pay commission on products we actually sell — fully transparent, fully aligned.',
    accent: 'yellow' as const,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
]

export default function PillarsOverview() {
  return (
    <section className="relative py-24 sm:py-28 bg-base">
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {pillars.map((pillar, i) => {
            const isYellow = pillar.accent === 'yellow'
            return (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-base-light p-10 group cursor-default hover:bg-base-lighter transition-colors duration-500 relative"
              >
                {/* Number */}
                <span className="text-[11px] font-mono text-white/15 absolute top-6 right-6">
                  {pillar.number}
                </span>

                {/* Icon container */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 + i * 0.1 }}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-8 ${
                    isYellow
                      ? 'bg-yellow/10 text-yellow border border-yellow/20'
                      : 'bg-sky/10 text-sky border border-sky/20'
                  }`}
                >
                  {pillar.icon}
                </motion.div>

                <h3 className={`text-xs font-bold tracking-[0.2em] mb-4 ${
                  isYellow ? 'text-yellow' : 'text-sky'
                }`}>
                  {pillar.label}
                </h3>
                <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/65 transition-colors duration-500">
                  {pillar.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-14"
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
