import { motion } from 'framer-motion'

export default function TaglineSection() {
  return (
    <section id="about" className="relative py-28 sm:py-36 bg-base overflow-hidden">
      {/* Subtle orb */}
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] top-0 right-0 opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-medium tracking-[0.2em] uppercase text-sky mb-6"
        >
          Why Merch & Move
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-[1.05]"
        >
          We Don't Just Fill Shelves.{' '}
          <span className="italic text-gradient-sky">We Move Product</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm font-medium text-yellow/80 tracking-wide mb-8"
        >
          Merchandising. Active Selling. Real-Time Results.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base text-white/45 leading-relaxed"
        >
          At Merch&Move, we go beyond traditional retail merchandising services.
          Our trained in-store promoters actively engage with shoppers — answering
          questions, recommending products, and driving point-of-sale conversions.
          Plus, our real-time retail execution dashboard lets you track every move,
          every day.
        </motion.p>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
