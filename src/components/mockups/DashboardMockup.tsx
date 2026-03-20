import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* ── Animated counter ─────────────────────────── */
function Counter({ target, prefix = '', suffix = '', decimals = 0, duration = 1200, delay = 0 }: {
  target: number; prefix?: string; suffix?: string; decimals?: number; duration?: number; delay?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => {
      let start = 0
      const step = target / (duration / 16)
      const interval = setInterval(() => {
        start += step
        if (start >= target) {
          setValue(target)
          clearInterval(interval)
        } else {
          setValue(start)
        }
      }, 16)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [isInView, target, duration, delay])

  return (
    <span ref={ref}>
      {prefix}{decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString()}{suffix}
    </span>
  )
}

/* ── SVG Area Chart ──────────────────────────── */
const chartData = [12400, 18200, 15800, 22100, 19500, 28300, 24600]
const chartDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function AreaChart({ animate }: { animate: boolean }) {
  const max = Math.max(...chartData) * 1.15
  const w = 280
  const h = 90
  const padding = { top: 8, bottom: 18, left: 0, right: 0 }
  const plotW = w - padding.left - padding.right
  const plotH = h - padding.top - padding.bottom

  const points = chartData.map((v, i) => ({
    x: padding.left + (i / (chartData.length - 1)) * plotW,
    y: padding.top + plotH - (v / max) * plotH,
  }))

  /* Smooth curve through points */
  const linePath = points.reduce((path, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`
    const prev = points[i - 1]
    const cpx = (prev.x + p.x) / 2
    return `${path} C ${cpx} ${prev.y}, ${cpx} ${p.y}, ${p.x} ${p.y}`
  }, '')

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${h - padding.bottom} L ${points[0].x} ${h - padding.bottom} Z`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(62, 181, 225, 0.25)" />
          <stop offset="100%" stopColor="rgba(62, 181, 225, 0.02)" />
        </linearGradient>
        <linearGradient id="chart-line-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3EB5E1" />
          <stop offset="100%" stopColor="#6BC5E8" />
        </linearGradient>
        <filter id="line-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((pct) => (
        <line
          key={pct}
          x1={0} x2={w}
          y1={padding.top + plotH * (1 - pct)}
          y2={padding.top + plotH * (1 - pct)}
          stroke="rgba(255,255,255,0.04)"
          strokeDasharray="3 3"
        />
      ))}

      {/* Area fill */}
      <motion.path
        d={areaPath}
        fill="url(#chart-fill)"
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />

      {/* Line */}
      <motion.path
        d={linePath}
        fill="none"
        stroke="url(#chart-line-grad)"
        strokeWidth={2}
        strokeLinecap="round"
        filter="url(#line-glow)"
        initial={{ pathLength: 0 }}
        animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
      />

      {/* Data points */}
      {points.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x} cy={p.y} r={3}
          fill="#050A14"
          stroke="#3EB5E1"
          strokeWidth={1.5}
          initial={{ scale: 0, opacity: 0 }}
          animate={animate ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
        />
      ))}

      {/* X-axis labels */}
      {chartDays.map((day, i) => (
        <motion.text
          key={day}
          x={points[i].x}
          y={h - 2}
          textAnchor="middle"
          fill="rgba(255,255,255,0.25)"
          fontSize={7}
          fontFamily="Inter, sans-serif"
          initial={{ opacity: 0 }}
          animate={animate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: 1.0 + i * 0.05 }}
        >
          {day}
        </motion.text>
      ))}
    </svg>
  )
}

/* ── Top Stores Table ────────────────────────── */
const topStores = [
  { name: 'Pick n Pay Sandton', units: 48, revenue: 'R8,420', highlight: true },
  { name: 'Checkers Rosebank', units: 35, revenue: 'R6,180' },
  { name: 'Spar Fourways', units: 29, revenue: 'R4,950' },
]

/* ── Main Component ──────────────────────────── */
export default function DashboardMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

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
      <div className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl bg-gradient-to-br from-sky/20 via-transparent to-indigo/10 pointer-events-none" />

      {/* Main card */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-sm overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
          </div>
          <span className="text-[10px] font-medium text-white/30">Sales Dashboard</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
            <svg className="w-2.5 h-2.5 text-white/25" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25" />
            </svg>
            <span className="text-[9px] text-white/25">Today, 20 Mar</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Metric cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {/* Revenue */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3"
            >
              <div className="text-[8px] text-white/25 uppercase tracking-wider mb-1">Revenue</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-semibold text-white tracking-tight">
                  <Counter target={47250} prefix="R" delay={400} />
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                <span className="text-[9px] font-medium text-emerald-400">12.4%</span>
              </div>
            </motion.div>

            {/* Units Sold */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3"
            >
              <div className="text-[8px] text-white/25 uppercase tracking-wider mb-1">Units Sold</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-semibold text-white tracking-tight">
                  <Counter target={342} delay={500} />
                </span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <svg className="w-2.5 h-2.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                <span className="text-[9px] font-medium text-emerald-400">8.2%</span>
              </div>
            </motion.div>

            {/* Active Shifts */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3"
            >
              <div className="text-[8px] text-white/25 uppercase tracking-wider mb-1">Active Shifts</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-base font-semibold text-white tracking-tight">
                  <Counter target={8} delay={600} />
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-[9px] text-white/25">across 6 stores</span>
              </div>
            </motion.div>
          </div>

          {/* Chart section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-lg bg-white/[0.02] border border-white/[0.05] p-3"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[9px] font-medium text-white/35">Weekly Revenue</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-sky" />
                  <span className="text-[8px] text-white/20">This week</span>
                </div>
              </div>
            </div>
            <AreaChart animate={isInView} />
          </motion.div>

          {/* Top Stores table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="rounded-lg bg-white/[0.02] border border-white/[0.05] overflow-hidden"
          >
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/[0.05]">
              <span className="text-[9px] font-medium text-white/35">Top Stores</span>
              <span className="text-[8px] text-sky/50">View all →</span>
            </div>
            <div>
              {topStores.map((store, i) => (
                <motion.div
                  key={store.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.1 + i * 0.1 }}
                  className={`flex items-center justify-between px-3 py-2 ${
                    i < topStores.length - 1 ? 'border-b border-white/[0.04]' : ''
                  } ${store.highlight ? 'bg-yellow/[0.03]' : ''}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-white/15 w-3">{i + 1}</span>
                    <span className="text-[10px] text-white/60">{store.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] text-white/30">{store.units} units</span>
                    <span className="text-[10px] font-medium text-white/70">{store.revenue}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
