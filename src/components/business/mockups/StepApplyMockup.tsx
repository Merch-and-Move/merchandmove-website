import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const fields = [
  { label: 'Full name', value: 'Thandi Nkosi' },
  { label: 'Phone', value: '082 123 4567' },
  { label: 'Area', value: 'Durban North' },
]

export default function StepApplyMockup() {
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
          <span className="ml-2 text-[8px] text-white/20 font-medium tracking-wide">Application</span>
        </div>

        <div className="p-3" style={{ minHeight: 130 }}>
          <div className="space-y-1.5 mb-3">
            {fields.map((f, i) => (
              <motion.div
                key={f.label}
                className="rounded-md bg-white/[0.03] border border-white/[0.05] px-2 py-1.5"
                initial={{ opacity: 0, y: 6 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.25 }}
              >
                <div className="text-[6px] text-white/25 uppercase tracking-wider mb-0.5">{f.label}</div>
                <motion.div
                  className="text-[8px] text-white/70 font-medium overflow-hidden whitespace-nowrap"
                  initial={{ width: 0 }}
                  animate={inView ? { width: '100%' } : undefined}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.25, ease: 'linear' }}
                >
                  {f.value}
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="rounded-md py-1.5 text-center text-[7px] font-bold tracking-wider bg-yellow text-base"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 0.3, delay: 1.4 }}
          >
            START MY BUSINESS
          </motion.div>

          <motion.div
            className="mt-2 flex items-center justify-center gap-1 py-1 rounded-md bg-emerald-500/[0.06] border border-emerald-500/10"
            initial={{ opacity: 0, y: 4 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 2.0 }}
          >
            <svg className="w-2 h-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[6px] font-semibold text-emerald-400 tracking-wider">APPLICATION SENT</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
