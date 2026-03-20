import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function TrackMicroIllustration() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <svg ref={ref} width="60" height="60" viewBox="0 0 60 60" fill="none">
      <defs>
        {/* Glow filter for the last data point */}
        <filter id="track-endpoint-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Chart line — polyline trending upward, draws in via pathLength */}
      <motion.polyline
        points="6,46 16,38 26,42 38,28 50,14"
        stroke="#3EB5E1"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      />

      {/* Glowing last data point */}
      <motion.circle
        cx={50}
        cy={14}
        r={3}
        fill="#3EB5E1"
        filter="url(#track-endpoint-glow)"
        initial={{ opacity: 0, scale: 0 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.2 }}
        style={{ transformOrigin: '50px 14px' }}
      />

      {/* Upward arrow at the end — appears after line finishes */}
      <motion.g
        initial={{ opacity: 0, y: 4 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 1.4, ease: 'easeOut' }}
      >
        <path
          d="M50 10 L47 6 L50 2 L53 6 Z"
          fill="#3EB5E1"
          opacity={0.8}
        />
      </motion.g>
    </svg>
  )
}
