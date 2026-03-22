import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function StepExecuteMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <div ref={ref} className="relative">
      {/* Ambient glow */}
      <div className="absolute -inset-3 bg-sky/[0.04] rounded-2xl blur-xl" />

      <div className="relative bg-[#0a0a0f]/90 border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-sm">
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.04]">
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
          <span className="ml-2 text-[8px] text-white/20 font-medium tracking-wide">Active Shift</span>
          {/* Live indicator */}
          <div className="ml-auto flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <motion.div
              className="w-1 h-1 rounded-full bg-emerald-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[6px] font-bold text-emerald-400 tracking-wider">LIVE</span>
          </div>
        </div>

        <div className="p-3" style={{ minHeight: 130 }}>
          {/* Promoter card */}
          <motion.div
            className="flex items-center gap-2.5 mb-3"
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Avatar with GPS ring */}
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-sky/20 border border-sky/30 flex items-center justify-center">
                <span className="text-[8px] font-bold text-sky">SM</span>
              </div>
              {/* GPS pulse */}
              <motion.div
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : undefined}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-emerald-400/30"
                  animate={{ scale: [1, 2, 2], opacity: [0.4, 0.1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute inset-[3px] rounded-full bg-emerald-400" />
              </motion.div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[9px] font-semibold text-white/80">Sarah Mokoena</div>
              <div className="text-[7px] text-white/30">Pick n Pay · Sandton</div>
            </div>
          </motion.div>

          {/* Shift progress */}
          <motion.div
            className="mb-3"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : undefined}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[7px] text-white/25">Shift Progress</span>
              <span className="text-[7px] text-white/40 font-medium">4.5h / 8h</span>
            </div>
            <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-sky/60 to-sky rounded-full"
                initial={{ width: 0 }}
                animate={inView ? { width: '56%' } : undefined}
                transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
              />
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-2 gap-2"
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4, delay: 1.0 }}
          >
            <div className="bg-white/[0.03] rounded-lg px-2 py-1.5 text-center">
              <div className="text-[11px] font-bold text-white/80">14</div>
              <div className="text-[6px] text-white/25 uppercase tracking-wider">Units Sold</div>
            </div>
            <div className="bg-white/[0.03] rounded-lg px-2 py-1.5 text-center">
              <div className="text-[11px] font-bold text-sky">R2,840</div>
              <div className="text-[6px] text-white/25 uppercase tracking-wider">Revenue</div>
            </div>
          </motion.div>

          {/* GPS verified badge */}
          <motion.div
            className="mt-2 flex items-center justify-center gap-1 py-1 rounded-md bg-emerald-500/[0.06] border border-emerald-500/10"
            initial={{ opacity: 0, y: 4 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 1.3 }}
          >
            <svg className="w-2 h-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-[6px] font-semibold text-emerald-400 tracking-wider">GPS VERIFIED</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
