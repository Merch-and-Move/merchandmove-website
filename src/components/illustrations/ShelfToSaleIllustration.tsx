import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ShelfToSaleIllustration() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="w-full max-w-md mx-auto">
      <svg viewBox="0 0 320 130" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* ── Shelf line ── */}
        <motion.line
          x1="20" y1="95" x2="200" y2="95"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth={2}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5 }}
        />

        {/* ── Products on shelf (3 silhouettes) ── */}
        {/* Product 1 — tall bottle */}
        <motion.rect
          x={40} y={55} width={16} height={40} rx={4}
          fill="rgba(255,255,255,0.12)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={0.5}
          initial={{ opacity: 0, y: -8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0 }}
        />
        {/* Product 2 — medium box */}
        <motion.rect
          x={64} y={65} width={18} height={30} rx={3}
          fill="rgba(255,255,255,0.10)"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={0.5}
          initial={{ opacity: 0, y: -8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        {/* Product 3 — short wide box */}
        <motion.rect
          x={90} y={72} width={20} height={23} rx={3}
          fill="rgba(255,255,255,0.14)"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={0.5}
          initial={{ opacity: 0, y: -8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* ── Promoter figure (yellow, left side) ── */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Head */}
          <circle cx={140} cy={60} r={6} fill="rgba(249, 215, 2, 0.5)" />
          {/* Body trapezoid */}
          <path
            d="M134,70 L146,70 L148,92 L132,92 Z"
            fill="rgba(249, 215, 2, 0.35)"
          />
        </motion.g>

        {/* ── Shopper figure (sky, right side) ── */}
        <motion.g
          initial={{ opacity: 0, x: 10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {/* Head */}
          <circle cx={180} cy={60} r={6} fill="rgba(62, 181, 225, 0.5)" />
          {/* Body trapezoid */}
          <path
            d="M174,70 L186,70 L188,92 L172,92 Z"
            fill="rgba(62, 181, 225, 0.35)"
          />
        </motion.g>

        {/* ── Conversation dots between promoter and shopper ── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.8 }}
        >
          <circle cx={155} cy={64} r={1.5} fill="rgba(255,255,255,0.35)" className="pulse-dot" />
          <circle cx={160} cy={60} r={1.5} fill="rgba(255,255,255,0.25)" className="pulse-dot" style={{ animationDelay: '0.3s' }} />
          <circle cx={165} cy={64} r={1.5} fill="rgba(255,255,255,0.35)" className="pulse-dot" style={{ animationDelay: '0.6s' }} />
        </motion.g>

        {/* ── Cart outline (right side) ── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 1.0 }}
        >
          {/* Cart body — 3 lines */}
          <line x1="260" y1="68" x2="260" y2="92" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} strokeLinecap="round" />
          <line x1="260" y1="92" x2="295" y2="92" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} strokeLinecap="round" />
          <line x1="295" y1="72" x2="295" y2="92" stroke="rgba(255,255,255,0.15)" strokeWidth={1.5} strokeLinecap="round" />
          {/* Cart handle */}
          <line x1="255" y1="68" x2="260" y2="68" stroke="rgba(255,255,255,0.10)" strokeWidth={1.5} strokeLinecap="round" />
          {/* Wheels */}
          <circle cx={268} cy={96} r={2.5} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
          <circle cx={288} cy={96} r={2.5} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
        </motion.g>

        {/* ── Product moving from shelf to cart ── */}
        <motion.g
          initial={{ x: 0, opacity: 1 }}
          animate={isInView ? { x: 180, opacity: 1 } : {}}
          transition={{ duration: 1.0, delay: 1.2, ease: 'easeInOut' }}
        >
          <motion.rect
            x={90} y={72} width={20} height={23} rx={3}
            fill="rgba(62, 181, 225, 0.25)"
            stroke="rgba(62, 181, 225, 0.3)"
            strokeWidth={0.5}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 1.2 }}
          />
        </motion.g>

        {/* ── Trail line from shelf to cart ── */}
        <motion.line
          x1="110" y1="83" x2="270" y2="83"
          stroke="rgba(62, 181, 225, 0.12)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeDasharray="4 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
          transition={{ duration: 1.0, delay: 1.2, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  )
}
