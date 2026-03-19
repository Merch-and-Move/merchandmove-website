import { motion } from 'framer-motion'

export default function BrandAmbassadors() {
  return (
    <section className="relative py-28 sm:py-36 bg-base overflow-hidden">
      {/* Orb */}
      <div className="mesh-orb mesh-orb-yellow w-[400px] h-[400px] top-1/2 -right-40 -translate-y-1/2 opacity-20" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card rounded-2xl aspect-[4/3] flex items-center justify-center"
          >
            <span className="text-white/15 text-sm font-medium">Brand Ambassadors Image</span>
          </motion.div>

          {/* Content */}
          <div>
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[11px] font-medium tracking-[0.2em] text-yellow uppercase mb-5"
            >
              Brand Ambassadors
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-3xl sm:text-4xl md:text-5xl text-white mb-8 leading-[1.1]"
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
              <p className="text-sm text-white/45 leading-relaxed">
                We train our team on your products, brand protocols, and retail
                sales processes, so they act as true brand ambassadors.
              </p>
              <p className="text-sm text-white/45 leading-relaxed">
                Whether it's merchandising, promotions, or live selling, our staff
                seamlessly plug into your brand and speak your language with
                confidence.
              </p>
              <p className="text-sm text-white/45 leading-relaxed">
                With our real-time software, you'll track performance, manage
                shifts, and view results — all without the admin.{' '}
                <span className="text-white/70 font-medium">It's outsourced staffing with in-house control.</span>
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
                className="group inline-flex items-center px-7 py-3.5 text-sm font-medium text-base-light bg-yellow rounded-full hover:shadow-[0_0_30px_rgba(249,215,2,0.3)] transition-all duration-500"
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
