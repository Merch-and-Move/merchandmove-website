import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-yellow overflow-hidden honeycomb-bg">
      {/* Decorative gradient orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sky/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-navy/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Labels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="px-4 py-1.5 bg-navy text-white text-xs font-semibold rounded-full tracking-wider uppercase">
            Stock In
          </span>
          <span className="px-4 py-1.5 bg-sky text-white text-xs font-semibold rounded-full tracking-wider uppercase">
            Stock Out
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-navy leading-[0.95] tracking-tight mb-6"
        >
          Sales That Move.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-lg sm:text-xl md:text-2xl text-indigo max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          Your All-In-One Partner for Merchandising,{' '}
          <span className="font-bold text-navy">Active Selling</span>, and Live
          Software Tracking.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 text-base font-semibold text-white bg-navy rounded-xl hover:bg-navy/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-navy/25"
          >
            Request a Demo
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#about"
            className="inline-flex items-center px-8 py-4 text-base font-semibold text-navy bg-white/80 backdrop-blur rounded-xl border-2 border-navy/20 hover:border-navy/40 transition-all duration-300 hover:scale-105"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-navy/30 rounded-full flex items-start justify-center p-1.5"
          >
            <div className="w-1.5 h-3 bg-navy/40 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
