import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function StepBookIllustration() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })

  const dateCells = [
    { x: 10, y: 18, delay: 0 },
    { x: 10, y: 28, delay: 0.15 },
    { x: 10, y: 38, delay: 0.3 },
  ]

  return (
    <svg ref={ref} width="50" height="50" viewBox="0 0 50 50" fill="none">
      <defs>
        <filter id="step-book-glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Calendar outline */}
      <rect
        x={5}
        y={10}
        width={40}
        height={35}
        rx={4}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={1.5}
      />

      {/* Calendar pegs */}
      <line x1={17} y1={7} x2={17} y2={14} stroke="rgba(255,255,255,0.2)" strokeWidth={2} strokeLinecap="round" />
      <line x1={33} y1={7} x2={33} y2={14} stroke="rgba(255,255,255,0.2)" strokeWidth={2} strokeLinecap="round" />

      {/* Date cells — fan/rotate on trigger */}
      {dateCells.map((cell, i) => {
        const isHighlight = i === 1
        return (
          <motion.rect
            key={i}
            x={cell.x}
            y={cell.y}
            width={30}
            height={7}
            rx={2}
            fill={isHighlight ? 'rgba(249, 215, 2, 0.6)' : 'rgba(255,255,255,0.08)'}
            filter={isHighlight && isInView ? 'url(#step-book-glow)' : undefined}
            initial={{ rotateX: 45, opacity: 0 }}
            animate={
              isInView
                ? { rotateX: 0, opacity: 1 }
                : {}
            }
            transition={{
              duration: 0.5,
              delay: cell.delay,
              ease: 'easeOut',
            }}
            style={{ transformOrigin: `${cell.x + 15}px ${cell.y + 3.5}px` }}
          />
        )
      })}
    </svg>
  )
}
