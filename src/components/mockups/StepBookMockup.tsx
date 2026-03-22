import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const WEEKS = [
  [10, 11, 12, 13, 14, 15, 16],
  [17, 18, 19, 20, 21, 22, 23],
  [24, 25, 26, 27, 28, 29, 30],
]
const BOOKED = 19 // Thursday in week 2

export default function StepBookMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-3 bg-yellow/[0.04] rounded-2xl blur-xl" />

      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="ml-2 text-[8px] text-white/20 font-medium tracking-wide">Schedule</span>
        </div>

        <div className="p-3 relative overflow-hidden" style={{ minHeight: 130 }}>
          {/* Month header */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[9px] font-semibold text-white/40">March 2026</span>
            <div className="flex gap-0.5">
              <div className="w-3.5 h-3.5 rounded bg-white/[0.04] flex items-center justify-center">
                <span className="text-[8px] text-white/20">‹</span>
              </div>
              <div className="w-3.5 h-3.5 rounded bg-white/[0.04] flex items-center justify-center">
                <span className="text-[8px] text-white/20">›</span>
              </div>
            </div>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-[3px] mb-0.5">
            {DAYS.map((d, i) => (
              <div key={i} className="text-[7px] text-white/15 text-center font-medium py-0.5">{d}</div>
            ))}
          </div>

          {/* Date grid */}
          {WEEKS.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-[3px]">
              {week.map((date) => {
                const isTarget = date === BOOKED
                return (
                  <motion.div
                    key={date}
                    className="text-[8px] text-center py-[3px] rounded-sm relative"
                    animate={isTarget && inView ? {
                      backgroundColor: 'rgba(249, 215, 2, 0.22)',
                    } : {
                      backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    }}
                    transition={isTarget ? { duration: 0.25, delay: 1.7 } : { duration: 0 }}
                  >
                    <motion.span
                      className="relative z-10"
                      animate={isTarget && inView ? {
                        color: 'rgba(249, 215, 2, 1)',
                      } : {
                        color: 'rgba(255, 255, 255, 0.25)',
                      }}
                      transition={isTarget ? { duration: 0.25, delay: 1.7 } : { duration: 0 }}
                      style={isTarget ? { fontWeight: 600 } : {}}
                    >
                      {date}
                    </motion.span>
                  </motion.div>
                )
              })}
            </div>
          ))}

          {/* Animated cursor */}
          <motion.div
            className="absolute pointer-events-none z-20"
            initial={{ opacity: 0, left: '78%', top: '75%' }}
            animate={inView ? {
              opacity: [0, 1, 1, 1, 1, 0],
              left: ['78%', '78%', '40%', '40%', '40%', '40%'],
              top: ['75%', '75%', '52%', '52%', '48%', '48%'],
            } : undefined}
            transition={{
              duration: 2.8,
              delay: 0.4,
              times: [0, 0.12, 0.5, 0.62, 0.65, 0.85],
              ease: 'easeInOut',
            }}
          >
            <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
              <path d="M1 1L1 12L4 9L7 15L9 14L6 8L10 8L1 1Z" fill="white" fillOpacity={0.85} stroke="rgba(0,0,0,0.3)" strokeWidth={0.5} />
            </svg>
          </motion.div>

          {/* Click ripple on target cell */}
          <motion.div
            className="absolute w-6 h-6 rounded-full pointer-events-none z-10"
            style={{ left: '40%', top: '48%', transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: [0, 0.4, 0], scale: [0, 1.8, 2.5] } : undefined}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <div className="w-full h-full rounded-full bg-yellow/30" />
          </motion.div>

          {/* "Booked" badge */}
          <motion.div
            className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-[3px] rounded-full bg-yellow/15 border border-yellow/25"
            initial={{ opacity: 0, scale: 0.5, y: 4 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : undefined}
            transition={{ type: 'spring', stiffness: 400, damping: 22, delay: 2.1 }}
          >
            <svg className="w-2 h-2 text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-[7px] font-bold text-yellow tracking-wide">Booked</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
