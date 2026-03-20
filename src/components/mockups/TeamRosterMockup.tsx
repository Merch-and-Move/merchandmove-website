import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/* ── Team member data ────────────────────────── */
const teamMembers = [
  {
    initials: 'SM', name: 'Sarah M.', store: 'Pick n Pay Sandton',
    status: 'active' as const, progress: 56, sales: 14, color: 'yellow',
  },
  {
    initials: 'JK', name: 'James K.', store: 'Checkers Rosebank',
    status: 'active' as const, progress: 38, sales: 9, color: 'sky',
  },
  {
    initials: 'TN', name: 'Thandi N.', store: 'Spar Fourways',
    status: 'active' as const, progress: 72, sales: 21, color: 'yellow',
  },
  {
    initials: 'DM', name: 'David M.', store: 'Woolworths Melrose',
    status: 'active' as const, progress: 25, sales: 5, color: 'sky',
  },
  {
    initials: 'LV', name: 'Lerato V.', store: 'Makro Woodmead',
    status: 'break' as const, progress: 50, sales: 11, color: 'yellow',
  },
  {
    initials: 'NP', name: 'Nkosi P.', store: 'Game Gateway',
    status: 'active' as const, progress: 63, sales: 17, color: 'sky',
  },
]

const statusConfig = {
  active: { label: 'On Shift', bg: 'bg-emerald-500/15', border: 'border-emerald-500/20', text: 'text-emerald-400', dot: 'bg-emerald-400' },
  break: { label: 'Break', bg: 'bg-amber-500/15', border: 'border-amber-500/20', text: 'text-amber-400', dot: 'bg-amber-400' },
}

/* ── Circular progress ring ──────────────────── */
function ProgressRing({ progress, color, size = 34 }: { progress: number; color: string; size?: number }) {
  const strokeWidth = 2.5
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference
  const strokeColor = color === 'yellow' ? 'rgba(249, 215, 2, 0.6)' : 'rgba(62, 181, 225, 0.6)'
  const bgColor = color === 'yellow' ? 'rgba(249, 215, 2, 0.08)' : 'rgba(62, 181, 225, 0.08)'

  return (
    <svg width={size} height={size} className="flex-shrink-0 -rotate-90">
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={bgColor} strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke={strokeColor} strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
      />
    </svg>
  )
}

/* ── Team member card ────────────────────────── */
function TeamCard({ member, index, isInView }: {
  member: typeof teamMembers[0]; index: number; isInView: boolean
}) {
  const status = statusConfig[member.status]
  const avatarBg = member.color === 'yellow' ? 'bg-yellow/15 border-yellow/25' : 'bg-sky/15 border-sky/25'
  const avatarText = member.color === 'yellow' ? 'text-yellow' : 'text-sky'

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.5,
        delay: 0.4 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="rounded-lg bg-white/[0.025] border border-white/[0.06] p-2.5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 group"
    >
      <div className="flex items-center gap-2.5">
        {/* Avatar with progress ring */}
        <div className="relative">
          <ProgressRing progress={member.progress} color={member.color} />
          <div className={`absolute inset-0 m-[5px] rounded-full ${avatarBg} border flex items-center justify-center`}>
            <span className={`text-[8px] font-bold ${avatarText}`}>{member.initials}</span>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-white/70 group-hover:text-white/90 transition-colors">{member.name}</span>
            <div className={`px-1.5 py-0.5 rounded ${status.bg} border ${status.border} flex items-center gap-1`}>
              <div className={`w-1 h-1 rounded-full ${status.dot} ${member.status === 'active' ? 'pulse-dot' : ''}`} />
              <span className={`text-[7px] font-medium ${status.text}`}>{status.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <svg className="w-2 h-2 text-white/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[8px] text-white/25 truncate">{member.store}</span>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-[8px] text-white/20">{member.progress}% complete</span>
            <span className="text-[8px] text-white/30 font-medium">{member.sales} sold</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ── Main Component ──────────────────────────── */
export default function TeamRosterMockup() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const onShiftCount = teamMembers.filter(m => m.status === 'active').length
  const totalSales = teamMembers.reduce((sum, m) => sum + m.sales, 0)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, rotateX: 8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
      style={{ perspective: '1200px' }}
    >
      {/* Glow behind card */}
      <div className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl bg-gradient-to-br from-yellow/15 via-transparent to-sky/10 pointer-events-none" />

      {/* Main card */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-sm overflow-hidden">
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
          </div>
          <span className="text-[10px] font-medium text-white/30">Team Roster</span>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
            <span className="text-[9px] text-white/25">{onShiftCount} on shift</span>
          </div>
        </div>

        {/* Summary stats bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex items-center gap-4 px-4 py-2.5 border-b border-white/[0.04] bg-white/[0.015]"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[9px] text-white/30">{onShiftCount} active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-[9px] text-white/30">{teamMembers.length - onShiftCount} break</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <svg className="w-2.5 h-2.5 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" />
            </svg>
            <span className="text-[9px] text-white/35 font-medium">{totalSales} total sales</span>
          </div>
        </motion.div>

        {/* Team grid */}
        <div className="p-3 space-y-2">
          {teamMembers.map((member, i) => (
            <TeamCard key={member.initials} member={member} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
