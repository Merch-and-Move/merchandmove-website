import { motion } from 'framer-motion'
import ShelfToSaleIllustration from './illustrations/ShelfToSaleIllustration'

/* ── Small SVG icon accents for Book / Sell / Track ── */
function BookIcon({ delay }: { delay: number }) {
  return (
    <motion.svg
      width={18} height={18} viewBox="0 0 24 24" fill="none"
      className="inline-block mr-1.5 -mt-0.5"
    >
      {/* Calendar outline */}
      <motion.rect
        x={3} y={4} width={18} height={18} rx={2}
        stroke="rgba(249, 215, 2, 0.6)"
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      />
      {/* Top pegs */}
      <motion.line
        x1={8} y1={2} x2={8} y2={6}
        stroke="rgba(249, 215, 2, 0.6)"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.2, ease: 'easeOut' }}
      />
      <motion.line
        x1={16} y1={2} x2={16} y2={6}
        stroke="rgba(249, 215, 2, 0.6)"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.2, ease: 'easeOut' }}
      />
      {/* Horizontal divider */}
      <motion.line
        x1={3} y1={10} x2={21} y2={10}
        stroke="rgba(249, 215, 2, 0.4)"
        strokeWidth={1}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.3, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}

function SellIcon({ delay }: { delay: number }) {
  return (
    <motion.svg
      width={18} height={18} viewBox="0 0 24 24" fill="none"
      className="inline-block mr-1.5 -mt-0.5"
    >
      {/* Head */}
      <motion.circle
        cx={12} cy={7} r={4}
        stroke="rgba(62, 181, 225, 0.6)"
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      />
      {/* Body arc */}
      <motion.path
        d="M5.5 21c0-3.59 2.91-6.5 6.5-6.5s6.5 2.91 6.5 6.5"
        stroke="rgba(62, 181, 225, 0.6)"
        strokeWidth={1.5}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}

function TrackIcon({ delay }: { delay: number }) {
  return (
    <motion.svg
      width={18} height={18} viewBox="0 0 24 24" fill="none"
      className="inline-block mr-1.5 -mt-0.5"
    >
      {/* Rising chart line */}
      <motion.path
        d="M3 20L9 14L13 17L21 6"
        stroke="rgba(62, 181, 225, 0.6)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      />
      {/* Arrow head */}
      <motion.path
        d="M17 6H21V10"
        stroke="rgba(62, 181, 225, 0.6)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: delay + 0.4, ease: 'easeOut' }}
      />
    </motion.svg>
  )
}

const iconComponents: Record<string, React.FC<{ delay: number }>> = {
  Book: BookIcon,
  Sell: SellIcon,
  Track: TrackIcon,
}

export default function TaglineSection() {
  return (
    <section id="about" className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-sky w-[500px] h-[500px] top-0 right-0 opacity-25" />
      <div className="mesh-orb mesh-orb-yellow w-[400px] h-[400px] bottom-0 left-0 opacity-15" />

      {/* Grid lines */}
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-[11px] font-semibold tracking-[0.25em] uppercase text-sky mb-8"
        >
          Why Merch & Move
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-8 leading-[1.0]"
        >
          We Don't Just Fill Shelves.{' '}
          <span className="italic text-gradient-sky">We Move Product</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-base sm:text-lg text-white/55 leading-[1.8] mb-10 max-w-3xl mx-auto"
        >
          Most merchandising companies place products on shelves and walk away.
          We place a trained promoter next to your product who <span className="text-white font-medium">actively sells it to shoppers</span> —
          answering questions, recommending products, and driving conversions at the point of sale.
        </motion.p>

        <div className="my-14">
          <ShelfToSaleIllustration />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: 'Book', label: 'Schedule shifts & assign products', accent: 'yellow' },
            { value: 'Sell', label: 'Our promoters actively sell in-store', accent: 'sky' },
            { value: 'Track', label: 'See real-time sales results & ROI', accent: 'sky' },
          ].map((item, i) => {
            const IconComponent = iconComponents[item.value]
            return (
              <motion.div
                key={item.value}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <span className={`font-display text-3xl italic ${
                  item.accent === 'yellow' ? 'text-gradient-yellow' : 'text-gradient-sky'
                }`}>
                  {IconComponent && <IconComponent delay={0.5 + i * 0.15} />}
                  {item.value}
                </span>
                <p className="text-xs text-white/40 mt-2">{item.label}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
