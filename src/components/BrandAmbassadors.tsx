import { motion } from 'framer-motion'

export default function BrandAmbassadors() {
  return (
    <section className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[500px] h-[500px] top-1/2 -right-40 -translate-y-1/2 opacity-25" />
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
            <div className="flex gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-yellow/30" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
            </div>
            <div className="w-3/4 h-2 bg-white/[0.06] rounded-full" />
            <div className="w-2/3 h-2 bg-white/[0.04] rounded-full" />
            <span className="text-white/15 text-xs font-medium mt-4">Brand Ambassadors</span>
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
              Brand Ambassadors
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
                sales processes, so they act as true brand ambassadors.
              </p>
              <p className="text-sm text-white/55 leading-[1.8]">
                Whether it's merchandising, promotions, or live selling, our staff
                seamlessly plug into your brand and speak your language with
                confidence.
              </p>
              <p className="text-sm text-white/55 leading-[1.8]">
                With our real-time software, you'll track performance, manage
                shifts, and view results — all without the admin.{' '}
                <span className="text-white font-medium">It's outsourced staffing with in-house control.</span>
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
