import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function StepTrackIllustration() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })

  // 5 data points trending upward
  const points = [
    { x: 6, y: 38 },
    { x: 16, y: 30 },
    { x: 26, y: 34 },
    { x: 36, y: 20 },
    { x: 46, y: 12 },
  ]

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ')

  // Area fill polygon (line + bottom edge)
  const areaPoints = `${polylinePoints} 46,44 6,44`

  return (
    <svg ref={ref} width="50" height="50" viewBox="0 0 50 50" fill="none">
      <defs>
        <filter id="step-track-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Gradient area fill — fades in after line draws */}
      <motion.polygon
        points={areaPoints}
        fill="rgba(62, 181, 225, 0.1)"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.15 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
      />

      {/* Chart line — draws left to right */}
      <motion.polyline
        points={polylinePoints}
        stroke="#3EB5E1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 1, ease: 'easeOut' }}
      />

      {/* Data point circles — appear sequentially */}
      {points.map((point, i) => {
        const isLast = i === points.length - 1
        return (
          <motion.circle
            key={i}
            cx={point.x}
            cy={point.y}
            r={isLast ? 3.5 : 2.5}
            fill="#3EB5E1"
            filter={isLast ? 'url(#step-track-glow)' : undefined}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
              delay: 0.3 + i * 0.15,
            }}
            style={{ transformOrigin: `${point.x}px ${point.y}px` }}
          />
        )
      })}
    </svg>
  )
}
