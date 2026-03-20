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
  { value: 500, suffix: '+', label: 'Stores covered nationally', accent: 'sky' as const },
  { value: 200, suffix: '+', label: 'Trained promoters deployed', accent: 'yellow' as const },
  { value: 98, suffix: '%', label: 'Shift completion rate', accent: 'sky' as const },
  { value: 24, suffix: 'hr', label: 'Sales data turnaround', accent: 'yellow' as const },
]

const usps = [
  {
    title: 'Pay-for-Performance',
    description: 'Our pricing is built around results. Your commission is only charged on confirmed sales — aligning our success with yours.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    title: 'Scale On Demand',
    description: 'Book 5 shifts or 500. Ramp up for product launches, seasonal pushes, or promotions — and scale down when you don\'t need coverage.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-1.5L12 7.5l3 1.5V15" />
      </svg>
    ),
  },
  {
    title: 'Zero Admin Overhead',
    description: 'No hiring, training, or managing field staff. We handle recruitment, contracts, payroll, and performance — you just book shifts and watch sales.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
]

export default function DataInsightsSection() {
  return (
    <section id="results" className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-sky w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15" style={{ animation: 'none' }} />
      <div className="mesh-orb mesh-orb-yellow w-[400px] h-[400px] -top-20 -left-20 opacity-15" />
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
            Why Brands Choose Us
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.0]"
          >
            Results You Can{' '}
            <span className="italic text-gradient-sky">Measure</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-white/50 max-w-2xl mx-auto leading-[1.7]"
          >
            We don't ask you to trust us — we show you the numbers.
            Every shift, every sale, every rand — tracked and reported in real time.
          </motion.p>
        </div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-base p-8 text-center group hover:bg-base-light transition-colors duration-500">
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

        {/* USP Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {usps.map((usp, i) => (
            <motion.div
              key={usp.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              className="card-elevated rounded-2xl p-8 group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-sky/10 text-sky border border-sky/20 flex items-center justify-center mb-6">
                {usp.icon}
              </div>
              <h3 className="text-sm font-semibold text-white mb-3">{usp.title}</h3>
              <p className="text-sm text-white/50 leading-[1.7] group-hover:text-white/65 transition-colors duration-500">
                {usp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
