import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function BookMicroIllustration() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })

  const gridPositions = [
    { x: 8, y: 8 },
    { x: 24, y: 8 },
    { x: 40, y: 8 },
    { x: 8, y: 24 },
    { x: 24, y: 24 },
    { x: 40, y: 24 },
    { x: 8, y: 40 },
    { x: 24, y: 40 },
    { x: 40, y: 40 },
  ]

  // Indices of the 3 squares that highlight sequentially
  const highlightIndices = [1, 4, 7]

  return (
    <svg ref={ref} width="60" height="60" viewBox="0 0 60 60" fill="none">
      {/* Calendar grid — 3x3 rounded squares */}
      {gridPositions.map((pos, i) => {
        const isHighlighted = highlightIndices.includes(i)
        const highlightOrder = highlightIndices.indexOf(i)

        return (
          <motion.rect
            key={i}
            x={pos.x}
            y={pos.y}
            width={10}
            height={10}
            rx={2}
            fill={isHighlighted && isInView ? 'rgba(249, 215, 2, 0.6)' : 'rgba(255, 255, 255, 0.08)'}
            initial={{
              fill: 'rgba(255, 255, 255, 0.08)',
            }}
            animate={
              isInView && isHighlighted
                ? { fill: 'rgba(249, 215, 2, 0.6)' }
                : {}
            }
            transition={{
              duration: 0.3,
              delay: highlightOrder * 0.15,
            }}
          />
        )
      })}

      {/* Location pin — drops in below the calendar */}
      <motion.g
        initial={{ y: -8, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15,
          delay: 0.6,
        }}
      >
        <path
          d="M30 54 C30 54 26 50 26 48 C26 46.9 26.9 46 28 46 L32 46 C33.1 46 34 46.9 34 48 C34 50 30 54 30 54Z"
          fill="#F9D702"
        />
        <circle cx={30} cy={48} r={1.5} fill="rgba(0,0,0,0.3)" />
      </motion.g>
    </svg>
  )
}
