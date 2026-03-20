import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

/* ── Animated Arc Ring ────────────────────────────────
   Configurable arc/ring with strokeDashoffset animation.
   Based on TeamRosterMockup's ProgressRing pattern.
   ──────────────────────────────────────────────────── */
export function AnimatedArcRing({
  progress,
  color,
  size = 80,
  strokeWidth = 3,
  arc = 360,
  delay = 0.3,
}: {
  progress: number
  color: 'sky' | 'yellow'
  size?: number
  strokeWidth?: number
  arc?: number
  delay?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const arcLength = (arc / 360) * circumference
  const offset = arcLength - (progress / 100) * arcLength

  const strokeColor = color === 'yellow'
    ? 'rgba(249, 215, 2, 0.5)'
    : 'rgba(62, 181, 225, 0.5)'
  const bgColor = color === 'yellow'
    ? 'rgba(249, 215, 2, 0.06)'
    : 'rgba(62, 181, 225, 0.06)'
  const glowColor = color === 'yellow'
    ? 'rgba(249, 215, 2, 0.15)'
    : 'rgba(62, 181, 225, 0.15)'

  const rotation = arc === 360 ? -90 : -(arc / 2) - 90

  return (
    <svg width={size} height={size} className="flex-shrink-0" style={{ transform: `rotate(${rotation}deg)` }}>
      <defs>
        <filter id={`arc-glow-${color}-${size}`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Background arc */}
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={bgColor} strokeWidth={strokeWidth}
        strokeDasharray={`${arcLength} ${circumference}`}
        strokeLinecap="round"
      />
      {/* Animated fill arc */}
      <motion.circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={strokeColor} strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${arcLength} ${circumference}`}
        filter={`url(#arc-glow-${color}-${size})`}
        initial={{ strokeDashoffset: arcLength }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeOut', delay }}
      />
      {/* Glow overlay */}
      <circle
        cx={size / 2} cy={size / 2} r={radius - 4}
        fill={glowColor} opacity={0}
      />
    </svg>
  )
}

/* ── Glass Card ──────────────────────────────────────
   Animated gradient border + glassmorphism wrapper.
   Border rotates via CSS keyframe on hover.
   ──────────────────────────────────────────────────── */
export function GlassCard({
  children,
  className = '',
  hoverGlow = true,
}: {
  children: React.ReactNode
  className?: string
  hoverGlow?: boolean
}) {
  return (
    <div className={`relative group ${className}`}>
      {/* Animated gradient border — visible on hover */}
      {hoverGlow && (
        <div className="absolute -inset-[1px] rounded-2xl border-rotate-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[0.5px]" />
      )}
      {/* Card content with solid background */}
      <div className="relative rounded-2xl glass-card overflow-hidden h-full">
        {children}
      </div>
    </div>
  )
}

/* ── Animated Checkmark ──────────────────────────────
   SVG checkmark that draws itself using pathLength.
   ──────────────────────────────────────────────────── */
export function AnimatedCheckmark({
  delay = 0,
  color = 'sky',
  size = 16,
}: {
  delay?: number
  color?: 'sky' | 'yellow' | 'emerald'
  size?: number
}) {
  const strokeColor = color === 'yellow'
    ? '#F9D702'
    : color === 'emerald'
    ? '#34D399'
    : '#3EB5E1'

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
      <motion.path
        d="M4.5 12.75l6 6 9-13.5"
        stroke={strokeColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      />
    </svg>
  )
}

/* ── Floating Shapes ─────────────────────────────────
   Subtle geometric SVG shapes with CSS float animation.
   Positioned absolute — place inside a relative parent.
   ──────────────────────────────────────────────────── */
const shapes = [
  { type: 'triangle', x: '8%', y: '15%', size: 20, color: 'yellow', duration: 18, delay: 0 },
  { type: 'circle', x: '85%', y: '25%', size: 14, color: 'sky', duration: 22, delay: -5 },
  { type: 'hexagon', x: '75%', y: '75%', size: 18, color: 'yellow', duration: 25, delay: -10 },
  { type: 'square', x: '12%', y: '80%', size: 12, color: 'sky', duration: 20, delay: -8 },
]

function ShapeIcon({ type, size, color }: { type: string; size: number; color: string }) {
  const fill = color === 'yellow' ? 'rgba(249, 215, 2, 0.08)' : 'rgba(62, 181, 225, 0.08)'
  const stroke = color === 'yellow' ? 'rgba(249, 215, 2, 0.12)' : 'rgba(62, 181, 225, 0.12)'

  if (type === 'triangle') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <polygon points="12,2 22,22 2,22" fill={fill} stroke={stroke} strokeWidth={1} />
      </svg>
    )
  }
  if (type === 'circle') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <circle cx={12} cy={12} r={10} fill={fill} stroke={stroke} strokeWidth={1} />
      </svg>
    )
  }
  if (type === 'hexagon') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24">
        <polygon points="12,1 22,6.5 22,17.5 12,23 2,17.5 2,6.5" fill={fill} stroke={stroke} strokeWidth={1} />
      </svg>
    )
  }
  /* square */
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <rect x={3} y={3} width={18} height={18} rx={2} fill={fill} stroke={stroke} strokeWidth={1} />
    </svg>
  )
}

export function FloatingShapes({ className = '' }: { className?: string }) {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {shapes.map((shape) => (
        <div
          key={`${shape.type}-${shape.x}`}
          className="absolute float-shape hidden sm:block"
          style={{
            left: shape.x,
            top: shape.y,
            animationDuration: `${shape.duration}s`,
            animationDelay: `${shape.delay}s`,
          }}
        >
          <ShapeIcon type={shape.type} size={shape.size} color={shape.color} />
        </div>
      ))}
    </div>
  )
}

/* ── Enhanced Animated Counter with burst glow ────── */
export function BurstCounter({
  target,
  suffix = '',
  delay = 0,
  color = 'sky',
}: {
  target: number
  suffix?: string
  delay?: number
  color?: 'sky' | 'yellow'
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const [showBurst, setShowBurst] = useState(false)

  useEffect(() => {
    if (!isInView) return
    const timer = setTimeout(() => {
      let start = 0
      const duration = 1500
      const step = target / (duration / 16)
      const interval = setInterval(() => {
        start += step
        if (start >= target) {
          setCount(target)
          clearInterval(interval)
          setShowBurst(true)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(interval)
    }, delay)
    return () => clearTimeout(timer)
  }, [isInView, target, delay])

  return (
    <div ref={ref} className="relative inline-block">
      {showBurst && (
        <div className={`absolute -inset-4 rounded-full ${
          color === 'yellow' ? 'glow-burst-yellow' : 'glow-burst-sky'
        }`} />
      )}
      <span className="relative">{count.toLocaleString()}{suffix}</span>
    </div>
  )
}
