import { motion } from 'framer-motion'

const colorMap = {
  yellow: 'rgba(249, 215, 2, 0.3)',
  sky: 'rgba(62, 181, 225, 0.3)',
}

export default function AnimatedConnector({
  fromColor,
  toColor,
}: {
  fromColor: 'yellow' | 'sky'
  toColor: 'yellow' | 'sky'
}) {
  const gradientId = `connector-gradient-${fromColor}-${toColor}`

  return (
    <svg width={2} height={24} viewBox="0 0 2 24" fill="none">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorMap[fromColor]} />
          <stop offset="100%" stopColor={colorMap[toColor]} />
        </linearGradient>
      </defs>
      <motion.line
        x1={1}
        y1={0}
        x2={1}
        y2={24}
        stroke={`url(#${gradientId})`}
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </svg>
  )
}
