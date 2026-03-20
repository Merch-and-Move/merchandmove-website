import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

// Simplified South Africa outline path
const SA_PATH = "M 180 20 C 200 15, 220 18, 240 25 C 260 32, 275 45, 285 65 C 295 85, 298 105, 295 125 C 292 145, 282 160, 270 175 C 258 190, 248 198, 235 210 C 222 222, 208 228, 195 230 C 182 232, 168 230, 155 225 C 142 220, 128 212, 115 200 C 102 188, 90 175, 80 160 C 70 145, 62 132, 55 118 C 48 104, 44 90, 42 78 C 40 66, 42 52, 50 42 C 58 32, 70 25, 85 22 C 100 19, 115 20, 130 22 C 145 24, 160 25, 180 20 Z"

// Major retail city locations (approximate positions on the SVG)
const cities = [
  { name: 'Johannesburg', x: 200, y: 80, delay: 0 },
  { name: 'Pretoria', x: 210, y: 65, delay: 0.3 },
  { name: 'Cape Town', x: 85, y: 210, delay: 0.6 },
  { name: 'Durban', x: 265, y: 150, delay: 0.9 },
  { name: 'Port Elizabeth', x: 180, y: 210, delay: 1.2 },
  { name: 'Bloemfontein', x: 170, y: 140, delay: 1.5 },
  { name: 'East London', x: 215, y: 195, delay: 1.8 },
  { name: 'Nelspruit', x: 240, y: 60, delay: 2.1 },
  { name: 'Polokwane', x: 210, y: 40, delay: 2.4 },
]

export default function SAMapSilhouette() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 hidden md:flex"
    >
      <svg viewBox="0 0 340 250" className="w-[500px] h-auto">
        {/* SA outline — draws in via pathLength */}
        <motion.path
          d={SA_PATH}
          fill="rgba(255,255,255,0.015)"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        {/* City dots */}
        {cities.map((city, i) => (
          <motion.circle
            key={city.name}
            cx={city.x}
            cy={city.y}
            r="3"
            fill={i % 2 === 0 ? 'rgba(249, 215, 2, 0.4)' : 'rgba(62, 181, 225, 0.4)'}
            className="dot-pulse-map"
            style={{ animationDelay: `${city.delay}s` }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 1.5 + i * 0.15 }}
          />
        ))}
      </svg>
    </div>
  )
}
