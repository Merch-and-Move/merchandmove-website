import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

function RandCounter({ target, delay = 0, duration = 1200 }: { target: number; delay?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => {
      let n = 0
      const step = target / (duration / 16)
      const iv = setInterval(() => {
        n += step
        if (n >= target) { setVal(target); clearInterval(iv) }
        else setVal(Math.floor(n))
      }, 16)
      return () => clearInterval(iv)
    }, delay * 1000)
    return () => clearTimeout(t)
  }, [inView, target, delay, duration])

  return <span ref={ref}>R{val.toLocaleString()}</span>
}

const activity = [
  { kind: 'sale', label: 'Sale · 2× Aloe Gel', meta: 'Today, 14:32', amount: '+R180' },
  { kind: 'sale', label: 'Sale · Vitamin C Pack', meta: 'Today, 11:05', amount: '+R95' },
  { kind: 'sale', label: 'Sale · 3× Energy Drink', meta: 'Yesterday', amount: '+R120' },
  { kind: 'payout', label: 'Payout · FNB ····4821', meta: 'Mon', amount: '-R2,000' },
]

export default function WalletMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [payoutState, setPayoutState] = useState<'idle' | 'sending' | 'sent'>('idle')

  useEffect(() => {
    if (!inView) return
    const t1 = setTimeout(() => setPayoutState('sending'), 3200)
    const t2 = setTimeout(() => setPayoutState('sent'), 4200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [inView])

  return (
    <div ref={ref} className="relative max-w-md mx-auto">
      <div className="absolute -inset-6 bg-yellow/[0.06] rounded-3xl blur-2xl" />

      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-sm glow-yellow">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/[0.05]">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <span className="ml-2 text-[10px] text-white/25 font-medium tracking-wide">My Wallet</span>
          <span className="ml-auto text-[9px] text-white/30">Thandi N.</span>
        </div>

        <div className="p-5">
          {/* Balance */}
          <motion.div
            className="relative rounded-xl p-5 mb-4 overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(249,215,2,0.12) 0%, rgba(249,215,2,0.03) 60%, rgba(62,181,225,0.06) 100%)', border: '1px solid rgba(249,215,2,0.2)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-yellow/10 blur-2xl" />
            <div className="text-[9px] text-white/40 uppercase tracking-[0.2em] mb-2">Available balance</div>
            <div className="text-[34px] leading-none font-bold text-yellow mb-3 tracking-tight">
              <RandCounter target={4860} delay={0.5} duration={1400} />
            </div>
            <div className="flex items-center gap-4">
              <div>
                <div className="text-[8px] text-white/30 uppercase tracking-wider">This week</div>
                <div className="text-[12px] font-semibold text-white/80"><RandCounter target={1240} delay={0.9} duration={900} /></div>
              </div>
              <div className="w-px h-6 bg-white/[0.08]" />
              <div>
                <div className="text-[8px] text-white/30 uppercase tracking-wider">Sales</div>
                <div className="text-[12px] font-semibold text-white/80">38</div>
              </div>
              <div className="w-px h-6 bg-white/[0.08]" />
              <div>
                <div className="text-[8px] text-white/30 uppercase tracking-wider">Pending</div>
                <div className="text-[12px] font-semibold text-sky">R320</div>
              </div>
            </div>
          </motion.div>

          {/* Payout button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="mb-5"
          >
            <AnimatePresence mode="wait">
              {payoutState === 'sent' ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/[0.1] border border-emerald-500/25"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.1 }}>
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <span className="text-[11px] font-bold text-emerald-400 tracking-wider">PAYOUT SENT · R2,000</span>
                </motion.div>
              ) : (
                <motion.div
                  key="btn"
                  exit={{ opacity: 0, scale: 0.96 }}
                  className={`relative flex items-center justify-center gap-2 py-3 rounded-xl text-[11px] font-bold tracking-wider transition-colors duration-300 ${
                    payoutState === 'sending' ? 'bg-yellow/70 text-base' : 'bg-yellow text-base'
                  }`}
                >
                  {payoutState === 'sending' ? (
                    <>
                      <motion.div
                        className="w-3 h-3 rounded-full border-2 border-base/30 border-t-base"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      SENDING…
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                      </svg>
                      REQUEST PAYOUT
                    </>
                  )}
                  {payoutState === 'idle' && (
                    <motion.div
                      className="absolute right-6 w-5 h-5 rounded-full border-2 border-base/40"
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={inView ? { opacity: [0, 0.8, 0], scale: [0.4, 1.4, 1.8] } : undefined}
                      transition={{ duration: 0.9, delay: 2.6 }}
                    />
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Activity */}
          <div className="text-[8px] text-white/30 uppercase tracking-[0.2em] mb-2">Recent activity</div>
          <div className="space-y-1.5">
            {activity.map((a, i) => (
              <motion.div
                key={a.label}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05]"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : undefined}
                transition={{ duration: 0.35, delay: 1.0 + i * 0.15 }}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                  a.kind === 'sale' ? 'bg-emerald-500/15 border border-emerald-500/25' : 'bg-sky/15 border border-sky/25'
                }`}>
                  {a.kind === 'sale' ? (
                    <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-white/75 font-medium truncate">{a.label}</div>
                  <div className="text-[8px] text-white/25">{a.meta}</div>
                </div>
                <span className={`text-[11px] font-bold ${a.kind === 'sale' ? 'text-emerald-400' : 'text-white/50'}`}>{a.amount}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
