import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function StepPayIllustration() {
  const ref = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true })

  const radius = 19
  const circumference = 2 * Math.PI * radius
  const targetOffset = circumference * (1 - 0.85) // 85% fill

  return (
    <svg ref={ref} width="50" height="50" viewBox="0 0 50 50" fill="none">
      {/* Background ring */}
      <circle
        cx={25}
        cy={25}
        r={radius}
        fill="none"
        stroke="rgba(249, 215, 2, 0.08)"
        strokeWidth={3}
      />

      {/* Animated progress ring — fills to ~85% */}
      <motion.circle
        cx={25}
        cy={25}
        r={radius}
        fill="none"
        stroke="rgba(249, 215, 2, 0.5)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={isInView ? { strokeDashoffset: targetOffset } : {}}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: '25px 25px' }}
      />

      {/* Bold "R" character */}
      <motion.text
        x={25}
        y={26}
        textAnchor="middle"
        dominantBaseline="central"
        fill="rgba(249, 215, 2, 0.7)"
        fontSize={16}
        fontWeight={700}
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{ transformOrigin: '25px 26px' }}
      >
        R
      </motion.text>

      {/* Checkmark below the R — draws after ring completes */}
      <motion.path
        d="M20 42 L23 45 L30 38"
        stroke="rgba(249, 215, 2, 0.5)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.4,
          delay: 1.4,
          ease: 'easeOut',
        }}
      />
    </svg>
  )
}
