import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function StepExecuteIllustration() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <svg ref={ref} width="50" height="50" viewBox="0 0 50 50" fill="none">
      {/* Ripple circle — expands on landing */}
      <motion.circle
        cx={25}
        cy={32}
        r={6}
        fill="none"
        stroke="rgba(62, 181, 225, 0.3)"
        strokeWidth={1.5}
        initial={{ scale: 1, opacity: 0.4 }}
        animate={
          isInView
            ? {
                scale: 2.5,
                opacity: 0,
              }
            : {}
        }
        transition={{
          duration: 1.5,
          delay: 0.4,
          repeat: Infinity,
          repeatDelay: 1.5,
          ease: 'easeOut',
        }}
        style={{ transformOrigin: '25px 32px' }}
      />

      {/* GPS pin — teardrop shape */}
      <motion.g
        initial={{ y: -12, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 12,
          delay: 0.1,
        }}
      >
        <path
          d="M25 40 C25 40 16 28 16 22 C16 17.03 20.03 13 25 13 C29.97 13 34 17.03 34 22 C34 28 25 40 25 40Z"
          fill="rgba(62, 181, 225, 0.6)"
        />
        <circle cx={25} cy={22} r={4} fill="rgba(255,255,255,0.15)" />
      </motion.g>

      {/* Checkmark inside pin — draws after delay */}
      <motion.path
        d="M22 22 L24.5 24.5 L28 20"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.4,
          delay: 0.8,
          ease: 'easeOut',
        }}
      />
    </svg>
  )
}
