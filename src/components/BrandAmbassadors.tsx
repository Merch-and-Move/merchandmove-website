import { motion } from 'framer-motion'

export default function BrandAmbassadors() {
  return (
    <section className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[500px] h-[500px] top-1/2 -right-40 -translate-y-1/2 opacity-20" />
      <div className="mesh-orb mesh-orb-indigo w-[300px] h-[300px] -bottom-20 left-20 opacity-15" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-elevated rounded-2xl aspect-[4/3] flex flex-col items-center justify-center gap-4"
          >
            {/* Mock team roster UI */}
            <div className="w-4/5 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-yellow/30" />
                <div className="w-20 h-2 bg-white/[0.08] rounded-full" />
              </div>
              {[1, 2, 3].map((_, j) => (
                <div key={j} className="flex items-center gap-3 p-2 rounded-lg bg-white/[0.02]">
                  <div className="w-7 h-7 rounded-full bg-white/[0.06]" />
                  <div className="flex-1 space-y-1.5">
                    <div className="w-20 h-1.5 bg-white/[0.06] rounded-full" />
                    <div className="w-12 h-1 bg-white/[0.03] rounded-full" />
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/15">
                    <span className="text-[8px] text-emerald-400/60">On Shift</span>
                  </div>
                </div>
              ))}
            </div>
            <span className="text-white/15 text-xs font-medium mt-2">Promoter Team View</span>
          </motion.div>

          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
            >
              Our Team
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl text-white mb-10 leading-[1.05]"
            >
              Your Brand. Our People.{' '}
              <span className="italic text-gradient-yellow">Zero Gaps</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 mb-10"
            >
              <p className="text-sm text-white/55 leading-[1.8]">
                We train our team on your products, brand protocols, and retail
                sales processes, so they act as true brand ambassadors — not
                generic merchandisers.
              </p>
              <p className="text-sm text-white/55 leading-[1.8]">
                Whether it's active in-store selling, product demonstrations, or
                promotional activations, our staff seamlessly plug into your brand
                and speak your language with confidence.
              </p>
              <p className="text-sm text-white/55 leading-[1.8]">
                With our real-time platform, you'll see who's on shift, what
                they're selling, and how they're performing — {' '}
                <span className="text-white font-medium">all without the admin overhead of managing your own field team.</span>
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href="#contact"
                className="group inline-flex items-center px-7 py-3.5 text-sm font-semibold text-base bg-yellow rounded-full hover:shadow-[0_0_40px_rgba(249,215,2,0.3)] transition-all duration-500"
              >
                Request a Demo
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
