import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const features = [
  {
    title: 'Your Own Client Portal',
    description: 'Log in to your dedicated dashboard and see exactly what\'s happening across every store, shift, and product — updated daily.',
  },
  {
    title: 'Shift-Level Sales Data',
    description: 'Know how much each promoter sold on every shift. No guesswork, no waiting for month-end reports. Data flows in within 24 hours.',
  },
  {
    title: 'Complete Transparency',
    description: 'Every action is tracked — GPS-verified check-ins, timestamped activities, and sales tied to specific promoters and stores.',
  },
]

const barHeights = [40, 65, 50, 80, 70, 90, 55]

/* Card-level variants */
const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
}

/* Header elements */
const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, staggerChildren: 0.08, delayChildren: 0.3 },
  },
}

const dotBounce = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.2, 1],
    opacity: 1,
    transition: { duration: 0.5, times: [0, 0.6, 1] },
  },
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

/* Stat card variants */
const statCardVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

const accentBarVariants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut', delay: 0.15 },
  },
}

function AnimatedBarChart({ isInView }: { isInView: boolean }) {
  const [revealDone, setRevealDone] = useState(false)

  useEffect(() => {
    if (isInView) {
      /* Wait for bars to finish growing, then switch to CSS ambient animation */
      const timer = setTimeout(() => setRevealDone(true), 1800)
      return () => clearTimeout(timer)
    }
  }, [isInView])

  return (
    <div className="flex items-end gap-2 h-20">
      {barHeights.map((h, i) => {
        const isLive = h === 90 /* tallest bar gets "live" glow */
        return (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={isInView ? { height: `${h}%`, opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{
              height: {
                type: 'spring',
                stiffness: 80,
                damping: 14,
                delay: 0.5 + i * 0.08,
              },
              opacity: { duration: 0.3, delay: 0.5 + i * 0.08 },
            }}
            className={`flex-1 rounded-t-sm bg-sky/15 hover:bg-sky/25 transition-colors ${
              revealDone ? `bar-breathe-${i + 1}` : ''
            } ${revealDone && isLive ? 'bar-glow-active' : ''}`}
          />
        )
      })}
    </div>
  )
}

export default function StockOutSection() {
  const mockRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(mockRef, { once: true, margin: '-80px' })

  return (
    <section id="platform" className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-sky w-[600px] h-[600px] -top-20 -right-40 opacity-30" />
      <div className="mesh-orb mesh-orb-indigo w-[400px] h-[400px] bottom-0 left-20 opacity-20" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Animated mock UI — "Data Populating" */}
          <motion.div
            ref={mockRef}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="card-elevated rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-4 glow-sky order-2 lg:order-1"
          >
            <div className="w-4/5 space-y-4">
              {/* Header row */}
              <motion.div
                variants={headerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="flex items-center gap-2 mb-4"
              >
                <motion.div variants={dotBounce} className="w-3 h-3 rounded-full bg-sky/30" />
                <motion.div variants={fadeIn} className="w-20 h-2 bg-white/[0.08] rounded-full" />
                <motion.div variants={fadeIn} className="ml-auto w-16 h-2 bg-white/[0.06] rounded-full" />
              </motion.div>

              {/* Animated bar chart */}
              <AnimatedBarChart isInView={isInView} />

              {/* X-axis labels — fade in after bars */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: 1.2 }}
                className="flex justify-between"
              >
                <div className="w-8 h-1.5 bg-white/[0.04] rounded-full" />
                <div className="w-8 h-1.5 bg-white/[0.04] rounded-full" />
                <div className="w-8 h-1.5 bg-white/[0.04] rounded-full" />
              </motion.div>

              {/* Divider — draws from center */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.6, delay: 1.3, ease: 'easeOut' }}
                className="h-px bg-white/[0.06]"
                style={{ transformOrigin: 'center' }}
              />

              {/* Stat cards — slide up with stagger */}
              <motion.div
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                transition={{ staggerChildren: 0.12, delayChildren: 1.4 }}
                className="flex gap-4"
              >
                <motion.div variants={statCardVariants} className="flex-1 p-2 rounded-lg bg-white/[0.03]">
                  <motion.div
                    variants={accentBarVariants}
                    className={`w-10 h-1.5 rounded-full mb-1 ${isInView ? 'shimmer-sky' : 'bg-sky/20'}`}
                    style={{ transformOrigin: 'left' }}
                  />
                  <div className="w-6 h-1 bg-white/[0.04] rounded-full" />
                </motion.div>
                <motion.div variants={statCardVariants} className="flex-1 p-2 rounded-lg bg-white/[0.03]">
                  <motion.div
                    variants={accentBarVariants}
                    className={`w-8 h-1.5 rounded-full mb-1 ${isInView ? 'shimmer-yellow shimmer-delay-1' : 'bg-yellow/15'}`}
                    style={{ transformOrigin: 'left' }}
                  />
                  <div className="w-10 h-1 bg-white/[0.04] rounded-full" />
                </motion.div>
              </motion.div>
            </div>

            <motion.span
              initial={{ opacity: 0, y: 5 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
              transition={{ duration: 0.4, delay: 1.8 }}
              className="text-white/15 text-xs font-medium"
            >
              Client Portal — Sales Dashboard
            </motion.span>
          </motion.div>

          {/* Content (right) */}
          <div className="order-1 lg:order-2">
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[11px] font-bold tracking-[0.25em] text-sky uppercase mb-6"
            >
              Your Portal
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl text-white mb-6 leading-[1.05]"
            >
              See Every Sale.{' '}
              <span className="italic text-gradient-sky">Know Your ROI.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm text-white/50 mb-10 leading-[1.7]"
            >
              Our platform doesn't just track shifts — it tracks results.
              Access your own portal to monitor sales performance, promoter activity,
              and ROI across every store you've activated.
            </motion.p>

            <div className="space-y-8">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="group flex gap-5"
                >
                  <div className="accent-line flex-shrink-0 bg-sky/20 group-hover:bg-sky transition-colors" />
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/65 transition-colors duration-500">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
