import { motion } from 'framer-motion'

export default function TaglineSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white dot-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-4 leading-tight"
        >
          We Don't Just Fill Shelves.{' '}
          <span className="text-sky">We Move Product</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg font-semibold text-indigo mb-6"
        >
          Merchandising. Active Selling. Real-Time Results.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-base sm:text-lg text-indigo/80 leading-relaxed max-w-3xl mx-auto"
        >
          At Merch&Move, we go beyond traditional retail merchandising services.
          Our trained in-store promoters actively engage with shoppers — answering
          questions, recommending products, and driving point-of-sale conversions.
          Plus, our real-time retail execution dashboard lets you track every move,
          every day.
        </motion.p>
      </div>
    </section>
  )
}
