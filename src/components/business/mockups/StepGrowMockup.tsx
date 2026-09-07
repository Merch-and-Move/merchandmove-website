import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const months = [
  { label: 'Jan', pct: 22 },
  { label: 'Feb', pct: 35 },
  { label: 'Mar', pct: 30 },
  { label: 'Apr', pct: 52 },
  { label: 'May', pct: 68 },
  { label: 'Jun', pct: 100 },
]

export default function StepGrowMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-3 bg-yellow/[0.04] rounded-2xl blur-xl" />
      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="ml-2 text-[8px] text-white/20 font-medium tracking-wide">Earnings</span>
          <motion.span
            className="ml-auto px-1.5 py-0.5 rounded-full bg-yellow/10 border border-yellow/25 text-[6px] font-bold text-yellow tracking-wider"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 1.8 }}
          >
            +354%
          </motion.span>
        </div>

        <div className="p-3" style={{ minHeight: 130 }}>
          <div className="flex items-end justify-between gap-1.5 h-[84px] mb-2">
            {months.map((m, i) => (
              <div key={m.label} className="flex-1 flex flex-col items-center justify-end h-full">
                <motion.div
                  className={`w-full rounded-sm ${i === months.length - 1 ? 'bg-gradient-to-t from-yellow/60 to-yellow' : 'bg-gradient-to-t from-sky/30 to-sky/60'}`}
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${m.pct}%` } : undefined}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15, ease: 'easeOut' }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between gap-1.5">
            {months.map(m => (
              <div key={m.label} className="flex-1 text-center text-[6px] text-white/25">{m.label}</div>
            ))}
          </div>

          <motion.div
            className="mt-3 flex items-center justify-between px-2 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.05]"
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: 1.5 }}
          >
            <span className="text-[6.5px] text-white/35">Best month yet</span>
            <span className="text-[8px] font-bold text-yellow">June</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
