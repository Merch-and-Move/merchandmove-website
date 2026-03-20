import { motion } from 'framer-motion'

export default function CTASection() {
  return (
    <section className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      {/* Strong central glow */}
      <motion.div
        animate={{
          x: [0, 20, -15, 10, 0],
          y: [0, -15, 20, -10, 0],
          scale: [1, 1.05, 0.95, 1.03, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="mesh-orb mesh-orb-yellow w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"
        style={{ animation: 'none' }}
      />
      <motion.div
        animate={{
          x: [0, -20, 15, -10, 0],
          y: [0, 15, -20, 10, 0],
          scale: [1, 0.97, 1.04, 0.98, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="mesh-orb mesh-orb-sky w-[500px] h-[500px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15"
        style={{ animation: 'none' }}
      />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl text-white mb-8 leading-[1.0]"
        >
          Let's Move Your Stock —{' '}
          <span className="italic text-gradient-sky">Together</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-white/50 mb-5 leading-[1.7]"
        >
          Book shifts, we sell your products, you track results in real-time.
          Pay only for the sales we make.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-lg text-white/50 mb-14"
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
            className="group inline-flex items-center px-10 py-4.5 text-base font-semibold text-base bg-yellow rounded-full hover:shadow-[0_0_50px_rgba(249,215,2,0.35)] transition-all duration-500"
          >
            Request a Demo
            <svg
              className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
