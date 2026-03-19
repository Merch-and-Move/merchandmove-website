import { motion } from 'framer-motion'

const words = ['Sales', 'That', 'Move.']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-base overflow-hidden">
      {/* Gradient mesh orbs */}
      <div className="mesh-orb mesh-orb-indigo w-[600px] h-[600px] -top-40 -left-40" />
      <div className="mesh-orb mesh-orb-sky w-[500px] h-[500px] top-1/3 right-0 translate-x-1/3" />
      <div className="mesh-orb mesh-orb-yellow w-[300px] h-[300px] bottom-20 left-1/4" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Labels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span className="px-4 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase glass-card rounded-full text-yellow">
            Stock In
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="px-4 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase glass-card rounded-full text-sky">
            Stock Out
          </span>
        </motion.div>

        {/* Headline — word-by-word reveal with display font */}
        <h1 className="mb-8">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                duration: 0.8,
                delay: 0.5 + i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="inline-block font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-tight mr-4 sm:mr-6"
            >
              {word === 'Move.' ? (
                <span className="italic text-gradient-yellow">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Your All-In-One Partner for Merchandising,{' '}
          <span className="text-white/90 font-medium">Active Selling</span>, and
          Live Software Tracking.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center px-8 py-4 text-sm font-medium text-base-light bg-yellow rounded-full hover:shadow-[0_0_30px_rgba(249,215,2,0.3)] transition-all duration-500"
          >
            Request a Demo
            <svg
              className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#about"
            className="inline-flex items-center px-8 py-4 text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded-full transition-all duration-300"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-5 h-8 border border-white/15 rounded-full flex items-start justify-center p-1.5"
          >
            <div className="w-1 h-2 bg-white/30 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
