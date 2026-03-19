import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1500
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const stats = [
  { value: 500, suffix: '+', label: 'Stores covered', accent: 'sky' as const },
  { value: 200, suffix: '+', label: 'Promoters deployed', accent: 'yellow' as const },
  { value: 98, suffix: '%', label: 'Shift completion rate', accent: 'sky' as const },
  { value: 24, suffix: '/7', label: 'Live dashboard access', accent: 'yellow' as const },
]

const features = [
  {
    title: 'Live Sales Visibility',
    description: 'Track real-time performance by store, promoter, and SKU.',
  },
  {
    title: 'Predictive Inventory Alerts',
    description: 'Prevent out-of-stocks before they happen with early warning insights.',
  },
  {
    title: 'Smarter Team Deployment',
    description: 'See where your in-store teams drive the most value — and scale it.',
  },
]

export default function DataInsightsSection() {
  return (
    <section id="platform" className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-sky w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-bold tracking-[0.25em] text-sky uppercase mb-6"
          >
            Data & Insights
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.0]"
          >
            See What Sells. Know Where.{' '}
            <span className="italic text-gradient-sky">Act Fast.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-[1.7]"
          >
            We turn retail analytics and store-level sales data into smart
            decisions that move your business forward.
          </motion.p>
        </div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden mb-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-base-light p-8 text-center group hover:bg-base-lighter transition-colors duration-500">
              <div className={`font-display text-4xl sm:text-5xl italic mb-2 ${
                stat.accent === 'sky' ? 'text-sky' : 'text-yellow'
              }`}>
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[11px] font-medium tracking-[0.1em] text-white/30 uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              className="card-elevated rounded-2xl p-8 group cursor-default"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-sky mb-6" />
              <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/65 transition-colors duration-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Dashboard placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 card-elevated rounded-2xl aspect-[21/9] flex flex-col items-center justify-center gap-3 glow-sky"
        >
          <div className="flex gap-2 mb-1">
            <div className="w-3 h-3 rounded-full bg-sky/30" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
            <div className="w-3 h-3 rounded-full bg-white/10" />
          </div>
          <div className="w-1/2 h-2 bg-white/[0.06] rounded-full" />
          <div className="w-2/5 h-2 bg-white/[0.04] rounded-full" />
          <span className="text-white/15 text-xs font-medium mt-2">Analytics Dashboard</span>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
