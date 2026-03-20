import { motion } from 'framer-motion'
import BookMicroIllustration from './illustrations/BookMicroIllustration'
import SellMicroIllustration from './illustrations/SellMicroIllustration'
import TrackMicroIllustration from './illustrations/TrackMicroIllustration'

const pillars = [
  {
    label: 'BOOK SHIFTS',
    number: '01',
    description: 'Schedule shifts at any of our 500+ retail locations. Choose your stores, dates, and products — fully managed through our platform.',
    accent: 'yellow' as const,
    illustration: BookMicroIllustration,
  },
  {
    label: 'ACTIVE SELLING',
    number: '02',
    description: 'Our trained promoters actively engage shoppers, recommend your products, and drive point-of-sale conversions in-store.',
    accent: 'sky' as const,
    illustration: SellMicroIllustration,
  },
  {
    label: 'TRACK & PAY',
    number: '03',
    description: 'See real-time sales results on your portal. Only pay commission on products we actually sell — fully transparent, fully aligned.',
    accent: 'yellow' as const,
    illustration: TrackMicroIllustration,
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
            const Illustration = pillar.illustration
            return (
              <div key={pillar.label} className="relative group">
                {/* Animated gradient border — visible on hover */}
                <div className="absolute -inset-[1px] rounded-none border-rotate-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />

                <motion.div
                  initial={{ opacity: 0, y: 40, rotateX: 6, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  style={{ perspective: '800px' }}
                  className="relative bg-base-light/95 backdrop-blur-sm p-10 cursor-default hover:bg-base-lighter transition-colors duration-500"
                >
                  {/* Number */}
                  <span className="text-[11px] font-mono text-white/15 absolute top-6 right-6">
                    {pillar.number}
                  </span>

                  {/* Micro-illustration */}
                  <div className="w-14 h-14 mb-6">
                    <Illustration />
                  </div>

                  <h3 className={`text-xs font-bold tracking-[0.2em] mb-4 ${
                    isYellow ? 'text-yellow' : 'text-sky'
                  }`}>
                    {pillar.label}
                  </h3>
                  <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/65 transition-colors duration-500">
                    {pillar.description}
                  </p>
                </motion.div>
              </div>
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
