import { motion } from 'framer-motion'
import { START_URL } from './startUrl'

const chips = [
  {
    label: 'Your hours',
    className: 'left-[2%] top-[18%] sm:left-[4%] sm:top-[24%]',
    delay: 0.9,
    float: 6,
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: 'Your wallet',
    className: 'right-[2%] top-[28%] sm:right-[5%] sm:top-[30%]',
    delay: 1.1,
    float: -7,
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
      </svg>
    ),
  },
  {
    label: 'No experience needed',
    className: 'left-[6%] bottom-[14%] sm:left-[10%] sm:bottom-[20%]',
    delay: 1.3,
    float: 5,
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
]

export default function BusinessHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-indigo w-[800px] h-[800px] -top-60 -left-60" />
      <div className="mesh-orb mesh-orb-yellow w-[600px] h-[600px] top-1/4 right-0 translate-x-1/4" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-10 left-1/3" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      {/* Floating chips */}
      <div className="absolute inset-0 max-w-6xl mx-auto pointer-events-none hidden sm:block">
        {chips.map(c => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: [0, c.float, 0], scale: 1 }}
            transition={{
              opacity: { duration: 0.6, delay: c.delay },
              scale: { duration: 0.6, delay: c.delay },
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: c.delay },
            }}
            className={`absolute ${c.className} flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm text-yellow shadow-[0_0_30px_rgba(249,215,2,0.08)]`}
          >
            {c.icon}
            <span className="text-xs font-semibold tracking-wide text-white/80">{c.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-28 pb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase bg-yellow/10 border border-yellow/20 rounded-full text-yellow mb-10"
        >
          Side Hustle or Full-Time. Your Call.
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[120px] text-white leading-[0.92] tracking-[-0.02em] mb-8"
        >
          Start Your Own{' '}
          <span className="italic text-gradient-yellow-animated">Business</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Sell brands people already love, on your own schedule, from wherever you are. Earnings land in
          your own wallet and you cash out when you want.{' '}
          <span className="text-white font-medium">Start small. Grow it as far as you like.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={START_URL}
            className="group inline-flex items-center px-8 py-4 text-sm font-semibold text-base bg-yellow rounded-full hover:shadow-[0_0_40px_rgba(249,215,2,0.35)] transition-all duration-500"
          >
            Start Your Business
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 border border-white/15 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-2 bg-white/30 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
