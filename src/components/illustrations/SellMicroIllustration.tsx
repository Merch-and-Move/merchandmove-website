import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function SellMicroIllustration() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <svg ref={ref} width="60" height="60" viewBox="0 0 60 60" fill="none">
      {/* Promoter silhouette — circle head + rounded body */}
      <motion.g
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Head */}
        <circle cx={22} cy={28} r={6} fill="#3EB5E1" />
        {/* Body */}
        <path
          d="M14 42 C14 36 18 34 22 34 C26 34 30 36 30 42"
          fill="#3EB5E1"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Radial pulse ring — expands outward continuously */}
      <motion.circle
        cx={22}
        cy={34}
        r={12}
        fill="none"
        stroke="rgba(62, 181, 225, 0.4)"
        strokeWidth={1.5}
        initial={{ scale: 1, opacity: 0.4 }}
        animate={
          isInView
            ? {
                scale: 2,
                opacity: 0,
              }
            : {}
        }
        transition={{
          duration: 1.5,
          delay: 0.5,
          repeat: Infinity,
          repeatDelay: 1,
          ease: 'easeOut',
        }}
        style={{ transformOrigin: '22px 34px' }}
      />

      {/* Sparkle / star above the figure — draws in with pathLength */}
      <motion.path
        d="M42 10 L43.5 14.5 L48 16 L43.5 17.5 L42 22 L40.5 17.5 L36 16 L40.5 14.5 Z"
        stroke="#F9D702"
        strokeWidth={1}
        fill="rgba(249, 215, 2, 0.3)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
      />
    </svg>
  )
}
