import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* ── Animated counter ───────────────────────── */
function Counter({ target, prefix = '', delay = 0 }: { target: number; prefix?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => {
      let n = 0
      const step = target / (800 / 16)
      const iv = setInterval(() => {
        n += step
        if (n >= target) { setVal(target); clearInterval(iv) }
        else setVal(Math.floor(n))
      }, 16)
      return () => clearInterval(iv)
    }, delay * 1000)
    return () => clearTimeout(t)
  }, [inView, target, delay])

  return <span ref={ref}>{prefix}{val.toLocaleString()}</span>
}

/* ── SVG mini chart ──────────────────────────── */
const data = [2800, 4200, 3600, 5100, 4500, 6800, 5900]
const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const W = 200, H = 60, PAD = 4

function buildPath() {
  const maxVal = Math.max(...data)
  const pts = data.map((v, i) => ({
    x: PAD + (i / (data.length - 1)) * (W - PAD * 2),
    y: PAD + (1 - v / maxVal) * (H - PAD * 2),
  }))

  // Smooth cubic bezier through points
  let d = `M${pts[0].x},${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1]
    const curr = pts[i]
    const cpx1 = prev.x + (curr.x - prev.x) * 0.4
    const cpx2 = curr.x - (curr.x - prev.x) * 0.4
    d += ` C${cpx1},${prev.y} ${cpx2},${curr.y} ${curr.x},${curr.y}`
  }

  // Area path (close to bottom)
  const area = d + ` L${pts[pts.length - 1].x},${H} L${pts[0].x},${H} Z`
  return { line: d, area, lastPt: pts[pts.length - 1] }
}

const { line, area, lastPt } = buildPath()

export default function StepTrackMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-3 bg-sky/[0.04] rounded-2xl blur-xl" />

      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="ml-2 text-[8px] text-white/20 font-medium tracking-wide">Analytics</span>
        </div>

        <div className="p-3" style={{ minHeight: 130 }}>
          {/* Stat header */}
          <motion.div
            className="flex items-end justify-between mb-2"
            initial={{ opacity: 0, y: 6 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div>
              <div className="text-[7px] text-white/25 uppercase tracking-wider mb-0.5">Weekly Revenue</div>
              <div className="text-[14px] font-bold text-white/90">
                <Counter target={33800} prefix="R" delay={0.5} />
              </div>
            </div>
            <motion.div
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/15"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ delay: 1.5, type: 'spring', stiffness: 300 }}
            >
              <svg className="w-2 h-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
              <span className="text-[7px] font-bold text-emerald-400">+18%</span>
            </motion.div>
          </motion.div>

          {/* SVG chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ delay: 0.5 }}
          >
            <svg width="100%" viewBox={`0 0 ${W} ${H + 14}`} className="overflow-visible">
              <defs>
                <linearGradient id="step-chart-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(62, 181, 225, 0.2)" />
                  <stop offset="100%" stopColor="rgba(62, 181, 225, 0)" />
                </linearGradient>
                <filter id="step-chart-glow">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>

              {/* Area fill */}
              <motion.path
                d={area}
                fill="url(#step-chart-fill)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ duration: 0.8, delay: 1.0 }}
              />

              {/* Glow line */}
              <motion.path
                d={line}
                fill="none"
                stroke="rgba(62, 181, 225, 0.3)"
                strokeWidth={4}
                filter="url(#step-chart-glow)"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : undefined}
                transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
              />

              {/* Main line */}
              <motion.path
                d={line}
                fill="none"
                stroke="rgba(62, 181, 225, 0.7)"
                strokeWidth={1.5}
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : undefined}
                transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
              />

              {/* End dot */}
              <motion.circle
                cx={lastPt.x}
                cy={lastPt.y}
                r={2.5}
                fill="rgba(62, 181, 225, 0.9)"
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : undefined}
                transition={{ delay: 1.9, type: 'spring', stiffness: 300 }}
              />
              <motion.circle
                cx={lastPt.x}
                cy={lastPt.y}
                r={5}
                fill="none"
                stroke="rgba(62, 181, 225, 0.3)"
                strokeWidth={1}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: [0, 0.6, 0], scale: [0.8, 1.5, 2] } : undefined}
                transition={{ delay: 2.0, duration: 1.5, repeat: Infinity }}
              />

              {/* X-axis labels */}
              {labels.map((l, i) => (
                <text
                  key={l}
                  x={PAD + (i / (labels.length - 1)) * (W - PAD * 2)}
                  y={H + 10}
                  textAnchor="middle"
                  className="text-[6px] fill-white/15"
                >
                  {l}
                </text>
              ))}
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
