import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function RandCounter({ target, delay = 0 }: { target: number; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => {
      let n = 0
      const step = target / (1000 / 16)
      const iv = setInterval(() => {
        n += step
        if (n >= target) { setVal(target); clearInterval(iv) }
        else setVal(Math.floor(n))
      }, 16)
      return () => clearInterval(iv)
    }, delay * 1000)
    return () => clearTimeout(t)
  }, [inView, target, delay])

  return <span ref={ref}>R{val.toLocaleString()}</span>
}

const lineItems = [
  { label: 'Commission (342 units)', amount: 'R12,420', accent: false },
  { label: 'Bonus — target exceeded', amount: 'R2,500', accent: false },
  { label: 'Platform fee', amount: '-R1,250', accent: false },
]

export default function StepPayMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-3 bg-yellow/[0.04] rounded-2xl blur-xl" />

      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="ml-2 text-[8px] text-white/20 font-medium tracking-wide">Earnings</span>
        </div>

        <div className="p-3" style={{ minHeight: 130 }}>
          {/* Total amount */}
          <motion.div
            className="text-center mb-3"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="text-[7px] text-white/25 uppercase tracking-wider mb-1">Net Earnings</div>
            <div className="text-[18px] font-bold text-yellow">
              <RandCounter target={13670} delay={0.5} />
            </div>
          </motion.div>

          {/* Line items */}
          <div className="space-y-1 mb-3">
            {lineItems.map((item, i) => (
              <motion.div
                key={item.label}
                className="flex items-center justify-between px-2 py-1 rounded bg-white/[0.02]"
                initial={{ opacity: 0, x: -8 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.3, delay: 0.8 + i * 0.12 }}
              >
                <span className="text-[7px] text-white/35">{item.label}</span>
                <span className={`text-[8px] font-semibold ${
                  item.amount.startsWith('-') ? 'text-white/40' : 'text-white/60'
                }`}>{item.amount}</span>
              </motion.div>
            ))}
          </div>

          {/* "Paid" confirmation */}
          <motion.div
            className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-emerald-500/[0.08] border border-emerald-500/15"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 1.5 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : undefined}
              transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 1.7 }}
            >
              <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.div>
            <span className="text-[7px] font-bold text-emerald-400 tracking-wider">PAID TO CLIENT</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
