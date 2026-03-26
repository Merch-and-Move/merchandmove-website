import { motion } from 'framer-motion'

const words = ['Sales', 'That', 'Move.']

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-base overflow-hidden">
      {/* Animated gradient mesh orbs */}
      <motion.div
        animate={{
          x: [0, 30, -15, 20, 0],
          y: [0, -20, 25, 10, 0],
          scale: [1, 1.05, 0.95, 1.02, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="mesh-orb mesh-orb-indigo w-[800px] h-[800px] -top-60 -left-60"
        style={{ animation: 'none' }}
      />
      <motion.div
        animate={{
          x: [0, -25, 20, -10, 0],
          y: [0, 15, -30, -15, 0],
          scale: [1, 0.97, 1.04, 1.01, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        className="mesh-orb mesh-orb-sky w-[600px] h-[600px] top-1/4 right-0 translate-x-1/4"
        style={{ animation: 'none' }}
      />
      <motion.div
        animate={{
          x: [0, 15, -30, 25, 0],
          y: [0, 25, -10, -20, 0],
          scale: [1, 1.03, 0.96, 1.05, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="mesh-orb mesh-orb-yellow w-[400px] h-[400px] bottom-10 left-1/3"
        style={{ animation: 'none' }}
      />

      {/* Structured grid lines */}
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
        {/* Pill labels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <span className="px-4 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase bg-yellow/10 border border-yellow/20 rounded-full text-yellow">
            Stock In
          </span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="px-4 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase bg-sky/10 border border-sky/20 rounded-full text-sky">
            Stock Out
          </span>
        </motion.div>

        {/* Headline — word-by-word with blur reveal, "Move." kinetic */}
        <h1 className="flex items-baseline justify-center flex-wrap mb-8 gap-x-4 sm:gap-x-6 md:gap-x-8">
          {words.map((word, i) =>
            word === 'Move.' ? (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  x: [0, 8, -8, 0],
                  scale: [1, 1.03, 1, 0.98, 1],
                }}
                transition={{
                  opacity: { duration: 0.9, delay: 0.64 },
                  y: { duration: 0.9, delay: 0.64, ease: [0.22, 1, 0.36, 1] },
                  filter: { duration: 0.9, delay: 0.64 },
                  x: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.8 },
                  scale: { duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1.8 },
                }}
                className="inline-block font-display text-8xl sm:text-9xl md:text-[160px] lg:text-[190px] leading-[0.85] tracking-[-0.02em]"
              >
                <span className="italic text-gradient-yellow-animated">{word}</span>
              </motion.span>
            ) : (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{
                  duration: 0.9,
                  delay: 0.4 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="inline-block font-display text-7xl sm:text-8xl md:text-[110px] lg:text-[130px] text-white leading-[0.85] tracking-[-0.02em]"
              >
                {word}
              </motion.span>
            )
          )}
        </h1>

        {/* Subheadline — clear value prop */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Book shifts. We sell your products in-store.
          <br />
          <span className="text-white font-medium">You only pay for what we sell.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center px-8 py-4 text-sm font-semibold text-base bg-yellow rounded-full hover:shadow-[0_0_40px_rgba(249,215,2,0.35)] transition-all duration-500"
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
            href="#how-it-works"
            className="inline-flex items-center px-8 py-4 text-sm font-medium text-white/70 hover:text-white border border-white/15 hover:border-white/30 rounded-full transition-all duration-300"
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
