import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="py-24 sm:py-32 bg-white dot-grid">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-6 leading-tight"
        >
          Let's Move Your Stock —{' '}
          <span className="text-sky">Together</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-indigo/80 mb-4 leading-relaxed"
        >
          Experience the difference of outsourced merchandising, in-store promoter
          activation, and real-time sales tracking.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-lg text-indigo/80 mb-10"
        >
          Let's show you how it works.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center px-10 py-4 text-base font-semibold text-white bg-navy rounded-xl hover:bg-navy/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-navy/25"
          >
            Request a Demo
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
