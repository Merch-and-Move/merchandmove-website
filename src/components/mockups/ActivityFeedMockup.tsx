import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* ── Live notification items ─────────────────── */
const notifications = [
  { type: 'sale', text: 'Sarah M. sold 3× Protein Shake', store: 'Pick n Pay Sandton', time: '2m ago', amount: 'R285' },
  { type: 'checkin', text: 'James K. checked in', store: 'Checkers Rosebank', time: '5m ago' },
  { type: 'sale', text: 'Thandi N. sold 5× Energy Bar', store: 'Spar Fourways', time: '8m ago', amount: 'R175' },
  { type: 'sale', text: 'David M. sold 2× Vitamin Pack', store: 'Woolworths Melrose', time: '12m ago', amount: 'R340' },
]

/* ── Active promoter card data ───────────────── */
const activePromoter = {
  initials: 'SM',
  name: 'Sarah Mokoena',
  store: 'Pick n Pay Sandton',
  shift: '08:00 – 16:00',
  unitsSold: 14,
  revenue: 'R2,840',
  hoursIn: 4.5,
  totalHours: 8,
}

/* ── Notification icon ───────────────────────── */
function NotifIcon({ type }: { type: string }) {
  if (type === 'sale') {
    return (
      <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-3 h-3 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
    )
  }
  return (
    <div className="w-6 h-6 rounded-full bg-sky/15 border border-sky/20 flex items-center justify-center flex-shrink-0">
      <svg className="w-3 h-3 text-sky" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    </div>
  )
}

/* ── Cycling notification feed ───────────────── */
function LiveFeed({ isInView }: { isInView: boolean }) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    /* Reveal notifications one by one */
    const timers = notifications.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), 800 + i * 400)
    )
    return () => timers.forEach(clearTimeout)
  }, [isInView])

  return (
    <div className="space-y-1.5 overflow-hidden">
      <AnimatePresence>
        {notifications.slice(0, visibleCount).map((n, i) => (
          <motion.div
            key={n.text}
            initial={{ opacity: 0, x: -20, height: 0 }}
            animate={{ opacity: 1, x: 0, height: 'auto' }}
            transition={{
              opacity: { duration: 0.3 },
              x: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
              height: { duration: 0.3 },
            }}
            className="flex items-start gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]"
          >
            <NotifIcon type={n.type} />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[10px] text-white/60 leading-tight">{n.text}</p>
                {n.amount && (
                  <span className="text-[10px] font-semibold text-emerald-400 flex-shrink-0">+{n.amount}</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[8px] text-white/25">{n.store}</span>
                <span className="text-[8px] text-white/15">{n.time}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

/* ── Main Component ──────────────────────────── */
export default function ActivityFeedMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const progressPct = (activePromoter.hoursIn / activePromoter.totalHours) * 100

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ perspective: '1200px' }}
    >
      {/* Glow behind card */}
      <div className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl bg-gradient-to-br from-yellow/15 via-transparent to-indigo/10 pointer-events-none" />

      {/* Main card */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-sm overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
          </div>
          <span className="text-[10px] font-medium text-white/30">Live Activity</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/15">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span className="text-[9px] text-emerald-400/70">Live</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Active Promoter Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-lg bg-gradient-to-r from-yellow/[0.06] to-transparent border border-yellow/[0.1] p-3"
          >
            <div className="flex items-center gap-3">
              {/* Avatar with initials */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }}
                className="w-9 h-9 rounded-full bg-yellow/20 border border-yellow/30 flex items-center justify-center flex-shrink-0"
              >
                <span className="text-[10px] font-bold text-yellow">{activePromoter.initials}</span>
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-white/80">{activePromoter.name}</span>
                  <div className="px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/20">
                    <span className="text-[8px] font-medium text-emerald-400">On Shift</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <svg className="w-2.5 h-2.5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[9px] text-white/30">{activePromoter.store}</span>
                  <span className="text-[9px] text-white/15 ml-1">{activePromoter.shift}</span>
                </div>
              </div>
            </div>

            {/* Shift progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[8px] text-white/20">Shift progress</span>
                <span className="text-[8px] text-white/30">{activePromoter.hoursIn}h / {activePromoter.totalHours}h</span>
              </div>
              <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: `${progressPct}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.6, ease: 'easeOut' }}
                  className="h-full rounded-full bg-gradient-to-r from-yellow/60 to-yellow/40"
                />
              </div>
            </div>

            {/* Stats row */}
            <div className="flex gap-4 mt-2.5">
              <div>
                <span className="text-[8px] text-white/20 block">Units sold</span>
                <span className="text-[11px] font-semibold text-white/70">{activePromoter.unitsSold}</span>
              </div>
              <div>
                <span className="text-[8px] text-white/20 block">Revenue</span>
                <span className="text-[11px] font-semibold text-yellow/80">{activePromoter.revenue}</span>
              </div>
              <div className="ml-auto flex items-end">
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/[0.04]">
                  <svg className="w-2.5 h-2.5 text-emerald-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-[8px] text-white/25">GPS Verified</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feed header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="flex items-center justify-between"
          >
            <span className="text-[9px] font-medium text-white/30">Recent Activity</span>
            <span className="text-[8px] text-white/15">All stores</span>
          </motion.div>

          {/* Live notification feed */}
          <LiveFeed isInView={isInView} />
        </div>
      </div>
    </motion.div>
  )
}
