import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const items = [
  { label: 'Welcome Event attended', delay: 0.4 },
  { label: 'Starter kit delivered', delay: 0.9 },
  { label: 'App login live', delay: 1.4 },
  { label: 'Wallet activated', delay: 1.9 },
]

export default function StepSetupMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-3 bg-sky/[0.04] rounded-2xl blur-xl" />
      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="ml-2 text-[8px] text-white/20 font-medium tracking-wide">Getting Started</span>
          <span className="ml-auto text-[6px] font-bold text-sky tracking-wider">4 / 4</span>
        </div>

        <div className="p-3" style={{ minHeight: 130 }}>
          <div className="mb-3">
            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-sky/60 to-sky rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '100%' } : undefined}
                transition={{ duration: 2.0, delay: 0.4, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            {items.map(item => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/[0.02]"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.3, delay: item.delay }}
              >
                <motion.div
                  className="w-3 h-3 rounded-full bg-sky/20 border border-sky/40 flex items-center justify-center flex-shrink-0"
                  initial={{ scale: 0.6 }}
                  animate={inView ? { scale: 1 } : undefined}
                  transition={{ type: 'spring', stiffness: 400, damping: 15, delay: item.delay + 0.15 }}
                >
                  <svg className="w-2 h-2 text-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <span className="text-[7.5px] text-white/60 font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
