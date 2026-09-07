import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const sales = [
  { product: '2× Aloe Gel', where: 'Umhlanga', amount: 180, delay: 0.5 },
  { product: '1× Vitamin C Pack', where: 'Durban North', amount: 95, delay: 1.1 },
  { product: '3× Energy Drink', where: 'Ballito', amount: 120, delay: 1.7 },
]

export default function StepSellMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [total, setTotal] = useState(0)

  // Step the running total up as each sale lands.
  useEffect(() => {
    if (!inView) return
    const timers = sales.map((s, i) =>
      setTimeout(() => setTotal(sales.slice(0, i + 1).reduce((sum, x) => sum + x.amount, 0)), s.delay * 1000 + 250),
    )
    return () => timers.forEach(clearTimeout)
  }, [inView])

  return (
    <div ref={ref} className="relative">
      <div className="absolute -inset-3 bg-sky/[0.04] rounded-2xl blur-xl" />
      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="ml-2 text-[8px] text-white/20 font-medium tracking-wide">Sales</span>
          <div className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <motion.div
              className="w-1 h-1 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[6px] font-bold text-emerald-400 tracking-wider">LIVE</span>
          </div>
        </div>

        <div className="p-3" style={{ minHeight: 130 }}>
          <motion.div
            className="text-center mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ delay: 0.2 }}
          >
            <div className="text-[6px] text-white/25 uppercase tracking-wider mb-0.5">Today</div>
            <motion.div
              key={total}
              initial={{ scale: 1.15, color: '#6BC5E8' }}
              animate={{ scale: 1, color: '#3EB5E1' }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="text-[16px] font-bold text-sky"
            >
              R{total}
            </motion.div>
          </motion.div>

          <div className="space-y-1.5">
            {sales.map(s => (
              <motion.div
                key={s.product}
                className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/[0.03] border border-white/[0.05]"
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : undefined}
                transition={{ type: 'spring', stiffness: 300, damping: 22, delay: s.delay }}
              >
                <div className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2 h-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[7.5px] text-white/70 font-medium truncate">{s.product}</div>
                  <div className="text-[6px] text-white/25">{s.where}</div>
                </div>
                <span className="text-[8px] font-bold text-emerald-400">+R{s.amount}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
