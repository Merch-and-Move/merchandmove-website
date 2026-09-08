import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { START_URL } from './startUrl'

// Icon paths live up here so the chip copy below reads as copy, not SVG.
const icons = {
  clock: 'M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z',
  crown: 'M4 8.5l4.2 3L12 5l3.8 6.5 4.2-3L18.3 19H5.7L4 8.5z',
  spark: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  wallet: 'M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3',
  cashOut: 'M12 6v12m0 0l3.75-3.75M12 18l-3.75-3.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  percent: 'M9 14.25l6-6M9.75 9a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm5.25 5.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  check: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  cap: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342',
  phone: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
  globe: 'M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247',
  heart: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
  home: 'M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75',
}

// Four fixed positions in the gutters either side of the headline. Each one cycles
// through its own set of lines, so the hero says twelve things without ever showing
// more than four pills at once. Keep the lines in a slot roughly the same length —
// the pill is sized to the longest one.
const chipSlots = [
  {
    className: 'left-[2%] top-[18%] sm:left-[4%] sm:top-[24%]',
    accent: 'yellow' as const,
    delay: 0.9,
    float: 6,
    items: [
      { label: 'Your hours', icon: icons.clock },
      { label: 'Your own boss', icon: icons.crown },
      { label: 'Your rules', icon: icons.spark },
    ],
  },
  {
    className: 'right-[2%] top-[28%] sm:right-[4%] sm:top-[50%]',
    accent: 'sky' as const,
    delay: 1.1,
    float: -7,
    items: [
      { label: 'Your wallet', icon: icons.wallet },
      { label: 'Cash out anytime', icon: icons.cashOut },
      { label: 'Earn from 15%', icon: icons.percent },
    ],
  },
  {
    className: 'left-[6%] bottom-[14%] sm:left-[6%] sm:bottom-[20%]',
    accent: 'yellow' as const,
    delay: 1.3,
    float: 5,
    items: [
      { label: 'No experience needed', icon: icons.check },
      { label: 'Training included', icon: icons.cap },
      { label: 'All from your phone', icon: icons.phone },
    ],
  },
  {
    className: 'right-[6%] bottom-[18%] sm:right-[6%] sm:bottom-[19%]',
    accent: 'sky' as const,
    delay: 1.5,
    float: -6,
    items: [
      { label: 'Work from anywhere', icon: icons.globe },
      { label: 'Brands people love', icon: icons.heart },
      { label: 'Sell in your slippers', icon: icons.home },
    ],
  },
]

// One chip swaps every ROTATE_MS, taken in turn, so any single chip only changes
// every ~10s. Enough movement to catch the eye, slow enough to actually read.
const ROTATE_MS = 2600

export default function BusinessHero() {
  const reduceMotion = useReducedMotion()
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => setTick(t => t + 1), ROTATE_MS)
    return () => clearInterval(id)
  }, [reduceMotion])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-indigo w-[800px] h-[800px] -top-60 -left-60" />
      <div className="mesh-orb mesh-orb-yellow w-[600px] h-[600px] top-1/4 right-0 translate-x-1/4" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-10 left-1/3" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      {/* Floating chips */}
      <div className="absolute inset-0 max-w-6xl mx-auto pointer-events-none hidden sm:block">
        {chipSlots.map((slot, i) => {
          // Slots take their turn one after the other, so only one line ever moves at a time.
          const step = Math.floor((tick + chipSlots.length - 1 - i) / chipSlots.length)
          const active = step % slot.items.length
          // Rotation only ever goes forwards, so the line on its way out is always the one before.
          const outgoing = (active - 1 + slot.items.length) % slot.items.length

          return (
            <motion.div
              key={slot.className}
              initial={{ opacity: 0, y: 12, scale: 0.9 }}
              animate={{ opacity: 1, y: reduceMotion ? 0 : [0, slot.float, 0], scale: 1 }}
              transition={{
                opacity: { duration: 0.6, delay: slot.delay },
                scale: { duration: 0.6, delay: slot.delay },
                y: reduceMotion
                  ? { duration: 0.6, delay: slot.delay }
                  : { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: slot.delay },
              }}
              className={`absolute ${slot.className} flex items-center justify-center px-4 py-2.5 rounded-full bg-white/[0.05] border border-white/[0.1] backdrop-blur-sm ${
                slot.accent === 'yellow'
                  ? 'text-yellow shadow-[0_0_30px_rgba(249,215,2,0.08)]'
                  : 'text-sky shadow-[0_0_30px_rgba(62,181,225,0.08)]'
              }`}
            >
              {/* Every line of a slot sits in the same grid cell, so the pill keeps a
                  steady width and the lines can slide past one another. */}
              <span className="grid">
                {slot.items.map((item, idx) => (
                  <motion.span
                    key={item.label}
                    aria-hidden={idx !== active}
                    className="col-start-1 row-start-1 flex items-center justify-center gap-2 whitespace-nowrap"
                    initial={false}
                    animate={{
                      opacity: idx === active ? 1 : 0,
                      y: idx === active ? 0 : idx === outgoing ? -12 : 12,
                    }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    <span className="text-xs font-semibold tracking-wide text-white/80">{item.label}</span>
                  </motion.span>
                ))}
              </span>
            </motion.div>
          )
        })}
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
